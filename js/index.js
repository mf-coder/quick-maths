document.addEventListener("DOMContentLoaded", function () {
  // ========== Declare UI elements ==========
  var btnToggleDarkMode = document.getElementById("btn-toggle-dark-mode");

  var divIntro = document.getElementById("div-intro");
  var btnStartQuiz = document.getElementById("btn-start-quiz");

  var NUM_OF_QUESTIONS = 20;
  var divQuiz = document.getElementById("div-quiz");
  var txtQuestion = document.getElementById("txt-question");
  var inputAnswer = document.getElementById("input-answer");
  var btnNextQuestion = document.getElementById("btn-next-question");

  var divResults = document.getElementById("div-results");
  var btnPlayAgain = document.getElementById("btn-play-again");

  // ========== Dark Mode ==========
  function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    refreshUIStyling();
  }

  function refreshUIStyling() {
    if (document.body.classList.contains("dark-mode")) {
      btnToggleDarkMode.innerText = "Night";
    } else {
      btnToggleDarkMode.innerText = "Day";
    }

    if (document.body.classList.contains("dark-mode")) {
      inputAnswer.classList.replace("light-input", "dark-input");
    } else {
      inputAnswer.classList.replace("dark-input", "light-input");
    }
  }

  btnToggleDarkMode.addEventListener("click", function () {
    toggleDarkMode();
    refreshUIStyling();
  });

  // ========== Quiz ==========
  btnStartQuiz.addEventListener("click", function () {
    divIntro.style.display = "none";
    divQuiz.style.display = "block";
    generateQuestions();
    startQuiz();
  });

  btnNextQuestion.addEventListener("click", function () {
    nextQuestion();
  });

  const questions = [];
  const secretAnswers = [];
  const userAnswers = [];
  var currentQuestion = 0;

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomOperation() {
    var rand = Math.floor(Math.random() * 100) + 1;
    if (rand < 50) return "+";
    else return "*";
  }

  function generateQuestions() {
    for (let i = 0; i < NUM_OF_QUESTIONS; i++) {
      var left = getRandomNumber(1, 20);
      var op = getRandomOperation();
      var right = getRandomNumber(1, 20);

      var question = left + " " + op + " " + right;
      questions.push(question);

      if (op == "+") secretAnswers.push(left + right);
      else secretAnswers.push(left * right);
    }
  }

  function clearAndFocusInput() {
    inputAnswer.value = "";
    inputAnswer.focus();
  }

  function startQuiz() {
    txtQuestion.innerHTML = questions[currentQuestion];
    clearAndFocusInput();
  }

  function isDigitsOnly(str) {
    return /^\d+$/.test(str);
  }

  function nextQuestion() {
    var input = inputAnswer.value;
    var isValidInput = isDigitsOnly(input);

    if (!isValidInput) {
      inputAnswer.focus();
      return;
    }
    userAnswers.push(input);

    if (currentQuestion + 1 == NUM_OF_QUESTIONS) {
      finishQuiz();
      return;
    }

    txtQuestion.innerHTML = questions[++currentQuestion];
    if (currentQuestion == NUM_OF_QUESTIONS - 1)
      btnNextQuestion.innerHTML = "Finish";

    clearAndFocusInput();
  }

  function finishQuiz() {
    divQuiz.style.display = "none";
    divResults.style.display = "block";
    btnPlayAgain.style.display = "block";

    for (let i = 0; i < NUM_OF_QUESTIONS; i++) {
      generateResultsListEntry(
        questions[i],
        secretAnswers[i],
        userAnswers[i],
        userAnswers[i] == secretAnswers[i],
      );
    }
  }

  function generateResultsListEntry(
    question,
    secretAnswer,
    userAnswer,
    isCorrect,
  ) {
    var newDiv = document.createElement("div");

    var questionEle = document.createElement("h4");
    var userAnswerEle = document.createElement("h4");

    questionEle.innerText = "Question: " + question;
    userAnswerEle.innerText = "You answered: " + userAnswer;

    newDiv.appendChild(questionEle);
    newDiv.appendChild(userAnswerEle);

    if (!isCorrect) {
      newDiv.className = "div-ending-item-incorrect";

      var secretAnswerEle = document.createElement("h4");
      secretAnswerEle.innerText = "Correct answer: " + secretAnswer;

      newDiv.appendChild(secretAnswerEle);
    } else {
      newDiv.className = "div-ending-item-correct";
    }

    divResults.appendChild(newDiv);
  }

  btnPlayAgain.addEventListener("click", function () {
    location.reload();
  });
});
