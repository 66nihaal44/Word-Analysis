const article = document.querySelector("article");
if(article){
  const text = article.textContent;
  const countWordEx = /[^\s]+/g;
  const wordBD = text.matchAll(countWordEx);
  const wordCount = [...wordBD].length;
}
