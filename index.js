const questions = [//object
    {question:"Which is larger animal in the world?",//object
answer:[//object
    {text: "Shark",corect:false},//object
    {text: "Blue whale",corect:true},
    {text: "Elephant",corect:false},
    {text: "Giraffe",corect:false},
]
},
{
    question:"Which is larger desert in the world?",//object
    answer:[//object
        {text: "Kalahari",corect:false},
        {text: "Gobi",corect:true},//object
        {text: "Sahara",corect:false},
        {text: "Antaktida",corect:false},
    ]
},
{question:"Which is smaler constinent in the world?",
answer:[
    {text: "Asia",corect:false},
    {text: "Australia",corect:true},
    {text: "Arctica",corect:false},
    {text: "Africa",corect:false},
]
}
];

const questionElement= document.getElementById("question")//  htm l intput
const answearButtons= document.getElementById("answear-buttons")//spatiul unde stau rasp
const nextButton= document.getElementById("next-btn")// butonul

let currentQuestionIndex= 0;
let score = 0;

function startQuiz(){
    resetState()
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next"
    showQuestion();
}
function showQuestion(){
    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex+1;
    questionElement.innerHTML=questionNo + "." + currentQuestion.question;

    currentQuestion.answer.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answearButtons.appendChild(button) ;
        if(answer.corect){
            button.dataset.corect = answer.corect//daca e corect la fiecare button creat sa 
            //adauge in HTML un atribut numit data-corect care sa fie egal cu valoarea de la 
            // answer.corect
            
        }
        button.addEventListener("click",selectAnswer);
    })
}

function resetState(){
    nextButton.style.display="none";
    while(answearButtons.firstChild){
        answearButtons.removeChild(answearButtons.firstChild)// sa strearga tot ce e in spatiu l pentru raspuns
    }
}
 
 function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.corect === "true";// butonul selectat
    console.log(isCorrect)
    //se verifica daca are data-atribut=true sau false SII retuneaza true sau false
    //e un fel de if === true sau if ==== flase este true sau false
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++

    } else{
        selectBtn.classList.add("incorrect");
    }
    Array.from(answearButtons.children).forEach(button =>{// face un array in caresunt toate butoanele
        //sii prin from ea fiecare button sii pune o functie
        if(button.dataset.corect ==="true"){
            button.classList.add("correct")
            //verifica daca marc unul din butoane are tru si daca are il
            // face verde chiar daca nu ai click pe el
        }
        button.disabled = true;
    })
    nextButton.style.display = "block"
    
 }

  function showScore(){
    resetState()
    questionElement.innerHTML = `You  scored ${score} out of ${questions.length}!`
    nextButton.innerHTML =  "play Again"
    nextButton.style.display="block"
  }
   
 function handleNextButton(){
    currentQuestionIndex++
    if(currentQuestionIndex<questions.length){
        showQuestion()
    }else{
        showScore()
    }
}



 nextButton.addEventListener("click", ()=>{
    resetState()
    if(currentQuestionIndex < questions.length){
        handleNextButton()
    }else{
        startQuiz()
    }
 })

startQuiz();

