// // ACCUMULATE PRACTICE

// // Return total distance
// const road_lengths = list(2, 3, 5, 9, 10, 23);
// function distance(xs) {
//     return accumulate((x, y) => x + y, 0, xs);
// }
// distance(road_lengths);

// Return list of ratings above average (>5)

// const ratings = list(6, 8 ,2, 9, 10);
// function ratings_above_5(xs) {
    
//     return accumulate((x, y) => x > 5
//                               ? pair(x, y)
//                               : y,
//                       null,
//                       xs);
// }
// ratings_above_5(ratings);

// Use same ratings from above
// Return recommendation if all are above average (>5)
// function recommend(xs) {
//     return accumulate((x, y) => (x > 5 && y),
//                       true,
//                       xs);
// }


// function recommend(xs) {
//     return accumulate((x, y) => x > 5
//                               ? y 
//                               : false,
//                       true,
//                       xs);
// }
// const ratings = list(2, 8 ,6, 9, 10);
// recommend(ratings);

