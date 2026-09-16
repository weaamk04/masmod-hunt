import { auth, db } from "./firebase-config.js";

import {
    collection,
    query,
    orderBy,
    onSnapshot
} from
    "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

import {
    onAuthStateChanged
} from
    "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";


/* =========================
   VARIABLES
========================= */

let players = [];

let currentUserId = null;


/* =========================
   ELEMENT
========================= */

const leaderboardList =
    document.getElementById(
        "leaderboardList"
    );


/* =========================
   CURRENT USER
========================= */

onAuthStateChanged(
    auth,
    user => {

        if (user) {

            currentUserId =
                user.uid;

        }

        else {

            currentUserId =
                null;

        }


        renderLeaderboard();

    }
);


/* =========================
   GET PLAYERS
========================= */

const playersCollection =
    collection(
        db,
        "sessions",
        "demo-session",
        "players"
    );


const playersQuery =
    query(
        playersCollection,
        orderBy("score", "desc")
    );


onSnapshot(
    playersQuery,

    snapshot => {

        players =
            snapshot.docs.map(
                document => {

                    return {
                        documentId:
                            document.id,

                        ...document.data()
                    };

                }
            );


        renderLeaderboard();

    },

    error => {

        console.error(
            "Could not load leaderboard:",
            error
        );


        leaderboardList.innerHTML = `
            <p class="leaderboard-error">
                Unable to load leaderboard.
            </p>
        `;

    }
);


/* =========================
   CREATE LEADERBOARD
========================= */

function renderLeaderboard() {

    leaderboardList.innerHTML = "";


    if (players.length === 0) {

        leaderboardList.innerHTML = `
            <p class="leaderboard-empty">
                No players yet.
            </p>
        `;

        return;
    }


    players.forEach(
        (player, index) => {

            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "player-row";


            const isCurrentUser =
                player.userId ===
                currentUserId;


            if (isCurrentUser) {

                row.classList.add(
                    "current-user"
                );

            }


            /* =========================
               RANK
            ========================= */

            const rankNumber =
                index + 1;


            const rank =
                document.createElement(
                    "div"
                );


            rank.className =
                "rank";


            if (rankNumber === 1) {

                rank.classList.add(
                    "first"
                );

                rank.textContent =
                    "♛";

            }

            else if (
                rankNumber === 2
            ) {

                rank.classList.add(
                    "second"
                );

                rank.textContent =
                    rankNumber;

            }

            else if (
                rankNumber === 3
            ) {

                rank.classList.add(
                    "third"
                );

                rank.textContent =
                    rankNumber;

            }

            else {

                rank.textContent =
                    rankNumber;

            }


            /* =========================
               AVATAR
            ========================= */

            const avatar =
                document.createElement(
                    "div"
                );


            avatar.className =
                "avatar";


            const avatarImage =
                document.createElement(
                    "img"
                );


            avatarImage.src =
                `assets/images/avatars/${
                    player.avatar ||
                    "avatar-1.png"
                }`;


            avatarImage.alt =
                "Player avatar";


            avatar.appendChild(
                avatarImage
            );


            /* =========================
               PLAYER NAME
            ========================= */

            const playerName =
                document.createElement(
                    "div"
                );


            playerName.className =
                "player-name";


            const nameText =
                document.createElement(
                    "span"
                );


            nameText.textContent =
                player.nickname ||
                "Player";


            playerName.appendChild(
                nameText
            );


            if (isCurrentUser) {

                const youLabel =
                    document.createElement(
                        "span"
                    );


                youLabel.className =
                    "you-label";


                youLabel.textContent =
                    "YOU";


                playerName.appendChild(
                    youLabel
                );

            }


            /* =========================
               SCORE
            ========================= */

            const playerScore =
                document.createElement(
                    "div"
                );


            playerScore.className =
                "player-score";


            const score =
                Number(
                    player.score
                ) || 0;


            playerScore.textContent =
                score.toLocaleString();


            /* =========================
               ADD ROW
            ========================= */

            row.appendChild(
                rank
            );


            row.appendChild(
                avatar
            );


            row.appendChild(
                playerName
            );


            row.appendChild(
                playerScore
            );


            leaderboardList.appendChild(
                row
            );

        }
    );

}