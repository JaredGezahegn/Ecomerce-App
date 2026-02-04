# PowerShell script to sync shared files between frontend and backend branches
# Run this whenever you make changes to shared backend files

$sharedFiles = @(
    "backend/shop_app/models.py",
    "backend/shop_app/views.py", 
    "backend/shop_app/urls.py",
    "backend/shop_app/serializers.py",
    "backend/SHOPPIT/settings.py"
)

Write-Host "Syncing shared files between branches..." -ForegroundColor Green

# Get current branch
$currentBranch = git branch --show-current

if ($currentBranch -eq "backend") {
    Write-Host "Copying files from backend to frontend branch..." -ForegroundColor Yellow
    git checkout frontend
    foreach ($file in $sharedFiles) {
        git checkout backend -- $file
    }
    git add $sharedFiles
    git commit -m "Sync shared files from backend branch"
    git checkout backend
} elseif ($currentBranch -eq "frontend") {
    Write-Host "Copying files from frontend to backend branch..." -ForegroundColor Yellow
    git checkout backend
    foreach ($file in $sharedFiles) {
        git checkout frontend -- $file
    }
    git add $sharedFiles
    git commit -m "Sync shared files from frontend branch"
    git checkout frontend
} else {
    Write-Host "Please run this script from either 'backend' or 'frontend' branch" -ForegroundColor Red
}

Write-Host "Sync complete!" -ForegroundColor Green