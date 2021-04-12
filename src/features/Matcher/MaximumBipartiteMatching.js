export default class MaximumBipartiteMatching {
  constructor() {
    this.reset();
  }

  addLinks(x, y) {
    if (this.links.has(x)) {
      this.links.get(x).push(y);
    } else {
      this.links.set(x, [y]);
    }

    if (!this.matchedX.has(x) && !this.notMatchedX.has(x)) {
      this.notMatchedX.add(x);
    }

    this.index = 0;
    console.log(this.notMatchedX);
    this.notMatchedXList = Array.from(this.notMatchedX);
    console.log(this.notMatchedXList);
  }

  hasNextStep() {
    return this.index !== this.notMatchedXList.length;
  }

  check(x) {
    if (!this.links.has(x)) {
      return false;
    }
    for (let y of this.links.get(x)) {
      if (!this.seen.has(y)) {
        this.seen.add(y);
        if (!this.matches.has(y) || this.check(this.matches.get(y))) {
          this.matches.set(y, x);
          return true;
        }
      }
    }
    return false;
  }

  next() {

    if (this.index >= this.notMatchedXList.length) {
      return [undefined, false];
    }

    this.seen.clear();
    const current = this.notMatchedXList[this.index];
    const succeeded = this.check(current);
    if (succeeded) {
      this.matchedX.add(current);
      this.notMatchedX.delete(current);
    }
    this.index++;
    if (this.index === this.notMatchedXList.length) {
      this.notMatchedXList = Array.from(this.notMatchedX);
    }
    return [current, succeeded]
  }

  update() {
    while (this.index < this.notMatchedXList.length) {
      this.next();
    }
  }

  getValid() {
    return Array.from(this.matches, ([name, value]) => ([value, name]));
  }

  reset() {
    this.links = new Map();
    this.matches = new Map();
    this.seen = new Set();
    this.matchedX = new Set();
    this.notMatchedX = new Set();
    this.notMatchedXList = [];
    this.index = 0;
  }
}
