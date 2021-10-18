const quoteContainer = document.getElementById("quote-box");
const quoteTextContainer = document.getElementById("quote-text-box");
const authorContainer = document.getElementById("quote-author-box");
const twitterButton = document.getElementById("twitter-button");
const newQuoteButton = document.getElementById("new-quote-button");
const loader = document.getElementById("loader");
let allQuotes = [];

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}
function singleQuote() {
  loading();
  const quote = allQuotes[Math.floor(Math.random() * allQuotes.length)];
  quoteTextContainer.textContent = quote.text;
  if (!quote.author) {
    authorContainer.textContent = "Unknown";
  } else {
    authorContainer.textContent = quote.author;
  }
  complete();
}

async function getQuotes() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    allQuotes = await response.json();
    singleQuote();
  } catch {}
}

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteTextContainer.textContent}  - ${authorContainer.textContent}`;
  window.open(twitterUrl, "_blank");
}

newQuoteButton.addEventListener("click", singleQuote);
twitterButton.addEventListener("click", tweetQuote);

getQuotes();
