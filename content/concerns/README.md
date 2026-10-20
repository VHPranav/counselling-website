# Concern guides

One MDX file per concern and language: `content/concerns/{en,ml}/<slug>.mdx`.
The slug must match an entry in `src/data/concerns.ts`.

Each file exports `meta` (intro, signs, faq) and then the body in Markdown.
Use `<CrisisCallout>` for any safety note: it adds the helpline numbers from
`src/config/safety.ts` automatically, so never type the numbers by hand.

Concerns without a file here use the standard template automatically.
All Malayalam files need native-speaker review (see docs/ml-review.md).
