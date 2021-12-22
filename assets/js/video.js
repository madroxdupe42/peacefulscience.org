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

