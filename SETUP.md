# Setup Instructions 🛠️

## Initial Setup

### 1. Initialize Git Repository

```bash
git init
git add .
git commit -m "Initial commit: Scientific Writing Quiz"
```

### 2. Create GitHub Repository

1. Go to [GitHub](https://github.com/new)
2. Create a new repository named `scientific-writing-quiz`
3. Don't initialize with README (we already have one)

### 3. Connect to GitHub

```bash
git remote add origin https://github.com/Meti-AVP/scientific-writing-quiz.git
git branch -M main
git push -u origin main
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Run Locally

```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## Share with Friends 🎉

After pushing to GitHub, share this link with your friends:
```
https://github.com/Meti-AVP/scientific-writing-quiz
```

They can:
- Clone the repository
- View the code
- Run it locally
- Or you can deploy it (see DEPLOYMENT.md) and share the live link!

## Quick Commands

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

## Troubleshooting

If you encounter any issues:

1. Make sure Node.js is installed (v14 or higher)
2. Delete `node_modules` and `package-lock.json`, then run `npm install` again
3. Clear browser cache if styles don't load
4. Check console for any error messages

## Next Steps

1. Customize the quiz questions in `src/QuizWebsite.js`
2. Update the README with your GitHub username
3. Add more features or styling
4. Deploy to make it accessible online (see DEPLOYMENT.md)

Happy coding! 🎓
