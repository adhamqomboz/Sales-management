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
var is_edit = false;
var editId = 0;




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
    if(!title.value){
        return;
    }
    // getTotal();
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
        is_edit=false
        create_button.innerText = 'Create';


    } else {
        products.push(newPro);
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
    if (products.length > 0) {
        tagTable.classList.replace('hidden', 'block');
    }
    var table = '';

    for (let i = 0; i < products.length; i++) {
        table += `
        <tr>
        <td>${i}</td>
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
    // let btnDelete = document.getElementById('deleteAll')
    // if (products.length > 0) {
    //     btnDelete.innerHTML = `
    //                 <button >Delete All </button>

    //     `
    // }
}

showData();

// delete


function deleteProduct(i) {
    products.splice(i, 1)
    localStorage.setItem('product', JSON.stringify(products));
    showData();
}


// count
// update

function updateProduct(i) {
    is_edit = true;
    create_button.innerText = 'Edit';
    // products.splice(i, 0)
    editId = i;
    title.value = products[i].title
    price.value = products[i].price
    taxes.value = products[i].taxes
    ads.value = products[i].ads
    category.value = products[i].category
    count.value = products[i].count
    discount.value = products[i].discount
    getTotal();

    // total.innerHTML = 'Total:';
    // total.style.background = 'rgb(229, 13, 13)';
}


// searching 














