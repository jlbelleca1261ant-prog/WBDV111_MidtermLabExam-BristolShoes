# Bristol Shoes Website Project

## Project Title
**Bristol Shoes Marikina - Official Website**

## Student Information
<!-- TODO: Replace [Your Name Here] with your actual name -->
- **Student Name:** [Your Name Here]
- **Course & Section:** BSIT 1-Y2-1
- **School:** Our Lady of Fatima University (OLFU) - Antipolo Campus

## Short Project Description
A static website for **Bristol Shoes & Shoe Factory - Marikina Branch**, a proudly Filipino shoe brand from Marikina City, the Shoe Capital of the Philippines. The website showcases their handcrafted leather shoes for men and women, their brand story, and store information.

Built using **HTML**, **CSS**, and **JavaScript** for the WBDV111 Midterm Laboratory Examination.

## Features Implemented

### Website Structure (4 Pages)
- **Home Page** (`index.html`) - Hero banner, about preview, heritage metrics strip, and CTA
- **About Page** (`about.html`) - Brand story and stats
- **Products Page** (`products.html`) - Men's & Women's collections with filter tabs, quick-view modal, cart system, and checkout
- **Contact Page** (`contact.html`) - Validated contact form (via Formspree), store info, and Google Map

### Design & Functionality
- Responsive design (works on phones, tablets, and desktops)
- Floating pill-style glassmorphism navbar
- 3-mode theme switcher (Light / Dark / Bristol brand theme)
- Smooth scroll reveal animations using IntersectionObserver
- Navy Blue + Gold color scheme with CSS variable system
- Google Fonts (Playfair Display + Inter)
- Semantic HTML5 tags (nav, section, footer, blockquote)
- Form validation (Name, Email, PH Phone format, required fields)
- Add to Cart system with localStorage persistence
- Quick-view product modal with size selector and multiple image angles
- Checkout flow with 5 payment options (GCash, Maya, Card, Bank, COD)

## Folder Structure
```
WBDV Proj/
├── index.html        ← Home page
├── about.html        ← About Us page
├── products.html     ← Products page
├── contact.html      ← Contact page
├── css/
│   ├── style.css     ← Main stylesheet (theme system)
│   └── shop.css      ← Products page & cart styles
├── js/
│   ├── theme.js      ← Theme switcher (Light/Dark/Bristol)
│   ├── scroll.js     ← Scroll reveal animations
│   ├── shop.js       ← Product catalog, cart, modal, checkout
│   └── form.js       ← Contact form validation & Formspree
├── images/
│   └── ...           ← Local image assets
└── README.md         ← This file
```

## Screenshots
<!-- TODO: Add screenshots of your website here -->
<!-- Example: ![Home Page](screenshots/home.png) -->

## Technologies Used
- **HTML5** - Page structure and semantic markup
- **CSS3** - Glassmorphism, CSS variables, Flexbox & Grid
- **JavaScript** - Cart system, theme switcher, form validation, animations
- **Google Fonts** - Playfair Display and Inter
- **Formspree** - Contact form backend (no server needed)
- **Bristol Shoes CDN** - Official product images

## Live Demo
<!-- TODO: Add your GitHub Pages URL here after deployment -->
<!-- Example: https://username.github.io/WBDV111_MidtermLabExam-BristolShoes/ -->
