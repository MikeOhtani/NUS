// Q 7 
//     function twice(f) {
//     return x => f(f(x));
// }
// (twice(twice))(x => 2 * x + 1)(2);

// Q12
function f(n) {
    if (n <= 0) {
        return true;
    } else {
        return true && f(n - 1);
    }
}
/* true && : left operator evalurate sucessfully
as it is a true boolean value and continue with 
the right operator evaluation which depends on 
whether 

f(10);

// Q13
// function E(x) {
//     if (x === 1) {
//         return false;
//     } else if (x === 2) {
//         return true;
//     } else {
//         return E(x - 2);
//     }
// }

// E(1);

// Q 14 
// function M(a, b, c) {
//     if (a < b) {
//         return (a < c) ? a : c;
//     } else {
//         return (b < c) ? b : c;
//     }
// }
// M(1, 2, 3);

// Q 15
// function X(a, b) {
//     return (a !== b);
// }

// X("false", "true");

