// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    renderFeaturedSkills();
    renderCategories();
    renderPopularSkills();
    setupSearch();
});

// Render featured skills
function renderFeaturedSkills() {
    const container = document.getElementById('featuredSkills');
    const featured = skillsData.filter(skill => skill.featured).slice(0, 6);
    
    container.innerHTML = featured.map(skill => createSkillCard(skill)).join('');
}

// Render popular skills (most downloads)
function renderPopularSkills() {
    const container = document.getElementById('popularSkills');
    const popular = [...skillsData]
        .sort((a, b) => b.downloads - a.downloads)
        .slice(0, 6);
    
    container.innerHTML = popular.map(skill => createSkillCard(skill)).join('');
}

// Render categories
function renderCategories() {
    const container = document.getElementById('categoriesGrid');
    
    container.innerHTML = categories.map(category => `
        <a href="categories/${category.slug}.html" class="category-card">
            <div class="category-icon">${category.icon}</div>
            <div class="category-name">${category.name}</div>
            <div class="category-count">${category.count} skills</div>
        </a>
    `).join('');
}

// Create skill card HTML
function createSkillCard(skill) {
    const badgeClass = skill.trustScore >= 90 ? 'safe' : skill.trustScore >= 80 ? 'warning' : '';
    const badge = skill.trustScore >= 90 ? 'Verified' : skill.trustScore >= 80 ? 'Safe' : 'Review';
    
    return `
        <a href="skills/${skill.slug}.html" class="skill-card">
            <div class="skill-header">
                <div class="skill-name">${skill.name}</div>
                <div class="skill-badge ${badgeClass}">${badge}</div>
            </div>
            <div class="skill-description">${skill.description}</div>
            <div class="skill-meta">
                <span>⬇️ ${formatNumber(skill.downloads)}</span>
                <span>🛡️ ${skill.trustScore}%</span>
                <span>👤 ${skill.author}</span>
            </div>
            <div class="skill-tags">
                ${skill.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <button class="install-button" onclick="copyInstallCommand(event, '${skill.installCommand}')">
                📋 Copy Install Command
            </button>
        </a>
    `;
}

// Setup search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            searchSkills();
        }
    });
}

// Search skills
function searchSkills() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    
    if (!query) return;
    
    // Redirect to search results page
    window.location.href = `search.html?q=${encodeURIComponent(query)}`;
}

// Copy install command
function copyInstallCommand(event, command) {
    event.preventDefault();
    event.stopPropagation();
    
    navigator.clipboard.writeText(command).then(() => {
        const button = event.target;
        const originalText = button.textContent;
        button.textContent = '✅ Copied!';
        button.style.backgroundColor = '#10b981';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = '';
        }, 2000);
    }).catch(err => {
        alert('Failed to copy command. Please copy manually: ' + command);
    });
}

// Format number
function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
}

// Export for use in other pages
if (typeof window !== 'undefined') {
    window.skillsData = skillsData;
    window.categories = categories;
    window.createSkillCard = createSkillCard;
    window.copyInstallCommand = copyInstallCommand;
    window.formatNumber = formatNumber;
}
