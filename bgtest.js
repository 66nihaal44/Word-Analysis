import './Chart.js';
function createContextMenu(){
  chrome.contextMenus.create({
    id: "openPanel",
    title: "Analyze",
    contexts: ['selection']
  })
}
chrome.runtime.onInstalled.addListener(() => {
    createContextMenu();
});
chrome.contextMenus.onClicked.addListener((data, tab) =>  {
  chrome.storage.session.set({hlText: data.selectionText})
  chrome.sidePanel.open({tabId: tab.id});
});
function showText(text){
  console.log("showText function called.");
  if(text){
    const countWordEx = /[^\s]+/g;
    const wordIt = text.matchAll(countWordEx);
    const wordArr = [...wordIt];
    const wordCount = wordArr.length;
    const frq = [], dispWords = [], dispFrq = [];
    wordArr.sort();
    for(var i = 0, j = 0; i < wordCount; ++i, ++j){
      frq[j] = [wordArr[i][0], 1];
      while(i < wordCount - 1 && wordArr[i + 1][0] === wordArr[i][0]){
        ++i;
        ++frq[j][1];
      }
    }
    frq.sort(function(a, b){return b[1]-a[1]});
    console.log(frq);
    for(var i = 0; i < 25 && i < frq.length; ++i){
      dispWords[i] = frq[i][0];
      dispFrq[i] = frq[i][1];
    }
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
