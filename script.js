/* ========= Editable Menu App =========
   Now includes:
   - Real dish photos via Unsplash dynamic queries
   - Fixed image fallback using placehold.co
   - Removes half-price section if not present
   - Simple Admin Login to access edit features
====================================== */

const STORAGE_KEY = "dhaba_menu_v1";
const ADMIN_EMAIL = "admin@dhaba.com";
const ADMIN_PASS = "12345";

/* --------- Helpers --------- */
function id(){ return "i" + Math.random().toString(36).slice(2, 9); }
function placeholder(tag){ 
  // Using reliable placehold.co as fallback
  return `https://placehold.co/160x160?text=${encodeURIComponent(tag)}`;
}

/* --------- Default menu (with real dish photo queries) --------- */
const DEFAULT_MENU = {
 "Veg": [
  { id: id(), name: "Kadai Vegetable", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYt8qDy7E7d2x-GZsDnV7yOKZlCKo7jV1AxA&s", fullPrice: 140 },
  { id: id(), name: "Aloo Dum", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6rcR8oM-0cb0V6FS6iWUxPpH9Ixm4EXv6Uw&s", fullPrice: 80 },
  { id: id(), name: "Malai Kofta", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgMWF5a7-3OepAGg7klEek4P3ZPySmf5ikAw&s", fullPrice: 140 },
  { id: id(), name: "Mix Veg Curry", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7tBdENIxyX1MTksMyRCyWfqCjTMsfIYo5zQ&s", fullPrice: 120 },
  { id: id(), name: "Paneer Butter Masala", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmhYTuLJ9TKLACtZGc_8EYCT6Fh3x9xY5oQA&s", fullPrice: 150 },
  { id: id(), name: "Paneer Do Pyaza", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV8sdYTxTr3dpS60EVCaHkeF9VUZq9-4Wr6Q&s", fullPrice: 150 },
  { id: id(), name: "Paneer Lababdar", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5ViqLTb1H8G7qRTbmwA8dwXrKqO-Y5EUfVQ&s", fullPrice: 160 },
  { id: id(), name: "Paneer Tikka Masala", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPnXo8Y3JqfCsdTbPVr2UMiYQkiRivMUtW6w&s", fullPrice: 160 },
  { id: id(), name: "Matar Paneer", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9AbE8uFfKZlIAGux5ec8VhWdr9cX4l88mgw&s", fullPrice: 130 },
  { id: id(), name: "Palak Paneer", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzjFgNsS7MXfrlwZ4QDwV2vEanZk4qxJ2Mhw&s", fullPrice: 130 },
  { id: id(), name: "Shahi Paneer", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkK7F9a-RBzwH3ydnEs5SKGHqDKCnb8jK1Og&s", fullPrice: 150 },
  { id: id(), name: "Paneer Bhurji", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3HzQY14A4P3iL8LM9a3HYD1hEdk1lKY9_QA&s", fullPrice: 140 },
  { id: id(), name: "Veg Korma", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKLgTrnVJtQW6OlKcIYX_A_t6tU8IhvQyi3A&s", fullPrice: 130 },
  { id: id(), name: "Chana Masala", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6A2gBEnj4oMdiRuIl27dbsYzz-y5-3eCClA&s", fullPrice: 100 },
  { id: id(), name: "Bhindi Masala", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQU9-wYzjH2MeaY8PCZKx6_YPtwVf9hl4IHg&s", fullPrice: 110 },
  { id: id(), name: "Aloo Gobi", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8xvAqgcEuq4BvkkFn7zMB-JsZpG0mY1ik2A&s", fullPrice: 110 },
  { id: id(), name: "Baingan Bharta", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyVhoBGuNsdCe1lD1pwa4B2p4dXz9O7mEq5A&s", fullPrice: 120 },
  { id: id(), name: "Dum Aloo", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9CSvT0Ouj5E5wYq6U5oLzF-l1x8v3uEv9fQ&s", fullPrice: 120 },
  { id: id(), name: "Jeera Aloo", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqXsaMxXcZ1lE2TRC2tN3R2cPpsHqBsvvTPA&s", fullPrice: 100 },
  { id: id(), name: "Dal Tadka", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1QgsnEdEzBEm1POZce8bQZV__4pM8aZdvSw&s", fullPrice: 100 },
  { id: id(), name: "Dal Fry", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJLLxSefTHOPFt0sVuXcRVMTQ1suMmxMn8uA&s", fullPrice: 100 },
  { id: id(), name: "Dal Makhani", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7ErV21vx1ZnAQ6kKZ8WexgHC4x2R6kUuQDw&s", fullPrice: 130 },
  { id: id(), name: "Veg Kofta", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUp5KQ3DSEaJXK7j7Z2uKuOKScI6CLeMkgMw&s", fullPrice: 130 },
  { id: id(), name: "Paneer Handi", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMmN0ZxFiC7ihXOkGxgxzJvT7HPQgi48oHzQ&s", fullPrice: 160 }
],
  "Drinks": [
    { id: id(), name: "Tea", img: "https://source.unsplash.com/featured/?tea,chai", fullPrice: 20 },
    { id: id(), name: "Coffee", img: "https://source.unsplash.com/featured/?coffee,black+coffee", fullPrice: 30 },
    { id: id(), name: "Cold Drinks (Sprite/Coke/Fanta/Thumbs Up)", img: "https://source.unsplash.com/featured/?soft+drink,soda", fullPrice: 50 }
  ],

  "Breads/Roti": [
    { id: id(), name: "Roti", img: "https://source.unsplash.com/featured/?roti,indian+bread", fullPrice: 10 },
    { id: id(), name: "Butter Roti", img: "https://source.unsplash.com/featured/?butter+roti,paratha", fullPrice: 15 },
    { id: id(), name: "Paratha", img: "https://source.unsplash.com/featured/?paratha,stuffed+paratha", fullPrice: 20 }
  ],

  "Starter": [
    { id: id(), name: "French Fries", img: "https://source.unsplash.com/featured/?french+fries,fries", fullPrice: 100 },
    { id: id(), name: "Pea Nut Masala", img: "https://source.unsplash.com/featured/?spicy+peas,masala+peanuts", fullPrice: 60 },
    { id: id(), name: "Kaju Fry", img: "https://source.unsplash.com/featured/?kaju,cajun+nuts", fullPrice: 100 },
    { id: id(), name: "Masala Papad", img: "https://source.unsplash.com/featured/?masala+papad,papad", fullPrice: 30 },
    { id: id(), name: "Papad Fry (2 Pcs)", img: "https://source.unsplash.com/featured/?fried+papad,papad+fry", fullPrice: 40 },
    { id: id(), name: "Dry Papad (2 Pcs)", img: "https://source.unsplash.com/featured/?papad,dry+papad", fullPrice: 20 },
    { id: id(), name: "Chana Fry", img: "https://source.unsplash.com/featured/?chana,chole", fullPrice: 80 },
    { id: id(), name: "Veg. Pakora", img: "https://source.unsplash.com/featured/?vegetable+pakora,pakora", fullPrice: 100 },
    { id: id(), name: "Paneer Pakora", img: "https://source.unsplash.com/featured/?paneer+pakora,paneer+fritter", fullPrice: 120 },
    { id: id(), name: "Chicken Pakora", img: "https://source.unsplash.com/featured/?chicken+pakora,chicken+fritter", fullPrice: 140 },
    { id: id(), name: "Crispy Baby Corn", img: "https://source.unsplash.com/featured/?crispy+baby+corn,baby+corn", fullPrice: 180 },
    { id: id(), name: "Paneer 65", img: "https://source.unsplash.com/featured/?paneer+65,indian+starter", fullPrice: 160 },
    { id: id(), name: "Baby Potato Fry", img: "https://source.unsplash.com/featured/?baby+potato+fry,potato+fries", fullPrice: 60 },
    { id: id(), name: "Chilli Paneer (Dry)", img: "https://source.unsplash.com/featured/?chilli+paneer,paneer+chilli", fullPrice: 150 }
  ],

  "Rolls": [
    { id: id(), name: "Veg Roll", img: "https://source.unsplash.com/featured/?vegetable+roll,wrap", fullPrice: 50 },
    { id: id(), name: "Egg Roll", img: "https://source.unsplash.com/featured/?egg+roll,egg+wrap", fullPrice: 70 },
    { id: id(), name: "Chicken Roll", img: "https://source.unsplash.com/featured/?chicken+roll,wrap+chicken", fullPrice: 90 },
    { id: id(), name: "Pork Roll", img: "https://source.unsplash.com/featured/?pork+roll,meat+roll", fullPrice: 100 }
  ],

  "Paneer": [
    { id: id(), name: "Matar Paneer", img: "https://source.unsplash.com/featured/?matar+paneer,paneer+peas", fullPrice: 140 },
    { id: id(), name: "Kadai Paneer", img: "https://source.unsplash.com/featured/?kadai+paneer,paneer+kadai", fullPrice: 150 },
    { id: id(), name: "Chilli Paneer (Gravy)", img: "https://source.unsplash.com/featured/?chilli+paneer+gravy,paneer+gravy", fullPrice: 160 },
    { id: id(), name: "Paneer Do Pyaza", img: "https://source.unsplash.com/featured/?paneer+do+pyaza,paneer+onions", fullPrice: 160 },
    { id: id(), name: "Paneer Butter Masala", img: "https://source.unsplash.com/featured/?paneer+butter+masala,paneer+curry", fullPrice: 170 },
    { id: id(), name: "Sahi Paneer", img: "https://source.unsplash.com/featured/?shahi+paneer,creamy+paneer", fullPrice: 180 },
    { id: id(), name: "Palak Paneer (Seasonal)", img: "https://source.unsplash.com/featured/?palak+paneer,spinach+paneer", fullPrice: 200 },
    { id: id(), name: "Paneer Masala", img: "https://source.unsplash.com/featured/?paneer+masala,paneer+spicy", fullPrice: 150 },
    { id: id(), name: "Paneer Lababdar", img: "https://source.unsplash.com/featured/?paneer+lababdar,creamy+paneer", fullPrice: 170 }
  ],

  "Sabji": [
    { id: id(), name: "Mix Vegetable", img: "https://source.unsplash.com/featured/?mixed+vegetable,curry+vegetable", fullPrice: 140 },
    { id: id(), name: "Aloo Dum", img: "https://source.unsplash.com/featured/?aloo+dum,spicy+potato", fullPrice: 80 },
    { id: id(), name: "Kadai Vegetable", img: "https://source.unsplash.com/featured/?kadai+vegetable,mixed+vegetable+kadai", fullPrice: 120 },
    { id: id(), name: "Jeera Aloo", img: "https://source.unsplash.com/featured/?jeera+aloo,cumin+potato", fullPrice: 90 },
    { id: id(), name: "Aloo Gobi", img: "https://source.unsplash.com/featured/?aloo+gobi,potato+cauliflower", fullPrice: 120 },
    { id: id(), name: "Malai Kofta (4 Pcs.)", img: "https://source.unsplash.com/featured/?malai+kofta,kofta+curry", fullPrice: 150 },
    { id: id(), name: "Aloo Bhaji", img: "https://source.unsplash.com/featured/?aloo+bhaji,homestyle+potato", fullPrice: 70 },
    { id: id(), name: "Channa Masala", img: "https://source.unsplash.com/featured/?channa+masala,chole", fullPrice: 120 }
  ],

  "Chinese": [
    { id: id(), name: "Veg. Hakka Noodles", img: "https://source.unsplash.com/featured/?hakka+noodles,vegetable+noodles", fullPrice: 100 },
    { id: id(), name: "Egg Hakka Noodles", img: "https://source.unsplash.com/featured/?egg+noodles,hakka+egg+noodles", fullPrice: 130 },
    { id: id(), name: "Chicken Hakka Noodles", img: "https://source.unsplash.com/featured/?chicken+noodles,hakka+chicken+noodles", fullPrice: 150 },
    { id: id(), name: "Pork Hakka Noodles", img: "https://source.unsplash.com/featured/?pork+noodles,hakka+pork", fullPrice: 150 },
    { id: id(), name: "Veg. Fried Rice", img: "https://source.unsplash.com/featured/?vegetable+fried+rice,fried+rice", fullPrice: 80 },
    { id: id(), name: "Egg Fried Rice", img: "https://source.unsplash.com/featured/?egg+fried+rice,egg+rice", fullPrice: 90 },
    { id: id(), name: "Chicken Fried Rice", img: "https://source.unsplash.com/featured/?chicken+fried+rice,fried+rice+chicken", fullPrice: 150 },
    { id: id(), name: "Pork Fried Rice", img: "https://source.unsplash.com/featured/?pork+fried+rice,pork+rice", fullPrice: 150 },
    { id: id(), name: "Schwezan Fried Rice", img: "https://source.unsplash.com/featured/?schezwan+fried+rice,schezwan+rice", fullPrice: 130 }
  ],

  "Rice & Biryani": [
    { id: id(), name: "Jeera Rice", img: "https://source.unsplash.com/featured/?jeera+rice,cumin+rice", fullPrice: 80 },
    { id: id(), name: "Plain Rice", img: "https://source.unsplash.com/featured/?plain+rice,steamed+rice", fullPrice: 60 },
    { id: id(), name: "Peas Pulao", img: "https://source.unsplash.com/featured/?peas+pulao,green+peas+pulao", fullPrice: 100 },
    { id: id(), name: "Veg Pulao", img: "https://source.unsplash.com/featured/?veg+pulao,vegetable+pulao", fullPrice: 100 },
    { id: id(), name: "Veg Biryani (Half / Full)", img: "https://source.unsplash.com/featured/?veg+biryani,vegetable+biryani", halfPrice: 100, fullPrice: 200 },
    { id: id(), name: "Egg Biryani (Half / Full)", img: "https://source.unsplash.com/featured/?egg+biryani,egg+biriyani", halfPrice: 120, fullPrice: 240 },
    { id: id(), name: "Chicken Biryani (Half / Full)", img: "https://source.unsplash.com/featured/?chicken+biryani,chicken+biriyani", halfPrice: 140, fullPrice: 280 },
    { id: id(), name: "Mutton Biryani (Half / Full)", img: "https://source.unsplash.com/featured/?mutton+biryani,mutton+biriyani", halfPrice: 170, fullPrice: 340 }
  ],

  "Egg": [
    { id: id(), name: "Egg Boil (Single)", img: "https://source.unsplash.com/featured/?boiled+egg,egg", fullPrice: 20 },
    { id: id(), name: "Egg Pouch", img: "https://source.unsplash.com/featured/?egg+pouch,egg+snack", fullPrice: 20 },
    { id: id(), name: "Egg Omlete (Double)", img: "https://source.unsplash.com/featured/?omelette,egg+omelette", fullPrice: 40 },
    { id: id(), name: "Egg Bhurji (Double)", img: "https://source.unsplash.com/featured/?egg+bhurji,spicy+eggs", fullPrice: 40 },
    { id: id(), name: "Egg Curry (Double Egg)", img: "https://source.unsplash.com/featured/?egg+curry,egg+gravy", fullPrice: 80 },
    { id: id(), name: "Egg Omlette Curry", img: "https://source.unsplash.com/featured/?omelette+curry,egg+gravy", fullPrice: 80 }
  ],

  "Chicken": [
    { id: id(), name: "Chicken Masala (Half / Full)", img: "https://source.unsplash.com/featured/?chicken+masala,spicy+chicken+curry", halfPrice: 140, fullPrice: 280 },
    { id: id(), name: "Chicken Curry (Half / Full)", img: "https://source.unsplash.com/featured/?chicken+curry,indian+chicken+curry", halfPrice: 140, fullPrice: 280 },
    { id: id(), name: "Chicken Dopyaza", img: "https://source.unsplash.com/featured/?chicken+dopyaza,spiced+chicken", fullPrice: 290 },
    { id: id(), name: "Chicken Kadai", img: "https://source.unsplash.com/featured/?kadai+chicken,chicken+kadai", fullPrice: 260 },
    { id: id(), name: "Chicken Butter Masala", img: "https://source.unsplash.com/featured/?chicken+butter+masala,butter+chicken", fullPrice: 350 },
    { id: id(), name: "Chicken Boil with Veg", img: "https://source.unsplash.com/featured/?boiled+chicken,boiled+chicken+veg", fullPrice: 300 },
    { id: id(), name: "Chicken Lollipop", img: "https://source.unsplash.com/featured/?chicken+lollipop,deep+fried+chicken", fullPrice: 180 },
    { id: id(), name: "Chicken 65", img: "https://source.unsplash.com/featured/?chicken+65,indian+starter", fullPrice: 150 },
    { id: id(), name: "Chicken Dry Fry", img: "https://source.unsplash.com/featured/?chicken+dry+fry,stir+fry+chicken", fullPrice: 150 },
    { id: id(), name: "Chicken Liver Fry", img: "https://source.unsplash.com/featured/?chicken+liver+fry,liver+fry", fullPrice: 150 },
    { id: id(), name: "Chicken Kebab (Bangalore Style)", img: "https://source.unsplash.com/featured/?chicken+kebab,kebab", fullPrice: 170 },
    { id: id(), name: "Chilli Chicken Dry", img: "https://source.unsplash.com/featured/?chilli+chicken,chilli+chicken+dry", fullPrice: 150 }
  ],

  "Local Chicken": [
    { id: id(), name: "Local Chicken Curry (Half / Full)", img: "https://source.unsplash.com/featured/?village+chicken+curry,local+chicken", halfPrice: 150, fullPrice: 300 },
    { id: id(), name: "Local Chicken Masala (Half / Full)", img: "https://source.unsplash.com/featured/?local+chicken+masala,regional+chicken", halfPrice: 160, fullPrice: 320 },
    { id: id(), name: "Local Chicken Fry (Half / Full)", img: "https://source.unsplash.com/featured/?local+chicken+fry,fried+chicken+local", halfPrice: 160, fullPrice: 320 },
    { id: id(), name: "Local Chicken Boil (Half / Full)", img: "https://source.unsplash.com/featured/?boiled+local+chicken,boiled+chicken", halfPrice: 200, fullPrice: 400 }
  ],

  "Mutton": [
    { id: id(), name: "Mutton Masala Curry (Half / Full)", img: "https://source.unsplash.com/featured/?mutton+masala,mutton+curry", halfPrice: 140, fullPrice: 280 },
    { id: id(), name: "Mutton Masala", img: "https://source.unsplash.com/featured/?mutton+masala,goat+curry", fullPrice: 300 },
    { id: id(), name: "Mutton Kosha", img: "https://source.unsplash.com/featured/?mutton+kosha,slow+cooked+mutton", fullPrice: 320 },
    { id: id(), name: "Mutton Rezala", img: "https://source.unsplash.com/featured/?mutton+rezala,rezala", fullPrice: 340 }
  ],

  "Pork": [
    { id: id(), name: "Pork Curry (Half / Full)", img: "https://source.unsplash.com/featured/?pork+curry,pork+gravy", halfPrice: 130, fullPrice: 250 },
    { id: id(), name: "Pork Fry / Sliced (Half / Full)", img: "https://source.unsplash.com/featured/?pork+fry,sliced+pork", halfPrice: 130, fullPrice: 250 },
    { id: id(), name: "Boil Pork with Bamboo Shoot (Half / Full)", img: "https://source.unsplash.com/featured/?pork+bamboo+shoots,bamboo+pork", halfPrice: 140, fullPrice: 280 }
  ],

  "Fish": [
    { id: id(), name: "Fish Fry (Bhangon / Boriala)", img: "https://source.unsplash.com/featured/?fish+fry,fish+fried", fullPrice: 100 },
    { id: id(), name: "Fish Fry (Bahu)", img: "https://source.unsplash.com/featured/?fish+fry+baha,grilled+fish", fullPrice: 90 },
    { id: id(), name: "Fish Tenga (Tomato)", img: "https://source.unsplash.com/featured/?fish+tenga,tomato+fish+curry", fullPrice: 110 },
    { id: id(), name: "Fish Curry Bahu (Mustard Seed / Tomato)", img: "https://source.unsplash.com/featured/?mustard+fish+ curry,fish+mustard", fullPrice: 110 },
    { id: id(), name: "Fish Curry (Local) (Bhangon / Boriala) Leafy Green / Mustard Seed / Tomato", img: "https://source.unsplash.com/featured/?local+fish+curry,regional+fish+curry", fullPrice: 150 }
  ],

  "Duck": [
    { id: id(), name: "Duck Fry", img: "https://source.unsplash.com/featured/?duck+fry,duck+meat", fullPrice: 150 },
    { id: id(), name: "Duck Curry (Half / Full)", img: "https://source.unsplash.com/featured/?duck+curry,duck+gravy", halfPrice: 150, fullPrice: 320 }
  ],

  "Dal & Sides": [
    { id: id(), name: "Dal Tadka (Half / Full)", img: "https://source.unsplash.com/featured/?dal+tadka,dal", halfPrice: 80, fullPrice: 150 },
    { id: id(), name: "Egg Dal Tadka (Half / Full)", img: "https://source.unsplash.com/featured/?egg+dal+ tadka,egg+dal", halfPrice: 100, fullPrice: 200 },
    { id: id(), name: "Dal Fry", img: "https://source.unsplash.com/featured/?dal+fry,dal+fry", halfPrice: 70, fullPrice: 140 },
    { id: id(), name: "Dal Makhani", img: "https://source.unsplash.com/featured/?dal+makhani,makhani", halfPrice: 100, fullPrice: 200 }
  ],

  "Salads": [
    { id: id(), name: "Cucumber Salad", img: "https://source.unsplash.com/featured/?cucumber+salad,salad", fullPrice: 50 },
    { id: id(), name: "Onion Salad", img: "https://source.unsplash.com/featured/?onion+salad,salad+onion", fullPrice: 50 },
    { id: id(), name: "Mix Salad", img: "https://source.unsplash.com/featured/?mixed+salad,salad+mixed", fullPrice: 70 }
  ]
};

/* --------- State --------- */
let menuData = load() || DEFAULT_MENU;
let currentCategory = Object.keys(menuData)[0];
let editMode = false;
let isAdmin = false;

/* --------- Elements --------- */
const tabsContainer = document.getElementById("category-tabs");
const menuContainer = document.getElementById("menu-container");
const editToggle = document.getElementById("edit-toggle");
const addItemBtn = document.getElementById("add-item-btn");
const resetBtn = document.getElementById("reset-btn");
const template = document.getElementById("item-template");

/* --------- Initialize --------- */
renderTabs();
renderMenu();
setupAdminControl();

/* --------- Admin Login --------- */
function setupAdminControl() {
  addItemBtn.style.display = "none";
  editToggle.style.display = "none";
  resetBtn.style.display = "none";

  const loginBtn = document.createElement("button");
  loginBtn.textContent = "Admin Login";
  loginBtn.className = "btn primary";
  loginBtn.onclick = adminLogin;
  document.querySelector(".top-actions").prepend(loginBtn);
}

function adminLogin() {
  const email = prompt("Enter admin email:");
  const pass = prompt("Enter password:");

  if (email === ADMIN_EMAIL && pass === ADMIN_PASS) {
    isAdmin = true;
    alert("✅ Admin access granted!");
    addItemBtn.style.display = "inline-block";
    editToggle.style.display = "inline-block";
    resetBtn.style.display = "inline-block";
  } else {
    alert("❌ Invalid credentials");
  }
}

/* --------- Event Listeners --------- */
editToggle.addEventListener("click", () => {
  if (!isAdmin) return alert("Admin access required!");
  editMode = !editMode;
  editToggle.textContent = editMode ? "Disable Edit Mode ✅" : "Enable Edit Mode ✏️";
  renderMenu();
});

addItemBtn.addEventListener("click", () => {
  if (!isAdmin) return alert("Admin access required!");
  const newItem = { id: id(), name: "New Item", img: placeholder("New"), fullPrice: 0 };
  if (!menuData[currentCategory]) menuData[currentCategory] = [];
  menuData[currentCategory].push(newItem);
  save();
  renderMenu();
});

resetBtn.addEventListener("click", () => {
  if (!isAdmin) return alert("Admin access required!");
  if (!confirm("Reset menu to default? This will erase all edits.")) return;
  localStorage.removeItem(STORAGE_KEY);
  menuData = JSON.parse(JSON.stringify(DEFAULT_MENU));
  currentCategory = Object.keys(menuData)[0];
  renderTabs();
  renderMenu();
});

/* --------- Render Tabs --------- */
function renderTabs(){
  tabsContainer.innerHTML = "";
  Object.keys(menuData).forEach(cat => {
    const btn = document.createElement("button");
    btn.className = "tab";
    if (cat === currentCategory) btn.classList.add("active");
    btn.innerText = cat;
    btn.onclick = () => { currentCategory = cat; renderTabs(); renderMenu(); };
    tabsContainer.appendChild(btn);
  });
}

/* --------- Render Menu --------- */
function renderMenu(){
  menuContainer.innerHTML = "";
  const items = menuData[currentCategory] || [];

  if (!items.length){
    const msg = document.createElement("div");
    msg.textContent = "No items in this category. Click + Add Item to create one.";
    msg.style.padding = "18px";
    menuContainer.appendChild(msg);
    return;
  }

  items.forEach(item => {
    const copy = template.content.cloneNode(true);
    const imgEl = copy.querySelector(".item-img");
    const nameEl = copy.querySelector(".item-name");
    const halfEl = copy.querySelector(".half-price");
    const fullEl = copy.querySelector(".full-price");
    const catEl = copy.querySelector(".item-cat");

    // ✅ Fixed image fallback
    imgEl.src = item.img || placeholder("Food");
    imgEl.onerror = () => { imgEl.src = placeholder("Default"); };

    nameEl.textContent = item.name;
    catEl.textContent = currentCategory;

    // Show half price only if present
    if (typeof item.halfPrice === "number") {
      halfEl.textContent = formatPrice(item.halfPrice);
      halfEl.style.display = "block";
    } else {
      halfEl.style.display = "none";
    }

    if (typeof item.fullPrice === "number") {
      fullEl.textContent = formatPrice(item.fullPrice);
      fullEl.style.display = "block";
    } else {
      fullEl.style.display = "none";
    }

    const editArea = copy.querySelector(".edit-controls");
    const inputImg = copy.querySelector(".edit-img");
    const inputName = copy.querySelector(".edit-name");
    const inputHalf = copy.querySelector(".edit-half");
    const inputFull = copy.querySelector(".edit-full");
    const saveBtn = copy.querySelector(".save");
    const removeBtn = copy.querySelector(".remove");

    inputImg.value = item.img || "";
    inputName.value = item.name || "";
    inputHalf.value = (item.halfPrice != null) ? item.halfPrice : "";
    inputFull.value = (item.fullPrice != null) ? item.fullPrice : "";

    editArea.style.display = (editMode && isAdmin) ? "flex" : "none";

    saveBtn.onclick = () => {
      item.img = inputImg.value.trim() || placeholder("Food");
      item.name = inputName.value.trim() || "Unnamed";
      item.halfPrice = inputHalf.value === "" ? null : Number(inputHalf.value);
      item.fullPrice = inputFull.value === "" ? null : Number(inputFull.value);
      save();
      renderMenu();
    };

    removeBtn.onclick = () => {
      if (!confirm(`Remove "${item.name}"?`)) return;
      const idx = menuData[currentCategory].findIndex(x => x.id === item.id);
      if (idx >= 0) menuData[currentCategory].splice(idx,1);
      save();
      renderMenu();
    };

    menuContainer.appendChild(copy);
  });
}

/* --------- Utilities --------- */
function formatPrice(n){ return `₹ ${Number(n).toFixed(2)}`; }

function save(){
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(menuData));
  } catch(e){
    alert("Unable to save menu to localStorage.");
    console.error(e);
  }
}

function load(){
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch(e){
    console.error("Failed to parse saved menu", e);
    return null;
  }
}
