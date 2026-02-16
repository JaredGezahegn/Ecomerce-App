# Deployment Checklist

## Pre-Deployment

### Backend (Render)
- [ ] All code committed and pushed to GitHub
- [ ] `requirements.txt` is up to date
- [ ] `build.sh` is executable
- [ ] `runtime.txt` specifies Python version
- [ ] Production settings file created (`settings_prod.py`)
- [ ] Static files configuration added
- [ ] Database migrations are ready
- [ ] Environment variables documented

### Frontend (Vercel)
- [ ] All code committed and pushed to GitHub
- [ ] `package.json` has correct build scripts
- [ ] `vercel.json` configuration created
- [ ] API URL uses environment variable
- [ ] `.env.example` created for reference
- [ ] Build tested locally (`npm run build`)

## Render Deployment

- [ ] Create Render account
- [ ] Connect GitHub repository
- [ ] Create new Web Service
- [ ] Set root directory to `backend`
- [ ] Configure build command: `./build.sh`
- [ ] Configure start command: `gunicorn SHOPPIT.wsgi:application`
- [ ] Add environment variables:
  - [ ] `PYTHON_VERSION`
  - [ ] `SECRET_KEY`
  - [ ] `DEBUG=False`
  - [ ] `ALLOWED_HOSTS`
  - [ ] `DJANGO_SETTINGS_MODULE=SHOPPIT.settings_prod`
  - [ ] `FLUTTERWAVE_SECRET_KEY`
- [ ] Create PostgreSQL database (optional)
- [ ] Add `DATABASE_URL` if using PostgreSQL
- [ ] Deploy service
- [ ] Run migrations via Shell
- [ ] Create superuser via Shell
- [ ] Test API endpoints

## Vercel Deployment

- [ ] Create Vercel account
- [ ] Connect GitHub repository
- [ ] Import project
- [ ] Set root directory to `frontend`
- [ ] Set framework preset to Vite
- [ ] Add environment variable:
  - [ ] `VITE_API_URL` (your Render backend URL)
- [ ] Deploy project
- [ ] Test frontend loads correctly
- [ ] Test API calls work

## Post-Deployment

### Backend Configuration
- [ ] Update `ALLOWED_HOSTS` with Render URL
- [ ] Update `CORS_ALLOWED_ORIGINS` with Vercel URL
- [ ] Test all API endpoints
- [ ] Verify database connections
- [ ] Check static files are served
- [ ] Test authentication flow
- [ ] Verify payment integration works

### Frontend Configuration
- [ ] Verify API calls reach backend
- [ ] Test all pages load correctly
- [ ] Check responsive design
- [ ] Test authentication flow
- [ ] Verify cart functionality
- [ ] Test payment flow
- [ ] Check dark/light theme
- [ ] Test language switching

### Security
- [ ] HTTPS enabled (automatic)
- [ ] CORS configured correctly
- [ ] SECRET_KEY is strong and unique
- [ ] DEBUG=False in production
- [ ] Sensitive data in environment variables
- [ ] SQL injection protection (Django ORM)
- [ ] XSS protection enabled
- [ ] CSRF protection enabled

### Monitoring
- [ ] Set up error tracking (Sentry)
- [ ] Configure logging
- [ ] Set up uptime monitoring
- [ ] Enable analytics
- [ ] Configure alerts

### Documentation
- [ ] Update README with deployment URLs
- [ ] Document environment variables
- [ ] Add API documentation
- [ ] Create user guide
- [ ] Document deployment process

## Testing Checklist

### Backend Tests
- [ ] Admin panel accessible
- [ ] User registration works
- [ ] User login works
- [ ] JWT tokens generated
- [ ] Product listing works
- [ ] Product detail works
- [ ] Search and filter work
- [ ] Cart operations work
- [ ] Payment initiation works
- [ ] Payment callback works

### Frontend Tests
- [ ] Homepage loads
- [ ] Product listing displays
- [ ] Search functionality works
- [ ] Filter functionality works
- [ ] Product detail page works
- [ ] Add to cart works
- [ ] Cart page displays correctly
- [ ] Checkout process works
- [ ] Payment flow works
- [ ] User profile works
- [ ] Authentication works
- [ ] Theme switching works
- [ ] Language switching works

### Cross-Browser Testing
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile browsers

### Performance
- [ ] Page load time < 3 seconds
- [ ] API response time < 500ms
- [ ] Images optimized
- [ ] Code minified
- [ ] Caching configured

## Rollback Plan

If deployment fails:

1. **Render:**
   - Revert to previous deployment in dashboard
   - Or push previous commit and redeploy

2. **Vercel:**
   - Revert to previous deployment in dashboard
   - Or redeploy from previous commit

3. **Database:**
   - Restore from backup if needed
   - Revert migrations if necessary

## Maintenance

### Regular Tasks
- [ ] Monitor error logs weekly
- [ ] Check performance metrics
- [ ] Update dependencies monthly
- [ ] Backup database regularly
- [ ] Review security alerts
- [ ] Update documentation

### Scaling Considerations
- [ ] Monitor resource usage
- [ ] Plan for traffic spikes
- [ ] Consider CDN for static files
- [ ] Optimize database queries
- [ ] Implement caching strategy

---

**Deployment Date:** _____________

**Deployed By:** _____________

**Backend URL:** _____________

**Frontend URL:** _____________

**Notes:**
_____________________________________________
_____________________________________________
_____________________________________________
