
	var tocItems;
    var tocLookup;

	var pathLength;

	var lastPathStart,
		lastPathEnd;


	function NavProgressInit() {
		console.info("NavProgressInit");
		
	    var toc = document.querySelector( '.toc' );
	    var tocPath = document.querySelector( '.toc-marker path' ); 
        
        if (toc === null) return;
        if (tocPath === null) return;

		tocItems = [].slice.call( toc.querySelectorAll( 'li' ) );

		// Cache element references and measurements
		tocItems = tocItems.map( function( item ) {
			var anchor = item.querySelector( 'a' );
			var target = document.getElementById( anchor.getAttribute( 'href' ).slice( 1 ) );

			return {
				listItem: item,
				anchor: anchor,
				target: target
			};
		} );

		// Remove missing targets
		tocItems = tocItems.filter( function( item ) {
			return !!item.target;
		} );

		var path = [];
		var pathIndent;

		tocItems.forEach( function( item, i ) {

			var x = item.anchor.offsetLeft + 0,
				y = item.anchor.offsetTop,
				height = item.anchor.offsetHeight;

			if( i === 0 ) {
				path.push( 'M', x, y, 'L', x, y + height );
				item.pathStart = 0;
			}
			else {
				// Draw an additional line when there's a change in
				// indent levels
				if( pathIndent !== x ) path.push( 'L', pathIndent, y );

				path.push( 'L', x, y );

				// Set the current path so that we can measure it
				tocPath.setAttribute( 'd', path.join( ' ' ) );
				item.pathStart = tocPath.getTotalLength() || 0;

				path.push( 'L', x, y + height );
			}

			pathIndent = x;

			tocPath.setAttribute( 'd', path.join( ' ' ) );
			item.pathEnd = tocPath.getTotalLength();

		} );

		pathLength = tocPath.getTotalLength();
        
  

	}

	function NavProgressSync(entries) {
		console.info("NavProgressSync");
		
	    var tocPath = document.querySelector( '.toc-marker path' ); 

		var windowHeight = window.innerHeight;

		var pathStart = pathLength,
			pathEnd = 0;

		var visibleItems = 0;
			
        TocLookup = new Map;
        for (i of tocItems) TocLookup.set(i.target, i);
		
		
		entries.forEach( function( item ) {
			if( item.isIntersecting )
				TocLookup.get(item.target).listItem.classList.add( 'active' );
			else 
				TocLookup.get(item.target).listItem.classList.remove( 'active' );
		} );

        var Visible = new Set(document.querySelectorAll(".toc .active"));
	    
        var visibleItems = tocItems.filter(x => Visible.has(x.listItem))

		
        for (item of visibleItems) {
				pathStart = Math.min( item.pathStart, pathStart );
				pathEnd = Math.max( item.pathEnd, pathEnd );
        }

		// Specify the visible path or hide the path altogether
		// if there are no visible items
		if( visibleItems.length > 0 && pathStart < pathEnd ) {
			
			if( pathStart !== lastPathStart || pathEnd !== lastPathEnd ) {
				tocPath.setAttribute( 'stroke-dashoffset', '1' );
				tocPath.setAttribute( 'stroke-dasharray', '1, '+ pathStart +', '+ ( pathEnd - pathStart ) +', ' + pathLength );
				tocPath.setAttribute( 'opacity', 1 );
			}
		}
		else {
			tocPath.setAttribute( 'opacity', 0 );
		}

		lastPathStart = pathStart;
		lastPathEnd = pathEnd;

	}


window.addEventListener( 'resize', NavProgressInit, {passive: true, capture: false} );


function NavProgressBind () {
	
  let options = {
    root: document,
    threshold: 1.0
  }

  let observer = new IntersectionObserver(NavProgressSync, options);

  for (t of tocItems) 
	observer.observe(t.target);
}


NavProgressInit();
NavProgressBind();

