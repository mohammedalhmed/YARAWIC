# YARAWIC — ياراويك

![Vite](https://img.shields.io/badge/Vite-Static_App-646CFF?style=flat-square&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?style=flat-square&logo=javascript&logoColor=111)
![RTL](https://img.shields.io/badge/Arabic_RTL-111111?style=flat-square)
![GitHub Pages](https://img.shields.io/badge/Deployment-GitHub_Pages-222222?style=flat-square&logo=github&logoColor=white)

**Arabic-first RTL product catalog with lightweight WhatsApp ordering.**

[Interface](client/index.html) · [Product Logic](client/public/app.js) · [Styles](client/public/styles.css) · [Deploy Workflow](.github/workflows/deploy-pages.yml)

![YARAWIC catalog visual](client/public/assets/yarawic-brand/yarawic-catalog-banner.jpg)

نسخة Home v0 عربية RTL لعلامة ياراويك، أعيد تصميمها بصريًا بأسلوب **Contemporary Arabic Pantry**. الموقع يعرض كتالوجًا تفاعليًا من بيانات محلية، ويقود الطلب إلى واتساب من دون حسابات أو دفع أو مخزون.

## Portfolio Proof

| البعد | الدليل |
|---|---|
| **المشكلة** | علامة منتجات محلية تحتاج كتالوجًا عربيًا واضحًا ومسار طلب منخفض الاحتكاك دون بناء متجر Backend كامل. |
| **الحل** | واجهة RTL ثابتة تعرض الفئات والمنتجات والخيارات وتحوّل الاختيار إلى رسالة طلب واتساب. |
| **الواجهة** | [index.html](client/index.html) |
| **منطق المنتجات والطلب** | [app.js](client/public/app.js) |
| **نظام العرض** | [styles.css](client/public/styles.css) |
| **النشر** | [GitHub Pages workflow](.github/workflows/deploy-pages.yml) |
| **الحالة الحالية** | المشروع مجهز لبناء ثابت ونشر GitHub Pages؛ لا توجد حسابات مستخدمين أو دفع أو إدارة مخزون مخفية. |



## Product Flow

```mermaid
flowchart LR
    A["الواجهة الرئيسية"] --> B["استكشاف الفئات"]
    B --> C["شبكة المنتجات"]
    C --> D["تفاصيل المنتج"]
    D --> E["اختيار الحجم / النوع"]
    E --> F["طلب عبر واتساب"]
```

## التشغيل المحلي

```bash
pnpm install --frozen-lockfile
pnpm dev:static
```

يستمع Vite على المنفذ 3000. لبناء الملفات الثابتة:

```bash
pnpm build:static
```

## ما تحتويه النسخة

- Hero تحريري غير مركزي بصور منتجات ياراويك الحقيقية.
- خط Readex Pro للعناوين والواجهة، وDM Mono للأرقام والأسعار، وكلاهما محفوظ محليًا.
- فهرس فئات وشبكة منتجات واضحة، مع نافذة تفاصيل وخيارات الحجم/النوع والسعر.
- رسالة طلب مرتبطة بالاختيار إلى واتساب.
- قسم مخمّر الملفوف، خطوات الطلب، التوصيل والاستلام، وروابط العلامة.
- `client/public/manus-routes.json` لمسار الصفحة الرئيسية.

## نطاق المشروع

يركز المشروع على تجربة كتالوج عربية RTL خفيفة وسريعة، مع عرض المنتجات وخياراتها ومسار طلب مباشر، دون إدخال نظام حسابات أو دفع أو إدارة مخزون معقد.

## النشر

المشروع مجهز للنشر على GitHub Pages عبر GitHub Actions عند كل تحديث على فرع `main`:

`https://mohammedalhmed.github.io/YARAWIC/`
