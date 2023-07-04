// Firebase Start

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import { getDatabase, ref, set, push, onChildAdded } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCXgf6MaQ87W3aojlpk3vIZ6H40mObc6L0",
    authDomain: "quiz-app-with-database-acbce.firebaseapp.com",
    projectId: "quiz-app-with-database-acbce",
    storageBucket: "quiz-app-with-database-acbce.appspot.com",
    messagingSenderId: "850118170951",
    appId: "1:850118170951:web:0f3f864fe9f802a52a9462",
    measurementId: "G-Q3QDJG6D21"
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase();

// Firebase khtm

var question = document.getElementById("ques");
var option1 = document.getElementById("opt-1");
var option2 = document.getElementById("opt-2");
var option3 = document.getElementById("opt-3");
var option4 = document.getElementById("opt-4");
var correct = document.getElementById("correct")

var index = 0;
var marks = 0;

var dQues = document.getElementById("displayQuestion");
var currCount = document.getElementById("currentQuestionNumber");
var totalCount = document.getElementById("totalQuestionNumber");
var showOptions = document.getElementById("optionParent");

let questionsData = [];

function clear() {
    question.value = ""
    option1.value = ""
    option2.value = ""
    option3.value = ""
    option4.value = ""
    correct.value = ""
}

window.add = function () {
    if (!question.value || !option1.value || !option2.value || !option3.value || !option4.value || !correct.value) {
        alert("Plz Fill All Fields...");
        return;
    }
    var optionsss = [option1.value, option2.value, option3.value, option4.value,];
    var quesObj = {
        question: question.value,
        options: optionsss,
        correct: correct.value
    }
    const reference = push(ref(database, "questions data/"));
    set(reference, quesObj);
    clear();
};


function renderData() {
    currCount.innerHTML = index + 1;
    totalCount.innerHTML = questionsData.length;
    dQues.innerHTML = questionsData[index].question;
    showOptions.innerHTML = ''
    for (var i = 0; i < questionsData[index].options.length; i++) {
        // console.log(questionsData[index].options[i]);

        // ALL OPTIONS
        var allOpt = questionsData[index].options[i];
        // CORRECT
        var corr = questionsData[index].correct;

        showOptions.innerHTML +=
            `
                <div class="col-md-6 my-3">
                    <button
                            onclick="checkQuestion('${allOpt}', '${corr}')"
                            class="btn p-3 w-100 txtPrimary rounded-pill shadow fw-bold d-block"
                            style="background-color: #FFEDED;">
                            ${questionsData[index].options[i]}
                    </button>
                </div>
            `
    }
}


console.log(questionsData.length)

function getData() {
    const reference = ref(database, "questions data");
    onChildAdded(reference, function (data) {
        // console.log(data.val())
        questionsData.push(data.val());
        renderData();
    })
};

getData();

window.nextQuestion = function () {
    optionParent.innerHTML = "";
    if (index + 1 == questionsData.length) {
        var totalPercentage = (marks / questionsData.length) * 100;
        alert("Your Percentage is " + totalPercentage.toFixed(2) + "%");
        // console.log(totalPercentage)
        index = 0;
        marks = 0;
        renderData();
    } else {
        index++;
        renderData();
    }
}

window.checkQuestion = function (optionValue, correctValue) {
    if (optionValue == correctValue) {
        marks++;
        console.log(marks);
    }
    nextQuestion();
};