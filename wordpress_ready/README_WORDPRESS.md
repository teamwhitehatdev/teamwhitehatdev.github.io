# Deploying WHITE HAT DEV to WordPress or Custom Domains

To deploy this application to a WordPress site or custom hosting domain:

## Option 1: Static Hosting / Subfolder Deployment on WordPress
1. Build the production package:
   ```bash
   npm run build
   ```
2. Upload the contents of the `dist/` directory to your WordPress root or subfolder (e.g., `https://yourdomain.com/portfolio/`).
3. Embed into any WordPress page using an iframe or direct HTML template snippet:
   ```html
   <iframe src="/portfolio/index.html" width="100%" height="900px" style="border:none;"></iframe>
   ```

## Option 2: Full Custom Domain (Apache / NGINX)
- Direct NGINX server block pointing to `dist/`:
  ```nginx
  location / {
    root /var/www/whitehatdev/dist;
    try_files $uri $uri/ /index.html;
  }
  ```
