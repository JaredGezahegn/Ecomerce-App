# Backend Development Workflow Guide

## ✅ Problem Solved: Git Branch Switching Issues

The issue where switching branches removed your updates has been **FIXED**. Here's what was wrong and how it's now resolved:

### What Was Causing the Problem
1. **Virtual Environment in Git**: The `backend/shopenv/` directory was being tracked by Git
2. **Wrong API Configuration**: Frontend was using incorrect API imports
3. **Missing Django Files**: Core Django files were missing from the repository

### What We Fixed
1. ✅ **Removed virtual environment from Git tracking**
2. ✅ **Updated .gitignore** to properly exclude virtual environments
3. ✅ **Fixed frontend API imports** to use the correct configuration
4. ✅ **Created missing Django files** (manage.py, wsgi.py, asgi.py)
5. ✅ **Fixed backend configuration issues**

## 🔄 Safe Branch Switching Workflow

Now you can safely switch branches without losing your work:

### Before Making Changes
```bash
# Check current status
git status

# Make sure you're on the right branch
git branch

# Switch to your working branch
git checkout backend  # or your preferred branch
```

### After Making Backend Changes
```bash
# Stage your changes
git add .

# Commit with a descriptive message
git commit -m "Backend: Your descriptive commit message"

# Push to remote (optional)
git push origin backend
```

### Switching Branches Safely
```bash
# Option 1: Commit your changes first (recommended)
git add .
git commit -m "WIP: Backend changes in progress"
git checkout frontend

# Option 2: Stash changes temporarily
git stash
git checkout frontend
# Later: git stash pop
```

## 🚀 Backend Development Setup

### 1. Activate Virtual Environment
```bash
cd SHOPPIT/backend
shopenv\Scripts\activate  # Windows
```

### 2. Install Dependencies (if needed)
```bash
pip install -r requirements.txt
```

### 3. Run Backend Server
```bash
python manage.py runserver 8001
```

### 4. Test API Endpoints
- **Home**: http://localhost:8001/
- **Products**: http://localhost:8001/products
- **Product Detail**: http://localhost:8001/product_detail/{slug}

## 📁 Files You Should Track in Git

### ✅ Always Commit These Backend Files:
- `backend/manage.py`
- `backend/SHOPPIT/settings.py`
- `backend/SHOPPIT/urls.py`
- `backend/SHOPPIT/wsgi.py`
- `backend/SHOPPIT/asgi.py`
- `backend/shop_app/models.py`
- `backend/shop_app/views.py`
- `backend/shop_app/serializers.py`
- `backend/shop_app/urls.py`
- `backend/requirements.txt`

### ❌ Never Commit These:
- `backend/shopenv/` (virtual environment)
- `backend/db.sqlite3` (database file)
- `backend/__pycache__/` (Python cache)
- `*.pyc` files

## 🔧 Current Backend Configuration

### API Endpoints Working:
- ✅ `GET /` - Welcome message
- ✅ `GET /products` - List all products
- ✅ `GET /product_detail/<slug>` - Product details
- ✅ `POST /add_item/` - Add to cart
- ✅ `GET /product_in_cart` - Check if product in cart

### Environment Variables:
- Backend runs on: `http://localhost:8001`
- Frontend connects to: `http://localhost:8001` (via VITE_API_URL)
- CORS configured for: `http://localhost:5173`, `http://localhost:5174`

## 🐛 Troubleshooting

### If Backend Won't Start:
1. Make sure virtual environment is activated
2. Check if port 8001 is available
3. Run: `python manage.py migrate` if database issues

### If Frontend Can't Connect:
1. Verify backend is running on port 8001
2. Check `.env` file has `VITE_API_URL=http://localhost:8001`
3. Ensure CORS settings include your frontend port

### If Git Issues Persist:
1. Check `.gitignore` is properly configured
2. Use `git status` to see what's being tracked
3. Use `git stash` for temporary changes

## 📝 Best Practices

1. **Always commit before switching branches**
2. **Use descriptive commit messages**
3. **Test your API endpoints after changes**
4. **Keep virtual environment out of Git**
5. **Use separate branches for different features**

---

**Your backend is now properly configured and ready for development! 🎉**