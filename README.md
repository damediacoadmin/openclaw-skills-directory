# OpenClaw Skills Directory

A curated directory of the best OpenClaw skills with reviews and trust scores. Built as a static SEO and AdSense monetization site.

## 🎯 Purpose

- **SEO Play:** Rank for "OpenClaw skills", "ClawHub skills", specific skill names
- **AdSense Revenue:** Ad placements on homepage, category pages, and skill pages
- **Community Resource:** Vetted, curated directory with trust scores and reviews

## 🏗️ Stack

- **Platform:** Static HTML/CSS/JS
- **Hosting:** Cloudflare Pages
- **Content:** 3,000+ skills from ClawHub
- **Categories:** 25+ skill categories
- **Features:** Client-side search, install button, trust scores

## 📂 Structure

```
openclaw-skills-directory/
├── index.html              # Homepage with featured skills
├── search.html            # Search results page
├── sitemap.xml            # SEO sitemap
├── robots.txt             # Search engine crawler config
├── css/
│   └── style.css          # Dark theme, modern UI
├── js/
│   ├── skills-data.js     # Skills database
│   └── main.js            # Client-side functionality
├── skills/
│   └── *.html             # Individual skill pages
└── categories/
    └── *.html             # Category pages
```

## 🚀 Deployment

### Cloudflare Pages

1. **Connect Repository:**
   ```bash
   gh repo create damediacoadmin/openclaw-skills-directory --public
   git init
   git add .
   git commit -m "Initial commit - OpenClaw Skills Directory"
   git branch -M main
   git remote add origin https://github.com/damediacoadmin/openclaw-skills-directory.git
   git push -u origin main
   ```

2. **Deploy to Cloudflare Pages:**
   - Go to Cloudflare Dashboard → Pages
   - Click "Create a project"
   - Connect to GitHub repo: `damediacoadmin/openclaw-skills-directory`
   - Build settings:
     - Build command: (none - static site)
     - Build output directory: `/`
   - Deploy!

3. **Custom Domain (optional):**
   - Add a subdomain like `skills.openclaw.directory`
   - Or use a new domain

## 💰 Monetization

### AdSense Setup

1. Replace `ca-pub-XXXXXXXXXX` in HTML files with your AdSense publisher ID
2. Add ad slot IDs for:
   - Banner ads (top of pages)
   - In-feed ads (between skill listings)
   - Multiplex ads (related skills)

### Ad Placements

- **Homepage:** 2 ad units (banner + in-feed)
- **Category Pages:** 1-2 ad units
- **Skill Pages:** 1-2 ad units
- **Search Results:** 1 ad unit

## 🔍 SEO Optimization

- ✅ Semantic HTML structure
- ✅ Meta descriptions on all pages
- ✅ Open Graph tags
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ Fast loading (static site)
- ✅ Mobile responsive
- ✅ Internal linking structure

### Target Keywords

- "OpenClaw skills"
- "ClawHub skills"
- "AI agent skills"
- "[Skill name] OpenClaw" (e.g., "GitHub OpenClaw")
- "Best OpenClaw skills"
- Category-specific keywords

## 🎨 Features

### Homepage
- Hero section with search
- Featured skills (top 6)
- Browse by category (25+ categories)
- Most downloaded skills
- Stats (3,002 skills, 25+ categories)

### Search
- Client-side fuzzy search
- Search by name, description, tags, category
- Real-time results

### Skill Pages
- Full description
- Install command with copy button
- Trust score and downloads
- Features list
- Tags and category
- Related skills (TODO)

### Category Pages
- All skills in category
- Category description
- Skill count

## 📊 Data Source

Skills curated from:
- [ClawHub](https://clawhub.ai) - Official registry
- [awesome-openclaw-skills](https://github.com/VoltAgent/awesome-openclaw-skills) - 3,002 vetted skills
- Reddit community recommendations
- Security audits (excluded malicious skills)

## 🔒 Security

- Excluded 396 malicious skills identified by security researchers
- Excluded 672 crypto/finance/trading skills (spam risk)
- Excluded 1,180 spam/bot accounts
- Trust scores based on:
  - Community downloads
  - Author reputation
  - Security scans
  - Community reviews

## 🛠️ Development

### Local Testing

```bash
# Serve locally
python3 -m http.server 8000
# or
npx serve
```

Visit: `http://localhost:8000`

### Adding Skills

Edit `js/skills-data.js`:

```javascript
{
    id: "skill-slug",
    name: "Skill Name",
    slug: "skill-slug",
    description: "Description...",
    category: "Category Name",
    author: "author-name",
    downloads: 1000,
    trustScore: 85,
    tags: ["tag1", "tag2"],
    featured: false,
    installCommand: "npx clawhub@latest install skill-slug"
}
```

Then create `skills/skill-slug.html` based on the template.

## 📈 Growth Strategy

1. **Content:** Add 50-100 detailed skill pages weekly
2. **SEO:** Target long-tail keywords for each skill
3. **Backlinks:** Submit to directories, Reddit, HN
4. **Social:** Share on Twitter, LinkedIn, Discord
5. **Updates:** Keep skills database fresh with new releases

## 📝 TODO

- [ ] Generate all 3,000+ skill pages programmatically
- [ ] Add user reviews and ratings
- [ ] Screenshots/demos for popular skills
- [ ] API endpoint for skill data
- [ ] Email newsletter signup
- [ ] "Skill of the Week" feature
- [ ] Related skills recommendations
- [ ] Filter by trust score, downloads, etc.

## 🤝 Contributing

This is a curated directory. Skills must be:
- Published on ClawHub
- Security vetted
- Not spam/malicious
- Actively maintained

## 📄 License

Content: Creative Commons CC-BY-4.0
Code: MIT License

## 🔗 Links

- [ClawHub Official](https://clawhub.ai)
- [OpenClaw Docs](https://docs.openclaw.ai)
- [awesome-openclaw-skills](https://github.com/VoltAgent/awesome-openclaw-skills)
- [OpenClaw GitHub](https://github.com/openclaw)

---

Built by [DAMedia](https://github.com/damediacoadmin) | Not affiliated with OpenClaw or ClawHub
