// ============================================================
//  Bristol Shoes — Info Modal
//  Opens a modal with Shipping Policy, Return Policy, or FAQ
//  content when the user clicks the footer trust links.
// ============================================================

var INFO_CONTENT = {
    shipping: {
        title: 'Shipping Policy',
        body: [
            { q: 'Processing Time', a: 'Orders are processed within 1–2 business days after payment confirmation.' },
            { q: 'Metro Manila Delivery', a: 'Estimated 2–4 business days via J&T Express or Lalamove Same-Day.' },
            { q: 'Provincial Delivery', a: 'Estimated 5–8 business days via LBC or JRS Express.' },
            { q: 'Shipping Fee', a: 'Flat rate of ₱150 for Metro Manila. Provincial rates may vary based on location and courier.' },
            { q: 'Free Shipping', a: 'Enjoy free shipping on orders ₱3,000 and above within Metro Manila.' },
            { q: 'Order Tracking', a: 'A tracking number will be provided via email or SMS after your order has been dispatched.' },
        ]
    },
    returns: {
        title: 'Return & Exchange Policy',
        body: [
            { q: 'Return Window', a: 'Items may be returned or exchanged within 7 days from the date of receipt.' },
            { q: 'Condition', a: 'Items must be unworn, in original packaging, and with all tags intact.' },
            { q: 'Size Exchanges', a: 'We gladly exchange for a different size subject to availability. Shipping for the exchange is shouldered by the customer.' },
            { q: 'Defective Items', a: 'If you receive a defective item, contact us within 48 hours of receipt with photos and we will arrange a free replacement or full refund.' },
            { q: 'Non-Returnable', a: 'Sale items, gift cards, and items marked "Final Sale" are not eligible for return or exchange.' },
            { q: 'How to Return', a: 'Contact us at bristolshoes@hotmail.com or call +630345027 to initiate a return request.' },
        ]
    },
    faq: {
        title: 'Frequently Asked Questions',
        body: [
            { q: 'Are your shoes genuine leather?', a: 'Yes! All Bristol Shoes are handcrafted using premium full-grain and top-grain leather sourced from Marikina\'s finest tanneries.' },
            { q: 'Can I visit your store?', a: 'Absolutely! Visit us at #35 Caimito St., Amang Rodriguez Subdivision, Concepcion Uno, Marikina City. We are open Mon–Sat, 9am–6pm.' },
            { q: 'Do you offer custom orders?', a: 'Yes, we accept made-to-order shoes. Please contact us directly to discuss sizing, materials, and lead time (usually 2–3 weeks).' },
            { q: 'How do I find the right size?', a: 'Use the Size Guide available on any product page. If you are between sizes, we recommend sizing up for a more comfortable fit.' },
            { q: 'Do you ship internationally?', a: 'Currently we ship within the Philippines only. International shipping is being planned for the near future.' },
            { q: 'What payment methods do you accept?', a: 'We accept GCash, Cash on Delivery (COD), and Bank Transfer (BDO/BPI).' },
        ]
    }
};

function openInfoModal(type) {
    var data = INFO_CONTENT[type];
    if (!data) return;

    var body = '';
    body += '<h2 style="font-family: \'Playfair Display\', serif; font-size: 22px; color: var(--heading); margin-bottom: 20px;">' + data.title + '</h2>';
    data.body.forEach(function (item) {
        body += '<div style="margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid var(--border);">';
        body += '<p style="font-size: 12px; font-weight: 700; color: var(--accent); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px;">' + item.q + '</p>';
        body += '<p style="font-size: 13px; color: var(--text-muted); line-height: 1.65;">' + item.a + '</p>';
        body += '</div>';
    });

    var overlay = document.getElementById('info-modal-overlay');
    var bodyEl  = document.getElementById('info-modal-body');
    if (!overlay || !bodyEl) return;

    bodyEl.innerHTML = body;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeInfoModal() {
    var overlay = document.getElementById('info-modal-overlay');
    if (!overlay) return;
    overlay.classList.remove('open');
    document.body.style.overflow = '';
}

// Close on Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeInfoModal();
});
