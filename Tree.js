const Node = require("./Node.js");
const DistanceQueue = require("./DistanceQueue.js");

function Tree(dataset) {
  this.dataset = dataset;
}

Tree.prototype.buildIndex = function() {
  this.root = new Node(this.dataset);
  this.root.divide();
};

Tree.prototype.find = function(search, k) {
  let results = new Array(k);
  let tau = Infinity;

  let searchQueue = [this.root];

  const resultQueue = new DistanceQueue(k);
  const distFn = new Node().distance;

  while (searchQueue.length > 0) {
    const currentNode = searchQueue.splice(0, 1)[0];

    if (currentNode instanceof Array) continue;

    const dist = distFn(search, currentNode.getVP().getPosition());

    if (currentNode.getData().length == 1) {
      resultQueue.push(currentNode.getData()[0], dist);
    }

    if (dist < tau) {
      searchQueue.push(currentNode.inside);
      searchQueue.push(currentNode.outside);
      tau = dist;
      continue;
    }

    if (dist < currentNode.mu + tau) {
      tau = dist;

      if (currentNode.inside.length == 1) {
        resultQueue.push(currentNode.inside.data);
      } else {
        searchQueue.push(currentNode.inside);
      }
      continue;
    }

    if (dist >= currentNode.mu - tau) {
      if (currentNode.outside.length == 1) {
        resultQueue.push(currentNode.outside.data);
      } else {
        searchQueue.push(currentNode.outside);
      }
      continue;
    }

    // console.log("Tau", tau);
  }
  console.log("Found:", resultQueue.getStack());
};

module.exports = Tree;
