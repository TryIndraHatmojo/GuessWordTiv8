function setScore() {
  let score = localStorage.getItem("score");
  document.getElementById("score").innerText = score;
}

function saveScore() {
  let score = localStorage.getItem("score");
  let htmlNama = document.getElementById("nama").value;

  if (htmlNama === "") {
    Swal.fire({
      icon: "warning",
      title: "eits no,no",
      text: "Fill your name first!",
    });
  }

  if (htmlNama !== "") {
    // swal.fire(`Thank You For Playing Our Game ${htmlNama}`);
    Swal.fire({
      position: "top",
      icon: "success",
      title: `Thank Your For Playing our game ${htmlNama}`,
      showConfirmButton: false,
      timer: 3000
    });
    
    let breakLocation = setTimeout(function() {
      window.location.href = "high-score.html";
    }, 3010);

    let dataHighScore = localStorage.getItem("data-high-score");
    dataHighScore = JSON.parse(dataHighScore);
    
    let newUserScore = { name: htmlNama, score: score };
    dataHighScore.push(newUserScore);
    localStorage.setItem("data-high-score", JSON.stringify(dataHighScore));
    // window.location.href = "high-score.html";
    // breakLocation
  }
}

function backToMenu() {
  window.location.href = "index.html";
}

window.onload = function () {
  setScore();
};


