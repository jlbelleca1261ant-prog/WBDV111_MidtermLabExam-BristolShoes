// ============================================================
//  Bristol Shoes - Shop Engine
//  Product catalog, filter tabs, quick-view modal, cart system
// ============================================================

'use strict';

//PRODUCT CATALOG (real Bristol data) 
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


// CART (persisted in localStorage) 
function getCart() {
    try { return JSON.parse(localStorage.getItem('bristol_cart') || '[]'); }
    catch (e) { return []; }
}
function saveCart(cart) {
    localStorage.setItem('bristol_cart', JSON.stringify(cart));
}
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
    showAtcToast(product.name);
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

function renderProducts(filter) {
    var grid = document.getElementById('product-grid');
    if (!grid) return;
    var list = filter === 'all' ? PRODUCTS : PRODUCTS.filter(function (p) { return p.category === filter; });
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


// FILTER TABS 
function initFilters() {
    var tabs = document.querySelectorAll('.filter-tab');
    tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            tabs.forEach(function (t) { t.classList.remove('active'); });
            tab.classList.add('active');
            renderProducts(tab.dataset.filter);
        });
    });
}


// QUICK-VIEW MODAL
var currentProduct = null;
var selectedSize = null;

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
        + '<button class="modal-atc-btn" onclick="modalAddToCart()">🛒 Add to Cart</button>'
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
        document.getElementById('modal-size-err').textContent = '⚠ Please select a size first.';
        return;
    }
    addToCart(currentProduct.id, selectedSize);
    closeModal();
    openCartSidebar();
}


// ── CART SIDEBAR ──────────────────────────────────────────────
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


// CHECKOUT (simple modal with payment options)
function openCheckout() {
    // Populate order summary
    var cart = getCart();
    var itemsList = document.getElementById('checkout-items-list');
    if (itemsList) {
        itemsList.innerHTML = cart.map(function (i) {
            return '<div class="summary-row"><span>' + i.name + ' (x' + i.qty + ') sz:' + i.size + '</span><span>' + formatPrice(i.price * i.qty) + '</span></div>';
        }).join('');
    }
    var sub = cartT();
    var subtotalEl = document.getElementById('checkout-subtotal');
    var totalEl = document.getElementById('checkout-total');
    if (subtotalEl) subtotalEl.textContent = formatPrice(sub);
    if (totalEl) totalEl.textContent = formatPrice(sub + 150);
    closeCartSidebar();
    document.getElementById('checkout-modal').classList.add('open');
}
function close() {
    document.getElementById('checkout-modal').classList.remove('open');
}
function selectPayment(el) {
    document.querySelectorAll('.pay-option').forEach(function (o) { o.classList.remove('selected'); });
    el.classList.add('selected');
}

function placeOrder() {
    var selected = document.querySelector('.pay-option.selected');
    if (!selected) { alert('please select a payment method.'); return; }
    saveCart([]);
    updateCartBadge();
    document.getElementById('checkout-form').reset();
    closeC
    // Show success toast
    var toast = document.getElementById('order-toast');
    toast.classList.add('show');
    setTimeout(function () { toast.classList.remove('show'); }, 3500);
}


// INIT 
document.addEventListener('DOMContentLoaded', function () {
    renderProducts('all');
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

// ── Add to Cart Toast ──────────────────────────────────────────
var _atcTimer = null;
function showAtcToast(productName) {
    var toast = document.getElementById('atc-toast');
    var msg   = document.getElementById('atc-toast-msg');
    if (!toast) return;
    if (msg) msg.textContent = '\u201c' + productName + '\u201d added to cart!';
    clearTimeout(_atcTimer);
    toast.classList.add('show');
    _atcTimer = setTimeout(function () {
        toast.classList.remove('show');
    }, 2800);
}
