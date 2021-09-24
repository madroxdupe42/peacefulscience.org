


window.CloseModal = function(event) {
	location.hash = "#close-subscribe";
	window.history.replaceState(null, null, location.href.replace(location.hash,""));
	window.event.preventDefault();
}


window.addEventListener('hashchange', function() {

	let elems = document.getElementsByClassName("targeted");
	for (let k = 0; k < elems.length; k++) {
		elems[k].classList.remove('targeted');
	}
	
	if (location.hash.lastIndexOf("#fnref", 0) === 0 ) {
		let helem = document.getElementById(location.hash.substring(1));
		helem.parentNode.classList.add('targeted');
	}

});


