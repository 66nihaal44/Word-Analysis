(() => {
  const frq = [];
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
  let frqChartChart;
  document.getElementsByClassName("controls")[0].style.display = "none";
  document.getElementById("frqChart").style.display = "none";
  Chart.defaults.global.defaultFontFamily = "Arial, sans-serif";
  Chart.defaults.global.defaultFontColor = "white";
  console.log("testpanel.js");
  //const frqList = document.querySelector(`#frqList`);
  function calcFrq(text) {
    console.log("calcFrq function called.");
    if (text) {
      /*while(frqList.firstChild){
        frqList.removeChild(frqList.firstChild);
      }*/
      wordArr = text.replace(/[\u2018\u2019\u201C\u201D]/g, "'").toLowerCase().match(/[a-z]+(?:['.\-][a-z0-9]*[a-z]+)*/g) || [];
      getFrq();
      showFrq();
    }
  }
  function getFrq() {
    const frqMap = new Map();
    document.getElementById("para1").style.display = "none";
    document.getElementById("para2").style.display = "none";
    document.getElementsByClassName("controls")[0].style.display = "flex";
    document.getElementById("frqChart").style.display = "inline";
    for (const word of wordArr){
      if(!(excluFu && functionWords.includes(word)) 
        && !(excluNu && !isNaN(word))){
        frqMap.set(word, (frqMap.get(word) || 0) + 1);
      }
    }
    frq.length = 0;
    for (const [word, count] of frqMap.entries()){
      frq.push([word, count]);
    }
    frq.sort(function (a, b) { return b[1] - a[1] });
    console.log(frq);
  }
  function showFrq() {
    const dispWords = [], dispFrq = [];
    frq.forEach((item, index) => {
      if(index < numWord){
        dispWords[index] = item[0];
        dispFrq[index] = item[1];
      }
    });
    /*for (let i = 0; i < numWord && i < frq.length; ++i) {
      dispWords[i] = frq[i][0];
      dispFrq[i] = frq[i][1];
    }*/
    // generate random array of colors
    const colorArr = [];
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
    }*/
    const colorArr = dispWords.map(() =>
      `hsl(${Math.random() * 360}, 70%, 60%)`
    );
    /*while (chartSection.firstChild) {
      chartSection.removeChild(chartSection.firstChild);
    }
    frqChart = document.createElement('canvas');
    frqChart.setAttribute("id", "frqChart");
    chartSection.appendChild(frqChart);*/
    if(!frqChartChart){
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
    }
    else{
      frqChartChart.data.labels = dispWords;
      frqChartChart.data.datasets[0].backgroundColor = colorArr;
      frqChartChart.data.datasets[0].data = dispFrq;
      frqChartChart.update();
    }
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
