const storedPostItems = JSON.parse(localStorage.getItem('postItem'));
const postItem = storedPostItems
const img = document.querySelector('.js-src');
const title = document.querySelector('.js-title');
const cate = document.querySelector('.js-cate');

img.src = postItem.src;
title.innerHTML = postItem.title;
cate.innerHTML = postItem.cate;