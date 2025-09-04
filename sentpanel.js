var sentIte;
var sentArr;
function calcSent(text){
  sentIte = text.matchAll(/[.]+/g);
  sentArr = [...sentIte];
  for(var i = 0; i < sentArr.length; ++i){
    const wordSentIte = sentArr[i].matchAll(/[^\s.,\/#!$%\^&\*;:{}=\-_`~()]+/g);
    const wordSentArr = [...wordSentIte];
    sentArr[i] = wordSentArr.count;
  }
  sentArr.sort(function(a, b){return b - a});
  console.log(sentArr);
}
chrome.storage.session.get('hlText', ({hlText}) => {
  calcSent(hlText);
});
chrome.storage.session.onChanged.addListener((changes) => {
  if(changes['hlText']){
    calcSent(changes['hlText'].newValue);
  }
})
