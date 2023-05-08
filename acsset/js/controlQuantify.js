
var q;
function increase(quantify) {
    q = quantify.innerHTML
    q++;
    quantify.innerHTML = q;
}

function reduce(quantify) {
    q = quantify.innerHTML
    if(q > 1) {
        q--;
        quantify.innerHTML = q;
    }
}
