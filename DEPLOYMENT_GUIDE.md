# Deployment Guide - SHOPPIT

This guide will help you deploy your backend to Render and frontend to Vercel separately from the same GitHub repository.

## Prerequisites

- GitHub account with your repository pushed
- Render account (https://render.com)
- Vercel account (https://vercel.com)
- Your repository should be public or connected to both platforms

## Part 1: Backend Deployment on Render

### Step 1: Prepare Your Repository

Make sure all backend files are committed and pushed to GitHub:

```bash
git add .
git commit -m "Add deployment configurations"
git push origin main
```

### Step 2: Create a Render Account

1. Go to https://render.com
2. Sign up or log in
3. Connect your GitHub account

### Step 3: Create a New Web Service

1. Click "New +" button → "Web Service"
2. Connect your GitHub repository
3. Configure the service:

   **Basic Settings:**
   - Name: `shoppit-backend`
   - Region: Choose closest to your users
   - Branch: `main`
   - Root Directory: `backend`
   - Runtime: `Python 3`
   - Build Command: `./build.sh`
   - Start Command: `gunicorn SHOPPIT.wsgi:application`

### Step 4: Configure Environment Variables

Add these environment variables in Render dashboard:

```
PYTHON_VERSION=3.11.0
SECRET_KEY=<generate-a-strong-secret-key>
DEBUG=False
ALLOWED_HOSTS=<your-render-url>.onrender.com
CORS_ALLOWED_ORIGINS=https://<your-vercel-app>.vercel.app
FLUTTERWAVE_SECRET_KEY=<your-flutterwave-key>
DJANGO_SETTINGS_MODULE=SHOPPIT.settings_prod
```

**To generate a SECRET_KEY:**
```python
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

### Step 5: Add PostgreSQL Database (Optional but Recommended)

1. In Render dashboard, click "New +" → "PostgreSQL"
2. Name it `shoppit-db`
3. Copy the "Internal Database URL"
4. Add it as environment variable in your web service:
   ```
   DATABASE_URL=<your-postgres-internal-url>
   ```

### Step 6: Deploy

1. Click "Create Web Service"
2. Render will automatically build and deploy
3. Wait for deployment to complete (5-10 minutes)
4. Your backend will be available at: `https://shoppit-backend.onrender.com`

### Step 7: Run Migrations and Create Superuser

After first deployment, use Render Shell:

1. Go to your service → "Shell" tab
2. Run:
```bash
python manage.py migrate
python manage.py createsuperuser
```

---

## Part 2: Frontend Deployment on Vercel

### Step 1: Create a Vercel Account

1. Go to https://vercel.com
2. Sign up or log in
3. Connect your GitHub account

### Step 2: Import Your Project

1. Click "Add New..." → "Project"
2. Import your GitHub repository
3. Configure the project:

   **Framework Preset:** Vite
   **Root Directory:** `frontend`
   **Build Command:** `npm run build`
   **Output Directory:** `dist`
   **Install Command:** `npm install`

### Step 3: Configure Environment Variables

Add these environment variables in Vercel:

```
VITE_API_URL=https://shoppit-backend.onrender.com
```

### Step 4: Update Frontend API Configuration

Make sure your `frontend/src/api.js` or `frontend/.env` uses the environment variable:

```javascript
// frontend/src/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
```

Or in `frontend/.env.production`:
```
VITE_API_URL=https://shoppit-backend.onrender.com
```

### Step 5: Deploy

1. Click "Deploy"
2. Vercel will automatically build and deploy
3. Your frontend will be available at: `https://<your-project>.vercel.app`

### Step 6: Update Backend CORS Settings

After getting your Vercel URL, update the backend environment variable on Render:

```
CORS_ALLOWED_ORIGINS=https://<your-vercel-app>.vercel.app,https://<your-vercel-app>-<team>.vercel.app
```

Then redeploy the backend service.

---

## Part 3: Post-Deployment Configuration

### Update Backend Settings

1. Go to Render dashboard → Your web service → Environment
2. Update `ALLOWED_HOSTS`:
   ```
   ALLOWED_HOSTS=shoppit-backend.onrender.com,<your-custom-domain>
   ```

### Custom Domains (Optional)

**For Backend (Render):**
1. Go to Settings → Custom Domain
2. Add your domain and follow DNS instructions

**For Frontend (Vercel):**
1. Go to Settings → Domains
2. Add your domain and follow DNS instructions

---

## Part 4: Continuous Deployment

Both platforms support automatic deployments:

### Render
- Automatically deploys when you push to `main` branch
- Only rebuilds if files in `backend/` directory change

### Vercel
- Automatically deploys when you push to `main` branch
- Only rebuilds if files in `frontend/` directory change
- Creates preview deployments for pull requests

---

## Troubleshooting

### Backend Issues

**Build fails:**
- Check `build.sh` has execute permissions
- Verify all dependencies in `requirements.txt`
- Check Python version matches `runtime.txt`

**Database errors:**
- Ensure migrations are run
- Check DATABASE_URL is set correctly
- Verify PostgreSQL is running

**CORS errors:**
- Update `CORS_ALLOWED_ORIGINS` with your Vercel URL
- Include both production and preview URLs

### Frontend Issues

**API calls fail:**
- Verify `VITE_API_URL` is set correctly
- Check backend CORS settings
- Ensure backend is running

**Build fails:**
- Check `package.json` scripts
- Verify all dependencies are installed
- Check for TypeScript/ESLint errors

**Environment variables not working:**
- Vercel requires `VITE_` prefix for Vite apps
- Redeploy after adding new variables

---

## Monitoring and Logs

### Render
- View logs: Service → Logs tab
- Monitor metrics: Service → Metrics tab
- Set up alerts: Service → Settings → Notifications

### Vercel
- View logs: Deployment → Function Logs
- Monitor analytics: Analytics tab
- Check performance: Speed Insights

---

## Cost Considerations

### Render Free Tier
- Web services spin down after 15 minutes of inactivity
- 750 hours/month free
- PostgreSQL: 90 days free, then $7/month

### Vercel Free Tier
- Unlimited deployments
- 100GB bandwidth/month
- Serverless function execution included

---

## Security Checklist

- [ ] Change Django SECRET_KEY
- [ ] Set DEBUG=False in production
- [ ] Use environment variables for sensitive data
- [ ] Enable HTTPS (automatic on both platforms)
- [ ] Configure CORS properly
- [ ] Use PostgreSQL instead of SQLite
- [ ] Set up proper authentication
- [ ] Enable rate limiting
- [ ] Regular security updates

---

## Useful Commands

### Local Development
```bash
# Backend
cd backend
python manage.py runserver

# Frontend
cd frontend
npm run dev
```

### Check Deployment Status
```bash
# Render CLI
render services list

# Vercel CLI
vercel list
```

---

## Support Resources

- **Render Docs:** https://render.com/docs
- **Vercel Docs:** https://vercel.com/docs
- **Django Deployment:** https://docs.djangoproject.com/en/stable/howto/deployment/
- **Vite Deployment:** https://vitejs.dev/guide/static-deploy.html

---

## Next Steps

1. Set up custom domains
2. Configure email service (SendGrid, Mailgun)
3. Set up monitoring (Sentry, LogRocket)
4. Configure CDN for media files (Cloudinary, AWS S3)
5. Set up CI/CD pipelines
6. Add automated testing
7. Configure backup strategy
8. Set up staging environment

---

Good luck with your deployment! 🚀
