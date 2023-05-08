const modalMobile = document.querySelectorAll('.js-modal-mobile');
const closeModalBtns = document.querySelectorAll('.js-close-modal');
const modalItemMobile = document.querySelectorAll('.js-modal-modal-items');
const btnMenuModal = document.querySelector('.nav__right-menu');
const menuModal = document.querySelector('.modal__menu');
const btnCloseMenuModal = document.querySelector('.js-close-menu-modal');
const btnMoreCates = document.querySelectorAll('.js-more-cate');
const titleModal = document.querySelector('.modal-title');
const back = document.querySelector('.back');
const menuSub = document.querySelectorAll('.js-menu-sub');

for(const btn of modalMobile) {
    btn.addEventListener('click', ()=> {
        for(var i = 0; i < modalMobile.length; i++) {
            if(btn == modalMobile[i]) {
                modalItemMobile[i].classList.add('show-modal');
            }
            else {
                modalItemMobile[i].classList.remove('show-modal');
            }
        }
    })
}

for(const btn of closeModalBtns) {
    btn.addEventListener('click', ()=> {
        for(var i = 0; i < closeModalBtns.length; i++) {
            if(btn == closeModalBtns[i]) {
                modalItemMobile[i].classList.remove('show-modal');
            }
        }
    })
}

btnMenuModal.onclick = () => {
    menuModal.classList.add('show-menu-modal');
}

btnCloseMenuModal.onclick = () => {
    menuModal.classList.remove('show-menu-modal');
}

btnMoreCates.forEach(btnMoreCate => {
    btnMoreCate.addEventListener('click', ()=> {
        back.classList.add('show-back')
        for(var i = 0; i < btnMoreCates.length; i++) {
            if(btnMoreCate == btnMoreCates[i]) {
                menuSub[i].classList.add('show-menu-sub');
            }
        }
        titleModal.innerHTML = btnMoreCate.parentElement.textContent
    })
})

back.onclick = () => {
    back.classList.remove('show-back');
    titleModal.innerHTML = 'main menu'
    menuSub.forEach(val => {
        if(val.classList.contains('show-menu-sub')) {
            val.classList.remove('show-menu-sub');
        }
    })
}

const btnBackToTop = document.querySelector('.js-btn-btt');


window.addEventListener('scroll', ()=> {
    if(window.scrollY >= 949.5166015625) {
        btnBackToTop.classList.remove('pc-none');
    }else {
        btnBackToTop.classList.add('pc-none');
    }
})

btnBackToTop.addEventListener('click', ()=> {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
})