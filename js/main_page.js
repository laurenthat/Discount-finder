'use strict'
const url = 'http://localhost:3000';

// select existing html elements
const forthRow = document.querySelector('.forth_row');
const searchButton = document.querySelector('.search_button');
const categoryList = document.querySelector('.category-list');
const slideDownList = document.querySelector('.categorySlideDown')
let posts = [];
// const profile = document.querySelector('.profile');

// get user data 
// const user = JSON.parse(sessionStorage.getItem('user'));

// the search bar
searchButton.addEventListener("click", (e) => {
    // get the input value
    let searchInput = document.querySelector('.search').value.toLowerCase();

    // filter the posts which has the keyword 
    const filteredPosts = posts.filter( (post) => {
        return ( post.Name.toLowerCase().includes(searchInput) || 
                post.Description.toLowerCase().includes(searchInput) || 
                post.Location.toLowerCase().includes(searchInput)
       );
    })

    // empty the post section and update the posts
    forthRow.innerHTML='';
    createPostCards(filteredPosts);
})

// create post cards
const createPostCards = (posts) => {
    posts.forEach((post) => {
        const div1 = document.createElement('div');
        div1.className = "gallery-item";
        div1.tabIndex = "0";

        // add the edit and trash bin icon
        const div2 = document.createElement('div');
        div2.className = "gallery-item-icon";
        const ul1 = document.createElement('ul');
        const li1 = document.createElement('li');
        li1.className = "gallery-item-edit";
        const a1 = document.createElement('a');
        a1.href = "#edit";
        const i1 = document.createElement('i');
        i1.className = "fa-regular fa-pen-to-square";
        const li2 = document.createElement('li');
        li2.className = "gallery-item-bin";
        const a2 = document.createElement('a');
        a2.href = "#bin";
        const i2 = document.createElement('i');
        i2.className = "fa-regular fa-trash-can";

        // open the edit post page by click the edit icon
        i1.addEventListener('click', () => {
            
        })

        // remove the post by click the bin icon
        i2.addEventListener('click', () => {
            // remove this post and update the page
        })

        // add the image
        const img = document.createElement('img');
        img.className = "gallery-image";
        // need to check 
        //img.src = url + 'thumbnails/' + posts[i].picutre;
        img.src = post.Picture;
        img.alt = post.Name;

        // open the main post page by click the image
        img.addEventListener('click', () => {
            // need to check which post page 
            // should add the postId
            location.href = 'post.html?id=' + post.PostId;
        })

        const div3 = document.createElement('div');
        div3.className = "gallery-item-info";

        // add the post info
        const div4 = document.createElement('div');
        div4.className = "gallery-item-left";
        const p1 = document.createElement('p');
        p1.className = "gallery-item-product";
        p1.append(post.Name);
        const p2 = document.createElement('p');
        p2.className = "gallery-item-location";
        p2.append(post.Location);

        // add the post price
        const div5 = document.createElement('div');
        div5.className = "gallery-item-right";
        const p3 = document.createElement('p');
        p3.className = "gallery-item-originalprice";
        p3.append(post.OriginalPrice + '$');
        const p4 = document.createElement('p');
        p4.className = "gallery-item-discountedprice";
        p4.append(post.DiscountedPrice + '$');
        
        // append the element
        forthRow.appendChild(div1);
        div1.append(div2, img, div3);
        div2.appendChild(ul1);
        ul1.append(li1, li2);
        li1.appendChild(a1);
        a1.appendChild(i1);
        li2.appendChild(a2);
        a2.appendChild(i2);
        div3.append(div4, div5);
        div4.append(p1, p2);
        div5.append(p3, p4);
    })
}

const getPosts = async () => {
    try {
      // const fetchOptions = {
      //   headers: {
      //     Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      //   },
      // };
      const response = await fetch(url + '/post');
      posts = await response.json();
      createPostCards(posts);
    } catch (e) {
      console.log(e.message);
    }
};

getPosts();

const createCategoryOptions = (categories) => {
    // clear user list
    categoryList.innerHTML = '';
    categories.forEach((category) => {
        console.log(category)
        // create options with DOM methods
        const option = document.createElement('option');
        const a = document.createElement('a');
        a.href = url + '/category/' + category.categoryId;
        a.textContent = category.categoryName;
        //TODO: same page as main, but for categories
        option.classList.add('border');
        option.appendChild(a);
        categoryList.appendChild(option);
    });
};

// get categories to make options
const getCategories = async () => {
    try {
        const response = await fetch(url + '/category');
        const categories = await response.json();
        createCategoryOptions(categories);
    } catch (e) {
        console.log(e.message);
    }
};
getCategories();