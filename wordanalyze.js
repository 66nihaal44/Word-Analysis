const article = document.querySelector("article");
const text = article.textContent;
const woCou = document.getElementById("wCount");
if(article){
  const countWordEx = /[^\s]+/g;
  const wordIt = text.matchAll(countWordEx);
  const wordArr = [...wordIt];
  const wordCount = wordArr.length;
  woCou.textcontent = wordCount;
  wordArr.sort((a, b) => a.localeCompare(b));
}
