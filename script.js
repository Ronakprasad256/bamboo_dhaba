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
    {
      "name": "Kadai Vegetable",
      "fullPrice": 140.00
    },
    {
      "name": "Aloo Dum",
      "fullPrice": 80.00
    },
    {
      "name": "Jeera Aloo",
      "fullPrice": 90.00
    },
    {
      "name": "Malai Kofta (4 pcs)",
      "fullPrice": 150.00
    },
    {
      "name": "Channa Masala",
      "fullPrice": 120.00
    },
    {
      "name": "Paneer Butter Masala",
      "fullPrice": 170.00
    },
    {
      "name": "Matar Paneer",
      "fullPrice": 140.00
    },
    {
      "name": "Palak Paneer (seasonal)",
      "fullPrice": 150.00
    },
    {
      "name": "Veg Thali (Bamboo Hut Special Thali)",
      "fullPrice": 100.00
    }
  ],
  "Starter": [
    { "name": "French Fries", "fullPrice": 100.00 },
    { "name": "Pea Nut Masala", "fullPrice": 60.00 },
    { "name": "Kaju Fry", "fullPrice": 100.00 },
    { "name": "Masala Papad", "fullPrice": 30.00 },
    { "name": "Papad Fry (2 Pcs)", "fullPrice": 40.00 },
    { "name": "Dry Papad (2 Pcs)", "fullPrice": 20.00 },
    { "name": "Chana Fry", "fullPrice": 80.00 },
    { "name": "Veg. Pakora", "fullPrice": 100.00 },
    { "name": "Paneer Pakora", "fullPrice": 120.00 },
    { "name": "Chicken Pakora", "fullPrice": 140.00 },
    { "name": "Crispy Baby Corn", "fullPrice": 180.00 },
    { "name": "Paneer 65", "fullPrice": 160.00 },
    { "name": "Baby Potato Fry", "fullPrice": 60.00 },
    { "name": "Chilli Paneer (Dry)", "fullPrice": 150.00 }
  ],
  "Rolls": [
    {
      "name": "Veg Roll",
      "fullPrice": 50.00
    },
    {
      "name": "Egg Roll",
      "fullPrice": 70.00
    },
    {
      "name": "Chicken Roll",
      "fullPrice": 90.00
    },
    {
      "name": "Pork Roll",
      "fullPrice": 100.00
    }
  ],
  "Paneer": [
    {
      "name": "Kadai Paneer",
      "fullPrice": 140.00
    },
    {
      "name": "Chilli Paneer (Gravy)",
      "fullPrice": 160.00
    },
    {
      "name": "Paneer Do Pyaza",
      "fullPrice": 160.00
    },
    {
      "name": "Paneer Butter Masala",
      "fullPrice": 170.00
    }
  ],
  "Sabji": [
    {
      "name": "Mix Vegetable",
      "fullPrice": 140.00
    },
    {
      "name": "Aloo Gobi",
      "fullPrice": 120.00
    },
    {
      "name": "Aloo Bhaji",
      "fullPrice": 120.00
    }
  ],
  "Chinese": [
    {
      "name": "Veg Hakka Noodles",
      "fullPrice": 100.00
    },
    {
      "name": "Egg Hakka Noodles",
      "fullPrice": 130.00
    },
    {
      "name": "Chicken Hakka Noodles",
      "fullPrice": 150.00
    },
    {
      "name": "Veg Fried Rice",
      "fullPrice": 80.00
    },
    {
      "name": "Egg Fried Rice",
      "fullPrice": 90.00
    },
    {
      "name": "Chicken Fried Rice",
      "fullPrice": 150.00
    },
    {
      "name": "Schezwan Fried Rice",
      "fullPrice": 130.00
    }
  ],
  "Rice & Biryani": [
    {
      "name": "Jeera Rice",
      "fullPrice": 80.00
    },
    {
      "name": "Plain Rice",
      "fullPrice": 60.00
    },
    {
      "name": "Peas Pulao",
      "fullPrice": 100.00
    },
    {
      "name": "Veg Pulao",
      "fullPrice": 100.00
    },
    {
      "name": "Veg Biryani (Half / Full)",
      "halfPrice": 100.00,
      "fullPrice": 200.00
    },
    {
      "name": "Egg Biryani (Half / Full)",
      "halfPrice": 120.00,
      "fullPrice": 240.00
    },
    {
      "name": "Chicken Biryani (Half / Full)",
      "halfPrice": 140.00,
      "fullPrice": 280.00
    },
    {
      "name": "Mutton Biryani (Half / Full)",
      "halfPrice": 170.00,
      "fullPrice": 340.00
    }
  ],
"Egg": [
    {
      "name": "Egg Boil (Single)",
      "fullPrice": 20.00
    },
    {
      "name": "Egg Omelette (Double)",
      "fullPrice": 40.00
    },
    {
      "name": "Egg Curry (Double Egg)",
      "fullPrice": 80.00
    }
  ],
  "Drinks": [
    {
      "name": "Tea",
      "fullPrice": 20.00
    },
    {
      "name": "Coffee",
      "fullPrice": 30.00
    },
    {
      "name": "Cold Drinks (Sprite/Coke/Fanta/Thumbs Up)",
      "fullPrice": 50.00
    }
  ],
  "Chicken": [
    {
      "name": "Chicken Masala (Half / Full)",
      "halfPrice": 140.00,
      "fullPrice": 280.00
    },
    {
      "name": "Chicken Curry (Half / Full)",
      "halfPrice": 140.00,
      "fullPrice": 280.00
    },
    {
      "name": "Chicken Dopyaza",
      "fullPrice": 290.00
    },
    {
      "name": "Chicken Kadai",
      "fullPrice": 260.00
    },
    {
      "name": "Chicken Butter Masala",
      "fullPrice": 350.00
    },
    {
      "name": "Chicken Boil with Veg",
      "fullPrice": 300.00
    },
    {
      "name": "Chicken Lollipop",
      "fullPrice": 250.00
    },
    {
      "name": "Chicken 65",
      "fullPrice": 150.00
    },
    {
      "name": "Chicken Dry Fry",
      "fullPrice": 150.00
    },
    {
      "name": "Chicken Kebab (Bangalore Style)",
      "fullPrice": 170.00
    },
    {
      "name": "Chilli Chicken Dry",
      "fullPrice": 150.00
    }
  ],
  "Local Chicken": [
    {
      "name": "Local Chicken Curry (Half / Full)",
      "halfPrice": 150.00,
      "fullPrice": 300.00
    },
    {
      "name": "Local Chicken Masala (Half / Full)",
      "halfPrice": 160.00,
      "fullPrice": 320.00
    },
    {
      "name": "Local Chicken Fry (Half / Full)",
      "halfPrice": 160.00,
      "fullPrice": 320.00
    },
    {
      "name": "Local Chicken Boil (Half / Full)",
      "halfPrice": 200.00,
      "fullPrice": 400.00
    }
  ],
  "Mutton": [
    {
      "name": "Mutton Masala Curry (Half / Full)",
      "halfPrice": 140.00,
      "fullPrice": 280.00
    },
    {
      "name": "Mutton Masala",
      "fullPrice": 300.00
    },
    {
      "name": "Mutton Kosha",
      "fullPrice": 320.00
    },
    {
      "name": "Mutton Rezala",
      "fullPrice": 340.00
    }
  ],
  "Pork": [
    {
      "name": "Pork Curry (Half / Full)",
      "halfPrice": 130.00,
      "fullPrice": 250.00
    },
    {
      "name": "Pork Fry / Sliced (Half / Full)",
      "halfPrice": 130.00,
      "fullPrice": 250.00
    },
    {
      "name": "Boil Pork with Bamboo Shoot (Half / Full)",
      "halfPrice": 140.00,
      "fullPrice": 280.00
    }
  ],
  "Fish": [
    {
      "name": "Fish Fry (Plate)",
      "fullPrice": 100.00
    },
    {
      "name": "Fish Fry (Bahu)",
      "fullPrice": 90.00
    },
    {
      "name": "Fish Tenga (Tomato)",
      "fullPrice": 110.00
    },
    {
      "name": "Fish Curry Bahu (Mustard/Tomato)",
      "fullPrice": 110.00
    },
    {
      "name": "Fish Curry (Local)",
      "fullPrice": 150.00
    }
  ],
  "Duck": [
    {
      "name": "Duck Fry",
      "fullPrice": 150.00
    },
    {
      "name": "Duck Curry (Half / Full)",
      "halfPrice": 150.00,
      "fullPrice": 320.00
    }
  ],
  "Dal & Sides": [
    {
      "name": "Dal Tadka (Half / Full)",
      "halfPrice": 80.00,
      "fullPrice": 150.00
    },
    {
      "name": "Egg Dal Tadka (Half / Full)",
      "halfPrice": 100.00,
      "fullPrice": 200.00
    },
    {
      "name": "Dal Fry",
      "halfPrice": 70.00,
      "fullPrice": 140.00
    },
    {
      "name": "Dal Makhani",
      "halfPrice": 100.00,
      "fullPrice": 200.00
    }
  ],
  "Salads": [
    {
      "name": "Cucumber Salad",
      "fullPrice": 50.00
    },
    {
      "name": "Onion Salad",
      "fullPrice": 50.00
    },
    {
      "name": "Mix Salad",
      "fullPrice": 70.00
    }
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
