path-finding-graph
==================

This graph generates an object with all possible paths between two nodes and outputs the shortest path.

To do this it uses a path object that has an extend method. First, lets intialize a path in a hypothetical graph at node 0.
```javascript
var node = graph.getNode(0);
var path = new Path(node);

//our path now looks like this:
{ 
  length: 0,
  node: 0,
  outgoing: [ { id: 1, value: 11 }, { id: 2, value: 4 } ],
  locations: [ 0 ],
  paths: [] 
}

```
Notice how the edges of that node were stored in the "outgoing" array of the path. That means we can iterate over those edges and use them to extend our path:
```javascript
for(var i = 0; i < path.outgoing.length; i++){
  // for each edge item in the outgoing array
  var edge = path.outgoing[i];
  // we get the node that the edge points to
  var target = graph.getNode(edge.id);
  // then we extend our path using the edge and the target node
  path.extend(edge, target);
}

// now our path looks like this:
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
Each new path in the paths array of our original path has a length equal to the length of the entire path starting from the originating node and ending at the target node of that path. They also have an array of locations visited in that path. We can now iterate over the outgoing edges in each new path object to populate their respective paths arrays and get every next step from these points and so on, eventually generating all possible paths from the origin at node 0.

This makes a shortest path algorithm extremely easy: recursively generate all possible paths from start node. Every time we extend our path, we check to see if the end point of that path is our target node (i.e. the one we are finding a shortest path to). If it is, we save that path if it is the first one we found, or if we already found one path to the target we overwrite it if this new path is shorter than the last one.
