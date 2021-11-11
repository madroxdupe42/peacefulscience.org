---
cascade:
  design:
    style: horizontal
    layout: "col-12"
  jsonld:
    "@type": CreativeWorkSeries
    headline: = title
    description: = description
    about: = about
    publisher: = copy /jsonld/peacefulscience
    sameas: = sameas    
    mainEntityOfPage: 
      "@type": WebPage
      "@id": = permalink
---