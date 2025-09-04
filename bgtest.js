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
});
chrome.contextMenus.onClicked.addListener((info, tab) =>  {
  chrome.storage.session.set({hlText: info.selectionText})
  if(info.MenuItemId === "openWordPanel"){
    chrome.sidePanel.setOptions({path: 'testPanel.html'});
  }
  else if(info.MenuItemId === "openSentPanel"){
    chrome.sidePanel.setOptions({path: 'sentPanel.html'});
  }
  chrome.sidePanel.open({tabId: tab.id});
});
