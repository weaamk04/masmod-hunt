import { auth, db } from "./firebase-config.js";

import { signInAnonymously } from
    "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

import {
    collection,
    getDocs,
    query,
    where,
    doc,
    updateDoc,
    serverTimestamp
} from
    "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";


/* =========================
   VARIABLES
========================= */

let questions = [];

let currentQuestion = null;

let lastQuestionIndex = -1;

let score = 0;

let answeredCount = 0;

let correctCount = 0;

let timeLeft = 60;

let gameTimer = null;

let answerLocked = true;

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

const progressBar =
    document.getElementById("progressBar");


/* =========================
   GET QUESTIONS
========================= */

async function getQuestionsFromFirebase() {

    const questionsQuery =
        query(
            collection(db, "questions"),
            where("active", "==", true)
        );


    const snapshot =
        await getDocs(questionsQuery);


    questions =
        snapshot.docs.map(document => {

            return {
                documentId: document.id,
                ...document.data()
            };

        });


    if (questions.length === 0) {

        throw new Error(
            "No active questions found."
        );

    }

}


/* =========================
   RANDOM QUESTION
========================= */

function getRandomQuestion() {

    let randomIndex;


    if (questions.length === 1) {

        randomIndex = 0;

    }

    else {

        do {

            randomIndex =
                Math.floor(
                    Math.random() *
                    questions.length
                );

        } while (
            randomIndex ===
            lastQuestionIndex
        );

    }


    lastQuestionIndex =
        randomIndex;


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
        currentQuestion.scenario;


    questionNumber.textContent =
        "Solved: " + answeredCount;


    scoreText.textContent =
        "Score: " + score;


    renderAnswers(
        currentQuestion.options
    );

}


/* =========================
   RENDER ANSWERS
========================= */

function renderAnswers(options) {

    answersContainer.innerHTML = "";


    const letters =
        ["A", "B", "C", "D"];


    letters.forEach(letter => {

        const answer =
            options[letter];


        if (!answer) {
            return;
        }


        const button =
            document.createElement(
                "button"
            );


        button.className =
            "answer-card";


        button.type =
            "button";


        button.innerHTML = `
            <span class="answer-letter">
                ${letter}
            </span>

            <span class="answer-text">
                ${answer}
            </span>
        `;


        button.addEventListener(
            "click",
            () => selectAnswer(
                letter,
                button
            )
        );


        answersContainer.appendChild(
            button
        );

    });

}


/* =========================
   SELECT ANSWER
========================= */

function selectAnswer(
    selectedLetter,
    selectedButton
) {

    if (
        answerLocked ||
        gameFinished
    ) {
        return;
    }


    answerLocked = true;


    const allAnswers =
        document.querySelectorAll(
            ".answer-card"
        );


    allAnswers.forEach(button => {

        button.classList.add(
            "disabled"
        );

    });


    selectedButton.classList.add(
        "selected"
    );


    answeredCount++;


    const selectedAnswer =
        currentQuestion.options[
            selectedLetter
        ];


    const isCorrect =
        selectedAnswer ===
        currentQuestion.threatCategory;


    if (isCorrect) {

        score += 10;

        correctCount++;

    }

    else {

        score -= 5;

    }


    scoreText.textContent =
        "Score: " + score;


    questionNumber.textContent =
        "Solved: " + answeredCount;


    setTimeout(() => {

        loadQuestion();

    }, 350);

}


/* =========================
   TIMER
========================= */

function startGameTimer() {

    timerText.textContent =
        timeLeft + "s";


    updateProgressBar();


    gameTimer =
        setInterval(() => {

            timeLeft--;


            timerText.textContent =
                timeLeft + "s";


            updateProgressBar();


            if (timeLeft <= 0) {

                clearInterval(
                    gameTimer
                );


                finishGame();

            }

        }, 1000);

}


/* =========================
   PROGRESS BAR
========================= */

function updateProgressBar() {

    if (!progressBar) {
        return;
    }


    const percentage =
        (timeLeft / 60) * 100;


    progressBar.style.width =
        percentage + "%";

}


/* =========================
   SAVE RESULT
========================= */

async function saveResultToFirebase() {

    console.log("START SAVING RESULT");


    const playerRef =
        doc(
            db,
            "sessions",
            "demo-session",
            "players",
            "username"
        );


    await updateDoc(
        playerRef,
        {
            score: score,

            totalQuestions:
                answeredCount,

            correctAnswers:
                correctCount,

            completedAt:
                serverTimestamp()
        }
    );


    console.log(
        "PLAYER UPDATED SUCCESSFULLY"
    );

}

/* =========================
   FINISH GAME
========================= */

async function finishGame() {

    console.log("FINISH GAME STARTED");


    if (gameFinished) {
        return;
    }


    gameFinished = true;

    answerLocked = true;


    if (gameTimer) {

        clearInterval(
            gameTimer
        );

    }


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


    try {

        await saveResultToFirebase();

    }

    catch (error) {

        console.error(
            "Could not save player result:",
            error
        );

    }


    window.location.href =
        "result.html";

}

/* =========================
   QUIT
========================= */

quitButton.addEventListener(
    "click",
    () => {

        console.log("QUIT BUTTON CLICKED");

        finishGame();

    }
);

/* =========================
   START GAME
========================= */

async function startGame() {

    questionText.textContent =
        "Loading questions...";


    scoreText.textContent =
        "Score: 0";


    questionNumber.textContent =
        "Solved: 0";


    timerText.textContent =
        "60s";


    updateProgressBar();


    try {

        await signInAnonymously(auth);


        await getQuestionsFromFirebase();


        loadQuestion();


        startGameTimer();

    }

    catch (error) {

        console.error(error);


        questionText.textContent =
            "Unable to load questions.";


        answersContainer.innerHTML =
            "";

    }

}


startGame();