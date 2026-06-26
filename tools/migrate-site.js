const fs = require('fs');
const path = require('path');

const root = process.cwd();
const htmlFiles = [
  'index.html',
  'about.html',
  'services.html',
  'blog.html',
  'contact.html',
  'internship.html',
  'difference-between-vulnerability-assessment-and-penetration-testing.html',
  'why-every-company-needs-a-penetration-test-before-launching-a-website.html',
  'why-cybersecurity-should-be-part-of-every-business-strategy.html',
  'top-10-cybersecurity-threats-businesses-face-in-2026.html'
];

const dirs = [
  'config',
  'controllers',
  'middleware',
  'public/css',
  'public/js',
  'public/images',
  'public/fonts',
  'public/icons',
  'routes',
  'services',
  'utils',
  'views/layouts',
  'views/pages',
  'views/partials',
  'views/emails'
];

const ensureDir = (dir) => fs.mkdirSync(path.join(root, dir), { recursive: true });
dirs.forEach(ensureDir);

const pageMap = {
  'index.html': { view: 'home', route: '/', active: 'Home' },
  'about.html': { view: 'about', route: '/about', active: 'About' },
  'services.html': { view: 'services', route: '/services', active: 'Services' },
  'blog.html': { view: 'blog', route: '/blog', active: 'Blog' },
  'contact.html': { view: 'contact', route: '/contact', active: 'Contact' },
  'internship.html': { view: 'internship', route: '/internship', active: 'Internship' },
  'difference-between-vulnerability-assessment-and-penetration-testing.html': {
    view: 'difference-between-vulnerability-assessment-and-penetration-testing',
    route: '/difference-between-vulnerability-assessment-and-penetration-testing',
    active: 'Blog'
  },
  'why-every-company-needs-a-penetration-test-before-launching-a-website.html': {
    view: 'why-every-company-needs-a-penetration-test-before-launching-a-website',
    route: '/why-every-company-needs-a-penetration-test-before-launching-a-website',
    active: 'Blog'
  },
  'why-cybersecurity-should-be-part-of-every-business-strategy.html': {
    view: 'why-cybersecurity-should-be-part-of-every-business-strategy',
    route: '/why-cybersecurity-should-be-part-of-every-business-strategy',
    active: 'Blog'
  },
  'top-10-cybersecurity-threats-businesses-face-in-2026.html': {
    view: 'top-10-cybersecurity-threats-businesses-face-in-2026',
    route: '/top-10-cybersecurity-threats-businesses-face-in-2026',
    active: 'Blog'
  }
};

const normalizeAssets = (value) =>
  value
    .replace(/href="img\//g, 'href="/images/')
    .replace(/src="img\//g, 'src="/images/')
    .replace(/url\('img\//g, "url('/images/")
    .replace(/url\("img\//g, 'url("/images/')
    .replace(/url\(img\//g, 'url(/images/');

const stripBlock = (html, tag) => html.replace(new RegExp(`<${tag}[^>]*>[\\s\\S]*?<\\/${tag}>`, 'i'), '');

const pages = [];

for (const file of htmlFiles) {
  const sourcePath = fs.existsSync(path.join(root, file))
    ? path.join(root, file)
    : path.join(root, 'archived-static-site', file);
  const raw = fs.readFileSync(sourcePath, 'utf8');
  const meta = pageMap[file];
  const title = raw.match(/<title>([\s\S]*?)<\/title>/i)?.[1].trim() || 'Rynex Security';
  const description = raw.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i)?.[1].trim() || 'Rynex Security provides practical cybersecurity services, training, penetration testing, SOC, GRC, and security consulting.';
  const styles = [...raw.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map((match) => match[1]).join('\n\n');
  const scriptSrcs = [...raw.matchAll(/<script\s+src=["']([^"']+)["'][^>]*><\/script>/gi)].map((match) => match[1]);
  const inlineScripts = [...raw.matchAll(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi)].map((match) => match[1]).join('\n\n');
  const bodyMatch = raw.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  let body = bodyMatch ? bodyMatch[1] : '';
  body = stripBlock(body, 'header');
  body = stripBlock(body, 'footer');
  body = body.replace(/<script[\s\S]*?<\/script>/gi, '');
  body = body.replace(/<style[\s\S]*?<\/style>/gi, '');
  body = body.replace(/<input\s+type="hidden"\s+name="access_key"[^>]*>\s*/i, '');
  body = normalizeAssets(body).trim();
  const css = normalizeAssets(styles);
  let js = inlineScripts;

  if (file === 'contact.html') {
    js = js.replace(/const contactForm = document\.getElementById\('contactForm'\);[\s\S]*?contactForm\.addEventListener\('submit'[\s\S]*?\n        \}\);/m, '');
  }

  fs.writeFileSync(path.join(root, 'public/css', `${meta.view}.css`), css);
  if (js.trim()) {
    fs.writeFileSync(path.join(root, 'public/js', `${meta.view}.js`), js.trim() + '\n');
  }

  const externalScripts = [...new Set(scriptSrcs)].map((src) => `    <script src="${src}"></script>`).join('\n');
  const localScript = js.trim() ? `    <script src="/js/${meta.view}.js" defer></script>` : '';
  const contactScript = file === 'contact.html' ? '    <script src="/js/contact-form.js" defer></script>' : '';

  fs.writeFileSync(
    path.join(root, 'views/pages', `${meta.view}.ejs`),
    `<%- include('../partials/head', { title, description, canonicalPath, cssFile, structuredData }) %>\n<body>\n<%- include('../partials/navbar', { active }) %>\n\n${body}\n\n<%- include('../partials/footer') %>\n<%- include('../partials/scripts', { externalScripts, localScript, contactScript }) %>\n</body>\n</html>\n`
  );

  pages.push({
    file,
    ...meta,
    title,
    description,
    cssFile: `/css/${meta.view}.css`,
    externalScripts,
    localScript,
    contactScript
  });
}

const imgSource = path.join(root, 'img');
const imgTarget = path.join(root, 'public/images');
if (fs.existsSync(imgSource)) {
  for (const file of fs.readdirSync(imgSource)) {
    fs.copyFileSync(path.join(imgSource, file), path.join(imgTarget, file));
  }
}

fs.writeFileSync(path.join(root, 'config/pages.js'), `const pages = ${JSON.stringify(pages, null, 2)};\n\nconst byRoute = new Map();\nconst byLegacyRoute = new Map();\n\nfor (const page of pages) {\n  byRoute.set(page.route, page);\n  byLegacyRoute.set('/' + page.file, page);\n}\n\nmodule.exports = { pages, byRoute, byLegacyRoute };\n`);
