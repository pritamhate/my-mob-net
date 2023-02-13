const mCards = document.getElementById('mobileCards');
const cartList = document.getElementById('cartItem');
const totalAmt = document.getElementById('totalAmount');
const totalAmountForEmi = document.getElementById('amount');
async function prit() {
    console.log("indide the prit");

    let res = await fetch('https://dummyjson.com/products/category/smartphones');
    console.log('before response');
    let details = await res.json();
    return details;
}

let d = prit();

d.then(data => {
    let products = data.products;
    //console.log(products);
    for (product of products) {
        //console.log(product);
        mCards.innerHTML += `
            <div class="col-12 col-md-4 mb-5">
                <div class="card h-100">
                    <div class="badge bg-danger text-white position-absolute" style="top: 0.5rem; right: 0.5rem">-${Math.round(product.discountPercentage)}%
                    </div>
                    <img class="card-img-top" src="${product.images[0]}" alt="${product.title}" />
                    <div class="card-body p-4">
                        <div class="text-center">
                            <h5 class="fw-bolder" id="productTitle">${product.title}</h5>
                            <span>${product.brand}</span>
                            <br>
                            <span class="text-muted text-decoration-line-through">$${product.price}</span>
                            <b>$${Math.round(product.price - (product.price * product.discountPercentage / 100))}</b>
                        </div>
                    </div>
                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div class="d-flex">
                        <a class="btn btn-outline-dark mt-auto" href="javascript:void(0)" onclick="addtocart(this)" id="addToCart">Add to cart</a>
                        <a class="btn btn-outline-dark mt-auto ms-auto" href="javascript:void(0)" onclick="calculateEmi(this)" id="calculateEmi"  data-bs-toggle="offcanvas" data-bs-target="#emiPanel"
                        aria-controls="emiPanel">Calculate EMI</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
})

let countOfCart = 0;
let cartCount = document.getElementById('cartCount');
cartCount.innerText = countOfCart;
let cartItems = [];

let cartItem;

let ta = 0;
totalAmt.innerText = `$${ta}`;

//add items to cart
function addtocart(e) {
    let parentNode = e.parentNode.parentNode.parentNode;
    let childNodes = parentNode.childNodes;

    let productName = childNodes[5].childNodes[1].childNodes[1].innerText;
    let productPrice = childNodes[5].childNodes[1].childNodes[9].innerText;

    cartItem = {
        pname: productName,
        pprice: Number(productPrice.replace("$","")),
    };

    cartItems.push(cartItem);

    countOfCart = countOfCart + 1;
    cartCount.innerText = countOfCart;

    for (item of cartItems) {
        cartItems = [];

        //total amount
        ta = ta + item.pprice;

        totalAmt.innerText = `$${ta}`;

        cartList.innerHTML+= `
            <li class="list-group-item">
                <span>${item.pname}</span>
                <b>$${item.pprice}</b>
                <button class="btn btn-danger">Delete</button>
            </li>
        `;
    }
}

//remove item from cart

//calculatr emi

function calculateEmi(a) {
    let emiParentNode = a.parentNode.parentNode.parentNode;
    let emiChildNodes = emiParentNode.childNodes;

    

    let emiProductName = emiChildNodes[5].childNodes[1].childNodes[1].innerText;
    let emiProductPrice = emiChildNodes[5].childNodes[1].childNodes[9].innerText;
    let epp = Number(emiProductPrice.replace("$",""));

    console.log(emiProductName, epp);

    totalAmountForEmi.value = epp;
}

function computeLoan() {
    //const calculete_btn = document.querySelector("#btn");
    const amount = document.querySelector("#amount").value;
    const interest_rate = document.querySelector("#interest_rate").value;
    const months = document.querySelector("#months").value;
    const interest = (amount * (interest_rate * 0.01)) / months;
    const totalWithInterest = (Number(amount) + Number(interest));
    let payment = (amount / months + interest).toFixed(2);
    payment = payment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    document.querySelector(
      "#payment"
    ).innerHTML = `Monthly Payment = $${Math.round(payment)} with the interest rate of ${interest_rate} the additinal amount to be paid is $${Math.round(interest)} & the total amount is ${Math.round(totalWithInterest)}`;
  }