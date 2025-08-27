document.getElementById('excFunc').addEventListener('click', function() {
  chrome.runtime.sendMessage({
    action: 'excFunc',
    data: document.getElementById('excFunc').checked
  });
});
document.getElementById('excNum').addEventListener('click', function() {
  chrome.runtime.sendMessage({
    action: 'excNum',
    data: document.getElementById('excNum').checked
  });
});
document.getElementById('wordNum').addEventListener('change', function() {
  chrome.runtime.sendMessage({
    action: 'wordNum',
    data: document.getElementById('wordNum').value
  });
});
