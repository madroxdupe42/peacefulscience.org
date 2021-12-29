
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
 
function randfont(C, rand) {
	T = C.textContent.split("");
	let current = 0;
	for (let i = 0; i < T.length; i++) {
		let X = Math.floor(rand() * 3);
		if (current === X) continue;
		if (T[i] === " ") continue;
		
		if (i > 0) // Protect ligatures
          if (T[i] === "i" || T[i] === "l" || T[i] === "f" )
		    if (T[i-1] === "f")
              continue;
		
		current = X;
		if (X === 0) {
			current = X;
			T[i] = `</span>${T[i]}`;
			continue;
		}
		current = X;
		
		T[i] = `</span><span class="Falt${X}">${T[i]}`;
	} 
	if (current !== 0) T.push("</span>")
	return T.join("");
}

function process_element(E) {
	if (E.classList.contains("__FontVar"))
	  return;

    
	seed = xmur3(E.textContent.trim());
	rand = mulberry32(seed());
    
    recursive_randfont(E, rand);
	
	E.classList.add("__FontVar");
}

function recursive_randfont(E, rand) {
	html =[];
	for (C of E.childNodes) {
		if (C.nodeType === 3) { // Text node
			html.push(randfont(C, rand));
		}
		if (C.nodeType === 1) { // Text node
			html.push(recursive_randfont(C, rand));
		}		
	}
	E.innerHTML = html.join("");
	return E.outerHTML;
}

function process_all() {
  for (H of document.querySelectorAll("h1, h2, h3, h4, .nav-link, .title")) 
     process_element(H);
}

process_all();

document.addEventListener("turbo:load", function() {
  process_all();
})
