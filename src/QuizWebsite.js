import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Award, BookOpen, Brain, Sparkles, ChevronRight, RotateCcw, Star } from 'lucide-react';

const QuizWebsite = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [category, setCategory] = useState('all');
  const [animate, setAnimate] = useState(false);

  const questions = [
    // MCQ Questions
    { id: 1, type: 'mcq', category: 'intro', question: 'What is the main aim of scientific writing?', options: ['To make money from publications', 'To exchange scientific knowledge and communicate new scientific findings', 'To show writing skills', 'To fulfill academic requirements'], correct: 1 },
    { id: 2, type: 'mcq', category: 'intro', question: 'Good scientific writing should be:', options: ['Long and detailed', 'Complex and sophisticated', 'Clear, simple, and well ordered', 'Full of technical jargon'], correct: 2 },
    { id: 3, type: 'mcq', category: 'intro', question: 'According to the lectures, "If you don\'t write your work, you haven\'t _____ it"', options: ['Understood', 'Finished', 'Done', 'Published'], correct: 2 },
    { id: 4, type: 'mcq', category: 'intro', question: 'Which of the following is NOT a type of scientific writing communication?', options: ['Research papers', 'Theses', 'Poetry', 'Technical reports'], correct: 2 },
    { id: 5, type: 'mcq', category: 'intro', question: 'Types of submissions include all EXCEPT:', options: ['Original research papers', 'Systematic review of the literature', 'Case report', 'Fictional stories'], correct: 3 },
    { id: 6, type: 'mcq', category: 'intro', question: 'When writing scientifically, which voice is preferred?', options: ['Active voice', 'Passive voice', 'Both are equal', 'Neither should be used'], correct: 0 },
    { id: 7, type: 'mcq', category: 'intro', question: 'Simple words are preferred over:', options: ['Short words', 'Complex words', 'Common words', 'Technical words'], correct: 1 },
    { id: 8, type: 'mcq', category: 'intro', question: 'Who is your primary audience in scientific writing?', options: ['General public', 'Students only', 'People working in related areas and editors/reviewers', 'Family members'], correct: 2 },
    { id: 9, type: 'mcq', category: 'intro', question: 'Reasons for publishing include all EXCEPT:', options: ['To leave a record of research', 'To receive expert feedback', 'To hide research methods', 'To attract interest from others'], correct: 2 },
    { id: 10, type: 'mcq', category: 'intro', question: 'Why is it difficult to publish?', options: ['All research is equally publishable', 'Not all research is new or of sufficient scientific interest', 'Journals accept everything', 'There are too many journals'], correct: 1 },
    { id: 11, type: 'mcq', category: 'intro', question: 'When selecting a target journal, you should consider:', options: ['If the journal normally publishes your kind of work', 'If the journal is peer-reviewed', 'The journal\'s impact factor', 'All of the above'], correct: 3 },
    { id: 12, type: 'mcq', category: 'intro', question: 'Should you submit to multiple journals simultaneously?', options: ['Yes, to increase chances', 'No, don\'t submit to multiple journals', 'Only to two journals', 'Yes, if they are in different countries'], correct: 1 },
    { id: 13, type: 'mcq', category: 'intro', question: 'In the publication procedure, after authors submit their manuscript, it is assigned to:', options: ['The printer', 'The editor', 'Other authors', 'The public'], correct: 1 },
    { id: 14, type: 'mcq', category: 'intro', question: 'Peer review is:', options: ['A review process for scientists by scientists', 'A review by non-experts', 'Not necessary for publication', 'Only for books'], correct: 0 },
    { id: 15, type: 'mcq', category: 'intro', question: 'Which problem appears too frequently according to an international editor?', options: ['Papers with excellent language', 'Papers within journal scope', 'Papers that don\'t respect journal format', 'Well-revised manuscripts'], correct: 2 },
    { id: 16, type: 'mcq', category: 'intro', question: 'Knowledge is lost without:', options: ['Money', 'Written records', 'Oral tradition', 'Internet'], correct: 1 },
    { id: 17, type: 'mcq', category: 'intro', question: 'Poor writing can:', options: ['Improve experimentation', 'Mask good experimentation', 'Have no effect on research', 'Increase citations'], correct: 1 },
    { id: 18, type: 'mcq', category: 'intro', question: 'What should you avoid in scientific writing?', options: ['Clarity', 'Precision', 'Unnecessary redundancy', 'Proper citations'], correct: 2 },
    { id: 19, type: 'mcq', category: 'intro', question: 'In scientific writing, you should:', options: ['Over-explain everything', 'Use unnecessary qualifiers', 'Use consistent tenses', 'Use indefinite "this" frequently'], correct: 2 },
    { id: 20, type: 'mcq', category: 'intro', question: 'You should cite:', options: ['Only your own work', 'Sources as well as findings', 'Nothing at all', 'Only books'], correct: 1 },
    
    // Structure questions
    { id: 21, type: 'mcq', category: 'structure', question: 'The structure of a research paper includes all EXCEPT:', options: ['Title', 'Abstract', 'Autobiography', 'Introduction'], correct: 2 },
    { id: 22, type: 'mcq', category: 'structure', question: 'A title should be:', options: ['Very long and detailed', 'Concise and relevant to the paper content', 'Full of abbreviations', 'As short as possible'], correct: 1 },
    { id: 23, type: 'mcq', category: 'structure', question: 'A title should:', options: ['Be ambiguous', 'Be ambiguity-free', 'Contain chemical formulas', 'Have spelling mistakes'], correct: 1 },
    { id: 24, type: 'mcq', category: 'structure', question: 'A title may contain:', options: ['Abbreviations', 'Chemical formulas', 'Noun phrases, statement or question', 'Equations'], correct: 2 },
    { id: 25, type: 'mcq', category: 'structure', question: 'A title should NOT contain:', options: ['Keywords', 'Meaningful words', 'Abbreviations and chemical formulas', 'Proper word order'], correct: 2 },
    { id: 26, type: 'mcq', category: 'structure', question: 'An abstract is:', options: ['The full paper', 'A summary of information in a document', 'Only the introduction', 'The references section'], correct: 1 },
    { id: 27, type: 'mcq', category: 'structure', question: 'An abstract should provide:', options: ['Principal objective of the investigation', 'Description of the method used', 'Summary of the results', 'All of the above'], correct: 3 },
    { id: 28, type: 'mcq', category: 'structure', question: 'An abstract can be written:', options: ['Before starting the paper', 'After completion of the paper', 'During the experiment', 'Never'], correct: 1 },
    { id: 29, type: 'mcq', category: 'structure', question: 'An abstract typically contains about:', options: ['50-100 words', '200-250 words', '500-600 words', '1000+ words'], correct: 1 },
    { id: 30, type: 'mcq', category: 'structure', question: 'The introduction should:', options: ['Provide objective and background of research', 'Identify unanswered questions', 'Present results of other studies', 'All of the above'], correct: 3 },
    { id: 31, type: 'mcq', category: 'structure', question: 'Common mistakes in introduction include:', options: ['Clear purpose', 'Using first person', 'Good structure', 'Appropriate amount of information'], correct: 1 },
    { id: 32, type: 'mcq', category: 'structure', question: 'In the introduction, editors hate:', options: ['Relevant references', 'Clear purpose', 'References irrelevant to the work', 'Brief writing'], correct: 2 },
    { id: 33, type: 'mcq', category: 'structure', question: 'Reviewers hate excessive use of expressions such as:', options: ['"Results show"', '"Data indicate"', '"Novel", "First time", "Paradigm changing"', '"Previous studies"'], correct: 2 },
    { id: 34, type: 'mcq', category: 'structure', question: 'The method section gives details of:', options: ['Only the basic theory', 'The experiment, theory, numerical method, method of analysis', 'Only the results', 'The discussion'], correct: 1 },
    { id: 35, type: 'mcq', category: 'structure', question: 'Sufficient detail in methods should be provided so that:', options: ['The paper looks longer', 'The work can be reproduced and evaluated by others', 'Nobody understands it', 'It fills more pages'], correct: 1 },
    { id: 36, type: 'mcq', category: 'structure', question: 'In the method section, you can use:', options: ['Flowcharts', 'Random numbering', 'Incomplete descriptions', 'Trade names only'], correct: 0 },
    { id: 37, type: 'mcq', category: 'structure', question: 'Figures and tables in methods should be:', options: ['Randomly placed', 'Numbered and presented sequentially', 'Unnumbered', 'Without captions'], correct: 1 },
    { id: 38, type: 'mcq', category: 'structure', question: 'In methods, you should:', options: ['Repeat details of established methods', 'Give incomplete descriptions', 'NOT repeat details of established methods', 'Skip important information'], correct: 2 },
    { id: 39, type: 'mcq', category: 'structure', question: 'For chemicals used in materials, you should:', options: ['Use trade names', 'Include exact technical specifications', 'Not mention specifications', 'Use any name'], correct: 1 },
    { id: 40, type: 'mcq', category: 'structure', question: 'You should avoid:', options: ['Accurate identification of experimental subjects', 'Technical specifications', 'The use of trade names of chemicals', 'Consent for human subjects'], correct: 2 },
    
    // Results & Tables
    { id: 41, type: 'mcq', category: 'results', question: 'Good authors in the results section should:', options: ['Include everything', 'Highlight the main points only', 'Repeat the methods', 'Copy from other papers'], correct: 1 },
    { id: 42, type: 'mcq', category: 'results', question: 'Results and discussion sections:', options: ['Must always be combined', 'Must never be combined', 'Keeping them separate is more common', 'Are not important'], correct: 2 },
    { id: 43, type: 'mcq', category: 'results', question: 'In the results section, you should refer to tables and figures by:', options: ['Their content', 'Their color', 'A number', 'Their position'], correct: 2 },
    { id: 44, type: 'mcq', category: 'results', question: 'It is NOT preferred to start a sentence with:', options: ['A subject', 'A verb', 'A number if followed by a unit', 'A capital letter'], correct: 2 },
    { id: 45, type: 'mcq', category: 'results', question: 'To express a range in text, use:', options: ['A dash (3-5 students)', '\'to\' (3 to 5 students)', 'A semicolon', 'A comma'], correct: 1 },
    { id: 46, type: 'mcq', category: 'results', question: 'Tables are most useful for:', options: ['Decoration', 'Explaining calculations or showing components of data', 'Filling empty space', 'Making the paper longer'], correct: 1 },
    { id: 47, type: 'mcq', category: 'results', question: 'Common weaknesses that reduce the power of tables include:', options: ['Clear titles', 'Weak descriptive titles', 'Necessary data only', 'Well-organized data'], correct: 1 },
    { id: 48, type: 'mcq', category: 'results', question: 'In tables, you should NOT:', options: ['Include column headings', 'Include row headings', 'Include redundant or unnecessary data', 'Arrange to highlight significant results'], correct: 2 },
    { id: 49, type: 'mcq', category: 'results', question: 'Common weaknesses in tables include:', options: ['Explained symbols', 'Mentioned units', 'Inclusion of non-significant numbers', 'Ordered data'], correct: 2 },
    { id: 50, type: 'mcq', category: 'results', question: 'A table consists of:', options: ['Only the title', 'Columns\' headings, rows\' headings, body, and footnotes', 'Only numbers', 'Only text'], correct: 1 },
    { id: 51, type: 'mcq', category: 'results', question: 'In tables, if data is not available, you should use:', options: ['A dash (-)', 'Nothing', '\'N/A\'', 'Zero'], correct: 2 },
    { id: 52, type: 'mcq', category: 'results', question: 'In tables, you should write:', options: ['Raw data', 'Analyzed data', 'Estimated data only', 'No data'], correct: 1 },
    { id: 53, type: 'mcq', category: 'results', question: 'For values less than 1, you should:', options: ['Write .8 kg', 'Write 0.8 kg (zero before decimal)', 'Not write them', 'Round them up'], correct: 1 },
    { id: 54, type: 'mcq', category: 'results', question: 'A table should be:', options: ['Confusing', 'Self-explanatory', 'Incomplete', 'Without units'], correct: 1 },
    
    // Figures & Discussion
    { id: 55, type: 'mcq', category: 'discussion', question: 'Figures are most useful for:', options: ['Showing an overall trend', 'Decorating the paper', 'Confusing readers', 'Replacing all text'], correct: 0 },
    { id: 56, type: 'mcq', category: 'discussion', question: 'Common weaknesses in figures include:', options: ['Clear titles', 'Proper labeling', 'Wrong figure type chosen', 'Adequate legends'], correct: 2 },
    { id: 57, type: 'mcq', category: 'discussion', question: 'In figures, axes should be:', options: ['Not labeled', 'Labeled', 'Hidden', 'Colored only'], correct: 1 },
    { id: 58, type: 'mcq', category: 'discussion', question: 'A figure with family of curves should be:', options: ['Without legend', 'Supported by legend symbols', 'In black and white only', 'Without axes'], correct: 1 },
    { id: 59, type: 'mcq', category: 'discussion', question: 'Common figure types include:', options: ['Pie charts', 'Bar charts', 'Scatter plots', 'All of the above'], correct: 3 },
    { id: 60, type: 'mcq', category: 'discussion', question: 'Discussion means discussion of:', options: ['Others\' results only', 'Your results and not those of others', 'Random topics', 'Future work only'], correct: 1 },
    { id: 61, type: 'mcq', category: 'discussion', question: 'The discussion should be related closely to:', options: ['The paper title', 'The introduction', 'Previous published work', 'All of the above'], correct: 3 },
    { id: 62, type: 'mcq', category: 'discussion', question: 'In the discussion, you should:', options: ['Ignore previous work', 'Show how results agree or don\'t agree with previous work', 'Copy from others', 'Avoid all comparisons'], correct: 1 },
    { id: 63, type: 'mcq', category: 'discussion', question: 'The discussion section is:', options: ['The easiest to write', 'The hardest section to write', 'Not important', 'Optional'], correct: 1 },
    { id: 64, type: 'mcq', category: 'discussion', question: 'Discussion aims to:', options: ['Show relationships among observed facts', 'Repeat the methods', 'List all references', 'Ignore the data'], correct: 0 },
    { id: 65, type: 'mcq', category: 'discussion', question: 'In the discussion, you should:', options: ['Ignore work in disagreement with yours', 'Not compare with published results', 'Compare published results with yours', 'Only mention supporting work'], correct: 2 },
    { id: 66, type: 'mcq', category: 'discussion', question: 'Many manuscripts are rejected because:', options: ['The discussion is strong', 'The discussion is weak', 'There are too many references', 'The methods are good'], correct: 1 },
    { id: 67, type: 'mcq', category: 'discussion', question: 'In discussion, you should NOT use:', options: ['Quantitative descriptions', 'Specific expressions', 'Unspecific expressions like "higher temperature"', 'Clear comparisons'], correct: 2 },
    { id: 68, type: 'mcq', category: 'discussion', question: 'In the conclusion, you should:', options: ['Repeat the abstract', 'Just list experimental results', 'Mention how your work advances the field', 'Ignore the significance'], correct: 2 },
    { id: 69, type: 'mcq', category: 'discussion', question: 'The conclusion should provide:', options: ['No justification', 'A clear scientific justification for your work', 'Random information', 'Only limitations'], correct: 1 },
    { id: 70, type: 'mcq', category: 'discussion', question: 'In the conclusion, you should:', options: ['Never mention future work', 'Indicate possible applications and extensions', 'Repeat all results', 'Avoid any suggestions'], correct: 1 },
    { id: 71, type: 'mcq', category: 'discussion', question: 'Without significant conclusion:', options: ['The paper will definitely be published', 'Reviewers will find it difficult to be published', 'Nothing happens', 'The paper becomes better'], correct: 1 },
    { id: 72, type: 'mcq', category: 'discussion', question: 'Acknowledgements should include:', options: ['Advisors', 'Financial supporters', 'Proofreaders', 'All of the above'], correct: 3 },
    { id: 73, type: 'mcq', category: 'discussion', question: 'Common reasons for rejection include:', options: ['The manuscript is appropriate for the journal', 'Original contribution', 'The manuscript is outside the scope of the journal', 'Good presentation'], correct: 2 },
    { id: 74, type: 'mcq', category: 'discussion', question: 'Manuscripts can be rejected for:', options: ['Excellent language', 'Clear content', 'Poor presentation and trivial treatment', 'Accurate information'], correct: 2 },
    { id: 75, type: 'mcq', category: 'discussion', question: 'Language errors that lead to rejection include:', options: ['Perfect spelling', 'Spelling, poor grammar, punctuation', 'Clear writing', 'Good structure'], correct: 1 },
    { id: 76, type: 'mcq', category: 'discussion', question: 'Reviewers check if:', options: ['The subject falls outside journal scope', 'The contribution is old and copied', 'The subject falls within journal scope', 'Conclusions are not supported by data'], correct: 2 },
    { id: 77, type: 'mcq', category: 'discussion', question: 'Reviewers ask if the description of method is:', options: ['Too short to understand', 'Sufficiently informative to allow replication', 'Incomplete', 'Vague'], correct: 1 },
    { id: 78, type: 'mcq', category: 'discussion', question: 'Reviewers check if:', options: ['Statistical methods are incorrect', 'Results are unclear', 'Statistical methods are correct and adequate', 'Tables are unnecessary'], correct: 2 },
    { id: 79, type: 'mcq', category: 'discussion', question: 'When evaluating manuscripts, reviewers check if:', options: ['The contribution is not new', 'The contribution is new', 'The paper is too short', 'Methods are unacceptable'], correct: 1 },
    { id: 80, type: 'mcq', category: 'discussion', question: 'Reviewers check if:', options: ['References are outdated', 'Language is poor', 'References are up to date', 'Writing is unclear'], correct: 2 },
    
    // True/False Questions
    { id: 81, type: 'tf', category: 'intro', question: 'Scientific writing aims to hide research findings.', correct: false },
    { id: 82, type: 'tf', category: 'intro', question: 'Good scientific writing gives the sense in short words.', correct: true },
    { id: 83, type: 'tf', category: 'intro', question: 'Research is the seeking and discovery of information that was known previously.', correct: false },
    { id: 84, type: 'tf', category: 'intro', question: 'Telling people about research is just as important as doing it.', correct: true },
    { id: 85, type: 'tf', category: 'intro', question: 'Knowledge is power.', correct: true },
    { id: 86, type: 'tf', category: 'intro', question: 'Poor writing can mask good experimentation.', correct: true },
    { id: 87, type: 'tf', category: 'intro', question: 'Books and book chapters are types of scientific writing communication.', correct: true },
    { id: 88, type: 'tf', category: 'intro', question: 'Clinical commentary is NOT a type of submission.', correct: false },
    { id: 89, type: 'tf', category: 'intro', question: 'You should eliminate unnecessary redundancy in scientific writing.', correct: true },
    { id: 90, type: 'tf', category: 'intro', question: 'You should use digressions frequently in scientific writing.', correct: false },
    { id: 91, type: 'tf', category: 'intro', question: 'Simple sentences are preferred over complicated sentences.', correct: true },
    { id: 92, type: 'tf', category: 'intro', question: 'Passive voice is always preferred over active voice.', correct: false },
    { id: 93, type: 'tf', category: 'intro', question: 'You should avoid using the indefinite "this".', correct: true },
    { id: 94, type: 'tf', category: 'intro', question: 'Proofreading your paper carefully is important.', correct: true },
    { id: 95, type: 'tf', category: 'intro', question: 'Editors make sure only articles meeting journal standards are published.', correct: true },
    { id: 96, type: 'tf', category: 'intro', question: 'All research is equally easy to publish.', correct: false },
    { id: 97, type: 'tf', category: 'intro', question: 'Scientific journals have specific requirements.', correct: true },
    { id: 98, type: 'tf', category: 'intro', question: 'You should submit to multiple journals simultaneously.', correct: false },
    { id: 99, type: 'tf', category: 'intro', question: 'Peer review is a review process for scientists by scientists.', correct: true },
    { id: 100, type: 'tf', category: 'intro', question: 'The paper being out of scope is a common problem according to editors.', correct: true },
    { id: 101, type: 'tf', category: 'structure', question: 'A title should be ambiguous.', correct: false },
    { id: 102, type: 'tf', category: 'structure', question: 'A title should use keywords to help electronic search programs.', correct: true },
    { id: 103, type: 'tf', category: 'structure', question: 'A title can be too short or too long.', correct: true },
    { id: 104, type: 'tf', category: 'structure', question: 'A title should contain abbreviations and chemical formulas.', correct: false },
    { id: 105, type: 'tf', category: 'structure', question: 'A title should be free of errors or spelling mistakes.', correct: true },
    { id: 106, type: 'tf', category: 'structure', question: 'An abstract is written before starting the paper.', correct: false },
    { id: 107, type: 'tf', category: 'structure', question: 'An abstract typically contains 200 to 250 words.', correct: true },
    { id: 108, type: 'tf', category: 'structure', question: 'The introduction provides the objective and background of research.', correct: true },
    { id: 109, type: 'tf', category: 'structure', question: 'Using first person in introduction is a common mistake.', correct: true },
    { id: 110, type: 'tf', category: 'structure', question: 'Editors love references irrelevant to the work.', correct: false },
    { id: 111, type: 'tf', category: 'structure', question: 'Reviewers hate excessive use of expressions such as "Novel" and "First time".', correct: true },
    { id: 112, type: 'tf', category: 'structure', question: 'The method section should provide sufficient detail for work reproduction.', correct: true },
    { id: 113, type: 'tf', category: 'structure', question: 'You should repeat details of established methods.', correct: false },
    { id: 114, type: 'tf', category: 'structure', question: 'Flowcharts can be used in the method section.', correct: true },
    { id: 115, type: 'tf', category: 'structure', question: 'Figures and tables should be numbered randomly.', correct: false },
    { id: 116, type: 'tf', category: 'structure', question: 'You should use trade names of chemicals in materials section.', correct: false },
    { id: 117, type: 'tf', category: 'structure', question: 'If human subjects are used, consent should be described.', correct: true },
    { id: 118, type: 'tf', category: 'results', question: 'Good authors highlight all points in the results section.', correct: false },
    { id: 119, type: 'tf', category: 'results', question: 'Results and discussion can be combined in the same section.', correct: true },
    { id: 120, type: 'tf', category: 'results', question: 'Keeping results and discussion separate is more common.', correct: true },
    { id: 121, type: 'tf', category: 'results', question: 'You should refer to every table and figure by a number.', correct: true },
    { id: 122, type: 'tf', category: 'results', question: 'It is preferred to start a sentence with a number followed by a unit.', correct: false },
    { id: 123, type: 'tf', category: 'results', question: 'In text, use \'to\' instead of a dash to express a range.', correct: true },
    { id: 124, type: 'tf', category: 'results', question: 'Tables are useful for showing actual data values and their precisions.', correct: true },
    { id: 125, type: 'tf', category: 'results', question: 'Weak descriptive titles reduce the power of tables.', correct: true },
    { id: 126, type: 'tf', category: 'results', question: 'You should include redundant data in tables.', correct: false },
    { id: 127, type: 'tf', category: 'results', question: 'In tables, use \'-\' if data is not available.', correct: false },
    { id: 128, type: 'tf', category: 'results', question: 'You should write raw data in tables.', correct: false },
    { id: 129, type: 'tf', category: 'results', question: 'Use a zero before decimal for values less than 1.', correct: true },
    { id: 130, type: 'tf', category: 'results', question: 'A table should be self-explanatory.', correct: true },
    { id: 131, type: 'tf', category: 'discussion', question: 'Figures are useful for showing overall trends.', correct: true },
    { id: 132, type: 'tf', category: 'discussion', question: 'Choosing the wrong figure type is a common weakness.', correct: true },
    { id: 133, type: 'tf', category: 'discussion', question: 'Axes in figures don\'t need to be labeled.', correct: false },
    { id: 134, type: 'tf', category: 'discussion', question: 'All symbols and notations should be explained in figures.', correct: true },
    { id: 135, type: 'tf', category: 'discussion', question: 'Pie charts and bar charts are common figure types.', correct: true },
    { id: 136, type: 'tf', category: 'discussion', question: 'Discussion means discussion of others\' results only.', correct: false },
    { id: 137, type: 'tf', category: 'discussion', question: 'The discussion should relate closely to the paper title.', correct: true },
    { id: 138, type: 'tf', category: 'discussion', question: 'You should show how your results agree or disagree with previous work.', correct: true },
    { id: 139, type: 'tf', category: 'discussion', question: 'Discussion is the easiest section to write.', correct: false },
    { id: 140, type: 'tf', category: 'discussion', question: 'Discussion aims to show relationships among observed facts.', correct: true },
    { id: 141, type: 'tf', category: 'discussion', question: 'You should ignore work in disagreement with yours in discussion.', correct: false },
    { id: 142, type: 'tf', category: 'discussion', question: 'Many manuscripts are rejected because the discussion is weak.', correct: true },
    { id: 143, type: 'tf', category: 'discussion', question: 'Unspecific expressions like "higher temperature" should be used.', correct: false },
    { id: 144, type: 'tf', category: 'discussion', question: 'Quantitative descriptions are always preferred.', correct: true },
    { id: 145, type: 'tf', category: 'discussion', question: 'In conclusion, you should repeat the abstract.', correct: false },
    { id: 146, type: 'tf', category: 'discussion', question: 'The conclusion should mention how your work advances the field.', correct: true },
    { id: 147, type: 'tf', category: 'discussion', question: 'Without significant conclusion, reviewers will find it difficult to publish.', correct: true },
    { id: 148, type: 'tf', category: 'discussion', question: 'You should indicate possible applications in the conclusion.', correct: true },
    { id: 149, type: 'tf', category: 'discussion', question: 'Acknowledgements should include advisors and financial supporters.', correct: true },
    { id: 150, type: 'tf', category: 'discussion', question: 'Manuscripts being outside journal scope is a reason for rejection.', correct: true },

    // NEW QUESTIONS - Lecture 6: Basics of Writing Scientific Research
    // Why Referencing Matters
    { id: 151, type: 'mcq', category: 'new', question: 'What is one of the main purposes of referencing in scientific research?', options: ['To increase the word count of the paper', 'To give credit to others\' work', 'To make the paper look more professional only', 'To confuse readers'], correct: 1 },
    { id: 152, type: 'mcq', category: 'new', question: 'Which of the following is NOT a reason why referencing matters?', options: ['Gives credit to others\' work', 'Avoids plagiarism', 'Shows research background', 'Increases the number of pages'], correct: 3 },
    { id: 153, type: 'mcq', category: 'new', question: 'How does referencing improve your paper?', options: ['Makes it longer', 'Improves credibility', 'Adds more authors', 'Reduces the need for experiments'], correct: 1 },
    { id: 154, type: 'mcq', category: 'new', question: 'Referencing helps to avoid which serious academic offense?', options: ['Plagiarism', 'Copyright', 'Authorship', 'Publishing'], correct: 0 },
    // IEEE Referencing Basics
    { id: 155, type: 'mcq', category: 'new', question: 'What symbol does IEEE use for in-text citations?', options: ['Superscript numbers', 'Numbers in brackets', 'Author names in parentheses', 'Footnotes with asterisks'], correct: 1 },
    { id: 156, type: 'mcq', category: 'new', question: 'In IEEE style, references appear in what order?', options: ['Alphabetical by author name', 'By importance', 'Order cited in the text', 'Random order'], correct: 2 },
    { id: 157, type: 'mcq', category: 'new', question: 'What is the main advantage of short in-text citations in IEEE style?', options: ['Saves paper', 'Keeps writing clear', 'Reduces references needed', 'Makes reading faster'], correct: 1 },
    { id: 158, type: 'mcq', category: 'new', question: 'Which format represents correct IEEE in-text citation?', options: ['(Author, 2023)', '[1]', 'Author¹', '{1}'], correct: 1 },
    { id: 159, type: 'mcq', category: 'new', question: 'How many reference styles are mentioned as IEEE uses?', options: ['Alphabetical style', 'Numbered style', 'Harvard style', 'APA style'], correct: 1 },
    // Structure of an IEEE Reference
    { id: 160, type: 'mcq', category: 'new', question: 'What is the FIRST element in an IEEE reference structure?', options: ['Title', 'Year', 'Author initials + surname', 'Journal name'], correct: 2 },
    { id: 161, type: 'mcq', category: 'new', question: 'How should the title appear in an IEEE reference?', options: ['In italics', 'In quotation marks', 'In bold', 'Underlined'], correct: 1 },
    { id: 162, type: 'mcq', category: 'new', question: 'How should the journal or book name appear in IEEE reference?', options: ['In quotation marks', 'In bold', 'In italics', 'In capital letters'], correct: 2 },
    { id: 163, type: 'mcq', category: 'new', question: 'What is the LAST element typically included in an IEEE reference?', options: ['Author name', 'Title', 'Pages', 'Year'], correct: 3 },
    { id: 164, type: 'mcq', category: 'new', question: 'Which of the following should be included in an IEEE reference structure?', options: ['Volume, issue, pages, and year', 'Only author and title', 'Only year and pages', 'Only journal name'], correct: 0 },
    // IEEE Reference Examples - Journal
    { id: 165, type: 'mcq', category: 'new', question: 'In the journal reference example, what is the correct format for the author name "J. K. Author"?', options: ['Author, J.K.', 'J. K. Author', 'Author J.K.', 'J.K. Author'], correct: 1 },
    { id: 166, type: 'mcq', category: 'new', question: 'What volume number is shown in the IEEE journal reference example?', options: ['55', '3', '123', '2023'], correct: 0 },
    { id: 167, type: 'mcq', category: 'new', question: 'What issue number is shown in the IEEE journal reference example?', options: ['55', '3', '123', '2023'], correct: 1 },
    { id: 168, type: 'mcq', category: 'new', question: 'What are the page numbers in the IEEE journal reference example?', options: ['55–60', '3–10', '123–130', '44–49'], correct: 2 },
    { id: 169, type: 'mcq', category: 'new', question: 'What year is shown in the IEEE journal reference example?', options: ['2022', '2023', '2024', '2025'], correct: 1 },
    { id: 170, type: 'mcq', category: 'new', question: 'What is the abbreviated journal name in the example?', options: ['IEEE Trans. Antennas Propag.', 'IEEE Conference', 'IEEE Trans. Instrum. Meas.', 'IEEE Access'], correct: 0 },
    // IEEE Reference Examples - Conference
    { id: 171, type: 'mcq', category: 'new', question: 'In the conference reference example, who is the author?', options: ['J. K. Author', 'A. Smith', 'M. Young', 'A. Ahmed'], correct: 1 },
    { id: 172, type: 'mcq', category: 'new', question: 'What phrase is used before the conference name in IEEE format?', options: ['at', 'during', 'in Proc.', 'held in'], correct: 2 },
    { id: 173, type: 'mcq', category: 'new', question: 'Where was the conference held in the example?', options: ['London', 'Paris', 'New York', 'Cairo'], correct: 1 },
    { id: 174, type: 'mcq', category: 'new', question: 'What year is the conference in the example?', options: ['2022', '2023', '2024', '2025'], correct: 2 },
    { id: 175, type: 'mcq', category: 'new', question: 'What are the page numbers for the conference paper example?', options: ['123–130', '44–49', '1–10', '55–60'], correct: 1 },
    // IEEE Reference Examples - Book
    { id: 176, type: 'mcq', category: 'new', question: 'Who is the author in the book reference example?', options: ['J. K. Author', 'A. Smith', 'M. Young', 'IEEE'], correct: 2 },
    { id: 177, type: 'mcq', category: 'new', question: 'What is the book title in the example?', options: ['Modern Microwave Sensors', 'The Technical Writer\'s Handbook', 'About IEEE Xplore', 'Wireless Circuits'], correct: 1 },
    { id: 178, type: 'mcq', category: 'new', question: 'What edition is mentioned in the book reference example?', options: ['1st ed.', '2nd ed.', '3rd ed.', '4th ed.'], correct: 1 },
    { id: 179, type: 'mcq', category: 'new', question: 'What year is the book published in the example?', options: ['2021', '2022', '2023', '2024'], correct: 1 },
    // IEEE Reference Examples - Website
    { id: 180, type: 'mcq', category: 'new', question: 'Who is listed as the author for the website reference example?', options: ['J. K. Author', 'A. Smith', 'M. Young', 'IEEE'], correct: 3 },
    { id: 181, type: 'mcq', category: 'new', question: 'What special notation is used for online sources in IEEE format?', options: ['[Website]', '[Online]', '[Internet]', '[Web]'], correct: 1 },
    { id: 182, type: 'mcq', category: 'new', question: 'What phrase comes before the URL in IEEE website references?', options: ['Found at:', 'See:', 'Available:', 'Located at:'], correct: 2 },
    { id: 183, type: 'mcq', category: 'new', question: 'What is the website title in the example?', options: ['IEEE Xplore Database', 'About IEEE Xplore', 'IEEE Online', 'IEEE Digital Library'], correct: 1 },
    // Good vs. Bad Referencing
    { id: 184, type: 'mcq', category: 'new', question: 'In the good referencing example, who is the author?', options: ['J. K. Author', 'A. Ahmed', 'A. Smith', 'M. Young'], correct: 1 },
    { id: 185, type: 'mcq', category: 'new', question: 'What is the paper title in the good referencing example?', options: ['The Technical Writer\'s Handbook', 'Wireless Circuits', 'Modern Microwave Sensors', 'Microwave Design'], correct: 2 },
    { id: 186, type: 'mcq', category: 'new', question: 'What journal is mentioned in the good referencing example?', options: ['IEEE Trans. Antennas Propag.', 'IEEE Trans. Instrum. Meas.', 'IEEE Sensors Journal', 'IEEE Access'], correct: 1 },
    { id: 187, type: 'mcq', category: 'new', question: 'What year is mentioned in the good referencing example?', options: ['2022', '2023', '2024', '2025'], correct: 2 },
    { id: 188, type: 'mcq', category: 'new', question: 'What is the main problem with the bad reference example?', options: ['Wrong year', 'Wrong author name', 'Not using [number] format', 'Missing journal name'], correct: 2 },
    { id: 189, type: 'mcq', category: 'new', question: 'In the bad reference example, how is the author name formatted?', options: ['A. Ahmed', 'Ahmed, A.', 'Ahmed A.', 'A Ahmed'], correct: 1 },
    { id: 190, type: 'mcq', category: 'new', question: 'What format should ALWAYS be used in IEEE referencing?', options: ['(Author, Year)', '[number] format', 'Author (Year)', 'Superscript numbers'], correct: 1 },
    // Reference List Tips
    { id: 191, type: 'mcq', category: 'new', question: 'How should references be numbered in IEEE format?', options: ['Alphabetically by author', 'By importance', 'In order of appearance', 'Randomly'], correct: 2 },
    { id: 192, type: 'mcq', category: 'new', question: 'What type of indent format should be used for references?', options: ['No indent', 'First line indent', 'Hanging indent', 'Center alignment'], correct: 2 },
    { id: 193, type: 'mcq', category: 'new', question: 'What should be consistent throughout the reference list?', options: ['Only font', 'Only style', 'Font and style', 'Only punctuation'], correct: 2 },
    { id: 194, type: 'mcq', category: 'new', question: 'What should be checked carefully in references?', options: ['Author nationality', 'Correct punctuation', 'Number of authors', 'Institution name'], correct: 1 },
    // Author Biography Purpose
    { id: 195, type: 'mcq', category: 'new', question: 'What is one main purpose of an author biography?', options: ['To make the paper longer', 'To show academic background', 'To list all publications', 'To describe personal life'], correct: 1 },
    { id: 196, type: 'mcq', category: 'new', question: 'How does an author biography help the paper?', options: ['Increases page count', 'Gives credibility and recognition', 'Adds more references', 'Makes it more colorful'], correct: 1 },
    { id: 197, type: 'mcq', category: 'new', question: 'How long should an author biography typically be?', options: ['1–2 sentences', '3–5 sentences', '1–2 paragraphs', 'Half a page'], correct: 1 },
    { id: 198, type: 'mcq', category: 'new', question: 'What should be included in an author biography?', options: ['Personal hobbies', 'Family information', 'Academic background', 'Political views'], correct: 2 },
    // Biography Example
    { id: 199, type: 'mcq', category: 'new', question: 'What is the name of the person in the biography example?', options: ['Dr. John Doe', 'Dr. Jane Doe', 'Prof. Jane Smith', 'Dr. Ahmed Ali'], correct: 1 },
    { id: 200, type: 'mcq', category: 'new', question: 'What IEEE membership level is mentioned in the example?', options: ['Student Member', 'Member', 'Senior Member', 'Fellow'], correct: 2 },
    { id: 201, type: 'mcq', category: 'new', question: 'When did Dr. Jane Doe receive her Ph.D. according to the example?', options: ['2013', '2014', '2015', '2016'], correct: 2 },
    { id: 202, type: 'mcq', category: 'new', question: 'What is Dr. Jane Doe\'s current position in the example?', options: ['Professor', 'Associate Professor', 'Assistant Professor', 'Lecturer'], correct: 1 },
    { id: 203, type: 'mcq', category: 'new', question: 'Where does Dr. Jane Doe work according to the example?', options: ['ABC University', 'XYZ University', 'IEEE University', 'Cairo University'], correct: 1 },
    { id: 204, type: 'mcq', category: 'new', question: 'What are Dr. Jane Doe\'s research interests according to the example?', options: ['Software and databases', 'Antennas and sensors', 'Networks and security', 'AI and machine learning'], correct: 1 },
    { id: 205, type: 'mcq', category: 'new', question: 'What three elements should be included in a biography according to the tip?', options: ['Name, age, and hobby', 'Title, position, and main research interests', 'Degree, year, and country', 'University, department, and publications'], correct: 1 },
    // Writing Multiple Biographies
    { id: 206, type: 'mcq', category: 'new', question: 'How should multiple author biographies be written?', options: ['All together in one paragraph', 'Each author separately', 'Only for the first author', 'Combined by institution'], correct: 1 },
    { id: 207, type: 'mcq', category: 'new', question: 'What should be included for each author in their biography?', options: ['Personal phone number', 'Name, position, and research area', 'Home address', 'Family members'], correct: 1 },
    { id: 208, type: 'mcq', category: 'new', question: 'What should be mentioned in a biography if applicable?', options: ['Political affiliation', 'Religious beliefs', 'IEEE membership', 'Marital status'], correct: 2 },
    { id: 209, type: 'mcq', category: 'new', question: 'What tone should author biographies maintain?', options: ['Casual and funny', 'Professional and brief', 'Long and detailed', 'Personal and emotional'], correct: 1 },
    // Copyright in Scientific Journals
    { id: 210, type: 'mcq', category: 'new', question: 'What does copyright mean in the context of scientific journals?', options: ['Right to copy others\' work', 'Ownership of your paper', 'Permission to plagiarize', 'Free access for everyone'], correct: 1 },
    { id: 211, type: 'mcq', category: 'new', question: 'When you publish in IEEE, what do you allow them to do?', options: ['Delete your paper', 'Change your name', 'Publish your paper', 'Sell your data'], correct: 2 },
    { id: 212, type: 'mcq', category: 'new', question: 'What rights do you keep after copyright transfer?', options: ['No rights at all', 'Right to reuse for teaching or research', 'Right to sell to other journals', 'Right to prevent citations'], correct: 1 },
    { id: 213, type: 'mcq', category: 'new', question: 'What does IEEE allow for personal use according to copyright?', options: ['Commercial use', 'Personal use permitted', 'No use allowed', 'Modification only'], correct: 1 },
    // Copyright Transfer Example
    { id: 214, type: 'mcq', category: 'new', question: 'What year is shown in the copyright example?', options: ['2023', '2024', '2025', '2026'], correct: 2 },
    { id: 215, type: 'mcq', category: 'new', question: 'What is permitted according to the copyright transfer example?', options: ['Commercial use', 'Personal use', 'Reselling', 'Plagiarism'], correct: 1 },
    { id: 216, type: 'mcq', category: 'new', question: 'What requires IEEE permission according to the example?', options: ['Reading the paper', 'Citing the paper', 'Reprinting or republishing', 'Personal use'], correct: 2 },
    { id: 217, type: 'mcq', category: 'new', question: 'How is copyright transfer handled in IEEE?', options: ['By mail', 'By phone', 'Online through IEEE Author Gateway', 'In person'], correct: 2 },
    // Open Access Publishing
    { id: 218, type: 'mcq', category: 'new', question: 'What does Open Access publishing make possible?', options: ['Paper is free to read online', 'Paper is secret', 'Paper costs more', 'Paper is limited access'], correct: 0 },
    { id: 219, type: 'mcq', category: 'new', question: 'Who pays the Article Processing Charge (APC) in Open Access?', options: ['Readers', 'Author', 'University library', 'IEEE'], correct: 1 },
    { id: 220, type: 'mcq', category: 'new', question: 'What is APC an abbreviation for?', options: ['Article Publication Cost', 'Article Processing Charge', 'Author Payment Code', 'Access Publication Charge'], correct: 1 },
    { id: 221, type: 'mcq', category: 'new', question: 'Which of the following is an Open Access license type mentioned?', options: ['CC-BY', 'GPL', 'MIT', 'BSD'], correct: 0 },
    { id: 222, type: 'mcq', category: 'new', question: 'Which of the following is another Open Access license type mentioned?', options: ['Apache', 'CC-BY-NC', 'LGPL', 'Mozilla'], correct: 1 },
    // What Are Journal Metrics?
    { id: 223, type: 'mcq', category: 'new', question: 'What do journal metrics measure?', options: ['How long a journal has existed', 'How strong a journal is', 'How many editors a journal has', 'How expensive a journal is'], correct: 1 },
    { id: 224, type: 'mcq', category: 'new', question: 'How do journal metrics help researchers?', options: ['Choose the right publication venue', 'Write better papers', 'Find more references', 'Get more funding'], correct: 0 },
    { id: 225, type: 'mcq', category: 'new', question: 'Which of the following is an example of a journal metric?', options: ['Impact Factor', 'Number of pages', 'Publication frequency', 'Journal color'], correct: 0 },
    { id: 226, type: 'mcq', category: 'new', question: 'Which of the following is mentioned as a journal metric?', options: ['Acceptance rate', 'SJR', 'Editor count', 'Subscription cost'], correct: 1 },
    { id: 227, type: 'mcq', category: 'new', question: 'Which of the following is mentioned as a journal metric?', options: ['Number of issues per year', 'Quartile Rank', 'Number of editors', 'Journal age'], correct: 1 },
    // Impact Factor and SJR
    { id: 228, type: 'mcq', category: 'new', question: 'What does Impact Factor (IF) measure?', options: ['Number of authors', 'Average citations per article', 'Number of issues per year', 'Journal age'], correct: 1 },
    { id: 229, type: 'mcq', category: 'new', question: 'What does SJR stand for?', options: ['Scientific Journal Rating', 'Scimago Journal Rank', 'Standard Journal Ranking', 'Superior Journal Review'], correct: 1 },
    { id: 230, type: 'mcq', category: 'new', question: 'What does SJR consider in its ranking?', options: ['Number of authors', 'Publication frequency', 'Prestige of citations', 'Journal cost'], correct: 2 },
    { id: 231, type: 'mcq', category: 'new', question: 'What does Q1 represent in quartile ranking?', options: ['Bottom 25%', 'Middle 50%', 'Top 25%', 'Top 10%'], correct: 2 },
    { id: 232, type: 'mcq', category: 'new', question: 'What does Q4 represent in quartile ranking?', options: ['Top 25%', 'Second 25%', 'Third 25%', 'Lowest 25%'], correct: 3 },
    { id: 233, type: 'mcq', category: 'new', question: 'How many quartiles are there in journal ranking?', options: ['2', '3', '4', '5'], correct: 2 },
    // Example: Journal Comparison
    { id: 234, type: 'mcq', category: 'new', question: 'What is the Impact Factor of IEEE Access mentioned in the example?', options: ['3.9', '4.8', '5.0', '6.2'], correct: 0 },
    { id: 235, type: 'mcq', category: 'new', question: 'What quartile is IEEE Access according to the example?', options: ['Q4', 'Q3', 'Q2', 'Q1'], correct: 3 },
    { id: 236, type: 'mcq', category: 'new', question: 'What is the Impact Factor of IEEE Sensors Journal in the example?', options: ['3.9', '4.8', '5.5', '6.0'], correct: 1 },
    { id: 237, type: 'mcq', category: 'new', question: 'What quartile is IEEE Sensors Journal according to the example?', options: ['Q4', 'Q3', 'Q2', 'Q1'], correct: 3 },
    { id: 238, type: 'mcq', category: 'new', question: 'What do Q1 journals represent according to the lecture?', options: ['Low quality', 'Medium quality', 'High quality and visibility', 'New journals'], correct: 2 },
    { id: 239, type: 'mcq', category: 'new', question: 'Between IEEE Access and IEEE Sensors Journal, which has a higher Impact Factor?', options: ['IEEE Access', 'IEEE Sensors Journal', 'Both equal', 'Neither has IF'], correct: 1 },
    // Ethics in Publishing
    { id: 240, type: 'mcq', category: 'new', question: 'Which of the following is prohibited in ethical publishing?', options: ['Citing recent papers', 'Plagiarism', 'Using IEEE format', 'Writing biographies'], correct: 1 },
    { id: 241, type: 'mcq', category: 'new', question: 'What should NOT be included in your research according to ethics?', options: ['Real data', 'Proper references', 'Fake data', 'Author biographies'], correct: 2 },
    { id: 242, type: 'mcq', category: 'new', question: 'Who should be included as authors according to publishing ethics?', options: ['All university staff', 'All friends', 'All real contributors', 'All department members'], correct: 2 },
    { id: 243, type: 'mcq', category: 'new', question: 'What type of citation abuse should be avoided?', options: ['Citing recent papers', 'Self-citation abuse', 'Citing IEEE papers', 'Citing conference papers'], correct: 1 },
    { id: 244, type: 'mcq', category: 'new', question: 'What type of journals should be used?', options: ['Any available journal', 'Free journals only', 'Expensive journals only', 'Trusted, indexed journals'], correct: 3 },
    // Class Activity - Error Spotting
    { id: 245, type: 'mcq', category: 'new', question: 'In reference "1) A. Smith, \'Microwave Design\', 2024." what is the main error?', options: ['Wrong year', 'Missing [number] format', 'Wrong author name', 'Missing pages'], correct: 1 },
    { id: 246, type: 'mcq', category: 'new', question: 'In reference "2) [3] IEEE, \'Online Tools\'." what is unusual about the numbering?', options: ['It starts with [1]', 'It uses [3] as the second reference', 'It has no number', 'It uses wrong brackets'], correct: 1 },
    { id: 247, type: 'mcq', category: 'new', question: 'In reference "3) [1] J. Doe, \'Wireless Circuits\', IEEE Trans., 2023." what information is incomplete?', options: ['Author name', 'Title', 'Full journal details (volume, issue, pages)', 'Year'], correct: 2 },
    { id: 248, type: 'mcq', category: 'new', question: 'What punctuation is used incorrectly in "1) A. Smith, \'Microwave Design\', 2024."?', options: ['Period', 'Single quotes instead of double quotes', 'Comma', 'No error'], correct: 1 },
    { id: 249, type: 'mcq', category: 'new', question: 'Which reference in the activity is missing important citation details?', options: ['Reference 1', 'Reference 2', 'Reference 3', 'All of them'], correct: 3 },
    // Summary & Discussion Topics
    { id: 250, type: 'mcq', category: 'new', question: 'According to the summary, what style should be used for clear referencing?', options: ['APA style', 'Harvard style', 'IEEE style', 'MLA style'], correct: 2 },
    { id: 251, type: 'mcq', category: 'new', question: 'What type of biographies should be written according to the summary?', options: ['Long biographies', 'Concise biographies', 'Detailed biographies', 'Personal biographies'], correct: 1 },
    { id: 252, type: 'mcq', category: 'new', question: 'What should be transferred properly according to the summary?', options: ['Data', 'Money', 'Copyright', 'Authorship'], correct: 2 },
    { id: 253, type: 'mcq', category: 'new', question: 'What characteristic should journals have when selecting them?', options: ['Cheap fees', 'Fast publication', 'Strong metrics', 'Many pages'], correct: 2 },
    { id: 254, type: 'mcq', category: 'new', question: 'What approach should be maintained in publishing according to the summary?', options: ['Fast and cheap', 'Ethical and accurate', 'Quick and easy', 'Simple and short'], correct: 1 },
    // Poster Questions
    // What is a Poster?
    { id: 351, type: 'mcq', category: 'new', question: 'What is a poster?', options: ['A small printed notice', 'A placard usually a large printed notice with pictures', 'A digital presentation', 'A research paper'], correct: 1 },
    { id: 352, type: 'mcq', category: 'new', question: 'What does a poster typically imply?', options: ['Only decorative purposes', 'A message or ideas', 'Author\'s biography', 'Publication fees'], correct: 1 },
    { id: 353, type: 'mcq', category: 'new', question: 'A poster is often illustrated to:', options: ['Make it expensive', 'Advertise and publicize something', 'Fill empty space', 'Replace written content'], correct: 1 },
    { id: 354, type: 'mcq', category: 'new', question: 'A poster is described as:', options: ['A small announcement', 'A large printed placard or announcement', 'A video presentation', 'An oral speech'], correct: 1 },
    { id: 355, type: 'mcq', category: 'new', question: 'Is a poster usually large or small?', options: ['Always small', 'Medium sized', 'Usually large', 'Size doesn\'t matter'], correct: 2 },
    // Goals of Poster Presentation
    { id: 356, type: 'mcq', category: 'new', question: 'Where are poster presentations commonly used?', options: ['In shopping malls', 'In academia', 'In restaurants', 'In theaters'], correct: 1 },
    { id: 357, type: 'mcq', category: 'new', question: 'What is one main purpose of poster presentations in academia?', options: ['Entertain audience', 'Promote and explain research work', 'Replace journal publications', 'Reduce research costs'], correct: 1 },
    { id: 358, type: 'mcq', category: 'new', question: 'During what events are poster presentations typically shown?', options: ['Weddings', 'Conferences', 'Sports events', 'Concerts'], correct: 1 },
    { id: 359, type: 'mcq', category: 'new', question: 'What is one goal of poster presentations?', options: ['Stimulate interest and discussion', 'Replace oral presentations completely', 'Avoid interaction', 'Hide research details'], correct: 0 },
    { id: 360, type: 'mcq', category: 'new', question: 'Poster presentations help to:', options: ['Avoid contact with others', 'Generate contacts', 'Isolate researchers', 'End discussions'], correct: 1 },
    { id: 361, type: 'mcq', category: 'new', question: 'How many main goals are mentioned for poster presentations?', options: ['One', 'Two', 'Three', 'Four'], correct: 1 },
    // Poster Designing Process
    { id: 362, type: 'mcq', category: 'new', question: 'What is the first step in the poster designing process?', options: ['Print immediately', 'Formulate and articulate your ideas', 'Choose colors', 'Add pictures'], correct: 1 },
    { id: 363, type: 'mcq', category: 'new', question: 'What should you know before designing a poster?', options: ['Printing costs', 'Your target audience', 'Paper type', 'Frame size'], correct: 1 },
    { id: 364, type: 'mcq', category: 'new', question: 'What question should you ask yourself when designing?', options: ['How expensive can I make it?', 'What do you want to achieve with the poster?', 'How many colors exist?', 'What frame to use?'], correct: 1 },
    { id: 365, type: 'mcq', category: 'new', question: 'How many main steps are mentioned in the poster designing process?', options: ['One', 'Two', 'Three', 'Four'], correct: 2 },
    // Layout of Poster
    { id: 366, type: 'mcq', category: 'new', question: 'What should you try to create in poster layout?', options: ['Random arrangement', 'Visual sequence', 'Chaotic design', 'Hidden messages'], correct: 1 },
    { id: 367, type: 'mcq', category: 'new', question: 'Do you need to fill every inch of the poster?', options: ['Yes, always fill everything', 'No, white space is good', 'Only if using images', 'Only for conferences'], correct: 1 },
    { id: 368, type: 'mcq', category: 'new', question: 'What is good to have in poster layout?', options: ['No empty space', 'White space', 'Only text', 'Only images'], correct: 1 },
    { id: 369, type: 'mcq', category: 'new', question: 'How many main colors should you use?', options: ['One', 'Two-three', 'Five-six', 'As many as possible'], correct: 1 },
    { id: 370, type: 'mcq', category: 'new', question: 'What should be consistent in your poster?', options: ['Nothing needs consistency', 'Use a single color for all headings', 'Random colors everywhere', 'Different fonts for each word'], correct: 1 },
    { id: 371, type: 'mcq', category: 'new', question: 'What should you determine for materials?', options: ['Cost', 'Logical sequence', 'Weight', 'Chemical composition'], correct: 1 },
    { id: 372, type: 'mcq', category: 'new', question: 'How should you organize materials?', options: ['Randomly', 'Into sections', 'By color only', 'By size only'], correct: 1 },
    { id: 373, type: 'mcq', category: 'new', question: 'Why should you give numbers to sections?', options: ['For decoration', 'For making flow obvious', 'To increase word count', 'To confuse readers'], correct: 1 },
    { id: 374, type: 'mcq', category: 'new', question: 'How should material be arranged?', options: ['In circles', 'Into columns', 'Diagonally only', 'In one long line'], correct: 1 },
    // Illustrative Material
    { id: 375, type: 'mcq', category: 'new', question: 'Which of the following is mentioned as illustrative material?', options: ['Photographs', 'Audio files', 'Videos only', '3D models'], correct: 0 },
    { id: 376, type: 'mcq', category: 'new', question: 'What type of visual material is mentioned?', options: ['Charts and graphs', 'Movies', 'Animations', 'Holograms'], correct: 0 },
    { id: 377, type: 'mcq', category: 'new', question: 'Can quotes be used as illustrative material?', options: ['No, never', 'Yes', 'Only in medicine', 'Only in engineering'], correct: 1 },
    { id: 378, type: 'mcq', category: 'new', question: 'Are icons part of illustrative material?', options: ['No', 'Yes', 'Only if animated', 'Only if colored'], correct: 1 },
    { id: 379, type: 'mcq', category: 'new', question: 'What quality should images have?', options: ['Low resolution', 'Good resolution', 'Black and white only', 'Blurry'], correct: 1 },
    { id: 380, type: 'mcq', category: 'new', question: 'Can logos be included in illustrative material?', options: ['No, never', 'Yes', 'Only company logos', 'Only university logos'], correct: 1 },
    { id: 381, type: 'mcq', category: 'new', question: 'What should you do with images you use?', options: ['Never mention source', 'Reference any images you use', 'Claim as your own', 'Modify without credit'], correct: 1 },
    { id: 382, type: 'mcq', category: 'new', question: 'How many types of illustrative materials are mentioned?', options: ['Three', 'Four', 'Six', 'Eight'], correct: 2 },
    // Poster Layout Design
    { id: 383, type: 'mcq', category: 'new', question: 'What should you do before starting the actual poster?', options: ['Print immediately', 'Sketch your layout', 'Buy materials', 'Write conclusions'], correct: 1 },
    { id: 384, type: 'mcq', category: 'new', question: 'According to the layout example, what comes first?', options: ['Conclusion', 'Title and Intro', 'References', 'Methods'], correct: 1 },
    { id: 385, type: 'mcq', category: 'new', question: 'Where is the conclusion typically placed in the layout shown?', options: ['At the beginning', 'In the middle', 'At the end', 'Randomly'], correct: 2 },
    // Poster Contents
    { id: 386, type: 'mcq', category: 'new', question: 'What is the first element in poster contents?', options: ['Conclusion', 'Title', 'References', 'Methods'], correct: 1 },
    { id: 387, type: 'mcq', category: 'new', question: 'What should be included after the title?', options: ['Conclusion', 'Author and affiliations', 'References', 'Data'], correct: 1 },
    { id: 388, type: 'mcq', category: 'new', question: 'Is introduction part of poster contents?', options: ['No', 'Yes', 'Optional', 'Only for conferences'], correct: 1 },
    { id: 389, type: 'mcq', category: 'new', question: 'Should methods be included in poster contents?', options: ['No, never', 'Yes', 'Only in medical posters', 'Only in engineering posters'], correct: 1 },
    { id: 390, type: 'mcq', category: 'new', question: 'What should be presented in the poster?', options: ['Only introduction', 'Data and results', 'Only references', 'Only title'], correct: 1 },
    { id: 391, type: 'mcq', category: 'new', question: 'Should conclusions be included?', options: ['No', 'Yes, conclusions and future work', 'Only conclusions', 'Only future work'], correct: 1 },
    { id: 392, type: 'mcq', category: 'new', question: 'Are references part of poster contents?', options: ['No, never needed', 'Yes, references and acknowledgements', 'Only references', 'Only acknowledgements'], correct: 1 },
    { id: 393, type: 'mcq', category: 'new', question: 'How many main content sections are mentioned?', options: ['Four', 'Five', 'Six', 'Seven'], correct: 3 },
    // Poster Text
    { id: 394, type: 'mcq', category: 'new', question: 'What principle should poster text follow?', options: ['Make it long and complex', 'Keep it short and simple', 'Use maximum words', 'Fill all space with text'], correct: 1 },
    { id: 395, type: 'mcq', category: 'new', question: 'What should you remove from poster text?', options: ['Essential information', 'All non-essential information', 'All conclusions', 'All data'], correct: 1 },
    { id: 396, type: 'mcq', category: 'new', question: 'What should poster text do visually?', options: ['Be invisible', 'Attract visual attention and use graphics', 'Use only black text', 'Avoid all graphics'], correct: 1 },
    { id: 397, type: 'mcq', category: 'new', question: 'What percentage should be text in a poster?', options: ['80%', '20%', '10%', '50%'], correct: 1 },
    { id: 398, type: 'mcq', category: 'new', question: 'What percentage should be graphics?', options: ['10%', '20%', '40%', '80%'], correct: 2 },
    { id: 399, type: 'mcq', category: 'new', question: 'What percentage should be empty space?', options: ['0%', '20%', '40%', '60%'], correct: 2 },
    { id: 400, type: 'mcq', category: 'new', question: 'Should italics be used in posters?', options: ['Yes, extensively', 'Avoid italics', 'Only italics', 'Italics for everything'], correct: 1 },
    { id: 401, type: 'mcq', category: 'new', question: 'What should be used rather than continuous text?', options: ['Only graphics', 'Bulleted points', 'Long paragraphs', 'Footnotes'], correct: 1 },
    { id: 402, type: 'mcq', category: 'new', question: 'What is the ideal text-graphics-space distribution?', options: ['80-10-10', '20-40-40', '50-50-0', '100-0-0'], correct: 1 },
    // Poster Title
    { id: 403, type: 'mcq', category: 'new', question: 'What quality should the poster title have?', options: ['Be boring', 'Make it interesting', 'Be invisible', 'Be confusing'], correct: 1 },
    { id: 404, type: 'mcq', category: 'new', question: 'What should the title be able to do?', options: ['Confuse people', 'Lure people from a distance', 'Be unreadable', 'Hide the topic'], correct: 1 },
    { id: 405, type: 'mcq', category: 'new', question: 'From what distance should the title be easy to read?', options: ['1 foot', '5 feet', '10 feet', '20 feet'], correct: 2 },
    { id: 406, type: 'mcq', category: 'new', question: 'Should the title be very long?', options: ['Yes, as long as possible', 'No, title should not be too long', 'Always maximum length', 'Length doesn\'t matter'], correct: 1 },
    { id: 407, type: 'mcq', category: 'new', question: 'How many characteristics of a good title are mentioned?', options: ['Two', 'Three', 'Four', 'Five'], correct: 2 },
    // Colors to Be Used
    { id: 408, type: 'mcq', category: 'new', question: 'What should be used to unify the poster?', options: ['Multiple backgrounds', 'One background color', 'No background', 'Random colors'], correct: 1 },
    { id: 409, type: 'mcq', category: 'new', question: 'What type of colors should you stick to?', options: ['Bright neon colors', 'Muted colors', 'Only primary colors', 'Only dark colors'], correct: 1 },
    { id: 410, type: 'mcq', category: 'new', question: 'What color combination should be avoided?', options: ['Blue-yellow', 'Red-green', 'Black-white', 'Blue-green'], correct: 1 },
    { id: 411, type: 'mcq', category: 'new', question: 'Why should red-green combination be avoided?', options: ['They don\'t match', 'Red-green blindness is common', 'Too bright', 'Not professional'], correct: 1 },
    { id: 412, type: 'mcq', category: 'new', question: 'What should you not do with colors?', options: ['Use them at all', 'Overuse color', 'Use only one', 'Mix them'], correct: 1 },
    { id: 413, type: 'mcq', category: 'new', question: 'What should be maintained with color usage?', options: ['Randomness', 'Consistency', 'Chaos', 'Variety in each section'], correct: 1 },
    { id: 414, type: 'mcq', category: 'new', question: 'How many guidelines about colors are mentioned?', options: ['Two', 'Three', 'Four', 'Five'], correct: 2 },
    // Graphics
    { id: 415, type: 'mcq', category: 'new', question: 'From what distance should graphics be viewable?', options: ['1 foot away', 'At least 3 feet away', '10 feet away', '20 feet away'], correct: 1 },
    { id: 416, type: 'mcq', category: 'new', question: 'What should text do in relation to graphics?', options: ['Replace graphics', 'Support the graphics', 'Contradict graphics', 'Hide graphics'], correct: 1 },
    { id: 417, type: 'mcq', category: 'new', question: 'What type of lines should be used in tables and graphs?', options: ['Very thin lines', 'Heavier lines', 'No lines', 'Dotted lines only'], correct: 1 },
    { id: 418, type: 'mcq', category: 'new', question: 'Why use heavier lines in graphs?', options: ['For decoration', 'For easier viewing', 'To use more ink', 'To fill space'], correct: 1 },
    { id: 419, type: 'mcq', category: 'new', question: 'How many guidelines for graphics are mentioned?', options: ['One', 'Two', 'Three', 'Four'], correct: 2 },
    // Poster Editing
    { id: 420, type: 'mcq', category: 'new', question: 'What is the first editing step mentioned?', options: ['Print', 'Proofread', 'Present', 'Ignore errors'], correct: 1 },
    { id: 421, type: 'mcq', category: 'new', question: 'What should you use to check errors?', options: ['Nothing', 'Spell check', 'Guess', 'Ignore mistakes'], correct: 1 },
    { id: 422, type: 'mcq', category: 'new', question: 'When should you get feedback?', options: ['After printing', 'Before printing', 'Never', 'After presentation'], correct: 1 },
    { id: 423, type: 'mcq', category: 'new', question: 'Why get feedback before printing?', options: ['Waste time', 'Get feedback in time to make changes', 'Annoy colleagues', 'Delay the process'], correct: 1 },
    { id: 424, type: 'mcq', category: 'new', question: 'How many editing steps are mentioned?', options: ['Two', 'Three', 'Four', 'Five'], correct: 1 },
    // How to Present Posters
    { id: 425, type: 'mcq', category: 'new', question: 'How long should your poster overview take?', options: ['1-2 minutes', '3-5 minutes', '10-15 minutes', '30 minutes'], correct: 1 },
    { id: 426, type: 'mcq', category: 'new', question: 'Where should you NOT stand when presenting?', options: ['To the side', 'Directly in front of posters', 'Near the poster', 'Behind the poster'], correct: 1 },
    { id: 427, type: 'mcq', category: 'new', question: 'What should you make with participants?', options: ['Avoid all contact', 'Eye contact', 'Physical contact', 'No interaction'], correct: 1 },
    { id: 428, type: 'mcq', category: 'new', question: 'What should you avoid using according to the Arabic text?', options: ['Graphics', 'Terms and abbreviations', 'Colors', 'Text'], correct: 1 },
    { id: 429, type: 'mcq', category: 'new', question: 'What should you avoid in your presentation language?', options: ['Simple words', 'Jargons and acronyms', 'Clear explanations', 'Short sentences'], correct: 1 },
    { id: 430, type: 'mcq', category: 'new', question: 'How should you speak during presentation?', options: ['Fast and unclear', 'Slowly and clearly', 'Whisper', 'Shout'], correct: 1 },
    { id: 431, type: 'mcq', category: 'new', question: 'What type of opening should you make?', options: ['Confusing opening', 'Good opening that explains the main focus', 'No opening', 'Long irrelevant opening'], correct: 1 },
    { id: 432, type: 'mcq', category: 'new', question: 'What should you be able to do at the end?', options: ['Leave immediately', 'Summarize your conclusion and its importance', 'Ignore questions', 'Start over'], correct: 1 },
    { id: 433, type: 'mcq', category: 'new', question: 'What should you NOT assume about your audience?', options: ['They can read', 'That people are experts in your field', 'They are interested', 'They can see'], correct: 1 },
    { id: 434, type: 'mcq', category: 'new', question: 'What should you do before presenting?', options: ['Ignore preparation', 'Anticipate questions', 'Avoid thinking about audience', 'Memorize everything'], correct: 1 },
    { id: 435, type: 'mcq', category: 'new', question: 'How many presentation tips are mentioned?', options: ['Five', 'Seven', 'Nine', 'Ten'], correct: 3 },
    // Mixed Conceptual Questions
    { id: 436, type: 'mcq', category: 'new', question: 'What is the main purpose of white space in posters?', options: ['Waste space', 'Improve visual clarity and prevent crowding', 'Fill with text later', 'Save ink'], correct: 1 },
    { id: 437, type: 'mcq', category: 'new', question: 'Why organize materials into columns?', options: ['Random preference', 'Creates logical flow and easier reading', 'Wastes space', 'Makes it complex'], correct: 1 },
    { id: 438, type: 'mcq', category: 'new', question: 'Why should sections be numbered?', options: ['Decoration', 'Guide readers through logical sequence', 'Increase word count', 'Confuse audience'], correct: 1 },
    { id: 439, type: 'mcq', category: 'new', question: 'What is the benefit of sketching layout before starting?', options: ['Waste time', 'Plan and visualize organization', 'Avoid planning', 'Make it harder'], correct: 1 },
    { id: 440, type: 'mcq', category: 'new', question: 'Why keep poster text short and simple?', options: ['Save money', 'Improve readability and comprehension', 'Reduce research quality', 'Hide information'], correct: 1 },
    { id: 441, type: 'mcq', category: 'new', question: 'Why use bulleted points instead of paragraphs?', options: ['Looks unprofessional', 'Easier to read and scan quickly', 'Harder to understand', 'Takes more space'], correct: 1 },
    { id: 442, type: 'mcq', category: 'new', question: 'Why should the title be interesting?', options: ['Waste time', 'Attract attention and draw viewers', 'Confuse people', 'Fulfill requirements only'], correct: 1 },
    { id: 443, type: 'mcq', category: 'new', question: 'Why avoid red-green color combinations?', options: ['They look bad', 'Common color blindness makes them hard to distinguish', 'Too bright', 'Not scientific'], correct: 1 },
    { id: 444, type: 'mcq', category: 'new', question: 'Why use heavier lines in graphs?', options: ['Use more ink', 'Improve visibility from distance', 'Make file larger', 'Follow tradition'], correct: 1 },
    { id: 445, type: 'mcq', category: 'new', question: 'Why proofread before printing?', options: ['Waste time', 'Catch and correct errors', 'Delay presentation', 'Annoy colleagues'], correct: 1 },
    { id: 446, type: 'mcq', category: 'new', question: 'Why get feedback before printing?', options: ['Socialize', 'Identify improvements while changes are still possible', 'Delay process', 'Show off work'], correct: 1 },
    { id: 447, type: 'mcq', category: 'new', question: 'Why not stand directly in front of poster?', options: ['Be lazy', 'Allow viewers to see and read the poster', 'Hide from audience', 'Avoid questions'], correct: 1 },
    { id: 448, type: 'mcq', category: 'new', question: 'Why make eye contact with participants?', options: ['Stare at them', 'Engage and connect with audience', 'Intimidate them', 'Avoid reading poster'], correct: 1 },
    { id: 449, type: 'mcq', category: 'new', question: 'Why avoid jargons and acronyms?', options: ['Sound unprofessional', 'Ensure broader audience understanding', 'Reduce credibility', 'Make it longer'], correct: 1 },
    { id: 450, type: 'mcq', category: 'new', question: 'Why speak slowly and clearly?', options: ['Waste time', 'Ensure comprehension by all listeners', 'Bore audience', 'Fill time'], correct: 1 },
    { id: 451, type: 'mcq', category: 'new', question: 'Why should you not assume people are experts?', options: ['Be rude', 'Ensure explanations are accessible to diverse audience', 'Insult them', 'Reduce quality'], correct: 1 },
    { id: 452, type: 'mcq', category: 'new', question: 'Why anticipate questions?', options: ['Avoid answering', 'Prepare and provide better responses', 'Confuse yourself', 'Waste time'], correct: 1 },
    // Application and Integration Questions
    { id: 453, type: 'mcq', category: 'new', question: 'If your poster has 100 units of space, how many should be text?', options: ['10 units', '20 units', '50 units', '80 units'], correct: 1 },
    { id: 454, type: 'mcq', category: 'new', question: 'If your poster has 100 units of space, how many should be graphics?', options: ['20 units', '40 units', '60 units', '80 units'], correct: 1 },
    { id: 455, type: 'mcq', category: 'new', question: 'If your poster has 100 units of space, how many should be empty?', options: ['0 units', '20 units', '40 units', '60 units'], correct: 2 },
    { id: 456, type: 'mcq', category: 'new', question: 'What is the recommended maximum number of main colors?', options: ['1', '2-3', '5-6', '10+'], correct: 1 },
    { id: 457, type: 'mcq', category: 'new', question: 'From what distance should titles be readable?', options: ['3 feet', '10 feet', '20 feet', '50 feet'], correct: 1 },
    { id: 458, type: 'mcq', category: 'new', question: 'From what distance should graphics be viewable?', options: ['At least 3 feet', '10 feet', '20 feet', '1 foot'], correct: 0 },
    { id: 459, type: 'mcq', category: 'new', question: 'How long should your overview presentation be?', options: ['1 minute', '3-5 minutes', '10 minutes', '20 minutes'], correct: 1 },
    { id: 460, type: 'mcq', category: 'new', question: 'What are the two main goals of poster presentations?', options: ['Save money and time', 'Stimulate interest/discussion and generate contacts', 'Replace papers and avoid conferences', 'Hide data and confuse audience'], correct: 1 },
    // Order and Sequence Questions
    { id: 461, type: 'mcq', category: 'new', question: 'What comes after "Title" in poster contents?', options: ['Conclusion', 'Author and affiliations', 'References', 'Data'], correct: 1 },
    { id: 462, type: 'mcq', category: 'new', question: 'What comes after "Introduction" in poster contents?', options: ['Conclusion', 'Title', 'Methods', 'References'], correct: 2 },
    { id: 463, type: 'mcq', category: 'new', question: 'What comes after "Methods" in poster contents?', options: ['Introduction', 'Title', 'Data and results', 'Author names'], correct: 2 },
    { id: 464, type: 'mcq', category: 'new', question: 'What comes before "References and acknowledgements"?', options: ['Title', 'Introduction', 'Conclusions and future work', 'Methods'], correct: 2 },
    { id: 465, type: 'mcq', category: 'new', question: 'In the layout sketch, what appears at the top?', options: ['Conclusion', 'Title and Intro', 'References', 'Methods'], correct: 1 },
    // Detailed Guidelines Questions
    { id: 466, type: 'mcq', category: 'new', question: 'Should every inch of the poster be filled?', options: ['Yes, fill everything', 'No, white space is valuable', 'Only with text', 'Only with images'], correct: 1 },
    { id: 467, type: 'mcq', category: 'new', question: 'What should be used for all headings?', options: ['Different colors', 'A single color', 'No color', 'Rainbow colors'], correct: 1 },
    { id: 468, type: 'mcq', category: 'new', question: 'How should materials be organized?', options: ['Randomly', 'Into sections with logical sequence', 'By color only', 'By size only'], correct: 1 },
    { id: 469, type: 'mcq', category: 'new', question: 'What should support graphics in a poster?', options: ['Nothing', 'Text', 'More graphics', 'Empty space'], correct: 1 },
    { id: 470, type: 'mcq', category: 'new', question: 'What type of font style should be avoided?', options: ['Bold', 'Italics', 'Regular', 'All fonts'], correct: 1 },
    // Critical Thinking Questions
    { id: 471, type: 'mcq', category: 'new', question: 'Why is visual sequence important in poster layout?', options: ['Looks pretty', 'Guides viewer through information logically', 'Wastes space', 'Confuses readers'], correct: 1 },
    { id: 472, type: 'mcq', category: 'new', question: 'What is the purpose of using muted colors?', options: ['Make it boring', 'Professional appearance and easier viewing', 'Save ink', 'Follow rules blindly'], correct: 1 },
    { id: 473, type: 'mcq', category: 'new', question: 'Why reference images you use?', options: ['Increase word count', 'Give proper credit and avoid plagiarism', 'Fill space', 'Seem professional'], correct: 1 },
    { id: 474, type: 'mcq', category: 'new', question: 'Why sketch layout before starting?', options: ['Waste paper', 'Plan organization and identify problems early', 'Delay work', 'Avoid digital work'], correct: 1 },
    { id: 475, type: 'mcq', category: 'new', question: 'Why limit the number of main colors to 2-3?', options: ['Color printers are expensive', 'Maintains visual cohesion and professionalism', 'Follow arbitrary rules', 'Limit creativity'], correct: 1 },
    { id: 476, type: 'mcq', category: 'new', question: 'Why is 20-40-40 distribution recommended?', options: ['Random numbers', 'Balance information, visuals, and readability', 'Traditional only', 'Easier to calculate'], correct: 1 },
    { id: 477, type: 'mcq', category: 'new', question: 'Why make title readable from 10 feet?', options: ['Test eyesight', 'Attract attention from a distance in crowded venues', 'Arbitrary rule', 'Make it huge'], correct: 1 },
    { id: 478, type: 'mcq', category: 'new', question: 'Why use heavier lines in graphs?', options: ['Artistic choice', 'Visibility from distance in poster sessions', 'Waste ink', 'Make file bigger'], correct: 1 },
    { id: 479, type: 'mcq', category: 'new', question: 'Why get feedback before printing?', options: ['Social activity', 'Catch errors while corrections are still feasible', 'Waste others\' time', 'Delay unnecessarily'], correct: 1 },
    { id: 480, type: 'mcq', category: 'new', question: 'Why speak slowly during presentation?', options: ['Fill time', 'Accommodate diverse language backgrounds and ensure understanding', 'Bore people', 'Sound important'], correct: 1 },
  ];

  const filteredQuestions = category === 'all' 
    ? questions 
    : questions.filter(q => q.category === category);

  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 500);
    return () => clearTimeout(timer);
  }, [currentQuestion]);

  const handleAnswer = (answerIndex) => {
    if (showResult) return;
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    const currentQ = filteredQuestions[currentQuestion];
    const isCorrect = currentQ.type === 'mcq' 
      ? answerIndex === currentQ.correct 
      : answerIndex === (currentQ.correct ? 1 : 0);
    
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < filteredQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizComplete(false);
  };

  const currentQ = filteredQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / filteredQuestions.length) * 100;

  if (quizComplete) {
    const percentage = (score / filteredQuestions.length * 100).toFixed(1);
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="bg-gradient-to-br from-gray-900 to-black backdrop-blur-xl rounded-3xl p-8 shadow-[0_0_50px_rgba(255,215,0,0.3)] border border-yellow-600/30 text-center transform animate-[fadeIn_0.6s_ease-out]">
            <div className="mb-6">
              <Award className="w-24 h-24 mx-auto text-yellow-500 animate-bounce drop-shadow-[0_0_15px_rgba(255,215,0,0.8)]" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 bg-clip-text text-transparent mb-4">
              🎉 Quiz Complete! 🎉
            </h2>
            <div className="bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 rounded-2xl p-8 mb-6 shadow-[0_0_30px_rgba(255,215,0,0.5)]">
              <p className="text-6xl font-bold text-black mb-2">{score}/{filteredQuestions.length}</p>
              <p className="text-2xl text-black font-semibold">{percentage}%</p>
            </div>
            <p className="text-xl text-gray-300 mb-8">
              {percentage >= 90 ? '🌟 Outstanding! You\'re a scientific writing expert!' :
               percentage >= 75 ? '👏 Great job! You have excellent knowledge!' :
               percentage >= 60 ? '👍 Good work! Keep studying!' :
               '💪 Keep practicing! You\'ll improve!'}
            </p>
            <button
              onClick={resetQuiz}
              className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(255,215,0,0.6)] flex items-center justify-center mx-auto gap-2"
            >
              <RotateCcw className="w-6 h-6" />
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 p-4">
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Sparkles className="w-10 h-10 text-yellow-500 animate-pulse drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]" />
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 bg-clip-text text-transparent">
            Scientific Writing Quiz
          </h1>
          <Brain className="w-10 h-10 text-yellow-500 animate-pulse drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]" />
        </div>
        <p className="text-gray-400 text-lg">Test your knowledge in scientific research writing</p>
      </div>

      {/* Category Filter */}
      <div className="max-w-5xl mx-auto mb-6 flex flex-wrap gap-3 justify-center">
        {[
          { id: 'all', label: 'All Questions', icon: BookOpen },
          { id: 'intro', label: 'Introduction', icon: Sparkles },
          { id: 'structure', label: 'Structure', icon: Brain },
          { id: 'results', label: 'Results & Tables', icon: Award },
          { id: 'discussion', label: 'Discussion', icon: CheckCircle },
          { id: 'new', label: 'New', icon: Star }
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => {
              setCategory(cat.id);
              resetQuiz();
            }}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
              category === cat.id
                ? 'bg-gradient-to-r from-yellow-600 to-yellow-500 text-black shadow-[0_0_20px_rgba(255,215,0,0.5)]'
                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700'
            }`}
          >
            <cat.icon className="w-5 h-5" />
            {cat.label}
          </button>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="max-w-5xl mx-auto mb-8">
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-full h-4 overflow-hidden shadow-lg border border-gray-700">
          <div 
            className="h-full bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 transition-all duration-500 ease-out relative overflow-hidden shadow-[0_0_20px_rgba(255,215,0,0.6)]"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
          </div>
        </div>
        <div className="flex justify-between text-gray-400 mt-2 text-sm font-semibold">
          <span>Question {currentQuestion + 1} of {filteredQuestions.length}</span>
          <span>Score: {score}/{filteredQuestions.length}</span>
        </div>
      </div>

      {/* Question Card */}
      <div className="max-w-5xl mx-auto">
        <div className={`bg-gradient-to-br from-gray-900 to-black backdrop-blur-xl rounded-3xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.9)] border border-gray-800 transition-all duration-500 ${animate ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
          {/* Question Type Badge */}
          <div className="flex justify-between items-center mb-6">
            <span className={`px-4 py-2 rounded-full text-sm font-bold shadow-lg ${
              currentQ.type === 'mcq' 
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-cyan-500/50' 
                : 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-emerald-500/50'
            }`}>
              {currentQ.type === 'mcq' ? 'Multiple Choice' : 'True / False'}
            </span>
            <span className="text-gray-500 text-sm font-semibold px-3 py-1 bg-gray-800/50 rounded-full border border-gray-700">
              {currentQ.category.toUpperCase()}
            </span>
          </div>

          {/* Question */}
          <h3 className="text-2xl md:text-3xl font-bold text-gray-100 mb-8 leading-relaxed">
            {currentQ.question}
          </h3>

          {/* Options */}
          <div className="space-y-4">
            {currentQ.type === 'mcq' ? (
              currentQ.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === currentQ.correct;
                const showCorrect = showResult && isCorrect;
                const showWrong = showResult && isSelected && !isCorrect;

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={showResult}
                    className={`w-full text-left p-6 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-[1.02] ${
                      showCorrect
                        ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-[0_0_30px_rgba(16,185,129,0.6)] ring-2 ring-emerald-400'
                        : showWrong
                        ? 'bg-gradient-to-r from-red-700 to-red-600 text-white shadow-[0_0_30px_rgba(220,38,38,0.6)] ring-2 ring-red-400'
                        : isSelected
                        ? 'bg-gray-800 text-gray-100 border-2 border-gray-600'
                        : 'bg-gray-800/30 hover:bg-gray-800/50 text-gray-300 border border-gray-700 hover:border-gray-600'
                    } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer hover:shadow-xl'}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-3">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          showCorrect ? 'bg-emerald-800' : showWrong ? 'bg-red-800' : 'bg-gray-700'
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </span>
                        {option}
                      </span>
                      {showCorrect && <CheckCircle className="w-7 h-7 text-white animate-bounce" />}
                      {showWrong && <XCircle className="w-7 h-7 text-white animate-bounce" />}
                    </div>
                  </button>
                );
              })
            ) : (
              <>
                <button
                  onClick={() => handleAnswer(1)}
                  disabled={showResult}
                  className={`w-full p-6 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-[1.02] ${
                    showResult && currentQ.correct
                      ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-[0_0_30px_rgba(16,185,129,0.6)] ring-2 ring-emerald-400'
                      : showResult && selectedAnswer === 1 && !currentQ.correct
                      ? 'bg-gradient-to-r from-red-700 to-red-600 text-white shadow-[0_0_30px_rgba(220,38,38,0.6)] ring-2 ring-red-400'
                      : selectedAnswer === 1
                      ? 'bg-gray-800 text-gray-100 border-2 border-gray-600'
                      : 'bg-gray-800/30 hover:bg-gray-800/50 text-gray-300 border border-gray-700 hover:border-gray-600'
                  } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer hover:shadow-xl'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-3">
                      <CheckCircle className="w-8 h-8" />
                      TRUE
                    </span>
                    {showResult && currentQ.correct && <CheckCircle className="w-7 h-7 animate-bounce" />}
                    {showResult && selectedAnswer === 1 && !currentQ.correct && <XCircle className="w-7 h-7 animate-bounce" />}
                  </div>
                </button>
                <button
                  onClick={() => handleAnswer(0)}
                  disabled={showResult}
                  className={`w-full p-6 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-[1.02] ${
                    showResult && !currentQ.correct
                      ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-[0_0_30px_rgba(16,185,129,0.6)] ring-2 ring-emerald-400'
                      : showResult && selectedAnswer === 0 && currentQ.correct
                      ? 'bg-gradient-to-r from-red-700 to-red-600 text-white shadow-[0_0_30px_rgba(220,38,38,0.6)] ring-2 ring-red-400'
                      : selectedAnswer === 0
                      ? 'bg-gray-800 text-gray-100 border-2 border-gray-600'
                      : 'bg-gray-800/30 hover:bg-gray-800/50 text-gray-300 border border-gray-700 hover:border-gray-600'
                  } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer hover:shadow-xl'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-3">
                      <XCircle className="w-8 h-8" />
                      FALSE
                    </span>
                    {showResult && !currentQ.correct && <CheckCircle className="w-7 h-7 animate-bounce" />}
                    {showResult && selectedAnswer === 0 && currentQ.correct && <XCircle className="w-7 h-7 animate-bounce" />}
                  </div>
                </button>
              </>
            )}
          </div>

          {/* Feedback Message */}
          {showResult && (
            <div className={`mt-6 p-6 rounded-2xl border-2 ${
              (currentQ.type === 'mcq' ? selectedAnswer === currentQ.correct : selectedAnswer === (currentQ.correct ? 1 : 0))
                ? 'bg-emerald-900/30 border-emerald-600 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                : 'bg-red-900/30 border-red-600 shadow-[0_0_20px_rgba(220,38,38,0.3)]'
            } animate-[fadeIn_0.5s_ease-out]`}>
              <p className="text-gray-200 font-semibold text-lg text-center">
                {(currentQ.type === 'mcq' ? selectedAnswer === currentQ.correct : selectedAnswer === (currentQ.correct ? 1 : 0))
                  ? '🎉 Correct! Well done!'
                  : `❌ Incorrect. The correct answer is: ${
                      currentQ.type === 'mcq' 
                        ? currentQ.options[currentQ.correct]
                        : currentQ.correct ? 'TRUE' : 'FALSE'
                    }`
                }
              </p>
            </div>
          )}

          {/* Next Button */}
          {showResult && (
            <button
              onClick={nextQuestion}
              className="mt-6 w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-bold py-4 px-6 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(255,215,0,0.6)] flex items-center justify-center gap-2 animate-[fadeIn_0.3s_ease-out]"
            >
              {currentQuestion === filteredQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizWebsite;
