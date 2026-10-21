# Page hero image prompts

Every inner page now has a full-screen photo hero, like the home page. The headline
sits on the left over a soft cream fade, so each image needs **the subject on the
right third** and a **softly blurred but real scene on the left** (not a plain wall).

## Settings (Google Flow / Nano Banana)

- Aspect ratio **16:9**, download **2K** (about 2752 × 1536)
- One image per prompt; generate 2 variants and keep the better one
- Paste the shared style line at the end of every prompt

## Where to put them

Save each one as a JPG in `src/assets/pages/`, replacing the current file:

| Page | File name |
|---|---|
| Services | `services.jpg` |
| Therapists | `therapists.jpg` |
| Concerns (list and each guide) | `concerns.jpg` |
| About | `about.jpg` |
| Pricing | `pricing.jpg` |
| FAQ | `faq.jpg` |
| Contact | `contact.jpg` |
| For organisations | `business.jpg` |
| Community / workshops | `community.jpg` |
| Blog | `blog.jpg` |

Don't worry about the Gemini sparkle in the corner or the file size: tell Claude
when they're in and it will crop and compress them.

## Shared style line (add to every prompt)

> Wide cinematic editorial photograph, 16:9. Main subject placed in the right third of the frame; the left half is a softly out-of-focus but detailed continuation of the same scene, low contrast and light in tone so text can sit over it. Warm early-morning natural light, Kerala setting, shallow depth of field, gentle haze, warm cream, terracotta, ochre and moss-green palette, natural skin texture, calm and hopeful, premium magazine look, shot on 50mm film. No text, no logos, no watermarks.

## Prompts

**1. Services (`services.jpg`)**
Two people having a gentle conversation over chai on a sunlit Kerala verandah: a young Malayali woman listening warmly and a counsellor in her thirties with a notebook on her lap, seated on cane chairs on the right; carved wooden pillars, potted ferns and a woven mat blur softly to the left.

**2. Therapists (`therapists.jpg`)**
A warm, smiling Malayali woman counsellor in her thirties in a soft clay-coloured cotton kurta, sitting in a linen armchair in a calm therapy room on the right, holding a cup of tea; to the left, out of focus, a bookshelf, a brass lamp, plants and window light on a lime-plastered wall.

**3. Concerns (`concerns.jpg`)**
A young Malayali man in a sage linen shirt standing at a wooden railing on the right, looking out over misty Wayanad tea-garden hills at sunrise with a calm, thoughtful expression; layers of soft fog and green hills fade gently across the left.

**4. About (`about.jpg`)**
The open central courtyard (nadumuttam) of an old Kerala tharavadu during gentle rain: on the right, a woman in a cream kasavu saree sitting on the wooden steps with a cup of tea, looking at the rain; carved pillars, a tiled roof edge dripping water and green moss blur softly to the left.

**5. Pricing (`pricing.jpg`)**
A young Malayali woman at a wooden table by a window on the right, smiling slightly as she looks at a laptop during a video call, a clay cup of tea beside her; a soft, blurred home interior with plants and a hanging brass lamp on the left.

**6. FAQ (`faq.jpg`)**
A thoughtful young Malayali woman writing in an open journal at a wooden desk on the right, a few white jasmine flowers and a brass tumbler beside her; a softly blurred window with coconut palms and sheer curtains fills the left.

**7. Contact (`contact.jpg`)**
A relaxed Malayali man in his late twenties sitting on a wide wooden window seat on the right, holding a phone and smiling gently as he reads a message; monsoon-green garden and wooden window shutters blur softly to the left.

**8. For organisations (`business.jpg`)**
A bright, calm modern office in Kochi with plants and wooden desks: on the right, three colleagues in a relaxed, friendly discussion around a small table; open-plan desks, large windows and greenery blur softly to the left.

**9. Community / workshops (`community.jpg`)**
A small wellbeing group session in a sunlit wooden hall: on the right, five or six people of different ages sitting on floor cushions in a loose circle, listening to a facilitator, relaxed and smiling; wooden pillars, woven mats and window light blur softly to the left.

**10. Blog (`blog.jpg`)**
A young Malayali woman curled up in a cane chair by a window on the right, reading a book with a cup of tea, soft smile; a stack of books, round reading glasses and plants on a wooden sill blur softly to the left.

## Note

People in these images are AI-generated and fictional. That's fine for demo mode, but
before launch either keep them as clearly illustrative imagery or replace them with
real, consented photography (see TODO.md).
