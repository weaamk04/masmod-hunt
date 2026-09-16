const nicknameInput = document.getElementById("nicknameInput");
const nicknameOptions = document.querySelectorAll(".nickname-option");
const nextButton = document.getElementById("nextButton");
const errorMessage = document.getElementById("nicknameError");


// لما يختار اسم جاهز
nicknameOptions.forEach(option => {

    option.addEventListener("click", () => {

        nicknameOptions.forEach(button => {
            button.classList.remove("selected");
        });

        option.classList.add("selected");

        nicknameInput.value = option.textContent.trim();

        errorMessage.style.display = "none";
    });

});


// لما يكتب اسم بنفسه
nicknameInput.addEventListener("input", () => {

    nicknameOptions.forEach(button => {
        button.classList.remove("selected");
    });

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

    // نخزن الاسم
    localStorage.setItem("masmodNickname", nickname);

    // نروح للعبة
    window.location.href = "quiz.html";

});