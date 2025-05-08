function setInitialLocalStorage(){
    let dataQuestions = localStorage.getItem("data-questions")
    if(!dataQuestions){
        dataQuestions = wordGuessQuestions
        localStorage.setItem("data-questions", JSON.stringify(dataQuestions))
        console.log("initial question")
    }

    let dataHighScore = localStorage.getItem("data-high-score")
    if(!dataHighScore){
        dataHighScore = listHighScore
        localStorage.setItem("data-high-score", JSON.stringify(dataHighScore))
        console.log("initial high score")
    }
    localStorage.setItem("score",0)
}

function audioButton(){
    let audioBtn = document.getElementById("audio-button")
    let attr = audioBtn.getAttribute("name")
    let audio = document.getElementById("audio-main-menu")
    if(attr === "volume-full"){
        audioBtn.setAttribute("name", "volume-mute")
        audio.muted = true;
    }else{
        audioBtn.setAttribute("name", "volume-full")
        audio.muted = false;
        audio.play()
    }
}

window.onload = function(){
    setInitialLocalStorage()
}