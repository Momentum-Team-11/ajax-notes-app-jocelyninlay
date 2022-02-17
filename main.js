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
listNotes();

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


//listen for actions on notes list
notesList.addEventListener('click', function (event){
    if (event.target.classList.contains('delete')) {
        deleteCreateNote(event.target)
    }
if (event.target.classList.contains('edit')) {
    editCreateNote(event.target)
}
if (event.target.classList.contains('update-text')) {
    updateCreateNote(event.target)
}
if (event.target.classList.contains('cancel')){
    hideEditControls(event.target.parentElement)
}
})

function updateCreateNote(element) {
    const noteId = element.parentElement.id
    const noteText = document.querySelector('.edit-text')
    fetch(`http://localhost:3000/notes/${noteId}`, {
        method: 'PATCH',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
            title: noteText.value,
        }),
    })
        .then(function (res) {
            return res.json()
        })
        .then(function (data) {
            renderNoteText(element.parentElement, data)
        })
    }
function renderNoteItem(noteObj) {
    const noteEl = document.createElement('li')
    noteEl.id = noteObj.id;
    noteEl.classList.add("noted");
    noteEl.innerHTML = `<span>${noteObj.title} ${noteObj.body}</span>`;
    renderNoteText(noteEl, noteObj)
    notesList.prepend(noteEl)
    clearInputs()
}
function clearInputs() {
    form.reset()
}

function renderNoteText(noteslistItem, noteObj) {
    noteslistItem.innerHTML = `<span class="dib w-60"><h3>${noteObj.title}</h3> <p>${noteObj.body}</p></span> <i class="fas fa-edit edit"></i> <i class="fas fa-trash delete"></i>`
}

function editCreateNote(element) {
    showEditInput(element.parentElement)
}

function showEditInput(noteItem) {
    noteItem.innerHTML = `
    <input class="edit-text w-60" type="text" value="${noteItem.textContent}" autofocus>
    <button class="update-text" data-note=${noteItem.id}>save</button>
    <button class='cancel'>cancel</button>
    `
    noteItem.querySelector('input').select()
}

function hideEditControls(noteItem) {
    fetch(`http://localhost:3000/notes/${noteItem.id}`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        renderNoteText(noteItem, data)
    })
}


function deleteCreateNote(element) {
    const noteId = element.parentElement.id
    fetch(`http://localhost:3000/notes/${noteId}`, {
        method: 'DELETE',
    }).then(function () {
        element.parentElement.remove()
    })
}

