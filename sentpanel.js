var sentIte;
var sentArr;
function calcSent(text){
  sentIte = text.matchAll(/[^.]+/g);
  sentArr = [...sentIte];
  for(var i = 0; i < sentArr.length; ++i){
    const wordSentIte = sentArr[i][0].matchAll(/[^\s.,\/#!$%\^&\*;:{}=\-_`~()]+/g);
    const wordSentArr = [...wordSentIte];
    sentArr[i] = wordSentArr.count;
  }
  sentArr.sort(function(a, b){return b - a});
  console.log(sentArr);
  const disArr = [];
  for(var i = 0; i < 10; ++i){
    disArr[i] = sentArr[i];
  }
  for(var i = 0; i < disArr.length; ++i){
    newSent = document.createElement('li');
    newSent.innerText = i + ". " + disArr[i];
    getElementById('sentList').appendChild(newSent);
    }
}
chrome.storage.session.get('hlText', ({hlText}) => {
  calcSent(hlText);
});
chrome.storage.session.onChanged.addListener((changes) => {
  if(changes['hlText']){
    calcSent(changes['hlText'].newValue);
  }
})
