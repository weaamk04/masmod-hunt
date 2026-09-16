/* =========================
   QUESTIONS
========================= */

const questions = [

    {
        question:
            "Which of the following is a sign of a phishing email?",

        answers: [
            "A known sender's email",
            "A link with a suspicious URL",
            "Proper grammar and spelling",
            "An official company logo"
        ],

        correct: 1
    },

    {
        question:
            "What should you do if you receive a suspicious link?",

        answers: [
            "Click it immediately",
            "Forward it to everyone",
            "Avoid clicking and verify the sender",
            "Reply with your password"
        ],

        correct: 2
    },

    {
        question:
            "Which password is the strongest?",

        answers: [
            "12345678",
            "password",
            "Masmod123",
            "M@sM0d!9x#27"
        ],

        correct: 3
    },

    {
        question:
            "What does two-factor authentication add?",

        answers: [
            "An extra security step",
            "A faster internet connection",
            "More storage",
            "A new username"
        ],

        correct: 0
    },

    {
        question:
            "What should you do with your passwords?",

        answers: [
            "Share them with friends",
            "Use the same one everywhere",
            "Keep them private",
            "Post them online"
        ],

        correct: 2
    }

];


/* =========================
   VARIABLES
========================= */

let currentQuestion;

let lastQuestionIndex = -1;

let score = 0;

let answeredCount = 0;

let correctCount = 0;

let timeLeft = 60;

let gameTimer;

let answerLocked = false;

let gameFinished = false;


/* =========================
   ELEMENTS
========================= */

const questionText =
    document.getElementById("questionText");

const answersContainer =
    document.getElementById("answersContainer");

const questionNumber =
    document.getElementById("questionNumber");

const timerText =
    document.getElementById("timerText");

const scoreText =
    document.getElementById("scoreText");

const quitButton =
    document.getElementById("quitButton");


/* =========================
   RANDOM QUESTION
========================= */

function getRandomQuestion() {

    let randomIndex;

    do {

        randomIndex =
            Math.floor(
                Math.random() * questions.length
            );

    } while (
        randomIndex === lastQuestionIndex &&
        questions.length > 1
    );


    lastQuestionIndex = randomIndex;

    return questions[randomIndex];
}


/* =========================
   LOAD QUESTION
========================= */

function loadQuestion() {

    if (gameFinished) {
        return;
    }


    answerLocked = false;


    currentQuestion =
        getRandomQuestion();


    questionText.textContent =
        currentQuestion.question;


    questionNumber.textContent =
        "Solved: " + answeredCount;


    scoreText.textContent =
        "Score: " + score;


    answersContainer.innerHTML = "";


    const letters =
        ["A", "B", "C", "D"];


    currentQuestion.answers.forEach(
        (answer, index) => {

            const button =
                document.createElement("button");


            button.className =
                "answer-card";


            button.type = "button";


            button.innerHTML = `
                <span class="answer-letter">
                    ${letters[index]}
                </span>

                <span class="answer-text">
                    ${answer}
                </span>
            `;


            button.addEventListener(
                "click",
                () => selectAnswer(
                    index,
                    button
                )
            );


            answersContainer.appendChild(
                button
            );

        }
    );

}


/* =========================
   SELECT ANSWER
========================= */

function selectAnswer(
    selectedIndex,
    selectedButton
) {

    if (
        answerLocked ||
        gameFinished
    ) {
        return;
    }


    answerLocked = true;

    answeredCount++;


    const isCorrect =
        selectedIndex ===
        currentQuestion.correct;


    if (isCorrect) {

        score += 10;

        correctCount++;

    }

    else {

        score -= 5;

    }


    selectedButton.classList.add(
        "selected"
    );


    scoreText.textContent =
        "Score: " + score;


    questionNumber.textContent =
        "Solved: " + answeredCount;


    const allAnswers =
        document.querySelectorAll(
            ".answer-card"
        );


    allAnswers.forEach(button => {

        button.classList.add(
            "disabled"
        );

    });


    /* سؤال جديد بسرعة */

    setTimeout(() => {

        loadQuestion();

    }, 350);

}


/* =========================
   60 SECOND GAME TIMER
========================= */

function startGameTimer() {

    timerText.textContent =
        timeLeft + "s";


    gameTimer =
        setInterval(() => {

            timeLeft--;


            timerText.textContent =
                timeLeft + "s";


            if (timeLeft <= 0) {

                clearInterval(gameTimer);

                finishGame();

            }

        }, 1000);

}


/* =========================
   FINISH GAME
========================= */

function finishGame() {

    if (gameFinished) {
        return;
    }


    gameFinished = true;

    answerLocked = true;

    clearInterval(gameTimer);


    /* Save results */

    localStorage.setItem(
        "masmodScore",
        score
    );


    localStorage.setItem(
        "masmodAnswered",
        answeredCount
    );


    localStorage.setItem(
        "masmodCorrect",
        correctCount
    );


    /* Go to Leaderboard */

    window.location.href = "result.html";

}


/* =========================
   QUIT
========================= */

quitButton.addEventListener(
    "click",
    () => {

        const confirmQuit =
            confirm(
                "Are you sure you want to quit the hunt?"
            );


        if (confirmQuit) {

            finishGame();

        }

    }
);


/* =========================
   START GAME
========================= */

loadQuestion();

startGameTimer();