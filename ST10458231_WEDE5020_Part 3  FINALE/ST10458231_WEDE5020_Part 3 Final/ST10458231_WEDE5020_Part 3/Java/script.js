// Popup System
class PopupSystem {
    constructor() {
        this.overlay = document.getElementById('popup-overlay');
        this.content = document.getElementById('popup-content');
        this.message = document.getElementById('popup-message');
        this.closeBtn = document.getElementById('popup-close');

        if (this.overlay && this.content && this.message && this.closeBtn) {
            this.init();
        } else {
            console.error('Popup elements not found!');
        }
    }

    init() {
        this.closeBtn.addEventListener('click', () => this.hide());
        this.overlay.addEventListener('click', e => {
            if (e.target === this.overlay) this.hide();
        });
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && this.overlay.style.display === 'flex') this.hide();
        });
    }

    show(message, title = 'All About Perfume', type = 'info') {
        this.message.innerHTML = `<h3>${title}</h3><p>${message}</p>`;
        this.content.className = 'popup-content';
        if (type === 'success') this.content.classList.add('popup-success');
        if (type === 'error') this.content.classList.add('popup-error');
        if (type === 'info') this.content.classList.add('popup-info');
        this.overlay.style.display = 'flex';
        setTimeout(() => this.closeBtn.focus(), 100);
    }

    hide() { this.overlay.style.display = 'none'; }

    success(msg, title='Success!') { this.show(msg, title, 'success'); }
    error(msg, title='Oops!') { this.show(msg, title, 'error'); }
    info(msg, title='Information') { this.show(msg, title, 'info'); }
}

// DOM ready
document.addEventListener('DOMContentLoaded', () => {
    window.popup = new PopupSystem();

//  Enquiry Form 
    const enquiryForm = document.getElementById('enquiry-form');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', e => {
            e.preventDefault();
            if (!enquiryForm.checkValidity()) return enquiryForm.reportValidity();

            const name = document.getElementById('name').value;
            const queryType = document.getElementById('ctype').value;

            window.popup.success(
                `Thank you <strong>${name}</strong>!<br><br>
                We have received your <strong>${queryType}</strong> enquiry and will reply to your Gmail within 48 hours.<br><br>
                <em>Thank you for choosing All About Perfume!</em>`,
                'Enquiry Submitted Successfully!'
            );

            enquiryForm.reset();
            setTimeout(() => window.popup.hide(), 8000);
        });
    }

//  Contact Form 
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', e => {
            e.preventDefault();
            if (!contactForm.checkValidity()) return contactForm.reportValidity();

            const name = document.getElementById('contact-name').value;
            const type = document.getElementById('contact-ctype').value;

            window.popup.success(
                `Thank you <strong>${name}</strong>!<br><br>
                Your <strong>${type}</strong> message has been received.<br>
                We will reply to your email within 48 hours.<br><br>
                <em>Thank you for contacting All About Perfume!</em>`,
                'Message Sent Successfully!'
            );

            contactForm.reset();
            setTimeout(() => window.popup.hide(), 8000);
        });
    }
});

// HOME PAGE SEARCH
document.addEventListener('DOMContentLoaded', function () {

    const pageSearchInput = document.getElementById('page-search');
    const pageSearchBtn = document.getElementById('page-search-btn');

// Only map PAGES (not perfumes)
    const pageMap = {
        "home": "index.html",
        "about": "about.html",
        "products": "products.html",
        "enquiry": "enquiry.html",
        "contact": "contact.html"
    };

    function performPageSearch() {
        if (!pageSearchInput) return; // Prevents errors on other pages

        const query = pageSearchInput.value.toLowerCase().trim();
        if (!query) {
            alert("Please enter a page name.");
            return;
        }

        let found = false;
        for (const key in pageMap) {
            if (query.includes(key)) {
                window.location.href = pageMap[key];
                found = true;
                break;
            }
        }

        if (!found) {
            alert("No page found for \"" + query + "\"");
        }
    }

    if (pageSearchBtn) {
        pageSearchBtn.addEventListener('click', performPageSearch);
        pageSearchInput.addEventListener('keydown', e => {
            if (e.key === "Enter") performPageSearch();
        });
    }
});

// SERVICES PAGE FILTER
function filterServices() {
    const input = document.getElementById("service-filter").value.toLowerCase();
    const services = document.querySelectorAll(".service-card");

    let anyVisible = false;

    services.forEach(card => {
        const text = card.innerText.toLowerCase();
        if (text.includes(input)) {
            card.style.display = "block";
            anyVisible = true;
        } else {
            card.style.display = "none";
        }
    });

    if (!anyVisible) {
        alert("No matching services found.");
    }
}

// PRODUCTS PAGE SEARCH
document.addEventListener('DOMContentLoaded', function () {

    const productSearchInput = document.getElementById('product-search');
    const productSearchBtn = document.getElementById('product-search-btn');

// Map perfume keywords to anchors (these MUST match your IDs on the page)
    const perfumeMap = {
    "armani si": "products.html#armani-si",
    "si": "products.html#armani-si",
    "lady million": "products.html#lady-million",
    "million": "products.html#lady-million",
    "dior sauvage": "products.html#dior-sauvage",
    "sauvage": "products.html#dior-sauvage",
    "versace eros": "products.html#versace-eros",
    "eros": "products.html#versace-eros",
    "gucci flora": "products.html#gucci-flora",
    "flora": "products.html#gucci-flora",
    "oud wood": "products.html#oud-wood",
    "oud": "products.html#oud-wood"
};

    function performProductSearch() {
        if (!productSearchInput) return;

        const query = productSearchInput.value.toLowerCase().trim();
        if (!query) {
            alert("Please enter a perfume name.");
            return;
        }

        if (perfumeMap[query]) {
            window.location.href = perfumeMap[query];
        } else {
            alert(`No perfumes found for "${query}".`);
        }
    }

    if (productSearchBtn) {
        productSearchBtn.addEventListener('click', performProductSearch);
        productSearchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') performProductSearch();
        });
    }
});


