# PowerShell script to clean up Kubernetes resources
Write-Host "Cleaning up Kubernetes resources..." -ForegroundColor Cyan

kubectl delete -f k8s/backend-deployment.yaml
kubectl delete -f k8s/frontend-deployment.yaml

Write-Host ""
Write-Host "Cleanup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Remaining resources:" -ForegroundColor Cyan
kubectl get all
