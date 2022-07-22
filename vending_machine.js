let products = ["apple", "orange", "grape", "pear", "lime", "strawberry", "watermelon", "banana", "cherry"];

let price = {
    "apple" : 4.00,
    "orange" : 5.00,
    "grape" : 7.20,
    "pear" : 4.75,
    "lime" : 12.00,
    "strawberry" : 22.90,
    "watermelon" : 0.50,
    "banana" : 120.00,
    "cherry" : 2.40
}

let color = {
    "apple" : "red",
    "orange" : "orange",
    "grape" : "purple",
    "pear" : "yellow",
    "lime" : "greenyellow",
    "strawberry" : "pink",
    "watermelon" : "green",
    "banana" : "gold",
    "cherry" : "hotpink"
}

let picUrl = {
    "apple" : "https://media.istockphoto.com/photos/red-apple-picture-id184276818?k=20&m=184276818&s=612x612&w=0&h=QxOcueqAUVTdiJ7DVoCu-BkNCIuwliPEgtAQhgvBA_g=",
    "orange" : "https://media.istockphoto.com/photos/orange-picture-id185284489?k=20&m=185284489&s=612x612&w=0&h=LLY2os0YTG2uAzpBKpQZOAC4DGiXBt1jJrltErTJTKI=",
    "grape" : "https://www.collinsdictionary.com/images/full/grape_229112122.jpg",
    "pear" : "https://www.producemarketguide.com/sites/default/files/Commodities.tar/Commodities/pears_commodity-page.png",
    "lime" : "https://belvoir-university-health.s3.amazonaws.com/media/2020/06/08160241/benefits-of-lime.jpg",
    "strawberry" : "https://th-thumbnailer.cdn-si-edu.com/HbjgFTByNBHi4ylALyGYvxr7_5E=/fit-in/1600x0/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/39/3c/393c51d9-ce11-49ce-9d41-5ef599dfabea/bn8e34.jpg",
    "watermelon" : "https://www.gardeningknowhow.com/wp-content/uploads/2021/05/whole-and-slices-watermelon.jpg",
    "banana" : "https://domf5oio6qrcr.cloudfront.net/medialibrary/6372/202ebeef-6657-44ec-8fff-28352e1f5999.jpg",
    "cherry" : "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Cherry_Stella444.jpg/640px-Cherry_Stella444.jpg"
}


class Fruit{
    constructor(name, price, picUrl){
        this.name = name;
        this.price = price;
        this.picUrl = picUrl;
    }
}

color


let fruitObjList = [];

for(let i = 0; i < products.length; i++){
    let f = products[i];
    fruitObjList.push(new Fruit(f, price[f], picUrl[f]));
}

let slider = document.getElementById("slider");
slider.setAttribute("data-index", "0");

let main = document.createElement("div");
main.classList.add("full-width", "main");
let extra = document.createElement("div");
extra.classList.add("full-width", "extra");

let none = document.createElement("div");
none.classList.add("d-none");
slider.append(none);
for(let i = 0; i < fruitObjList.length; i++){
    let fruitObj = fruitObjList[i];
    let product = document.createElement("img");
    product.classList.add("fruit", "product");
    product.src = fruitObj.picUrl;
    none.append(product);
}
let fruits = document.querySelectorAll(".fruit");


main.append(fruits[0]);
main.classList.add("col-12");
slider.append(main);


function sliderShow(currentIndex, nextIndex, animationType){
    if(main.classList.contains("col-12")){
        main.classList.remove("col-12");
    }
    slider.innerHTML = "";
    main.innerHTML = "";
    extra.innerHTML = "";
    main.classList.add("expand-animation");
    extra.classList.add("deplete-animation");
    main.append(fruits[nextIndex]);
    extra.append(fruits[currentIndex]);
    if(animationType == "left"){
        slider.append(main, extra);
    }
    else{
        slider.append(extra, main);
    }
}

function createBtns(){
    let btnArea = document.getElementById("btn-area");

    for(let i = 1; i <= fruitObjList.length; i++){
    let btn = `
        <button class="btn col-3 m-1 product-btn" style="background-color:lightskyblue">${i}</button>
    `
    btnArea.innerHTML += btn;
    }
}

createBtns();

let buttons = document.querySelectorAll(".product-btn");
for(let i = 0; i < buttons.length; i++){
    setEvent(buttons[i]);
}



function setEvent(ele){
    ele.addEventListener("click", function(){
        let curretIndex = parseInt(slider.getAttribute("data-index"));
        let nextIndex = parseInt(ele.innerHTML) - 1;

        let direction = "left";
        if(curretIndex == nextIndex) return;
        else if(curretIndex < nextIndex){
            direction = "right";
        }

        let diff = Math.abs(curretIndex - nextIndex);
        if(diff > buttons.length / 2){
            direction = direction == "left" ? "right" : "left";
        }
        slider.setAttribute("data-index", nextIndex.toString());
        displayProduct(nextIndex);
        sliderShow(curretIndex, nextIndex, direction);
    })
}

function displayProduct(index){
    let display = document.getElementById("display");
    display.innerHTML = "";
    display.innerHTML = `
        <p class="my-3 mx-0">${products[index]}</p>
            <p>$ ${price[products[index]]}</p>
    `

    let sProduct = document.getElementById("small-product");
    sProduct.innerHTML = "";
    sProduct.innerHTML = `
        <div class="d-flex product justify-content-center align-items-center text-white">
            <img src=${picUrl[products[index]]} class="product">
        </div>
    `
}

let purchase = document.getElementById("purchase");
let total = 0;

purchase.addEventListener("click", function(){
    let f = products[parseInt(slider.getAttribute("data-index"))];
    let p = price[f];
    total += p;
    if(f == "apple" || f == "orange"){
        alert("Thank you for buying an " + f + " ($" + p + ")\n\n" + "You spent a total of $" + total + " on fruits");
    }
    else{
        alert("Thank you for buying a " + f + "! ($" + p + ")\n\n" + "You spent a total of $" + total + " on fruits");
    }
})
