const questions = [
  {
    question: "What does DOM stand for?",
    answers: ["Document Object Model", "Display Object Management", "Digital Ordinance Model", "Desktop Object Monitor"],
    correct: "Document Object Model"
  },
  {
    question: "Which keyword is used to declare a variable in JavaScript?",
    answers: ["var", "let", "const", "All of the above"],
    correct: "All of the above"
  },
  {
    question: "Which method converts JSON to a JavaScript object?",
    answers: ["JSON.stringify()", "JSON.parse()", "JSON.convert()", "JSON.toObject()"],
    correct: "JSON.parse()"
  },
  {
    question: "Which company developed JavaScript?",
    answers: ["Google", "Microsoft", "Netscape", "IBM"],
    correct: "Netscape"
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    answers: ["<!--", "//", "**", "##"],
    correct: "//"
  }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30;
let timerInterval;

const questionContainer = document.getElementById("question-container");
const answerList = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timerDisplay = document.getElementById("timer");
const scoreContainer = document.getElementById("score-container");
const scoreText = document.getElementById("score");

function startQuiz() {
  showQuestion();
  startTimer();
}

function showQuestion() {
  clearAnswers();
  const current = questions[currentQuestionIndex];
  questionContainer.innerHTML = `<strong>Q${currentQuestionIndex + 1}:</strong> ${current.question}`;

  current.answers.forEach(answer => {
    const li = document.createElement("li");
    li.textContent = answer;
    li.onclick = () => handleAnswerClick(li, current.correct);
    answerList.appendChild(li);
  });
}

function clearAnswers() {
  answerList.innerHTML = "";
  nextButton.style.display = "none";
}

function handleAnswerClick(selectedEl, correctAnswer) {
  const isCorrect = selectedEl.innerText === correctAnswer;

  selectedEl.style.backgroundColor = isCorrect ? "#d4edda" : "#f8d7da";
  selectedEl.innerHTML = `${selectedEl.innerText} ${isCorrect ? "✅" : "❌"}`;

  if (isCorrect) score++;

  Array.from(answerList.children).forEach(li => {
    li.onclick = null;
    if (li.innerText === correctAnswer) {
      li.style.backgroundColor = "#d4edda";
    }
  });

  nextButton.style.display = "inline-block";
}

nextButton.onclick = () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
};

function startTimer() {
  timerDisplay.innerText = `Time: ${timeLeft}s`;
  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.innerText = `Time: ${timeLeft}s`;
    if (timeLeft === 0) {
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000);
}

function endQuiz() {
  clearInterval(timerInterval);
  questionContainer.style.display = "none";
  answerList.style.display = "none";
  nextButton.style.display = "none";
  timerDisplay.style.display = "none";

  scoreContainer.style.display = "block";
  scoreText.innerText = score;
}

startQuiz();
