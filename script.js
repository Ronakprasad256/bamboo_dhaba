/* ========= Editable Menu App =========
   Now includes:
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
  // Using reliable placehold.co
  return `https://placehold.co/160x160?text=${encodeURIComponent(tag)}`;
}

/* --------- Default menu --------- */
const DEFAULT_MENU = {
  "Veg": [
    { id: id(), name: "Kadai Vegetable", img: placeholder("Kadai"), fullPrice: 140 },
    { id: id(), name: "Aloo Dum", img: placeholder("Aloo"), fullPrice: 80 },
    { id: id(), name: "Jeera Aloo", img: placeholder("JeeraAloo"), fullPrice: 90 },
    { id: id(), name: "Malai Kofta (4 pcs)", img: placeholder("Kofta"), fullPrice: 150 },
    { id: id(), name: "Channa Masala", img: placeholder("Channa"), fullPrice: 120 },
    { id: id(), name: "Paneer Butter Masala", img: placeholder("Paneer"), fullPrice: 170 },
    { id: id(), name: "Matar Paneer", img: placeholder("Paneer"), fullPrice: 140 },
    { id: id(), name: "Palak Paneer (seasonal)", img: placeholder("Palak"), fullPrice: 150 },
    { id: id(), name: "Veg Thali (Bamboo Hut Special Thali)", img: placeholder("Thali"), fullPrice: 100 }
  ],

  "Starter": [
    { id: id(), name: "French Fries", img: placeholder("Fries"), fullPrice: 100 },
    { id: id(), name: "Pea Nut Masala", img: placeholder("Peanut"), fullPrice: 60 },
    { id: id(), name: "Kaju Fry", img: placeholder("Kaju"), fullPrice: 100 },
    { id: id(), name: "Masala Papad", img: placeholder("Papad"), fullPrice: 30 },
    { id: id(), name: "Papad Fry (2 Pcs)", img: placeholder("Papad"), fullPrice: 40 },
    { id: id(), name: "Dry Papad (2 Pcs)", img: placeholder("Papad"), fullPrice: 20 },
    { id: id(), name: "Chana Fry", img: placeholder("Chana"), fullPrice: 80 },
    { id: id(), name: "Veg. Pakora", img: placeholder("Pakora"), fullPrice: 100 },
    { id: id(), name: "Paneer Pakora", img: placeholder("Paneer"), fullPrice: 120 },
    { id: id(), name: "Chicken Pakora", img: placeholder("Chicken"), fullPrice: 140 },
    { id: id(), name: "Crispy Baby Corn", img: placeholder("Corn"), fullPrice: 180 },
    { id: id(), name: "Paneer 65", img: placeholder("Paneer65"), fullPrice: 160 },
    { id: id(), name: "Baby Potato Fry", img: placeholder("Potato"), fullPrice: 60 },
    { id: id(), name: "Chilli Paneer (Dry)", img: placeholder("Paneer"), fullPrice: 150 }
  ],

  "Rolls": [
    { id: id(), name: "Veg Roll", img: placeholder("Roll"), fullPrice: 50 },
    { id: id(), name: "Egg Roll", img: placeholder("Roll"), fullPrice: 70 },
    { id: id(), name: "Chicken Roll", img: placeholder("Roll"), fullPrice: 90 },
    { id: id(), name: "Pork Roll", img: placeholder("Roll"), fullPrice: 100 }
  ],

  "Paneer": [
    { id: id(), name: "Kadai Paneer", img: placeholder("Paneer"), fullPrice: 140 },
    { id: id(), name: "Chilli Paneer (Gravy)", img: placeholder("Paneer"), fullPrice: 160 },
    { id: id(), name: "Paneer Do Pyaza", img: placeholder("Paneer"), fullPrice: 160 },
    { id: id(), name: "Paneer Butter Masala", img: placeholder("Paneer"), fullPrice: 170 }
  ],

  "Sabji": [
    { id: id(), name: "Mix Vegetable", img: placeholder("Veg"), fullPrice: 140 },
    { id: id(), name: "Aloo Gobi", img: placeholder("AlooGobi"), fullPrice: 120 },
    { id: id(), name: "Aloo Bhaji", img: placeholder("Aloo"), fullPrice: 120 }
  ],

  "Chinese": [
    { id: id(), name: "Veg Hakka Noodles", img: placeholder("Noodles"), fullPrice: 100 },
    { id: id(), name: "Egg Hakka Noodles", img: placeholder("Noodles"), fullPrice: 130 },
    { id: id(), name: "Chicken Hakka Noodles", img: placeholder("Noodles"), fullPrice: 150 },
    { id: id(), name: "Veg Fried Rice", img: placeholder("Rice"), fullPrice: 80 },
    { id: id(), name: "Egg Fried Rice", img: placeholder("Rice"), fullPrice: 90 },
    { id: id(), name: "Chicken Fried Rice", img: placeholder("Rice"), fullPrice: 150 },
    { id: id(), name: "Schezwan Fried Rice", img: placeholder("Rice"), fullPrice: 130 }
  ],

  "Rice & Biryani": [
    { id: id(), name: "Jeera Rice", img: placeholder("Rice"), fullPrice: 80 },
    { id: id(), name: "Plain Rice", img: placeholder("Rice"), fullPrice: 60 },
    { id: id(), name: "Peas Pulao", img: placeholder("Rice"), fullPrice: 100 },
    { id: id(), name: "Veg Pulao", img: placeholder("Rice"), fullPrice: 100 },
    { id: id(), name: "Veg Biryani (Half / Full)", img: placeholder("Biryani"), halfPrice: 100, fullPrice: 200 },
    { id: id(), name: "Egg Biryani (Half / Full)", img: placeholder("Biryani"), halfPrice: 120, fullPrice: 240 },
    { id: id(), name: "Chicken Biryani (Half / Full)", img: placeholder("Biryani"), halfPrice: 140, fullPrice: 280 },
    { id: id(), name: "Mutton Biryani (Half / Full)", img: placeholder("Biryani"), halfPrice: 170, fullPrice: 340 }
  ],

  "Egg": [
    { id: id(), name: "Egg Boil (Single)", img: placeholder("Egg"), fullPrice: 20 },
    { id: id(), name: "Egg Omelette (Double)", img: placeholder("Egg"), fullPrice: 40 },
    { id: id(), name: "Egg Curry (Double Egg)", img: placeholder("Egg"), fullPrice: 80 }
  ],

  "Drinks": [
    { id: id(), name: "Tea", img: placeholder("Tea"), fullPrice: 20 },
    { id: id(), name: "Coffee", img: placeholder("Coffee"), fullPrice: 30 },
    { id: id(), name: "Cold Drinks (Sprite/Coke/Fanta/Thumbs Up)", img: placeholder("Drinks"), fullPrice: 50 }
  ],

  "Chicken": [
    { id: id(), name: "Chicken Masala (Half / Full)", img: placeholder("Chicken"), halfPrice: 140, fullPrice: 280 },
    { id: id(), name: "Chicken Curry (Half / Full)", img: placeholder("Curry"), halfPrice: 140, fullPrice: 280 },
    { id: id(), name: "Chicken Dopyaza", img: placeholder("Chicken"), fullPrice: 290 },
    { id: id(), name: "Chicken Kadai", img: placeholder("Chicken"), fullPrice: 260 },
    { id: id(), name: "Chicken Butter Masala", img: placeholder("Chicken"), fullPrice: 350 },
    { id: id(), name: "Chicken Boil with Veg", img: placeholder("Chicken"), fullPrice: 300 },
    { id: id(), name: "Chicken Lollipop", img: placeholder("Chicken"), fullPrice: 250 },
    { id: id(), name: "Chicken 65", img: placeholder("Chicken65"), fullPrice: 150 },
    { id: id(), name: "Chicken Dry Fry", img: placeholder("Chicken"), fullPrice: 150 },
    { id: id(), name: "Chicken Kebab (Bangalore Style)", img: placeholder("Kebab"), fullPrice: 170 },
    { id: id(), name: "Chilli Chicken Dry", img: placeholder("Chicken"), fullPrice: 150 }
  ],

  "Local Chicken": [
    { id: id(), name: "Local Chicken Curry (Half / Full)", img: placeholder("Chicken"), halfPrice: 150, fullPrice: 300 },
    { id: id(), name: "Local Chicken Masala (Half / Full)", img: placeholder("Chicken"), halfPrice: 160, fullPrice: 320 },
    { id: id(), name: "Local Chicken Fry (Half / Full)", img: placeholder("Chicken"), halfPrice: 160, fullPrice: 320 },
    { id: id(), name: "Local Chicken Boil (Half / Full)", img: placeholder("Chicken"), halfPrice: 200, fullPrice: 400 }
  ],

  "Mutton": [
    { id: id(), name: "Mutton Masala Curry (Half / Full)", img: placeholder("Mutton"), halfPrice: 140, fullPrice: 280 },
    { id: id(), name: "Mutton Masala", img: placeholder("Mutton"), fullPrice: 300 },
    { id: id(), name: "Mutton Kosha", img: placeholder("Mutton"), fullPrice: 320 },
    { id: id(), name: "Mutton Rezala", img: placeholder("Mutton"), fullPrice: 340 }
  ],

  "Pork": [
    { id: id(), name: "Pork Curry (Half / Full)", img: placeholder("Pork"), halfPrice: 130, fullPrice: 250 },
    { id: id(), name: "Pork Fry / Sliced (Half / Full)", img: placeholder("Pork"), halfPrice: 130, fullPrice: 250 },
    { id: id(), name: "Boil Pork with Bamboo Shoot (Half / Full)", img: placeholder("Pork"), halfPrice: 140, fullPrice: 280 }
  ],

  "Fish": [
    { id: id(), name: "Fish Fry (Plate)", img: placeholder("Fish"), fullPrice: 100 },
    { id: id(), name: "Fish Fry (Bahu)", img: placeholder("Fish"), fullPrice: 90 },
    { id: id(), name: "Fish Tenga (Tomato)", img: placeholder("Fish"), fullPrice: 110 },
    { id: id(), name: "Fish Curry Bahu (Mustard/Tomato)", img: placeholder("Fish"), fullPrice: 110 },
    { id: id(), name: "Fish Curry (Local)", img: placeholder("Fish"), fullPrice: 150 }
  ],

  "Duck": [
    { id: id(), name: "Duck Fry", img: placeholder("Duck"), fullPrice: 150 },
    { id: id(), name: "Duck Curry (Half / Full)", img: placeholder("Duck"), halfPrice: 150, fullPrice: 320 }
  ],

  "Dal & Sides": [
    { id: id(), name: "Dal Tadka (Half / Full)", img: placeholder("Dal"), halfPrice: 80, fullPrice: 150 },
    { id: id(), name: "Egg Dal Tadka (Half / Full)", img: placeholder("Dal"), halfPrice: 100, fullPrice: 200 },
    { id: id(), name: "Dal Fry", img: placeholder("Dal"), halfPrice: 70, fullPrice: 140 },
    { id: id(), name: "Dal Makhani", img: placeholder("Dal"), halfPrice: 100, fullPrice: 200 }
  ],

  "Salads": [
    { id: id(), name: "Cucumber Salad", img: placeholder("Salad"), fullPrice: 50 },
    { id: id(), name: "Onion Salad", img: placeholder("Salad"), fullPrice: 50 },
    { id: id(), name: "Mix Salad", img: placeholder("Salad"), fullPrice: 70 }
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
