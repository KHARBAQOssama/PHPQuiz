import { questions } from "./questions.js";

let questionsWeHave = questions;
let total = questionsWeHave.length;
// console.log(questionsWeHave);


// console.log(questionsNumber);

// buttons 
const startBtn = document.getElementById('start-btn');
const exitGuide = document.getElementById('exit-guide');
const takeQuiz = document.getElementById('take-quiz');

// console.log(startBtn);

// pages
const homePage = document.getElementById('home');
const guidePage = document.getElementById('guide');
const quizPage = document.getElementById('quiz');
const resultPage = document.getElementById('result');

// Result elements 

const feedback = document.getElementById('feedback'); 
const questionsTotal = document.getElementById('questions-total'); 
const questionsAnswered = document.getElementById('questions-answered'); 
const playAgain = document.getElementById('play-again'); 
const exitQuiz = document.getElementById('exit-quiz'); 

// progress elements
const progress = document.getElementById('progress-fill'); 
const percentage = document.getElementById('percentage'); 


// quiz elements 
const question = document.getElementById('question');
const options = document.getElementsByClassName('option');
// console.log(options);
// console.log(question);


options[0].addEventListener('click',()=>{
    getAnswer(options[0])
});
options[1].addEventListener('click',()=>{
    getAnswer(options[1])
});
options[2].addEventListener('click',()=>{
    getAnswer(options[2])
});
options[3].addEventListener('click',()=>{
    getAnswer(options[3])
});



let correctAnswers = 0;

startBtn.onclick = () =>{
    guidePage.classList.add("active"); // show the guide page
    homePage.classList.remove("active");
}

exitGuide.onclick = () =>{
    guidePage.classList.remove("active"); // show the guide page
    homePage.classList.add("active");
}

var index;
takeQuiz.onclick = () =>{
    quizPage.classList.add("active"); // show the guide page
    guidePage.classList.remove("active");
    index = Math.floor(Math.random() * questions.length);
    showQuestion(index);
}

function showQuestion(index){
    question.innerText = questions[index]['question'];
    question.setAttribute('data-number',questions[index]['answer']);
    for(let i =0 ;i<options.length;i++){
        options[i].innerText = (i+1) +'  -  ' + questions[index]['choice'+(i+1)];
    }
    questions.splice(index,1);

    progress.style.width = (((total-questions.length)/total)*100) + '%';
    percentage.innerText = (((total-questions.length)/total)*100) + '%';

    console.log(questions.length);
    console.log(question);
}



function getAnswer(x){
    let answer = x.parentElement.previousElementSibling.dataset['number'];
    let uAnswer = x.dataset['number'];
    console.log(answer);
    if(answer == uAnswer){
        x.classList.add('correct');
        correctAnswers++;
    }else{
        x.classList.add('incorrect');
        options[answer-1].classList.add('correct');
    }
    console.log(correctAnswers);
    setTimeout(()=>{
        
        for(let i=0;i<4;i++){
            options[i].classList.remove('correct');
            options[i].classList.remove('incorrect');
        }

        if(questions.length == 0){
            resultPage.classList.add("active"); 
            quizPage.classList.remove("active");

        }else{
            index = Math.floor(Math.random() * questions.length);
            showQuestion(index);
        }
        
    },1000)

}


function result(){
    if(correctAnswers == 5){
        feedback.innerText = "THAT'S NICE";
    }else if(correctAnswers > 5){
        feedback.innerText = "YOU ARE REALLY SMART";
    }else {
        feedback.innerText = "UNFORTUNATELY";
    }
    questionsTotal.innerText = total;
    questionsAnswered.innerText = correctAnswers;
}

// console.log(options[1].parentElement.previousElementSibling);