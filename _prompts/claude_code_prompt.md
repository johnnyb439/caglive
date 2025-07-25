# Technical Prompt for Website Upgrade: Cleared Advisory Group

**Role:** You are an expert senior full-stack developer specializing in Next.js, React, TypeScript, and Tailwind CSS. You are also a UX strategist focused on creating high-converting, user-friendly web experiences.

**Project:** Cleared Advisory Group Website

**Goal:** Implement a comprehensive set of UX, design, SEO, and conversion-focused improvements based on a recent website audit. Your task is to provide actionable code snippets, component examples, copy suggestions, and layout templates for each of the following requirements.

**Tech Stack:**
- **Framework:** Next.js
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Assume a component-based architecture (e.g., `components/navigation.tsx`, `components/footer.tsx`).

---

## Implementation Plan

Please provide specific, production-ready solutions for each of the following tasks.

### 1. Navigation/Header Enhancements

Provide code examples for the main navigation component (`components/navigation.tsx`).

1.  **Increase Logo Size**: Show the CSS or Tailwind CSS class to increase the logo's size by 20%.
2.  **Sticky Header**: Implement a sticky header that remains at the top of the viewport on scroll.
3.  **Active Page Indicators**: Show how to dynamically apply a style (e.g., an underline or color change) to the navigation link of the currently active page. Use `usePathname` from `next/navigation`.
4.  **Dropdown Menus**: Create dropdown menus for "Services" and "Resources" that appear on hover or click. The menus should be populated with placeholder links.
5.  **Search Functionality**: Add a search icon/bar to the header. For now, it can be a placeholder UI element that will later be used for searching job listings.
6.  **ARIA Accessibility**: Ensure all navigation elements (links, buttons, dropdowns) include the necessary ARIA attributes for accessibility (e.g., `aria-current`, `aria-haspopup`, `aria-expanded`).

### 2. Hero Section Upgrades

Provide a complete, modern Hero Section component.

1.  **Typography**: Provide Tailwind CSS classes to significantly enlarge the main headline and subheadline for greater impact.
2.  **Social Proof**: Integrate a small, attention-grabbing element with text like "500+ veterans placed in cleared jobs."
3.  **CTA Contrast**: Design three CTA buttons ("Browse Jobs", "AI Mock Interview", "Schedule Consultation") with strong visual hierarchy and high contrast. Provide the complete button component code.
4.  **Video/Animation**: Show how to embed a video (e.g., from YouTube/Vimeo) or a lightweight animation (e.g., Lottie) into the hero section.
5.  **Benefit Bullet Points**: Add a section with 3 concise bullet points summarizing the key benefits for users (e.g., "AI-Powered Interview Prep," "Direct Access to Cleared Employers," "Personalized Career Coaching").

### 3. Target Audience Cards

Create a reusable React component for the "Target Audience" cards.

1.  **Clickable Cards**: Make the entire card a clickable link that could lead to a details page.
2.  **Expanded Info**: On hover or click, reveal more information within the card or as a modal.
3.  **Mini-Testimonials**: Include a short, impactful quote within each card.
4.  **Segment-Specific Metrics**: Add a data point to each card, such as "Serving 10,000+ National Guard Members."

### 4. AI Mock Interview Page

Provide code and layout suggestions for the AI Mock Interview landing page.

1.  **Demo Video**: Show how to embed a 30-second demo video.
2.  **Sample Questions**: Display 3-5 sample interview questions in a visually appealing format.
3.  **Social Proof Metrics**: Add a section with key metrics like "95% of users feel more prepared" and "Over 1,000 interviews completed."
4.  **Trust Badge**: Create a small "Powered by AI" badge component.

### 5. Testimonials Section

Design a dynamic and trustworthy testimonials section.

1.  **Layout**: Create a grid or slider layout to display 6-8 testimonials.
2.  **Content Structure**: The component for a single testimonial should accept props for a headshot image, name, role, company, a quote, and an optional LinkedIn profile URL.
3.  **Video Testimonials**: Include a variant in the design that can accommodate an embedded video instead of a text quote.

### 6. Footer

Create a comprehensive, multi-column footer component (`components/footer.tsx`).

1.  **Sitemap & Links**: Include columns for key sitemap links (About, Services, Jobs, etc.).
2.  **Newsletter Signup**: Add a simple newsletter signup form with an input field and a submit button.
3.  **Social Icons**: Include SVG icons for major social media platforms (LinkedIn, Twitter, Facebook).
4.  **Trust Badges**: Add a section for trust badges, such as "Veteran-Owned Business" or "BBB Accredited." Provide placeholder images or icons.
5.  **Contact Info**: Display the physical address.
6.  **Legal Links**: Add links for "Privacy Policy" and "Terms of Service."

### 7. Mobile Optimization

Provide specific code or strategy examples for mobile-specific improvements.

1.  **Larger CTAs**: Show the Tailwind CSS responsive classes needed to make CTA buttons larger on mobile screens.
2.  **Sticky CTA Bar**: Create a sticky bar at the bottom of the mobile viewport containing the most important CTA (e.g., "Browse Jobs").
3.  **Image Optimization**: Demonstrate how to use the Next.js `<Image>` component for automatic image compression and lazy loading.
4.  **WebP Format**: Explain how to configure the Next.js app to serve images in WebP format.

### 8. Technical SEO

Provide code examples and configuration settings.

1.  **Schema Markup**: Show an example of how to add `JobPosting` schema markup (JSON-LD) to a job details page.
2.  **XML Sitemap**: Explain how to generate and submit an XML sitemap in a Next.js application.
3.  **Alt Text**: Emphasize that all `<Image>` components must have a descriptive `alt` prop.
4.  **Open Graph Tags**: Provide an example of how to use `next/head` or the Metadata API to add Open Graph tags (`og:title`, `og:description`, `og:image`) to a page.
5.  **Meta Descriptions**: Show how to add a unique meta description to a page layout or template.

### 9. Conversion Boosters

For each feature, describe the implementation strategy and provide a basic component structure.

1.  **Exit-Intent Popup**: Outline how to create a simple exit-intent popup component with a "Free Consultation" offer. Suggest a library or a custom hook to detect exit intent.
2.  **Live Chat Widget**: Recommend a popular live chat service (e.g., Intercom, Crisp) and explain how to integrate its script into a Next.js application.
3.  **Application Progress Bar**: Create a simple, multi-step progress bar component to be used in a job application form.
4.  **Retargeting Pixel**: Explain where to place a retargeting pixel (e.g., Facebook Pixel, LinkedIn Insight Tag) within the Next.js application, ideally using environment variables for the pixel ID.

### 10. Competitive Differentiation

Provide content structure and component ideas for new, high-value sections.

1.  **"Clearance 101" Section**: Propose a layout for a content section that educates users on security clearances. This could be a grid of articles or an accordion-style FAQ.
2.  **Skills Translator Tool**: Design a simple UI for a "Military-to-Civilian Skills Translator." It should have an input for a military job code (MOS/AFSC) and an output area to display equivalent civilian skills. For now, the logic can be a placeholder.
3.  **Success Metrics**: Design a prominent section for the homepage that highlights key success metrics like "Average time to placement: 3 weeks" or "90% success rate in first 6 months."

---

Please generate the responses for each section clearly, providing code in formatted blocks and explanations where necessary.
