
function mulberry32(a) {
    return function() {
      var t = a += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

function xmur3(str) {
    for(var i = 0, h = 1779033703 ^ str.length; i < str.length; i++)
        h = Math.imul(h ^ str.charCodeAt(i), 3432918353),
        h = h << 13 | h >>> 19;
    return function() {
        h = Math.imul(h ^ h >>> 16, 2246822507);
        h = Math.imul(h ^ h >>> 13, 3266489909);
        return (h ^= h >>> 16) >>> 0;
    }
}
 
function randfont(T, rand) {
	for (let i = 0; i < T.length; i++) {
		let X = rand() * 3;
		if (X < 1)
	    	T[i] = `<span class="Falt1">${T[i]}</span>`;
		if (X > 2)
	    	T[i] = `<span class="Falt2">${T[i]}</span>`;
	} 
}


for (H of document.querySelectorAll("h1, h2, h3, h4, .nav-link, .title")) {
	seed = xmur3(H.textContent.trim());
	rand = mulberry32(seed());
	
	html =[];
	
	for (C of H.childNodes) {
		
		if (C.nodeType === 3) {
			T = C.textContent.split("");
			randfont(T, rand);
			html.push(T.join(""))
		}
		if (C.nodeType === 1) {
			T = C.innerHTML.split("");
			randfont(T, rand);
			C.innerHTML = T.join("");
			html.push(C.outerHTML)
		}
	}
    console.log(html);
	H.innerHTML =html.join("")
}