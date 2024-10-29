// TASK 3

// Your array_to_stream function from TASK 1 goes here.

function array_to_stream(a) {
    
    function helper(array, n) {
        return array[n] === undefined
             ? null
             : pair(array[n], () => helper(array, n + 1));
    }
    return helper(a, 0);
}

// Your stream_to_filter function from TASK 2 goes here.

function stream_to_filter(s, src, dest) {

    function helper_anomaly (src, dest) {
        if(is_null(s)){
            dest = src;
        } else{
            copy_image(head(s), dest);
            s = stream_tail(s);
        }
    }
    return helper_anomaly;
}

// function loop(s) {
//     //Write Your Answer Here
//     function loop_helper(init_s, recursion) {
//         if (is_null(recursion)) {
//             return loop_helper(init_s, init_s);
//         } else {
//             return pair(head(recursion), () =>
//                     loop_helper(init_s, stream_tail(recursion)));
//         }
//     }
//     return loop_helper(s, s);
// }

// function loop(s){
//     return is_null(s)
//          ? loop(s)
//          : pair(head(s), () => loop(stream_tail(s)));
// }

// version 1:
// function loop(s) {
//     function help_loop(s1, s2){
//         if(is_null(stream_tail(s1))) {
//             return help_loop(s1);
//         } else {
//             return pair(head(s1), () => help_loop(stream_tail(s1)));
//         }
//     }
//     return help_loop(s, s);
// }

// // version 2:
// function loop(s) {
//     function help_loop(s1, s2){
//         if(is_null(stream_tail(s2))) {
//             return help_loop(s1, s1);
//         } else {
//             return pair(head(s2), () => help_loop(s1, stream_tail(s2)));
//         }
//     }
//     return help_loop(s, s);
// }

// version 3:
function loop(s) {
    function help_loop(s1){
        if(is_null(stream_tail(s1))) {
            return help_loop(s1);
        } else {
            return pair(head(s1), () => help_loop(stream_tail(s1)));
        }
    }
    return help_loop(s);
}

install_filter(
    stream_to_filter(
        loop(array_to_stream(anomaly_data))));

set_dimensions(WIDTH, HEIGHT);
keep_aspect_ratio(true);
set_fps(10);
start();