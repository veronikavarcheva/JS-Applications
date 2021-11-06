//For Selecting HTML Elements for DOM (Document Object Model)
const htmlSelectors = {
    'loadBooks': ()=> document.getElementById('loadBooks'),
    'createBtn': ()=> document.querySelector('#create-form > button'),
    'createTitleInput': ()=> document.getElementById('title'),
    'createAuthorInput': ()=> document.getElementById('author'),
    'createIsbnInput': ()=> document.getElementById('isbn'),
    'booksContainer': () => document.querySelector('table > tbody'),
    'errorContainer': () => document.getElementById('error-notification'),
    'editForm': () => document.getElementById('edit-form'),
    'editBtn': () => document.querySelector('#edit-form > button'),
    'editTitleInput': () => document.getElementById('edit-title'),
    'editAuthorInput': () => document.getElementById('edit-author'),
    'editIsbnInput': () => document.getElementById('edit-isbn'),    
}

// console.log(htmlSelectors['loadBooks']());

htmlSelectors['loadBooks']().addEventListener('click', fetchAllBooks);

function fetchAllBooks() {
    fetch(`https://books-56012.firebaseio.com/Books/.json`)
    .then((res)=> res.json())
    .then(renderBooks)
    .catch(handleError);
}

htmlSelectors['createBtn']().addEventListener('click', createBook);

function createBook(e) {
    e.preventDefault();  //to prevent reloading the page when creating a new book by click on Submit button, couse workinf with a form
    const titleInput = htmlSelectors['createTitleInput']();
    const authorInput = htmlSelectors['createAuthorInput']();
    const isbnInput = htmlSelectors['createIsbnInput']();

    if(titleInput.value !=='' && authorInput.value !=='' && isbnInput.value !== ''){
        const obj = {
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({title: titleInput.value, author: authorInput.value, isbn: isbnInput.value}),
        }

        fetch(`https://books-56012.firebaseio.com/Books/.json`, obj)
        .then(fetchAllBooks)
        .catch(handleError);

        titleInput.value = '';
        authorInput.value = '';
        isbnInput.value = '';
    } else {
         const error = { message: ''};

         if(titleInput.value === ''){
             error.message += 'Title input must not be empty!';
         } 

         if(authorInput.value === ''){
            error.message += 'Author input must not be empty!';
        }

        if(isbnInput.value === ''){
            error.message += 'Isbn input must not be empty!';
        }

        handleError(error);
    }
} 

function loadBookById() {
    let id = this.getAttribute('data-key');
    // console.log(id);
    fetch(`https://books-56012.firebaseio.com/Books/${id}.json`)
    .then(res=> res.json())
    .then(({title, author, isbn})=> {
        htmlSelectors['editTitleInput']().value = title;
        htmlSelectors['editAuthorInput']().value = author;
        htmlSelectors['editIsbnInput']().value = isbn;
        htmlSelectors['editForm']().style.display = 'block';
        htmlSelectors['editBtn']().setAttribute('data-key', id);
    })
    .catch(handleError);
}

htmlSelectors['editBtn']().addEventListener('click', editBook);

function editBook(e){
    e.preventDefault();
    const titleInput = htmlSelectors['editTitleInput']();
    const authorInput = htmlSelectors['editAuthorInput']();
    const isbnInput = htmlSelectors['editIsbnInput']();
    if(titleInput.value !=='' && authorInput.value !=='' && isbnInput.value !== ''){
        const id = this.getAttribute('data-key');
        const obj = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json'}, 
        body: JSON.stringify({title: titleInput.value, author: authorInput.value, isbn: isbnInput.value}),
        }
        htmlSelectors['editForm']().style.display = 'none';   
        fetch(`https://books-56012.firebaseio.com/Books/${id}/.json`, obj)
        .then(fetchAllBooks)
        .catch(handleError);
    } else {
         const error = { message: ''};

         if(titleInput.value === ''){
             error.message += 'Title input must not be empty!';
         } 

         if(authorInput.value === ''){
            error.message += 'Author input must not be empty!';
        }

        if(isbnInput.value === ''){
            error.message += 'Isbn input must not be empty!';
        }

        handleError(error);
    }
    
}

function deleteBook() {
    const id = this.getAttribute('data-key');

    const obj = {
        method: 'DELETE',
    };

    fetch(`https://books-56012.firebaseio.com/Books/${id}/.json`, obj)
    .then(fetchAllBooks)
    .catch(handleError);

}

function renderBooks(booksData){
    const booksContainer = htmlSelectors['booksContainer']();

    if(booksContainer.innerHTML != ''){
        booksContainer.innerHTML = ''
    }

    Object.keys(booksData).forEach((bookId)=>{
        const {title, author, isbn} = booksData[bookId]; 
        const tableRow = createDOMElement('tr', '', {}, {},
            createDOMElement('td', title, {}, {}),
            createDOMElement('td', author, {}, {}),
            createDOMElement('td', isbn, {}, {}),
            createDOMElement('td', '', {}, {}, 
                createDOMElement('button', 'Edit', { 'data-key': bookId}, {click: loadBookById}),
                createDOMElement('button', 'Delete', {'data-key': bookId}, {click: deleteBook})
            ) 
        );
        booksContainer.appendChild(tableRow);
    });
}
function handleError(err){
   
    const errorContainer = htmlSelectors['errorContainer']();
    errorContainer.style.display = 'block';
    errorContainer.textContent = `${err.message}`;
    setTimeout(()=> {           
        errorContainer.style.display = 'none';   // err.message will be hidden after 2 seconds
    }, 2000);
}

//Function for creating DOM Element
function createDOMElement(type, text, attributes, events, ...children){
    const domElement = document.createElement(type); // create DOM Element of type (tag Name)

    if(text !== ''){
        domElement.textContent = text;  // DOM Element text content
    }

    Object.entries(attributes)               // for creating DOM Element attributes
        .forEach(([attrKey, attrValue]) =>{
            domElement.setAttribute(attrKey, attrValue);
        });

    Object.entries(events)               // for creating DOM Element events
        .forEach(([eventName, eventHandler]) => {
            domElement.addEventListener(eventName, eventHandler)
        });

        domElement.append(...children);
    // children.forEach((child)=>{           // for appending children of DOM Element - using rest operator (...children), cause we don't know how many children will be necessary to append
    //     domElement.appendChild(child);
    // });

    return domElement;
}

