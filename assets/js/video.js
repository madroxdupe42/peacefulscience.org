import YouTubePlayer from 'youtube-player';



var player = false;


window.PlayVideo = function (yid) {
	player = player || YouTubePlayer('video-frame', {playerVars: {modestbranding: 1, playsinline: 1, origin: "https://peacefulscience.org", widget_referrer: window.location}});
	var video_frame = document.getElementById('video-container');
	var currentID = document.getElementById('video-id');	
	video_frame.classList.add("active");
	video_frame.classList.remove("shrink");
	player.cueVideoById(yid);
    currentID.innerHTML = yid;
}

window.CloseVideo = function () {
	player.stopVideo();
	document.getElementById('video-container').classList.remove("active");
}

window.ShrinkVideo = function () {
	document.getElementById('video-container').classList.add("shrink");
}

window.UnshrinkVideo = function () {
	document.getElementById('video-container').classList.remove("shrink");
}



window.PolitePlayVideo = function (yid) {
/* State of the player. Possible values are:
-1 – unstarted
0 – ended
1 – playing
2 – paused
3 – buffering
5 – video cued */
  if (player === false) {window.PlayVideo(yid); return};

  var state = player.getPlayerState();
  if (player === false || state === -1 || state === 0 )
	window.PlayVideo(yid);
}

