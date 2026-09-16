import { auth, db } from "./firebase-config.js";

import { signInAnonymously } from
  "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

import { doc, getDoc } from
  "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

async function showFirstQuestion() {
  const status = document.getElementById("status");

  try {
    await signInAnonymously(auth);

    const questionRef = doc(db, "questions", "q001");
    const questionSnap = await getDoc(questionRef);

    if (!questionSnap.exists()) {
      throw new Error("Question q001 does not exist");
    }

    const question = questionSnap.data();

    document.getElementById("scenario").textContent =
      question.scenario;

    document.getElementById("optionA").textContent =
      question.options.A;

    document.getElementById("optionB").textContent =
      question.options.B;

    document.getElementById("optionC").textContent =
      question.options.C;

    document.getElementById("optionD").textContent =
      question.options.D;

    status.textContent = "";
  } catch (error) {
    console.error(error);
    status.textContent = `خطأ: ${error.message}`;
  }
}

showFirstQuestion();