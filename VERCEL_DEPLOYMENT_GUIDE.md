# 🚀 Vercel Deployment Guide

## ✅ **Your Deployment URLs**

- **Frontend (Vercel):** https://ecomerce-app-iota.vercel.app/
- **Backend (Render):** https://ecomerce-app-1y26.onrender.com/

---

## 🔧 **Configuration Applied**

### **1. Backend CORS Settings** ✅
**File:** `backend/SHOPPIT/settings.py`
```python
CORS_ALLOWED_ORIGINS = [
    "https://ecomerce-app-iota.vercel.app",  # Your Vercel frontend
    "http://localhost:5173",  # Local development
]
CORS_ALLOW_ALL_ORIGINS = True  # Temporarily enabled for testing
```

### **2. Frontend API Configuration** ✅
**File:** `frontend/.env.production`
```env
VITE_API_URL=https://ecomerce-app-1y26.onrender.com
```

### **3. API Imports Fixed** ✅
All components now use the correct API import from `utils/api.js`

---

## 🧪 **Testing Your Deployment**

### **1. Test Backend API:**
```bash
curl https://ecomerce-app-1y26.onrender.com/products
```
**Status:** ✅ Working (Returns 200 OK with product data)

### **2. Test Frontend:**
Visit: https://ecomerce-app-iota.vercel.app/

**Expected Behavior:**
- Products should load from Render backend
- No CORS errors in browser console
- Cart functionality should work

---

## 🔄 **Vercel Environment Variables**

Make sure these are set in your Vercel project settings:

1. Go to: https://vercel.com/dashboard
2. Select your project: `ecomerce-app`
3. Go to: **Settings** → **Environment Variables**
4. Add:
   ```
   VITE_API_URL = https://ecomerce-app-1y26.onrender.com
   VITE_GEMINI_API_KEY = AIzaSyD1ZX3QaAofPzXtNvDsK50EQ1p_CNU1Has
   ```
5. **Redeploy** your frontend

---

## 🐛 **Troubleshooting**

### **Issue: Products Not Loading**

**Check 1: Browser Console**
```javascript
// Open DevTools (F12) → Console
// Look for errors like:
// ❌ CORS error
// ❌ Network error
// ❌ 404 Not Found
```

**Check 2: Network Tab**
```
1. Open DevTools (F12) → Network tab
2. Refresh page
3. Look for request to: https://ecomerce-app-1y26.onrender.com/products
4. Check response status (should be 200)
```

**Check 3: API URL**
```javascript
// In browser console, run:
console.log(import.meta.env.VITE_API_URL)
// Should output: https://ecomerce-app-1y26.onrender.com
```

### **Issue: CORS Error**

**Solution:**
Backend already configured with `CORS_ALLOW_ALL_ORIGINS = True`

If still having issues, verify in `backend/SHOPPIT/settings.py`:
```python
INSTALLED_APPS = [
    ...
    'corsheaders',  # Must be here
]

MIDDLEWARE = [
    ...
    'corsheaders.middleware.CorsMiddleware',  # Must be before CommonMiddleware
    'django.middleware.common.CommonMiddleware',
    ...
]
```

### **Issue: 404 Not Found**

**Check endpoint URLs:**
- ✅ Correct: `https://ecomerce-app-1y26.onrender.com/products`
- ❌ Wrong: `https://ecomerce-app-1y26.onrender.com/api/products`

No `/api/` prefix needed!

### **Issue: Empty Products**

**Check if backend has data:**
```bash
curl https://ecomerce-app-1y26.onrender.com/products
```

If empty `[]`, you need to add products to the database.

---

## 🔐 **Security Recommendations**

### **After Testing, Update CORS:**

**File:** `backend/SHOPPIT/settings.py`
```python
# Remove this line after testing:
# CORS_ALLOW_ALL_ORIGINS = True

# Keep only specific origins:
CORS_ALLOWED_ORIGINS = [
    "https://ecomerce-app-iota.vercel.app",
    "http://localhost:5173",  # For local development
]
```

### **Environment Variables:**
- ✅ Never commit `.env` files to Git
- ✅ Use Vercel dashboard for production env vars
- ✅ Use different API keys for dev/prod

---

## 📦 **Deployment Workflow**

### **When You Make Changes:**

**Frontend Changes:**
```bash
cd frontend
git add .
git commit -m "Frontend: Your changes"
git push origin frontend
```
Vercel will auto-deploy from your Git repository.

**Backend Changes:**
```bash
cd backend
git add .
git commit -m "Backend: Your changes"
git push origin backend
```
Render will auto-deploy from your Git repository.

---

## 🎯 **Quick Reference**

### **API Endpoints:**
```
GET  /products                    # List all products
GET  /product_detail/{slug}       # Get product details
POST /add_item/                   # Add to cart
GET  /get_cart?cart_code={code}   # Get cart
GET  /product_in_cart             # Check if in cart
POST /token/                      # Login (get JWT)
POST /token/refresh/              # Refresh JWT
```

### **Frontend Routes:**
```
/                    # Homepage (products list)
/product/{slug}      # Product detail page
/cart                # Shopping cart
/checkout            # Checkout page
/profile             # User profile
```

---

## ✅ **Deployment Checklist**

- [x] Backend deployed to Render
- [x] Frontend deployed to Vercel
- [x] CORS configured
- [x] Environment variables set
- [x] API endpoints working
- [x] Frontend fetching data
- [ ] Test all features (cart, checkout, login)
- [ ] Remove `CORS_ALLOW_ALL_ORIGINS` after testing
- [ ] Add custom domain (optional)

---

## 🆘 **Need Help?**

1. **Check backend logs:** Render dashboard → Logs
2. **Check frontend logs:** Vercel dashboard → Deployments → View logs
3. **Test API directly:** Use curl or Postman
4. **Check browser console:** F12 → Console & Network tabs

---

**🎉 Your app is deployed and ready to use!**

Visit: https://ecomerce-app-iota.vercel.app/