const products=[
{id:1,fa:"ترشی مخلوط ویژه",en:"Signature Mixed Pickles",cat:"mixed",price:8.9,weight:"450 گرم",emoji:"🥒🌶️🫑",descFa:"ترکیبی ترد و خوش‌عطر از سبزیجات تازه، سیر و ادویه‌های معطر.",descEn:"A crisp mix of fresh vegetables, garlic and aromatic spices."},
{id:2,fa:"ترشی لیته خانگی",en:"Homestyle Liteh",cat:"liteh",price:7.5,weight:"450 گرم",emoji:"🥕🫑",descFa:"لیته نرم و خوش‌طعم با دستور خانگی و سبزیجات تازه.",descEn:"A smooth, flavorful homestyle liteh made with fresh vegetables."},
{id:3,fa:"خیارشور ترد زوالی",en:"Crispy Pickled Cucumbers",cat:"cucumber",price:7.9,weight:"500 گرم",emoji:"🥒",descFa:"خیارشور ترد با طعم متعادل و بافتی دلپذیر.",descEn:"Crisp pickled cucumbers with a balanced flavor and satisfying bite."},
{id:4,fa:"ترشی فلفل و سیر",en:"Chili & Garlic Pickles",cat:"spicy",price:8.5,weight:"400 گرم",emoji:"🌶️🧄",descFa:"انتخابی تند و پرعطر برای دوستداران طعم‌های جسورانه.",descEn:"A bold, aromatic choice for lovers of spicy flavors."},
{id:5,fa:"ترشی سیر",en:"Pickled Garlic",cat:"spicy",price:8.2,weight:"350 گرم",emoji:"🧄",descFa:"سیر ترشی خوش‌عطر و مناسب کنار انواع غذا.",descEn:"Aromatic pickled garlic, perfect alongside a variety of dishes."},
{id:6,fa:"ترشی بندری",en:"Bandari Pickles",cat:"spicy",price:8.8,weight:"450 گرم",emoji:"🌶️🥕",descFa:"ترشی بندری پرادویه با طعم گرم و جنوبی.",descEn:"Spiced Bandari-style pickles with a warm southern character."}
];
let lang="fa",cart=[],current=null;
const $=s=>document.querySelector(s);
function renderProducts(){
 let q=$("#search").value.trim().toLowerCase(), c=$("#category").value;
 let list=products.filter(p=>(c==="all"||p.cat===c)&&((p.fa+" "+p.en).toLowerCase().includes(q)));
 $("#products").innerHTML=list.map(p=>`<article class="card">
 <div class="product-img" onclick="openProduct(${p.id})">${p.emoji}</div>
 <h3>${lang==="fa"?p.fa:p.en}</h3><p>${p.weight} · 100% handcrafted</p>
 <div class="price-row"><span class="price">€${p.price.toFixed(2)}</span><button class="buy" onclick="add(${p.id})">${lang==="fa"?"افزودن":"Add"}</button></div></article>`).join("")||`<p>محصولی پیدا نشد.</p>`;
}
function renderCart(){
 $("#count").textContent=cart.reduce((a,x)=>a+x.qty,0);
 $("#items").innerHTML=cart.length?cart.map(x=>`<div class="cart-row"><span>${lang==="fa"?x.fa:x.en} × ${x.qty}</span><b>€${(x.price*x.qty).toFixed(2)}</b></div>`).join(""):`<p style="color:#87958e">${lang==="fa"?"سبد خرید شما خالی است.":"Your cart is empty."}</p>`;
 let subtotal=cart.reduce((a,x)=>a+x.price*x.qty,0), ship=subtotal?3.9:0;
 $("#ship").textContent="€"+ship.toFixed(2);$("#total").textContent="€"+(subtotal+ship).toFixed(2);
}
function renderText(){document.documentElement.lang=lang;document.documentElement.dir=lang==="fa"?"rtl":"ltr";document.querySelectorAll("[data-fa]").forEach(e=>e.innerHTML=e.dataset[lang]);$("#lang").textContent=lang==="fa"?"EN":"FA";$("#search").placeholder=$("#search").dataset[lang+"Placeholder"]||"Search";renderProducts();renderCart()}
window.add=id=>{let p=products.find(x=>x.id===id),x=cart.find(x=>x.id===id);x?x.qty++:cart.push({...p,qty:1});renderCart();$("#drawer").classList.add("open");$("#shade").classList.add("on")};
window.openProduct=id=>{current=products.find(p=>p.id===id);$("#home").classList.add("hidden");$("#productPage").classList.remove("hidden");$("#productPage").innerHTML=`<button class="back" onclick="goHome()">← ${lang==="fa"?"بازگشت به فروشگاه":"Back to shop"}</button><div class="product-detail"><div class="big-img">${current.emoji}</div><div><span class="eyebrow">${current.cat}</span><h1>${lang==="fa"?current.fa:current.en}</h1><p>${lang==="fa"?current.descFa:current.descEn}</p><div class="detail-price">€${current.price.toFixed(2)}</div><div class="qty"><button onclick="changeQty(-1)">−</button><b id="qty">1</b><button onclick="changeQty(1)">+</button></div><button class="primary" onclick="addQty()">افزودن به سبد خرید</button></div></div>`};
window.changeQty=n=>{$("#qty").textContent=Math.max(1,Number($("#qty").textContent)+n)};
window.addQty=()=>{for(let i=0;i<Number($("#qty").textContent);i++)add(current.id)};
window.goHome=()=>{$("#productPage").classList.add("hidden");$("#home").classList.remove("hidden");location.hash="shop"};
$("#lang").onclick=()=>{lang=lang==="fa"?"en":"fa";renderText();if(current&&!$("#productPage").classList.contains("hidden"))openProduct(current.id)};
$("#search").oninput=renderProducts;$("#category").onchange=renderProducts;
$("#cartBtn").onclick=()=>{$("#drawer").classList.add("open");$("#shade").classList.add("on")};
$("#close").onclick=()=>{$("#drawer").classList.remove("open");$("#shade").classList.remove("on")};$("#shade").onclick=()=>$("#close").click();
$("#checkout").onclick=()=>alert(lang==="fa"?"مرحله اتصال درگاه پرداخت در نسخه نهایی فعال می‌شود.":"Payment gateway integration will be enabled in the final version.");
renderText();