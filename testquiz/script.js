const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyperlinks Text Mark Language",
      "Home Tool Markup Language"
    ],
    correctIndex: 0
  },
  {
    question: "Which CSS property controls text color?",
    options: ["font-style", "text-color", "color", "background-color"],
    correctIndex: 2
  },
  {
    question: "Which keyword is used to declare a variable in ES6?",
    options: ["var", "int", "let", "define"],
    correctIndex: 2
  },
  {
    question: "Which symbol is used for arrow functions?",
    options: ["=>", "->", "<=", "::"],
    correctIndex: 0
  },
  {
    question: "Which method is used to loop through arrays?",
    options: ["repeat()", "forEach()", "mapAll()", "loop()"],
    correctIndex: 1
  }
];

let currentQuestion = 0;
let answers = Array(questions.length).fill(null);


const question = document.getElementById("question");
const options = document.getElementById("options");
const progress = document.getElementById("progress");
const result = document.getElementById("result");

const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const submitBtn = document.getElementById("submitBtn");


const loadQuestion = () => {
  const q = questions[currentQuestion];

  progress.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  question.textContent = q.question;

  options.innerHTML = "";

  q.options.forEach((option, index) => {
    options.innerHTML += `
      <label>
        <input type="radio" name="option" value="${index}"
        ${answers[currentQuestion] === index ? "checked" : ""}>
        ${option}
      </label>
    `;
  });
};


options.addEventListener("change", (e) => {
  answers[currentQuestion] = Number(e.target.value);
});

nextBtn.addEventListener("click", () => {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    loadQuestion();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  }
});

submitBtn.addEventListener("click", () => {
  if (answers.includes(null)) {
    alert("Please answer all questions before submitting!");
    return;
  }

  let score = 0;

  questions.forEach((q, index) => {
    if (q.correctIndex === answers[index]) {
      score++;
    }
  });

  const percentage = (score / questions.length) * 100;

  let feedback = "";
  if (percentage >= 80) feedback = "Excellent! ";
  else if (percentage >= 50) feedback = "Good Job ";
  else feedback = "Needs Improvement ";

  result.innerHTML = `
    Score: ${score} / ${questions.length} <br>
    Percentage: ${percentage}% <br>
    ${feedback}
  `;
});
loadQuestion();
