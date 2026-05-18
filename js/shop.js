// ============================================================
//  Bristol Shoes - Shop Engine (shop.js)
//  Ito ang MAIN brain ng Products page. Lahat ng interactive
//  features doon ay nandito:
//  - Nag-re-render ng product cards sa grid
//  - Nagha-handle ng filter tabs (All, Men's, Women's) at search
//  - Nagbu-bukas ng Quick View modal pag clinick ang product
//  - Nagma-manage ng shopping cart (add, remove, qty change)
//  - Nagbu-bukas ng checkout modal at nagpo-process ng orders
// ============================================================

// 'use strict' = strict mode ng JavaScript.
// Nagde-detect ito ng common coding mistakes at nagba-ban ng unsafe features.
// Halimbawa: hindi ka makakapaggamit ng undeclared variables sa strict mode.
// Best practice ito para maiwasan ang bugs na mahirap hanapin.
'use strict';

// ============================================================
// PRODUCT CATALOG
// Ito ang data store ng lahat ng products ng Bristol Shoes.
// Array of objects — bawat object = isang product na may:
//   id           = unique number identifier ng product
//   category     = 'men' o 'women' — ginagamit ng filter tabs
//   type         = klase ng sapatos (Oxford, Loafer, Mule, etc.)
//   name         = pangalan ng product
//   price        = actual selling price (in Philippine Peso)
//   originalPrice = original price bago mag-sale (null pag hindi sale item)
//   img          = main product image URL
//   imgs         = array ng lahat ng images (para sa thumbnail strip sa modal)
//   sizes        = array ng available sizes (EU sizing)
//   unavailable  = array ng sizes na out of stock (greyed out sa size selector)
//   desc         = product description na lumalabas sa quick-view modal
//   sale         = true/false — kung true, may SALE badge ang card
//
// Lahat ng images ay direktang kinukuha mula sa bristolshoes.ph CDN.
// ============================================================
var PRODUCTS = [
    // Men's Oxford
    {
        id: 1, category: 'men',
        type: "Men's Oxford",
        name: 'MCGUIRE in Dark Brown',
        price: 4784, originalPrice: 5980,
        img: 'https://bristolshoes.ph/cdn/shop/files/MCGUIRE_BROWN_SIDE_510x@2x.progressive.png.jpg?v=1763541249',
        imgs: [
            'https://bristolshoes.ph/cdn/shop/files/MCGUIRE_BROWN_SIDE_510x@2x.progressive.png.jpg?v=1763541249',
            'https://bristolshoes.ph/cdn/shop/files/MCGUIRE_BROWN_DUO_510x@2x.progressive.png.jpg?v=1763541249'
        ],
        sizes: [39, 40, 41, 42, 43, 45], unavailable: [44],
        desc: 'Elevate your formal look with these sleek dark brown leather shoes. Subtle brogue perforations and smooth polished finish. Upper: cow nappa leather. Lined with pigskin leather.',
        sale: true
    },
    {
        id: 2, category: 'men',
        type: "Men's Oxford",
        name: 'MCGUIRE in Black',
        price: 4784, originalPrice: 5980,
        img: 'https://bristolshoes.ph/cdn/shop/files/MCGUIRE_BLACK_SIDE_510x@2x.progressive.png.jpg?v=1763540650',
        imgs: [
            'https://bristolshoes.ph/cdn/shop/files/MCGUIRE_BLACK_SIDE_510x@2x.progressive.png.jpg?v=1763540650',
            'https://bristolshoes.ph/cdn/shop/files/MCGUIRE_BLACK_DUO_510x@2x.progressive.png.jpg?v=1763540672'
        ],
        sizes: [39, 40, 41, 42, 43, 44, 45], unavailable: [],
        desc: 'Elevate your formal look with these sleek black leather shoes. Subtle brogue perforations and smooth polished finish. Open-lace construction for a comfortable fit.',
        sale: true
    },
    {
        id: 3, category: 'men',
        type: "Men's Oxford",
        name: 'BALFOUR in Brown',
        price: 4495, originalPrice: null,
        img: 'https://bristolshoes.ph/cdn/shop/files/BALFOUR_BROWN_sideview_510x@2x.progressive.jpg?v=1763535096',
        imgs: [
            'https://bristolshoes.ph/cdn/shop/files/BALFOUR_BROWN_sideview_510x@2x.progressive.jpg?v=1763535096',
            'https://bristolshoes.ph/cdn/shop/files/BALFOUR_BROWN_duo_510x@2x.progressive.jpg?v=1763535096',
            'https://bristolshoes.ph/cdn/shop/files/SOLE_PASEXY_NEW_510x@2x.progressive.jpg?v=1706518591'
        ],
        sizes: [39, 40, 41, 42, 43, 44, 45], unavailable: [],
        desc: 'An Oxford in brown brush-off leather with an interesting lacing design. Effortlessly transforms from formal to casual. Upper: cow brush-off leather. Lined with pigskin leather.',
        sale: false
    },
    // ── Men's Loafer ──
    {
        id: 4, category: 'men',
        type: "Men's Loafer",
        name: 'BEDFORD in Tan Brown',
        price: 4495, originalPrice: null,
        img: 'https://bristolshoes.ph/cdn/shop/files/BEDFORD_TAN_SIDE_510x@2x.progressive.png.jpg?v=1757397457',
        imgs: [
            'https://bristolshoes.ph/cdn/shop/files/BEDFORD_TAN_SIDE_510x@2x.progressive.png.jpg?v=1757397457',
            'https://bristolshoes.ph/cdn/shop/files/BEDFORD_TAN_DUO_510x@2x.progressive.png.jpg?v=1757397457',
            'https://bristolshoes.ph/cdn/shop/files/SOLE_RSO_510x@2x.progressive.png.jpg?v=1757395891'
        ],
        sizes: [39, 40, 41, 42, 43, 44, 45], unavailable: [],
        desc: 'Handcrafted in Marikina by local artisans using the highest quality leather. Upper: cow nappa leather. Lined with pigskin leather. Outsole: rubber.',
        sale: false
    },
    {
        id: 5, category: 'men',
        type: "Men's Loafer",
        name: 'FIYERO in Black',
        price: 5295, originalPrice: null,
        img: 'https://bristolshoes.ph/cdn/shop/files/FIYERO_BLACK_sideview_510x@2x.progressive.png.jpg?v=1763964977',
        imgs: [
            'https://bristolshoes.ph/cdn/shop/files/FIYERO_BLACK_sideview_510x@2x.progressive.png.jpg?v=1763964977',
            'https://bristolshoes.ph/cdn/shop/files/FIYERO_BLACK_duo_510x@2x.progressive.png.jpg?v=1763964977',
            'https://bristolshoes.ph/cdn/shop/files/SOLE_LEATHER_510x@2x.progressive.png.jpg?v=1757400779'
        ],
        sizes: [39, 40, 41, 42, 43, 44, 45], unavailable: [],
        desc: 'A polished leather monk strap with a sleek moc-toe design and standout silver buckle. Blends classic sophistication with modern flair. Perfect for formal events and office attire.',
        sale: false
    },
    {
        id: 6, category: 'men',
        type: "Men's Loafer",
        name: 'FIYERO in Brown',
        price: 5295, originalPrice: null,
        img: 'https://bristolshoes.ph/cdn/shop/files/FIYERO_BROWN_sideview_510x@2x.progressive.png.jpg?v=1763965981',
        imgs: [
            'https://bristolshoes.ph/cdn/shop/files/FIYERO_BROWN_sideview_510x@2x.progressive.png.jpg?v=1763965981',
            'https://bristolshoes.ph/cdn/shop/files/FIYERO_BROWN_duo_510x@2x.progressive.png.jpg?v=1763965981',
            'https://bristolshoes.ph/cdn/shop/files/SOLE_LEATHER_BROWN_UPPER_510x@2x.progressive.png.jpg?v=1757401165'
        ],
        sizes: [39, 40, 41, 42, 43, 44, 45], unavailable: [],
        desc: 'A polished leather monk strap in warm brown with a standout silver buckle. Blends classic sophistication with modern flair.',
        sale: false
    },
    // ── Women's Loafer ──
    {
        id: 7, category: 'women',
        type: "Women's Loafer",
        name: 'ISABELLA in Black',
        price: 3995, originalPrice: null,
        img: 'https://bristolshoes.ph/cdn/shop/files/ISABELLA_BLACK_sideview_510x@2x.progressive.jpg?v=1706086338',
        imgs: [
            'https://bristolshoes.ph/cdn/shop/files/ISABELLA_BLACK_sideview_510x@2x.progressive.jpg?v=1706086338',
            'https://bristolshoes.ph/cdn/shop/files/ISABELLA_BLACK_DUO_510x@2x.progressive.jpg?v=1706086348',
            'https://bristolshoes.ph/cdn/shop/files/ISABELLA_BLACK_top_510x@2x.progressive.jpg?v=1706086578',
            'https://bristolshoes.ph/cdn/shop/files/ISABELLA_BLACK_zoomed_510x@2x.progressive.jpg?v=1706086798'
        ],
        sizes: [35, 36, 37, 38, 39, 40], unavailable: [],
        desc: 'Look sharp and stay comfortable in the Isabella in Black. Handcrafted in Marikina by local artisans using the highest quality leather. All-day comfort you can depend on.',
        sale: false
    },
    {
        id: 8, category: 'women',
        type: "Women's Loafer",
        name: 'ATHENA in Maroon',
        price: 3995, originalPrice: null,
        img: 'https://bristolshoes.ph/cdn/shop/files/ATHENAMSIDE_510x@2x.progressive.jpg?v=1702292746',
        imgs: [
            'https://bristolshoes.ph/cdn/shop/files/ATHENAMSIDE_510x@2x.progressive.jpg?v=1702292746',
            'https://bristolshoes.ph/cdn/shop/files/ATHENAMDUO_510x@2x.progressive.jpg?v=1702292746',
            'https://bristolshoes.ph/cdn/shop/files/ATHENA_Maroon_zoomed_510x@2x.progressive.jpg?v=1702293144',
            'https://bristolshoes.ph/cdn/shop/files/SOLE_LADIES_SEMI-BULKY_70c773e0-d6d7-4615-a471-d06fc94c271d_510x@2x.progressive.jpg?v=1702292775'
        ],
        sizes: [35, 36, 37, 38, 39, 40], unavailable: [],
        desc: 'A stylish penny loafer that captures attention and complements with just one look. Handcrafted in Marikina from the highest quality leather.',
        sale: false
    },
    {
        id: 9, category: 'women',
        type: "Women's Loafer",
        name: 'ASHANTI in Black',
        price: 4295, originalPrice: null,
        img: 'https://bristolshoes.ph/cdn/shop/files/ASHANTI_K_sideview_510x@2x.progressive.jpg?v=1700119783',
        imgs: [
            'https://bristolshoes.ph/cdn/shop/files/ASHANTI_K_sideview_510x@2x.progressive.jpg?v=1700119783',
            'https://bristolshoes.ph/cdn/shop/files/ASHANTI_K_duo_510x@2x.progressive.jpg?v=1700119783',
            'https://bristolshoes.ph/cdn/shop/files/ASHANTI_K_z_510x@2x.progressive.jpg?v=1700119772',
            'https://bristolshoes.ph/cdn/shop/files/SOLE_LADIES_SEMI-BULKY_ae73c166-d27d-44e7-a5bb-121c97920c84_510x@2x.progressive.jpg?v=1700119784'
        ],
        sizes: [35, 36, 37, 38, 39, 40], unavailable: [],
        desc: 'A modern twist to the classic penny loafer. Color-blocking design makes a retro statement while the lug soles give it a modern edge. Handcrafted in Marikina.',
        sale: false
    },
    {
        id: 10, category: 'women',
        type: "Women's Loafer",
        name: 'ASHANTI in Black & Red',
        price: 4295, originalPrice: null,
        img: 'https://bristolshoes.ph/cdn/shop/files/ASHANTI_KR_sideview_510x@2x.progressive.jpg?v=1700038433',
        imgs: [
            'https://bristolshoes.ph/cdn/shop/files/ASHANTI_KR_sideview_510x@2x.progressive.jpg?v=1700038433',
            'https://bristolshoes.ph/cdn/shop/files/ASHANTI_KR_duo_510x@2x.progressive.jpg?v=1700038433',
            'https://bristolshoes.ph/cdn/shop/files/ASHANTI_KR_z_510x@2x.progressive.jpg?v=1700038375',
            'https://bristolshoes.ph/cdn/shop/files/SOLE_LADIES_SEMI-BULKY_86feca79-be0e-4baa-b693-de5aed184e23_510x@2x.progressive.jpg?v=1700038657'
        ],
        sizes: [35, 36, 37, 38, 39, 40], unavailable: [38],
        desc: 'Bold color-blocking penny loafer in black and red. Retro design meets modern lug soles. Handcrafted in Marikina.',
        sale: false
    },
    // ── Women's Oxford ──
    {
        id: 11, category: 'women',
        type: "Women's Oxford",
        name: 'LUCILLE in Black',
        price: 4295, originalPrice: null,
        img: 'https://bristolshoes.ph/cdn/shop/files/LUCILLE_BLACK_sideview_510x@2x.progressive.jpg?v=1706084670',
        imgs: [
            'https://bristolshoes.ph/cdn/shop/files/LUCILLE_BLACK_sideview_510x@2x.progressive.jpg?v=1706084670',
            'https://bristolshoes.ph/cdn/shop/files/LUCILLE_BLACK_DUO_510x@2x.progressive.jpg?v=1706084670',
            'https://bristolshoes.ph/cdn/shop/files/LUCILLE_BLACK_ZOOMED_510x@2x.progressive.jpg?v=1706084665',
            'https://bristolshoes.ph/cdn/shop/files/LUCILLE_BLACK_TOP_510x@2x.progressive.jpg?v=1706084838'
        ],
        sizes: [35, 36, 37, 38, 39, 40], unavailable: [],
        desc: 'Simple yet sophisticated the Lucille makes sure you stand apart from the crowd. Quality materials offer all-day comfort. Handcrafted in Marikina.',
        sale: false
    },
    // Women's Mule 
    {
        id: 12, category: 'women',
        type: "Women's Mule",
        name: 'CHARLIZE in Black',
        price: 3795, originalPrice: null,
        img: 'https://bristolshoes.ph/cdn/shop/files/CHARLIZE_BLACK_SIDEVIEW_510x@2x.progressive.jpg?v=1692082976',
        imgs: [
            'https://bristolshoes.ph/cdn/shop/files/CHARLIZE_BLACK_SIDEVIEW_510x@2x.progressive.jpg?v=1692082976',
            'https://bristolshoes.ph/cdn/shop/files/CHARLIZE_BLACK_DUO_510x@2x.progressive.jpg?v=1692085979',
            'https://bristolshoes.ph/cdn/shop/files/CHARLIZE_BLACK_ZOOMED_510x@2x.progressive.jpg?v=1692085979'
        ],
        sizes: [35, 36, 37, 38, 39, 40], unavailable: [],
        desc: 'The perfect shoe for a stylish yet comfortable slip-on. Simple and relaxed design with effortless style. Handcrafted in Marikina.',
        sale: false
    }
];


// ============================================================
// CART SYSTEM
// Gumagamit ng localStorage para i-persist ang cart data.
// ibig sabihin: kahit mag-refresh o mag-close ng browser,
// nandoon pa rin ang items sa cart pag bumalik ang user.
//
// localStorage = key-value storage sa browser. JSON.stringify()
// ang kino-convert ng JS array papuntang JSON string para ma-save.
// JSON.parse() ang nagco-convert pabalik sa JS array pag kinukuha.
// ============================================================
function getCart() {
    try { return JSON.parse(localStorage.getItem('bristol_cart') || '[]'); }
    catch (e) { return []; }
}
function saveCart(cart) {
    localStorage.setItem('bristol_cart', JSON.stringify(cart));
}
// addToCart() — nagdadagdag ng isang item sa cart.
// Logic: bawat cart item ay may unique 'key' = productId + '-' + size
// (e.g. '1-42' = product ID 1, size 42).
// Pag nandoon na ang item na iyon (same product + same size),
// dinagdagan lang ang qty ng 1 (hindi nagdadagdag ng bagong entry).
// Kung bago ang item, nagdadagdag ng bagong object sa cart array.
function addToCart(productId, size) {
    var cart = getCart();
    var product = PRODUCTS.find(function (p) { return p.id === productId; });
    if (!product) return;
    var key = productId + '-' + size;
    var existing = cart.find(function (i) { return i.key === key; });
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({
            key: key,
            id: productId,
            name: product.name,
            type: product.type,
            price: product.price,
            size: size,
            img: product.img,
            qty: 1
        });
    }
    saveCart(cart);
    updateCartBadge();
    animateCartIcon();
}
function removeFromCart(key) {
    var cart = getCart().filter(function (i) { return i.key !== key; });
    saveCart(cart);
    updateCartBadge();
    renderCartSidebar();
}
function changeQty(key, delta) {
    var cart = getCart();
    var item = cart.find(function (i) { return i.key === key; });
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) cart = cart.filter(function (i) { return i.key !== key; });
    saveCart(cart);
    updateCartBadge();
    renderCartSidebar();
}
// cartTotal() — nag-co-compute ng total price ng lahat ng items sa cart.
// .reduce() = nag-i-iterate sa bawat item at nag-a-add ng (price x qty) sa running sum.
// Simula sa 0, bawat item ay dinadagdag sa sum, hanggang makuha ang grand total.
function cartTotal() {
    return getCart().reduce(function (sum, i) { return sum + i.price * i.qty; }, 0);
}
function cartCount() {
    return getCart().reduce(function (sum, i) { return sum + i.qty; }, 0);
}
function updateCartBadge() {
    var badge = document.getElementById('cart-badge');
    if (!badge) return;
    var n = cartCount();
    badge.textContent = n;
    badge.style.display = n > 0 ? 'flex' : 'none';
}
function animateCartIcon() {
    var icon = document.getElementById('cart-icon');
    if (!icon) return;
    icon.classList.remove('cart-pop');
    void icon.offsetWidth;
    icon.classList.add('cart-pop');
}


// RENDER PRODUCT GRID 
function formatPrice(n) { return '₱' + n.toLocaleString('en-PH'); }

// renderProducts() — ang function na nag-ge-generate ng HTML ng lahat ng product cards
// at ini-inject sa #product-grid div sa products.html.
// Tinitingnan niya ang:
//   1. Active filter tab (All / Men's / Women's) — para malaman kung anong category ipapakita
//   2. Search input value — para i-filter pa ng products na nagtutugma sa search query
// Tapos gine-generate niya ang HTML string para sa bawat matching product
// at ilalagay sa innerHTML ng #product-grid.
// Pag walang matching products, nagpapakita ng 'No products found' message.
function renderProducts() {
    var grid = document.getElementById('product-grid');
    if (!grid) return;

    var activeTab = document.querySelector('.filter-tab.active');
    var filter = activeTab ? activeTab.dataset.filter : 'all';
    
    var searchInput = document.getElementById('product-search');
    var query = searchInput ? searchInput.value.toLowerCase().trim() : '';

    var list = filter === 'all' ? PRODUCTS : PRODUCTS.filter(function (p) { return p.category === filter; });
    
    if (query) {
        list = list.filter(function (p) {
            return p.name.toLowerCase().includes(query) || p.type.toLowerCase().includes(query);
        });
    }

    if (list.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">No products found matching your search.</div>';
        return;
    }

    grid.innerHTML = list.map(function (p) {
        var badge = p.sale ? '<span class="p-badge">SALE</span>' : '';
        var originalPrice = p.originalPrice ? '<s class="p-original">' + formatPrice(p.originalPrice) + '</s> ' : '';
        return '<div class="product" data-id="' + p.id + '" onclick="openModal(' + p.id + ')">'
            + badge
            + '<div class="product-thumb"><img src="' + p.img + '" alt="' + p.name + '" onerror="this.src=\'images/product_mens_1.png\'">'
            + '<div class="product-hover-overlay"><span>Quick View</span></div></div>'
            + '<div class="product-info">'
            + '<small>' + p.type + '</small>'
            + '<h3>' + p.name + '</h3>'
            + '<div class="p-price">' + originalPrice + '<strong>' + formatPrice(p.price) + '</strong></div>'
            + '</div></div>';
    }).join('');
}


// ============================================================
// FILTER TABS & SEARCH
// initFilters() = nagla-lagay ng click listeners sa filter buttons
// at input listener sa search field.
// Pag na-click ang tab o nag-type sa search:
//   1. I-update ang active tab styling
//   2. Tawagin ang renderProducts() para i-refresh ang grid
// Real-time ang search — bawat keystroke ay nag-ti-trigger ng re-render.
// ============================================================
function initFilters() {
    var tabs = document.querySelectorAll('.filter-tab');
    tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            tabs.forEach(function (t) { t.classList.remove('active'); });
            tab.classList.add('active');
            renderProducts();
        });
    });

    var searchInput = document.getElementById('product-search');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            renderProducts();
        });
    }
}


// ============================================================
// QUICK-VIEW MODAL
// currentProduct = nag-iimbak ng currently viewed product object.
// selectedSize   = nag-iimbak ng size na pinili ng user sa modal.
// buyNowItem     = temporary storage para sa 'Buy Now' flow
//                  (direktang papunta sa checkout, hindi dadaan sa cart).
//
// openModal(id) — kinukuha ang product by ID mula sa PRODUCTS array,
// gine-generate ang buong HTML ng modal content (images, details, sizes),
// at ini-inject ito sa .modal-body div. Tapos nagdadagdag ng 'open' class
// sa overlay para ipakita ang modal at ni-lock ang page scroll.
// ============================================================
var currentProduct = null;
var selectedSize = null;
var buyNowItem = null;

function openModal(id) {
    currentProduct = PRODUCTS.find(function (p) { return p.id === id; });
    if (!currentProduct) return;
    selectedSize = null;

    var modal = document.getElementById('product-modal');
    var p = currentProduct;

    // Sale badge
    var saleBadge = p.sale ? '<span class="modal-badge">SALE</span>' : '';
    var saveLine = (p.originalPrice)
        ? '<p class="modal-save">You Save: ' + formatPrice(p.originalPrice - p.price) + ' (' + Math.round((1 - p.price / p.originalPrice) * 100) + '%)</p>'
        : '';
    var originalLine = (p.originalPrice)
        ? '<s class="modal-original">' + formatPrice(p.originalPrice) + '</s> '
        : '';

    // Size buttons
    var sizeBtns = p.sizes.map(function (s) {
        var unavail = p.unavailable.indexOf(s) > -1;
        return '<button class="size-btn' + (unavail ? ' unavail' : '') + '" data-size="' + s + '"'
            + (unavail ? ' disabled title="Out of stock"' : '')
            + '>' + s + '</button>';
    }).join('');

    // Thumbnail strip
    var thumbs = p.imgs.map(function (src, i) {
        return '<img class="modal-thumb' + (i === 0 ? ' active' : '') + '" src="' + src + '" alt="" onerror="this.src=\'images/product_mens_1.png\'" onclick="switchModalImg(this, \'' + src + '\')">';
    }).join('');

    modal.querySelector('.modal-body').innerHTML =
        '<div class="modal-imgs">'
        + '<img id="modal-main-img" src="' + p.imgs[0] + '" alt="' + p.name + '" onerror="this.src=\'images/product_mens_1.png\'">'
        + '<div class="modal-thumbs">' + thumbs + '</div>'
        + '</div>'
        + '<div class="modal-details">'
        + saleBadge
        + '<p class="modal-type">' + p.type + '</p>'
        + '<h2 class="modal-name">' + p.name + '</h2>'
        + '<div class="modal-price">' + originalLine + '<span class="modal-price-main">' + formatPrice(p.price) + '</span></div>'
        + saveLine
        + '<p class="modal-desc">' + p.desc + '</p>'
        + '<div class="modal-sizes"><p class="modal-size-label">SIZE</p>'
        + '<div class="size-grid">' + sizeBtns + '</div></div>'
        + '<p id="modal-size-err" class="modal-size-err"></p>'
        + '<button class="modal-atc-btn" onclick="modalAddToCart()">Add to Cart</button>'
        + '<button class="modal-buy-btn" onclick="modalBuyNow()">Buy Now</button>'
        + '</div>';

    // Attach size selector events
    modal.querySelectorAll('.size-btn:not(.unavail)').forEach(function (btn) {
        btn.addEventListener('click', function () {
            modal.querySelectorAll('.size-btn').forEach(function (b) { b.classList.remove('selected'); });
            btn.classList.add('selected');
            selectedSize = parseInt(btn.dataset.size);
            document.getElementById('modal-size-err').textContent = '';
        });
    });

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function switchModalImg(thumb, src) {
    document.getElementById('modal-main-img').src = src;
    document.querySelectorAll('.modal-thumb').forEach(function (t) { t.classList.remove('active'); });
    thumb.classList.add('active');
}

function closeModal() {
    document.getElementById('product-modal').classList.remove('open');
    document.body.style.overflow = '';
}

function modalAddToCart() {
    if (!selectedSize) {
        document.getElementById('modal-size-err').textContent = 'Please select a size first.';
        return;
    }
    addToCart(currentProduct.id, selectedSize);
    closeModal();
    openCartSidebar();
}

function modalBuyNow() {
    if (!selectedSize) {
        document.getElementById('modal-size-err').textContent = 'Please select a size first.';
        return;
    }
    var product = PRODUCTS.find(function (p) { return p.id === currentProduct.id; });
    if (!product) return;
    
    buyNowItem = {
        id: product.id,
        name: product.name,
        type: product.type,
        price: product.price,
        size: selectedSize,
        img: product.img,
        qty: 1
    };
    
    closeModal();
    openCheckout(true);
}


// ============================================================
// CART SIDEBAR FUNCTIONS
// openCartSidebar()  = nag-re-render ng cart items, tapos nagdadagdag
//                      ng 'open' class sa sidebar at overlay para lumabas.
// closeCartSidebar() = nagtatanggal ng 'open' class para magsara.
// renderCartSidebar() = nag-ge-generate ng HTML para sa bawat cart item
//                       (image, name, size, price, qty controls, remove button)
//                       at ini-inject sa #cart-items div.
//                       Pag walang items: nagpapakita ng empty cart message.
//                       Pag may items: nagpapakita ng cart footer (total + checkout button).
// ============================================================
function openCartSidebar() {
    renderCartSidebar();
    document.getElementById('cart-sidebar').classList.add('open');
    document.getElementById('cart-overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
}
function closeCartSidebar() {
    document.getElementById('cart-sidebar').classList.remove('open');
    document.getElementById('cart-overlay').classList.remove('open');
    document.body.style.overflow = '';
}
function renderCartSidebar() {
    var cart = getCart();
    var list = document.getElementById('cart-items');
    var footer = document.getElementById('cart-footer');
    if (!list) return;

    if (cart.length === 0) {
        list.innerHTML = '<div class="cart-empty"><span>👟</span><p>Your cart is empty.</p><a href="#" onclick="closeCartSidebar()">Continue Shopping</a></div>';
        footer.style.display = 'none';
        return;
    }

    list.innerHTML = cart.map(function (item) {
        return '<div class="cart-item">'
            + '<img src="' + item.img + '" alt="' + item.name + '" onerror="this.src=\'images/product_mens_1.png\'">'
            + '<div class="cart-item-info">'
            + '<p class="ci-name">' + item.name + '</p>'
            + '<p class="ci-size">Size: ' + item.size + '</p>'
            + '<p class="ci-price">' + formatPrice(item.price) + '</p>'
            + '</div>'
            + '<div class="cart-item-ctrl">'
            + '<button onclick="changeQty(\'' + item.key + '\', -1)">−</button>'
            + '<span>' + item.qty + '</span>'
            + '<button onclick="changeQty(\'' + item.key + '\', 1)">+</button>'
            + '<button class="ci-remove" onclick="removeFromCart(\'' + item.key + '\')" title="Remove">✕</button>'
            + '</div>'
            + '</div>';
    }).join('');

    document.getElementById('cart-total-amt').textContent = formatPrice(cartTotal());
    footer.style.display = 'block';
}


// ============================================================
// CHECKOUT SYSTEM
// openCheckout(isBuyNow) — nagbu-bukas ng checkout modal.
//   isBuyNow = true  → ginagamit ang buyNowItem (single item lang, hindi buong cart)
//   isBuyNow = false → ginagamit ang buong cart
// Nag-po-populate ng order summary sa checkout modal (items, subtotal, total).
// Shipping ay fixed na ₱150 para sa lahat.
//
// placeOrder() — tinatawag pag na-submit ang checkout form.
//   1. Tinitingnan kung may selected payment method — kung wala, nagpapakita ng alert.
//   2. Kung Buy Now: ni-clear lang ang buyNowItem.
//      Kung cart: binubura ang buong cart sa localStorage + ina-update ang badge.
//   3. Isinasara ang checkout modal.
//   4. Ipinapakita ang order success toast notification sa ibaba ng screen.
//      Pagkatapos ng 3.5 seconds, natatanggal ang toast.
// ============================================================
function openCheckout(isBuyNow) {
    // Populate order summary
    var itemsList = document.getElementById('checkout-items-list');
    var sub = 0;

    if (isBuyNow && buyNowItem) {
        if (itemsList) {
            itemsList.innerHTML = '<div class="summary-row"><span>' + buyNowItem.name + ' (x1) sz:' + buyNowItem.size + '</span><span>' + formatPrice(buyNowItem.price) + '</span></div>';
        }
        sub = buyNowItem.price;
    } else {
        buyNowItem = null;
        var cart = getCart();
        if (itemsList) {
            itemsList.innerHTML = cart.map(function (i) {
                return '<div class="summary-row"><span>' + i.name + ' (x' + i.qty + ') sz:' + i.size + '</span><span>' + formatPrice(i.price * i.qty) + '</span></div>';
            }).join('');
        }
        sub = cartTotal();
    }

    var subtotalEl = document.getElementById('checkout-subtotal');
    var totalEl = document.getElementById('checkout-total');
    if (subtotalEl) subtotalEl.textContent = formatPrice(sub);
    if (totalEl) totalEl.textContent = formatPrice(sub + 150);
    closeCartSidebar();
    document.getElementById('checkout-modal').classList.add('open');
    document.body.style.overflow = 'hidden';
}
function closeCheckout() {
    document.getElementById('checkout-modal').classList.remove('open');
    document.body.style.overflow = '';
}
function selectPayment(el) {
    document.querySelectorAll('.pay-option').forEach(function (o) { o.classList.remove('selected'); });
    el.classList.add('selected');
}

function placeOrder() {
    var selected = document.querySelector('.pay-option.selected');
    if (!selected) { alert('Please select a payment method.'); return; }
    
    if (buyNowItem) {
        buyNowItem = null;
    } else {
        saveCart([]);
        updateCartBadge();
    }

    document.getElementById('checkout-form').reset();
    closeCheckout();
    // Show success toast
    var toast = document.getElementById('order-toast');
    if (toast) {
        toast.classList.add('show');
        setTimeout(function () { toast.classList.remove('show'); }, 3500);
    }
}


// ============================================================
// INITIALIZATION — runs pag fully loaded na ang HTML (DOM ready).
// DOMContentLoaded event = nag-fi-fire pag tapos na mag-parse ng HTML ang browser.
// Ginagawa natin dito:
//   1. renderProducts()  = i-populate ang product grid sa page load
//   2. initFilters()     = i-setup ang filter tab at search listeners
//   3. updateCartBadge() = ipakita ang cart count mula sa localStorage
//   4. Modal backdrop click = pag clinick ang dark overlay ng modal, isara ito
//   5. Cart overlay click  = pag clinick ang dark bg ng cart sidebar, isara ito
// ============================================================
document.addEventListener('DOMContentLoaded', function () {
    renderProducts();
    initFilters();
    updateCartBadge();

    // Close modal on backdrop click
    var modal = document.getElementById('product-modal');
    if (modal) {
        modal.addEventListener('click', function (e) {
            if (e.target === modal) closeModal();
        });
    }

    // Cart overlay click to close
    var overlay = document.getElementById('cart-overlay');
    if (overlay) overlay.addEventListener('click', closeCartSidebar);
});

