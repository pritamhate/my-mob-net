const mCards = document.getElementById('mobileCards');
let countOfCart = 0;
let spc = 2;
let cartCount = document.getElementById('cartCount');
const cartList = document.getElementById('cartItem');
const totalAmountForEmi = document.getElementById('amount');

let totalAmtOfCart = document.getElementById('totalAmtOfCart');
let shippingCharges = document.getElementById('shippingCharges');
let totalAmtOfCartWithShipping = document.getElementById('totalAmtOfCartWithShipping');

totalAmtOfCart.innerText = "$0";
shippingCharges.innerText = "$0";
totalAmtOfCartWithShipping.innerText = "$0";

let shiping = 2;

async function mystore() {
    let res = await fetch('https://dummyjson.com/products/category/smartphones');
    let products = await res.json();
    return products;
}

let d = mystore();

d.then(data => {
    // let products = data.products;
    // console.log(products);
    //console.log(data.products);

    let allProducts = data.products;

    localStorage.setItem("products", JSON.stringify(data.products));

    for(p of allProducts) {
        //console.table(p.id, p.title, p.thumbnail, p.price, p.discountPercentage, p.rating);

        mCards.innerHTML += `
            <div class="col-12 col-md-4 mb-5">
                <div class="card h-100">
                    <div class="badge bg-danger text-white position-absolute" style="top: 0.5rem; right: 0.5rem">-${Math.round(p.discountPercentage)}%
                    </div>
                    <img class="card-img-top" src="${p.images[0]}" alt="${p.title}" />
                    <div class="card-body p-4">
                        <div class="text-center">
                            <h5 class="fw-bolder" id="productTitle">${p.title}</h5>
                            <span>${p.brand}</span>
                            <br>
                            <span class="text-muted text-decoration-line-through">$${p.price}</span>
                            <b>$${Math.round(p.price - (p.price * p.discountPercentage / 100))}</b>
                        </div>
                    </div>
                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div class="d-flex">
                        <a class="btn btn-outline-dark mt-auto" href="javascript:void(0)" onclick="addItemToCart(${p.id})" id="addToCart">Add to cart</a>
                        <a class="btn btn-outline-dark mt-auto ms-auto" href="javascript:void(0)" onclick="calculateEmi(this)" id="calculateEmi"  data-bs-toggle="offcanvas" data-bs-target="#emiPanel"
                        aria-controls="emiPanel">Calculate EMI</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    if(!localStorage.getItem("cart")){
        localStorage.setItem("cart", "[]")
    }
});

let products = JSON.parse(localStorage.getItem("products"));
let cart = JSON.parse(localStorage.getItem("cart"));

//add product to the cart
function addItemToCart(pid) {
    let product = products.find(function(product){
        return product.id == pid;
    });

    if(cart.length == 0){
        cart.push(product);
        //console.log("cart2", product);
    } else {
        let res = cart.find(element => element.id == pid);
        //console.log("res defined", res);
        if(res === undefined){
            //console.log("res un defined", res);
            cart.push(product);
        }
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    location.reload();
}

//addItemToCart(4);

let cartItems = [];
//remove product from cart
function removeItemFromCart(pid){
    let temp = cart.filter(item => item.id != pid);
    localStorage.setItem("cart", JSON.stringify(temp));

    location.reload();
}

//update the product qty
function updateQuantity(pid, qty) {
    for(let product of cart) {
        if(product.id == pid) {
            product.qty = qty;
        }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
}

updateQuantity(4,8);

//get the total of cart item
function getTotal() {
    let temp = cart.map(function(item){
        return parseFloat(item.price);
    });
    let tempQty = cart.map(function(item){
        return parseFloat(item.qty);
    });
    let sum = temp.reduce(function(prev, next){
        return prev + next;
    }, 0);


    totalAmtOfCart.innerText = `$${sum}`;
    shippingCharges.innerText = `$${spc}`;
    totalAmtOfCartWithShipping.innerText = `$${sum + spc}`;

    console.log("sum",sum * tempQty);
}

getTotal();

if(!localStorage.getItem("cart")){
    localStorage.setItem("cart", "[]")
}
cartItems = localStorage.getItem("cart", JSON.stringify(cart));
countOfCart = JSON.parse(cartItems);
cartCount.innerText = countOfCart.length;

for (let ci=0; ci < countOfCart.length; ci++) {
    console.log(countOfCart[ci]);
    cartList.innerHTML+= `
        <tr>
            <td>
                <strong>${countOfCart[ci].title}</strong>
            </td>
            <td style="display:none;">
                <form class="form-inline d-flex" style="width: fit-content;">
                    <input class="form-control" type="number" value="${countOfCart[ci].qty}" style="width: 50px;">
                    <button rel="tooltip" class="btn btn-primary ms-2">Update</button>
                </form>
            </td>
            <td>$${countOfCart[ci].price}</td>
            <td style="display:none;">$${countOfCart[ci].price * countOfCart[ci].qty}</td>
            <td>
                <a href="#" class="btn btn-danger" onclick="removeItemFromCart(${countOfCart[ci].id})">Delete</a>
            </td>
        </tr>
    `;
}

//calculatr emi

function calculateEmi(a) {
    let emiParentNode = a.parentNode.parentNode.parentNode;
    let emiChildNodes = emiParentNode.childNodes;
    const emiPanelTitle = document.getElementById("emiPanelLabel");

    

    let emiProductName = emiChildNodes[5].childNodes[1].childNodes[1].innerText;
    let emiProductPrice = emiChildNodes[5].childNodes[1].childNodes[9].innerText;
    let epp = Number(emiProductPrice.replace("$",""));

    console.log(emiProductName, epp);

    emiPanelTitle.innerHTML = `Calculate Emi for: ${emiProductName}`;

    totalAmountForEmi.value = epp;
}

function computeLoan() {
    //const calculete_btn = document.querySelector("#btn");
    const amount = document.querySelector("#amount").value;
    const interest_rate = document.querySelector("#interest_rate").value;
    const months = document.querySelector("#months").value;
    const interest = (amount * (interest_rate * 0.01)) / months;
    const totalWithInterest = (Number(amount) + Number(interest));
    const emiResult = document.querySelector("#emiChart");
    let payment = (amount / months + interest).toFixed(2);
    payment = payment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //document.querySelector("#payment").innerHTML = `Monthly Payment = $${Math.round(payment)} with the interest rate of ${interest_rate} the additinal amount to be paid is $${Math.round(interest)} & the total amount is $${Math.round(totalWithInterest)}`;

    emiResult.innerHTML = `
    <tr>
        <th scope="row">Amount</th>
        <td>$${amount}</td>
    </tr>
    <tr>
        <th scope="row">Interest Rate</th>
        <td>${interest_rate}</td>
    </tr>
    <tr>
        <th scope="row">Total Interest</th>
        <td>$${Math.round(interest)}</td>
    </tr>
    <tr>
        <th scope="row">Total Interest + Amount</th>
        <td>$${Math.round(totalWithInterest)}</td>
    </tr>
    <tr>
        <th scope="row">EMI for ${months} Months</th>
        <td>$${Math.round(payment)}</td>
    </tr>
    `;
}

const myOffcanvas = document.getElementById('emiPanel')
myOffcanvas.addEventListener('hidden.bs.offcanvas', event => {
    const emiResult = document.querySelector("#emiChart");
    emiResult.innerHTML = `
    <tr>
        <td scope="row" class="text-center text-bold">Calculate To See The Result</td>
    </tr>
    `;
});