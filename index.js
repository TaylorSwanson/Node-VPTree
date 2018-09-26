const crypto = require("crypto");

const Tree = require("./Tree.js");
const Element = require("./Element.js");
const Node = require("./Node.js");

const dataset = [];

const datasize = 32;

console.log("Building dataset");

for (var i = 0; i < 100000; i++) {
  const buf = crypto.randomBytes(datasize);
  const val = buf.toString("hex");

  dataset.push(new Element(val, buf));
}

console.log("Building tree");

const tree = new Tree(dataset);

tree.buildIndex();

const search = crypto.randomBytes(datasize);
console.log("Searching for ", search.toString("hex"));

let d = new Date();
tree.find(search);

console.log("Search took", (new Date().getTime() - d.getTime()), "ms");
