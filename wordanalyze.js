//const woCou = document.getElementById("wCount");
function dispWordCount(article){
  if (article){
    const text = article.textContent;
    const countWordEx = /[^\s]+/g;
    const wordIt = text.matchAll(countWordEx);
    const wordArr = [...wordIt];
    const wordCount = wordArr.length;
    //woCou.textcontent = wordCount;
    //wordArr.sort((a, b) => a.localeCompare(b));
    const badge = document.createElement("p");
    badge.classList.add("color-secondary-text", "type--caption");
    badge.textContent = `Word Count: ${wordCount)`;
    const heading = article.querySelector("h1");
    const date = article.querySelector("time")?.parentNode;
    (date ?? heading).insertAdjacentElement("afterend", badge);
    // displays wordcount in article
  }
  else{
    console.log("no article");
  }
  return;
}
dispWordCount(document.querySelector("article"));
