# Deployment Guide 🚀

## Deploy to GitHub Pages

1. Install gh-pages (already included):
```bash
npm install
```

2. Deploy (homepage already configured):
```bash
npm run deploy
```

Your site will be live at: https://Meti-AVP.github.io/scientific-writing-quiz

Note: Make sure GitHub Pages is enabled in your repository settings (Settings > Pages > Source: gh-pages branch)

## Deploy to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

## Deploy to Netlify

1. Build the project:
```bash
npm run build
```

2. Drag and drop the `build` folder to [Netlify Drop](https://app.netlify.com/drop)

Or use Netlify CLI:
```bash
npm install -g netlify-cli
netlify deploy
```

## Environment Variables

No environment variables required for this project.

## Notes

- Make sure all dependencies are installed before deployment
- The build folder will be created automatically
- For custom domains, configure in your hosting platform settings
