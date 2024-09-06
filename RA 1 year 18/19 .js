function foo(x, y) {
    return x === 0
         ? y === 0
         ? 1
         : foo(x, y - 1)
         : foo(x - 1, y);
}


foo(0, 2);
