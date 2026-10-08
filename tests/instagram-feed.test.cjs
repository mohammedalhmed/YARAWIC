const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

class Element {
  constructor(tagName = 'div') {
    this.tagName = tagName;
    this.children = [];
    this.attributes = {};
    this.listeners = {};
    this.dataset = {};
    this.disabled = false;
    this.hidden = false;
    this.textContent = '';
    this.isConnected = true;
  }
  append(...items) {
    for (const item of items) {
      if (item instanceof Fragment) this.children.push(...item.children);
      else this.children.push(item);
    }
  }
  replaceChildren(...items) {
    this.children = [];
    this.append(...items);
  }
  setAttribute(name, value) { this.attributes[name] = String(value); }
  addEventListener(name, listener) { this.listeners[name] = listener; }
  querySelector(selector) {
    if (selector === '[data-feed-count]') return this.children.find((node) => node.dataset.feedCount) || null;
    return null;
  }
  click() { this.listeners.click?.({ target: this }); }
}
class Fragment extends Element {}

class MockIntersectionObserver {
  constructor(callback, options) {
    this.callback = callback;
    this.options = options;
    this.targets = [];
    this.unobserved = new Set();
    this.disconnected = false;
    MockIntersectionObserver.instances.push(this);
    window.lastObserver = this;
  }
  observe(target) { this.targets.push(target); }
  unobserve(target) { this.unobserved.add(target); }
  disconnect() { this.disconnected = true; }
  reveal(target) { this.callback([{ target, isIntersecting: true }], this); }
}
MockIntersectionObserver.instances = [];

const source = fs.readFileSync('public/instagram-feed.js', 'utf8');
const sourceData = JSON.parse(fs.readFileSync('public/data/instagram-posts.json', 'utf8'));
const data = {
  ...sourceData,
  posts: [...sourceData.posts, {
    id: 'unsafe-url', url: 'https://attacker.invalid/reel/nope',
    publishedAt: '2026-01-01', type: 'video', caption: 'must be rejected'
  }]
};
const postsNode = new Element();
const statusNode = new Element('p');
const filterButtons = ['all', 'photo', 'carousel', 'video'].map((type) => {
  const button = new Element('button');
  button.dataset.feedFilter = type;
  const count = new Element('b');
  count.dataset.feedCount = 'true';
  button.append(count);
  return button;
});
const ids = { 'instagram-posts': postsNode, 'social-feed-status': statusNode };
let embedProcessCount = 0;
const document = {
  head: new Element('head'),
  getElementById: (id) => ids[id] || null,
  querySelectorAll: (selector) => selector === '[data-feed-filter]' ? filterButtons : [],
  createElement: (tag) => new Element(tag),
  createDocumentFragment: () => new Fragment('fragment'),
};
const window = {
  instgrm: { Embeds: { process: () => { embedProcessCount += 1; } } },
  IntersectionObserver: MockIntersectionObserver,
};
const context = {
  document, window, URL, Intl, Promise, Error, WeakMap,
  fetch: () => Promise.resolve({ ok: true, json: () => Promise.resolve(data) }),
};
vm.runInNewContext(source, context);
const tick = () => new Promise((resolve) => setImmediate(resolve));

(async () => {
  const sourcePosts = sourceData.posts;
  const tally = (type) => sourcePosts.filter((post) => post.type === type).length;
  assert.equal(sourcePosts.length, 12, 'all 12 verified public posts are included');
  assert.deepEqual([tally('photo'), tally('carousel'), tally('video')], [9, 1, 2]);
  assert.equal(new Set(sourcePosts.map((post) => post.id)).size, 12, 'IDs are unique');

  await tick();
  assert.equal(postsNode.children.length, 12, 'all posts render as cards without a pagination button');
  assert.match(statusNode.textContent, /12 منشورًا/);
  assert.deepEqual(filterButtons.map((button) => button.children[0].textContent), ['12', '9', '1', '2']);
  assert.equal(window.lastObserver.targets.length, 12, 'each card media item is observed for automatic inline embedding');
  assert(postsNode.children.every((card) => card.children[1].className === 'post-card__media'));
  assert(postsNode.children.every((card) => !card.children.some((child) => child.tagName === 'button')),
    'cards have no preview button');

  const firstMedia = postsNode.children[0].children[1];
  window.lastObserver.reveal(firstMedia);
  assert.equal(firstMedia.children[0].tagName, 'blockquote');
  assert.equal(firstMedia.children[0].attributes['data-instgrm-permalink'], 'https://www.instagram.com/p/Db6Yw6KCFgH/');
  await tick();
  assert.equal(firstMedia.dataset.embedState, 'embedded');
  assert.equal(firstMedia.attributes['aria-busy'], 'false');
  assert.equal(embedProcessCount, 1, 'visible media is processed automatically without a user click');

  filterButtons[3].click();
  assert.equal(filterButtons[3].attributes['aria-pressed'], 'true');
  assert.equal(postsNode.children.length, 2, 'the video filter displays both Reels as cards');
  const reelObserver = window.lastObserver;
  reelObserver.targets.slice().forEach((target) => reelObserver.reveal(target));
  await tick();
  const reelLinks = postsNode.children.map((card) => card.children[1].children[0].attributes['data-instgrm-permalink']);
  assert.deepEqual(reelLinks, [
    'https://www.instagram.com/reel/DYARuuctB2k/',
    'https://www.instagram.com/reel/DX3oWuQtGYZ/'
  ]);
  assert(postsNode.children.every((card) => card.children[1].dataset.embedState === 'embedded'));

  filterButtons[2].click();
  assert.equal(postsNode.children.length, 1, 'the carousel filter renders its album directly');
  const albumMedia = postsNode.children[0].children[1];
  window.lastObserver.reveal(albumMedia);
  await tick();
  assert.equal(albumMedia.children[0].attributes['data-instgrm-permalink'], 'https://www.instagram.com/p/DboOOXMnNfl/');

  filterButtons[1].click();
  assert.equal(postsNode.children.length, 9, 'the photo filter shows all photos without paging');
  assert.equal(filterButtons[1].disabled, false);
  assert.equal(postsNode.children[0].children[1].dataset.embedState, 'pending', 'off-screen photos load when scrolled near');

  console.log('PASS: 12 cards render at once; 9 photos, 1 album, 2 Reels; no preview buttons; official embeds load automatically in-card on scroll; filters, lazy loading, and unsafe URL rejection work.');
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
