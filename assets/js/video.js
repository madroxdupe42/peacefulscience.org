import YouTubePlayer from 'youtube-player';

var player = false;

window.PlayVideo = function (yid) {
	
	player = player || YouTubePlayer('video-frame');
	

	var f = document.getElementById('video-frame');
	f.parentElement.classList.add("active");
	f.parentElement.classList.remove("shrink");
	player.loadVideoById(yid);
	player.playVideo();
}

window.CloseVideo = function () {
	player.stopVideo();
	var f = document.getElementById('video-frame');
	f.parentElement.classList.remove("active");
}

window.ShrinkVideo = function () {
	var f = document.getElementById('video-frame');
	f.parentElement.classList.add("shrink");
}

window.UnshrinkVideo = function () {
	var f = document.getElementById('video-frame');
	f.parentElement.classList.remove("shrink");
}

