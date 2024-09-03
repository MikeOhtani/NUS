// const compose=x=>f=>;

// function compose(f, g){
// return x => f(f(g(x));
// }

function compose(f,g) {
    return x=> f(g(x));
}

// const compose=x=>f(g(x));
    
function thrice(f) {
    return compose(compose(f, f), f);
}

thrice(math_sqrt)(256);


