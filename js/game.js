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
    if(currentTimer >= 0 && currentTimer < 15){
        htmlContainerTimer.style.color = "red"
    }else if(currentTimer >= 15 && currentTimer <= 25){
        htmlContainerTimer.style.color = "orange"
    }else if(currentTimer > 25){
        htmlContainerTimer.style.color = "green"
    }
    
    if(currentTimer < 1){
        let htmlButtons = document.getElementById("buttons")
        htmlButtons.innerHTML = ""
        stopTimer()

        localStorage.setItem("score",score)
        htmlScore.innerText = 0
        htmlQuestion.innerText = ""
        htmlHint.innerText = ""
        htmlCategory.innerText = ""
        window.location.href = "game-result.html"
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
            let randNumber = Math.floor(Math.random() * listWarnaTombol.length);
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
        addLog("correct")
    }else if(question.answer.length === userAnswer.length){
        let resDefaultAnswer = defaultAnswer(question)
        document.getElementById("answer").innerHTML = resDefaultAnswer
        addLog("wrong")
    }
    console.log("cekAnswer")
}

function addLog(type){
    const correctMessages = {
        messages: [
            "You're on fire! 🔥",
            "Boom! Nailed it! 💥",
            "That's how it's done! 😎",
            "Sheeesh, you're good! 🧠✨",
            "Big brain moves! 🧠💯",
            "You crushed it! 💪",
            "Too easy for you, huh? 😏",
            "Slayed it! 🔥👑",
            "No cap, you're killin' it! 🧢🚫",
            "W combo! Keep it rollin' 🎉",
            "You're the GOAT! 🐐",
            "EZ clap, bro 👏😤",
            "One shot, one kill! 🎯",
            "Straight dubs only! 🏆",
            "Legendary answer! 🌟",
            "Nice one, bro! ✌️",
            "You got it, easy peasy 😎",
            "Well done, mate! 👍",
            "Clean answer, respect 🙌",
            "That was smooth 💫",
            "You did great, no stress 😌",
            "Right on point, bro 🎯",
            "Solid pick! 👌",
            "Bang on! Keep it up 🔥",
            "Good vibes only, nice job ✨",
            "You’re doing awesome! 🫶",
            "Chill move, well played 🎮",
            "Yep, that’s the one! ✅",
            "Casual win, love it 😏",
            "Easy win, you got style 💁‍♂️"
        ]
    };
    
    const wrongMessages = {
        messages:[
            "Oops, not quite 😅",
            "Close, but nope 😬",
            "Almost! Try again 👀",
            "Ehh... not this time 😔",
            "Nice try tho! ✌️",
            "Wrong one, but you got this 💪",
            "So close, yet so far 😢",
            "Nah bro, try another one 😅",
            "Don't give up now! 🔄",
            "Ayy, not it, but you’re learning 🎓",
            "Nope, but nice effort 👏",
            "Keep goin’, you’ll get it 🔥",
            "That ain't it chief 🫠",
            "Wanna try that again? 😏",
            "Mistakes make masters 😌",
            "Bruh... what was that? 😂",
            "That answer belongs in the trash 🗑️😅",
            "Try again, but maybe with your eyes open this time 👀",
            "Uhh... you good, bro? 🤨",
            "LOL nope! But nice try tho 😎",
            "That was not it, chief 🤡",
            "Are you even trying? 😂",
            "Wrong answer, but your vibe is still immaculate ✨",
            "That guess was so bad it hurt my pixels 😭",
            "Close... like, in a different universe 😆",
            "You missed it like a stormtrooper 🌌🔫",
            "Brain.exe has stopped working 🧠💥",
            "Wanna phone a friend? 📞🤣",
            "Plot twist: that was the wrong answer! 📚",
            "You had one job, bro... ONE JOB 😩"
        ]
    }
    
    const welcomeMessages = {
        messages: [
            "Welcome to the game! Ready to have some fun? 🎮",
            "Yo! Glad you're here. Let's play! 😎",
            "Hey there! Let’s get this game started! 🔥",
            "Welcome, player! Time to show your skills 💪",
            "Let the fun begin! 🎉",
            "You made it! Ready to play? 😁",
            "Game on! Good luck, champ! 🏆",
            "Let’s do this! Have fun and play smart 😏",
            "Welcome! Hope you’re ready for a challenge 🎯",
            "It’s game time! Let’s gooo 🚀"
        ]
    };

    let logContainer = document.getElementById("log-container")
    
    if(type === "welcome"){
        let index = Math.floor(Math.random() * welcomeMessages.messages.length)
        logContainer.innerHTML += `<div class="log-message blue">${welcomeMessages.messages[index]}</div>`
    }else if(type === "correct"){
        let index = Math.floor(Math.random() * correctMessages.messages.length)
        logContainer.innerHTML += `<div class="log-message green">${correctMessages.messages[index]}</div>`
        let randomAudio = Math.floor(Math.random() * 3) + 1
        document.getElementById(`audio-correct-${randomAudio}`).play()
    }else if(type === "wrong"){
        let index = Math.floor(Math.random() * wrongMessages.messages.length)
        logContainer.innerHTML += `<div class="log-message red">${wrongMessages.messages[index]}</div>`
        document.getElementById(`audio-wrong-1`).play()
    }
    logContainer.scrollTop = logContainer.scrollHeight;
}

window.onload = function(){
    startGame()
    addLog("welcome")
}