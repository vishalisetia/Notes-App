console.log("I am in app.js file");
displayNotes();

// if user adds a note, add it to the local storage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addTitle = document.getElementById("addTitle");
  let addBody = document.getElementById("addBody");
  let notesValue = localStorage.getItem("notes");
  if (notesValue == null) {
    notesArray = [];    // array of objects {title:____, body:____}
  } else {
    notesArray = JSON.parse(notesValue);
  }
  let notesObj = {
    title: addTitle.value,
    body: addBody.value
  }
  notesArray.push(notesObj);
  localStorage.setItem("notes", JSON.stringify(notesArray));
  addTitle.value = "";
  addBody.value = "";
  displayNotes();
});

function displayNotes() {
  let notesValue = localStorage.getItem("notes");
  if (notesValue == null) {
    notesArray = [];
  } else {
    notesArray = JSON.parse(notesValue);
  }
  let html = "";
  notesArray.forEach(function (element, index) {
    html += `<div class="noteCard card my-2 mx-2 " style="width: 18rem;">
              <div class="card-body">
                <h5 class="card-title">${element.title}</h5>
                <p class="card-text">${element.body}</p>
                <button class="btn btn-primary" id="${index}" data-toggle="modal" data-target="#myModal" onclick="editNote(this.id)">Edit</button>
                <button class="btn btn-primary" id="${index}" onclick="deleteNote(this.id)">Delete</button>
              </div>
            </div>`;
  });
  let notesElement = document.getElementById('notes');
  if (notesArray.length != 0) {
    notesElement.innerHTML = html;
  } else {
    notesElement.innerHTML = `No notes has been added yet`;
  }
}

function editNote(index) {
  let notesValue = localStorage.getItem('notes');
  if (notesValue == null) {
    notesArray = [];
  } else {
    notesArray = JSON.parse(notesValue);
  }
  console.log(notesArray[index]);
  var newTitle = document.getElementById('editTitle');
  newTitle.value = notesArray[index].title;
  var newBody = document.getElementById("editBody");
  newBody.value = notesArray[index].body;
  $('#myModal').on('hidden.bs.modal', function (e) {
    notesArray[index].title = newTitle.value;
    notesArray[index].body = newBody.value;
    localStorage.setItem("notes", JSON.stringify(notesArray));
    console.log(notesArray[index]);
    displayNotes();
  })
}

function deleteNote(index) {
  let notesValue = localStorage.getItem("notes");
  if (notesValue == null) {
    notesArray = [];
  } else {
    notesArray = JSON.parse(notesValue);
  }
  notesArray.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesArray));
  displayNotes();
}
