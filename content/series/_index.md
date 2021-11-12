---
cascade:
  design:
    style: horizontal
    layout: "col-12"
  jsonld:
    "@type": CreativeWorkSeries
    "@id": = permalink main
    headline: = title
    description: = description
    about: = about
    hasPart: = pages
    publisher: 
      "@id": https://peacefulscience.org/#org
    sameas: = sameas    
    mainEntityOfPage: 
      "@type": WebPage
      "@id": = permalink
---