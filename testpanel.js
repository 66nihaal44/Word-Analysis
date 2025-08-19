const frq = [];
var wordArr;
var numWord = document.getElementById("wordNum").value;
var excluFu = document.getElementById("excFunc").checked;
const functionWords = ["the", "a", "and", "of", "is"];
console.log("testpanel.js");
//const frqList = document.querySelector(`#frqList`);
function calcFrq(text){
  console.log("calcFrq function called.");
  if(text){
    /*while(frqList.firstChild){
      frqList.removeChild(frqList.firstChild);
    }*/
    const countWordEx = /[^\s]+/g;
    const wordIt = text.matchAll(countWordEx);
    wordArr = [...wordIt];
    wordArr.sort();
    getFrq();
    showFrq();
  }
}
function getFrq(){
  frq.length = 0;
  for(var i = 0, j = 0; i < wordArr.length; ++i, ++j){
      while(excluFu && functionWords.indexOf(wordArr[i][0].toLowerCase) > -1){
        ++i;
      }
      frq[j] = [wordArr[i][0], 1];
      while(i < wordArr.length - 1 && wordArr[i + 1][0] === wordArr[i][0]){
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
  new Chart(document.getElementById("frqChart").getContext('2d'), {
    type: "bar",
    data: {
      labels: dispWords,
      datasets: [{
      backgroundColor: "red",
      data: dispFrq
      }]
    },
    options: {
      legend: {display: false},
      scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
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
