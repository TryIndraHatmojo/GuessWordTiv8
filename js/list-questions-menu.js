function getListQuestions(){
    let questions = localStorage.getItem("data-questions")
    questions = JSON.parse(questions)
    let newQuestions = [...questions].sort((a,b)=>b.id-a.id)
    let row = ""
    let nomor = 1
    for(let i = 0;i < newQuestions.length;i++){
        let question = newQuestions[i]
        row += `
        <tr>
            <td>${nomor}</td>
            <td>${question.question}</td>
            <td>${question.category}</td>
            <td>${question.answer}</td>
            <td>${question.hint}</td>
            <td>
                <a href="javascript:;"class="button red reset-answer" onclick="hapusQuestion(${question.id})">
                    Hapus
                </a>
            </td>
        </tr>
        `
        nomor++
    }
    document.getElementById("table-body-list-questions").innerHTML = row
}

function hapusQuestion(id){
    let questions = localStorage.getItem("data-questions")
    questions = JSON.parse(questions)
    console.log(questions)
    
    let deletedQuestion = []

    for (let i = 0; i < questions.length; i++) {
        if (questions[i].id !== id) {
            deletedQuestion.push(questions[i]);
        }
    }
    
    localStorage.setItem("data-questions", JSON.stringify(deletedQuestion));


    // buat update HTML yang baru
   getListQuestions()
}

window.onload = function(){
    getListQuestions()
}