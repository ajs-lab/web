/* All articles — used by root index.html */
var ARTICLES = [
  /* ── Practitioner Series ── */
  {
    stream:   'practitioner',
    pillar:   'strategy',
    date:     'Feb 28, 2026',
    title:    'Medallion Architecture: Innovation or Rebranding?',
    href:     'practitioner-series/medallion-architecture.html',
    excerpt:  "A 22-year practitioner\u2019s definitive guide covering all six layers, AI agent fitment, anti-patterns, and the honest verdict. Zero vendor bias, one honest answer.",
    readTime: '40 min read'
  },
  {
    stream:   'practitioner',
    pillar:   'delivery',
    date:     'Jan 30, 2026',
    title:    'Data Contracts in Practice: A Field Guide for Platform Teams',
    href:     '#',
    excerpt:  'Schema registries, SLO-backed ownership, and the organizational patterns that make data contracts stick \u2014 not just another YAML spec nobody reads.',
    readTime: '35 min read'
  },
  {
    stream:   'practitioner',
    pillar:   'innovation',
    date:     'Jan 10, 2026',
    title:    'Building AI-Ready Data Pipelines: Architecture Patterns That Actually Scale',
    href:     '#',
    excerpt:  'Feature stores, real-time ingestion, and vector layer integration \u2014 the decisions that separate a proof-of-concept from a production AI platform.',
    readTime: '45 min read'
  },

  /* ── Quick Bytes ── */
  {
    stream:   'quickbytes',
    pillar:   'strategy',
    date:     'Mar 21, 2026',
    title:    "Bad Data Doesn\u2019t Care How Smart Your AI Is",
    href:     'quick-bytes/data-foundations-ai-bottleneck.html',
    excerpt:  'The AI bottleneck is not model sophistication \u2014 it is data provenance, semantic consistency, and schema integrity at the foundation.',
    readTime: '2 min read'
  },
  {
    stream:   'quickbytes',
    pillar:   'innovation',
    date:     'Feb 25, 2026',
    title:    'Why Your RAG Pipeline Is Hallucinating \u2014 And How to Fix It',
    href:     '#',
    excerpt:  'Semantic chunking with overlap reduces context loss by 40% \u2014 chunking strategy matters more than model size.',
    readTime: '3 min read'
  },
  {
    stream:   'quickbytes',
    pillar:   'delivery',
    date:     'Feb 10, 2026',
    title:    'Data Quality Is a Team Sport \u2014 Three Non-Negotiable Rules',
    href:     '#',
    excerpt:  'Every data contract must have a named human owner \u2014 not a team alias, not a Slack channel, a person.',
    readTime: '3 min read'
  },

  /* ── Executive Briefing ── */
  {
    stream:   'executive',
    pillar:   'leadership',
    date:     'Feb 22, 2026',
    title:    'HBR: \u201cThe Leader\u2019s Guide to Data-Driven Decision Making\u201d \u2014 A Practitioner\u2019s Take',
    href:     '#',
    excerpt:  "The gap isn\u2019t in decision frameworks \u2014 it\u2019s in data literacy at the executive layer. My commentary on what the article gets right and where it falls short.",
    readTime: '7 min read'
  },
  {
    stream:   'executive',
    pillar:   'strategy',
    date:     'Feb 5, 2026',
    title:    'Why Your AI Transformation Is Stalling \u2014 And It\u2019s Not the Technology',
    href:     '#',
    excerpt:  'Governance gaps, talent misalignment, and unclear ownership are the real blockers. A short briefing on the organizational fixes that unblock AI programs.',
    readTime: '6 min read'
  },
  {
    stream:   'executive',
    pillar:   'leadership',
    date:     'Jan 20, 2026',
    title:    'The CDO\u2019s Dilemma: Governing AI Output Without Slowing Innovation',
    href:     '#',
    excerpt:  'The right governance posture for AI is not a checkpoint \u2014 it\u2019s a design pattern. What enterprise data leaders need to get right in 2026.',
    readTime: '8 min read'
  },

  /* ── Spotlight ── */
  {
    stream:   'spotlight',
    pillar:   'delivery',
    date:     'Mar 20, 2026',
    title:    "Microsoft Fabric\u2019s Governance Story Is Incomplete \u2014 Here\u2019s What\u2019s Missing",
    href:     '#',
    excerpt:  'While OneLake RBAC and Purview integration are steps forward, enterprise-grade lineage and cross-workspace policies still need work.',
    readTime: '10 min read'
  },
  {
    stream:   'spotlight',
    pillar:   'strategy',
    date:     'Mar 15, 2026',
    title:    "dbt\u2019s Move Upstack Is Bold \u2014 But the Complexity Cost Is Real",
    href:     '#',
    excerpt:  'dbt Core is maturing fast, but the jump to full orchestration raises serious questions about operator burden.',
    readTime: '8 min read'
  },
  {
    stream:   'spotlight',
    pillar:   'innovation',
    date:     'Mar 10, 2026',
    title:    'Snowflake Cortex: In-Warehouse AI Is Promising, Limitations Are Real',
    href:     '#',
    excerpt:  'Running LLMs inside the warehouse removes data movement friction. But model choice and cost at scale are still open questions.',
    readTime: '12 min read'
  },
  {
    stream:   'spotlight',
    pillar:   'delivery',
    date:     'Mar 5, 2026',
    title:    'Google Dataplex Data Catalog Gets Serious \u2014 And Enterprises Should Notice',
    href:     '#',
    excerpt:  'The unified metadata layer now spans BigQuery, GCS, and Bigtable. Here\u2019s what it means for teams still stitching together manual data dictionaries in 2026.',
    readTime: '7 min read'
  },
  {
    stream:   'spotlight',
    pillar:   'strategy',
    date:     'Feb 28, 2026',
    title:    'Iceberg vs Delta Lake in 2026 \u2014 The Format War Is Over. Here\u2019s the Real Question.',
    href:     '#',
    excerpt:  "Both formats are production-ready. The debate has moved from capability to ecosystem lock-in. What practitioners should actually be evaluating.",
    readTime: '9 min read'
  },
  {
    stream:   'spotlight',
    pillar:   'innovation',
    date:     'Feb 22, 2026',
    title:    'Databricks AI/BI Genie Is Impressive \u2014 But NL-to-SQL Still Has a Trust Problem',
    href:     '#',
    excerpt:  'Natural language querying is genuinely useful for exploratory work. The gap is in explainability and auditability \u2014 things that matter when a CFO is reading the output.',
    readTime: '6 min read'
  }
];
