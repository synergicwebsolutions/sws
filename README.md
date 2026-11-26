# MomoStack — Jekyll Website

Official Jekyll site for **MomoStack** (`www.momostack.com`), a custom web and software studio based in Darjeeling, India.

## Structure

- `_config.yml` — Site metadata, contact info, analytics, and Jekyll plugins (`jekyll-seo-tag`, `jekyll-sitemap`).
- `_data/` — Content data files (`navigation.yml`, `stats.yml`, `why.yml`, `services.yml`, `process.yml`, `projects.yml`, `faq.yml`).
- `_includes/` — Reusable partials (`head.html`, `header.html`, `footer.html`, `cta.html`, `analytics.html`).
- `_layouts/` — Page templates (`default.html`, `page.html`).
- `assets/css/main.css` & `assets/js/main.js` — Stylesheet and lightweight UI interactions.
- `index.html` & `404.html` — Site pages.

## Local Development

Requires Ruby and Bundler:

```bash
bundle install
bundle exec jekyll serve
```

Then open `http://localhost:4000`.
