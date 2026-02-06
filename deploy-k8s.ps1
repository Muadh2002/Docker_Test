# PowerShell script to deploy to Kubernetes
Write-Host "Deploying to Kubernetes..." -ForegroundColor Cyan
Write-Host ""

# Step 1: Build Docker images
Write-Host "Step 1: Building Docker images..." -ForegroundColor Yellow
docker build -t php-backend:local ./backend
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error building backend image!" -ForegroundColor Red
    exit 1
}

docker build -t react-frontend:local ./frontend
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error building frontend image!" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Step 2: Apply Kubernetes configurations
Write-Host "Step 2: Deploying to Kubernetes..." -ForegroundColor Yellow
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml

Write-Host ""

# Step 3: Wait for deployments
Write-Host "Step 3: Waiting for pods to be ready..." -ForegroundColor Yellow
kubectl wait --for=condition=ready pod -l app=backend --timeout=60s
kubectl wait --for=condition=ready pod -l app=frontend --timeout=60s

Write-Host ""

# Step 4: Show status
Write-Host "Deployment Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Current Status:" -ForegroundColor Cyan
kubectl get deployments
Write-Host ""
kubectl get services
Write-Host ""
kubectl get pods

Write-Host ""
Write-Host "Access your application:" -ForegroundColor Green
Write-Host "   Frontend: http://localhost:30300" -ForegroundColor White
Write-Host "   Backend:  http://localhost:30800" -ForegroundColor White
Write-Host ""
Write-Host "To view logs: kubectl logs -l app=frontend -f" -ForegroundColor Yellow
