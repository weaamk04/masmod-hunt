/* =========================
   GET SAVED RESULT
========================= */

const nickname =
    localStorage.getItem("masmodNickname")
    || "Hunter";


const score =
    Number(
        localStorage.getItem("masmodScore")
    ) || 0;


const answered =
    Number(
        localStorage.getItem("masmodAnswered")
    ) || 0;


const correct =
    Number(
        localStorage.getItem("masmodCorrect")
    ) || 0;


/* =========================
   CALCULATE ACCURACY
========================= */

let accuracy = 0;


if (answered > 0) {

    accuracy =
        Math.round(
            (correct / answered) * 100
        );
}


/* =========================
   ELEMENTS
========================= */

const scoreValue =
    document.getElementById("scoreValue");

const questionsSolved =
    document.getElementById("questionsSolved");

const correctAnswers =
    document.getElementById("correctAnswers");

const accuracyValue =
    document.getElementById("accuracyValue");

const resultMessage =
    document.getElementById("resultMessage");

const resultSubtitle =
    document.getElementById("resultSubtitle");

const resultMascot =
    document.getElementById("resultMascot");

const playAgainButton =
    document.getElementById("playAgainButton");


/* =========================
   SHOW RESULT
========================= */

scoreValue.textContent =
    score;

questionsSolved.textContent =
    answered;

correctAnswers.textContent =
    correct;

accuracyValue.textContent =
    accuracy + "%";


/* =========================
   RESULT MESSAGE + MASCOT
========================= */

if (
    answered > 0 &&
    accuracy >= 60
) {

    resultMessage.textContent =
        "Nice Work, " + nickname + "!";

    resultSubtitle.textContent =
        "Good instincts. Keep going!";

    resultMascot.src =
        "assets/images/result-happy-mascot.png";

}

else if (answered > 0) {

    resultMessage.textContent =
        "Hunt Complete, " + nickname + "!";

    resultSubtitle.textContent =
        "Another round can sharpen your skills.";

    resultMascot.src =
        "assets/images/result-neutral-mascot.png";

}

else {

    resultMessage.textContent =
        "Time's Up, " + nickname + "!";

    resultSubtitle.textContent =
        "Ready for another hunt?";

    resultMascot.src =
        "assets/images/result-neutral-mascot.png";

}


/* =========================
   PLAY AGAIN
========================= */

playAgainButton.addEventListener(
    "click",
    () => {

        localStorage.removeItem(
            "masmodScore"
        );

        localStorage.removeItem(
            "masmodAnswered"
        );

        localStorage.removeItem(
            "masmodCorrect"
        );


        window.location.href =
            "quiz.html";

    }
);