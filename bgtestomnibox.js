console.log("bgtestomnibox.js");
chrome.runtime.onInstalled.addListener(({reason}) => {
  if(reason === 'install'){
    chome.storage.local.set({
      apiSuggestions: ['tabs', 'storage', 'scripting']
    });
  }
});
