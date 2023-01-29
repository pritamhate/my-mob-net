const mCards = document.getElementById('mobileCards');
const cartList = document.getElementById('cartItem');
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
                        <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="javascript:void(0)" onclick="addtocart(this)" id="addToCart">Add to cart</a>
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

//add items to cart
function addtocart(e) {
    let parentNode = e.parentNode.parentNode.parentNode;
    let childNodes = parentNode.childNodes;

    let productName = childNodes[5].childNodes[1].childNodes[1].innerText;
    let productPrice = childNodes[5].childNodes[1].childNodes[9].innerText;

    let cartItem = {
        pname: productName,
        pprice: Number(productPrice.replace("$","")),
    };

    cartItems.push(cartItem);

    countOfCart = countOfCart + 1;
    cartCount.innerText = countOfCart;

    for (item of cartItems) {
        cartItems = [];
        console.log(item.pprice);

        cartList.innerHTML+= `
            <li class="list-group-item">
                <span>${item.pname}</span>
                <b>$${item.pprice}</b>
                <button class="btn btn-danger">Delete</button>
            </li>
        `;
    }
}