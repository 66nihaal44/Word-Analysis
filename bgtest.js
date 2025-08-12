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
