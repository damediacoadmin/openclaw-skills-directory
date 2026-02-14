#!/usr/bin/env node

/**
 * Category Page Generator
 * 
 * Generates HTML category pages
 * Run: node generate-categories.js
 */

const fs = require('fs');
const path = require('path');

// Load data
const skillsDataPath = path.join(__dirname, 'js', 'skills-data.js');
const skillsDataContent = fs.readFileSync(skillsDataPath, 'utf-8');

// Extract categories
const categoriesMatch = skillsDataContent.match(/const categories = \[([\s\S]*?)\];/);
if (!categoriesMatch) {
    console.error('Could not parse categories data');
    process.exit(1);
}

const categories = eval('[' + categoriesMatch[1] + ']');

// Generate category page template
function generateCategoryPage(category) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${category.name} Skills | OpenClaw Skills Directory</title>
    <meta name="description" content="${category.count} ${category.name} skills for OpenClaw. Install the best AI agent skills.">
    <link rel="stylesheet" href="../css/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- AdSense -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX" crossorigin="anonymous"></script>
</head>
<body>
    <nav class="navbar">
        <div class="container">
            <a href="/" class="logo">
                <span class="logo-icon">🦞</span>
                <span class="logo-text">OpenClaw Skills</span>
            </a>
            <div class="nav-links">
                <a href="/">Home</a>
                <a href="/#categories">Categories</a>
                <a href="https://clawhub.ai" target="_blank">ClawHub</a>
            </div>
        </div>
    </nav>

    <div class="container" style="padding: 3rem 0;">
        <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem;">
            <a href="/" style="color: var(--text-muted); text-decoration: none;">Home</a>
            <span style="color: var(--text-muted);">/</span>
            <a href="/#categories" style="color: var(--text-muted); text-decoration: none;">Categories</a>
            <span style="color: var(--text-muted);">/</span>
            <span style="color: var(--text-primary);">${category.name}</span>
        </div>

        <div style="text-align: center; margin-bottom: 3rem;">
            <div style="font-size: 4rem; margin-bottom: 1rem;">${category.icon}</div>
            <h1 style="font-size: 2.5rem; margin-bottom: 0.5rem;">${category.name}</h1>
            <p style="color: var(--text-secondary);">${category.count} skills available</p>
        </div>

        <!-- AdSense -->
        <div class="ad-container">
            <ins class="adsbygoogle"
                 style="display:block"
                 data-ad-format="fluid"
                 data-ad-layout-key="-fb+5w+4e-db+86"
                 data-ad-client="ca-pub-XXXXXXXXXX"
                 data-ad-slot="XXXXXXXXXX"></ins>
            <script>
                 (adsbygoogle = window.adsbygoogle || []).push({});
            </script>
        </div>

        <div class="skills-grid" id="categorySkills"></div>
        
        <div id="noSkills" style="display: none; text-align: center; padding: 4rem 0;">
            <h2 style="color: var(--text-secondary);">No skills in this category yet</h2>
            <p style="color: var(--text-muted);">Check back soon for updates!</p>
        </div>
    </div>

    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>OpenClaw Skills Directory</h3>
                    <p>Curated directory of the best OpenClaw skills with reviews and trust scores.</p>
                </div>
                <div class="footer-section">
                    <h3>Resources</h3>
                    <a href="https://clawhub.ai">ClawHub Official</a>
                    <a href="https://docs.openclaw.ai">Documentation</a>
                    <a href="https://github.com/openclaw/skills">GitHub</a>
                </div>
                <div class="footer-section">
                    <h3>Legal</h3>
                    <a href="/privacy.html">Privacy Policy</a>
                    <a href="/terms.html">Terms of Service</a>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2026 OpenClaw Skills Directory. Not affiliated with OpenClaw or ClawHub.</p>
            </div>
        </div>
    </footer>

    <script src="../js/skills-data.js"></script>
    <script src="../js/main.js"></script>
    <script>
        // Filter skills by category
        const categorySkills = skillsData.filter(skill => skill.category === '${category.name}');
        const container = document.getElementById('categorySkills');
        const noSkills = document.getElementById('noSkills');
        
        if (categorySkills.length > 0) {
            container.innerHTML = categorySkills.map(skill => createSkillCard(skill)).join('');
        } else {
            noSkills.style.display = 'block';
        }
    </script>
</body>
</html>`;
}

// Generate all category pages
console.log('Generating category pages...');
const categoriesDir = path.join(__dirname, 'categories');

if (!fs.existsSync(categoriesDir)) {
    fs.mkdirSync(categoriesDir, { recursive: true });
}

let generated = 0;
for (const category of categories) {
    const filename = `${category.slug}.html`;
    const filepath = path.join(categoriesDir, filename);
    const html = generateCategoryPage(category);
    
    fs.writeFileSync(filepath, html);
    generated++;
    console.log(`✅ Generated: ${filename}`);
}

console.log(`\n🎉 Generated ${generated} category pages!`);
console.log(`📂 Location: ${categoriesDir}`);
