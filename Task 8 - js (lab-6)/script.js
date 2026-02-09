const Rectangle = function (width, height) {
  this.width = width;
  this.height = height;
};
const rect = new Rectangle(3, 4);
console.log(rect.width);

Rectangle.prototype.getArea = function () {
  return this.width * this.height;
};

Rectangle.isSquare = function () {
  return this.width === this.height;
};
console.log(Rectangle.isSquare());
