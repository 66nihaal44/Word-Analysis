console.log("bgtestomnibox.js");
chrome.runtime.onInstalled.addListener(({reason}) => {
  if(reason === 'install'){
    chrome.storage.local.set({
      apiSuggestions: ['tabs', 'storage', 'scripting']
    });
  }
});
chrome.omnibox.onInputChanged.addListener(async (input, suggest) => {
  await chrome.omnibox.setDefaultSuggestion({
    description: 'Enter a Chrome API or choose from past searches'
  });
  const {apiSuggestions} = await chrome.storage.local.get('apiSuggestions');
  const suggestions = apiSuggestions.map((api) => {
    return { content: api, description: 'Open chrome.${api} API' };
  });
  suggest(suggestions);
});
chrome.omnibox.onInputEntered.addListener((input) => {
  chrome.tabs.create({ url: 'https://developer.chrome.com/docs/extensions/reference/' + input});
  updateHistory(input);
});
async function updateHistory(input){
  const {apiSuggestions} = await chrome.storage.local.get('apiSuggestions');
  apiSuggestions.unshift(input);
  apiSuggestions.splice(4);
  return chrome.storage.local.set({apiSuggestions});
}
