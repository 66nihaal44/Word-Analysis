var sentIte;
var sentArr;
const sentList = document.getElementById("sentList");
function calcSent(text){
  while(sentList.firstChild){
      sentList.removeChild(sentList.firstChild);
    }
  sentIte = text.matchAll(/[^.\n]+/g);
  sentArr = [...sentIte];
  for(var i = 0; i < sentArr.length; ++i){
    const wordSentIte = sentArr[i][0].matchAll(/[^\s.,\/#!$%\^&\*;:{}=\-_`~()]+/g);
    const wordSentArr = [...wordSentIte];
    sentArr[i] = wordSentArr.length;
  }
  sentArr.sort(function(a, b){return b - a});
  console.log(sentArr);
  const disArr = [];
  for(var i = 0; i < 10 && i < sentArr.length; ++i){
    disArr[i] = sentArr[i];
  }
  var sum = 0;
  for(var i = 0; i < disArr.length; ++i){
    sum += disArr[i];
    const newSent = document.createElement('li');
    newSent.innerText = i + 1 + ": " + disArr[i] + " word" + disArr[i] > 1 ? "s" : "";
    sentList.appendChild(newSent);
    }
  if(disArr.length > 1){
    const newSent = document.createElement('li');
    newSent.innerText = "Average word count: " + sum / disArr.length + " words";
    sentList.appendChild(newSent);
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
