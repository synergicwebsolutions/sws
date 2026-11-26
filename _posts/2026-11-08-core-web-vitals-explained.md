---
layout: post
title: "Core Web Vitals: The SEO Metric Your Website Can't Ignore"
description: "Understand LCP, INP, and CLS—and the practical fixes that make a website faster, more stable, and more likely to convert."
canonical: https://www.momostack.com/blog/core-web-vitals-explained/
permalink: /blog/core-web-vitals-explained/
date: 2026-11-08
categories: [Technical SEO]
tags: [Core Web Vitals, SEO, performance, Lighthouse]
image: /assets/img/banner.png
image_alt: "Website performance dashboard showing Core Web Vitals scores"
read_time: "8 min read"
excerpt: >-
  Speed is no longer a developer vanity metric. Here is what LCP, INP, and CLS
  actually measure—and the fixes that move the numbers that matter.
---

Google's Core Web Vitals are a set of user-experience signals that measure how a page *feels* to real visitors. They matter because they sit at the intersection of search ranking, usability, and conversion. A site that renders quickly and responds instantly does not just please an algorithm; it keeps people on the page.

This guide breaks down the three current metrics, how to measure them honestly, and the fixes we apply most often in client projects.

## The three metrics that matter

### Largest Contentful Paint (LCP)

LCP measures how long the largest visible element takes to render—usually a hero image, headline block, or product image. Google considers **2.5 seconds or less** a good result.

Common causes of a slow LCP:

- Large, unoptimised hero images.
- Render-blocking CSS and JavaScript in the page head.
- Slow server response or no caching.
- Web fonts that block text from appearing.

### Interaction to Next Paint (INP)

INP measures how quickly a page responds when a user interacts with it—clicks, taps, or keyboard input. A good score is **200 milliseconds or less**.

INP replaced First Input Delay because it looks at the whole interaction, not just the moment the browser received the event. Long JavaScript tasks, heavy third-party scripts, and layout thrashing are frequent culprits.

### Cumulative Layout Shift (CLS)

CLS measures visual stability. If a button jumps just as someone tries to tap it, that is a layout shift. A good score is **0.1 or less**.

Typical causes include images without dimensions, ads or embeds that resize after loading, and fonts that swap late and reflow text.

## Measure real users, not just lab scores

Lab tools are useful for diagnosis, but field data is what Google uses. Start with these sources:

1. **Google Search Console** — the Core Web Vitals report shows URL groups with real-user data.
2. **PageSpeed Insights** — combines lab diagnostics with field data from the Chrome User Experience Report.
3. **Lighthouse** — runs in your browser and gives a reproducible development baseline.
4. **Browser DevTools** — the Performance panel shows exactly which tasks block rendering.

Test both mobile and desktop. Mobile networks and CPUs expose problems that a fast office connection hides.

## Practical fixes we apply first

### 1. Optimise images properly

Serve modern formats, compress aggressively, and always set width and height attributes. For hero images, preload the single most important file and avoid lazy-loading it—lazy loading above-the-fold media delays LCP.

### 2. Remove render-blocking work

Inline critical CSS for the first screen, defer non-critical JavaScript, and load analytics asynchronously. On Jekyll and other static sites, this is straightforward because there is no server-side rendering pipeline to work around.

### 3. Load fonts without hiding content

Use `font-display: swap`, preconnect to the font host, and limit the number of font weights. Reserve space where possible so the swap does not shift layout.

### 4. Break up long JavaScript tasks

If a script keeps the main thread busy, interactions feel frozen. Split work into smaller chunks with `requestIdleCallback` or `setTimeout`, and remove third-party scripts you no longer use. Every tag manager container has a cost.

### 5. Reserve space for dynamic content

Set aspect ratios on images and videos, define heights for embeds and banners, and avoid inserting content above existing content after load. This is the fastest way to improve CLS.

> Performance work is rarely one dramatic fix. It is a series of small, measurable removals: fewer bytes, fewer blocking tasks, fewer surprises.

## Why the platform matters

Static sites have a structural advantage here. With no database query on every request, a heavily cached site can respond almost instantly. Our own [website architecture]({{ '/#about' | relative_url }}) relies on pre-rendered HTML, which makes strong Core Web Vitals much easier to sustain.

That does not mean static is always the answer. A well-built dynamic application can score well too—but it requires deliberate caching, image pipelines, and script discipline from the start.

## A launch checklist for better vitals

- [ ] Hero image is compressed, sized, and preloaded.
- [ ] All images and videos have explicit dimensions.
- [ ] Non-critical JavaScript is deferred or async.
- [ ] Fonts use `font-display: swap` with limited weights.
- [ ] Analytics and third-party tags load asynchronously.
- [ ] No content is injected above the fold after load.
- [ ] Field data in Search Console shows all URL groups as good.

## Make performance part of the brief

Core Web Vitals should not be a cleanup task at the end of a project. When performance is written into the original requirements, the architecture, design, and content decisions all support it.

If you want to know how your current site scores before investing in a redesign, [get in touch]({{ '/#contact' | relative_url }}). We will run the numbers and tell you what is worth fixing first.

### Related reading

- [How to choose a web development partner]({{ '/blog/choose-web-development-partner/' | relative_url }})
- [Custom software vs off-the-shelf]({{ '/blog/custom-software-vs-off-the-shelf/' | relative_url }})
