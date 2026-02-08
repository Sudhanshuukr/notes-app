let inputNote = document.getElementById('InputNote');
let addBtn = document.getElementById('addBtn');
let noteList = document.getElementById('noteList');

let notes = [];

addBtn.addEventListener('click', () => {
    let content = inputNote.value.trim();
    notes.push({content});
    console.log(notes);

    if (content === '') return;
    renderNote();
    clearInputs();

});

function renderNote(){
    noteList.innerHTML=''; //Removes all the existing notes before rendering the new list
    notes.forEach((note) => {
        const li = document.createElement('li');
        li.textContent = note.content;
        console.log(`${note.content}`)
        noteList.appendChild(li);
    });
}

function clearInputs(){
    inputNote.value = '';
}

