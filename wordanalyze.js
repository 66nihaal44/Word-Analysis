const article = document.querySelector("article");
if(article){
  const woCou = getElementById("wCount");
  const text = article.textContent;
  const countWordEx = /[^\s]+/g;
  const wordIt = text.matchAll(countWordEx);
  const wordArr = [...wordIt];
  const wordCount = wordArr.length;
  woCou.textcontent = wordCount;
  wordArr.sort((a, b) => a.localeCompare(b));
}
