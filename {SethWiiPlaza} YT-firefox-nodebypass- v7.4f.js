// Build v.7.4f by Seth@WiiPlaza
// Fixes forced pauses on YouTube caused by Ad-Blockers
// Auto-likes every video you watch
// Compatibility: Firefox  
// Inject using the jQuery Firefox injector addon 'run-a-script by mivanchev'
// GitHub: https://github.com/MIvanchev/run-a-script

const likeButtonSelector = '#top-level-buttons-computed > segmented-like-dislike-button-view-model > yt-smartimation > div > div > like-button-view-model > toggle-button-view-model > button';

function clickLikeButton() {
  const performClick = () => {
    const likeButton = $(likeButtonSelector);
    if (likeButton.length) {
      likeButton.click();
      console.log('Like button clicked');
    } else {
      console.log('Like button not found');
    }
  };

  const getTitle = () => $("#title > h1 > yt-formatted-string").text().trim();

  let currentTitle = getTitle();

  const checkTitleChange = () => {
    const newTitle = getTitle();
    if (newTitle && newTitle !== currentTitle) {
      console.log('Video title has changed, re-running the script...');
      performClick();
      currentTitle = newTitle;
    }
    setTimeout(checkTitleChange, 1000);
  };

  setTimeout(performClick, 5000);
  checkTitleChange();
}

function checkAndPlayVideo() {
  const videoElement = $('video');
  if (videoElement.length && videoElement[0].paused) {
    const playButton = $("#movie_player > div.ytp-chrome-bottom > div.ytp-chrome-controls > div.ytp-left-controls > button");
    if (playButton.length) playButton.click();
  }
}

$(document).ready(() => {
  clickLikeButton();
  setInterval(checkAndPlayVideo, 1000);
});

$(document).ready(() => {
  const form = $('<form>', { class: 'child' }).append('<input name="ownerDocument"/><script>// Your script here</script>');
  $('body').append(form);
});
