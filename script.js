let inputNote = document.getElementById('InputNote');
let addBtn = document.getElementById('addBtn');
let noteList = document.getElementById('noteList');

// let notes = [];

let editIndex = null;
let notes = JSON.parse(localStorage.getItem('notes')) || [];


addBtn.addEventListener('click', () => {
    let content = inputNote.value.trim();

    if (content === '') return;

    if (editIndex === null) {
        notes.push({ content });
        console.log(notes);
    } else {
        //update exisiting note.
        notes[editIndex].content = content;
        editIndex = null;
        addBtn.textContent = 'Add Note';
    }
    saveToLocalStorage();
    renderNote();
    clearInputs();
});

function renderNote() {
    noteList.innerHTML = ''; //Removes all the existing notes before rendering the new list.
    notes.forEach((note, index) => {
        const li = document.createElement('li');
        li.textContent = note.content;
        console.log(`${note.content}`);

        //use to edit an specific note.
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', () => {
            editIndex = index;
            inputNote.value = note.content;
            addBtn.textContent = 'update';
            renderNote();
        });
        li.appendChild(editBtn);

        if (index !== editIndex) {
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'delete';
            deleteBtn.addEventListener('click', () => {
                notes.splice(index, 1);//use to delete from localstorage
                saveToLocalStorage();
                renderNote();
            });
            li.appendChild(deleteBtn);
        }



        noteList.appendChild(li);

    });
}


function clearInputs() {
    inputNote.value = '';
}


function saveToLocalStorage() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

