// https://www.w3schools.com/html/html5_webstorage.asp

console.log("I am in js/app.js file");
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
                <!-- Trigger/Open The Modal -->         
                <button class="btn btn-primary" id="myBtn" onclick="editNote()">Edit</button>
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

function editNote() {
  var modal = document.getElementById("myModal");   // Get the modal
  modal.style.display = "block";  // When the user clicks on the button, open the modal

  var span = document.getElementsByClassName("close")[0];   // Get the <span> element that closes the modal
  span.onclick = function () {    // When the user clicks on <span> (x), close the modal
    modal.style.display = "none";
  }

  window.onclick = function (event) {   // When the user clicks anywhere outside of the modal, close it
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

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


// let search = document.getElementById('searchTxt');
// search.addEventListener("input", function () {
//   let inputValue = search.value;
//   console.log("input event fired: ", inputValue);
//   let noteCards = document.getElementsByClassName("noteCard");
//   Array.from(noteCards).forEach(function(element) {
//   })
// })
