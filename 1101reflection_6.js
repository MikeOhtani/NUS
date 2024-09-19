function insert_cmp(x, xs, cmp) {
    return is_null(xs) 
           ? list(x)
           : cmp(x, head(xs)) 
           ? pair(x, xs)
           : pair(head(xs), insert_cmp(x, tail(xs), cmp));
} // (c) last case always be adjusted to cater the requirement.

function insertion_sort_cmp(xs, cmp) {
    return is_null(xs) 
           ? xs
           : insert_cmp(head(xs), 
                        insertion_sort_cmp(tail(xs), cmp),
                        cmp);
}

// Test
const xs = list(6, 3, 8, 5, 1, 9, 6, 4, 2, 7);


// insertion_sort_cmp(xs, (a, b) => a < b);
// Result: list(1, 2, 3, 4, 5, 6, 6, 7, 8, 9)

// (b)
// insertion_sort_cmp(xs, (a, b) => a >= b);
// Result: list(9, 8, 7, 6, 6, 5, 4, 3, 2, 1)

// (c)
// insertion_sort_cmp(xs, (a, b) => false);
// Result: list(7, 2, 4, 6, 9, 1, 5, 8, 3, 6) //The cmp function returns false to give reverse property.

// (d)
insertion_sort_cmp(xs, (a, b) => {
                            const a_even = a % 2 === 0;
                            const b_even = b % 2 === 0;
                            return ! a_even && b_even
                                   ? false
                                   : !a_even && !b_even
                                   ? a > b
                                   : a_even && !b_even
                                   ? true
                                   // a_even && b_even
                                   : a < b;
}
);
// Result: list(2, 4, 6, 6, 8, 9, 7, 5, 3, 1)

// Lamba expression can return a block for predicate.