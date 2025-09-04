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
chrome.contextMenus.onClicked.addListener((item, data, tab) =>  {
  chrome.storage.session.set({hlText: data.selectionText})
  if(item.MenuItemId === "openWordPanel"){
    chrome.sidePanel.setOptions({'testPanel.html'});
  }
  else if(item.MenuItemId === "openSentPanel"){
    chrome.sidePanel.setOptions({'sentPanel.html'});
  }
  chrome.sidePanel.open({tabId: tab.id});
});
