function Node(data) {
  this.data = data;
  this.vp = {};
  this.mu = 0.0;
  this.inside = [];
  this.outside = [];
}

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

  // console.log("Chose vp", this.vp);

  // We're gonna compute the average
  let totalDistance = 0;

  // Find median radius for 50/50 split
  this.data.forEach((element) => {
    const pos = element.getPosition();
    debugger;
    totalDistance += this.distance(pos, vpPos);
  });

  console.log("td", totalDistance, this.data.length);

  const avgDistance = totalDistance / this.data.length;

  // Subdivide
  this.data.forEach((element) => {
    if (this.distance(element.getPosition(), vpPos) > avgDistance) {
      return this.outside.push(element);
    }

    this.inside.push(element);
  });

  console.log(this.data.length, this.inside.length, this.outside.length, avgDistance);

  // Create nodes for inside/outside
  this.inside = new Node(this.inside);
  this.outside = new Node(this.outside);

  // Recurse
  this.inside.divide();
  this.outside.divide();
};

module.exports = Node;
