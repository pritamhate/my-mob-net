const mCards = document.getElementById('mobileCards');
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
        console.log(product);
        mCards.innerHTML += `
            <div class="col mb-5">
                <div class="card h-100">
                    <!-- Sale badge-->
                    <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Sale
                    </div>
                    <!-- Product image-->
                    <img class="card-img-top" src="${product.images[0]}" alt="${product.title}" />
                    <!-- Product details-->
                    <div class="card-body p-4">
                        <div class="text-center">
                            <!-- Product name-->
                            <h5 class="fw-bolder">${product.title}<br><span>${product.brand}</span></h5>
                            <!-- Product price-->
                            <span class="text-muted text-decoration-line-through">$${product.price}</span>
                            <span>$${product.price - (product.price * product.discountPercentage / 100)}</span>
                        </div>
                    </div>
                    <!-- Product actions-->
                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">Add to cart</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
})