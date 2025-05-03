function getHighScore(){
    // setItem buat 
    let dataHighScore = localStorage.getItem("data-high-score");
    dataHighScore = JSON.parse(dataHighScore)
    
    let htmlListHighScore = document.getElementById("listHighScore")
    let list = ""
    
    let urutScore = [...dataHighScore].sort((a,b)=>b.score-a.score)

    for(let i = 0;i<urutScore.length;i++){
        let perObj = urutScore[i]
        list += `<li>${perObj.name}: ${perObj.score}</li>`
    }
    htmlListHighScore.innerHTML = list


    // let newUserScore = { name: "Elang", score: 100 }
    // dataHighScore.push(newUserScore)
    // localStorage.setItem("data-high-score", JSON.stringify(dataHighScore));



    
}

window.onload = function(){
    getHighScore()
}