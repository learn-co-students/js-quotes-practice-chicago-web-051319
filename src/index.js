document.addEventListener('DOMContentLoaded', () => {

  fetch('http://localhost:3000/quotes?_embed=likes')
    .then(resp => resp.json())
    .then(quotes => {
      quotes.forEach(quote => renderQuote(quote))
    })

    const renderQuote = quote => {
      const quoteList = document.querySelector('#quote-list');
      const li = document.createElement('li');
      li.className = 'quote-card';
      const blockquote = document.createElement('blockquote');
      li.appendChild(blockquote);
      blockquote.className = 'blockquote';
      const p = document.createElement('p');
      p.className = 'mb-0';
      p.innerText = quote.quote;
      const footer = document.createElement('footer');
      footer.className = 'blockquote-footer';
      footer.innerText = quote.author;
      const br = document.createElement('br');
      const likeButton = document.createElement('button');
      likeButton.className = 'btn-success';
      likeButton.innerText = 'Likes: ';
      const span = document.createElement('span');
      span.innerText = quote.likes.length;
      let likeCount = parseInt(span.innerText);
      likeButton.appendChild(span);
      const deleteButton = document.createElement('button');
      deleteButton.className = 'btn-danger';
      deleteButton.innerText = 'Delete';
      blockquote.append(p, footer, br, likeButton, deleteButton);
      quoteList.appendChild(li);


      deleteButton.addEventListener('click', event => {
        event.preventDefault();
        fetch(`http://localhost:3000/quotes/${quote.id}`, {method: 'DELETE'})
        .then(li.remove())
      })

      likeButton.addEventListener('click', event => {
        event.preventDefault();
        fetch('http://localhost:3000/likes', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            quoteId: quote.id,
            createdAt: Date.now()
          })
        })
          .then(resp => resp.json())
          .then(likeButton.querySelector('span').innerText = ++likeCount)
      })
    }

      const newQuote = document.querySelector('#new-quote');
      const newQuoteAuthor = document.querySelector('#author');
      const submitButton = document.querySelector('.btn.btn-primary');

      submitButton.addEventListener('click', event => {
        event.preventDefault();
        fetch('http://localhost:3000/quotes?_embed=likes', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            quote: newQuote.value,
            author: newQuoteAuthor.value,
            // likes: likeCount.innerText
          })
        })
        .then(resp => resp.json())
        .then(quote => {
          renderQuote(quote)
          newQuote.value = '';
          newQuoteAuthor.value = '';
        })
      })
})
