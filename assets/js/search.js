import algoliasearch from 'algoliasearch/lite';
import instantsearch from 'instantsearch.js';

import { searchBox,refinementList,currentRefinements,pagination, hits, configure } from 'instantsearch.js/es/widgets';


function InitSearch () {
  console.info("InitSearch");

const searchClient = algoliasearch('4ODX85RSXK', 'dd433740546fc182c8ec1df6a7b16cf9');


const search = instantsearch({
  indexName: 'PeacefulScience',
  limit: 5,
  routing: true,
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

  search.addWidget(
     pagination({
      container: '#pagination',
    })
  );

  search.addWidget(
   configure({
    hitsPerPage: 5,
   })
  );

  // initialize hits widget
  search.addWidget(
    hits({
      container: '#hits',
      limit: 5,
      routing: true,
      templates: {
        item:  '{{{ render }}}',
     }
    })
  );

  search.start();
}

InitSearch();