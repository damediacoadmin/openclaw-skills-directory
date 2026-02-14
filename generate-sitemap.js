const fs = require('fs');
const path = require('path');

const baseUrl = 'https://bestclawskills.com';
const today = new Date().toISOString().split('T')[0];

// Get all skill HTML files
const skillsDir = path.join(__dirname, 'skills');
const skillFiles = fs.readdirSync(skillsDir).filter(f => f.endsWith('.html'));

// Get all category HTML files
const categoriesDir = path.join(__dirname, 'categories');
const categoryFiles = fs.readdirSync(categoriesDir).filter(f => f.endsWith('.html'));

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>${baseUrl}/</loc>
        <lastmod>${today}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>${baseUrl}/search.html</loc>
        <lastmod>${today}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>${baseUrl}/privacy.html</loc>
        <lastmod>${today}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.3</priority>
    </url>
    <url>
        <loc>${baseUrl}/terms.html</loc>
        <lastmod>${today}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.3</priority>
    </url>
    
    <!-- Category Pages -->
`;

// Add category pages
categoryFiles.sort().forEach(file => {
    sitemap += `    <url>
        <loc>${baseUrl}/categories/${file}</loc>
        <lastmod>${today}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>
`;
});

sitemap += `    
    <!-- Skill Pages -->
`;

// Add skill pages
skillFiles.sort().forEach(file => {
    sitemap += `    <url>
        <loc>${baseUrl}/skills/${file}</loc>
        <lastmod>${today}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
    </url>
`;
});

sitemap += `</urlset>`;

fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemap);
console.log(`✅ Sitemap generated with ${skillFiles.length} skills and ${categoryFiles.length} categories`);
console.log(`Total URLs: ${skillFiles.length + categoryFiles.length + 4}`);
