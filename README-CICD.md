# CI/CD Pipeline Guide

## 🚀 What is CI/CD?

**CI (Continuous Integration):** Automatically test and build your code when you push changes.

**CD (Continuous Deployment):** Automatically deploy your app when tests pass.

---

## 📋 What This Pipeline Does

### **On Every Push or Pull Request:**

1. **Frontend Job:**
   - ✅ Installs Node.js dependencies
   - ✅ Runs React tests
   - ✅ Builds production bundle
   - ✅ Saves build artifacts

2. **Backend Job:**
   - ✅ Sets up PHP 8.1
   - ✅ Validates PHP syntax
   - ✅ Tests API endpoints

3. **Docker Build Job:**
   - ✅ Builds backend Docker image
   - ✅ Builds frontend Docker image
   - ✅ Uses caching for faster builds

4. **Deploy Job (main branch only):**
   - ✅ Runs only when pushing to main
   - ✅ Ready for Kubernetes deployment

---

## 🔧 Setup Steps

### **Step 1: Push to GitHub**

```bash
# Initialize git (if not done)
cd "C:\Users\Admin\Desktop\doc pro"
git init

# Add all files
git add .

# Commit
git commit -m "Add CI/CD pipeline"

# Add remote (replace with your GitHub repo URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### **Step 2: Check GitHub Actions**

1. Go to your GitHub repository
2. Click **"Actions"** tab
3. You'll see the pipeline running automatically!

---

## 📊 Pipeline Workflow

```
Push Code to GitHub
        ↓
┌───────┴───────┐
│   Run Tests   │
│  - Frontend   │
│  - Backend    │
└───────┬───────┘
        ↓
   Tests Pass?
        ↓ YES
┌───────┴────────┐
│  Build Docker  │
│    Images      │
└───────┬────────┘
        ↓
  Main Branch?
        ↓ YES
┌───────┴────────┐
│     Deploy     │
│  to Kubernetes │
└────────────────┘
```

---

## 🎯 Understanding the Workflow File

### **Triggers:**
```yaml
on:
  push:
    branches: [ main, master ]  # Run on main branch
  pull_request:
    branches: [ main, master ]  # Run on PRs
```

### **Jobs Run in Parallel:**
- ⚡ `frontend` and `backend` run simultaneously
- ⚡ `docker-build` waits for both to pass
- ⚡ `deploy` only runs on main branch

### **Caching:**
- Node modules are cached (faster builds)
- Docker layers are cached (faster image builds)

---

## 🔐 For Cloud Deployment (Optional)

### **To Deploy to Azure Kubernetes Service (AKS):**

1. **Add GitHub Secrets:**
   - Go to Settings → Secrets → Actions
   - Add these secrets:
     - `AZURE_CREDENTIALS` - Azure service principal
     - `REGISTRY_USERNAME` - Container registry username
     - `REGISTRY_PASSWORD` - Container registry password
     - `CLUSTER_NAME` - AKS cluster name
     - `RESOURCE_GROUP` - Azure resource group

2. **Update deploy job in `.github/workflows/ci-cd.yml`:**

```yaml
deploy:
  name: Deploy to AKS
  runs-on: ubuntu-latest
  needs: [docker-build]
  if: github.ref == 'refs/heads/main'
  
  steps:
  - name: Azure Login
    uses: azure/login@v1
    with:
      creds: ${{ secrets.AZURE_CREDENTIALS }}
  
  - name: Push to ACR
    run: |
      docker tag php-backend:latest myregistry.azurecr.io/php-backend:${{ github.sha }}
      docker push myregistry.azurecr.io/php-backend:${{ github.sha }}
      
  - name: Deploy to AKS
    uses: azure/k8s-deploy@v4
    with:
      manifests: |
        k8s/backend-deployment.yaml
        k8s/frontend-deployment.yaml
```

---

## 📈 Monitoring Your Pipeline

### **View Pipeline Status:**
```bash
# GitHub badge for README
![CI/CD](https://github.com/USERNAME/REPO/workflows/CI%2FCD%20Pipeline/badge.svg)
```

### **Common Issues:**

**❌ Tests Fail:**
- Check the "Frontend - Build & Test" or "Backend - Build & Test" logs
- Fix the failing tests locally
- Push the fix

**❌ Docker Build Fails:**
- Check Dockerfile syntax
- Ensure all dependencies are in package.json

**❌ Deployment Fails:**
- Check kubectl configuration
- Verify secrets are set correctly

---

## 🧪 Local Testing

**Test the workflow locally with `act`:**

```bash
# Install act
choco install act-cli

# Run the workflow locally
act push
```

---

## 💡 Best Practices

1. **Always create a branch for new features:**
   ```bash
   git checkout -b feature/new-feature
   git push origin feature/new-feature
   ```

2. **Create Pull Requests** for code review
3. **Never push directly to main** in production
4. **Use semantic versioning** for releases
5. **Add status badges** to README.md

---

## 🎓 What You Learned

✅ GitHub Actions workflows  
✅ Automated testing  
✅ Docker image building in CI  
✅ Branch-based deployments  
✅ Parallel job execution  
✅ Caching strategies  
✅ Pull request automation  

---

## 📚 Next Steps

1. **Add more tests** (unit, integration, E2E)
2. **Set up staging environment**
3. **Add code quality checks** (linting, formatting)
4. **Implement blue-green deployments**
5. **Add monitoring and alerts**

---

## 🔗 Useful Links

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Docker Build Push Action](https://github.com/docker/build-push-action)
- [Azure Kubernetes Deploy](https://github.com/Azure/k8s-deploy)

---

**Your CI/CD pipeline is now ready! 🚀**

Every push to GitHub will trigger automatic builds and tests!
