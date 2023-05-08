const cartProductList = document.querySelector('.cart__product-list');
const total =  document.querySelector('.js-total');
const havingProducts = document.querySelector('.having-products');
const noProducts = document.querySelector('.no-products');
const storedProducts = JSON.parse(localStorage.getItem('products'));
const products = storedProducts;

function showProduct() {
    if(carts.length <= 0) {
        // Hiển thị giỏ hàng rỗng
        havingProducts.classList.add('d-none');
        noProducts.classList.remove('d-none');
    }else {
        havingProducts.classList.remove('d-none');
        noProducts.classList.add('d-none');
    }
}

showProduct()

function renderProductCart(carts) {
    const html = carts.map((value, index) => {
        return `
        <li class="cart__product-items">
            <div class="items__container">
                <div class="items__img">
                    <img src="${value.img}" alt="">
                </div>
                <div class="items__content">
                    <a href="product.html" onclick="postProduct(${value.id})" class="items__content-name">${value.product_name}</a>
                    <p>
                        <a href="">Black</a>,
                        <a href="">300ML</a>
                    </p>
                    <p class="items__price pc-none show-mobile">$${value.price}</p>
                </div>
            </div>
            
            <div class="items__right">
                <div class="items__quantify">
                    <button onclick="reduce(${value.id})" class="items__quantify--action"><i class="fa-solid fa-minus"></i></button>
                    <span data-index=${value.id} class="js-q">${value.quantify}</span>
                    <button onclick="increase(${value.id})" class="items__quantify--action"><i class="fa-solid fa-plus"></i></button>
                </div>
                <a href="#" onclick="clearProduct(${index})" class="items__clear pc-none show-mobile">
                    <i class="fa-regular fa-trash-can"></i>
                </a>
            </div> 
            <p class="items__price hidden-mobile">$${value.price}</p>
            <a href="#" onclick="clearProduct(${index})" class="items__clear hidden-mobile">
                <i class="fa-regular fa-trash-can"></i>
            </a>
        </li>
        `
    })
    cartProductList.innerHTML = html.join('');
    localStorage.setItem('cart', JSON.stringify(carts))
    total.innerHTML = totalCart.innerHTML;
}

renderProductCart(carts)

function clearProduct(index) {
    if(isLogin) {
        storedUser.carts.splice(index, 1);
        renderCart(storedUser.carts);
        renderProductCart(storedUser.carts);
        localStorage.setItem('user', JSON.stringify(storedUser))
    }else {
        carts.splice(index, 1);
        renderCart(carts);
        renderProductCart(carts);
    }
    showProduct()
}


const quantifies = document.querySelectorAll('.js-q');
var q;


function increase(id) {
    var cart;
    if(isLogin) {
        cart = storedUser.carts 
    }else {
        cart = carts;
    }
    quantifies.forEach(quantify => {
        if(quantify.dataset.index == id) {
            q = parseInt(quantify.innerHTML)
            q++;
            quantify.innerHTML = q;
            let i = cart.findIndex(val => {
                return val.id == id;
            })
            cart[i].quantify = q;
            if(isLogin) {
                localStorage.setItem('user', JSON.stringify(storedUser))
            }else {
                localStorage.setItem('cart', JSON.stringify(cart))
            }
        }
    })
    if(isLogin) {
        renderCart(storedUser.carts);
        renderProductCart(storedUser.carts);
    }else {
        renderCart(carts);
        renderProductCart(carts);
    }
}

function reduce(id) {
    var cart;
    if(isLogin) {
        cart = storedUser.carts;
    }else {
        cart = carts;
    }
    quantifies.forEach(quantify => {
        if(quantify.dataset.index == id) {
            q = parseInt(quantify.innerHTML)
            if(q > 1) {
                q--;
                quantify.innerHTML = q;
            }
            let i = carts.findIndex(val => {
                return val.id == id;
            })
            carts[i].quantify = q;
            localStorage.setItem('cart', JSON.stringify(carts))
        }
    })
    if(isLogin) {
        renderCart(storedUser.carts);
        renderProductCart(storedUser.carts);
    }else {
        renderCart(carts);
        renderProductCart(carts);
    }
}

