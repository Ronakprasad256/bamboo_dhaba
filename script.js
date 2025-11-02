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
    { id: id(), name: "Malai Kofta", img: placeholder("Kofta"), fullPrice: 150 },
    { id: id(), name: "Paneer Butter Masala", img: placeholder("Paneer"), fullPrice: 170 }
  ],
  "Chicken": [
    { id: id(), name: "Chicken Curry (Half / Full)", img: placeholder("Curry"), halfPrice: 140, fullPrice: 280 },
    { id: id(), name: "Chicken Biryani (Half / Full)", img: placeholder("Biryani"), halfPrice: 150, fullPrice: 300 },
    { id: id(), name: "Chicken 65", img: placeholder("Chicken65"), fullPrice: 150 }
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
