function setScore() {
  let score = localStorage.getItem("score");
  document.getElementById("score").innerText = score;
}

function saveScore() {
  let score = localStorage.getItem("score");

  let htmlNama = document.getElementById("nama").value;
  
  if (htmlNama === "") {
    alert("Nama harus di isi");
  } else if (htmlNama !== "") {
    let dataHighScore = localStorage.getItem("data-high-score");
    dataHighScore = JSON.parse(dataHighScore);

    let newUserScore = { name: htmlNama, score: score };
    dataHighScore.push(newUserScore);
    localStorage.setItem("data-high-score", JSON.stringify(dataHighScore));
    window.location.href = ("high-score.html");
  }
}

function backToMenu() {
    window.location.href = ("index.html")  
}


window.onload = function () {
  setScore();
};
