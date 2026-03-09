# AJ's Data & AI Lab — Site Structure

## Folder Layout

```
site/
├── index.html                          ← Homepage (article feed + sidebar)
├── assets/
│   ├── css/
│   │   └── arnay-joshi-article.css     ← Shared article stylesheet
│   └── img/
│       ├── ajs-labs-logo-web.png       ← ★ ADD YOUR LOGO HERE
│       └── arnay-photo.jpg             ← ★ ADD YOUR HEADSHOT HERE
│
├── practitioner-series/                ← Deep dives (existing template)
│   ├── medallion-architecture-innovation-or-rebranding.html  ← Live article
│   └── [your-article-slug].html
│
├── quick-bytes/                        ← 3 key pointers per topic
│   ├── _TEMPLATE.html                  ← ★ Copy this to start a new post
│   └── [your-article-slug].html
│
├── leadership-lens/                    ← HBR abstracts + commentary
│   ├── _TEMPLATE.html                  ← ★ Copy this to start a new post
│   └── [your-article-slug].html
│
├── leading-with-ai/                    ← Curated + commentary
│   ├── _TEMPLATE.html                  ← ★ Copy this to start a new post
│   └── [your-article-slug].html
│
└── ips-and-products/                   ← Lab showcase
    ├── _TEMPLATE.html                  ← ★ Copy this to start a new post
    └── [your-article-slug].html
```

## Pillar Names (Renamed)

| Old Name                              | New Name                         | Color Code    |
|---------------------------------------|----------------------------------|---------------|
| Enterprise Data & AI Strategy         | **Data & AI Strategy**           | #0691e7 blue  |
| Innovation & Platform Products        | **Products & Platform Innovation** | #32dad6 cyan |
| Delivery & Governance Excellence      | **Delivery & Data Governance**   | #4a6fd4 indigo|
| Leadership, Culture & Business Alignment | **Leadership & Business Impact** | #73bf50 lime |

## Content Streams → Folder Mapping

| Stream                  | Folder              | Format                                    |
|-------------------------|----------------------|-------------------------------------------|
| Practitioner Series     | `practitioner-series/` | Long-form deep dive with TOC sidebar     |
| Quick Bytes             | `quick-bytes/`         | Exactly 3 numbered pointers + takeaway   |
| Leadership Lens         | `leadership-lens/`     | Source card → Agree/Disagree/Gap → Verdict|
| Leading with AI         | `leading-with-ai/`     | Curated sources → My Take → Signal/Noise |
| IPs & Products          | `ips-and-products/`    | Product overview → Architecture → Lessons |

## How to Add a New Article

1. **Copy** the `_TEMPLATE.html` from the appropriate stream folder
2. **Rename** it with a URL-friendly slug: `my-article-title.html`
3. **Replace** all `[BRACKETED PLACEHOLDERS]` with your content
4. **Add a card** to `index.html` in the `<main>` section (copy an existing card)
5. **Set** `data-stream` and `data-pillar` attributes on the card for filtering
6. **Commit & push** to GitHub Pages

## Assets to Add

- `assets/img/ajs-labs-logo-web.png` — Your AJ's Data & AI Lab logo
- `assets/img/arnay-photo.jpg` — Your headshot (used in sidebar)
- Update LinkedIn URL in nav "Connect" button: currently points to `linkedin.com/in/arnayjoshi`

## CSS Reference

All article pages share `assets/css/arnay-joshi-article.css` which provides:
- Nav, hero, sidebar/TOC, typography, callouts, tables
- Layer cards, anti-pattern cards, verdict boxes, recommendations
- All colors derived from the AJ's Data & AI Lab logo palette
- Print stylesheet included

Stream-specific styles are embedded in each template's `<style>` block.
