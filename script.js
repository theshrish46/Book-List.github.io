// Book Class

class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UserInterface Class

class UserInterface {



    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        setTimeout(() => {
            document.querySelector('.alert').remove()
        }, 900);
    }


    static DisplayBooks() {
        const books = Store.getBook();
        books.forEach((book) => UserInterface.addBoolList(book))
    }

    static addBookList(book) {
        const list = document.getElementById('book-list')
        const row = document.createElement('tr')

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `

        list.appendChild(row)
    }

    static removeBook(el) {
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove()
        }
    }

    static removeList() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

}


// Storage Class

class Store {
    static getBook() {
        let books;
        if(localStorage.getItem('books') === null){
            books = []
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book) {
        const books = Store.books;
        books.push(book)
        localStorage.setItem('books', JSON.stringify(books))
    }

    static removeBook(isbn) {
        const books = Store.getBook;
        books.forEach(function(book, index) {
            if(book.isbn === isbn) {
                book.slice(index, 1)
            }
        })

        localStorage.setItem('books', JSON.stringify(books))

    }
}



// Event : Display Books
document.addEventListener('DOMContentLoaded', UserInterface.DisplayBooks)


// Event : Add a Book

document.querySelector('#book-form').addEventListener('submit', (e) => {
    e.preventDefault()
    // Get form values
    const title = document.querySelector('#title').value
    const author = document.querySelector('#author').value
    const isbn = document.querySelector('#isbn').value
    
    // Validate
    
    if(title === '' || author === '' || isbn === '') {
        UserInterface.showAlert('Enter valid values', 'danger')
    }
    else {
        // Instantiate book
        const book = new Book(title, author, isbn)
        UserInterface.addBookList(book)
        // Store.addBook(book)
        
        
        UserInterface.showAlert('Successfully Added', 'success')
        
        
        UserInterface.removeList()
    }
})


// Event : Remove Books

document.querySelector('#book-list').addEventListener('click', (e) => {
    UserInterface.removeBook(e.target)
    Store.removeBook(isbn)

    UserInterface.showAlert('Book Removed', 'info')
})
