# GUIDES.md - Complete Setup & Hosting Master Guide

This guide provides step-by-step instructions for deploying **WHITE HAT DEV** across **GitHub Pages**, **WordPress**, **Custom Domain Web Servers**, and compiling **Android APK / Google Play Store** mobile applications.

---

## 1. GitHub Pages Deployment (Recommended & Free)

### Step-by-Step Instructions:
1. **Create a GitHub Repository**:
   - Go to [GitHub.com](https://github.com) and create a new public repository named `portfolio` or `white-hat-dev`.

2. **Initialize Git & Commit Files**:
   ```bash
   git init
   git add .
   git commit -m "v1.0.0 Initial Stable Release of WHITE HAT DEV"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

3. **Deploy to GitHub Pages**:
   - Run the automated deploy script:
     ```bash
     npm run deploy
     ```
   - This automatically builds your app and publishes the static `dist/` bundle to a `gh-pages` branch.

4. **Activate GitHub Pages in Repository Settings**:
   - In GitHub, go to **Settings** -> **Pages**.
   - Under **Build and deployment**, set **Source** to `Deploy from a branch`.
   - Select branch `gh-pages` and folder `/ (root)`.
   - Save! Your site will be live at `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/` in 1-2 minutes.

---

## 2. WordPress Hosting Setup Guide

### Method A: Static Subfolder Hosting on WordPress
1. Build the production package locally:
   ```bash
   npm run build
   ```
2. Open your WordPress File Manager (via cPanel or FTP/SFTP).
3. Create a folder named `portfolio` inside your `public_html` directory (e.g. `public_html/portfolio/`).
4. Upload all files from the local `dist/` directory into `public_html/portfolio/`.
5. Access your website live at `https://yourwordpressdomain.com/portfolio/`.

### Method B: Embedding Inside a WordPress Page or Post
1. On your WordPress dashboard, create a new Page or Edit an existing page.
2. Add a **Custom HTML** block.
3. Paste the following iFrame responsive container snippet:
   ```html
   <div style="width: 100%; height: 950px; overflow: hidden; border-radius: 8px; border: 1px solid #00f0ff;">
     <iframe src="https://yourwordpressdomain.com/portfolio/index.html" width="100%" height="100%" style="border:none;"></iframe>
   </div>
   ```

---

## 3. Custom Domain Hosting (cPanel, NGINX, Apache, Hostinger)

### cPanel / Shared Web Hosting:
1. Run `npm run build` on your computer.
2. Compress the contents of `dist/` into a `.zip` archive.
3. Upload and extract inside `public_html` on cPanel.

### NGINX Server Configuration:
Add the following block to your NGINX site configuration (`/etc/nginx/sites-available/default`):
```nginx
server {
    listen 80;
    server_name whitehatdev.com www.whitehatdev.com;
    root /var/www/whitehatdev/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Apache `.htaccess` Configuration:
Create a `.htaccess` file inside your server root directory:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

## 4. Compiling Android APK & Google Play Console Submission

1. **Install Android Trusted Web Activity (TWA) CLI**:
   ```bash
   npm install -g @bubblewrap/cli
   ```
2. **Build TWA Package**:
   ```bash
   bubblewrap init --manifest=https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/manifest.json
   bubblewrap build
   ```
3. **Upload to Google Play Console**:
   - Log into your [Google Play Console](https://play.google.com/console).
   - Create a new application named **"WHITE HAT DEV"**.
   - Upload `app-release-signed.aab` under **Production**.
   - Complete store listing details and publish worldwide!
