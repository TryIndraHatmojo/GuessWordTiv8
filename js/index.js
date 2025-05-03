import {wordGuessQuestions} from "./data-questions.js"
import {listHighScore} from "./data-high-score.js"

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

window.onload = function(){
    setInitialLocalStorage()
}