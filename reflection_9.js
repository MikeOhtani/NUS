// Q1:
// [1,2,3,4,5,6,7,8,9,10,11,12,13,14,14,15,16,17,18,19,20];

// Q2;
// Write a function stash_numbers that takes one argument. When the function is
// applied to a number n, it should produce the numbers from 0 to n on the stash.
// function stash_number (n) {
//     const stash = [];
    
//     for(let i = 0; i <= n ; i = i + 1) {
//         stash[i] = i;
//     }
//     return stash;
// }
// stash_number(20);

// // alternative
// function stash_numbers(n) {
//     return f(n, 0);
// }

// function f(n, i) {
//     return i === n
//           ? i
//           : i + f(n, i + 1);
// }

//Q3

// break points at the left number lsit to jump the position in the environment.

//Q4: // 
// function return function return function

// function object becomes grey means it is inaccessible and cannot be used anymore.
// Q5 :

// infinite branch :
function pred() {
    return pred()
         ? true 
         : true;
}
pred();

// function pred(i) {
//     return i === 0
//          ? true 
//          : i(i - 1) ?true : true;
// }
// pred(20);
