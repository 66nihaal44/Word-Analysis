const woCou = document.getElementById("wCount");
function dispWordCount(article){
  if (!article){
    console.log("no article");
    return;
  }
  const text = article.textContent;
  const countWordEx = /[^\s]+/g;
  const wordIt = text.matchAll(countWordEx);
  const wordArr = [...wordIt];
  const wordCount = wordArr.length;
  woCou.textcontent = wordCount;
  wordArr.sort((a, b) => a.localeCompare(b));
}
dispWordCount(document.querySelector("article"));
