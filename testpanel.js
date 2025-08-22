const frq = [];
const colorArr = [];
const colorPos = ["red", "blue", "green", "yellow"];
var wordArr;
var numWord = document.getElementById("wordNum").value;
var excluFu = document.getElementById("excFunc").checked;
const functionWords = ["the", "a", "and", "of", "is"];
const cincc = new Intl.Collator('en');
document.getElementById("excFunc").style.display = "none";
document.getElementById("excFuncL").style.display = "none";
document.getElementById("wordNum").style.display = "none";
document.getElementById("frqChart").style.display = "none";
console.log("testpanel.js");
//const frqList = document.querySelector(`#frqList`);
function calcFrq(text){
  console.log("calcFrq function called.");
  if(text){
    /*while(frqList.firstChild){
      frqList.removeChild(frqList.firstChild);
    }*/
    wordIte = text.matchAll(/[^\s.,\/#!$%\^&\*;:{}=\-_`~()]+/g);
    wordArr = [...wordIte];
    wordArr.sort(cincc.compare);
    getFrq();
    showFrq();
  }
}
function getFrq(){
  document.getElementById("para1").style.display = "none";
  document.getElementById("para2").style.display = "none";
  document.getElementById("excFunc").style.display = "inline";
  document.getElementById("excFuncL").style.display = "inline";
  document.getElementById("wordNum").style.display = "inline";
  document.getElementById("frqChart").style.display = "inline";
  frq.length = 0;
  for(var i = 0, j = 0; i < wordArr.length; ++i, ++j){
      while(excluFu && functionWords.indexOf(wordArr[i][0].toLowerCase()) > -1){
        ++i;
      }
      frq[j] = [wordArr[i][0].toLowerCase(), 1];
      while(i < wordArr.length - 1 && wordArr[i + 1][0].toLowerCase() === wordArr[i][0].toLowerCase()){
        ++i;
        ++frq[j][1];
      }
  }
  frq.sort(function(a, b){return b[1]-a[1]});
  console.log(frq);
}
function showFrq(){
  const dispWords = [], dispFrq = [];
  for(var i = 0; i < numWord && i < frq.length; ++i){
      dispWords[i] = frq[i][0];
      dispFrq[i] = frq[i][1];
  }
  colorArr.length = 0;
  for(var i = 0; i < frq.length; ++i){
    colorArr[i] = colorPos[Math.floor(Math.random() * 4)];
    if(i > 0){
      while(colorArr[i] == colorArr[i-1]){
        colorArr[i] = colorPos[Math.floor(Math.random() * 4)];
      }
    }
    if(i > 1){
      while(colorArr[i] == colorArr[i-1] ||
            colorArr[i] == colorArr[i-2]){
        colorArr[i] = colorPos[Math.floor(Math.random() * 4)];
      }
    }
  }
  new Chart(document.getElementById("frqChart").getContext('2d'), {
    type: "bar",
    data: {
      labels: dispWords,
      datasets: [{
      backgroundColor: colorArr,
      data: dispFrq
      }]
    },
    options: {
      legend: {display: false},
      scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          precision: 0
        }
      }]
    },
    title: {
      display: true,
      text: "Most Frequent Words"
    }
  }
  });
   /*for(var i = 0; i < frq.length; ++i){
    newFrq = document.createElement('li');
    newFrq.innerText = frq[i][0] + ": ";
    newFrq.innerText = frq[i][0] + ": " + frq[i][1];
    frqList.appendChild(newFrq);
    }*/
}
document.addEventListener('DOMContentLoaded', function() {
  var wordNum = document.getElementById("wordNum");
  wordNum.addEventListener('change', function(){
    numWord = wordNum.value;
    showFrq(numWord);
  });
});
document.addEventListener('DOMContentLoaded', function() {
  var excFunc = document.getElementById("excFunc");
  excFunc.addEventListener('change', function(){
    // check if 'change' is right for checkbox
    excluFu = excFunc.checked;
    getFrq(excluFu);
    showFrq(numWord);
  });
});
chrome.storage.session.get('hlText', ({hlText}) => {
  calcFrq(hlText);
});
chrome.storage.session.onChanged.addListener((changes) => {
  if(changes['hlText']){
    calcFrq(changes['hlText'].newValue);
  }
})
