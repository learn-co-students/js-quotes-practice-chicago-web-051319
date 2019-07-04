// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.
document.addEventListener('DOMContentLoaded', () => {
    fetchData();
})

function fetchData(){
  fetch('http://localhost:3000/quotes?_embed=likes')
  .then(resp => resp.json())
  .then(data => renderData(data))
}

function renderData(quotes){
  quotes.forEach(quote => {
    createQuoteCard(quote);
  })
}

 const quoteForm = document.querySelector('#new-quote-form');
 quoteForm.addEventListener('submit', (e) => {
   e.preventDefault();
   const newQuote = document.querySelector('#new-quote').value;
   const author = document.querySelector('#author').value;
   const reqObj = {
     method: 'POST',
     headers: {'Content-Type': 'application/json'},
     body: JSON.stringify({
       quote: newQuote,
       author: author,
       likes: []
     })
   }
   fetch('http://localhost:3000/quotes?_embed=likes', reqObj)
   .then(resp => resp.json())
   .then(result => {createQuoteCard(result)
     document.querySelector('#new-quote').value = "";
     document.querySelector('#author').value = "";
 })
 })

function createQuoteCard(quote){
  const quoteUl = document.querySelector('#quote-list')

  // List
  const quoteLi = document.createElement('li');
  quoteLi.className = 'quote-card';

  // Black Quote
  const blockQuote = document.createElement('blockquote');
  blockQuote.className = 'blockQuote';

  // P tag
  const blockP = document.createElement('p');
  blockP.className = 'mb-0';
  blockP.innerText = quote.quote;
  blockQuote.appendChild(blockP);

  // Footer
  const blockF = document.createElement('footer');
  blockF.className = 'blockquote-footer';
  blockF.innerText = quote.author;
  blockQuote.appendChild(blockF);

  const br = document.createElement('br');
  blockQuote.appendChild(br);

  // Like Button
  const btn = document.createElement('button');
  btn.className = 'btn-success';
  btn.innerText = 'Likes: '
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const date = Date.now();
    const quoId = quote.id;
    const quoteLike = quote.likes;
    const reqObj = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
            quoteId: quoId,
            createdAt: date
      })
    }
    fetch('http://localhost:3000/likes', reqObj)
    .then(resp => resp.json())
    .then(result => {quoteLike.push(result)
      btn.querySelector('span').innerText = quote.likes.length;
    })
  })


  const span = document.createElement('span');
  if (quote.likes == false){
    span.innerText = 0;
  } else{
    span.innerText = quote.likes.length;
  }

  btn.appendChild(span);
  blockQuote.appendChild(btn);

  const delbtn = document.createElement('button');
  delbtn.addEventListener('click', () => {
    const quoteId = quote.id;
    fetch(`http://localhost:3000/quotes/${quoteId}`, {
      method: 'DELETE'
    })
    .then(resp => resp.json())
    .then(result => deleteQuote(result))
  })

  function deleteQuote(result){
    delbtn.parentNode.parentNode.remove();
  }

  delbtn.className = 'btn-danger';
  delbtn.innerText = 'Delete';
  blockQuote.appendChild(delbtn);

  quoteLi.appendChild(blockQuote);
  quoteUl.appendChild(quoteLi);
}
