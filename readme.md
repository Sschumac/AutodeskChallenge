# Autodesk Technical Challenge
This was very interesting and skill-diverse build, thanks for putting the "challenge" back in technical challenge. I hope you enjoy using it as much as I enjoyed writing it.


-Sawyer Schumacher

## Technology Stack
### Front-End
* React + Webpack
* D3.js
### Back-End
 * Node.js
 * Express
 * Python
 * ViennaRNA

## Sharing & Persistence
Every new request to the home route creates a new Room that is its own sepperate graphing instance and unique URL. Any changes made by dragging and dropping nodes on the graph or changing sequence or structure will be persistant through refreshes. Links can be shared and any changes made will remain persistant. This would be an excellent place to fit in a Redis store.

## UI & UX
I wanted the UX to be as instant and input minimal as possible, any time a valid Sequence/Structure pair are available in the input, a new graph is constructed server side as fast as possible. No enter buttons or save buttons. All interactions with the server are in the background and automatic. For color selection, I utilized [spectrum](https://bgrins.github.io/spectrum/), an extremely lightweight color picker thats used in the Chrome and Firefix dev tools. 

## Graphing & layout
The graph layout algorithims proved to be the most challenging aspect of the build. My first step was an attemp at the geometry based algorthims described by [Generating non-overlapping displays of nucleic acid secondary structure](https://academic.oup.com/nar/article/12/1Part1/75/2889741/Generating-non-overlapping-displays-of-nucleic) and [A partition function algorithm for nucleic acid secondary structure including pseudoknots](http://onlinelibrary.wiley.com/doi/10.1002/jcc.10296/abstract).
Progress was made, and circular type secondary structure graphs could be made in O(n^3), I eventually switched to an off board solution in the interest of time.

I decided to outsource the problem to [ViennaRNA](https://www.tbi.univie.ac.at/RNA/) running on the server, Vienna is an excellent general purpose RNA focused software suite, which I interfaced with to the server via the suites Python bindings and a node.js process manager.
ViennaRNA's plotting functions output normalized XY plotting data, and a connection table for interior bonds, which was used as the data for binding in d3. 

In the future, my servers implementation of Vienna could be expanded to include other Vienna APIs such as Minimum Free Energy calculation and Secondary Structure Prediction.
