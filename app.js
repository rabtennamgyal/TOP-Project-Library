const inputCard = document.querySelector('.inputCard')
const newBookBtn = document.getElementById('newBook')
const submit = document.querySelector('.submit') 
const mainCard = document.getElementById('mainCard')

let input1 = document.getElementById('titleValue')
let input2 = document.getElementById('authorValue')
let input3 = document.getElementById('pagesValue')
let input4 = document.getElementById('Yes')
let input5 = document.getElementById('No')

function displayInputCard() {
    inputCard.style.display = 'grid';
}

let library = localStorage.getItem('Book') ? JSON.parse(localStorage.getItem('Book')) : []


let title, author, pages, read
class book {
    constructor(title, author, pages, read) {
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
    }
}

function createCard(title, author, pages, read) {
    const bookCard = document.createElement('div')
    bookCard.classList.add('divStyle')
    bookCard.innerHTML = `
    <h1>${title}</h1>
    <h1>${author}</h1>
    <h1>${pages}</h1>
    <h1>${read}</h1>
    <div id='btnBox'>
        <button class='check'>✅ Read</button>
        <button class='delete'>❌ Delete</button>
    </div>
    `;
    bookCard.addEventListener('click', function(e) {
        if (e.target.classList.contains('check')) {
            library = JSON.parse(localStorage.getItem('Book'))

            let parentEl = e.target.parentNode.parentNode
            let a = parentEl.childNodes[1].textContent
            let b = parentEl.childNodes[3].textContent
            let c = parentEl.childNodes[5].textContent
            let d = parentEl.childNodes[7].textContent

            for (let i = 0; i < library.length; i++) {
                if (library[i].title === a && library[i].author === b && library[i].pages === c) {
                    let x = library.indexOf(library[i])
                    library[x].read = 'I already read it.'
                    localStorage.setItem('Book', JSON.stringify(library))
                    location.reload()
                }
            }
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
                    library = []
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
        if (input4.checked && input5.checked) {
            alert('Choose one option')
            return
        } else {
            if (input4.checked) {
                read = 'I already read it.'
            } else {
                read = 'Didn\'t read it yet.'
            }
        }

        let newBook = new book(title, author, pages, read)
        library.push(newBook)
        localStorage.setItem('Book', JSON.stringify(library))
        createCard(title, author, pages, read)

        inputCard.style.display = 'none'
        input1.value = ''
        input2.value = ''
        input3.value = ''
    }
}

library.forEach(el => {
    createCard(el.title, el.author, el.pages, el.read)
})

newBookBtn.addEventListener('click', displayInputCard)
submit.addEventListener('click', addBookToLibrary)