# Employee Address Verification Letter Generator 📄

A lightweight, high-aesthetic web tool for HR teams and employees to instantly customize, preview, and download official **Address Verification Letters** for house owners and landlords.

## 🚀 Features

- ⚡ **Real-time A4 Live Preview**: Instant two-way data sync between form controls and the printable A4 letterhead canvas.
- 📄 **100% Vector PDF Export**: Uses programmatic `jsPDF` text rendering for crisp, searchable, selectable, and non-blurry PDFs.
- 🎨 **Corporate Branding**: Upload custom company logos and authorized digital signatures.
- 🧼 **Smart Blank Handling**: Gracefully hides empty labels, empty brackets, and optional sections when fields are left blank.
- 🖨️ **Browser Print Ready**: Native `@media print` CSS for 1-page A4 printing (`Ctrl + P`).
- 🌐 **GitHub Pages Ready**: 100% client-side HTML/CSS/JS app with zero server/backend dependencies.

## 🛠️ Tech Stack

- **HTML5 & CSS3**: Custom light theme, A4 canvas layout system, Google Fonts (`Outfit`, `Merriweather`, `Inter`).
- **JavaScript (Vanilla ES6)**: Dynamic DOM manipulation and conditional sentence rendering.
- **jsPDF**: Programmatic client-side PDF document generation.
- **Feather Icons**: Crisp SVG UI icons.

## 📦 How to Deploy to GitHub Pages

1. Push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/employee-verification-letter-generator.git
   git branch -M main
   git push -u origin main
   ```

2. Enable GitHub Pages:
   - Go to **Repository Settings** > **Pages**.
   - Under **Branch**, select `main` and folder `/ (root)`.
   - Click **Save**.

3. Your live tool will be published at:
   `https://YOUR_USERNAME.github.io/employee-verification-letter-generator/`
