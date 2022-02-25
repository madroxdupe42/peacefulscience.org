import algoliasearch from 'algoliasearch/lite';
import instantsearch from 'instantsearch.js';
import { connectInfiniteHits } from 'instantsearch.js/es/connectors';
import { searchBox,refinementList,currentRefinements, configure } from 'instantsearch.js/es/widgets';


function InitSearch () {
  console.info("InitSearch");

const searchClient = algoliasearch('4ODX85RSXK', 'dd433740546fc182c8ec1df6a7b16cf9');


const search = instantsearch({
  indexName: 'PeacefulScience',
  limit: 10,
  routing: false,
  searchClient
});

  // initialize RefinementList
  search.addWidget(
    refinementList({
      container: '#category-refinement-list',
      limit: 10,
      showMore: true,
      attribute: 'categories'
    })
  );

    // initialize RefinementList
  search.addWidget(
    refinementList({
      container: '#author-refinement-list',
      limit: 10,
      showMore: true,
      attribute: 'authors'
    })
  );

  // initialize SearchBox
  search.addWidget(
    searchBox({
      container: '#search-box',
      placeholder: 'Search...'
    })
  );

  search.addWidget(
    currentRefinements({
      container: "#current-refinements",
    })
  );

/*  search.addWidget(
     pagination({
      container: '#pagination',
    })
  );*/

  search.addWidget(
   configure({
    hitsPerPage: 10,
   })
  );

/*

  // initialize hits widget
  search.addWidget(
    hits({
      container: '#hits',
      limit: 100,
      routing: true,
      templates: {
        item:  '{{{ render }}}',
     }
    })
  );


*/


const infiniteHits = connectInfiniteHits(
  (renderArgs, isFirstRender) => {
    const { hits, showMore, widgetParams } = renderArgs;
    const { container, sentinel } = widgetParams;
    lastRenderArgs = renderArgs;

    if (isFirstRender) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
	      console.log(entry)
          if (entry.target == sentinel && entry.isIntersecting && !lastRenderArgs.isLastPage) {
            showMore();
          }
        });
      });

      observer.observe(sentinel);
      container.innerHTML = hits.map(hit => hit.render).join('');
      return;
    }

    container.innerHTML = hits.map(hit => hit.render).join('');
  }
);

 search.addWidget(
	infiniteHits({
		container: document.getElementById("hits"),
		sentinel: document.getElementById("pagination"),
		routing: false,
	})
);



  search.start();
}


InitSearch();