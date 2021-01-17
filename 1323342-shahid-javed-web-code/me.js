//  it will target all add to cart anchor tags
let carts = document.querySelectorAll('.add-cart');
// product is a Array with object in it. 
let products = [
    // Object gloves
    {
        name: 'Black Gloves',
        tag: 'blackgloves',
        price: 20,
        inCart: 0,
        image: '1.jpg',
    },
    {
        name: 'Green Gloves',
        tag: 'greengloves',
        price: 25,
        inCart: 0,
        image: '2.jpg',
    },
    // Object helmet
    {
        name: 'Green Helmet',
        tag: 'blackhelmet',
        price: 40,
        inCart: 0,
        image: 'h1.jpg',
    },
    {
        name: 'White Helmet',
        tag: 'whitehelmet',
        price: 45,
        inCart: 0,
        image: 'h3.jpg',
    },
    // Object pads
    {
        name: 'Black & white pads',
        tag: 'black&whitepads',
        price: 30,
        inCart: 0,
        image: 'p2.jpg',
    },
    {
        name: 'White & Blue Pads',
        tag: 'white&bluepads',
        price: 35,
        inCart: 0,
        image: 'p4.jpg',
    },
    //Object ball
    {
        name: 'Club Ball',
        tag: 'clubball',
        price: 12,
        inCart: 0,
        image: 'b3.jpg',
    },
    {
        name: 'Youth Ball',
        tag: 'youthball',
        price: 10,
        inCart: 0,
        image: 'b1.jpg',
    }
]

// for loop which will run from 0 to the length of the array
for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i])
    }
    )
}
/* this function will be called at the bottom of the page so 
when ever the page will reload this function is going to run and it will
check the local storage */
function onLoadCartNumbers() {
    /* productNumber is a variable which is going to chech the local storage
           for the product if it exist  */
    let productNumbers = localStorage.getItem('cartNumbers');
    /* if there are some product in the local storage the number 
        to be set as the number of products in the local storage   */

    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}
// this function is connected to the event listener
function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');
    // parseInt converts string into numbers
    productNumbers = parseInt(productNumbers);
    /* if product exist in the cart it will be true  and will 
    increase the quantity of the product by one */
    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
        //other wise set number to one in the cart    
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product);
}
// setting cart items equal to the items in the local storage
function setItems(product) {
    // going to be the cart items
    let cartItems = localStorage.getItem('productsInCart');
    //  converted cart items to numbers with jason.parse 
    cartItems = JSON.parse(cartItems);
    //if cart items are different than null
    if (cartItems != null) {
        // if cart item is equal to undefined
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                // using rest operators
                ...cartItems,
                [product.tag]: product
            }
        }
        //  update the cart with 1
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;

        cartItems = {
            [product.tag]: product
        }


    }
    //jason object are getting passed to the local storage by strinify
    localStorage.setItem("productsInCart", JSON.stringify
        (cartItems));
}
// total cost function
function totalCost(product) {
    /*console.log("price of the product is", product.price);
    / checking if there is any thing on the local storage */
    let cartCost = localStorage.getItem('totalCost');

    console.log("My cart cost is", cartCost);
    console.log(typeof cartCost);
    // if cart cost is not null
    if (cartCost != null) {
        //  converting from string to number
        cartCost = parseInt(cartCost);
        /*local storage is going to be any thing already there plus 
        new product price which are being clicked */
        localStorage.setItem("totalCost", cartCost + product.price);
    }

    else {
        localStorage.setItem("totalCost", product.price);
    }
}
//display cart items function will run when load the page first
function displayCart() {
    //cart items are going to be products in the cart in local storage
    let cartItems = localStorage.getItem("productsInCart");
    // converting jason strings into java script numbers
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector
        (".products");
    let cartCost = localStorage.getItem('totalCost');
    console.log(cartItems);
    /*checking if cart items and product 
    container is there then function will run */
    if (cartItems && productContainer) {
        //    first time on load empty
        productContainer.innerHTML = '';
        // check the values of the cart items
        Object.values(cartItems).map(item => {
            // second time it will add and so on  
            productContainer.innerHTML +=
                /*    injecting code(variables) with back ticks like 
                closing icon, product image, price, items in cart and 
                their prices. */
                `            
     <div class="product">
            <ion-icon name="close-circle"></ion-icon>
            <img src="./images/${item.image}">
            <span>${item.name}</span>
            </div>
            <div class="price">
               £${item.price}.00</div>
        <div class="quantity">
            <ion-icon class="decrease"
            name="arrow-dropleft-circle"></ion-icon>
            <span>${item.inCart}</span>
            <ion-icon class="increase"
            name="arrow-droprightt-circle"></ion-icon>
        </div>
            <div class="total">
               £${item.inCart * item.price}.00
            </div>
            `
        })
        productContainer.innerHTML += `
         <div class="basketTotalContainer">
             <h4 class="basketTotalTitle">
                 Basket Total
             </h4>
             <h4 class="basketTotal">
             £${cartCost}.00
             </h4>
             
        `;
    }
}
// on load cart number function is called
onLoadCartNumbers();
//here displayCart function is called
displayCart();
/*                     Reference
Telmo Sampaio's JavaScript Shopping Cart Tutorial, 2013 (video file), Available from:
https://www.youtube.com/watch?v=jga235t0um4[22 December2020]

*/