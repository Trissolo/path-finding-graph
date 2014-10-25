var Graph = function(){
  this.nodes = [];
  this.edges = [];
  this.count = 0;
}

Graph.prototype.insert = function(data){
  data = data || null;
  var node = new Node(data, this.count);
  this.count++;
  this.nodes.push(node);
  return node;
}

Graph.prototype.connect = function(source, target, value){
  var edge = new Edge(source, target, value);
  this.edges.push(edge);
  var sourceNode = this.getNode(source);
  var targetNode = this.getNode(target);
  sourceNode.edgeTo.push({id: target, value: value});
  targetNode.edgeTo.push({id: source, value: value});
}

Graph.prototype.getNode = function(id){
  for(var i = 0, l = this.nodes.length; i < l; i++){
    if(this.nodes[i].id === id){
      return this.nodes[i];
    }
  }
}

Graph.prototype.getNodes = function(){
  return this.nodes.slice();
}

Graph.prototype.findPath = function(start, end){
  var self = this;
  var startNode = this.getNode(start);
  var endNode = this.getNode(end);
  var path = new Path(startNode);
  var shortestPath;
  var makePaths = function(path){
    for(var i = 0; i < path.outgoing.length; i++){
      // for each edge going out from this node
      var edge = path.outgoing[i];
      // we only make a new path if the edge has not yet been visited
      if(path.locations.indexOf(edge.id) === -1){
        // we get the node that this is an edge to
        var target = self.getNode(edge.id);
        // we create a new path extending off of this one and save a refernce to it
        var newPath = path.extend(edge, target);
        if(target.id === end){
          // if our new path is a path to our endpoint...
          if(!shortestPath || newPath.length < shortestPath.length)
            // and that path is the first or is shorter than a previously saved one
          shortestPath = newPath;
        } else {
          makePaths(newPath);
        }
      }
    }
  }
  makePaths(path);
  return shortestPath;
}

var Path = function(node, locations, distance){
  // if we are passed an array of previous locations we add the current node to the list
  // otherwise this is the originating node and we start a new list
  if(locations !== undefined){
    locations.push(node.id);
  }
  // distance is 0 for a new path, or an accumulation of edge values for extended paths
  this.length = distance || 0;
  this.node = node.id;
  this.outgoing = node.edgeTo;
  this.locations = locations || [node.id];
  this.paths = [];
}

Path.prototype.extend = function(edge, node){
  // when we extend we add the edge length to the existing path length
  var length = this.length + edge.value;
  // and pass in a copy of the locations visited in the current path
  var locations = this.locations.slice();
  var path = new Path(node, locations, length);
  // the new path is added as a path originating from the path being extended
  this.paths.push(path);
  // return it for recursive calls
  return path;
}

var Node = function(data, id){
  this.id = id;
  this.data = data;
  this.edgeTo = [];
}

var Edge = function(source, target, value){
  this.source = source;
  this.target = target;
  this.value = value;
}

module.exports = Graph;