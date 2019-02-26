//;(function () {
  //P L A Y E R 
  console.log("P L A Y E R ");
  let player;

  function onYouTubeIframeAPIReady() {
    player = new YT.Player("yt-player", {
      width: "660",
      height: "405",
      videoId: "zmg_jOwa9Fc",
      playerVars: {
        controls: 0,
        disablekb: 0,
        showinfo: 0,
        autoplay: 0,
        modestbranding: 0
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange
      }
    });
  }

$('.player__splash').on('click', e => {
  player.playVideo();
});

$('.player__playback').on('click', e => {
  const bar = $(e.currentTarget);
  const newButtonPosition = e.originalEvent.layerX;
  const clickedPercent = (newButtonPosition / bar.width()) * 100;
  const newPlayerTime = (player.getDuration() / 100) * clickedPercent;

  player.seekTo(newPlayerTime);

});

$(".player__volume-control").on("click", e => {
  const bar = $(e.currentTarget);
  const clickedVolume = e.originalEvent.layerX;
  const newVolume = (clickedVolume / bar.width()) * 100;
  
  console.log(bar);
  console.log(clickedVolume);
  console.log("newVolume = " + newVolume);
  
  setPlayerVolume(newVolume);

  player.setVolume(newVolume);
});

$(".player__volume-icon").on("click", e => {
  const volumeBtn = $(e.currentTarget);
  const isMuted = player.isMuted();

  if (isMuted) {
    volumeBtn.removeClass("mute");
    player.unMute();
    setPlayerVolume(player.getVolume())
  } else {
    volumeBtn.addClass("mute");
    player.mute();
    setPlayerVolume(0)
  }
});

function setPlayerVolume(volume) {
  $(".player__volume-control-button").css("left", `${volume}%`);
}

function onPlayerReady(event) {
  let interval;
  const durationTime = player.getDuration();

  clearInterval(interval);
  updateTimerDisplay();
  setPlayerVolume(player.getVolume());
  console.log(player.getVolume());

  interval = setInterval(() => {
      const completedTime = player.getCurrentTime();
      const percent = (completedTime / durationTime) * 100;

      $(".player__playback-button").css({
        left: `${percent}%`
      });

      updateTimerDisplay();
  }, 1000);
}

function onPlayerStateChange (event) {
  const btn = $(".player__start");
  switch(event.data) {
    case 1: 
      btn.addClass("paused");
      $(".player__wrapper").addClass('active');
      break;
    case 2: 
      btn.removeClass("paused");
      break;
  }
}

function updateTimerDisplay() {
  $(".player__duration-estimate").text(formatTime(player.getDuration()));
  $(".player__duration-completed").text(formatTime(player.getCurrentTime()));
}

$(".player__start").on("click", e => {
  //const btn = $(e.currentTarget);
  const playerState = player.getPlayerState();// 0 - ended,  1 - played,   2 - paused

  if (playerState !== 1) {
    player.playVideo();
    //btn.addClass("paused");
  } else {
    player.pauseVideo();
    //btn.removeClass("paused");
  }  
});

function formatTime(time) {
    const roundTime = Math.round(time);

    const minutes = Math.floor(roundTime / 60);
    const seconds = roundTime - minutes * 60;

    const  formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${minutes}:${formattedSeconds}`
  }

//******************************
/*$(".player__volume").on("click", e => {
  const volumeControl = $(".player__volume-control");
  const volumeDiv = $(".player__volume");
  const playback = $(".player__playback");

  playback.css({
     "width": "390px"
  });

  volumeDiv.css({
    "right": "180px"
  });

  volumeControl.css({
    "display": "block"
  });

});*/

//})();

