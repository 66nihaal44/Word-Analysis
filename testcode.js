document.getElementById('excFunc').addEventListener('click', function() {
  chrome.runtime.sendMessage({
    action: 'excFunc'
  });
});
document.getElementById('excNum').addEventListener('click', function() {
  chrome.runtime.sendMessage({
    action: 'excNum'
  });
});
document.getElementById('wordNum').addEventListener('click', function() {
  chrome.runtime.sendMessage({
    action: 'wordNum'
  });
});
