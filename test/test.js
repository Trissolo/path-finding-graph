var path = require('path');
var expect = require('chai').expect;

var Graph = require(path.join(__dirname, '..', './graph.js'));


describe('graph', function () {
  'use strict';
  var graph;

  beforeEach(function () {
    graph = new Graph();
  });

  it('exists', function () {
    expect(graph).to.be.a('object');
  });

  it('inserts nodes', function () {
    var node1 = graph.insert();
    var node2 = graph.insert();
    expect(graph.nodes.length).to.equal(2);
  });

  it('connects nodes', function () {
    graph.insert();
    graph.insert();
    graph.connect(0, 1, 10);
    expect(graph.edges.length).to.equal(1);
    expect(graph.getNode(0).edgeTo[0].id).to.equal(1);
  });

  it('finds the shortest path', function () {
    graph.insert();
    graph.insert();
    graph.insert();
    graph.insert();
    graph.insert();
    graph.insert();
    graph.insert();
    graph.insert();
    graph.connect(0, 1, 11);
    graph.connect(0, 2, 4);
    graph.connect(1, 3, 5);
    graph.connect(2, 3, 7);
    graph.connect(3, 4, 6);
    graph.connect(3, 5, 6);
    graph.connect(4, 6, 4);
    graph.connect(4, 7, 5);
    graph.connect(5, 7, 8);
    var path = graph.findPath(0, 6);
    expect(path.length).to.equal(21);
  });

  // Add more assertions here
});
