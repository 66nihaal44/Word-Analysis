const excFunc = document.getElementById('excFunc');
const excNum = document.getElementById('excNum');
const wordNum = document.getElementById('wordNum');
excFunc.addEventListener('change', function() {
  chrome.runtime.sendMessage({
    action: 'excFunc',
    data: excFunc.checked
  });
});
excNum.addEventListener('change', function() {
  chrome.runtime.sendMessage({
    action: 'excNum',
    data: excNum.checked
  });
});
wordNum.addEventListener('change', function() {
  chrome.runtime.sendMessage({
    action: 'wordNum',
    data: wordNum.value
  });
});
/*chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if(message.action === 'excFunc'){
    excFunc.checked = message.data;
  } else if(message.action === 'excNum'){
    excNum.checked = message.data;
  } else if(message.action === 'wordNum'){
    wordNum.value = message.data;
  }
});*/
chrome.storage.session.get('excluFu', ({excluFu}) => {
  excFunc.checked = excluFu;
});
chrome.storage.session.get('excluNu', ({excluNu}) => {
  excNum.checked = excluNu;
});
chrome.storage.session.get('numWord', ({numWord}) => {
  wordNum.value = numWord;
});
chrome.storage.session.onChanged.addListener((changes) => {
  if(changes['excluFu']){
    excFunc.checked = changes['excluFu'].newValue;
  }
  if(changes['excluNu']){
    excNum.checked = changes['excluNu'].newValue;
  }
  if(changes['numWord']){
    wordNum.value = changes['numWord'].newValue;
  }
})
