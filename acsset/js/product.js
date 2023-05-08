

const storedProduct = JSON.parse(localStorage.getItem('productItem'));
const product = storedProduct;

const storedProducts = JSON.parse(localStorage.getItem('products'));
const products = storedProducts;

document.querySelector('.main__title--current').innerHTML = `${product.name}`

function renderProduct(){
    const html = 
    `
    <div class="col c-12 m-6 l-6">
    <div class="detail__product--img">
        <img class="js-img img_1" src="${product.img}" alt="">
        <div class="detail__slider">
            <div class="slider__img--container ">
                <ul class="img__slider slider_1">
                    <li class="img__slider--items  sliderItems_1 active">
                        <img src="${product.img}" alt="">
                    </li>
                    <li class="img__slider--items sliderItems_1">
                        <img src="${product.img}" alt="">
                    </li>
                    <li class="img__slider--items sliderItems_1">
                        <img src="${product.img}" alt="">
                    </li>
                    <li class="img__slider--items sliderItems_1">
                        <img src="${product.img}" alt="">
                    </li>
                    <li class="img__slider--items sliderItems_1">
                        <img src="${product.img}" alt="">
                    </li>
                </ul>
            </div>
            <div class="prev-img prev_1 control-slider-img">
                <i class="fa-solid fa-chevron-left"></i>
            </div>
            <div class="next-img next_1 control-slider-img">
                <i class="fa-solid fa-chevron-right"></i>
            </div>
        </div>
    </div>
</div>
<div class="col c-12 m-6 l-6">
    <div class="detail__product--container">
        <div class="detail__product--info">
            <h3 class="name">${product.name}</h3>
            <div class="product__rating">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
            </div>
            <div class="p status">
                <span>Availability: </span>
                <a href="">In Stock</a>
            </div>
            <p class="price">$${product.current_price}</p>
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
            <a class="btn--primary" onclick="addCart(${product.id}, parseInt(document.querySelector('.q').innerText))" href="#">add to cart</a>
        </div>
    </div>
</div>
    `

    document.querySelector('.js-product-container').innerHTML = html
}

renderProduct()

function slider(prev, next, sliderItem, slider, img_) {
    const btnPrevSlider = document.querySelector(`.${prev}`);
    const btnNextSlider = document.querySelector(`.${next}`);
    const sliderItems = document.querySelectorAll(`.${sliderItem}`);
    const sliderContainer = document.querySelector(`.${slider}`);
    const img = document.querySelector(`.${img_}`);


    let maxPart = sliderItems.length - 2;
    let part = 0;
    var index = 0;
    function updateItems(index, part) {
        let style = window.getComputedStyle(sliderItems[1]);
        let widthWithMargin = parseInt(style.getPropertyValue("width")) + parseInt(style.getPropertyValue("margin-left")) + parseInt(style.getPropertyValue("margin-right"));
        sliderItems.forEach((sliderItem) => {
            sliderItem.classList.remove('active');
        });
        sliderItems[index].classList.add('active');
        img.src = sliderItems[index].querySelector('img').src;
        img.style.animation = 'bright ease-in-out .5s'
        sliderContainer.style.transform = `translateX(-${widthWithMargin * part}px)`
    }
    
    function setSizeSliderItems() {
        sliderItems.forEach(sliderItem => {
            sliderItem.style.width = img.clientWidth / 3.14 + "px";
            sliderItem.style.height = img.clientWidth / 3.14 + "px";
            if(parseInt(window.innerWidth) < 1200) {
                sliderItem.style.width = img.clientWidth / 3.2 + "px";
            sliderItem.style.height = img.clientWidth / 3.2 + "px";
            }
        })
        updateItems(index, part)
    }
    
    setSizeSliderItems()

    window.addEventListener('resize', () => {
        setSizeSliderItems()
    });

    btnPrevSlider.addEventListener('click', ()=> {
        img.style.animation = ""
        if(index > 0) {
            index--;
        }
        if(part > 0) {
            part--;
        }
        setTimeout(()=> {
            updateItems(index, part);
        },10)
    })

    btnNextSlider.addEventListener('click', ()=> {
        img.style.animation = ""
        if(index < sliderItems.length - 1) {
            index ++;
        }
        if(part < maxPart-1) {
            part++;
        }
        setTimeout(()=> {
            updateItems(index, part);
        },10)
    })
    
    sliderItems.forEach( sliderItem=> {
        sliderItem.onclick = ()=> {
            img.style.animation = ""
            for(var i = 0; i < sliderItems.length; i++) {
                if(sliderItem == sliderItems[i]) index = i;
            }
            setTimeout(()=> {
                updateItems(index, part);
            },10)
        }
    })
}

slider('prev_1', 'next_1', 'sliderItems_1', 'slider_1', 'img_1')

const tabs = document.querySelectorAll(".tabs_link")
const panes = document.querySelectorAll(".tab-pane")

const tabActive = document.querySelector(".tabs_link.active");
const line = document.querySelector(".line");
line.style.left = tabActive.offsetLeft + "px";
line.style.width = tabActive.offsetWidth + "px";

tabs.forEach((tab, index) => {
    const pane = panes[index];
    
    tab.onclick = function () {
        document.querySelector(".tabs_link.active").classList.remove("active");
        document.querySelector(".tab-pane.active").classList.remove("active");
    
        line.style.left = this.offsetLeft + "px";
        line.style.width = this.offsetWidth + "px";
    
        this.classList.add("active");
        pane.classList.add("active");
    };
});

function renderAlsoLike() {
    const html = products.map((value, index) => {
        if(value.cate == 'bestseller') {
            return `
                <li class="deal__items">
                    <div class="product">
                        <span class="product__label">New</span>
                        <div class="product__img-link">
                            <a href="product.html" onclick="postProduct(${value.id})" class="product__img">
                                <img src="${value.img}" alt="">
                            </a>
                            <div class="product__action hidden-mobile">
                                <a href="#"><i class="fa-regular fa-heart"></i></a>
                                <span onclick="renderModal(${value.id})"><i class="fa-solid fa-magnifying-glass"></i></span>
                                <span onclick="addCart(${value.id}, 1)"><i class="fa-solid fa-bag-shopping"></i></span>
                            </div>
                        </div>
                        <div class="product__content">
                            <div class="product__time">
                                <div class="product__time-items">
                                    <span>00</span>
                                    <span>days</span>
                                </div>
                                <div class="product__time-items">
                                    <span>00</span>
                                    <span>days</span>
                                </div>
                                <div class="product__time-items">
                                    <span>00</span>
                                    <span>days</span>
                                </div>
                                <div class="product__time-items">
                                    <span>00</span>
                                    <span>days</span>
                                </div>
                            </div>
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
                </li>
                `
        }
    })
    document.querySelector('.deal__container').innerHTML = html.join('');
}

renderAlsoLike()

function renderModal(index) {
    let i = index;
    const modal = document.querySelector('.modal');
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
                            <img class="js-img img_2" src="${products[id].img}" alt="">
                            <div class="detail__slider">
                                <div class="slider__img--container">
                                    <ul class="img__slider slider_2">
                                        <li class="img__slider--items sliderItems_2 active">
                                            <img src="${products[id].img}" alt="">
                                        </li>
                                        <li class="img__slider--items sliderItems_2">
                                            <img src="${products[id].img}" alt="">
                                        </li>
                                        <li class="img__slider--items sliderItems_2">
                                            <img src="${products[id].img}" alt="">
                                        </li>
                                        <li class="img__slider--items sliderItems_2">
                                            <img src="${products[id].img}" alt="">
                                        </li>
                                        <li class="img__slider--items sliderItems_2">
                                            <img src="${products[id].img}" alt="">
                                        </li>
                                    </ul>
                                </div>
                                <div class="prev-img prev_2 control-slider-img">
                                    <i class="fa-solid fa-chevron-left"></i>
                                </div>
                                <div class="next-img next_2 control-slider-img">
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
    slider('prev_2', 'next_2', 'sliderItems_2', 'slider_2', 'img_2')
}

function closeModal() {
    const modal = document.querySelector('.modal');
    modal.classList.add('hidden_modal');
}

$('.deal__container').slick({
    dots: false,
    infinite: false,
    speed: 1200,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: $('.prev'),
    nextArrow: $('.next'),
    responsive: [
        {
        breakpoint: 1024,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
        }
        },
        {
        breakpoint: 600,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 1
        }
        },
        {
        breakpoint: 480,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1
        }
        }
    ]
    });