function DistanceQueue(k) {
  this.stack = new Array(k);
  this.size = k;
}

DistanceQueue.prototype.push = function(element, distance) {
  this.stack.push({element, distance});
  // Sort ascending
  this.stack.sort((a, b) => a.distance - b.distance);
  this.stack = this.stack.splice(0, 3);
  // console.log(element, distance);
};

DistanceQueue.prototype.first = function() {
  return this.stack[0];
};

DistanceQueue.prototype.last = function() {
  return this.stack[this.stack.length - 1];
};

DistanceQueue.prototype.getStack = function() {
  return this.stack;
};

module.exports = DistanceQueue;
