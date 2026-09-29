const productCatalog = [
  {
    id: 'mixed-pickles',
    category: 'pickles',
    categoryLabel: 'المخللات',
    name: 'مخلل مشكل',
    short: 'تشكيلة خضار مخللة للمائدة اليومية.',
    variants: [{ label: '600 جم', price: 1500 }],
    image: './assets/products/yarawic-reference-12.jpg',
    imageAlt: 'عبوة مخلل مشكل من ياراويك مع خضروات مخللة',
    badge: '600 جم',
    availability: 'متوفر حسب التأكيد',
    ingredients: null,
    storage: null,
    leadTime: null
  },
  {
    id: 'cucumber-pickles',
    category: 'pickles',
    categoryLabel: 'المخللات',
    name: 'مخلل الخيار',
    short: 'أحد أصناف المخللات المنشورة في كتالوج ياراويك.',
    variants: [{ label: '600 جم', price: 1500 }],
    image: './assets/products/yarawic-reference-03.jpg',
    imageAlt: 'صورة مرجعية لبرطمان خضار مخللة من منتجات ياراويك',
    badge: '600 جم',
    availability: 'متوفر حسب التأكيد',
    ingredients: null,
    storage: null,
    leadTime: null
  },
  {
    id: 'strawberry-jam',
    category: 'jams',
    categoryLabel: 'المربيات',
    name: 'مربى الفراولة',
    short: 'متاحة بخيارات سكر عادي، بدون سكر، وخيار دايت حسب الكتالوج المنشور.',
    variants: [
      { label: '230 جم — سكر عادي', price: 1250 },
      { label: '230 جم — بدون سكر', price: 1500 },
      { label: '230 جم — دايت', price: 1500 }
    ],
    image: './assets/products/yarawic-reference-04.jpg',
    imageAlt: 'صورة مرجعية لمربى فواكه من منتجات ياراويك',
    badge: '230 جم',
    availability: 'متوفر حسب التأكيد',
    ingredients: null,
    storage: null,
    leadTime: null
  },
  {
    id: 'fruit-jam',
    category: 'jams',
    categoryLabel: 'المربيات',
    name: 'مربى فواكه حسب التوفر',
    short: 'تتوفر أصناف فواكه إضافية وطلبات خاصة بحسب الموسم.',
    variants: [{ label: '230 جم — يُحدد عند الطلب', price: null }],
    image: './assets/products/yarawic-reference-05.jpg',
    imageAlt: 'صورة مرجعية لمكونات ومنتجات ياراويك الغذائية',
    badge: 'حسب التوفر',
    availability: 'حسب الموسم والطلب',
    ingredients: null,
    storage: null,
    leadTime: null
  },
  {
    id: 'red-hot-sauce',
    category: 'sauces',
    categoryLabel: 'الصوصات والشطة',
    name: 'صوص أحمر حار',
    short: 'صوص حار متاح بحجمين وفق الكتالوج المنشور.',
    variants: [
      { label: '230 مل', price: 900 },
      { label: '450 مل', price: 1700 }
    ],
    image: './assets/products/yarawic-reference-10.jpg',
    imageAlt: 'زجاجة صوص أحمر من منتجات ياراويك',
    badge: 'حار',
    availability: 'متوفر حسب التأكيد',
    ingredients: null,
    storage: null,
    leadTime: null
  },
  {
    id: 'high-class-sauce',
    category: 'sauces',
    categoryLabel: 'الصوصات والشطة',
    name: 'صوص هاي كلاس',
    short: 'خيار صوص مميز من كتالوج ياراويك، بحجمين متاحين.',
    variants: [
      { label: '230 مل', price: 1500 },
      { label: '450 مل', price: 2500 }
    ],
    image: './assets/products/yarawic-reference-11.jpg',
    imageAlt: 'صوص ياراويك الأحمر مع طبق جانبي',
    badge: 'حار',
    availability: 'متوفر حسب التأكيد',
    ingredients: null,
    storage: null,
    leadTime: null
  },
  {
    id: 'achar-lemon',
    category: 'pantry',
    categoryLabel: 'العشار',
    name: 'عشار ليمون',
    short: 'متاح بالليمون الأحمر أو الأخضر الحار، وفق الكتالوج المنشور.',
    variants: [
      { label: '230 جم', price: 800 },
      { label: '550 جم', price: 1500 }
    ],
    image: './assets/products/yarawic-reference-03.jpg',
    imageAlt: 'صورة مرجعية لمنتج مخلل من ياراويك',
    badge: 'خياران',
    availability: 'متوفر حسب التأكيد',
    ingredients: null,
    storage: null,
    leadTime: null
  },
  {
    id: 'fermented-cabbage',
    category: 'fermented',
    categoryLabel: 'مخمّر الملفوف',
    name: 'مخمّر الملفوف',
    short: 'ملفوف أبيض أو أحمر بتخمير بكتيري، يُطلب مسبقًا.',
    variants: [
      { label: '200 جم', price: 1000 },
      { label: '330 جم', price: 2000 },
      { label: '500 جم', price: 3000 }
    ],
    extraOptions: [
      { label: 'ملفوف أبيض', price: 0 },
      { label: 'ملفوف أحمر', price: 500 }
    ],
    image: './assets/products/yarawic-reference-07.jpg',
    imageAlt: 'عبوة مخمّر الملفوف من ياراويك مع ملفوف أخضر',
    badge: 'طلب مسبق',
    availability: 'يُجهز حسب الطلب',
    ingredients: 'ملفوف أبيض أو أحمر ومحلول ملحي، بحسب الوصف المنشور.',
    storage: 'يُحفظ في الثلاجة عند 5°م ويستخدم بملعقة نظيفة وجافة، وفق الإرشادات المنشورة.',
    leadTime: 'أسبوعان كحد أدنى بعد تثبيت الطلب'
  }
];

const categoryLabels = {
  all: 'كل المنتجات',
  pickles: 'المخللات',
  jams: 'المربيات',
  sauces: 'الصوصات والشطة',
  fermented: 'مخمّر الملفوف',
  pantry: 'المنكهات الأخرى'
};

const productGrid = document.querySelector('#product-grid');
const catalogEmpty = document.querySelector('#catalog-empty');
const modal = document.querySelector('#product-modal');
const modalContent = document.querySelector('#modal-content');
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');
const siteShell = document.querySelector('.site-shell');
const floatingWhatsApp = document.querySelector('.floating-whatsapp');
let activeCategory = 'all';
let lastFocusedElement = null;

function formatPrice(price) {
  return price === null ? 'يُحدد عند الطلب' : `${new Intl.NumberFormat('ar-YE').format(price)} ريال`;
}

function escapeHTML(value) {
  return String(value).replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;'
  }[character]));
}

function productCard(product) {
  const lowestPrice = product.variants.reduce((lowest, variant) => {
    if (variant.price === null) return lowest;
    if (lowest === null || variant.price < lowest) return variant.price;
    return lowest;
  }, null);
  const priceText = lowestPrice === null ? 'يُحدد عند الطلب' : product.variants.length > 1 ? `من ${formatPrice(lowestPrice)}` : formatPrice(lowestPrice);

  return `
    <article class="product-card">
      <div class="product-card__image">
        <img src="${product.image}" alt="${escapeHTML(product.imageAlt)}" loading="lazy" />
        <span class="product-card__badge">${escapeHTML(product.badge)}</span>
      </div>
      <div class="product-card__body">
        <span class="product-card__meta">${escapeHTML(product.categoryLabel)}</span>
        <h3>${escapeHTML(product.name)}</h3>
        <div class="product-card__bottom">
          <span class="product-card__price">${priceText}</span>
          <button type="button" class="product-card__action" data-open-product="${product.id}" aria-label="عرض تفاصيل ${escapeHTML(product.name)}" aria-controls="product-modal" aria-haspopup="dialog" aria-expanded="false">←</button>
        </div>
      </div>
    </article>`;
}

function renderProducts() {
  const visibleProducts = activeCategory === 'all'
    ? productCatalog
    : productCatalog.filter((product) => product.category === activeCategory);

  productGrid.innerHTML = visibleProducts.map(productCard).join('');
  catalogEmpty.hidden = visibleProducts.length !== 0;
}

function createWhatsAppUrl(product, selectedVariant, selectedExtra) {
  const optionText = [selectedVariant?.label, selectedExtra?.label].filter(Boolean).join(' — ');
  const message = `السلام عليكم، أرغب في طلب ${product.name}${optionText ? ` — ${optionText}` : ''}.`;
  return `https://wa.me/967775071200?text=${encodeURIComponent(message)}`;
}

function modalInfoRow(label, value) {
  return `<div><dt>${escapeHTML(label)}</dt><dd>${escapeHTML(value)}</dd></div>`;
}

function openProduct(productId, opener = document.activeElement) {
  const product = productCatalog.find((item) => item.id === productId);
  if (!product) return;

  lastFocusedElement = opener;
  let selectedVariantIndex = 0;
  let selectedExtraIndex = 0;

  modalContent.innerHTML = `
    <div class="modal-product">
      <div class="modal-product__image"><img src="${product.image}" alt="${escapeHTML(product.imageAlt)}" /></div>
      <div class="modal-product__body">
        <p class="modal-product__category">${escapeHTML(product.categoryLabel)} · ${escapeHTML(product.availability)}</p>
        <h2 id="modal-title">${escapeHTML(product.name)}</h2>
        <p class="modal-product__description">${escapeHTML(product.short)}</p>
        <dl class="modal-product__info">
          ${modalInfoRow('المكونات', product.ingredients || 'تُؤكَّد التفاصيل عند الطلب')}
          ${modalInfoRow('الحفظ', product.storage || 'تُؤكَّد التفاصيل عند الطلب')}
          ${product.leadTime ? modalInfoRow('مدة التجهيز', product.leadTime) : modalInfoRow('التوفر', product.availability)}
          ${modalInfoRow('التوصيل', 'داخل صنعاء / نقطة استلام')}
        </dl>
        <span class="option-label">اختر الحجم أو النوع</span>
        <div class="option-group" id="variant-options" role="group" aria-label="خيارات الحجم أو النوع">
          ${product.variants.map((variant, index) => `<button type="button" class="${index === 0 ? 'is-selected' : ''}" aria-pressed="${index === 0}" data-variant-index="${index}">${escapeHTML(variant.label)}</button>`).join('')}
        </div>
        ${product.extraOptions ? `
          <span class="option-label">اختر نوع الملفوف</span>
          <div class="option-group" id="extra-options" role="group" aria-label="نوع الملفوف">
            ${product.extraOptions.map((option, index) => `<button type="button" class="${index === 0 ? 'is-selected' : ''}" aria-pressed="${index === 0}" data-extra-index="${index}">${escapeHTML(option.label)}${option.price ? ` (+${formatPrice(option.price)})` : ''}</button>`).join('')}
          </div>` : ''}
        <div class="modal-product__purchase">
          <strong class="modal-product__price" id="modal-price" aria-live="polite"></strong>
          <a class="button button--primary" id="modal-whatsapp" target="_blank" rel="noreferrer">اطلب عبر واتساب <span aria-hidden="true">←</span></a>
        </div>
        ${product.leadTime ? `<p class="modal-product__notice">${escapeHTML(product.leadTime)}. سيُؤكَّد وقت التسليم والتوفر عبر واتساب.</p>` : ''}
      </div>
    </div>`;

  const updateChoice = () => {
    const selectedVariant = product.variants[selectedVariantIndex];
    const selectedExtra = product.extraOptions ? product.extraOptions[selectedExtraIndex] : null;
    const totalPrice = selectedVariant.price === null ? null : selectedVariant.price + (selectedExtra?.price || 0);
    modalContent.querySelector('#modal-price').textContent = formatPrice(totalPrice);
    const whatsappButton = modalContent.querySelector('#modal-whatsapp');
    whatsappButton.href = createWhatsAppUrl(product, selectedVariant, selectedExtra);
  };

  modalContent.querySelectorAll('[data-variant-index]').forEach((button) => {
    button.addEventListener('click', () => {
      selectedVariantIndex = Number(button.dataset.variantIndex);
      modalContent.querySelectorAll('[data-variant-index]').forEach((item) => {
        const selected = item === button;
        item.classList.toggle('is-selected', selected);
        item.setAttribute('aria-pressed', String(selected));
      });
      updateChoice();
    });
  });

  modalContent.querySelectorAll('[data-extra-index]').forEach((button) => {
    button.addEventListener('click', () => {
      selectedExtraIndex = Number(button.dataset.extraIndex);
      modalContent.querySelectorAll('[data-extra-index]').forEach((item) => {
        const selected = item === button;
        item.classList.toggle('is-selected', selected);
        item.setAttribute('aria-pressed', String(selected));
      });
      updateChoice();
    });
  });

  updateChoice();
  if (lastFocusedElement instanceof HTMLElement) lastFocusedElement.setAttribute('aria-expanded', 'true');
  siteShell.inert = true;
  floatingWhatsApp.inert = true;
  modal.inert = false;
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  window.requestAnimationFrame(() => modal.querySelector('.modal__close')?.focus());
}

function closeModal() {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  modal.inert = true;
  siteShell.inert = false;
  floatingWhatsApp.inert = false;
  document.body.classList.remove('modal-open');
  if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
    lastFocusedElement.setAttribute('aria-expanded', 'false');
    lastFocusedElement.focus();
  }
  lastFocusedElement = null;
}

function closeMobileMenu({ restoreFocus = false } = {}) {
  mobileMenu.classList.remove('is-open');
  mobileMenu.setAttribute('aria-hidden', 'true');
  menuToggle.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'فتح القائمة');
  if (restoreFocus) menuToggle.focus();
}

function toggleMobileMenu() {
  const isOpen = mobileMenu.classList.toggle('is-open');
  mobileMenu.setAttribute('aria-hidden', String(!isOpen));
  menuToggle.classList.toggle('is-open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'إغلاق القائمة' : 'فتح القائمة');
}

document.addEventListener('click', (event) => {
  const productTrigger = event.target.closest('[data-open-product]');
  if (productTrigger) {
    openProduct(productTrigger.dataset.openProduct, productTrigger);
    return;
  }

  const filterButton = event.target.closest('[data-category]');
  if (filterButton) {
    activeCategory = filterButton.dataset.category;
    document.querySelectorAll('[data-category]').forEach((button) => {
      const selected = button === filterButton;
      button.classList.toggle('is-active', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    renderProducts();
    return;
  }

  if (event.target.closest('[data-close-modal]')) closeModal();
});

menuToggle.addEventListener('click', toggleMobileMenu);
mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMobileMenu));

document.addEventListener('keydown', (event) => {
  if (modal.classList.contains('is-open') && event.key === 'Tab') {
    const focusable = [...modal.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')]
      .filter((element) => element.getClientRects().length > 0);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (!first || !last) {
      event.preventDefault();
      return;
    }
    if (event.shiftKey && (document.activeElement === first || !modal.contains(document.activeElement))) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (document.activeElement === last || !modal.contains(document.activeElement))) {
      event.preventDefault();
      first.focus();
    }
    return;
  }

  if (event.key === 'Escape') {
    if (modal.classList.contains('is-open')) closeModal();
    if (mobileMenu.classList.contains('is-open')) closeMobileMenu({ restoreFocus: true });
  }
});

document.querySelector('#current-year').textContent = new Date().getFullYear();
renderProducts();
