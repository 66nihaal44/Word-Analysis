console.log("smplscrp.js")
const tabs = await chrome.tabs.query({
  url: [
    "https://developer.chrome.com/docs/extensions/*",
    ]
});
