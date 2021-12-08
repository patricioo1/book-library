const inputTitle = document.querySelector('#title');
const inputAuthor = document.querySelector('#author');
const inputPriority = document.querySelector('#priority');
const selectCategory = document.querySelector('#category');
const addButton = document.querySelector('.add-button');
const libraryWrapper = document.querySelector('.book-library');
const errorTitle = document.querySelector('.error-title');
const errorAuthor = document.querySelector('.error-author');
const errorPriority = document.querySelector('.error-priority');
const errorCategory = document.querySelector('.error-category');

let books = [];

const book = {
    title: inputTitle.value,
    author: inputAuthor.value,
    priority: inputPriority.value,
    category: selectCategory.value
}


inputTitle.addEventListener('input', (e) => {
    book.title = e.target.value;
    errorTitle.classList.remove('show');
})

inputAuthor.addEventListener('input', (e) => {
    book.author = e.target.value;
    errorAuthor.classList.remove('show');
})

inputPriority.addEventListener('input', (e) => {
    book.priority = e.target.value;
    errorPriority.classList.remove('show');
})

selectCategory.addEventListener('change', (e) => {
    book.category = e.target.value;
    errorCategory.classList.remove('show');
})

const addToLibrary = () => {
    let libraryBook = document.createElement('div');
    libraryBook.className = 'book-library_books';
    libraryWrapper.appendChild(libraryBook);
    books = JSON.parse(localStorage.getItem('library')) || [];
    books.push(book);
    localStorage.setItem('library', JSON.stringify(books))
    console.log(books);
    Object.keys(book).map(key => {
        libraryBook.innerHTML += `<p>${book[key]}</p>`
    });
}

const dataFromLocalStorage = () => {
    const dataLocalStorage = JSON.parse(localStorage.getItem('library'));
    if (dataLocalStorage.length > 0) {
        dataLocalStorage.map(book => {
            let libraryBook = document.createElement('div');
            libraryBook.className = 'book-library_books';
            libraryWrapper.appendChild(libraryBook);
            Object.keys(book).map(key => {
                libraryBook.innerHTML += `<p>${book[key]}</p>`
            })
        })
    }
}

window.addEventListener('load', dataFromLocalStorage);

const validateForm = () => {
    if (inputTitle.value.length < 1) {
        errorTitle.classList.add('show')
    } else if (inputAuthor.value.length < 3) {
        errorAuthor.classList.add('show')
    } else if (inputPriority.value === '' || inputPriority.value > 5 || inputPriority.value <= 0) {
        errorPriority.classList.add('show')
    } else if (selectCategory.value === 'choose') {
        errorCategory.classList.add('show')
    } else {
        addToLibrary();
        inputTitle.value = '';
        inputAuthor.value = '';
        inputPriority.value = '';
        selectCategory.value = '';
    }
}

const addBook = (e) => {
    e.preventDefault();
    validateForm();
}

addButton.addEventListener('click', addBook);

