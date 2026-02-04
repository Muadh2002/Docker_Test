# PowerShell script to deploy to Kubernetes
Write-Host "🚀 Deploying to Kubernetes..." -ForegroundColor Cyan

# Step 1: Build Docker images
Write-Host "`n📦 Step 1: Building Docker images..." -ForegroundColor Yellow
docker build -t php-backend:local ./backend
docker build -t react-frontend:local ./frontend

# Step 2: Apply Kubernetes configurations
Write-Host "`n☸️  Step 2: Deploying to Kubernetes..." -ForegroundColor Yellow
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml

# Step 3: Wait for deployments
Write-Host "`n⏳ Step 3: Waiting for pods to be ready..." -ForegroundColor Yellow
kubectl wait --for=condition=ready pod -l app=backend --timeout=60s
kubectl wait --for=condition=ready pod -l app=frontend --timeout=60s

# Step 4: Show status
Write-Host "`n✅ Deployment Complete!" -ForegroundColor Green
Write-Host "`n📊 Current Status:" -ForegroundColor Cyan
kubectl get deployments
kubectl get services
kubectl get pods

Write-Host "`n🌐 Access your application:" -ForegroundColor Green
Write-Host "   Frontend: http://localhost:30300" -ForegroundColor White
Write-Host "   Backend:  http://localhost:30800" -ForegroundColor White
Write-Host "`n💡 To view logs: kubectl logs -l app=frontend" -ForegroundColor Yellow
