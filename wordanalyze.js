//const woCou = document.getElementById("wCount");
function dispWordCount(article){
  if (article){
    const text = article.textContent;
    const countWordEx = /[^\s]+/g;
    const wordIt = text.matchAll(countWordEx);
    const wordArr = [...wordIt];
    const wordCount = wordArr.length;
    //woCou.textcontent = wordCount;
    //wordArr.sort((a, b) => a.localeCompare(b));
    const badge = document.createElement("p");
    badge.classList.add("color-secondary-text", "type--caption");
    badge.textContent = `Word Count: ${wordCount}`;
    const heading = article.querySelector("h1");
    const date = article.querySelector("time")?.parentNode;
    (date ?? heading).insertAdjacentElement("afterend", badge);
    // displays wordcount in article
  }
  else{
    console.log("no article");
  }
  return;
}
dispWordCount(document.querySelector("article"));
(async () => {
  const {tip} = await chrome.runtime.sendMessage({greeting: 'tip'});
  const nav = document.querySelector('.upper-tabs > nav');
  const tipWidget = createDomElement(`
    <button type="button" popovertarget="tip-popover" popovertargetaction="show" style="padding: 0 12px; height: 36px;">
      <span style="display: block; font: var(--devsite-link-font,500 14px/20px var(--devsite-primary-font-family));">Tip</span>
    </button>
  `);
  const popover = createDomElement(
      `<div id='tip-popover' popover style="margin: auto;">${tip}</div>`
  );
  document.body.append(popover);
  nav.append(tipWidget);
})();
function createDomElement(html){
  const dom = new DOMParser().parseFromString(html, 'text/html');
  return dom.body.firstElementChild;
}
