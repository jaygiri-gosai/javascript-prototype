class Book {
  constructor(name, totalPages, author, read = false) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.totalPages = Number(totalPages);
    this.author = author;
    this.read = read;
  }

  toggleRead() {
    this.read = !this.read;
  }
}

class Library {
  myLibrary = [];
  dialog = document.querySelector("dialog");
  showButton = document.querySelector("dialog + button");
  closeButton = document.querySelector("dialog button");

  constructor() {
    // "Show the dialog" button opens the dialog modally
    this.showButton.addEventListener("click", () => {
      this.dialog.showModal();
    });

    // "Close" button closes the dialog
    this.closeButton.addEventListener("click", () => {
      this.dialog.close();
    });
  }

  addBookToLibrary(obj) {
    this.myLibrary.push(obj);
  }

  renderBooks() {
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
    let count = this.myLibrary.length;
    if (count > 0) {
      for (let i = 0; i < count; i++) {
        let tableRow = document.createElement("tr");
        // tableRow.id = myLibrary[i].id;

        let id = document.createElement("td");
        id.innerText = this.myLibrary[i].id;

        let name = document.createElement("td");
        name.innerText = this.myLibrary[i].name;

        let author = document.createElement("td");
        author.innerText = this.myLibrary[i].author;

        let pages = document.createElement("td");
        pages.innerText = this.myLibrary[i].totalPages;

        let removeAction = document.createElement("td");
        let link = document.createElement("a");
        // link.href = `javascript: deleteItem(${i})`;
        link.href = "#";
        link.addEventListener("click", () => this.deleteItem(i));
        link.innerText = "Delete";
        removeAction.appendChild(link);

        let readStatus = document.createElement("td");
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = this.myLibrary[i].read;

        // Toggle read status when checkbox is clicked
        checkbox.addEventListener("change", () => {
          this.myLibrary[i].toggleRead();
        });

        readStatus.appendChild(checkbox);

        tableRow.appendChild(id);
        tableRow.appendChild(name);
        tableRow.appendChild(author);
        tableRow.appendChild(pages);
        tableRow.appendChild(removeAction);
        tableRow.appendChild(readStatus);
        tableBody.appendChild(tableRow);
        // table.appendChild(tableBody);
      }
    } else {
      let tableRow = document.createElement("tr");
      let notFound = document.createElement("td");
      notFound.colSpan = 6;
      notFound.innerText = "No books available";
      tableRow.appendChild(notFound);
      tableBody.appendChild(tableRow);
      // table.appendChild(tableBody);
    }
    table.appendChild(tableBody);
  }

  submitForm(e, form) {
    e.preventDefault();

    this.addBookToLibrary(
      new Book(form.name.value, Number(form.pages.value), form.author.value)
    );

    this.dialog.close();
    form.reset();
    this.renderBooks();
    return false;
  }

  deleteItem(index) {
    if (confirm("Are you sure you want to delete this record?") === true) {
      this.myLibrary.splice(index, 1);
      this.renderBooks();
    }
  }
}

let book = new Book("Grow Rich", 123, "A.B.Dhillon");
let libUI = new Library();
libUI.addBookToLibrary(book);
libUI.renderBooks();
