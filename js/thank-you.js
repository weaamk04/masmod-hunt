const homeButton =
    document.getElementById("homeButton");


homeButton.addEventListener("click", () => {

    /* Clear previous game result */

    localStorage.removeItem("masmodScore");
    localStorage.removeItem("masmodAnswered");
    localStorage.removeItem("masmodCorrect");


    /* Back to Home */

    window.location.href =
        "index.html";

});