const Node = require("./Node.js");

function Tree(dataset) {
  this.dataset = dataset;
}

Tree.prototype.buildIndex = function() {
  this.root = new Node(this.dataset);
  this.root.divide();
};

module.exports = Tree;
