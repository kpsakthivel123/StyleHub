const products=[
{id:1,name:"Classic T-Shirt",price:599,sizes:["S","M","L","XL"],cat:"Men",icon:"👕"},
{id:2,name:"Denim Jacket",price:1499,sizes:["M","L","XL"],cat:"Unisex",icon:"🧥"},
{id:3,name:"Casual Hoodie",price:999,sizes:["S","M","L"],cat:"Unisex",icon:"🧥"},
{id:4,name:"Summer Dress",price:1299,sizes:["S","M","L"],cat:"Women",icon:"👗"},
{id:5,name:"Cargo Pants",price:1099,sizes:["M","L","XL"],cat:"Men",icon:"👖"},
{id:6,name:"Sneakers",price:1799,sizes:["S","M","L","XL"],cat:"Unisex",icon:"👟"}
];

let cart=JSON.parse(localStorage.getItem("stylehub_cart")||"[]");
let wishlist=JSON.parse(localStorage.getItem("stylehub_wishlist")||"[]");

function save(){localStorage.setItem("stylehub_cart",JSON.stringify(cart));localStorage.setItem("stylehub_wishlist",JSON.stringify(wishlist));updateCount()}
function updateCount(){let e=document.getElementById("cartCount");if(e)e.textContent=cart.reduce((s,x)=>s+x.qty,0)}
function renderProducts(){
 const grid=document.getElementById("productGrid"); if(!grid)return;
 const q=(document.getElementById("search").value||"").toLowerCase();
 const size=document.getElementById("sizeFilter").value,cat=document.getElementById("categoryFilter").value;
 grid.innerHTML="";
 products.filter(p=>(p.name.toLowerCase().includes(q))&&(size==="all"||p.sizes.includes(size))&&(cat==="all"||p.cat===cat))
 .forEach(p=>{grid.innerHTML+=`<article class="card"><div class="pic">${p.icon}</div><h3>${p.name}</h3><p>${p.cat} • Sizes: ${p.sizes.join(", ")}</p><p class="price">₹${p.price}</p><div class="actions"><button onclick="addCart(${p.id})">Add to Cart</button><button class="wish" onclick="toggleWish(${p.id})">♡ Wishlist</button></div></article>`});
}
function addCart(id){let x=cart.find(i=>i.id===id);x?x.qty++:cart.push({id,qty:1});save();alert("Added to cart!")}
function toggleWish(id){wishlist.includes(id)?wishlist=wishlist.filter(x=>x!==id):wishlist.push(id);save();renderWishlist()}
function renderWishlist(){const b=document.getElementById("wishlistBox");if(!b)return;if(!wishlist.length){b.textContent="Your wishlist is empty.";return}b.innerHTML=wishlist.map(id=>{let p=products.find(x=>x.id===id);return `<span style="margin-right:15px">${p.icon} ${p.name} <button class="remove" onclick="toggleWish(${p.id})">Remove</button></span>`}).join("")}
function renderCart(){const b=document.getElementById("cartBox");if(!b)return;if(!cart.length){b.innerHTML="<p>Your cart is empty.</p>";document.getElementById("total").textContent="0";return}let total=0;b.innerHTML=cart.map(i=>{let p=products.find(x=>x.id===i.id);total+=p.price*i.qty;return `<div class="cart-item"><b>${p.icon} ${p.name}</b><p>₹${p.price} × <input class="qty" type="number" min="1" value="${i.qty}" onchange="changeQty(${p.id},this.value)"> <button class="remove" onclick="removeCart(${p.id})">Remove</button></p></div>`}).join("");document.getElementById("total").textContent=total}
function changeQty(id,q){let x=cart.find(i=>i.id===id);x.qty=Math.max(1,Number(q)||1);save();renderCart()}
function removeCart(id){cart=cart.filter(i=>i.id!==id);save();renderCart()}
document.addEventListener("DOMContentLoaded",()=>{updateCount();renderProducts();renderWishlist();renderCart();["search","sizeFilter","categoryFilter"].forEach(id=>{let e=document.getElementById(id);if(e)e.addEventListener("input",renderProducts);});let f=document.getElementById("checkoutForm");if(f)f.addEventListener("submit",e=>{e.preventDefault();cart=[];save();document.getElementById("orderMsg").textContent="Order placed successfully! Thank you for shopping with StyleHub.";f.reset()})});