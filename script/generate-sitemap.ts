import fs from 'fs';
import path from 'path';

const DOMAIN = 'https://www.kolhapurstargazing.in';
const ROUTES = [
    { path: '/', priority: '1.0', changefreq: 'weekly' },
    { path: '/about', priority: '0.8', changefreq: 'monthly' },
    { path: '/events', priority: '0.9', changefreq: 'daily' },
    { path: '/contact', priority: '0.7', changefreq: 'monthly' },
    { path: '/privacy', priority: '0.3', changefreq: 'yearly' },
    { path: '/terms', priority: '0.3', changefreq: 'yearly' },
    { path: '/conduct', priority: '0.3', changefreq: 'yearly' },
    { path: '/kolhapur-stargazing', priority: '0.9', changefreq: 'monthly' },
    { path: '/astronomy-in-kolhapur', priority: '0.9', changefreq: 'monthly' },
    { path: '/night-sky-observation-kolhapur', priority: '0.9', changefreq: 'monthly' },
];

function generateSitemap() {
    const lastmod = new Date().toISOString().split('T')[0];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map(route => `  <url>
    <loc>${DOMAIN}${route.path === '/' ? '' : route.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    const publicSitemapPath = path.resolve(process.cwd(), 'client/public/sitemap.xml');
    fs.writeFileSync(publicSitemapPath, xml);
    console.log(`Sitemap generated at ${publicSitemapPath}`);
}

generateSitemap();
