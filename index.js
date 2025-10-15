const myLibrary = [];
const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector("dialog button");

// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
  dialog.showModal();
});

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
  dialog.close();
});

function submitForm(form) {
  addBookToLibrary(form.name.value, form.author.value, form.pages.value);
  dialog.close();
  form.reset();
  renderBooks();
  return false;
}

function Book(name, totalPages, author, read = false) {
  this.id = crypto.randomUUID();
  this.name = name;
  this.totalPages = totalPages;
  this.author = author;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

function addBookToLibrary(name, totalPages, author) {
  let book = new Book(name, totalPages, author);
  myLibrary.push(book);
}

addBookToLibrary("Grow Rich", 123, "A.B.Dhillon");
addBookToLibrary("Think Large", 456, "Joe Root");

function deleteItem(index) {
  myLibrary.splice(index, 1);
  renderBooks();
}

renderBooks();

function renderBooks() {
  let bookTable = document.getElementById("book-table");
  bookTable.innerHTML = "";
  let table = document.createElement("table");
  bookTable.appendChild(table);

  let tableHeading = document.createElement("thead");

  let tableColumn1 = document.createElement("th");
  tableColumn1.innerText = "ID";
  tableHeading.appendChild(tableColumn1);

  let tableColumn2 = document.createElement("th");
  tableColumn2.innerText = "Name";
  tableHeading.appendChild(tableColumn2);

  let tableColumn3 = document.createElement("th");
  tableColumn3.innerText = "Author";
  tableHeading.appendChild(tableColumn3);

  let tableColumn4 = document.createElement("th");
  tableColumn4.innerText = "Total Pages";
  tableHeading.appendChild(tableColumn4);

  let tableColumn5 = document.createElement("th");
  tableColumn5.innerText = "Action";
  tableHeading.appendChild(tableColumn5);

  let tableColumn6 = document.createElement("th");
  tableColumn6.innerText = "Read";
  tableHeading.appendChild(tableColumn6);

  table.appendChild(tableHeading);

  let tableBody = document.createElement("tbody");
  let count = myLibrary.length;
  if (count > 0) {
    for (let i = 0; i < count; i++) {
      let tableRow = document.createElement("tr");
      // tableRow.id = myLibrary[i].id;

      let id = document.createElement("td");
      id.innerText = myLibrary[i].id;

      let name = document.createElement("td");
      name.innerText = myLibrary[i].name;

      let author = document.createElement("td");
      author.innerText = myLibrary[i].author;

      let pages = document.createElement("td");
      pages.innerText = myLibrary[i].totalPages;

      let removeAction = document.createElement("td");
      let link = document.createElement("a");
      // link.href = `javascript: deleteItem(${i})`;
      link.href = "#";
      link.addEventListener("click", () => deleteItem(i));
      link.innerText = "Delete";
      removeAction.appendChild(link);

      let readStatus = document.createElement("td");
      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = myLibrary[i].read;

      // Toggle read status when checkbox is clicked
      checkbox.addEventListener("change", () => {
        myLibrary[i].toggleRead();
      });

      readStatus.appendChild(checkbox);

      tableRow.appendChild(id);
      tableRow.appendChild(name);
      tableRow.appendChild(author);
      tableRow.appendChild(pages);
      tableRow.appendChild(removeAction);
      tableRow.appendChild(readStatus);
      tableBody.appendChild(tableRow);
      table.appendChild(tableBody);
    }
  } else {
    let tableRow = document.createElement("tr");
    let notFound = document.createElement("td");
    notFound.colSpan = 5;
    notFound.innerText = "No books available";
    tableRow.appendChild(notFound);
    tableBody.appendChild(tableRow);
    table.appendChild(tableBody);
  }
}
