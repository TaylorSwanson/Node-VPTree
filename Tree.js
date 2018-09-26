const Node = require("./Node.js");
const DistanceQueue = require("./DistanceQueue.js");

function Tree(dataset) {
  this.dataset = dataset;
}

Tree.prototype.buildIndex = function() {
  const splitQueue = [];
  this.root = new Node(this.dataset);
  splitQueue.push(this.root);

  while (splitQueue.length > 0) {
    // console.log("sq", splitQueue.length);
    const currentNode = splitQueue.splice(0, 1)[0];

    const moreNodes = currentNode.divide();
    splitQueue.unshift(...moreNodes);
  }
};

Tree.prototype.find = function(search, k) {
  let results = new Array(k);
  let tau = Infinity;

  let searchQueue = [this.root];

  const resultQueue = new DistanceQueue(k);
  const distFn = new Node().distance;

  let i = 0;
  while (searchQueue.length > 0) {
    const currentNode = searchQueue.splice(0, 1)[0];
    i++;

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

  }
  console.log("Tau", tau);
  console.log(`Searced ${i} nodes`);
  console.log("Found:", resultQueue.getStack());
};

module.exports = Tree;
