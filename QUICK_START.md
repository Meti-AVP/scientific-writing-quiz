# Quick Start Guide ⚡

## للرفع على GitHub بسرعة:

### 1. افتح Terminal في المجلد ده واكتب:

```bash
git init
git add .
git commit -m "Initial commit: Scientific Writing Quiz"
```

### 2. روح على GitHub وعمل repository جديد:
- اسمه: `scientific-writing-quiz`
- خليه Public عشان تقدر تشاركه
- متختارش "Initialize with README" (عندنا واحد جاهز)

### 3. ارجع للـ Terminal واكتب:

```bash
git remote add origin https://github.com/Meti-AVP/scientific-writing-quiz.git
git branch -M main
git push -u origin main
```

### 4. شارك اللينك مع أصحابك:
```
https://github.com/Meti-AVP/scientific-writing-quiz
```

## لو عايز تشغله على جهازك:

```bash
npm install
npm start
```

## لو عايز ترفعه أونلاين (Deploy):

### أسهل طريقة - Vercel:
1. روح على [vercel.com](https://vercel.com)
2. سجل دخول بحساب GitHub
3. اختار الـ repository
4. اضغط Deploy
5. هيديك لينك تشاركه مع أصحابك!

### أو GitHub Pages:
```bash
npm install --save-dev gh-pages
```

ضيف في `package.json`:
```json
"homepage": "https://Meti-AVP.github.io/scientific-writing-quiz",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

بعدين:
```bash
npm run deploy
```

## محتاج مساعدة؟
شوف الملفات دي:
- `SETUP.md` - تعليمات مفصلة
- `DEPLOYMENT.md` - طرق الـ deployment
- `CONTRIBUTING.md` - لو عايز تضيف حاجات جديدة

---

**بالتوفيق! 🚀**
