import './bgtestomnibox.js';
import './bgtesttips.js';
chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});
const extensions = 'https://developer.chrome.com/docs/extensions';
chrome.action.onClicked.addListener(async (tab) => {
  if(tab.url.startsWith(extensions)){
    const prev = await chrome.action.getBadgeText({ tabId: tab.id });
    const next = prev === 'ON' ? 'OFF' : 'ON';
    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: next,
    });
    if (next === 'ON'){
      await chrome.scripting.executeScript({
        files: [wordanalyze.js],
        target: { tabId: tab.id },
      });
    }
  }
});
