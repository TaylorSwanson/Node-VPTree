const crypto = require("crypto");

const Tree = require("./Tree.js");
const Element = require("./Element.js");
const Node = require("./Node.js");

const dataset = [];

console.log("Building dataset");

for (var i = 0; i < 1000; i++) {
  const buf = crypto.randomBytes(4);
  const val = buf.toString("hex");

  dataset.push(new Element(val, buf));
}

console.log("Building tree");

const tree = new Tree(dataset);

tree.buildIndex();

const search = crypto.randomBytes(4);
console.log("Searching for ", search.toString("hex"));

tree.find(search);
