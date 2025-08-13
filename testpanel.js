console.log("testpanel.js");
function showText(text){
  console.log("showText function called.");
  if(text){
    const countWordEx = /[^\s]+/g;
    const wordIt = text.matchAll(countWordEx);
    const wordArr = [...wordIt];
    const wordCount = wordArr.length;
    const frq = [];
    wordArr.sort();
    for(var i = 0, j = 0; i < wordCount; ++i, ++j){
      frq[j] = [wordArr[i][0], 1];
      while(i < wordCount - 1 && wordArr[i + 1][0] === wordArr[i][0]){
        ++i;
        ++frq[j][1];
      }
    }
    console.log(frq);
    document.querySelector(`#text`).innerText = wordCount;
  }
}
chrome.storage.session.get('hlText', ({hlText}) => {
  showText(hlText);
});
chrome.storage.session.onChanged.addListener((changes) => {
  if(changes['hlText']){
    showText(changes['hlText'].newValue);
  }
})
