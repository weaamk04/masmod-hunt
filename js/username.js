const nicknameInput = document.getElementById("nicknameInput");
const avatarOptions = document.querySelectorAll(".avatar-option");
const nextButton = document.getElementById("nextButton");
const errorMessage = document.getElementById("nicknameError");


// Default selected avatar
let selectedAvatar = "avatar-1.png";


// Avatar selection
avatarOptions.forEach(option => {

    option.addEventListener("click", () => {

        avatarOptions.forEach(button => {
            button.classList.remove("selected");
        });

        option.classList.add("selected");

        selectedAvatar = option.dataset.avatar;
    });

});


// Nickname input
nicknameInput.addEventListener("input", () => {
    errorMessage.style.display = "none";
});


// Start the Hunt
nextButton.addEventListener("click", () => {

    const nickname = nicknameInput.value.trim();

    if (nickname === "") {

        errorMessage.style.display = "block";

        nicknameInput.focus();

        return;
    }


    // Save player data
    localStorage.setItem("masmodNickname", nickname);
    localStorage.setItem("masmodAvatar", selectedAvatar);


    // Go to quiz
    window.location.href = "quiz.html";

});