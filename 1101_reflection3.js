// const z = 1; // commend + shift + h : highlight the whole function

// function f(g) {
//     const z = 3;
//     return g(z);
// }

// f(y => y + z);

// // commend + B to the declaration of the Z.

// deffered functions means how many operations need to be executed ; e,g 1+2+sum(3), 2 deffered

// Iterative process



function sum(term, a, next, b) {
    return (a > b) 
           ? 0
           : term(a) + sum(term, next(a), next, b);
}

function iter(term, a, next, b, acc) {
    return a > b
           ? acc
           : iter(term, next(a), next, b, acc + term(a));
}

function sum_iter(term, a, next, b) {
    return iter(term, a, next, b, 0);
}

function my_sum2(n) { 
    return sum_iter(x=> x * (x + 1), 1, x=> x + 1, n);
}

my_sum2(2);