const woCou = document.getElementById("wCount");
function dispWordCount(article){
  if (article){
    const text = article.textContent;
    const countWordEx = /[^\s]+/g;
    const wordIt = text.matchAll(countWordEx);
    const wordArr = [...wordIt];
    const wordCount = wordArr.length;
    woCou.textcontent = wordCount;
    wordArr.sort((a, b) => a.localeCompare(b));
  }
  else{
    console.log("no article");
  }
  return;
}
dispWordCount(document.querySelector("article"));
