import { initializeApp } from
  "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import { getAuth } from
  "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

import { getFirestore } from
  "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDDUJGWhIxonxNSUW9CL0dwVaNEvFQ8Fbo",
  authDomain: "masmod-fe682.firebaseapp.com",
  projectId: "masmod-fe682",
  storageBucket: "masmod-fe682.firebasestorage.app",
  messagingSenderId: "628222964870",
  appId: "1:628222964870:web:12c409d99c9286b4bccd07",
  measurementId: "G-PDEK4GC3DD"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };