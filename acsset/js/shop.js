const storedProducts = JSON.parse(localStorage.getItem('products'));
const listProduct = document.querySelector('.js-list-product');
const pagination = document.querySelector('.js-pagination-container');
const modal = document.querySelector('.modal');

const products = storedProducts;
let per = 12;
let totalProduct = products.length;
let numberPage = Math.ceil(totalProduct/per);
let min = 0, max = per;
let index = 1;

function renderPagination() {
    var html = '<li onclick="prevPage()"><i class="fa-solid fa-chevron-left"></i></li>';                    
    for(var i = 1; i <= numberPage; i++) {
        html += `<li class="pagination-items" onclick="updatePage(${i})">${i}</li>`
    }
    html += '<li onclick="nextPage()"><i class="fa-solid fa-chevron-right"></i></li>';
    pagination.innerHTML = html;
}
renderPagination();

const paginationItems = document.querySelectorAll('.pagination-items');
paginationItems[0].classList.add('active_pagination')

function renderProducts() {
    const html = products.map((value, index) => {
        if(index >=min && index < max) {
            return `
            <div class="col c-6 m-6 l-4">
                <div class="product">
                    <span class="product__label">New</span>
                    <div class="product__img-link">
                        <a href="product.html" class="product__img" onclick="postProduct(${value.id})">
                            <img src="${value.img}" alt="">
                        </a>
                        <div class="product__action hidden-mobile">
                            <a href=""><i class="fa-regular fa-heart"></i></a>
                            <span onclick="renderModal(${value.id})"><i class="fa-solid fa-magnifying-glass"></i></span>
                            <span onclick="addCart(${value.id}, 1)"><i class="fa-solid fa-bag-shopping"></i></span>
                        </div>
                    </div>
                    <div class="product__content">
                        <h3 class="product__name">${value.name}</h3>
                        <div class="product__rating">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <p class="product__price">
                            <span class="product__price--old">$${value.old_price}</span>
                            <span class="product__price--new">$${value.current_price}</span>
                        </p>
                    </div>
                </div>
            </div>
            `
        }
    })
    listProduct.innerHTML = html.join('');
}

renderProducts()

// per = 10
// page = 3 min=20 max=30
// max = per*page min = per*page-(min+per)

function updatePage(i) {
    index = i
    min = per*index - per;
    max = per*index;
    renderProducts()
    for(const paginationItem of paginationItems) {
        if(paginationItem == paginationItems[index-1]){
            paginationItems[index-1].classList.add('active_pagination')
        }else {
            paginationItem.classList.remove('active_pagination')
        }
    }
    window.scroll({
        top: 100,
        behavior: "smooth",
      }); 
}

function nextPage() {
    if(index < numberPage) {
        index++;
    }
    updatePage(index);
}

function prevPage() {
    if(index > 1) {
        index--;
    }
    updatePage(index);
}

function renderModal(index) {
    let i = index;
    let id = products.findIndex((value) => {
        return value.id == index;
    });
    const html = `
    <div class="modal__container">
        <div class="detail__product">
            <div class="gird">
                <div class="row">
                    <div class="col c-12 m-6 l-6">
                        <div class="detail__product--img">
                            <img src="${products[id].img}" alt="">
                            <div class="detail__slider">
                                <div class="slider__img--container">
                                    <ul class="img__slider">
                                        <li class="img__slider--items">
                                            <img src="${products[id].img}" alt="">
                                        </li>
                                        <li class="img__slider--items">
                                            <img src="${products[id].img}" alt="">
                                        </li>
                                        <li class="img__slider--items">
                                            <img src="${products[id].img}" alt="">
                                        </li>
                                        <li class="img__slider--items">
                                            <img src="${products[id].img}" alt="">
                                        </li>
                                    </ul>
                                </div>
                                <div class="prev-img control-slider-img">
                                    <i class="fa-solid fa-chevron-left"></i>
                                </div>
                                <div class="next-img control-slider-img">
                                    <i class="fa-solid fa-chevron-right"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col c-12 m-6 l-6">
                        <div class="detail__product--container">
                            <div class="detail__product--info">
                                <h3 class="name">${products[id].name}</h3>
                                <div class="product__rating">
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-regular fa-star"></i>
                                    <i class="fa-regular fa-star"></i>
                                </div>
                                <div class="p status">
                                    <span>Availability: </span>
                                    <a href="">In Stock</a>
                                </div>
                                <p class="price">€${products[id].current_price}</p>
                            </div>
                            <ul class="detail__product--desc">
                                <li>Vestibulum tortor quam</li>
                                <li>Imported</li>
                                <li>Art.No. 06-7680</li>
                            </ul>
                            <div class="detail__product--option">
                                <p>
                                    <span  class="title">Color:</span>
                                    <span>White/Black/Teal/Brown</span>
                                </p>
                                <ul class="sidebar__list">
                                    <li class="sidebar__items">
                                        <a class="bg-white border-default">
                                            <i class="fa-solid fa-check"></i>
                                        </a>
                                    </li>
                                    <li class="sidebar__items">
                                        <a class="bg-black">
                                            <i class="fa-solid fa-check"></i>
                                        </a>
                                    </li>
                                    <li class="sidebar__items">
                                        <a class="bg-color_1">
                                            <i class="fa-solid fa-check"></i>
                                        </a>
                                    </li>
                                    <li class="sidebar__items active">
                                        <a class="bg-color_2 ">
                                            <i class="fa-solid fa-check"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div class="detail__product--option">
                                <p>
                                    <span  class="title">Pots Size:</span>
                                </p>
                                <ul class="sidebar__list">
                                    <li class="sidebar__items">
                                        <a class="size border-default">
                                            XS
                                        </a>
                                    </li>
                                    <li class="sidebar__items">
                                        <a class="size border-default">
                                            S
                                        </a>
                                    </li>
                                    <li class="sidebar__items">
                                        <a class="size border-default">
                                            M
                                        </a>
                                    </li>
                                    <li class="sidebar__items active-size">
                                        <a class="size border-default">
                                            L
                                        </a>
                                    </li>
                                    <li class="sidebar__items">
                                        <a class="size border-default">
                                            XL
                                        </a>
                                    </li>
                                    <li class="sidebar__items">
                                        <a class="size border-default">
                                            XXL
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div class="detail__product--action">
                                <a href="#" class="add-to-wishlist mg-r-20">
                                    <i class="fa-regular fa-heart no-full"></i>
                                    <i class="fa-solid fa-heart full"></i>
                                    <span>Add to Wishlist</span>
                                </a>
                                <a href="#" class="view-size-chart">
                                    <i class="fa-solid fa-ruler-horizontal"></i>
                                    <span>View Size Chart</span>
                                </a>
                            </div>
                            <div class="group--btn">
                                <div class="detail__quantify--control mg-r-10 border-default ">
                                    <button onclick="reduce(document.querySelector('.q'))" class="detail__quantify--control-action"><i class="fa-solid fa-minus"></i></button>
                                    <span class="q">1</span>
                                    <button onclick="increase(document.querySelector('.q'))" class="detail__quantify--control-action"><i class="fa-solid fa-plus"></i></button>
                                </div>
                                <a class="btn--primary" onclick="addCart(${i}, parseInt(document.querySelector('.q').innerText))" href="#">add to cart</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <button class="close" onclick="closeModal()">
            <i class="fa-solid fa-xmark"></i>
        </button>       
    </div>
    `
    modal.classList.remove('hidden_modal');
    modal.innerHTML = html;
}

function closeModal() {
    modal.classList.add('hidden_modal');
}