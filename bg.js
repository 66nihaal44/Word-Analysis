function createContextMenu(){
  chrome.contextMenus.create({
    id: "openWordPanel",
    title: "Analyze Words",
    contexts: ['selection']
  })
  chrome.contextMenus.create({
    id: "openSentPanel",
    title: "Analyze Sentences",
    contexts: ['selection']
  })
}
chrome.runtime.onInstalled.addListener(() => {
    createContextMenu();
    chrome.sidePanel.setOptions({path: 'wordpanel.html'});
});
chrome.contextMenus.onClicked.addListener((info, tab) =>  {
  chrome.storage.session.set({hlText: info.selectionText})
  if(info.menuItemId === "openWordPanel"){
    chrome.sidePanel.setOptions({path: 'wordpanel.html'});
  }
  else if(info.menuItemId === "openSentPanel"){
    chrome.sidePanel.setOptions({path: 'sentpanel.html'});
  }
  chrome.sidePanel.open({tabId: tab.id});
});
