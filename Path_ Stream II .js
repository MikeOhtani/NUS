// Path Stream II:
------------------------------------------------------------------------------
// Task 1 creat alternative function :(Solution 1, two function combination) 
// function alternating_ones() {
    
//     return pair(1, () => alternating_negative());
// }

// function alternating_negative() {
//     return pair(-1, () => alternating_ones());
// }
------------------------------------------------------------------------------
// (Solution 2, straight- away pair) 

// const alternating_ones = pair(1, () => pair(-1, () => alternating_ones));

// eval_stream(alternating_ones, 10);
------------------------------------------------------------------------------
// (Solution 3, helper function)
// function alternating_ones() {
//     function ite_alt(pos, neg, count) {
    
//         return pair((count % 2 === 0)
//                   ? neg
//                   : pos,
//                   () => ite_alt(pos, neg, count + 1));
//     }
//     return ite_alt(-1, 1, 0);
// }
------------------------------------------------------------------------------
// Task 2 stream adjustment:

// IDIOT SOLUTION 1: !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// function make_alternating_stream(s) {
//     return pair(head(s), () => pair(-head(stream_tail(s)), () => make_alternating_stream(stream_tail(stream_tail(s)))));
// }
------------------------------------------------------------------------------
// Solution 2: Stream map (fullfillment of second item):

//     return stream_map(x => (x % 2 === 0)
//                           ? -x
//                           : x,
//                           s);
// }

// Solution 3: count (fullfillment of first item):

// function make_alternating_stream(s) {
    
//     function helper(stream, n) {
//         return pair((n % 2 === 0)
//                   ? -(head(stream))
//                   : head(stream),
//                   () => helper(stream, n + 1));
//     }
//     return helper(s, 1);
// }