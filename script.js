let inputNote = document.getElementById('InputNote');
let addBtn = document.getElementById('addBtn');
let noteList = document.getElementById('noteList');

// let notes = [];

let editIndex = null;
let notes = JSON.parse(localStorage.getItem('notes')) || [];


addBtn.addEventListener('click', () => {
    let content = inputNote.value.trim();

    //if input box is empty it doesn't add in array.
    if (content === '') return;

    if (editIndex === null) {
        const {date, time} = getCurrentTime();
        notes.push({ 
            content,
            createdDate: date,
            createdTime: time,
            updatedDate: null,
            updatedTime: null
        });

        console.log(notes);//use to check the array(notes).
    } else {
        const {date, time} = getCurrentTime();
        //update exisiting note.
        notes[editIndex].content = content;
        notes[editIndex].updatedDate = date;
        notes[editIndex].updatedTime = time;

        editIndex = null;
        addBtn.textContent = 'Add Note';
    }
    saveToLocalStorage(); //imediately store the date in localstorage.
    renderNote(); //re-render ui..so that data update.
    clearInputs(); //clean input box
});

function renderNote() {
    noteList.innerHTML = ''; //Removes all the existing notes before rendering the new list.

    notes.forEach((note, index) => {
        const li = document.createElement('li');
        // li.textContent = note.content; //use to add content in li.
        // console.log(`${note.content}`); //use to check the note's array content.

        //use to store entered input.
        const contentDiv = document.createElement('div');
        contentDiv.textContent = note.content;
    
        //use to store time
        const metaDiv = document.createElement('div');
        metaDiv.style.fontSize = '12px';
    
        if(note.updatedDate){
            metaDiv.textContent = `(Edited: ${note.updatedDate} | ${note.updatedTime})`;
        }else{
            metaDiv.textContent = `(created: ${note.createdDate} | ${note.createdTime})`;
        }
    
        //use as container for edit and update button.
        const btnDiv = document.createElement('div');

        
        const editBtn = document.createElement('button'); //use to edit an specific note.
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', () => {
            editIndex = index;
            inputNote.value = note.content;
            addBtn.textContent = 'update';
            renderNote();
        });
        btnDiv.appendChild(editBtn);

        if (index !== editIndex) {
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'delete';
            deleteBtn.addEventListener('click', () => {
                notes.splice(index, 1);//use to delete from localstorage
                saveToLocalStorage();
                renderNote();
            });
            btnDiv.appendChild(deleteBtn);
        }

        
        li.appendChild(contentDiv);
        li.appendChild(metaDiv);
        li.appendChild(btnDiv);

        noteList.appendChild(li);

    });
}


function clearInputs() {
    inputNote.value = '';
}


function saveToLocalStorage() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

function getCurrentTime(){
    const now = new Date();

    const date = now.toLocaleDateString("en-in",{
        day: "2-digit",
        month: 'short',
        year: '2-digit'
    });

    const time = now.toLocaleTimeString("en-in", {
        hour: '2-digit',
        minute: '2-digit'
    });

    return {date, time};
}

