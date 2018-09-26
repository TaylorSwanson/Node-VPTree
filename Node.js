function Node(data) {
  this.data = data;
  this.vp = null;
  this.mu = 0.0;
  this.inside = [];
  this.outside = [];
}

Node.prototype.getVP = function() {
  return this.vp;
};

Node.prototype.getData = function() {
  return this.data;
};

// Compare distance between buffer's bytes
// One byte is one dimension in this space
// Standard Euclidean distance
Node.prototype.distance = function(a, b) {
  let edge = 0.0;
  for (var i = 0; i < a.length; i++) {
    edge += Math.pow((b[i] - a[i]), 2);
  }
  return Math.sqrt(edge);
};

Node.prototype.divide = function() {
  // Don't divide once we've reached the bottom
  if (!this.data.length) return;

  // Select initial point
  // Pick initial element randomly
  this.vp = this.data[Math.floor(this.data.length * Math.random())];
  const vpPos = this.vp.getPosition();

  // We're gonna compute the average
  let totalDistance = 0;

  // Find median radius for roughly equal split
  this.data.forEach((element) => {
    if (element.getPosition() == vpPos) return;
    const pos = element.getPosition();
    totalDistance += this.distance(pos, vpPos);
  });

  this.mu = totalDistance / this.data.length;

  // Subdivide
  this.data.forEach((element) => {
    if (element.getPosition() == vpPos) return;

    if (this.distance(element.getPosition(), vpPos) > this.mu) {
      return this.outside.push(element);
    }

    this.inside.push(element);
  });

  // Create nodes for inside/outside
  const tasks = [];

  if (this.inside.length > 0) {
    this.inside = new Node(this.inside);
    tasks.push(this.inside);
  }
  if (this.outside.length > 0) {
    this.outside = new Node(this.outside);
    tasks.push(this.outside);
  }
  return tasks;
};

module.exports = Node;
