const yourOrderContainers = document.querySelectorAll('.your-order__list');
const totalContainers = document.querySelectorAll('.js-total');

function renderYourOrder() {
    const html = carts.map((value, index) => {
        return  `
            <li class="your-order__items">
                <div class="items__img">
                    <a href="">
                        <img src="${value.img}" alt="">
                    </a>
                </div>
                <div class="items__content">
                    <a href class="items__content--name">${value.product_name}</a>
                    <p class="items__content--desc">
                        <span>Black</span>,
                        <span>XXL</span>
                    </p>
                    <p class="items__content--price">
                        <span>$${value.price}</span>
                        <span>x${value.quantify}</span>
                    </p>
                </div>
            </li>
        `
    })
    yourOrderContainers.forEach(yourOrderContainer => {
        yourOrderContainer.innerHTML = html.join('');
    })
    totalContainers.forEach(totalContainer => {
        totalContainer.innerHTML = totalCart.innerHTML
    })
}

renderYourOrder();