(() => {
  'use strict';

  const PROFILE_URL = 'https://www.instagram.com/yarawic/';
  const LOGO_URL = 'assets/yarawic-brand/yarawic-logo-reference.jpg';
  const postsNode = document.getElementById('instagram-posts');
  const statusNode = document.getElementById('social-feed-status');
  const filterButtons = [...document.querySelectorAll('[data-feed-filter]')];

  if (!postsNode || !statusNode) return;

  const numberFormat = new Intl.DateTimeFormat('ar-YE', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
  let posts = [];
  let activeFilter = 'all';
  let embedScriptPromise;
  let mediaObserver = createMediaObserver();
  const watchedPosts = new WeakMap();

  function createMediaObserver() {
    if (typeof window.IntersectionObserver !== 'function') return null;
    return new window.IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        mediaObserver?.unobserve(entry.target);
        const post = watchedPosts.get(entry.target);
        if (post) renderEmbed(entry.target, post);
      });
    }, { rootMargin: '320px 0px', threshold: 0.01 });
  }

  function safePostUrl(value) {
    try {
      const url = new URL(value);
      return url.origin === 'https://www.instagram.com' &&
        /^\/(?:yarawic\/)?(?:p|reel)\/[A-Za-z0-9_-]+\/?$/.test(url.pathname)
        ? url.href
        : null;
    } catch {
      return null;
    }
  }

  function embedUrl(value) {
    const safeUrl = safePostUrl(value);
    if (!safeUrl) return null;
    const url = new URL(safeUrl);
    const match = url.pathname.match(/^\/(?:yarawic\/)?(p|reel)\/([A-Za-z0-9_-]+)\/?$/);
    return match ? `${url.origin}/${match[1]}/${match[2]}/` : null;
  }

  function addText(parent, tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    node.textContent = text;
    parent.append(node);
    return node;
  }

  function formatDate(value) {
    const date = new Date(`${value}T12:00:00Z`);
    return Number.isNaN(date.getTime()) ? value : numberFormat.format(date);
  }

  function typeLabel(type) {
    if (type === 'carousel') return 'ألبوم صور';
    if (type === 'video' || type === 'reel') return 'فيديو · Reel';
    return 'صورة';
  }

  function loadInstagramEmbeds() {
    if (window.instgrm?.Embeds?.process) return Promise.resolve(window.instgrm);
    if (embedScriptPromise) return embedScriptPromise;

    embedScriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://www.instagram.com/embed.js';
      script.async = true;
      script.onload = () => window.instgrm?.Embeds?.process
        ? resolve(window.instgrm)
        : reject(new Error('Instagram embed API unavailable'));
      script.onerror = () => reject(new Error('Instagram embed script failed to load'));
      document.head.append(script);
    }).catch((error) => {
      embedScriptPromise = undefined;
      throw error;
    });
    return embedScriptPromise;
  }

  function addFallback(mediaNode, url) {
    mediaNode.dataset.embedState = 'fallback';
    mediaNode.setAttribute('aria-busy', 'false');
    const box = document.createElement('div');
    box.className = 'post-card__loading post-card__loading--error';
    addText(box, 'span', '', 'لم تظهر الوسائط المضمّنة الآن. يمكنك فتح المنشور الأصلي.');
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = 'فتح المنشور على Instagram';
    box.append(link);
    mediaNode.replaceChildren(box);
  }

  function renderEmbed(mediaNode, post) {
    if (!mediaNode.isConnected || ['loading', 'embedded'].includes(mediaNode.dataset.embedState)) return;
    const permalink = embedUrl(post.url);
    if (!permalink) {
      addFallback(mediaNode, PROFILE_URL);
      return;
    }

    mediaNode.dataset.embedState = 'loading';
    mediaNode.setAttribute('aria-busy', 'true');
    const blockquote = document.createElement('blockquote');
    blockquote.className = 'instagram-media';
    blockquote.setAttribute('data-instgrm-permalink', permalink);
    blockquote.setAttribute('data-instgrm-version', '14');
    blockquote.setAttribute('data-instgrm-captioned', '');
    const fallbackLink = document.createElement('a');
    fallbackLink.href = post.url;
    fallbackLink.target = '_blank';
    fallbackLink.rel = 'noopener noreferrer';
    fallbackLink.textContent = 'عرض المنشور الأصلي في Instagram';
    blockquote.append(fallbackLink);
    mediaNode.replaceChildren(blockquote);

    loadInstagramEmbeds()
      .then((instagram) => {
        if (mediaNode.isConnected) return instagram.Embeds.process();
        return undefined;
      })
      .then(() => {
        if (!mediaNode.isConnected) return;
        mediaNode.dataset.embedState = 'embedded';
        mediaNode.setAttribute('aria-busy', 'false');
      })
      .catch(() => {
        if (mediaNode.isConnected) addFallback(mediaNode, post.url);
      });
  }

  function getFilteredPosts() {
    if (activeFilter === 'all') return posts;
    if (activeFilter === 'video') return posts.filter((post) => post.type === 'video' || post.type === 'reel');
    return posts.filter((post) => post.type === activeFilter);
  }

  function updateFilterCounts() {
    filterButtons.forEach((button) => {
      const type = button.dataset.feedFilter;
      const countNode = button.querySelector('[data-feed-count]');
      let count = posts.length;
      if (type === 'video') count = posts.filter((post) => post.type === 'video' || post.type === 'reel').length;
      else if (type !== 'all') count = posts.filter((post) => post.type === type).length;
      if (countNode) countNode.textContent = String(count);
      button.setAttribute('aria-pressed', String(type === activeFilter));
      button.disabled = count === 0;
    });
  }

  function createCard(post) {
    const url = safePostUrl(post.url);
    if (!url) return null;

    const article = document.createElement('article');
    article.className = 'post-card';
    article.dataset.postType = post.type;

    const head = document.createElement('header');
    head.className = 'post-card__head';
    const avatar = document.createElement('span');
    avatar.className = 'post-card__avatar';
    avatar.setAttribute('aria-hidden', 'true');
    const logo = document.createElement('img');
    logo.src = LOGO_URL;
    logo.alt = '';
    logo.width = 42;
    logo.height = 42;
    logo.loading = 'lazy';
    avatar.append(logo);
    head.append(avatar);

    const identity = document.createElement('div');
    identity.className = 'post-card__identity';
    addText(identity, 'b', '', 'ياراويك');
    addText(identity, 'span', '', '@yarawic · الحساب الرسمي');
    head.append(identity);
    addText(head, 'span', 'post-card__kind', typeLabel(post.type));
    article.append(head);

    const media = document.createElement('div');
    media.className = 'post-card__media';
    media.dataset.embedState = 'pending';
    media.setAttribute('role', 'group');
    media.setAttribute('aria-label', `${typeLabel(post.type)} من حساب @yarawic`);
    media.setAttribute('aria-busy', 'true');
    const loading = document.createElement('div');
    loading.className = 'post-card__loading';
    const mediaLabel = post.type === 'video' || post.type === 'reel' ? 'جارٍ تحميل الفيديو داخل البطاقة…' : 'جارٍ تحميل الصورة داخل البطاقة…';
    addText(loading, 'span', '', mediaLabel);
    media.append(loading);
    article.append(media);

    const foot = document.createElement('footer');
    foot.className = 'post-card__foot';
    const time = document.createElement('time');
    time.dateTime = post.publishedAt;
    time.textContent = formatDate(post.publishedAt);
    foot.append(time);
    const link = document.createElement('a');
    link.className = 'post-card__link';
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = 'عرض المنشور على Instagram';
    foot.append(link);
    article.append(foot);

    return { article, media, post: { ...post, url } };
  }

  function renderPosts() {
    mediaObserver?.disconnect();
    mediaObserver = createMediaObserver();
    const filtered = getFilteredPosts();
    const fragment = document.createDocumentFragment();
    const mediaTargets = [];

    filtered.forEach((post) => {
      const card = createCard(post);
      if (!card) return;
      fragment.append(card.article);
      mediaTargets.push(card);
    });
    postsNode.replaceChildren(fragment);
    updateFilterCounts();

    mediaTargets.forEach(({ media, post }) => {
      if (mediaObserver) {
        watchedPosts.set(media, post);
        mediaObserver.observe(media);
      } else {
        renderEmbed(media, post);
      }
    });

    statusNode.textContent = filtered.length
      ? `${filtered.length} منشورًا من حساب ياراويك · الوسائط تظهر مباشرةً في البطاقات`
      : 'لا توجد منشورات من هذا النوع حاليًا.';
  }

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.feedFilter;
      renderPosts();
    });
  });

  fetch('data/instagram-posts.json', { headers: { Accept: 'application/json' } })
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then((data) => {
      if (data.account !== '@yarawic' || data.profileUrl !== PROFILE_URL || !Array.isArray(data.posts)) {
        throw new Error('Unexpected Instagram feed data');
      }
      posts = data.posts
        .filter((post) => safePostUrl(post.url) && /^\d{4}-\d{2}-\d{2}$/.test(post.publishedAt) && ['photo', 'carousel', 'video', 'reel'].includes(post.type))
        .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
      if (!posts.length) throw new Error('No valid Instagram posts');
      renderPosts();
    })
    .catch(() => {
      statusNode.textContent = 'تعذّر تحميل المنشورات الآن. يمكن مشاهدة أحدث محتوى مباشرةً في حساب ياراويك.';
      const fallback = document.createElement('a');
      fallback.href = PROFILE_URL;
      fallback.target = '_blank';
      fallback.rel = 'noopener noreferrer';
      fallback.className = 'post-card__link';
      fallback.textContent = 'افتح حساب @yarawic على إنستغرام';
      postsNode.replaceChildren(fallback);
    });
})();
