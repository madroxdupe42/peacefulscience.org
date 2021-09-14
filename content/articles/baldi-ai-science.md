---
podcast: true
aliases:
- /baldi-ai-science/
authors:
- swamidass
categories:
- artificial-intelligence
- science
commenturl: http://discourse.peacefulscience.org/t/pierre-baldi-protein-folding-and-ais-impact-on-science/12706
date: '2020-12-07T23:00:00'
description: Pierre Baldi has been applying Deep Learning, a type of AI, to study
  scientific problems, like protein folding. How is AI impacting science?
headerimage:
  src: /img/2020/12/maxresdefault.jpg
  youtube: 0Y2kQf54tpM
title: 'Pierre Baldi: Protein Folding and AI''s Impact on Science'
---

Google just announced that its [Artificial Intelligence algorithm, AlphaFold, made a major advance in protein folding](https://deepmind.com/blog/article/alphafold-a-solution-to-a-50-year-old-grand-challenge-in-biology). To help make sense of this, [I am interviewing](https://www.youtube.com/watch?v=0Y2kQf54tpM) [Pierre Baldi](http://www.igb.uci.edu/~pfbaldi/) ([h-index: 106](https://scholar.google.com/citations?user=RhFhIIgAAAAJ&hl=en)), one of the leading AI scientists in the world, and also my PhD advisor back in the day. Pierre is a Distinguished Professor at UC Irvine, and has been using AI to solve scientific problems for decades. [He literally wrote the textbook](https://www.amazon.com/Bioinformatics-Learning-Approach-Adaptive-Computation/dp/026202506X) I used in graduate school, and his *[Deep Learning in Science](https://amzn.to/3mStD5B)* book is due to be published March, 2021.

## What is Deep Learning?

![Figure from [this paper](https://www.pnas.org/content/116/4/1074) at PNAS. Deep Learning networks are often depicted in this way, with information flowing through nodes in a network to make a computation..](/img/2020/12/F2.large.jpg)

AlphaFold is a type of Deep Learning algorithm, a neural network that learns from data. That "learning" ability is one reason it is called Artificial Intelligence. Deep Learning can be used in many ways to address many tasks. In science, one task we care about is protein folding.

## What is Protein Folding?

So what is "protein folding"? We want to know the three-dimensional structure of proteins from the amino acid sequence. Proteins are defined by a sequence of letters, where [each letter corresponds to a different building block](https://en.wikipedia.org/wiki/Amino_acid#Table_of_standard_amino_acid_abbreviations_and_properties), like this:

``` {.wp-block-code}
VLSPADKTNVKAAWGKVGAHAGEYGAEALERMFLSFPTTKTYFPHFDLSHGSAQVKGHGKKVADALTNAVAHVDDMPNALSALSDLHAHKLRVDPVNFKLLSHCLLVTLAAHLPAEFTPAVHASLDKFLASVSTVLTSKYR
```

The task of protein folding is to translate this sequence of building blocks into a three dimensional structure, like this:

![The [protein structure of hemoglobin](https://pdb101.rcsb.org/motm/41), in the style of David Goodsell. This is the structure encoded in the the amino acid sequence above.](/img/2020/12/2dhb.gif)

That structure becomes important. It can give important insight into how the protein functions. In this case, we are look at hemoglobin, the oxygen carrying protein in our blood. Shifts in the structure when it binds oxygen are important to its function.

![The shift in structure is key to how hemoglobin carries oxygen in our blood.](/img/2020/12/hb-animation.gif)

There are several experimental techniques to determine protein structure: [X-Ray crystallography](https://en.wikipedia.org/wiki/X-ray_crystallography), [NMR](https://en.wikipedia.org/wiki/Nuclear_magnetic_resonance_spectroscopy_of_proteins), and [cryo-EM](https://en.wikipedia.org/wiki/Cryogenic_electron_microscopy). These techniques have been used for decades, and produced thousands of protein structures that are stored in the [Protein Data Bank](https://www.rcsb.org/). However, they are expensive and slow, and they often do not work.

So, could we build a computer program that could look at all the structures solved so far, and learn patterns from it, so that it could now predict the structure of a new protein? That is the basic challenge and opportunity of protein folding. As simple as that sounds, it turns out to be a very hard problem, for a whole host of reasons. But AI algorithms are proving to be particularly effective at this question

With AlphaFold's announcement, is protein folding a solved problem now? This tweet from a scientists nails the answer. "[Protein folding is not a solved problem.](https://twitter.com/lpachter/status/1333702159850893312?s=20)" Still, this is exciting. What exactly does it mean?

## How is Deep Learning Impacting Science?

This is just one more example, on a growing list, of where Deep Learning is making a large impact on how scientists conduct their work. Pierre Baldi has been applying deep learning to solve scientific problems for decades. We will be discussing how Deep Learning is coming of age, and how it is shaping science in many ways.
