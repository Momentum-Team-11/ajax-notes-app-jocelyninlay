const url = 'http://localhost:3000/notes/'
const form = document.querySelector('#notes')
const notesList = document.querySelector('#listOfNotes')

function listNotes() {
    fetch(url)
    .then((res) => res.json())
    .then((data => {
         for (let noteObj of data) {
        renderNoteItem(noteObj);
         }
    }))
}

form.addEventListener("submit", function () {
    event.preventDefault();
    const titleText = document.getElementById("title").value
    const noteText = document.getElementById("body").value
    fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: titleText,
            body: noteText,
        }),
    })
    .then((res) => res.json())
    .then((data) => {
        renderNoteItem(data);
    });
});

function renderNoteItem(noteObj) {
    const noteEl = document.createElement('li')
    noteEl.id = noteObj.id;
    noteEl.classList.add("noted");
    noteEl.innerHTML = `<span>${noteObj.title} ${noteObj.body}</span>`;
    notesList.appendChild(noteEl)
    clearInputs()
}
listNotes();

// //listen for form submit
// form.addEventListener('submit', function (event) {
//     event.preventDefault()
//     const notesSection = document.querySelector('#notes').value
//     createnote(notesSection)
// })

// // //listen for actions on notes list
// // notesList.addEventListener('clicl', function (event){
// //     if (event.target.classList.contains('delete')) {
// //         deletecreatenote(event.target)
// //     }
// // if (event.target.classList.contains('edit')) {
// //    editcreatenote(event.target)
// // }
// // })

// fetch(url)
// .then(function (response) {
//   return response.json()
// })
// .then(function (data) {
//     console.log(data) 
//     for (let noteObj of data) {
//         renderNoteItem(noteObj);
//     }
// });

// function createNote(NoteText) {
//     fetch(url, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             title: titleText,
//             body: NoteText,
//         }),
//     }) 
//     .then((res) => res.json())
//     .then((data) => {
//         console.log(data)
//         renderNoteItem(data)
// }
// createNote()

