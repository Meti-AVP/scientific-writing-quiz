# Contributing to Scientific Writing Quiz 🤝

Thank you for your interest in contributing! Here's how you can help:

## How to Contribute

### 1. Fork the Repository
Click the "Fork" button at the top right of the repository page.

### 2. Clone Your Fork
```bash
git clone https://github.com/[your-username]/scientific-writing-quiz.git
cd scientific-writing-quiz
```

### 3. Create a Branch
```bash
git checkout -b feature/your-feature-name
```

### 4. Make Your Changes
- Add new questions
- Improve UI/UX
- Fix bugs
- Add new features
- Improve documentation

### 5. Test Your Changes
```bash
npm start
```

### 6. Commit Your Changes
```bash
git add .
git commit -m "Add: description of your changes"
```

### 7. Push to Your Fork
```bash
git push origin feature/your-feature-name
```

### 8. Create a Pull Request
Go to the original repository and click "New Pull Request"

## Adding New Questions

To add new questions, edit `src/QuizWebsite.js`:

```javascript
// For Multiple Choice Questions
{ 
  id: 151, 
  type: 'mcq', 
  category: 'intro', 
  question: 'Your question here?', 
  options: ['Option A', 'Option B', 'Option C', 'Option D'], 
  correct: 0  // Index of correct answer (0-3)
}

// For True/False Questions
{ 
  id: 152, 
  type: 'tf', 
  category: 'intro', 
  question: 'Your statement here.', 
  correct: true  // or false
}
```

## Categories

- `intro` - Introduction to scientific writing
- `structure` - Paper structure and components
- `results` - Results, tables, and figures
- `discussion` - Discussion and conclusions

## Code Style

- Use meaningful variable names
- Add comments for complex logic
- Follow React best practices
- Keep components clean and readable

## Reporting Issues

Found a bug? Have a suggestion?
1. Check if the issue already exists
2. Create a new issue with a clear description
3. Include steps to reproduce (for bugs)

## Questions?

Feel free to open an issue for any questions!

Thank you for contributing! 🎉
