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
function getNewlines(){
  const slc = window.getSelection();
  if(!slc || slc.rangeCount === 0) return "";
  const range = slc.getRangeAt(0);
  const fragment = range.cloneContents();
  const walker = document.createTreeWalker(fragment, NodeFilter.SHOW_ELEMENT | NodeFiler.SHOW_TEXT);
  let node, output = "";
  const blockTags = new SET(["DIV", "BR", "P", "LI", "SECTION", "ARTICLE", "H1", "H2", "H3", "H4", "H5", "H6"]);
  while((node = walker.nextNode())){
    if(node.nodeType === Node.TEXT_NODE){
      output += node.nodeValue;
    } else if(node.nodeType === Node.ELEMENT_NODE && blockTags.has(node.nodeName)) {
      output += "\n";
    }
  }
  return output;
}
