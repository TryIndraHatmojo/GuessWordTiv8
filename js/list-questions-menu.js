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
    localStorage.setItem("data-high-score", JSON.stringify(/**isi dari ini adalah objek yang mas udah ubah */));


    // buat update HTML yang baru
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

window.onload = function(){
    getListQuestions()
    hapusQuestion()
}