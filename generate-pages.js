#!/usr/bin/env node

/**
 * Skill Page Generator
 * 
 * Generates HTML pages for all skills in skills-data.js
 * Run: node generate-pages.js
 */

const fs = require('fs');
const path = require('path');

// Load skills data
const skillsDataPath = path.join(__dirname, 'js', 'skills-data.js');
const skillsDataContent = fs.readFileSync(skillsDataPath, 'utf-8');

// Extract skillsData array (simple regex - works for our format)
const skillsMatch = skillsDataContent.match(/const skillsData = \[([\s\S]*?)\];/);
if (!skillsMatch) {
    console.error('Could not parse skills data');
    process.exit(1);
}

// Parse skills (this is a simple eval - in production use a proper parser)
const skillsData = eval('[' + skillsMatch[1] + ']');

// Generate skill page template
function generateSkillPage(skill) {
    const badgeClass = skill.trustScore >= 90 ? 'safe' : skill.trustScore >= 80 ? 'warning' : '';
    const badge = skill.trustScore >= 90 ? 'Verified' : skill.trustScore >= 80 ? 'Safe' : 'Review';
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${skill.name} - OpenClaw Skill | OpenClaw Skills Directory</title>
    <meta name="description" content="${skill.description}">
    <meta name="keywords" content="${skill.name}, OpenClaw skill, ${skill.tags.join(', ')}">
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
        <div style="max-width: 800px; margin: 0 auto;">
            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                <a href="/" style="color: var(--text-muted); text-decoration: none;">Home</a>
                <span style="color: var(--text-muted);">/</span>
                <a href="/#categories" style="color: var(--text-muted); text-decoration: none;">Skills</a>
                <span style="color: var(--text-muted);">/</span>
                <span style="color: var(--text-primary);">${skill.name}</span>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 2rem;">
                <div>
                    <h1 style="font-size: 2.5rem; margin-bottom: 0.5rem;">${skill.name}</h1>
                    <p style="color: var(--text-secondary);">by ${skill.author}</p>
                </div>
                <div class="skill-badge ${badgeClass}">${badge}</div>
            </div>

            <div style="background-color: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 12px; padding: 2rem; margin-bottom: 2rem;">
                <h2 style="margin-bottom: 1rem;">Install</h2>
                <div class="code-block" style="margin: 0;">
                    <code id="installCommand">${skill.installCommand}</code>
                </div>
                <button class="install-button" style="margin-top: 1rem;" onclick="copyCommand()">
                    📋 Copy Install Command
                </button>
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

            <div style="background-color: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 12px; padding: 2rem; margin-bottom: 2rem;">
                <h2 style="margin-bottom: 1rem;">Description</h2>
                <p style="color: var(--text-secondary); line-height: 1.8;">${skill.description}</p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
                <div style="background-color: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 12px; padding: 1.5rem; text-align: center;">
                    <div style="font-size: 2rem; font-weight: 700; color: var(--accent-primary);">${formatNumber(skill.downloads)}</div>
                    <div style="color: var(--text-muted); font-size: 0.875rem;">Downloads</div>
                </div>
                <div style="background-color: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 12px; padding: 1.5rem; text-align: center;">
                    <div style="font-size: 2rem; font-weight: 700; color: var(--success);">${skill.trustScore}%</div>
                    <div style="color: var(--text-muted); font-size: 0.875rem;">Trust Score</div>
                </div>
                <div style="background-color: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 12px; padding: 1.5rem; text-align: center;">
                    <div style="font-size: 2rem; font-weight: 700; color: var(--accent-secondary);">⭐⭐⭐⭐⭐</div>
                    <div style="color: var(--text-muted); font-size: 0.875rem;">Community Rating</div>
                </div>
            </div>

            <div style="background-color: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 12px; padding: 2rem; margin-bottom: 2rem;">
                <h2 style="margin-bottom: 1rem;">Tags</h2>
                <div class="skill-tags">
                    ${skill.tags.map(tag => `<span class="tag">${tag}</span>`).join('\n                    ')}
                </div>
            </div>

            <div style="background-color: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 12px; padding: 2rem;">
                <h2 style="margin-bottom: 1rem;">Category</h2>
                <a href="../categories/${getCategorySlug(skill.category)}.html" style="color: var(--accent-primary); text-decoration: none; font-weight: 600;">
                    ${getCategoryIcon(skill.category)} ${skill.category}
                </a>
            </div>
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

    <script>
        function copyCommand() {
            const command = document.getElementById('installCommand').textContent;
            navigator.clipboard.writeText(command).then(() => {
                const button = event.target;
                const originalText = button.textContent;
                button.textContent = '✅ Copied!';
                button.style.backgroundColor = '#10b981';
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.backgroundColor = '';
                }, 2000);
            });
        }
    </script>
</body>
</html>`;
}

// Helper functions
function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
}

function getCategorySlug(category) {
    return category.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

function getCategoryIcon(category) {
    const icons = {
        'Git & GitHub': '🔀',
        'Communication': '💬',
        'Productivity & Tasks': '✅',
        'Browser & Automation': '🤖',
        'Notes & PKM': '📝',
        'Self-Hosted & Automation': '🔧',
        'Web & Frontend Development': '🎨',
        'Coding Agents & IDEs': '💻',
        'Moltbook': '🦞',
        'DevOps & Cloud': '☁️',
        'Search & Research': '🔍',
        'Smart Home & IoT': '🏠',
        'Speech & Transcription': '🎤',
        'Finance': '💰',
        'Calendar & Scheduling': '📅',
        'Social Media': '📱'
    };
    return icons[category] || '📦';
}

// Generate all skill pages
console.log('Generating skill pages...');
const skillsDir = path.join(__dirname, 'skills');

if (!fs.existsSync(skillsDir)) {
    fs.mkdirSync(skillsDir, { recursive: true });
}

let generated = 0;
for (const skill of skillsData) {
    const filename = `${skill.slug}.html`;
    const filepath = path.join(skillsDir, filename);
    const html = generateSkillPage(skill);
    
    fs.writeFileSync(filepath, html);
    generated++;
    console.log(`✅ Generated: ${filename}`);
}

console.log(`\n🎉 Generated ${generated} skill pages!`);
console.log(`📂 Location: ${skillsDir}`);
