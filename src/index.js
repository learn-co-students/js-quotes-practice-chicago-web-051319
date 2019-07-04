// It might be a good idea to add event listener to make sure this file 
// only runs after the DOM has finshed loading. 
function fetchQuotes(){
    fetch('http://localhost:3000/quotes?_embed=likes').then(response=>response.json()).then(data=> renderQuotes(data));
};

function renderQuotes(data){
    data.forEach(index=>{renderSingleQuote(index)})
}

function renderSingleQuote(index){
    const quoteCard = document.createElement('li');
    quoteCard.className = 'quote-card';
    quoteCard.dataset.id = index.id;
    
    const blockquote = document.createElement('blockquote');
    blockquote.className = 'blockquote';
    
    const quoteContent = document.createElement('p');
    quoteContent.className = 'mb-0';
    quoteContent.textContent = index.quote;
    
    const quoteFooter = document.createElement('footer');
    quoteFooter.className = 'blockquote-footer';
    quoteFooter.textContent = index.author;

    const lineBreak = document.createElement('br');

    const likeBtn = document.createElement('button');
    likeBtn.className = 'btn-success';
    likeBtn.textContent = 'Likes: ';
    likeBtn.dataset.id = index.id;
    const likesNum = document.createElement('span');
    likesNum.textContent = index.likes.length;
    likeBtn.appendChild(likesNum);

    const delBtn = document.createElement('button');
    delBtn.className = 'btn-danger';
    delBtn.textContent = 'Delete';
    delBtn.dataset.id = index.id;

    quoteCard.append(blockquote, quoteContent, quoteFooter, lineBreak, likeBtn, delBtn)

    const quoteList = document.querySelector('#quote-list')
    quoteList.appendChild(quoteCard);
};

function handleQuoteSubmit(event){
    event.preventDefault();
    const newQuote = grabFormData();
    postNewQuote(newQuote)
};

function grabFormData(){
    const quoteInput = document.querySelector('#new-quote');
    const authorInput = document.querySelector('#author');
    const quote = quoteInput.value;
    const author = authorInput.value;
    const likes = [];
    quoteInput.value = '';
    authorInput.value = '';
    return {quote, author, likes}
};

function postNewQuote(newQuote){
    let reqObj = {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            'Accept':'application/json'
        },
        body: JSON.stringify(newQuote)
    }

    fetch('http://localhost:3000/quotes', reqObj).then(response => response.json()).then(data=> renderSingleQuote(data));
}

function handleAddLikes(event){
    let numLikes = parseInt(event.target.firstElementChild.textContent);
    numLikes ++;

    let quoteIdNum = parseInt(event.target.dataset.id)

    let addObj = {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            'Accept':'application/json'
        },
        body: JSON.stringify({quoteId: quoteIdNum})
    }

    fetch('http://localhost:3000/likes', addObj).then(response=>response.json()).then(data => {event.target.firstElementChild.textContent = numLikes})
}

function handleDeleteQuote(event){
    let delQuoteId = event.target.dataset.id;

    fetch(`http://localhost:3000/quotes/${delQuoteId}`, {method: 'DELETE'}).then(response=> response.json()).then(event.target.parentNode.remove())
}

document.addEventListener('DOMContentLoaded', ()=>{
    fetchQuotes();

    document.querySelector('#new-quote-form').addEventListener('submit', (event) => {
        handleQuoteSubmit(event);
    })

    document.querySelector('#quote-list').addEventListener('click', (event)=> {
        if (event.target.className === "btn-success"){
            handleAddLikes(event);
        } else if (event.target.className === "btn-danger"){
            handleDeleteQuote(event);
        }
    })


})