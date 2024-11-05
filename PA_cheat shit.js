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

--------------------------------------------------------------------------------
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
                                     list(1, 2, 3)) */
                                     
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

// Sum(take a list and return a list with first element to be even rank sum, and second to be old rank sum) (list rank starts from 0)

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
// Array Functions
function accum_array(op, init, A) {
    let x = init;
    for (let i = init; i < array_length(A); i = i + 1) {
        x = op(x, A[i]);
    }
    return x;
}

function copy_array(A) {
    const len = array_length(A);
    const B = [];
    for (let i = 0; i < len; i = i + 1) {
        B[i] = A[i];
    }
    return B;
}

function map_array(f, arr) {
    for (let I = 0; I < array_length(arr); I = I + 1) {
        arr[i] = f(arr[i]);
    }
    return arr;
}

function swap(A, x, y) {
    const temp = A[x];
    A[x] = A[y];
    A[y] = temp;
}

function add_back(element, arr) {
    const len = array_length(arr);
    arr[len] = element;
    //return arr; (return optional)
}

function build_array(n, f) {
    const A = [];
    for (let I = 0; I < n; I = I + 1) {
        A[i] = f(i);
    }
    return A;
}

function array_to_list(A) {
    const len = array_length(A);
    let L = null;
    for (let I = len– 1; I >= 0; I = I– 1) {
        L = pair(A[i], L);
    }
    return L;
}

function list_to_array(L) {
    const A = [];
    let I = 0;
    for (let p = L; !is_null(p); p = tail(p)) {
        A[i] = head(p);
        I = I + 1;
    }
    return A;
}

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
    }
    helper(arr);
    return result;
}

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

function arr_reverse(arr) {
    const reversed_arr = [];
    const len = array_length(arr);
    for (let i = 0; i < len; i = i + 1) {
        reversed_arr[len - i - 1] = arr[i];
    }
    return reversed_arr;
}

function d_arr_reverse(arr) {
    const len = array_length(arr);
    for (let i = 0; i < len / 2; i = i + 1) {
        const temp = arr[len - i - 1];
        arr[len - i - 1] = arr[i];
        arr[i] = temp;
    }
    return arr;
}

// Tree Functions
function accumulate_tree(f, op, initial, tree) {
    function accum(x, y) {
        return is_list(x) ?
            accumulate_tree(f, op, y, x) :
            op(f(x), y);
    }
    return accumulate(accum, initial, tree);
}

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

function map_tree(f, tree) {
    return map(sub_tree =>
        !is_list(sub_tree) ?
        f(sub_tree) :
        map_tree(f, sub_tree), tree);
}

function scale_tree(tree, k) {
    return map_tree(data_item =>
        data_item * k, tree);
}

function tree_sum(tree) {
    return accumulate_tree(x => x,
        (x, y) => x + y, 0, tree);
}

function count_data_items(tree) {
    return accumulate_tree(x => 1,
        (x, y) => x + y, 0, tree);
}

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

// Stream
function every_other(s) {
    return pair(head(s), () => every_other(stream_tail(
        stream_tail(s))));
}

function make_alternating_stream(s) {
    return pair(head(s),
        () => stream_map(x => -x, make_alternating_stream(
            stream_tail(s))));
}

function list_to_inf_stream(xs) {
    function inner(ys) {
        if (is_null(ys) {
                return inner(ys);
            } else {
                return
                pair(head(ys), () => inner(tail(ys)));
            }
        }
        return is_null(xs) ? null : inner(xs);
    }
}

function powerS2(n) {
    function helper(count) {
        return pair(count * math_pow(n, count),
            () => helper(count + 1));
    }
    return helper(0);
}

function S2(n) {
    let integers = integers_from(1);
    return stream_map(x => x *
        math_pow(n, x - 1), integers);
}

function n_of_n_stream() {
    function more2(a, b) {
        return (a > b) ?
            more2(1, 1 + b) :
            pair(b, () => more2(a + 1, b));
    }
    return more2(1, 1);
}

function is_divisible(x, y) {
    return x % y === 0;
}

function sieve(s) {
    return pair(head(s),
        () => sieve(stream_filter(
            x => !is_divisible(x, head(s)),
            stream_tail(s))));
}

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

function loop_stream(s) {
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

function extend(bno) {
    return (x, y) =>
        pair(bno(head(x), head(y)),
            () => extend(bno)(stream_tail(x),
                stream_tail(y)));
}

function stream_combine(f, s1, s2) {
    return pair(f(head(s1), head(s2)),
        () => stream_combine(f,
            stream_tail(s1), stream_tail(s2)));
}

function time_lapse(s, n) {
    function helper(count) {
        if (s !== null) {
            return pair(stream_ref(s, count),
                () => helper(count + n));
        }
    }
    return helper(0);
}

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

function partial_sums(s) {
    let a = head(s);
    return pair(a, () => stream_map(
        x => x + a, partial_sums(
            stream_tail(s))));
}

function fibgen(a, b) {
    return pair(a, () => fibgen(b, a + b));
}

function more(a, b) {
    return (a > b) ? more(1, 1 + b) :
        pair(a, () => more(a + 1, b));
}
const moremore = more(1, 1);
eval_stream(moremore, 15);

function shorten_stream(s, k) {
    return k === 0 ?
        list() : is_null(s) ?
        null : pair(head(s), () =>
            shorten_stream(stream_tail(s),
                k - 1));
}

// Misc
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
}

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
fast_expt(2, -1);

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

