const fs = require('fs');
const path = require('path');

const finalSkills = [
  { category: 'productivity', name: 'Apple Notes', slug: 'apple-notes', author: 'applehq', desc: 'Interact with Apple Notes on macOS for quick note-taking and organization', downloads: '6.4k', trust: 88, tags: ['productivity', 'notes', 'macos'] },
  { category: 'communication', name: 'Email Parser', slug: 'email-parser', author: 'emailpro', desc: 'Parse and extract structured data from emails automatically', downloads: '5.7k', trust: 87, tags: ['communication', 'email', 'parsing'] },
  { category: 'development', name: 'Vercel Deploy', slug: 'vercel', author: 'deploymaster', desc: 'Deploy web apps to Vercel with automatic builds and previews', downloads: '11.5k', trust: 93, tags: ['development', 'deploy', 'vercel'] },
  { category: 'development', name: 'Netlify', slug: 'netlify', author: 'jamstackpro', desc: 'Deploy and manage static sites on Netlify with forms and functions', downloads: '9.2k', trust: 91, tags: ['development', 'deploy', 'netlify'] },
  { category: 'ai', name: 'Midjourney', slug: 'midjourney', author: 'artgen', desc: 'Generate stunning AI art with Midjourney via Discord integration', downloads: '13.8k', trust: 90, tags: ['ai', 'image-generation', 'art'] },
  { category: 'ai', name: 'DALL-E', slug: 'dalle', author: 'openai', desc: 'Create images with OpenAI DALL-E 3 for creative projects', downloads: '12.6k', trust: 92, tags: ['ai', 'image-generation', 'openai'] },
  { category: 'devops', name: 'CircleCI', slug: 'circleci', author: 'cipro', desc: 'Configure and manage CircleCI pipelines for continuous integration', downloads: '7.8k', trust: 89, tags: ['devops', 'ci-cd', 'circleci'] },
  { category: 'finance', name: 'Polymarket', slug: 'polymarket-api', author: 'cryptotrader', desc: 'Trade on Polymarket prediction markets with automated strategies', downloads: '6.9k', trust: 86, tags: ['finance', 'crypto', 'prediction-markets'] },
  { category: 'security', name: 'GPG Manager', slug: 'gpg', author: 'cryptodev', desc: 'Manage GPG keys, encrypt/decrypt files, and sign commits', downloads: '6.2k', trust: 90, tags: ['security', 'encryption', 'gpg'] },
  { category: 'productivity', name: 'Evernote', slug: 'evernote', author: 'notepro', desc: 'Sync and manage Evernote notes across all your devices', downloads: '7.3k', trust: 87, tags: ['productivity', 'notes', 'sync'] }
];

const template = (skill, category) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${skill.name} - OpenClaw Skill | OpenClaw Skills Directory</title>
    <meta name="description" content="${skill.desc}">
    <meta name="keywords" content="${skill.tags.join(', ')}, OpenClaw skill">
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
                <div class="skill-badge ${skill.trust >= 90 ? 'safe' : 'trusted'}">${skill.trust >= 90 ? 'Verified' : 'Trusted'}</div>
            </div>

            <div style="background-color: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 12px; padding: 2rem; margin-bottom: 2rem;">
                <h2 style="margin-bottom: 1rem;">Install</h2>
                <div class="code-block" style="margin: 0;">
                    <code id="installCommand">npx clawhub@latest install ${skill.slug}</code>
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
                <p style="color: var(--text-secondary); line-height: 1.8;">${skill.desc}</p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
                <div style="background-color: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 12px; padding: 1.5rem; text-align: center;">
                    <div style="font-size: 2rem; font-weight: 700; color: var(--accent-primary);">${skill.downloads}</div>
                    <div style="color: var(--text-muted); font-size: 0.875rem;">Downloads</div>
                </div>
                <div style="background-color: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 12px; padding: 1.5rem; text-align: center;">
                    <div style="font-size: 2rem; font-weight: 700; color: var(--success);">${skill.trust}%</div>
                    <div style="color: var(--text-muted); font-size: 0.875rem;">Trust Score</div>
                </div>
                <div style="background-color: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 12px; padding: 1.5rem; text-align: center;">
                    <div style="font-size: 2rem; font-weight: 700; color: var(--accent-secondary);">${'⭐'.repeat(Math.floor(skill.trust/20))}</div>
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
                <a href="../categories/${category}.html" style="color: var(--accent-primary); text-decoration: none; font-weight: 600;">
                    ${getCategoryIcon(category)} ${getCategoryName(category)}
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

function getCategoryIcon(cat) {
  const icons = {
    productivity: '📊',
    development: '💻',
    security: '🔒',
    communication: '💬',
    automation: '⚡',
    'social-media': '📱',
    finance: '💰',
    devops: '🔧',
    ai: '🤖'
  };
  return icons[cat] || '📦';
}

function getCategoryName(cat) {
  const names = {
    productivity: 'Productivity',
    development: 'Development',
    security: 'Security',
    communication: 'Communication',
    automation: 'Automation',
    'social-media': 'Social Media',
    finance: 'Finance',
    devops: 'DevOps & Cloud',
    ai: 'AI & LLMs'
  };
  return names[cat] || cat;
}

let count = 0;
for (const skill of finalSkills) {
  const filename = `${skill.slug}.html`;
  const filepath = path.join(__dirname, 'skills', filename);
  const content = template(skill, skill.category);
  fs.writeFileSync(filepath, content);
  count++;
  console.log(`Created: skills/${filename}`);
}

console.log(`\nAdditional skills created: ${count}`);
console.log(`Grand total: ${91 + count}`);
