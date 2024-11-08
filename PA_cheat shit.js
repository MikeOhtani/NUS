
-------Property check function:--------

is_array
is_boolean
is_function
is_list
is_null
is_number
is_pair
is_stream
is_string
is_undefined
equal

-------length function:---------

array_length
length
stream_length

------data creation function:-------

build_list
build_stream
enum_list 
enum_stream
integers_from // stream 
list_to_stream
list_to_string

----data location function----:

member // return null, if didnt find the element in the list; otherwise, return the wanted list which starts with the seraching element
//      member(1, list(1, 2, 3)) ===> return list(1, 2, 3)
//      member(2, list(1, 2, 3)) ===> return list(2, 3);

remove // remove the first unwanted element in the list
//     remove(1, list(1, 2, 3)) ===> list(2, 3)

remove_all // remove all the unwanted element in the list
//     remove(1, list(1, 2, 1, 3, 1) ===> list(2, 3);

char_at
eval_stream
list_ref
append

set_head
set_tail

stream_append
stream_filter
stream_map
stream_member
stream_ref
stream_remove
stream_remove_all
stream_reverse
stream_tail
stringify

-------math function:--------

math_abs
math_ceil
math_cos
math_exp
math_floor
math_fround
math_log
math_max
math_min
math_PI
math_pow
math_random
math_round
math_sin
math_sqrt
stream

--------------------------------------------------------------------------------
--------------------------------------------------------------------------------

// PA1 Task 1A:

// const klist0 = 234;  // k-list of depth 0

// const klistA = list(0, 6, 3, 1);  // k-list of degree 4 and depth 1

// const klistB = list(list(0, 6, 3), list(8, 6, 10), list(5, 1, 25));
//               // k-list of degree 3 and depth 2

// const klistC = list(list(list(1, 2), list(3, 4)),
//                     list(list(5, 6), list(7, 8)));
//               // k-list of degree 2 and depth 3
               
               
//make_k_list takes as arguments a positive integer k and a non-negative integer d, 
//and returns a k-list of degree k and depth d. The numbers in the k-list must all be 0.

// degree refers to the element in each list and depth refers to the number of list structures;

function make_k_list(k, d) {
    if (d === 0) {
    return 0;
    } else {
    let klist = null;
    for (let i = 0; i < k; i = i + 1) {
     klist = pair(make_k_list(k, d - 1), klist);
    }
    return klist;
    }
}

function make_k_list(k, d) {
    if(d === 0) {
        return 0;
    } else if (k === 0) {
        return null;
    } else {
        
        const k_list = pair(0, make_k_list(k - 1, d));
        return map(x => make_k_list(k, d - 1), k_list);
        
    }
}

--------------------------------------------------------------------------------

//PA1 Task 1B (Accumulate_tree):

// const klistB = list(list(0, 6, 3), list(8, 6, 10), list(5, 1, 25));
// sum_k_list(klistB); // returns 64

function sum_k_list(klist) {

    function accumulate_tree(f, op, initial, tree) {
        return accumulate((x, ys) => !is_list(x)
                                  ? op(f(x), ys)
                                  : op(accumulate_tree(f, op, initial, x), ys),
                          initial,
                          tree );
    }
    return !is_list(klist) ? klist : accumulate_tree(x => x, (x, y) => x + y, 0, klist);
}

--------------------------------------------------------------------------------

// //PA1 Task 1C (Map_tree application for tree structure)

function map_k_list(f, klist) {

    function map_tree(f, tree) {
        return map(sub_tree =>
                  !is_list(sub_tree)
                 ? f(sub_tree)
                 : map_tree(f, sub_tree) , tree); 
    }
    return is_list(klist) ? map_tree(f, klist) : f(klist);
}

--------------------------------------------------------------------------------
--------------------------------------------------------------------------------

// PA2 
// Task 1A: (subtraction of list element)

function delta_encode(L) {
    
    function helper(xs) {
    return is_null(tail(xs))
         ? null
         : pair((head(tail(xs)) - head(xs)), helper(tail(xs)));
    }
    if (is_null(L)) {
        return null;
    } else if (length(L) < 2) {
        return L;
    } else {
        return pair(head(L), helper(L));
    }
}

// delta_encode(list(3,4,6,-2,-2)) (head is the same while the next element is the substraction of previous element from current)
//      returns list(3,1,2,-8,0)

--------------------------------------------------------------------------------

// PA2 Task 1B (partial sum for list):

// which first element is the same as the input list while
// the rest of the element is the sum up of the elements up to that element in the input stream 

function delta_encode(L) {

    // WRITE YOUR SOLUTION HERE.
        function helper(xs) {
        return is_null(tail(xs))
             ? null
             : pair((head(tail(xs)) - head(xs)), helper(tail(xs)));
    }
    if (is_null(L)) {
        return null;
    } else {
        return pair(head(L), helper(L));
    }
}

// delta_decode(list(3,1,2,-8,0)）
//       return list(3,4,6,-2,-2)
     
--------------------------------------------------------------------------------

//PA2 Task 2A (transfer list to list contains pair which record the repeated number in the list)

function runlength_encode(L) {

    function encode(val, count, next) {
        return is_null(next)
             ? list(count === 1 ? val : pair(val, count))
             : head(next) === val
             ? encode(val, count + 1, tail(next))
             : pair(count === 1 ? val : pair(val, count),
                    encode(head(next), 1, tail(next)));
    } return is_null(L)
           ? null
           : encode(head(L), 1, tail(L));
}

//runlength_encode(list(6,5,5,9,7,7,5,5,5));
    // returns list(6, [5,2], 9, [7,2], [5,3])

--------------------------------------------------------------------------------

//PA2 Task 2B (transfer list contains pair(which record the repeated number) 
// into list with only elements)

function runlength_decode(R) {

    function helper_decode(xs, count){
        if (is_null(xs)) {
            return null;
        } else if (is_pair(head(xs))) {
            if(count < tail(head(xs))) {
                return pair(head(head(xs)), helper_decode(xs, count + 1));
            }
            else {
                return pair(head(head(xs)), helper_decode(tail(xs), 1));
            }
        } else {
            return pair(head(xs), helper_decode(tail(xs), 1));
        }
    }
    
    if(is_null(R)) {
        return null;
    } else {
        return helper_decode(R, 1);
    }
}

// runlength_decode(list(6, [5,2], 9, [7,2], [5,3]));
         // returns list(6,5,5,9,7,7,5,5,5)

--------------------------------------------------------------------------------
--------------------------------------------------------------------------------

//PA3 Task 1A (find element inside the list or not)
function is_pa_word(s) {

    const pa_length = length(pa_words);
    let existence = false;
    for (let i = 0; i < pa_length; i = i + 1) {
    
        if(s === list_ref(pa_words, i)) {
            existence = true;
            break;
        } 
    }return existence;
}

function is_pa_word(s) {
    function helper(pa, cur) {
        if (is_null(pa)) {
            return false;
        } else if (s === head(pa)) {
            return true;
        } else {
            return helper(tail(pa), s);
        }
    }
    return helper(pa_words, s);
}

// easier way to find whether a element is inside the list.
function is_pa_word(s) {

    return !is_null(member(s, pa_words));
}


--------------------------------------------------------------------------------

//PA 3 Task 1B (filter out the the element inside the list which does not has the char at the given position, and return )

function count_matches(char, pos) {
    
    if (char === undefined) {
        return false;
    } else {
        return length(filter(x => char_at(x, pos) === char, pa_words));
    }
}

// count_matches("y", 26) === 1 (since this condition only appears once).

--------------------------------------------------------------------------------

//PA 3 Task 1C (return a stream which takes character of a string as head)

function stream_string(s, count) {
    const c = char_at(s, count);
    return is_null(c)
         ? null 
         : pair(c, () => stream_string(s, count + 1));
}

function char_stream(s) {
    // your solution goes here
    return stream_string(s, 0);
}


--------------------------------------------------------------------------------

//PA 3 Task 1D:

// apply accumulate two filters to every elements (filter the list inside a list).
function solve(n, constraints) {
return accumulate((x, y) => filter(s => char_at(s, head(x)) === tail(x), y),
        filter(s => string_length(s) === n, pa_words),
        constraints);
}

--------------------------------------------------------------------------------
--------------------------------------------------------------------------------

//PA 4 Task 1A"

function split(S) {
    
    // WRITE YOUR SOLUTION HERE.
    if (!is_string(S)){
        return [];
    }else {
    let new_arr = [];
    for (let i = 0; char_at(S, i) !== undefined; i = i + 1) {
        new_arr[i] = char_at(S, i);
        }return new_arr;
    }
}

--------------------------------------------------------------------------------

// PA 4 TASK 1B：

// method 1 (count approach):

function helper_count(Arr1, Arr2, count) {
    
    const len1 = array_length(Arr1);
    const len2 = array_length(Arr2);
    
    for (let i = 0; i < len1; i = i + 1) {
        for (let k = 0; k < len2; k = k + 1) {
            if(Arr1[i] === Arr2[k]) {
                count = count + 1;
            }
        }
    }return count;
}
// array length is always 1 more than the index. 

function num_characters_from(A, B) {
    
    // WRITE YOUR SOLUTION HERE.
    if (array_length(A) === 0 || array_length(B) === 0){
        return 0;
    } else if (array_length(A) > array_length(B)) {
        return helper_count(A, B, 0);
    }
}

--------------------------------------------------------------------------------

// PA 4 TASK 1C

// You may write helper functions here.
function helper(Arr1, count){
    const Arr_len = array_length(Arr1);
    let occurrence = false;
    
    for (let i = 0; i < Arr_len; i = i + 1) {
        
        let head_arr = Arr1[i];
        
        for (let k = 0; k < Arr_len - i; k = k + 1){
            if(head_arr === occurrence) {
                occurrence = head_arr;
                break;
            }
            else if(head_arr === Arr1[i] ) {
                occurrence = head_arr;
                count = count + 1;
            }
        }
    }return count;
}


function num_unique(A) {

    // WRITE YOUR SOLUTION HERE.
    if(array_length(A) === 0) {
        return 0;
    } else {
        return helper(A, 0);
    }

}

num_unique(["o", "c", "c", "u", "r", "r", "e", "n", "c", "e"]);

--------------------------------------------------------------------------------

// PA 4 Task 1D


--------------------------------------------------------------------------------
--------------------------------------------------------------------------------
--------------------------------------------------------------------------------
--------------------------------------------------------------------------------
--------------------------------------------------------------------------------
--------------------------------------------------------------------------------
--------------------------------------------------------------------------------
--------------------------------------------------------------------------------
// 
/* 
// 2D Array Sample For Loop
let array = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
const rows = array_length(array); // display every number in the 2D array
const columns = array_length(array[0]);
for (let r = 0; r < rows; r = r + 1) {
    for (let c = 0; c < columns; c = c + 1) {
        array[r][c];
    }
}
--------------------------------------------------------------------------------
--------------------------------------------------------------------------------
// sorting_function


//Binary Search (taking Array A and integer v, to search whether v is inside Array A)- For 1D Array only (Recursion) 

function binary_search(A, v) {
    function search(low, high) {
        if (low > high) {
            return false;
        } else {
            const mid =
                math_floor((low + high) / 2);
            return (v === A[mid]) ||
                (v < A[mid] ?
                    search(low, mid - 1) :
                    search(mid + 1, high));
        }
    }
    return search(0, array_length(A) - 1);
}
binary_search([1,2,3], 2);


// Binary Search - For 1D Array only (Loop)

function binary_search(A, v) {
    let low = 0;
    let high = array_length(A) - 1;
    while (low <= high) {
        const mid = math_floor((low + high) / 2);
        if (v === A[mid]) {
            break;
        } else if (v < A[mid]) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return (low <= high);
}

--------------------------------------------------------------------------------
// Insertion Sort (List)

function insert(x, xs) {
    return is_null(xs) ?
        list(x) :
        x <= head(xs) ?
        pair(x, xs) :
        pair(head(xs), insert(x, tail(xs)));
}

function insertion_sort(xs) { // Main function to be called
    return is_null(xs) ?
        xs :
        insert(head(xs), insertion_sort(tail(xs)));
}

// Insection Sort (1D Array) 

// Swap for Array position 

function swap(A, x, y) {
const temp = A[x];
A[x] = A[y];
A[y] = temp;
}

function insertion_sort(A) {
    const len = array_length(A);
    for (let i = 1; i < len; i = i + 1) {
        let j = i - 1;
        while (j >= 0 && A[j] > A[j + 1]) {
            swap(A, j, j + 1);
            j = j - 1;
        }
    }
    return A;
}

function insertion_sort2(A) {
    const len = array_length(A);
    for (let i = 1; i < len; i = i + 1) {
        const x = A[i];
        let j = i - 1;
        while (j >= 0 && A[j] > x) {
            A[j + 1] = A[j];
            j = j - 1;
        }
        A[j + 1] = x;
    }
    return A;
}

--------------------------------------------------------------------------------

// Merge Sort (List)
function middle(n) {
    return math_floor(n / 2);
}

function take(xs, n) {
    return n === 0 ?
        null :
        pair(head(xs),
            take(tail(xs), n - 1));
}

function drop(xs, n) {
    return n === 0 ? xs :
        drop(tail(xs), n - 1);
}

function merge(xs, ys) {
    if (is_null(xs)) {
        return ys;
    } else if (is_null(ys)) {
        return xs;
    } else {
        const x = head(xs);
        const y = head(ys);
        return x < y ?
            pair(x, merge(tail(xs), ys)) :
            pair(y, merge(xs, tail(ys)));
    }
}

function merge_sort(xs) {
    if (is_null(xs) || is_null(tail(xs))) {
        return xs;
    } else {
        const mid = middle(length(xs));
        return merge(merge_sort(take(xs, mid)), merge_sort(drop(xs, mid)));
    }
}

--------------------------------------------------------------------------------

// Merge Sort (Array)
function merge_sort(A) {
    MSH(A, 0, array_length(A) - 1);
    return A;
}

function MSH(A, low, high) {
    if (low < high) {
        const mid =
            math_floor((low + high) / 2);
        MSH(A, low, mid);
        MSH(A, mid + 1, high);
        merge(A, low, mid, high);
    }
}
    function merge(A, low, mid, high) {
        const B = [];
        let left = low;
        let right = mid + 1;
        let Bidx = 0; //B-index
        while (left <= mid && right <= high) {
            if (A[left] <= A[right]) {
                B[Bidx] = A[left];
                left = left + 1;
            } else {
                B[Bidx] = A[right];
                right = right + 1;
            }
            Bidx = Bidx + 1;
        }
        while (left <= mid) {
            B[Bidx] = A[left];
            Bidx = Bidx + 1;
            left = left + 1;
        }
        while (right <= high) {
            B[Bidx] = A[right];
            Bidx = Bidx + 1;
            right = right + 1;
        }
        for (let k = 0; k < high - low + 1; k = k + 1) {
            A[low + k] = B[k];
        }
    }
    
--------------------------------------------------------------------------------

// Selection Sort (List)
function smallest(xs) {
    return accumulate(
        (x, y) => x < y ? x : y,
        head(xs), tail(xs));
}

function selection_sort(xs) {
    if (is_null(xs)) {
        return xs;
    } else {
        const x = smallest(xs);
        return pair(x, selection_sort(remove(x, xs)));
    }
}

--------------------------------------------------------------------------------

// Selection Sort (Array)
function find_min_pos(A, low, high) {
    let min_pos = low;
    for (let j = low + 1; j <= high; j = j + 1) {
        if (A[j] < A[min_pos]) {
            min_pos = j;
        }
    }
    return min_pos;
}

function selection_sort(A) {
    const len = array_length(A);
    for (let i = 0; i < len - 1; i = i + 1) {
        let min_pos =
            find_min_pos(A, i, len - 1);
        swap(A, i, min_pos);
    }
    return A;
}

function swap(A, x, y) {
const temp = A[x];
A[x] = A[y];
A[y] = temp;
}

--------------------------------------------------------------------------------

// Quick Sort
function partition(xs, p) {
    const small_equal = filter(y => y <= p, xs);
    const bigger = filter(y => y > p, xs);
    return pair(small_equal, bigger);
}

function quicksort(xs) {
    if (is_null(xs) || is_null(tail(xs))) {
        return xs;
    } else {
        const sort_left = quicksort(head(partition(tail(xs), head(xs))));
        const sort_right = quicksort(tail(partition(tail(xs), head(xs))));
        return append(sort_left, pair(head(xs), sort_right));
    }
}

--------------------------------------------------------------------------------

// Bubble Sort - (list)
function bubblesort_list(L) {
    const len = length(L);
    for (let i = len - 1; i >= 1; i = i - 1) {
        let p = L;
        for (let j = 0; j < i; j = j + 1) {
            if (head(p) > head(tail(p))) {
                const temp = head(p);
                set_head(p, head(tail(p)));
                set_head(tail(p), temp);
            }
            p = tail(p);
        }
    }
    return L;
}

// Bubble Sort - (Array)
function bubblesort_array(A) {
    let clone = A;
    const len = array_length(A);
    for (let i = len - 1; i >= 1; i = i - 1) {
        for (let j = 0; j < i; j = j + 1) {
            if (clone[j] > clone[j + 1]) {
                const temp = clone[j];
                clone[j] = clone[j + 1];
                clone[j + 1] = temp;
            }
        }
    }
    return clone;
}

--------------------------------------------------------------------------------

// Linear Search 
function linear_search(A, v) {
    const len = array_length(A);
    let i = 0;
    while (i < len && A[i] !== v) {
        i = i + 1;
    }
    return (i < len);
}

-------------------------------------------------------------------------------

// General Meoization function (must use lamba expression for parameter f)

function memoize(f) {
    const mem = [];
    
    function mf(x) {
        if (mem[x] !== undefined) {
            return mem[x];
        } else {
            const result = f(x);
            mem[x] = result;
            return result;
        }
    }
    
    return mf;
}

// Constant Tribonacci E.g memoize(trib)(7)

const trib = (n => n === 0 ? 0 
                 : n === 1 ? 1
                 : n === 2 ? 1
                 : trib(n - 1) + trib(n - 2) + trib(n - 3));

// Constant Fibonacci E.g memoize(fib)(7)

const fib = (n => n === 0 ? 0 
                : n === 1 ? 1
                : fib(n - 1) + fib(n - 2));

---------------------------------------------------------------------------------

// Coins - combination (Memoization) (finding how many coins combination to reach the amount based on the given coin types)

function read(n, k) {
    return mem[n] === undefined ? undefined : mem[n][k];
}

function write(n, k, value) {
    if (mem[n] === undefined) {
        mem[n] = [];
    }
    mem[n][k] = value;
}

function first_denomination(kinds_of_coins) {
    
    return kinds_of_coins === 1 ? 5  : 
           kinds_of_coins === 2 ? 10 :
           kinds_of_coins === 3 ? 20 :
           kinds_of_coins === 4 ? 50 :
           kinds_of_coins === 5 ? 100: 0;
       
}

function mcc(n, k) {
    if (n >= 0 && k >= 0 && read(n, k) !== undefined) {
        return read(n, k);
    } else {
        const result = n === 0 ? 1 : n < 0 || k === 0 ? 0 : mcc(n, k - 1) + mcc(n - first_denomination(k), k);
        if (n >= 0 && k >= 0) {
            write(n, k, result);
        }
        return result;
    }
} // mcc(365, 5)  365 is amount in cent and 5 is the maximum coin type which corresponds 100 cents


--------------------------------------------------------------------------------
--------------------------------------------------------------------------------
// List_function

// Subsets (return all the subset starting from last element in the list then to the front.)
function subsets(xs) {
    if (is_null(xs)) {
        return list(null);
    } else {
        const rest = subsets(tail(xs));
        const x = head(xs);
        const hasx = map(s => pair(x, s), rest);
        return append(rest, hasx);
    }
}

/* subsets (list(1, 2, 3)) ---> list(list(3), 
                                     list(2), 
                                     list(2, 3), 
                                     list(1), 
                                     list(1, 2), 
                                     list(1, 3), 
                                     list(1, 2, 3)) 
       
--------------------------------------------------------------------------------

// Subsets_2
function subsets_2(xs) {
    return accumulate(
        (x, ss) => append(ss,
            map(s => pair(x, s), ss)),
        list(null),
        xs);
}

--------------------------------------------------------------------------------

// permutations (give all the lists which an original list can be arranged)

// E.g permutations(list(1, 2, 3))===> list(list(1, 2, 3),
                                          //list(1, 3, 2),
                                          //list(2, 1, 3),
                                          //list(2, 3, 1),
                                          //list(3, 1, 2),
                                          //list(3, 2, 1))
                             
function permutations(s) {
    return is_null(s) ?
        list(null) :
        accumulate(append, null,
            map(x => map(p => pair(x, p),
                    permutations(remove(x, s))),
                s));
}

--------------------------------------------------------------------------------

// combinations (take a list xs and return a list of list combinations which the list element is based on the integer r)

// combinations(list(1, 2, 3), 1) ===> list(list(1), list(2), list(3))

// combinations(list(1, 2, 3), 2) ===> list(list(1, 2), list(1, 3), list(2, 3))

// combinations(list(1, 2, 3), 3) ===> list(list(1, 2, 3));

function combinations(xs, r) {
    if ((r !== 0 && xs === null) || r < 0) {
        return null;
    } else if (r === 0) {
        return list(null);
    } else {
        const no_choose = combinations(tail(xs), r);
        const yes_choose = combinations(tail(xs), r - 1);
        const yes_item = map(x => pair(head(xs), x),
            yes_choose);
        return append(no_choose, yes_item);
    }
}

--------------------------------------------------------------------------------

// BST to list
function BST_to_list(bst) {
    if (is_null(bst)) {
        return null;
    } else {
        const ltree = head(tail(bst));
        const num = head(bst);
        const rtree = head(tail(tail(bst)));
        return append(BST_to_list(ltree),
            pair(num, BST_to_list(rtree)));
    }
}

function is_empty_tree(bst) {
    return is_null(bst);
}

function is_tree(bst) {
    return is_list(bst);   
}

function left_branch(bst) {
    return list_ref(bst, 1);    
}

function entry(bst) {
    return is_null(bst) ? bst : head(bst);
}

function right_branch(bst) {
    return list_ref(bst, 2);
}

function make_empty_tree() {
    return null;
}

function make_tree(value, left, right) {
    return list(value, left, right);
}

--------------------------------------------------------------------------------

// take a list c and return a list of list combinations which the element will sum up to x

// list_combiination_sum(1, list(1, 2, 3, 4)) ===> list(list(1));

// list_combination_sum(5, list(1, 2, 3, 4)) ===> list(list(2, 3), list(1, 4));

function list_combination_sum(sum, c) {
    if (sum === 0) {
        return list(null);
    } else if (sum < 0 || is_null(c)) {
        return null;
    } else {
        const A = list_combination_sum(sum, tail(c));
        const B = list_combination_sum(sum - head(c), tail(c));
        const C = map(sum => pair(head(c), sum), B);
        return append(A, C);
    }
}

--------------------------------------------------------------------------------

// take a list and return a list with first element to be even rank sum, and second to be old rank sum (list rank starts from index 0)

// sum_even_old(list(1, 2, 3, 4)) ===> list(4, 6);

function sum_even_old(xs) {
    if (is_null(xs)) {
        return list(0, 0);
    } else if (is_null(tail(xs))) {
        return list(head(xs), 0);
    } else {
        const wish = sum_even_old(tail(tail(xs)));
        return list(head(xs) + head(wish), head(tail(xs)) + head(tail(wish)));
    }
}

sum_even_old(b);

--------------------------------------------------------------------------------

// Remove Duplicates in list 

// remove_duplicates(list(1,1,3,4,4,5)) ===> list(1, 3, 4, 5)

function remove_duplicates(lst) {
    return is_null(lst) ?
        null :
        pair(
            head(lst), remove_duplicates(
                filter(x => !equal(x, head(lst)),
                    tail(lst))));
}

function remove_duplicates(lst) {
    return accumulate(
        (x, xs) => is_null(member(x, xs)) ?
        pair(x, xs) :
        xs,
        null, lst);
}

--------------------------------------------------------------------------------
--------------------------------------------------------------------------------
// Array_functions

function accumulate_array(op, init, A) {
    let x = init;
    for (let i = init; i < array_length(A); i = i + 1) { 
        x = op(x, A[i]);
    }
    return x;
}

// accumulate_array((x, y) => x + y, 0, [1, 2, 3, 4]) ======> 10 ( sum of all element in the array)

--------------------------------------------------------------------------------

function map_array(f, arr) {
    for (let i = 0; i < array_length(arr); i = i + 1) {
        arr[i] = f(arr[i]);
    }
    return arr;
}

--------------------------------------------------------------------------------

function filter_array(pred, A) {
    let filtered_A = [];
    
    for (let i = 0; i < array_length(A); i = i + 1) {
        if (pred(A[i])) {
            filtered_A[array_length(filtered_A)] = A[i];
        } else {}
    }
    return filtered_A;
}
//filter_array(x => x % 2 === 0, [1, 2, 3, 4]) ===> [2, 4]

--------------------------------------------------------------------------------

// Array-copying function 

// take an 1D array A and return a new array B which has the same elements in A ( A is not changing).

function copy_array(A) {
    const len = array_length(A);
    const B = [];
    for (let i = 0; i < len; i = i + 1) {
        B[i] = A[i];
    }
    return B;
    
}

--------------------------------------------------------------------------------
// Array element swap function 

// swap the elementa inside a 1D Array 
function swap(A, x, y) {
    const temp = A[x];
    A[x] = A[y];
    A[y] = temp;
}

// swap([1, 2, 3, 4], 1, 2) ===> [1, 3, 2, 4]

--------------------------------------------------------------------------------

function add_element_to_back(element, arr) {
    const len = array_length(arr);
    arr[len] = element;
    return arr;
}

// add_element_to_back(3, [1, 2, 3, 4]);===> [1, 2, 3, 4, 3]

--------------------------------------------------------------------------------

// Build a new array with n element where the first element starts from 0 
function build_array(n, f) {
    const A = [];
    for (let i = 0; i < n; i = i + 1) {
        A[i] = f(i);
    }
    return A;
}

// build_array(5, x => x); ===> [0, 1, 2, 3, 4] 

--------------------------------------------------------------------------------

// transfer a 1D Array A to list 
function array_to_list(A) {
    const len = array_length(A);
    let L = null;
    for (let i = len - 1; i >= 0; i = i - 1) {
        L = pair(A[i], L);
    }
    return L;
}

--------------------------------------------------------------------------------

// transfer a list L to a 1D Array 
function list_to_array(L) {
    const A = [];
    let i = 0;
    for (let p = L; !is_null(p); p = tail(p)) {
        A[i] = head(p);
        i = i + 1;
    }
    return A;
}

// list_to_array(list(1, 2, 3, 4 )) ===> [1, 2, 3 ,4]

--------------------------------------------------------------------------------

// take whatever Array arr into a 1D array which contains all the elements in Array arr
function flatten_array(arr) {
    let index_count = 0;
    let result = [];

    function helper(a) {
        const len = array_length(a);
        for (let i = 0; i < len; i = i + 1) {
            const curr = a[i];
            if (is_array(curr)) {
                helper(curr);
            } else {
                result[index_count] = curr;
                index_count = index_count + 1;
            }
        }
        return result;
    }
    return helper(arr);
}

//flatten_array([ [1, 2, 3], [1, 2 ,[1, 2, 3]], [1, 2, 3] ]);

         //===>  [1, 2, 3, 1, 2, 1, 2, 3, 1, 2, 3]
         
--------------------------------------------------------------------------------

function flatten_binary_tree: （PA 4 Qn6)

function flatten_bin_tree(T) {
    return is_null(T)
    ? null
    : append(flatten_bin_tree(list_ref(T, 1)),
    pair(head(T), flatten_bin_tree(list_ref(T, 2))));
}

--------------------------------------------------------------------------------
// take two whatever Arrays arr1 and arr2, and return a 1D Array which takes all elements from arr1 first and arr2 after.
function append_array(arr1, arr2) {
    let final = [];
    for (let i = 0; i < array_length(arr1); i = i + 1) {
        final[i] = arr1[i];
    }
    for (let j = 0; j < array_length(arr2); j = j + 1) {
        final[j + array_length(arr1)] = arr2[j];
    }
    return final;
}

// append_array(arr1: [1, 2, [3, 4], 4],    arr2: [1, 2, [1, 2], 4, [2, [2, 4]]]);

         //===> [1, 2, [3, 4], 4, 1, 2, [1, 2], 4, [2, [2, 4]]]
        
--------------------------------------------------------------------------------

// take whatever Array arr and return a new reversed version without changing the original Array structure
function arr_reverse(arr) {
    const reversed_arr = [];
    const len = array_length(arr);
    for (let i = 0; i < len; i = i + 1) {
        reversed_arr[len - i - 1] = arr[i];
    }
    return reversed_arr;
}

// arr_reverse([1, 2, 3, 4]); ===> [4, 3, 2, 1]

// arr_reverse([1, 2, [1, 2], 4, [2, [2, 4]]]) ===> [[2, [2, 4]], 4, [1, 2], 2, 1]

--------------------------------------------------------------------------------

// take an Array arr and return a reversed which is the original Array but its structure is changed
function d_arr_reverse(arr) {
    const len = array_length(arr);
    for (let i = 0; i < len / 2; i = i + 1) {
        const temp = arr[len - i - 1];
        arr[len - i - 1] = arr[i];
        arr[i] = temp;
    }
    return arr;
}

// d_arr_reverse([1, 2, 3, 4]) ===> [4, 3, 2, 1]

--------------------------------------------------------------------------------
--------------------------------------------------------------------------------
// tree_functions

// taking a tree structure and making adjustment to every element to achieve purposess of sum, times or substraction
function accumulate_tree(f, op, initial, tree) {
    return accumulate((x, ys) => !is_list(x)
                               ? op(f(x), ys)
                               : op(accumulate_tree(f, op, initial, x), ys),
                      initial,
                      tree );
}

//accumulate_tree(x => x, (x, y) => x + y, 0, list(list(0, 6, 3), list(8, 6, 10), list(5, 1, 25))) =====> 64(sum up all the element in the list)

--------------------------------------------------------------------------------

// taking a list and return a filtered version of it which the structure is changed completely instead of returning a new list.
function d_filter(pred, xs) {
    if (is_null(xs) {
            return xs;
        } else if (pred(head(xs))) {
            set_tail(xs, d_filter(pred, tail(xs)));
        } else {
            d_filter(pred, tail(xs));
        }
    }
}

--------------------------------------------------------------------------------

// taking a function and a tree, then apply the function to every element of the tree.
function map_tree(f, tree) {
    return map(sub_tree =>
        !is_list(sub_tree) ?
        f(sub_tree) :
        map_tree(f, sub_tree), tree);
}


// scaling every element in the tree by map_tree 
function scale_tree(tree, k) {
    return map_tree(data_item =>
        data_item * k, tree);
}


// summing up every element in the tree by accumulate_tree (line 735)
function tree_sum(tree) {
    return accumulate_tree(x => x,
        (x, y) => x + y, 0, tree);
}


// counting the number of elements inside the tree.
function count_data_items(tree) {
    
    function accumulate_tree(f, op, initial, tree) {
    return accumulate((x, ys) => !is_list(x)
                               ? op(f(x), ys)
                               : op(accumulate_tree(f, op, initial, x), ys),
                      initial,
                      tree );
}
    return accumulate_tree(x => 1,
        (x, y) => x + y, 0, tree);
}

// count_data_items(list(list(1, 2), list(list(1, 2, 3)))) ===> 5 (number of elements in the tree is 5)
--------------------------------------------------------------------------------

// changing tree with nested list to the similiar Array with nested array 
// where each extra list will form one extra [] outside the element 

function tree_to_arraytree(xs) {
    if (is_number(xs)) {
        return xs;
    } else {
        let A = [];
        let counter = 0;
        let clone = xs;
        while (!is_null(clone)) {
            A[counter] =
                tree_to_arraytree(head(clone));
            counter = counter + 1;
            clone = tail(clone);
        }
        return A;
    }
}

// tree_to_arraytree(list(list(1, 2), list(list(1, 2, 3)))) ===> [[1, 2], [[1, 2, 3]]]

--------------------------------------------------------------------------------

// changing Array with nested Array to the similiar list with nested list 
// where each extra Array will form one extra list outside the element. 

function arraytree_to_tree(a) {
    if (is_number(a)) {
        return a;
    } else {
        let xs = null;
        const len = array_length(a);
        for (let i = len - 1; i >= 0; i = i - 1) {
            xs = pair(arraytree_to_tree(a[i]), xs);
        }
        return xs;
    }
}

// display_list(arraytree_to_tree([1, 2, [[3, 4]], [5, [6]]])) ===> list(1, 2, list(list(3, 4)), list(5, list(6)))

--------------------------------------------------------------------------------
--------------------------------------------------------------------------------
// Stream_function

// infinite stream starting from 1:

const integers = integers_from(1);

--------------------------------------------------------------------------------

// infinite stream of 1, 1, 2, 1, 2, 3, 1, 2, 3, 4

function more_and_more_1() {
    function helper(a, b) {
        return a > b
             ? helper(1, b + 1) 
             : pair(a, () => helper(a + 1, b));
    }
    return helper(1, 1);
}

const more_1 = more_and_more_1() ;

--------------------------------------------------------------------------------

// infinite stream of 1, 2, 2, 3, 3, 3, 4, 4, 4, 4

function more_and_more_2() {
    function helper(a, b) {
        return a > b
             ? helper(1, b + 1) 
             : pair(b, () => helper(a + 1, b));
    }
    return helper(1, 1);
}

const more_2 = more_and_more_2();

--------------------------------------------------------------------------------

// taking a stream and return a infinite stream which takes one element and skip the next element of the input stream infinitely.

function every_other(s) {
    return pair(head(s), () => every_other(stream_tail(
        stream_tail(s))));
}

// display_list(eval_stream(every_other(integers), 10)); ===> list(0, 2, 4, 6, 8, 10, 12, 14, 16, 18) (input stream starts from 0);

// display_list(eval_stream(every_other(integers), 10)); ===> list(1, 3, 5, 7, 9, 11, 13, 15, 17, 19) (input stream starts from 1)

--------------------------------------------------------------------------------

// take a stream and return a infinite stream which odd element is positive while even element is negative

function make_alternating_stream(s) {
    return pair(head(s),
        () => stream_map(x => -x, make_alternating_stream(
            stream_tail(s))));
}

// display_list(eval_stream(make_alternating_stream(integers), 10)); ===> list(1, -2, 3, -4, 5, -6, 7, -8, 9, -10)

--------------------------------------------------------------------------------

// taking a list and return a finite stream which repeats the list elements once

function list_to_finite_stream(xs) {
    function inner(ys) {
        if (is_null(ys)) {
            return null;
        } else {
            return pair(head(ys), () => inner(tail(ys)));
        }
    }
    return is_null(xs) ? null : inner(xs);
}

// display_list(eval_stream(list_to_finite_stream(a), 4)); ===> list(1, 2, 3, 4) 

--------------------------------------------------------------------------------

// taking a list and return an infinite stream which repeats the list elements infinitely

function list_to_infinite_stream(xs) {
    function inner(ys) {
        if (is_null(ys)) {
            return inner(xs);
        } else {
            return pair(head(ys), () => inner(tail(ys)));
        }
    }
    return is_null(xs) ? null : inner(xs);
}

// display_list(eval_stream(list_to_infinite_stream(a), 8)); ===> list(1, 2, 3, 4, 1, 2, 3, 4) 

--------------------------------------------------------------------------------
                                                  
// // taking a n which is the base of a power starting from 0 and return an infinite stream of exponentiation computation with base n

function S2(n) {
    let integers = integers_from(1);
    return stream_map(x => 
        math_pow(n, x - 1), integers);
}

// display_list(eval_stream(S2(5), 5)); //===> list(1, 5, 25, 125, 625)

                                                  // 5^0, 5^1, 5^2, 5^3, 5^4
                                                  
--------------------------------------------------------------------------------

// taking a n which is the base of a power starting from 0 and return an infinite stream of exponentiation computation with base n 

// each round will time with an additional count which starts from 0 (count is adjustable)

function count_times_S2(n) {
    function helper(count) {
        return pair(count * math_pow(n, count),
            () => helper(count + 1));
    }
    return helper(0);
}

// display_list(eval_stream(count_times_s2(5), 5)); //===> list(0, 5, 50, 375, 2500)

                                                  // count(0) * 5^0, 
                                                  // count(1) * 5^1, 
                                                  // count(2) * 5^2, 
                                                  // count(3) * 5^3, 
                                                  // count(4) * 5^4
                                                
--------------------------------------------------------------------------------

// taking a infinite stream starts from 2 which is the first prime number, and return an infinite stream with rest of the prime is_number

// the infinite stream input cannot start from 1 which is not a prime number

const integers = integers_from(2);

function is_divisible(x, y) {
    return x % y === 0;
}

function sieve(s) {
    return pair(head(s),
        () => sieve(stream_filter(
            x => !is_divisible(x, head(s)),
            stream_tail(s))));
}

//display_list(eval_stream(sieve(integers), 10)); ===> list(2, 3, 5, 7, 11, 13, 17, 19, 23, 29)

--------------------------------------------------------------------------------

// take Array with or without nested array, and return a finite stream of all the elements in the stream.

function array_to_stream(a) {
    function helper(count) {
        if (is_undefined(a[count])) {
            return null;
        } else {
            return pair(a[count],
                () => helper(count + 1));
        }
    }
    return helper(0);
}

// display_list(eval_stream(array_to_stream([1, 2, [3, 4], [5, [6, 7]]]), 4)); ===> 

                                     //list(1, 2, [3, 4], [5, [6, 7]]) stream which is converted by eval_stream.
                                     
                                     
--------------------------------------------------------------------------------

// takes a finite stream and return a infinite stream which repeats the finite stream input. 

const finite_stream = enum_stream(1, 5);

function loop_finite_stream(s) {
    function helper(p) {
        if (is_null(stream_tail(p))) {
            return pair(head(p), () => helper(s));
        } else {
            return pair(head(p), () =>
                helper(stream_tail(p)));
        }
    }
    return helper(s);
}

//display_list(eval_stream(loop_stream(finite_stream), 20)); //===> list(1, 2, 3, 4, 5, 1, 2, 3, 4, 5)

--------------------------------------------------------------------------------

// Taking a function and two streams s1 and s2, return a stream with element which 
// is the result of applying the function on the elements of the two streams. 

const integers = integers_from(1);

function stream_combine(f, s1, s2) {
    return pair(f(head(s1), head(s2)),
        () => stream_combine(f,
            stream_tail(s1), stream_tail(s2)));
}

// display_list(eval_stream(stream_combine((a, b) => a + b, integers, integers), 10)); 

//                                         ===>list(2, 4, 6, 8, 10, 12, 14, 16, 18, 20)
//                                         (summing up the head of the two stream)



// Same as stream_combine but different representation
const integers = integers_from(1);

function extend(bno) {
    return (x, y) =>
        pair(bno(head(x), head(y)),
            () => extend(bno)(stream_tail(x),
                stream_tail(y)));
}

// extend((a, b) => a + b)(integers, integers)

--------------------------------------------------------------------------------

// Taking a stream and an integer n, 
// return a new stream with every nth element from the input stream

function time_lapse(s, n) {
    function helper(count) {
        if (s !== null) {
            return pair(stream_ref(s, count),
                () => helper(count + n));
        }
    }
    return helper(0);
}

// display_list(eval_stream(time_lapse(integers, 3), 10)); ===> list(1, 4, 7, 10, 13, 16, 19, 22, 25, 28)

--------------------------------------------------------------------------------

// taking two streams s1 and s2, 
// return a new stream which takes head of s1 first and then takes the head of s2 repeatedly.

function zip_streams(s1, s2) {
    if (is_null(s1)) {
        return s2;
    } else if (is_null(s2)) {
        return s1;
    } else {
        return pair(head(s1), () =>
            pair(head(s2), () =>
                zip_streams(stream_tail(s1),
                    stream_tail(s2))));
    }
}

//display_list(eval_stream(zip_streams(integers, integers), 10)); list(1, 1, 2, 2, 3, 3, 4, 4, 5, 5)

--------------------------------------------------------------------------------

// taking a stream s,
// return a stream which first element is the same as the input stream while
// the rest of the element is the sum up of the elements up to that element in the input stream 

function partial_sums(s) {
    let a = head(s);
    return pair(a, () => stream_map(
        x => x + a, partial_sums(
            stream_tail(s))));
}


// display_list(eval_stream(integers, 10));               ====> list(1, 2, 3, 4, 5, 6)

// display_list(eval_stream(partial_sums(integers), 10)); ====> list(1, 3, 6, 10, 15, 21)

--------------------------------------------------------------------------------

// taking a, b (usually 0, 1) to return a stream of fibonacci number.

function fibgen(a, b) {
    return pair(a, () => fibgen(b, a + b));
}

// display_list(eval_stream(fibgen(0, 1), 10)); //===> list(0, 1, 1, 2, 3, 5, 8, 13, 21, 34)

--------------------------------------------------------------------------------

// return a stream of numbers repeated with respect to the times of max number in each round. 

// eval_stream(more_and_more_1(), 10); ===> list(1, 1, 2, 1, 2, 3, 1, 2, 3, 4)
function more_and_more_1() {
    function helper(a, b) {
        return a > b
             ? helper(1, b + 1) // act as a re-setter to increase the number limit by 1
             : pair(a, () => helper(a + 1, b));
    }
    return helper(1, 1);
}


// return a stream of numbers repeated in times of number itself.

//eval_stream(more_and_more_2, 10) ===> list(1, 2, 2, 3, 3, 3, 4, 4, 4, 4)
function more_and_more_2() {
    function helper(a, b) {
        return a > b
             ? helper(1, b + 1)
             : pair(b, () => helper(a + 1, b));
    }
    return helper(1, 1);
}

--------------------------------------------------------------------------------

// Take a infinite stream with an integer K

// return a finite stream which has element of k
function shorten_stream(s, k) {
    return k === 0 ?
        list() : is_null(s) ?
        null : pair(head(s), () =>
            shorten_stream(stream_tail(s),
                k - 1));
}

// display_list(eval_stream(shorten_stream(integers, 10), 10)); ===> list(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)

--------------------------------------------------------------------------------
--------------------------------------------------------------------------------
// Misc

// taking an Array which represents matrix

// return an Array which switch the rows and columns of the matrix. 

function transpose(M) {
    const Tmatrix = [];
    const row = array_length(M);
    const col = array_length(M[0]);
    for (let r = 0; r < col; r = r + 1) {
        Tmatrix[r] = [];
        for (let c = 0; c < row; c = c + 1) {
            Tmatrix[r][c] = M[c][r];
        }
    }
    return Tmatrix;
}

// transpose([[4, 5], 
//            [7, 4],   ===>   [[4, 7, 3],
//            [3, 2]]);         [5, 4, 2]]

--------------------------------------------------------------------------------

// rotate the square-matrix-array (2 x 2, 3 x 3) 90 degrees clockwise

function rotate_matrix(M) {
    const n = array_length(M);

    function swap(r1, c1, r2, c2) {
        const temp = M[r1][c1];
        M[r1][c1] = M[r2][c2];
        M[r2][c2] = temp;
    }
    for (let r = 0; r < n; r = r + 1) {
        for (let c = r + 1; c < n; c = c + 1) {
            swap(r, c, c, r);
        }
    }
    const half_n = math_floor(n / 2);
    for (let r = 0; r < n; r = r + 1) {
        for (let c = 0; c < half_n; c = c + 1) {
            swap(r, c, r, n - c - 1);
        }
    }
    return M;
}

//rotate_matrix([[1, 2, 3],          //[[7, 4, 1],
               //[4, 5, 6],   //===> //[[8, 5, 2],
               //[7, 8, 9]]);         //[9, 6, 3]]
                             
--------------------------------------------------------------------------------

// taking a list,

// return a reverse version of it by completely changing the structure of the list with set_tail.
function mutable_reverse(xs) {
    if (is_null(xs)) {
        return xs;
    } else if (is_null(tail(xs))) {
        return xs;
    } else {
        let temp =
            mutable_reverse(tail(xs));
        set_tail(tail(xs), xs);
        set_tail(xs, null);
        return temp;
    }
}

--------------------------------------------------------------------------------

// take a list and return a list which repeated itself infinitely

function make_circular(xs) {
    function inner(zs, ys) {
        if (is_null(zs)) {
            return ys;
        } else {
            return pair(head(zs), inner(tail(zs), ys));
        }
    }
    if (is_null(xs)) {
        return null;
    } else {
        let ys = pair(head(xs), null);
        set_tail(ys, inner(tail(xs), ys));
        return ys;
    }
}


// return a repeated list back to normal list 

function make_linear(xs) {
    function inner(ys) {
        if (tail(ys) === xs) {
            set_tail(ys, null);
        } else {
            inner(tail(ys));
        }
    }
    if (!is_null(xs)) {
        inner(xs);
    } else {}
    return xs;
}

--------------------------------------------------------------------------------

// Whether the two list is equal.

function are_equal_sets(set1, set2) {
    if (length(set1) !== length(set2)) {
        return false;
    } else {
        return accumulate(
            (x1, y1) => accumulate(
                (x2, y2) => x1 === x2 ||
                y2, false, set2) &&
            y1, true, set1);
    }
}

--------------------------------------------------------------------------------

// Computation of b to the power of n (n must be an integer)

function fast_expt (b, n) {
    
    function square(x) {
        return x * x;
    }
    
    function is_even(x) {
        return x % 2 === 0;
    }
    
    return n < 0
         ? 1 / fast_expt (b, -n)
         : n === 0
         ? 1
         : is_even (n)
         ? square(fast_expt (b, n/ 2))
         : b * fast_expt (b, n - 1);
}
// fast_expt(2, -1);

--------------------------------------------------------------------------------

// Pascal Number: (each number inside the triangle is the sum of the number above it)
e.g :                           1
                            1       1
                        1       2      1
                    1       3       3      1

function Pascal (row, position) {
    return position === 0 || row === position
         ? 1
         : Pascal(row -1, position - 1) + Pascal(row - 1, position);
}

*/


