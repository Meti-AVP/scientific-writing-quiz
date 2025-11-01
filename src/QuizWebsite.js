import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Award, BookOpen, Brain, Sparkles, ChevronRight, RotateCcw } from 'lucide-react';

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
          { id: 'discussion', label: 'Discussion', icon: CheckCircle }
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