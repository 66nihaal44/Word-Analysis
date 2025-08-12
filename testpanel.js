console.log("testpanel.js");
function showText(text){
  console.log("showText function called.");
  if(text){
    const countWordEx = /[^\s]+/g;
    const wordIt = text.matchAll(countWordEx);
    const wordArr = [...wordIt];
    const wordCount = wordArr.length;
    wordArr.sort();
    console.log(wordArr);
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
