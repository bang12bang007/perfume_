const posts = JSON.parse(localStorage.getItem('posts'));
const articlesList = document.querySelector('.articles__list');

function render() {
    var count = 0;
    const html = posts.map(value => {
        count++;
        if(count <= 3) {
            return `
            <li class="articles__items">
                <div class="articles__items-container">
                    <div class="articles__items--img">
                        <img src="${value.src}" alt="">
                    </div>
                    <div class="articles__items--content" href="">
                        <a href="posts.html" onclick="post(${value.id})" class="articles__items--name">${value.cate}</a>
                        <a href="posts.html" onclick="post(${value.id})" class="articles__items--desc">${value.title}</a>
                    </div>
                </div>
            </li>
            `
        }

    })
    articlesList.innerHTML = html.join('');
}
render()
function post(i) {
    id = posts.findIndex(value =>{
        return value.id == i;
    })
    localStorage.setItem('postItem', JSON.stringify(posts[id]));
}