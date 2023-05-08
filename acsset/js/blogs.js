const listPosts = document.querySelector('.text-main');
const pagination = document.querySelector('.js-pagination-container');

let per = 5;
let totalProduct = posts.length;
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

function renderPosts() {
    const html = posts.map((value, index) => {
        if(index >=min && index < max) {
            return `
            <div class="post-format">
                <div class="img__container">
                    <img src="${value.src}" alt="">
                    <span class="top"></span>
                    <span class="left"></span>
                    <span class="right"></span>
                    <span class="bottom"></span>
                </div>
                <div class="post-format__left">
                    <div class="post-format--title">
                        <a href="posts.html" onclick="post(${value.id})">${value.cate}</a>
                    </div>
                <div class="post-format-h4">
                    <h4>
                        <a href="posts.html" onclick="post(${value.id})">${value.title}</a>
                    </h4>
                </div>
                    <div class="post-format-p">
                        <p>${value.desc}</p>
                    </div>
                    <div class="author">
                        <div class="avata_blog_1">
                            <img src="./acsset/img/avt-blog1.png" alt="">
                        </div>
                        <div>
                            <h3 class="name">Adam Smith</h3>
                        </div>
                    </div>
                </div>
            </div>
            `
        }
    })
    var result = '<h2 class="section__container--title">Our Blogs</h2>' + html.join('');
    listPosts.innerHTML = result;
}

renderPosts()

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

function post(i) {
    id = posts.findIndex(value =>{
        return value.id == i;
    })
    localStorage.setItem('postItem', JSON.stringify(posts[id]));
}
