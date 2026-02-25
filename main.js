let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let tagTable = document.getElementsByClassName('table')[0];
let create_button = document.getElementById('create-button');
let delete_all_btn = document.getElementById("deleteAll")
let container = document.getElementById("container_id")
let is_edit = false;
container.style.display = 'none'
let editId = 0;


// get total
function getTotal() {
    if (price.value !== '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    } else {
        total.innerHTML = 'Total:';
        total.style.background = 'rgb(229, 13, 13)';
    }
}

// create product
let products = localStorage.product ? JSON.parse(localStorage.product) : [];

create_button.onclick = function () {
    if (!title.value) {
        return;
    }
    let newPro = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
    };
    if (is_edit) {
        products[editId] = newPro;
        is_edit = false
        create_button.innerText = 'Create';

    } else {
        if (!count.value) {
            products.push(newPro);
        }
        for (let i = 0; i < count.value; i++) {
            products.push(newPro);
        }
    }

    localStorage.setItem('product', JSON.stringify(products));

    cleardata();
    showData();
};

// clear data from page
function cleardata() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    category.value = '';
    count.value = '';
    discount.value = '';
    total.innerHTML = 'Total:';
    total.style.background = 'rgb(229, 13, 13)';
}

// read
function showData() {
    console.log(products)
            delete_all_btn.style.display = "block"

    if (products.length > 0) {
        tagTable.classList.replace('hidden', 'block');
        delete_all_btn.style.display = "block"
    } else {
        delete_all_btn.style.display = "none"
    }

    var table = '';

    for (let i = 0; i < products.length; i++) {
        table += `
        <tr>
        <td>${i + 1}</td>
        <td>${products[i].title}</td>
        <td>${products[i].price}</td>
        <td>${products[i].taxes}</td>
        <td>${products[i].ads}</td>
        <td>${products[i].discount}</td>
        <td>${products[i].total}</td>
        <td>${products[i].category}</td>
        <td>
            <button class="update-btn" onclick="updateProduct(${i})">Update</button>
        </td>
        <td>
            <button class="delete-btn" onclick="deleteProduct(${i})">Delete</button>
        </td>
        
        </tr>
    `;
    }

    document.getElementById('tbody').innerHTML = table;



}

showData();

// delete


function deleteProduct(i) {
    products.splice(i, 1)
    localStorage.setItem('product', JSON.stringify(products));
    showData();
}

function deleteAll() {
    container.style.display = "block";
}

function getConfirmationMood(id) {
    if (id === "confirm") {
        localStorage.clear();
        products.splice(0);
        showData();
        container.style.display = "none";
    } else if (id === "cancel") {
        container.style.display = "none";
    }
}


// update
function updateProduct(i) {
    is_edit = true;
    create_button.innerText = 'Edit';
    editId = i;
    title.value = products[i].title
    price.value = products[i].price
    taxes.value = products[i].taxes
    ads.value = products[i].ads
    category.value = products[i].category
    discount.value = products[i].discount
    getTotal();
}

// searching 


let searchMood = 'title'
function getSearchMood(id) {
    let search = document.getElementById("search")
    if (id == 'search_by_title_id') {
        searchMood = 'title'
        search.placeholder = 'Search By Title'
    } else {
        searchMood = 'category'
        search.placeholder = 'Search By Category'

    }
    search.focus()
}


function searchData(value) {
    let table = '';
    if (searchMood == 'title') {

        for (let i = 0; i < products.length; i++) {
            if (products[i].title.includes(value)) {
                table += `
        <tr>
        <td>${i + 1}</td>
        <td>${products[i].title}</td>
        <td>${products[i].price}</td>
        <td>${products[i].taxes}</td>
        <td>${products[i].ads}</td>
        <td>${products[i].discount}</td>
        <td>${products[i].total}</td>
        <td>${products[i].category}</td>
        <td>
            <button class="update-btn" onclick="updateProduct(${i})">Update</button>
        </td>
        <td>
            <button class="delete-btn" onclick="deleteProduct(${i})">Delete</button>
        </td>
        
        </tr>
    `;
                showData();
            }
            document.getElementById('tbody').innerHTML = table;

        }

    } else {

        for (let i = 0; i < products.length; i++) {
            if (products[i].category.includes(value)) {
                table += `
        <tr>
        <td>${i + 1}</td>
        <td>${products[i].title}</td>
        <td>${products[i].price}</td>
        <td>${products[i].taxes}</td>
        <td>${products[i].ads}</td>
        <td>${products[i].discount}</td>
        <td>${products[i].total}</td>
        <td>${products[i].category}</td>
        <td>
            <button class="update-btn" onclick="updateProduct(${i})">Update</button>
        </td>
        <td>
            <button class="delete-btn" onclick="deleteProduct(${i})">Delete</button>
        </td>
        
        </tr>
    `;
                showData();
            }
            document.getElementById('tbody').innerHTML = table;

        }

    }

}



