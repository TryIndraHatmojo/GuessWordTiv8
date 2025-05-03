let timerInterval

function stopTimer(){
    clearInterval(timerInterval)
    console.log("stopTimer()")
}

function reduceTimer(){
    
    let htmlScore = document.getElementById("score")
    let htmlQuestion = document.getElementById("question")
    let htmlHint = document.getElementById("hint")
    let htmlCategory = document.getElementById("category")
    let htmlTimer = document.getElementById("timer")
    let htmlContainerTimer = document.getElementById("container-timer")
    let htmlContainerScore = document.getElementById("container-score")
    let score = localStorage.getItem("score")
    
    if(score >= 0 && score <= 20){
        htmlContainerScore.style.color = "red"
    }else if(score >= 21 && score <= 50){
        htmlContainerScore.style.color = "orange"
    }else if(score > 50){
        htmlContainerScore.style.color = "green"
    }

    let currentTimer = localStorage.getItem("timer")
    currentTimer--
    if(currentTimer >= 0 && currentTimer <= 20){
        htmlContainerTimer.style.color = "red"
    }else if(currentTimer >= 21 && currentTimer <= 40){
        htmlContainerTimer.style.color = "orange"
    }else if(currentTimer > 40){
        htmlContainerTimer.style.color = "green"
    }
    
    if(currentTimer < 1){
        let htmlButtons = document.getElementById("buttons")
        htmlButtons.innerHTML = ""
        stopTimer()
        alert(`Selamat anda mendapatkan score ${score}!`)
        localStorage.setItem("score",0)
        htmlScore.innerText = 0
        htmlQuestion.innerText = ""
        htmlHint.innerText = ""
        htmlCategory.innerText = ""
        
    }

    localStorage.setItem("timer", currentTimer);
    htmlTimer.innerText = currentTimer
    
    console.log("reduceTimer()")

}

function startTimer(){
    localStorage.setItem("timer", 30);
    document.getElementById("timer").innerText = 30
    timerInterval = setInterval(reduceTimer, 1000)
    console.log("startTimer()")
}

function defaultAnswer(question){
    let defaultAnswer = ""
    for(let i=0;i<question.answer.length;i++){
        defaultAnswer += "_"
    }
    return defaultAnswer
}

function setRandomQuestion(questions){
    let randomIndex = Math.floor(Math.random() * questions.length)
    localStorage.setItem("question-index",randomIndex)
    
    // initial set
    let question = questions[randomIndex]
    document.getElementById("question").innerText = question.question
    document.getElementById("hint").innerText = question.hint.toUpperCase()
    document.getElementById("category").innerText = question.category[0].toUpperCase()+question.category.slice(1)
    
    let resDefaultAnswer = defaultAnswer(question)
    document.getElementById("answer").innerText = resDefaultAnswer
    
    console.log("setRandomQuestion()")
    return question
}

function generateButton(question){
    
    let indexQuestion = localStorage.getItem("question-index")
    let html = ""
    let answer = question.answer
    answer = answer.split("")
    
    // Algoritma Fisher-Yates Shuffle
    for (let i = answer.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [answer[i], answer[j]] = [answer[j], answer[i]];
    }

    let htmlButtons = document.getElementById("buttons")
    htmlButtons.innerHTML = ""

    let listWarnaTombol = ["red","blue","green","yellow","purple","red","blue","green","yellow","purple","red","blue","green","yellow","purple","red","blue","green","yellow","purple"]
    let listBtn = []
    for(let i = 0;i<answer.length;i++){
        
        let perChar = answer[i]
        if(listBtn.indexOf(perChar) === -1){
            listBtn.push(perChar)
            let randNumber = Math.floor(Math.random() * (listWarnaTombol.length-1));
            let warna = listWarnaTombol[randNumber]
            html += `<a id="btn_${perChar}" class="btnAnswer button ${warna} m-10" onclick="cekAnswer('${perChar}',${indexQuestion})">${perChar.toUpperCase()}</a>`
        }

    }

    htmlButtons.innerHTML = html
    console.log("generateButton()")
}

function startGame(){
    // ambil semua pertanyaan dari localStorage `data-questions`
    let questions = localStorage.getItem("data-questions")
    questions = JSON.parse(questions)

    // Start timer hitung mundur dan set score awal 0
    startTimer()
    localStorage.setItem("score",0)
    document.getElementById("score").innerText = 0
    
    // Ambil soal secara acak dari questions
    let resSetRandomQuestion = setRandomQuestion(questions)

    // Buat tombol acak untuk menjawab pertanyaan
    generateButton(resSetRandomQuestion)
    console.log("startGame()")
}

// section handle jawaban

function resetAnswer(){
    let questions = localStorage.getItem("data-questions")
    questions = JSON.parse(questions)
    let indexQuestion = localStorage.getItem("question-index")
    let question = questions[indexQuestion]
    let resDefaultAnswer = defaultAnswer(question)
    document.getElementById("answer").innerHTML = resDefaultAnswer
}

function addScore(){
    let score = Number(localStorage.getItem("score"))
    score += 10
    localStorage.setItem("score",score)
    document.getElementById("score").innerText = score
}

function addTimer(){
    let currentTimer = Number(localStorage.getItem("timer"))
    currentTimer += 10
    localStorage.setItem("timer", currentTimer);
    document.getElementById("timer").innerText = currentTimer
    console.log("addTimer()")
}

function cekAnswer(char, indexQuestion){
    let questions = localStorage.getItem("data-questions")
    questions = JSON.parse(questions)
    let question = questions[indexQuestion]

    let htmlAnswer = document.getElementById("answer")
    htmlAnswer.innerText += char.toUpperCase()
    if(question.answer.length < htmlAnswer.innerText.length){
        htmlAnswer.innerText = char.toUpperCase()
    }
    
    let userAnswer = htmlAnswer.innerText
    console.log(userAnswer, question.answer.toUpperCase())
    if(question.answer.toUpperCase() === userAnswer){
        resetAnswer()
        addScore()
        addTimer()

        let resSetRandomQuestion = setRandomQuestion(questions)
        generateButton(resSetRandomQuestion)

    }else if(question.answer.length === userAnswer.length){
        let resDefaultAnswer = defaultAnswer(question)
        document.getElementById("answer").innerHTML = resDefaultAnswer
    }
    console.log("cekAnswer")
}

window.onload = function(){
    startGame()
}