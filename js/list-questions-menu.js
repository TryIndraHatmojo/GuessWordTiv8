const createModal = new bootstrap.Modal('#createModal', {
    keyboard: false
})

const editModal = new bootstrap.Modal('#editModal', {
    keyboard: false
})

function getLocalStorageQuestions(){
    let questions = localStorage.getItem("data-questions")
    questions = JSON.parse(questions)
    return questions
}

function saveLocalStorageQuestions(question){
    console.log(question)
    localStorage.setItem("data-questions", JSON.stringify(question))
}

function getListQuestions(){
    let questions = getLocalStorageQuestions()
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
                <a href="javascript:;"class="button blue btn-edit" onclick="editQuestion(${question.id})">
                    <box-icon name='pencil' color='#fffbfb' ></box-icon>
                </a>
                <a href="javascript:;"class="button red btn-trash" onclick="hapusQuestion(${question.id})">
                    <box-icon name='trash' type='solid' color='#fffbfb' ></box-icon>
                </a>
            </td>
        </tr>
        `
        nomor++
    }
    document.getElementById("table-body-list-questions").innerHTML = row
}

function createQuestion(){
    document.getElementById("question-edit").value = ""
    document.getElementById("category-edit").value = ""
    document.getElementById("answer-edit").value = ""
    document.getElementById("hint-edit").value = ""

    createModal.show()
}

function storeQuestion(){
    let question = document.getElementById("question-create").value
    let category = document.getElementById("category-create").value
    let answer = document.getElementById("answer-create").value
    let hint = document.getElementById("hint-create").value

    let questions = getLocalStorageQuestions()
    let item = {
        id: questions.length+1,
        question: question,
        category: category,
        answer: answer,
        hint: hint
    }
    questions.push(item)

    saveLocalStorageQuestions(questions)
    
    getListQuestions()
    createModal.hide()
}

function editQuestion(id){
    let questions = getLocalStorageQuestions()
    let item = questions.find(questions=>questions.id === id)
    
    document.getElementById("id-edit").value = item.id
    document.getElementById("question-edit").value = item.question
    document.getElementById("category-edit").value = item.category
    document.getElementById("answer-edit").value = item.answer
    document.getElementById("hint-edit").value = item.hint

    editModal.show()
}

function updateQuestion(){
    let id = document.getElementById("id-edit").value
    let question = document.getElementById("question-edit").value
    let category = document.getElementById("category-edit").value
    let answer = document.getElementById("answer-edit").value
    let hint = document.getElementById("hint-edit").value

    let questions = getLocalStorageQuestions()
    let item = questions.find(questions=>questions.id === Number(id))
    item.question = question
    item.category = category
    item.answer = answer
    item.hint = hint

    console.log(questions)

    saveLocalStorageQuestions(questions)
    
    getListQuestions()

    editModal.hide()
}

function hapusQuestion(id){
    const swalWithCustomBtn = Swal.mixin({
            customClass: {
            confirmButton: "button red m-10",
            cancelButton: "button blue m-10"
        },
        buttonsStyling: false
    });

    swalWithCustomBtn.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {

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
            
            swalWithCustomBtn.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        }
    });
}

window.onload = function(){
    getListQuestions()
}