path-finding-graph
==================

This graph generates an object with all possible paths between two nodes and outputs the shortest path.

To do this it uses a path object that has an extend method. If we intialize a path in a hypothetical graph at node 0, it might look like this:
```javascript
{ 
  length: 0,
  node: 0,
  outgoing: [ { id: 1, value: 11 }, { id: 2, value: 4 } ],
  locations: [ 0 ],
  paths: [] 
}

```
Notice how the edges of that node were stored in the "outgoing" array of the path. That means we can iterate over those edges and use them to extend our path. After calling extend on our initial path with each item in the outgoing array, we have this:
```javascript
{ 
  length: 0,
  node: 0,
  outgoing: [ { id: 1, value: 11 }, { id: 2, value: 4 } ],
  locations: [ 0 ],
  paths: 
   [ { length: 11,
       node: 1,
       outgoing: [Object],
       locations: [ 0, 1 ],
       paths: [ ] },
     { length: 4,
       node: 2,
       outgoing: [Object],
       locations: [ 0, 2],
       paths: [ ] } ] 
}
```
Each new path in the paths array thusly generated has a length equal to the length of the entire path starting from the originating node and ending at the position of that path. They also have an array of locations visited in that path. We can now iterate over the outgoing edges in each new path object to populate their respective paths arrays and get every possible next step from these points, thus generating all possible paths from the origin at node 0.

This makes a shortest path algorithm extremely easy: generate all possible paths from start node. Every time a path reaches the end node save that path if it has a shorter length than the previously saved path to that node.
