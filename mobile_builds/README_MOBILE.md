# Mobile Build Packaging & Google Play Console Submission Guide

This folder provides step-by-step instructions to compile **WHITE HAT DEV** into an **Android APK / AAB (Android App Bundle)** and **iOS App** ready for Google Play Console and Apple App Store.

---

## Option 1: PWA / Trusted Web Activity (TWA) - Google Play Store (Recommended)

1. **Install Bubblewrap CLI**:
   ```bash
   npm install -g @bubblewrap/cli
   ```

2. **Initialize TWA Project**:
   ```bash
   bubblewrap init --manifest=https://whitehatdev.github.io/portfolio/manifest.json
   ```

3. **Build Android App Bundle (.aab) & APK**:
   ```bash
   bubblewrap build
   ```

4. **Google Play Console Upload**:
   - Log into your [Google Play Console](https://play.google.com/console).
   - Create a new application named **"WHITE HAT DEV - Cyber Portfolio & Store"**.
   - Upload the generated `app-release-signed.aab` under **Production / Release Management**.
   - Fill out store listing details, screenshots, and privacy policy.
   - Submit for review!

---

## Option 2: Capacitor Packaging (Android Studio & Xcode)

1. **Add Capacitor Dependencies**:
   ```bash
   npm install @capacitor/core @capacitor/cli @capacitor/android @capacitor/ios
   npx cap init "WhiteHatDev" "com.whitehat.portfolio"
   ```

2. **Add Platforms**:
   ```bash
   npx cap add android
   npx cap add ios
   ```

3. **Build Web Production Bundle**:
   ```bash
   npm run build
   npx cap sync
   ```

4. **Open in Android Studio / Xcode**:
   ```bash
   npx cap open android
   npx cap open ios
   ```
