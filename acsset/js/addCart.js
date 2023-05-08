const storedCart = JSON.parse(localStorage.getItem('cart'))
var carts = storedCart ?? [];  
const cartContainer = document.querySelector('.js-cart-container');
const noProduct = document.querySelector('.no-product');
const havingProduct = document.querySelector('.having-product');
const cartQuantifies = document.querySelectorAll('.js-cart-quantify');
const totalCart = document.querySelector('.cart-total-js');


function updateCart(carts) {
    var totalQuantify = 0;
    var totalPrice = 0;
    if(carts.length > 0) {
        havingProduct.classList.remove('d-none');
        noProduct.classList.add('d-none');
    }else {
        havingProduct.classList.add('d-none');
        noProduct.classList.remove('d-none');
    }
    carts.map(val => {
        totalQuantify += val.quantify;
        totalPrice += val.quantify * val.price;
    })
    totalCart.innerHTML = "$"+totalPrice;
    cartQuantifies.forEach(cartQuantify => {
        cartQuantify.innerHTML = totalQuantify;
    })
}

function renderCart(carts) {
    var cart = carts ?? []
    const html = cart.map((value, index) => {
        return `
        <li>
            <div class="minicart__product">
                <div class="minicart__product-img">
                    <img src="${value.img}" alt="">
                </div>
                <div class="minicart__product-desc">
                    <a href="product.html" onclick="postProduct(${value.id})" class="minicart__product-name">${value.product_name}</a>
                    <p>
                        <a href="">Black</a>,
                        <a href="">300ML</a>
                    </p>
                    <div class="minicart__product-act">
                        <p>
                            <span>$${value.price}</span>
                            <span>(x${value.quantify})</span>
                        </p>
                        <a  onclick="clearProduct(${index})">
                            <i class="fa-regular fa-trash-can"></i>
                        </a>
                    </div>
                </div>
            </div>
        </li>
        `
    })
    updateCart(cart);
    cartContainer.innerHTML = html.join('');
    localStorage.setItem('cart', JSON.stringify(cart))
}   

renderCart(carts)
function findProduct(id, arr) {
    for(var i = 0; i < arr.length; i++) {
        if(arr[i].id == id) {
            return i;
        }
    }
    return -1;
}

function clearProduct(index) {
    if(isLogin) {
        storedUser.carts.splice(index, 1);
        renderCart(storedUser.carts);
        localStorage.setItem('user', JSON.stringify(storedUser))
    }else {
        carts.splice(index, 1);
        renderCart(carts);
    }
}

function pushCart(cart, index, q) {
    var carts = cart ?? []
    let i = products.findIndex((value) => {
    return value.id == index;
    });
    let id = index
    let img = products[i].img
    let product_name = products[i].name
    let price = products[i].current_price
    let quantify = q;
    if(carts.length  == 0) {
        carts.push({
            id,
            img,
            product_name,
            price,
            quantify
        })
        renderCart(carts);
    }
    else if(findProduct(id, carts) < 0) {
        carts.push({
            id,
            img,
            product_name,
            price,
            quantify
        })
        renderCart(carts);
    }
    else if(findProduct(id, carts) >= 0) {
        carts[findProduct(id, carts)].quantify += q;
        renderCart(carts);
    }
}

function addCart(index, q) {
    if(isLogin) {
        pushCart(storedUser.carts, index, q)
        localStorage.setItem('user', JSON.stringify(storedUser))
    }else {
        pushCart(carts, index, q)
    }   
}



if(btnLogout != null || btnLogout != undefined) {
    btnLogout.addEventListener('click', ()=> {
        isLogin = false;
        localStorage.setItem('cart', JSON.stringify([]))
    })
}

window.addEventListener('beforeunload', function() {
    putUsers({carts: storedUser.carts}, storedUser.id);
});

function postProduct(i) {
    id = products.findIndex(value =>{
        return value.id == i;
    })
    localStorage.setItem('productItem', JSON.stringify(products[id]));
}