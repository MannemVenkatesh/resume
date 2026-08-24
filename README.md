# Venkatesh Mannem - Interactive Online Resume

Live interactive, ATS-optimized, print-ready resume for **Venkatesh Mannem** (Senior Backend Engineer).

- **Tech Stack**: HTML5, Vanilla CSS3 (Custom Design System & Theme Engine), JavaScript (ES6+).
- **Features**:
  - 1-Click Print & Pixel-Perfect PDF Generator (`@media print` stylesheet)
  - 1-Click ATS-Optimized Markdown Copy to Clipboard
  - Light / Dark Mode Toggle with persistence
  - High-Density 1-Page Fit & Expanded Mode toggle

---

## Deploy to GitHub Pages (100% Free)

This repository is already configured to be served via **GitHub Pages**.

### Option A: Via GitHub CLI (Fastest)
```bash
gh auth login
gh repo create resume --public --source=. --remote=origin --push
```
Then go to **Settings > Pages** on your repo and set Source to `main` branch `/ (root)`.

### Option B: Via GitHub Web
1. Create a new public repository named `resume` (or `MannemVenkatesh.github.io`) on GitHub: [https://github.com/new](https://github.com/new).
2. Push this folder:
   ```bash
   git remote add origin https://github.com/MannemVenkatesh/resume.git
   git branch -M main
   git push -u origin main
   ```
3. In GitHub repo **Settings → Pages**:
   - Under **Build and deployment > Source**, select **Deploy from a branch**.
   - Select Branch: `main` and Folder: `/ (root)`, then click **Save**.
4. Your resume will be live at: **`https://mannemvenkatesh.github.io/resume/`** (or `https://mannemvenkatesh.github.io/` if using the root repo name).
