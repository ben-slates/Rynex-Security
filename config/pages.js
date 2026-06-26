const pages = [
  {
    "file": "index.html",
    "view": "home",
    "route": "/",
    "active": "Home",
    "title": "Rynex Security | Detect . Exploit . Secure",
    "description": "Rynex Security offers VAPT, SOC, GRC, threat hunting, and malware analysis services. Practical cybersecurity expertise protecting businesses from real-world cyber threats.",
    "cssFile": "/css/home.css",
    "externalScripts": "    <script src=\"https://unpkg.com/aos@2.3.1/dist/aos.js\"></script>\n    <script src=\"https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js\"></script>",
    "localScript": "    <script src=\"/js/home.js\" defer></script>",
    "contactScript": ""
  },
  {
    "file": "about.html",
    "view": "about",
    "route": "/about",
    "active": "About",
    "title": "About Us | Rynex Security",
    "description": "Learn about Rynex Security — a team of ethical hackers and security researchers delivering practical offensive and defensive cybersecurity solutions across Pakistan.",
    "cssFile": "/css/about.css",
    "externalScripts": "    <script src=\"https://unpkg.com/aos@2.3.1/dist/aos.js\"></script>",
    "localScript": "    <script src=\"/js/about.js\" defer></script>",
    "contactScript": ""
  },
  {
    "file": "services.html",
    "view": "services",
    "route": "/services",
    "active": "Services",
    "title": "Our Services | Rynex Security",
    "description": "Explore Rynex Security's professional services: VAPT, SOC monitoring, GRC compliance, threat hunting, malware analysis, and comprehensive security audits.",
    "cssFile": "/css/services.css",
    "externalScripts": "    <script src=\"https://unpkg.com/aos@2.3.1/dist/aos.js\"></script>",
    "localScript": "    <script src=\"/js/services.js\" defer></script>",
    "contactScript": ""
  },
  {
    "file": "blog.html",
    "view": "blog",
    "route": "/blog",
    "active": "Blog",
    "title": "Cybersecurity Blog & Insights | Rynex Security",
    "description": "Explore practical cybersecurity insights from Rynex Security, including threat trends, penetration testing, malware analysis, SOC operations, and proactive defense.",
    "cssFile": "/css/blog.css",
    "externalScripts": "    <script src=\"https://unpkg.com/aos@2.3.1/dist/aos.js\"></script>",
    "localScript": "    <script src=\"/js/blog.js\" defer></script>",
    "contactScript": ""
  },
  {
    "file": "contact.html",
    "view": "contact",
    "route": "/contact",
    "active": "Contact",
    "title": "Contact Us | Rynex Security",
    "description": "Contact Rynex Security for a consultation on VAPT, SOC, GRC, or any cybersecurity challenge. Reach us by email, phone, or our secure contact form.",
    "cssFile": "/css/contact.css",
    "externalScripts": "    <script src=\"https://unpkg.com/aos@2.3.1/dist/aos.js\"></script>",
    "localScript": "    <script src=\"/js/contact.js\" defer></script>",
    "contactScript": "    <script src=\"/js/contact-form.js\" defer></script>"
  },
  {
    "file": "internship.html",
    "view": "internship",
    "route": "/internship",
    "active": "Internship",
    "title": "Rynex Security Internship Program 2026",
    "description": "Apply for the Rynex Security Internship Program 2026 — a six-week remote cybersecurity internship with Red Team (VAPT) and Blue Team (SOC) tracks starting 11 July 2026.",
    "cssFile": "/css/internship.css",
    "externalScripts": "    <script src=\"https://unpkg.com/aos@2.3.1/dist/aos.js\"></script>",
    "localScript": "    <script src=\"/js/internship.js\" defer></script>",
    "contactScript": ""
  },
  {
    "file": "difference-between-vulnerability-assessment-and-penetration-testing.html",
    "view": "difference-between-vulnerability-assessment-and-penetration-testing",
    "route": "/difference-between-vulnerability-assessment-and-penetration-testing",
    "active": "Blog",
    "title": "Difference Between Vulnerability Assessment and Penetration Testing | Rynex Security",
    "description": "Learn the key differences between Vulnerability Assessments and Penetration Testing. Discover their objectives, methodologies, benefits, and why businesses need both to strengthen cybersecurity.",
    "cssFile": "/css/difference-between-vulnerability-assessment-and-penetration-testing.css",
    "externalScripts": "    <script src=\"https://unpkg.com/aos@2.3.1/dist/aos.js\"></script>",
    "localScript": "    <script src=\"/js/difference-between-vulnerability-assessment-and-penetration-testing.js\" defer></script>",
    "contactScript": ""
  },
  {
    "file": "why-every-company-needs-a-penetration-test-before-launching-a-website.html",
    "view": "why-every-company-needs-a-penetration-test-before-launching-a-website",
    "route": "/why-every-company-needs-a-penetration-test-before-launching-a-website",
    "active": "Blog",
    "title": "Why Every Company Needs a Penetration Test Before Launching a Website | Rynex Security",
    "description": "Launching a website without a penetration test can expose your business to cyberattacks, data breaches, and reputational damage. Learn why penetration testing should be part of every website launch strategy.",
    "cssFile": "/css/why-every-company-needs-a-penetration-test-before-launching-a-website.css",
    "externalScripts": "    <script src=\"https://unpkg.com/aos@2.3.1/dist/aos.js\"></script>",
    "localScript": "    <script src=\"/js/why-every-company-needs-a-penetration-test-before-launching-a-website.js\" defer></script>",
    "contactScript": ""
  },
  {
    "file": "why-cybersecurity-should-be-part-of-every-business-strategy.html",
    "view": "why-cybersecurity-should-be-part-of-every-business-strategy",
    "route": "/why-cybersecurity-should-be-part-of-every-business-strategy",
    "active": "Blog",
    "title": "Why Cybersecurity Should Be Part of Every Business Strategy | Rynex Security",
    "description": "Learn why cybersecurity is no longer just an IT concern. Discover how integrating cybersecurity into business strategy protects revenue, reputation, customer trust, and long-term growth.",
    "cssFile": "/css/why-cybersecurity-should-be-part-of-every-business-strategy.css",
    "externalScripts": "    <script src=\"https://unpkg.com/aos@2.3.1/dist/aos.js\"></script>",
    "localScript": "    <script src=\"/js/why-cybersecurity-should-be-part-of-every-business-strategy.js\" defer></script>",
    "contactScript": ""
  },
  {
    "file": "top-10-cybersecurity-threats-businesses-face-in-2026.html",
    "view": "top-10-cybersecurity-threats-businesses-face-in-2026",
    "route": "/top-10-cybersecurity-threats-businesses-face-in-2026",
    "active": "Blog",
    "title": "Top 10 Cybersecurity Threats Businesses Face in 2026 | Rynex Security",
    "description": "Discover the top cybersecurity threats businesses face in 2026, including ransomware, AI-powered attacks, phishing, insider threats, and cloud security risks. Learn how to protect your organization.",
    "cssFile": "/css/top-10-cybersecurity-threats-businesses-face-in-2026.css",
    "externalScripts": "    <script src=\"https://unpkg.com/aos@2.3.1/dist/aos.js\"></script>",
    "localScript": "    <script src=\"/js/top-10-cybersecurity-threats-businesses-face-in-2026.js\" defer></script>",
    "contactScript": ""
  }
];

const byRoute = new Map();
const byLegacyRoute = new Map();

for (const page of pages) {
  byRoute.set(page.route, page);
  byLegacyRoute.set('/' + page.file, page);
}

module.exports = { pages, byRoute, byLegacyRoute };
