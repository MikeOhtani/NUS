import { blank, square, show, heart, beside, stack} from 'rune';
    
// function f1(rune_1, n, rune_2) {
//     return n === 0
//           ? rune_2
//           : f1(rune_1, n - 1, beside(rune_1,stack(blank, rune_2)));
// }

// show(f1(square, 3, heart));
Q1: 
function f1(rune1, rune2) {
    stack(rune1, rune2);
}

function f2(rune1, rune2) {
    beside(square,f1(rune1, rune2));
}

function f3(rune1, rune2) {
    stack(blank,f2(rune1, rune2));
}

function f4(rune1, rune2) {
    beside(square,f3(rune1, rune2));
}

function f5(rune1, rune2) {
    stack(blank, f4(rune1, rune2));
}

function f6(rune1, rune2) {
    beside(square, f5(rune1, rune2));
}

show(f1(blank, heart));

// Use the substitution model on runes demonstrated during Lecture L2A in order to manually
// evaluate the expression f1(square, 3, heart). The evaluation proceeds as demonstrated
// in L2A. For the primitive rune square, you should draw a solid box ∎ and for the primitive
// rune blank, you should draw an empty box .
// Of course as the computation proceeds according to the substitution model, the pictures
// within your expressions will become more complex. Try to get the proportions right and
// draw the pictures as large as necessary.


// Q2: 

// function f1(rune_1, rune_2, rune_3) {
//     return beside(rune_1, stack(rune_2, rune_3));
// }

// function f2(rune_1, rune_2, rune_3) {
//     return beside(rune_1, stack(rune_2, f1(rune_1, rune_2, rune_3)));
// }

// function f3(rune_1, rune_2, rune_3) {
//     return beside(rune_1, stack(rune_2, f2(rune_1, rune_2, rune_3)));
// }

// function f4(rune_1, rune_2, rune_3) {
//     return beside(rune_1, stack(rune_2, f3(rune_1, rune_2, rune_3)));    
// }

// function f5(rune_1, rune_2, rune_3) {
//     return beside(rune_1, stack(rune_2, f4(rune_1, rune_2, rune_3)));    
// }
// show(f3(square, blank, heart));
