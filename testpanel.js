function showText(text){
  if(text){
    console.log("showText function called.");
    document.querySelector(`text`).innerText = text;
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
