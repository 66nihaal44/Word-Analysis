const excFunc = document.getElementById('excFunc');
const excNum = document.getElementById('excNum');
const wordNum = document.getElementById('wordNum');
excFunc.addEventListener('click', function() {
  chrome.runtime.sendMessage({
    action: 'excFunc',
    data: excFunc.checked
  });
});
excNum.addEventListener('click', function() {
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
  excFunc = excluFu;
});
chrome.storage.session.get('excluNu', ({excluNu}) => {
  excNum = excluNu;
});
