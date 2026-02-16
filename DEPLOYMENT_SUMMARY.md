# Quick Deployment Summary

## 🚀 Deploy Backend to Render

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Add deployment configs"
   git push origin main
   ```

2. **On Render.com:**
   - New Web Service → Connect GitHub repo
   - Root Directory: `backend`
   - Build: `./build.sh`
   - Start: `gunicorn SHOPPIT.wsgi:application`

3. **Environment Variables:**
   ```
   PYTHON_VERSION=3.11.0
   SECRET_KEY=<generate-new-key>
   DEBUG=False
   ALLOWED_HOSTS=<your-app>.onrender.com
   DJANGO_SETTINGS_MODULE=SHOPPIT.settings_prod
   CORS_ALLOWED_ORIGINS=<your-vercel-url>
   FLUTTERWAVE_SECRET_KEY=<your-key>
   ```

4. **After Deploy:**
   ```bash
   # In Render Shell
   python manage.py migrate
   python manage.py createsuperuser
   ```

---

## 🌐 Deploy Frontend to Vercel

1. **On Vercel.com:**
   - New Project → Import from GitHub
   - Root Directory: `frontend`
   - Framework: Vite
   - Build: `npm run build`
   - Output: `dist`

2. **Environment Variable:**
   ```
   VITE_API_URL=https://<your-backend>.onrender.com
   ```

3. **Deploy!**

---

## 🔄 Update CORS After Frontend Deploy

Go back to Render → Environment Variables:
```
CORS_ALLOWED_ORIGINS=https://<your-vercel-app>.vercel.app
```

Then redeploy backend.

---

## ✅ Test Your Deployment

- Backend: `https://<your-app>.onrender.com/admin`
- Frontend: `https://<your-app>.vercel.app`
- API: `https://<your-app>.onrender.com/api/products`

---

## 📝 Files Created for Deployment

### Backend
- `backend/build.sh` - Build script for Render
- `backend/render.yaml` - Render configuration
- `backend/runtime.txt` - Python version
- `backend/SHOPPIT/settings_prod.py` - Production settings
- `backend/.env.example` - Environment variables template

### Frontend
- `frontend/vercel.json` - Vercel configuration
- `frontend/.env.example` - Environment variables template

### Documentation
- `DEPLOYMENT_GUIDE.md` - Complete deployment guide
- `DEPLOYMENT_CHECKLIST.md` - Step-by-step checklist
- `DEPLOYMENT_SUMMARY.md` - This quick reference

---

## 🆘 Common Issues

**Backend won't start:**
- Check logs in Render dashboard
- Verify all environment variables are set
- Ensure `build.sh` is executable

**Frontend can't reach backend:**
- Check `VITE_API_URL` is correct
- Update backend `CORS_ALLOWED_ORIGINS`
- Verify backend is running

**Database errors:**
- Run migrations in Render Shell
- Check `DATABASE_URL` if using PostgreSQL

---

## 💡 Pro Tips

1. **Free Tier Limitations:**
   - Render: Services sleep after 15 min inactivity
   - First request after sleep takes ~30 seconds

2. **Automatic Deployments:**
   - Both platforms auto-deploy on git push
   - Create separate branches for staging

3. **Environment Variables:**
   - Never commit `.env` files
   - Use `.env.example` as template
   - Vercel needs `VITE_` prefix

4. **Custom Domains:**
   - Add in platform settings
   - Update DNS records
   - Update CORS and ALLOWED_HOSTS

---

## 📚 Resources

- [Render Docs](https://render.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Django Deployment](https://docs.djangoproject.com/en/stable/howto/deployment/)

---

**Need help?** Check `DEPLOYMENT_GUIDE.md` for detailed instructions!
