var sentIte;
var sentArr;
const sentList = document.getElementById("sentList");
const chartSection = document.getElementsByClassName("chartSection")[0];
function calcSent(text){
  var sum = 0;
  while(sentList.firstChild){
      sentList.removeChild(sentList.firstChild);
    }
  sentArr = text.split(/(?<=[.?!]) +|\n+/).filter(Boolean);
  console.log("Original: ", sentArr);
  for(var i = 0; i < sentArr.length; ++i){
    const wordSentIte = sentArr[i].matchAll(/[^\s.,\/#!$%\^&\*;:{}=\-_`~()]+/g);
    const wordSentArr = [...wordSentIte];
    if(wordSentArr.length > 0){
      sentArr[i] = wordSentArr.length;
      sum += sentArr[i];
    }
    else{
      sentArr.splice(i, 1);
      --i;
    }
  }
  sentArr = sentArr;
  const sentAv = sum / sentArr.length;
  sentArr.sort(function(a, b){return b - a});
  console.log(sentArr);
  /*const disArr = [];
  for(var i = 0; i < 10 && i < sentArr.length; ++i){
    disArr[i] = sentArr[i];
  }*/
  if(sentArr.length > 1){
    const newSent1 = document.createElement('li');
    newSent1.innerText = "Average word count: " + sentAv.toFixed(1) + " word" + (sentAv !== 1 ? "s" : "");
    sentList.appendChild(newSent1);
    const newSent2 = document.createElement('li');
    newSent2.innerText = sentArr.length + " sentence" + (sentArr.length !== 1 ? "s" : "");
    sentList.appendChild(newSent2);
  }
  chartLabels = new Array(sentArr.length).fill("");
  Chart.defaults.global.defaultFontFamily = "Arial, sans-serif";
  Chart.defaults.global.defaultFontColor = "white";
  while(chartSection.firstChild){
    chartSection.removeChild(chartSection.firstChild);
  }
  frqChart = document.createElement('canvas');
  frqChart.setAttribute("id", "frqChart");
  chartSection.appendChild(frqChart);
  new Chart(frqChart.getContext('2d'), {
    type: "line",
    data: {
      labels: chartLabels,
      datasets: [{
        backgroundColor: "red",
        data: sentArr,
        tension: 0,
        fill: false
      }],
      fontStyle: "normal"
    },
    options: {
      legend: { display: false },
      scales: {
        xAxes: [{
          gridLines: {
            display: false
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
        text: "Sentences and Word Length",
        fontStyle: "normal"
      }
    }
  });
}
chrome.storage.session.get('hlText', ({hlText}) => {
  calcSent(hlText);
});
chrome.storage.session.onChanged.addListener((changes) => {
  if(changes['hlText']){
    calcSent(changes['hlText'].newValue);
  }
})
