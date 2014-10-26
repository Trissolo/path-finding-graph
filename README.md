path-finding-graph
==================

This graph generates a paths object that contains all possible paths extending out from a given node. The paths automatically end when they reach a dead end, or there are no un-traversed nodes connected to the current node, for example at the end of a loop. This makes it very convenient to find the shortest path between two nodes.

To create the paths object this graph uses a Path constructor that has an "extend" method. First, lets intialize a path in a hypothetical graph at node 0.
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

This makes a shortest path algorithm extremely easy, here is the code for shortest path:
```javascript
Graph.prototype.findPath = function(start, end){
  var self = this;
  var shortestPath;
  var startNode = this.getNode(start);
  var endNode = this.getNode(end);
  var path = new Path(startNode);
  var makePaths = function(path){
    for(var i = 0; i < path.outgoing.length; i++){
      var edge = path.outgoing[i];
      var target = self.getNode(edge.id);
      var newPath = path.extend(edge, target);
      if(target.id === end){
        if(!shortestPath || newPath.length < shortestPath.length)
        shortestPath = newPath;
      } 
      else if(newPath){
        makePaths(newPath);
      }
    }
  }
  makePaths(path);
  return shortestPath;
}
```
