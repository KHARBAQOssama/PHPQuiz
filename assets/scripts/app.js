import { questions } from "./questions.js";

let questionsWeHave     = questions;
let total               = questions.length;
// console.log(questionsWeHave);


// console.log(questionsNumber);


// direction lines
const to1         = document.getElementById('to1');
const to2         = document.getElementById('to2');
const to3         = document.getElementById('to3');
const gp         = document.getElementById('gp');
const qp         = document.getElementById('qp');
const rp         = document.getElementById('rp');

// buttons 
const startBtn          = document.getElementById('start-btn');
const exitGuide         = document.getElementById('exit-guide');
const takeQuiz          = document.getElementById('take-quiz');

// console.log(startBtn);

// pages
const homePage          = document.getElementById('home');
const guidePage         = document.getElementById('guide');
const quizPage          = document.getElementById('quiz');
const resultPage        = document.getElementById('result');

// Result elements 

const feedback          = document.getElementById('feedback'); 
const questionsTotal    = document.getElementById('questions-total'); 
const questionsAnswered = document.getElementById('questions-answered'); 
const playAgain         = document.getElementById('play-again'); 
const exitQuiz          = document.getElementById('exit-quiz'); 

// progress elements
const progress          = document.getElementById('progress-fill'); 
const percentage        = document.getElementById('percentage'); 


// quiz elements 
const question          = document.getElementById('question');
const options           = document.getElementsByClassName('option');
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
    to1.style.height='100%';
    setTimeout(()=>{
        gp.style.backgroundColor = '#5874CC';
        gp.style.color = 'white';
    },1000)
}

exitGuide.onclick = () =>{
    guidePage.classList.remove("active"); // show the guide page
    homePage.classList.add("active");
    to1.style.height='0%';
    gp.style.backgroundColor = '#839cef31';
    gp.style.color = '#5874CC';
    
}

exitQuiz.onclick = () =>{
    location.reload();
}

var index;
takeQuiz.onclick = () =>{
    quizPage.classList.add("active"); // show the guide page
    guidePage.classList.remove("active");
    to2.style.height='100%';
    setTimeout(()=>{
        qp.style.backgroundColor = '#5874CC';
        qp.style.color = 'white';
    },1000);
    index = Math.floor(Math.random() * questionsWeHave.length);
    showQuestion(index);
}

function showQuestion(index){
    setTimeout(()=>{
        for(let i=0;i<4;i++){
            options[i].classList.remove("disabled");
        }
    },500);
    question.innerText = questionsWeHave[index]['question'];
    question.setAttribute('data-number',questionsWeHave[index]['answer']);
    for(let i =0 ;i<options.length;i++){
        options[i].innerText = (i+1) +'  -  ' + questionsWeHave[index]['choice'+(i+1)];
    }
    questionsWeHave.splice(index,1);

    progress.style.width = (((total-questionsWeHave.length)/total)*100) + '%';
    percentage.innerText = (((total-questionsWeHave.length)/total)*100) + '%';

    console.log(questionsWeHave.length);
    console.log(question);
}



function getAnswer(x){
    for(let i=0;i<4;i++){
        options[i].classList.add("disabled");
    }
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

        if(questionsWeHave.length == 0){
            to3.style.height='100%';
            setTimeout(()=>{
                rp.style.backgroundColor = '#5874CC';
                rp.style.color = 'white';
            },1000);
            resultPage.classList.add("active"); 
            quizPage.classList.remove("active");
            result();
            
        }else{
            index = Math.floor(Math.random() * questionsWeHave.length);
            showQuestion(index);
        }
        
    },1000)

}


function result(){
    if(correctAnswers == 5){
        feedback.innerText = "THAT'S NICE";
        questionsAnswered.innerText = correctAnswers;
    }else if(correctAnswers > 5){
        feedback.innerText = "YOU ARE REALLY SMART";
        questionsAnswered.innerText = correctAnswers;
    }else {
        feedback.innerText = "UNFORTUNATELY";
        questionsAnswered.innerText = ' just ' + correctAnswers;
    }
    questionsTotal.innerText = total;
    
}



// console.log(total,correctAnswers);

// console.log(options[1].parentElement.previousElementSibling);