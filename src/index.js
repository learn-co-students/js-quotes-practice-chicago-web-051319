document.addEventListener('DOMContentLoaded', () => {

  fetch('http://localhost:3000/quotes?_embed=likes')
    .then(resp => resp.json())
    .then(quotes => renderQuotes(quotes))

    const renderQuotes = quotes => {
      const quoteList = document.querySelector('#quote-list');
      quotes.forEach(quote => {
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
        // span.innerText = quote.likes ? quote.likes : 0;
        likeButton.appendChild(span);
        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn-danger';
        deleteButton.innerText = 'Delete';
        blockquote.append(p, footer, br, likeButton, deleteButton);
        quoteList.appendChild(li);
      })
    }

})
