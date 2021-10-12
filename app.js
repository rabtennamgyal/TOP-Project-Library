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
    <h1 classList='content'>${title}</h1>
    <h1 classList='content'>${author}</h1>
    <h1 classList='content'>${pages}</h1>
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
            library = JSON.parse(localStorage.getItem('Book'))
                if (library.length !== 1) {
                    let parentEl = e.target.parentNode.parentNode
                    let a = parentEl.childNodes[1].textContent
                    let b = parentEl.childNodes[3].textContent
                    let c = parentEl.childNodes[5].textContent

                    for (let i = 0; i < library.length; i++) {
                        if (library[i].title === a && library[i].author === b && library[i].pages === c) {
                            let x = library.indexOf(library[i])
                            let newArr = library.splice(x, 1)
                            localStorage.setItem('Book', JSON.stringify(library))
                        }
                    }
                } else {
                    localStorage.clear()
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
    }
}

library.forEach(el => {
    createCard(el.title, el.author, el.pages)
})

newBookBtn.addEventListener('click', displayInputCard)
submit.addEventListener('click', addBookToLibrary)