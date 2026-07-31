# WordPress Setup Guide for WHITE HAT DEV Portfolio & Store

This directory (`wordpress_ready/`) provides 2 simple methods to integrate your **WHITE HAT DEV** Cyberpunk Portfolio into any WordPress website (Elementor, Divi, Gutenberg, or Custom Theme).

---

## ⚡ Method 1: WordPress Custom Plugin (Recommended)

1. Zip the `wordpress_ready/` directory into a file named `whitehat-portfolio-plugin.zip`.
2. Log into your **WordPress Admin Dashboard** (`yourdomain.com/wp-admin`).
3. Go to **Plugins -> Add New -> Upload Plugin**.
4. Upload `whitehat-portfolio-plugin.zip` and click **Activate Plugin**.
5. Create a new Page in WordPress titled **Portfolio** or **Store**.
6. Insert the shortcode:
   ```text
   [whitehat_dev_portfolio]
   ```
7. Click **Publish**! Your full interactive Cyberpunk portfolio, marketplace, anti-inspect security, and sound FX will render inside WordPress!

---

## 🌐 Method 2: iFrame Embedding (Easiest)

If you already host your site on GitHub Pages (`https://teamwhitehatdev.github.io`), you can embed it inside any WordPress page using HTML:

```html
<iframe 
  src="https://teamwhitehatdev.github.io" 
  style="width: 100%; height: 100vh; border: none;" 
  allow="autoplay; encrypted-media"
></iframe>
```

---

## 🛡️ Included Features in WordPress:
- **8 Dynamic Themes** (HackTheBox, Cyberpunk 2077, Matrix, etc.)
- **Anti-Inspect Security** (`F12`, `Ctrl+U`, Right-Click blocking)
- **Web Audio Sound Effects**
- **13+ Category Digital Marketplace & PayPal Checkout**
- **Randomized International Client Testimonials**
- **Hidden Admin Dashboard** (`yourdomain.com/portfolio/#/admin` | Passcode: `whitehat2026`)
