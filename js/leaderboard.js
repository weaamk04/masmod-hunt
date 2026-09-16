/* =========================
   CURRENT PLAYER
========================= */

const nickname =
    localStorage.getItem("masmodNickname")
    || "Player";


const correctAnswers =
    Number(
        localStorage.getItem("masmodScore")
    ) || 0;


const answeredQuestions =
    Number(
        localStorage.getItem("masmodAnswered")
    ) || 0;


/* كل إجابة صحيحة = 100 نقطة */

const playerPoints =
    Number(
        localStorage.getItem("masmodScore")
    ) || 0;

/* =========================
   SAMPLE PLAYERS
========================= */

const players = [

    {
        name: "CyberStar",
        score: 1250
    },

    {
        name: "SecureMind",
        score: 980
    },

    {
        name: "RedTeam",
        score: 910
    },

    {
        name: "ByteDefender",
        score: 860
    },

    {
        name: "HackWise",
        score: 780
    },

    {
        name: "NetNinja",
        score: 690
    },

    {
        name: "SafeUser",
        score: 620
    }

];


/* =========================
   ADD CURRENT PLAYER
========================= */

players.push({
    name: nickname,
    score: playerPoints,
    currentUser: true
});


/* =========================
   SORT
========================= */

players.sort(
    (a, b) => b.score - a.score
);


/* =========================
   ELEMENT
========================= */

const leaderboardList =
    document.getElementById(
        "leaderboardList"
    );


/* =========================
   CREATE LEADERBOARD
========================= */

players.forEach(
    (player, index) => {

        const row =
            document.createElement("div");


        row.className =
            "player-row";


        if (player.currentUser) {

            row.classList.add(
                "current-user"
            );
        }


        const rankNumber =
            index + 1;


        let rankClass = "";

        let rankText =
            rankNumber;


        if (rankNumber === 1) {

            rankClass = "first";

            rankText = "♛";

        }

        else if (rankNumber === 2) {

            rankClass = "second";

        }

        else if (rankNumber === 3) {

            rankClass = "third";

        }


        /* Initials */

        const initials =
            player.name
                .substring(0, 2)
                .toUpperCase();


        row.innerHTML = `

            <div class="rank ${rankClass}">
                ${rankText}
            </div>


            <div class="avatar">
                ${initials}
            </div>


            <div class="player-name">

                ${player.name}

                ${
                    player.currentUser
                    ? '<span class="you-label">YOU</span>'
                    : ''
                }

            </div>


            <div class="player-score">

                ${player.score.toLocaleString()}

            </div>

        `;


        leaderboardList.appendChild(
            row
        );

    }
);