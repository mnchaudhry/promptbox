# Design System Document: Industrial Authority

## 1. Overview & Creative North Star

### The Creative North Star: "The Brutalist Architect"
This design system rejects the "softness" of modern consumer web design in favor of raw, industrial efficiency. It is built for the power user—the operator who demands precision, speed, and clear hierarchy. We are moving away from "friendly" UI and toward an **Architectural Authority**.

The system breaks the standard template look through **Aggressive Structuralism**. Instead of using subtle shadows or soft rounded corners to imply depth, we use heavy strokes, rigid grids, and high-contrast tonal shifts. Every element should feel "bolted down." The design doesn't just sit on the screen; it occupies space with intentional weight and unapologetic sharp edges.

---

## 2. Colors

The palette is restricted to a high-tension, high-contrast spectrum. We strictly prohibit any use of blue, green, or violet hues to maintain a "monitored" and urgent aesthetic.

### Core Palette
- **Surface & Background:** Deep Charcoal (`#131313`) and Surface Container Lowest (`#0E0E0E`). These provide the "void" in which the tool operates.
- **Primary Accent (International Orange):** `#FF4F00` (mapped to `primary_container`). Use this for critical actions and high-priority states.
- **Secondary Accent (Acid Yellow):** `#DFFF00` (mapped to `secondary_container`). Use this for "active" indicators, data highlights, and tool-state feedback.
- **Typography:** Stark White (`#FFFFFF`) for primary text to ensure maximum readability against the dark surfaces.

### The "Heavy-Stroke" Rule
Contrary to standard UI conventions that favor 1px hairlines, this system prohibits thin, decorative lines. 
- **Structural Lines:** Boundaries between major sections must be defined by **3px solid strokes** using the `outline` or `secondary` token. 
- **Tonal Transitions:** Use background shifts (e.g., placing a `surface_container_highest` block against a `surface_dim` background) to create "lanes" of information without cluttering the view with unnecessary borders.

### Signature Textures
While gradients are prohibited, "soul" is achieved through **Solid Layering**. Use `secondary_container` (Acid Yellow) as a solid background for black text to create high-impact "warning" or "active" modules. 

---

## 3. Typography

Typography is the "steel frame" of this design system. It must feel heavy and mechanical.

### The Typography Scale
- **Display & Headlines:** Use **Space Grotesk** (Bold or Medium). These should be tracked slightly tighter (-2% to -4%) to emphasize the "blocky" brutalist feel. 
    - *Display LG (3.5rem):* Reserved for page headers and massive data points.
- **Body & Technical Data:** Use **Space Grotesk** for standard reading. 
- **Metadata & Monospaced Accents:** All prompt bodies, code snippets, and metadata (timestamps, IDs, coordinates) must use a high-quality Monospaced font. This reinforces the "power-user tool" aesthetic, making the data feel raw and unedited.

**Hierarchy Strategy:** 
Identity is conveyed through **Scale Extremes**. Pair a massive `display-lg` header with a tiny `label-sm` monospaced tag to create a sophisticated, editorial tension that standard "medium-sized" UI lacks.

---

## 4. Elevation & Depth

We reject the "floating" feeling of traditional Material Design. In this system, depth is **Mechanical**.

### The Layering Principle
Hierarchy is achieved through **Physical Stacking**. 
- Use `surface_container_lowest` (#0E0E0E) for the "base" layer.
- Use `surface` (#131313) for primary work areas.
- Use `surface_container_highest` for elevated panels or drawers.
- **No Blurs:** We do not use "Glassmorphism." We use solid, opaque blocks. If a panel is on top of another, it should be a solid `surface` color with a 2px-3px `outline`.

### Hard Shadows (The "Brutalist Drop")
When an element must "pop," do not use soft, ambient shadows. Instead, use a **High-Contrast Offset Shadow**:
- **Shadow Property:** `4px 4px 0px 0px #000000` or a dark charcoal.
- This creates a "sticker" or "pop-art" effect that aligns with the raw, industrial feel.

---

## 5. Components

### Buttons: The "Solid-State" Switch
- **Primary:** Solid `primary_container` (Orange) with black text. Sharp 0px corners. 3px black bottom-right offset shadow on hover to simulate a physical press.
- **Secondary:** Solid Stark White with black text. 2px black border.
- **Tertiary:** Monospaced text with a heavy underline (2px).

### Inputs: The "Terminal" Style
- **Text Fields:** `surface_container_lowest` background with a 2px `outline` (#AC897E). Text must be Monospaced.
- **Focus State:** Border changes to `secondary_container` (Acid Yellow) instantly (no fade animation).

### Cards & Containers
- **The "No-Divider" Rule:** In lists, never use horizontal lines. Use **Vertical White Space** and alternating background tints (Tonal Zebra-Striping) between `surface_container_low` and `surface_container_high`.

### Chips & Tags
- **Status Chips:** Small, rectangular boxes with `0px` radius. Use Acid Yellow for "Active" and International Orange for "Alert/Error." Text must be uppercase.

---

## 6. Do's and Don'ts

### Do:
- **Embrace Asymmetry:** Align high-level stats to the far right while keeping navigation on the far left to break the "centered" template feel.
- **Use "Ink Traps":** Ensure typography has enough breathing room inside these heavy, dark containers.
- **Highlight with Color:** Only use Acid Yellow and International Orange for functional elements. If everything is orange, nothing is important.

### Don't:
- **No Border Radius:** Never use `border-radius`. Every corner in the system must be a sharp 90-degree angle.
- **No Soft Grays:** Avoid mid-tone grays that wash out the contrast. Stick to the deep charcoals and blacks.
- **No "Soft" Transitions:** Interactions should be instant or "snappy" (under 100ms). Avoid long, "graceful" ease-in-out animations; this tool is built for speed.
- **No 1px Lines:** If you need a divider, make it a 2px or 3px statement. If it’s not worth 2px, it’s not worth including.