const myLibrary= [];

function Book(title, author,year,read){
    this.id=crypto.randomUUID();
    this.title=title;
    this.author=author;
    this.year=year;
    this.read=read;
    this.info = function (){
        return `${this.title} ${this.author} ${this.year}`
    }
}

function addBookToLibrary(title, author, year,read){
    const book = new Book(title, author, year,read)
    myLibrary.push(book);
    displayLibrary();
    // return book;
}

Book.prototype.toggleRead = function (){
    this.read=!this.read;
}

function displayLibrary (){
    const libraryDiv = document.querySelector("#library");
    libraryDiv.innerHTML = "";
    myLibrary.forEach(book => {
        const card = document.createElement("div");
        card.classList.add("book-card");
        card.setAttribute("data-id",book.id);
        // const card = document.querySelector(".card");
        // card.classList.add("book-card"); cai nay khong hoat dong vi chi co 1 div ben html phai tao them moi duoc
        card.innerHTML = `
        <h3>Ten sach: ${book.title}</h3>
        <p>Tac gia: ${book.author}</p>
        <p>Nam: ${book.year}</p>
        <p>Trang thai: ${book.read ? "Da doc": "Chua doc"} </p>
        <button class="remove-btn">Remove</button>
        <button class="toggle-btn">Toggle Read</button>
        `;
        const removeBtn = card.querySelector(".remove-btn");
        removeBtn.addEventListener("click",()=>{
            removeBook(book.id);
        });

        const toggleBtn = card.querySelector(".toggle-btn");
        toggleBtn.addEventListener("click",()=>{
            book.toggleRead();
            displayLibrary();
        });
        libraryDiv.appendChild(card);
    })
}

function removeBook(id){
    const index = myLibrary.findIndex(book =>book.id ===id);
    if(index !== -1){
        myLibrary.splice(index,1);
        displayLibrary();
    }
}
const dialog = document.querySelector("#bookDialog");
document.querySelector("#newBookBtn").addEventListener("click",()=>{
    dialog.showModal();
})

document.querySelector("#closeDialog").addEventListener("click",()=>{
    dialog.close();
})

document.querySelector("#bookForm").addEventListener("submit",(event)=>{
    event.preventDefault();
    const form = event.target;
    const title = form.title.value;
    const author = form.author.value;
    const year = form.year.value;
    const read= form.read.checked;
    addBookToLibrary(title,author,year,read);
    dialog.close();
    form.reset();
})
// const hobbit = addBookToLibrary("hobbit","tolkien",1937);
// const dragonball = addBookToLibrary("dragonball","akira toriyama",1984)