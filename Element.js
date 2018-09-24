// Position has to be a buffer of bytes representing n dimensions
function Element(value, position) {
  this.value = value;
  this.position = position;
}

Element.prototype.setValue = function(val) {
  this.value = val;
}

Element.prototype.setPosition = function(pos) {
  this.position = pos;
}

Element.prototype.getPosition = function() {
  return this.position;
}

Element.prototype.getValue = function() {
  return this.value;
}

module.exports = Element;
