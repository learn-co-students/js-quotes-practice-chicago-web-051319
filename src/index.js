// It might be a good idea to add event listener to make sure this file 
// only runs after the DOM has finshed loading. 
document.addEventListener('DOMContentLoaded', ()=> {

    fetchQuotes = () => {
        fetch('http://localhost:3000/quotes?_embed=likes')
        .then(response => response.json())
        .then(data => renderQuotes(data))
    }

    const renderQuotes = (quoteData) => {
        const quoteList = document.querySelector('#quote-list')
        quoteData.forEach((quote) => {
            const quoteLi = document.createElement('li')
            quoteLi.className = 'quote-card'

            const blockQuote = document.createElement('blockquote')
            blockQuote.className = 'blockquote'

            const p = document.createElement('p')
            p.className = 'mb-0'
            p.innerHTML = quote.quote

            const footer = document.createElement('footer')
            footer.className = 'blockquote-footer'
            footer.innerHTML = quote.author

            const br = document.createElement('br')

            const likeBtn = document.createElement('button')
            likeBtn.className = 'btn-success'
            likeBtn.innerHTML = "Like"

            const deleteBtn = document.createElement('button')
            deleteBtn.className = 'btn-danger'
            deleteBtn.innerHTML = "Delete"

            const hr = document.createElement('hr')

            blockQuote.append(p, footer, br, likeBtn, deleteBtn, hr)
            quoteLi.append(blockQuote)
            quoteList.append(quoteLi)
        })
    }
    const form = document.querySelector('#new-quote-form')
    form.addEventListener('submit', (event) => postQuote(event))

    const postQuote = (event) => {
        event.preventDefault()

        const newQuote = document.querySelector('#new-quote').value
        const newAuthor = document.querySelector('#author').value
        const url = 'http://localhost:3000/quotes';
        const reqObj = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                quote: newQuote,
                author: newAuthor
            }) 
        }
        fetch(url, reqObj)
        .then(resp => resp.json)
        .then(quote => fetchQuotes([quote]))
    }
    fetchQuotes()
})