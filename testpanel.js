console.log("testpanel.js");
function showText(text){
  if(text){
    const countWordEx = /[^\s]+/g;
    const wordIt = text.matchAll(countWordEx);
    const wordArr = [...wordIt];
    const wordCount = wordArr.length;
    wordArr.sort((a, b) => a.localeCompare(b));
    console.log("showText function called.");
    document.querySelector(`text`).innerText = wordCount;
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
