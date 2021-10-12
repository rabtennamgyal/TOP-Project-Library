const inputCard = document.querySelector('.inputCard')
const newBookBtn = document.getElementById('newBook')
const submit = document.querySelector('.submit') 
const mainCard = document.getElementById('mainCard')

let input1 = document.getElementById('titleValue')
let input2 = document.getElementById('authorValue')
let input3 = document.getElementById('pagesValue')


function displayInputCard() {
    inputCard.style.display = 'grid';
}

let library = localStorage.getItem('Book') ? JSON.parse(localStorage.getItem('Book')) : []

function book(title, author, pages) {
    this.title = title
    this.author = author
    this.pages = pages
}

let title, author, pages


function createCard(title, author, pages) {
    const bookCard = document.createElement('div')
    bookCard.classList.add('divStyle')
    bookCard.innerHTML = `
    <h1><span>Title: </span>${title}</h1>
    <h1><span>Author: </span>${author}</h1>
    <h1><span>Pages: </span>${pages}
    <div id='btnBox'>
        <button class='check'>✅ Read</button>
        <button class='delete'>❌ Delete</button>
    </div>
    `;
    bookCard.addEventListener('click', function(e) {
        if (e.target.classList.contains('check')) {
            bookCard.style.background = '#1cf31c'
        }
        if (e.target.classList.contains('delete')) {
            for (let i = 0; i < library.length; i++) {
                if (library.length !== 1) {
                    library = library.splice(e.target, 1)
                    localStorage.setItem('Book', JSON.stringify(library))
                    console.log(library)
                } else {
                    localStorage.clear()
                    console.log(library)
                    console.log(localStorage)
                }
            }

            bookCard.parentNode.removeChild(bookCard)
        }
    })
    mainCard.appendChild(bookCard)
}


function addBookToLibrary(e) {
    if (input1.value === '' || input2.value === '' || input3.value === '') {
        return
    } else {
        e.preventDefault()
        title = document.getElementById('titleValue').value
        author = document.getElementById('authorValue').value
        pages = document.getElementById('pagesValue').value


        let newBook = new book(title, author, pages)
        library.push(newBook)
        localStorage.setItem('Book', JSON.stringify(library))
        createCard(title, author, pages)

        inputCard.style.display = 'none'
        input1.value = ''
        input2.value = ''
        input3.value = ''

        console.log(localStorage)
        console.log(library)
    }
}

library.forEach(el => {
    createCard(el.title, el.author, el.pages)
})

newBookBtn.addEventListener('click', displayInputCard)
submit.addEventListener('click', addBookToLibrary)

