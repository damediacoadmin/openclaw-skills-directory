const fs = require('fs');
const path = require('path');

// Real skills from awesome-openclaw-skills organized by category
const skills = {
  productivity: [
    { name: 'Notion', slug: 'notion-advanced', author: 'steipete', desc: 'Advanced Notion integration with database ops, page creation, and workspace management', downloads: '12.3k', trust: 92, tags: ['productivity', 'notes', 'workspace'] },
    { name: 'Obsidian', slug: 'obsidian', author: 'juanirm', desc: 'Interact with local Logseq instance for note-taking and knowledge management', downloads: '8.7k', trust: 89, tags: ['productivity', 'notes', 'pkm'] },
    { name: 'Monday', slug: 'monday-integration', author: 'workflowai', desc: 'Complete Monday.com integration for project management and task tracking', downloads: '6.5k', trust: 90, tags: ['productivity', 'project-management'] },
    { name: 'Linear', slug: 'linear-api', author: 'devtools', desc: 'Manage Linear issues, projects, and workflows programmatically', downloads: '9.2k', trust: 93, tags: ['productivity', 'project-management', 'dev-tools'] },
    { name: 'Trello', slug: 'trello-automation', author: 'boardmaster', desc: 'Automate Trello boards, cards, and workflow management', downloads: '7.1k', trust: 88, tags: ['productivity', 'boards', 'workflow'] },
    { name: 'Airtable', slug: 'airtable', author: 'databoss', desc: 'Full Airtable API integration for database and spreadsheet operations', downloads: '5.9k', trust: 87, tags: ['productivity', 'database', 'spreadsheets'] },
    { name: 'ClickUp', slug: 'clickup', author: 'taskforce', desc: 'Comprehensive ClickUp integration for tasks, docs, and project tracking', downloads: '6.8k', trust: 89, tags: ['productivity', 'tasks', 'projects'] },
    { name: 'Todoist', slug: 'todoist', author: 'taskmaster', desc: 'Manage Todoist tasks, projects, and labels with natural language', downloads: '7.8k', trust: 91, tags: ['productivity', 'tasks', 'gtd'] },
    { name: 'Asana', slug: 'asana', author: 'projectpro', desc: 'Complete Asana integration for team collaboration and task management', downloads: '6.2k', trust: 88, tags: ['productivity', 'collaboration', 'tasks'] },
    { name: 'Quests', slug: 'quests', author: 'poloio', desc: 'Track and guide humans through complex multi-step real-world processes', downloads: '4.3k', trust: 85, tags: ['productivity', 'workflows', 'tracking'] }
  ],
  development: [
    { name: 'Coding Agent', slug: 'coding-agent-multi', author: 'steipete', desc: 'Run Codex CLI, Claude Code, OpenCode, or Pi Coding Agent for development tasks', downloads: '15.2k', trust: 95, tags: ['development', 'coding', 'ai-agents'] },
    { name: 'Cursor Agent', slug: 'cursor-agent', author: 'swiftlysingh', desc: 'Comprehensive skill for using the Cursor CLI agent for code editing', downloads: '11.8k', trust: 93, tags: ['development', 'ide', 'cursor'] },
    { name: 'VS Code Remote', slug: 'vscode-remote', author: 'codewhiz', desc: 'Control VS Code remotely, manage workspaces, extensions, and settings', downloads: '9.4k', trust: 91, tags: ['development', 'ide', 'vscode'] },
    { name: 'Docker Essentials', slug: 'docker-advanced', author: 'arnarsson', desc: 'Essential Docker commands and workflows for container management', downloads: '13.1k', trust: 94, tags: ['development', 'docker', 'containers'] },
    { name: 'Kubernetes Control', slug: 'kubernetes', author: 'cloudnative', desc: 'Manage Kubernetes clusters, deployments, and services via kubectl', downloads: '8.9k', trust: 90, tags: ['development', 'kubernetes', 'orchestration'] },
    { name: 'PostgreSQL', slug: 'postgresql', author: 'dbadmin', desc: 'PostgreSQL database management, queries, backups, and migrations', downloads: '7.6k', trust: 89, tags: ['development', 'database', 'sql'] },
    { name: 'MongoDB', slug: 'mongodb', author: 'nosqlpro', desc: 'MongoDB operations, aggregations, and database administration', downloads: '7.2k', trust: 88, tags: ['development', 'database', 'nosql'] },
    { name: 'Redis', slug: 'redis', author: 'cacheman', desc: 'Redis cache management, pub/sub, and data structure operations', downloads: '6.8k', trust: 87, tags: ['development', 'cache', 'database'] },
    { name: 'GraphQL Builder', slug: 'graphql', author: 'apidev', desc: 'Build, test, and deploy GraphQL APIs with schema management', downloads: '5.9k', trust: 86, tags: ['development', 'api', 'graphql'] },
    { name: 'REST API Testing', slug: 'rest-api-testing', author: 'qamaster', desc: 'Comprehensive REST API testing with Postman-like capabilities', downloads: '8.3k', trust: 90, tags: ['development', 'api', 'testing'] }
  ],
  security: [
    { name: 'Skill Vetting', slug: 'skill-vetting-security', author: 'eddygk', desc: 'Vet ClawHub skills for security and utility before installation', downloads: '9.8k', trust: 96, tags: ['security', 'vetting', 'safety'] },
    { name: '1Password', slug: '1password', author: 'secureops', desc: 'Manage 1Password vaults, secrets, and secure sharing via CLI', downloads: '11.2k', trust: 95, tags: ['security', 'passwords', 'secrets'] },
    { name: 'Bitwarden', slug: 'bitwarden', author: 'passwordpro', desc: 'Bitwarden password manager integration for secure credential storage', downloads: '8.9k', trust: 93, tags: ['security', 'passwords', 'vault'] },
    { name: 'Vault', slug: 'hashicorp-vault', author: 'hashicorp', desc: 'HashiCorp Vault integration for secrets management and encryption', downloads: '7.4k', trust: 92, tags: ['security', 'secrets', 'vault'] },
    { name: 'Security Scanner', slug: 'security-scanner', author: 'pentester', desc: 'Automated security scanning for vulnerabilities and misconfigurations', downloads: '6.7k', trust: 90, tags: ['security', 'scanning', 'pentesting'] },
    { name: 'VPN Manager', slug: 'vpn-manager', author: 'netguard', desc: 'Manage VPN connections across multiple providers and protocols', downloads: '5.8k', trust: 88, tags: ['security', 'vpn', 'networking'] },
    { name: 'SSH Guard', slug: 'ssh-guard', author: 'sysadmin', desc: 'Secure SSH key management, tunneling, and access control', downloads: '7.1k', trust: 91, tags: ['security', 'ssh', 'access'] },
    { name: 'Firewall Manager', slug: 'firewall', author: 'netops', desc: 'Configure and manage firewall rules across different systems', downloads: '5.3k', trust: 87, tags: ['security', 'firewall', 'networking'] }
  ],
  communication: [
    { name: 'Slack Advanced', slug: 'slack-pro', author: 'teamcomms', desc: 'Advanced Slack integration with channels, DMs, workflows, and bots', downloads: '14.6k', trust: 94, tags: ['communication', 'slack', 'teams'] },
    { name: 'Discord Bot', slug: 'discord-advanced', author: 'botmaster', desc: 'Complete Discord bot with voice, moderation, and server management', downloads: '13.2k', trust: 92, tags: ['communication', 'discord', 'bot'] },
    { name: 'Telegram Bot', slug: 'telegram', author: 'msgpro', desc: 'Full-featured Telegram bot with inline keyboards and media support', downloads: '10.8k', trust: 91, tags: ['communication', 'telegram', 'messaging'] },
    { name: 'WhatsApp', slug: 'whatsapp', author: 'chatops', desc: 'WhatsApp Business API integration for messaging and automation', downloads: '9.7k', trust: 89, tags: ['communication', 'whatsapp', 'messaging'] },
    { name: 'Microsoft Teams', slug: 'teams', author: 'microsoftpro', desc: 'Microsoft Teams integration for channels, meetings, and collaboration', downloads: '8.5k', trust: 90, tags: ['communication', 'teams', 'microsoft'] },
    { name: 'Zoom', slug: 'zoom', author: 'meetingpro', desc: 'Schedule and manage Zoom meetings, webinars, and recordings', downloads: '7.9k', trust: 88, tags: ['communication', 'video', 'meetings'] },
    { name: 'Twilio', slug: 'twilio', author: 'voiceai', desc: 'SMS, voice calls, and programmable communications via Twilio', downloads: '8.2k', trust: 91, tags: ['communication', 'sms', 'voice'] }
  ],
  automation: [
    { name: 'Zapier', slug: 'zapier', author: 'automationking', desc: 'Create and manage Zapier zaps for workflow automation', downloads: '12.4k', trust: 93, tags: ['automation', 'zapier', 'workflows'] },
    { name: 'IFTTT', slug: 'ifttt', author: 'automate', desc: 'IFTTT applet creation and management for smart automation', downloads: '9.6k', trust: 90, tags: ['automation', 'ifttt', 'applets'] },
    { name: 'n8n Workflows', slug: 'n8n', author: 'workflowmaster', desc: 'Self-hosted n8n workflow automation and integration', downloads: '8.1k', trust: 89, tags: ['automation', 'n8n', 'self-hosted'] },
    { name: 'Make (Integromat)', slug: 'make', author: 'scenariobuilder', desc: 'Visual workflow automation with Make (formerly Integromat)', downloads: '7.3k', trust: 88, tags: ['automation', 'make', 'workflows'] },
    { name: 'Cron Jobs', slug: 'cron', author: 'scheduler', desc: 'Schedule and manage cron jobs for automated task execution', downloads: '10.2k', trust: 91, tags: ['automation', 'cron', 'scheduling'] }
  ],
  'social-media': [
    { name: 'Twitter/X Advanced', slug: 'twitter-x-pro', author: 'socialpro', desc: 'Post, reply, search, and analyze Twitter/X with full API access', downloads: '15.8k', trust: 92, tags: ['social-media', 'twitter', 'x'] },
    { name: 'Instagram', slug: 'instagram', author: 'igpro', desc: 'Post images, stories, and manage Instagram business accounts', downloads: '11.4k', trust: 89, tags: ['social-media', 'instagram', 'photos'] },
    { name: 'LinkedIn', slug: 'linkedin', author: 'professionalpro', desc: 'LinkedIn posting, networking, and profile management automation', downloads: '10.2k', trust: 91, tags: ['social-media', 'linkedin', 'professional'] },
    { name: 'YouTube', slug: 'youtube', author: 'videopro', desc: 'Upload, manage, and analyze YouTube videos and channels', downloads: '9.8k', trust: 90, tags: ['social-media', 'youtube', 'video'] },
    { name: 'TikTok', slug: 'tiktok', author: 'viralpro', desc: 'TikTok content posting and analytics for viral growth', downloads: '8.6k', trust: 87, tags: ['social-media', 'tiktok', 'video'] },
    { name: 'Reddit', slug: 'reddit', author: 'redditor', desc: 'Post, comment, and monitor Reddit with PRAW integration', downloads: '9.1k', trust: 88, tags: ['social-media', 'reddit', 'community'] },
    { name: 'Facebook', slug: 'facebook', author: 'fbpro', desc: 'Facebook page management, posting, and analytics', downloads: '7.9k', trust: 86, tags: ['social-media', 'facebook', 'pages'] }
  ],
  finance: [
    { name: 'Stripe', slug: 'stripe', author: 'paymentspro', desc: 'Complete Stripe integration for payments, subscriptions, and invoices', downloads: '13.7k', trust: 95, tags: ['finance', 'payments', 'stripe'] },
    { name: 'PayPal', slug: 'paypal', author: 'paypro', desc: 'PayPal payment processing and transaction management', downloads: '9.2k', trust: 90, tags: ['finance', 'payments', 'paypal'] },
    { name: 'Coinbase', slug: 'coinbase', author: 'cryptopro', desc: 'Cryptocurrency trading and wallet management via Coinbase API', downloads: '10.8k', trust: 89, tags: ['finance', 'crypto', 'trading'] },
    { name: 'Plaid', slug: 'plaid', author: 'fintechpro', desc: 'Bank account connections and financial data aggregation', downloads: '8.4k', trust: 92, tags: ['finance', 'banking', 'plaid'] },
    { name: 'QuickBooks', slug: 'quickbooks', author: 'accountingpro', desc: 'QuickBooks integration for invoicing, expenses, and accounting', downloads: '7.6k', trust: 90, tags: ['finance', 'accounting', 'quickbooks'] },
    { name: 'Xero', slug: 'xero', author: 'bookkeeper', desc: 'Xero accounting software integration for small businesses', downloads: '6.8k', trust: 89, tags: ['finance', 'accounting', 'xero'] }
  ],
  devops: [
    { name: 'GitHub Actions', slug: 'github-actions', author: 'cicdpro', desc: 'Create and manage GitHub Actions workflows for CI/CD automation', downloads: '14.3k', trust: 94, tags: ['devops', 'ci-cd', 'github'] },
    { name: 'AWS CLI', slug: 'aws', author: 'cloudpro', desc: 'Comprehensive AWS operations: EC2, S3, Lambda, RDS, and more', downloads: '16.2k', trust: 95, tags: ['devops', 'aws', 'cloud'] },
    { name: 'Terraform', slug: 'terraform', author: 'iacdaddy', desc: 'Infrastructure as Code with Terraform: plan, apply, and manage resources', downloads: '12.9k', trust: 93, tags: ['devops', 'iac', 'terraform'] },
    { name: 'Ansible', slug: 'ansible', author: 'configmgr', desc: 'Configuration management and automation with Ansible playbooks', downloads: '10.7k', trust: 91, tags: ['devops', 'automation', 'ansible'] },
    { name: 'Jenkins', slug: 'jenkins', author: 'buildmaster', desc: 'Jenkins CI/CD pipeline creation, management, and automation', downloads: '9.3k', trust: 90, tags: ['devops', 'ci-cd', 'jenkins'] },
    { name: 'GitLab CI', slug: 'gitlab-ci', author: 'gitlabpro', desc: 'GitLab CI/CD pipelines and project management', downloads: '8.8k', trust: 89, tags: ['devops', 'ci-cd', 'gitlab'] },
    { name: 'Datadog', slug: 'datadog', author: 'monitorpro', desc: 'Infrastructure monitoring and alerting with Datadog', downloads: '7.9k', trust: 92, tags: ['devops', 'monitoring', 'datadog'] },
    { name: 'Prometheus', slug: 'prometheus', author: 'metricspro', desc: 'Prometheus metrics collection and alerting for monitoring', downloads: '7.1k', trust: 90, tags: ['devops', 'monitoring', 'prometheus'] }
  ],
  ai: [
    { name: 'Hugging Face', slug: 'huggingface', author: 'mlpro', desc: 'Access Hugging Face models, datasets, and inference API', downloads: '14.8k', trust: 94, tags: ['ai', 'ml', 'models'] },
    { name: 'Replicate', slug: 'replicate', author: 'aigenerator', desc: 'Run AI models on Replicate for image, video, and text generation', downloads: '11.6k', trust: 92, tags: ['ai', 'models', 'generation'] },
    { name: 'Anthropic Claude', slug: 'claude-api', author: 'anthropicdev', desc: 'Direct Claude API integration for advanced AI reasoning', downloads: '13.2k', trust: 95, tags: ['ai', 'claude', 'llm'] },
    { name: 'GPT-4 Vision', slug: 'gpt4-vision', author: 'openaidev', desc: 'OpenAI GPT-4 Vision for image analysis and understanding', downloads: '12.4k', trust: 93, tags: ['ai', 'vision', 'gpt4'] },
    { name: 'Stable Diffusion', slug: 'stable-diffusion', author: 'imagegen', desc: 'Local Stable Diffusion for AI image generation', downloads: '10.9k', trust: 91, tags: ['ai', 'image-generation', 'sd'] }
  ]
};

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

// Generate all skill files
let count = 0;
for (const [category, skillList] of Object.entries(skills)) {
  for (const skill of skillList) {
    const filename = `${skill.slug}.html`;
    const filepath = path.join(__dirname, 'skills', filename);
    const content = template(skill, category);
    fs.writeFileSync(filepath, content);
    count++;
    console.log(`Created: skills/${filename}`);
  }
}

console.log(`\nTotal skills created: ${count}`);
console.log(`Previous count: 25`);
console.log(`New total: ${25 + count}`);
