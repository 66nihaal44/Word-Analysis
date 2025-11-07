(() => {
  const frq = [];
  const colorArr = [];
  const colorPos = ["red", "blue", "green", "yellow"];
  let wordArr;
  const excFunc = document.getElementById("excFunc");
  const excNum = document.getElementById("excNum");
  const wordNum = document.getElementById("wordNum");
  const chartSection = document.getElementsByClassName("chartSection")[0];
  let excluFu = excFunc.checked;
  let excluNu = excNum.checked;
  let numWord = wordNum.value;
  const functionWords = ["the", "a", "and", "of", "is"];
  const cincc = new Intl.Collator('en');
  let frqChartChart;
  document.getElementById("excFunc").style.display = "none";
  document.getElementById("excFuncL").style.display = "none";
  document.getElementById("excNum").style.display = "none";
  document.getElementById("excNumL").style.display = "none";
  document.getElementById("wordNum").style.display = "none";
  document.getElementById("frqChart").style.display = "none";
  document.getElementsByClassName("controls")[0].style.display = "none";
  console.log("testpanel.js");
  //const frqList = document.querySelector(`#frqList`);
  function calcFrq(text) {
    console.log("calcFrq function called.");
    if (text) {
      /*while(frqList.firstChild){
        frqList.removeChild(frqList.firstChild);
      }*/
      wordIte = text.matchAll(/[^\s,\/#!$%\^&\*;:{}=\-_`~()]+/g);
      wordArr = [...wordIte];
      wordArr.sort(cincc.compare);
      getFrq();
      showFrq();
    }
  }
  function getFrq() {
    document.getElementById("para1").style.display = "none";
    document.getElementById("para2").style.display = "none";
    document.getElementById("excFunc").style.display = "inline";
    document.getElementById("excFuncL").style.display = "inline";
    document.getElementById("excNum").style.display = "inline";
    document.getElementById("excNumL").style.display = "inline";
    document.getElementById("wordNum").style.display = "inline";
    document.getElementById("frqChart").style.display = "inline";
    frq.length = 0;
    for (let i = 0, j = 0; i < wordArr.length; ++i, ++j) {
      while (excluFu && functionWords.indexOf(wordArr[i][0].toLowerCase()) > -1) {
        ++i;
      }
      while (excluNu && !isNaN(wordArr[i][0])) {
        ++i;
      }
      frq[j] = [wordArr[i][0].toLowerCase(), 1];
      while (i < wordArr.length - 1 && wordArr[i + 1][0].toLowerCase() === wordArr[i][0].toLowerCase()) {
        ++i;
        ++frq[j][1];
      }
    }
    frq.sort(function (a, b) { return b[1] - a[1] });
    console.log(frq);
  }
  function showFrq() {
    const dispWords = [], dispFrq = [];
    for (let i = 0; i < numWord && i < frq.length; ++i) {
      dispWords[i] = frq[i][0];
      dispFrq[i] = frq[i][1];
    }
    // generate random array of colors
    colorArr.length = 0;
    for (let i = 0; i < frq.length; ++i) {
      colorArr[i] = colorPos[Math.floor(Math.random() * 4)];
      if (i > 0) {
        while (colorArr[i] == colorArr[i - 1]) {
          colorArr[i] = colorPos[Math.floor(Math.random() * 4)];
        }
      }
      if (i > 1) {
        while (colorArr[i] == colorArr[i - 1] ||
          colorArr[i] == colorArr[i - 2]) {
          colorArr[i] = colorPos[Math.floor(Math.random() * 4)];
        }
      }
    }
    Chart.defaults.global.defaultFontFamily = "Arial, sans-serif";
    Chart.defaults.global.defaultFontColor = "white";
    while (chartSection.firstChild) {
      chartSection.removeChild(chartSection.firstChild);
    }
    frqChart = document.createElement('canvas');
    frqChart.setAttribute("id", "frqChart");
    chartSection.appendChild(frqChart);
    frqChartChart = new Chart(document.getElementById("frqChart").getContext('2d'), {
      type: "bar",
      data: {
        labels: dispWords,
        datasets: [{
          backgroundColor: colorArr,
          data: dispFrq
        }],
        fontStyle: "normal"
      },
      options: {
        legend: { display: false },
        scales: {
          xAxes: [{
            gridLines: {
              color: "white",
              zeroLineColor: "white"
            },
            ticks: {
              beginAtZero: true,
              precision: 0
            }
          }],
          yAxes: [{
            gridLines: {
              color: "white",
              zeroLineColor: "white"
            },
            ticks: {
              beginAtZero: true,
              precision: 0
            }
          }]
        },
        title: {
          display: true,
          text: "Most Frequent Words",
          fontStyle: "normal"
        }
      }
    });
    /*for(let i = 0; i < frq.length; ++i){
     newFrq = document.createElement('li');
     newFrq.innerText = frq[i][0] + ": ";
     newFrq.innerText = frq[i][0] + ": " + frq[i][1];
     frqList.appendChild(newFrq);
     }*/
  }
  document.addEventListener('DOMContentLoaded', function () {
    excFunc.addEventListener('change', function () {
      // check if 'change' is right for checkbox
      excluFu = excFunc.checked;
      getFrq();
      showFrq();
      /*chrome.runtime.sendMessage({
        action: 'excFunc',
        data: excluFu
      });*/
      chrome.storage.session.set({ excluFu: excluFu });
    });
  });
  document.addEventListener('DOMContentLoaded', function () {
    excNum.addEventListener('change', function () {
      // check if 'change' is right for checkbox
      excluNu = excNum.checked;
      getFrq();
      showFrq();
      /*chrome.runtime.sendMessage({
        action: 'excNum',
        data: excluNu
      });*/
      chrome.storage.session.set({ excluNu: excluNu });
    });
  });
  document.addEventListener('DOMContentLoaded', function () {
    wordNum.addEventListener('change', function () {
      numWord = wordNum.value;
      showFrq();
      /*chrome.runtime.sendMessage({
        action: 'wordNum',
        data: numWord
      });*/
      chrome.storage.session.set({ numWord: numWord });
    });
  });
  chrome.storage.session.get('hlText', ({ hlText }) => {
    calcFrq(hlText);
  });
  chrome.storage.session.onChanged.addListener((changes) => {
    if (changes['hlText']) {
      calcFrq(changes['hlText'].newValue);
    }
  })
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'excFunc') {
      excluFu = message.data;
      getFrq();
      showFrq();
      excFunc.checked = message.data;
    } else if (message.action === 'excNum') {
      excluNu = message.data;
      getFrq();
      showFrq();
      excNum.checked = message.data;
    } else if (message.action === 'wordNum') {
      numWord = message.data;
      showFrq();
      wordNum.value = message.data;
    }
  });
})();
