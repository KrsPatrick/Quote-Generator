const quoteContainer = document.getElementById("quote-container")
const quoteText = document.getElementById("quote")
const authorText = document.getElementById("author")
const twitterBtn = document.getElementById("twitter")
const newQuoteBtn = document.getElementById("new-quote")
const loader = document.getElementById("loader")


let apiQuotes = []

// Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true
}

// Hide Loading
function complete () {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show new quote
function newQuote() {
    loading();
    // Pick a random quote
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    // Check if Author field is blank
    if (!quote.author) {
        authorText.textContent = "Unknown"
    } else {
        authorText.textContent = quote.author;
    }
    // Check Quote length
    if (quote.text.length > 100) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }
    // SetQuote, Hide Loader
    quoteText.textContent = quote.text;
    complete()
}


// Get Quotes From API
async function getQuotes(){
    loading();
    try {
        const quotes = await fetch("https://type.fit/api/quotes")
        apiQuotes = await quotes.json()
        newQuote();
    } catch (error) {
        console.log("something is wrong");
    }
    
}



// Tweet Quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", newQuote)
twitterBtn.addEventListener("click", tweetQuote)


// On Load
getQuotes()