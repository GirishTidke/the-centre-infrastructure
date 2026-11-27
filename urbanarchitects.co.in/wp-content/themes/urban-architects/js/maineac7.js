/**
 * ==============================================================================
 * URBAN ARCHITECTS - MAIN SCRIPT
 * Handles Category Collage, 3-Column Work Grid, Cinematic YouTube Lightbox,
 * Interactive Services, Bottom-Scroll Enquiry Popup, and Consultation Drawer.
 * ==============================================================================
 */

// Category Showcase Data (Using user-specified images from OFFICE WEBSITE CONTENT\HOMEPAGE\SELECTED WORK)
const CATEGORIES_DATA = [
  {
    id: "residential",
    title: "Residential Architecture",
    headline: "Apartments & Modern Villas",
    count: 15,
    coverImage: "assets/categories/residential.jpg",
    tag: "01 / RESIDENTIAL",
    scope: "15 Curated Projects · Bespoke villas, modern residences & multi-dwelling apartments",
    collageClass: "collage-card-residential"
  },
  {
    id: "commercial",
    title: "Commercial & Workplaces",
    headline: "Workplaces & Commercial Plazas",
    count: 3,
    coverImage: "assets/categories/commercial.png",
    tag: "02 / COMMERCIAL",
    scope: "3 Projects · Tech headquarters, corporate offices & commercial developments",
    collageClass: "collage-card-commercial"
  },
  {
    id: "civic",
    title: "Industrial & Logistics",
    headline: "Industrial Facilities & Logistics",
    count: 3,
    coverImage: "assets/categories/industrial.jpg",
    tag: "03 / INDUSTRIAL",
    scope: "Specialized manufacturing plants, logistics hubs & industrial engineering",
    collageClass: "collage-card-interiors"
  },
  {
    id: "civic",
    title: "Civic & Masterplanning",
    headline: "Civic Landmarks & Large-Scale Townships",
    count: 4,
    coverImage: "assets/categories/civic.jpg",
    tag: "04 / CIVIC & MASTERPLANNING",
    scope: "4 Projects · Institutional entrance landmarks, plotted developments & industrial facilities",
    collageClass: "collage-card-civic"
  }
];

// Helper to resolve asset URLs across static and WordPress environments
function resolveAsset(url) {
  if (!url) return '';
  if (/^(https?:)?\/\//i.test(url) || /^data:/i.test(url)) return url;
  const baseUrl = (window.urbanThemeData && window.urbanThemeData.themeUrl)
    ? window.urbanThemeData.themeUrl.replace(/\/+$/, '') + '/'
    : '';
  return baseUrl + url.replace(/^\/+/, '');
}

document.addEventListener('DOMContentLoaded', () => {
  initCategoryCollage();
  initViewToggle();
  initFilterControls();
  initModals();
  initCinemaVideo();
  initScrollEnquiryPopup();
  initMobileMenu();
  initScrollAnimations();
  initStatCounters();
  initReviewsInteraction();
  initFaqAccordion();
  initContactForm();
});

/**
 * 1. Render Category Showcase Collage
 */
function initCategoryCollage() {
  const container = document.getElementById('collageGrid');
  if (!container) return;

  container.innerHTML = '';

  CATEGORIES_DATA.forEach((cat, index) => {
    const card = document.createElement('article');
    card.className = `collage-card ${cat.collageClass} reveal-up`;
    card.setAttribute('data-category', cat.id);
    card.style.animationDelay = `${index * 120}ms`;

    card.innerHTML = `
      <div class="collage-image-container">
        <img 
          src="${resolveAsset(cat.coverImage)}" 
          alt="${cat.headline}" 
          loading="${index < 2 ? 'eager' : 'lazy'}"
          onerror="this.src='${resolveAsset('assets/hero/priyadarshi-rendered-hero.html')}'"
        />
        <div class="collage-card-overlay"></div>
      </div>
      <div class="collage-card-content">
        <span class="collage-card-badge">${cat.tag}</span>
        <h3 class="collage-card-title">${cat.headline}</h3>
        <p class="collage-card-scope">${cat.scope}</p>
        <div class="collage-card-action">
          <span>Explore Projects</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </div>
      </div>
    `;

    card.addEventListener('click', () => {
      openCategoryProjects(cat.id);
    });

    container.appendChild(card);
  });
}

/**
 * 2. Open Category Projects View in Front-Page 3-Column Grid
 */
function openCategoryProjects(categoryKey) {
  const collageView = document.getElementById('categoriesCollageView');
  const projectsView = document.getElementById('categoryProjectsView');
  const viewCollageBtn = document.getElementById('viewCollageBtn');
  const viewGridBtn = document.getElementById('viewGridBtn');
  const activeTitle = document.getElementById('activeCategoryTitle');
  const activeCount = document.getElementById('activeCategoryCount');

  if (collageView) collageView.style.display = 'none';
  if (projectsView) projectsView.style.display = 'block';

  if (viewCollageBtn) viewCollageBtn.classList.remove('active');
  if (viewGridBtn) viewGridBtn.classList.add('active');

  const catMeta = CATEGORIES_DATA.find(c => c.id.toLowerCase() === categoryKey.toLowerCase());
  if (catMeta) {
    if (activeTitle) activeTitle.textContent = catMeta.title;
    if (activeCount) activeCount.textContent = `${catMeta.count} Projects`;
  } else if (categoryKey === 'all') {
    if (activeTitle) activeTitle.textContent = 'All Architecture & Interiors';
    const totalCount = window.PORTFOLIO_PROJECTS ? window.PORTFOLIO_PROJECTS.length : 24;
    if (activeCount) activeCount.textContent = `${totalCount} Projects`;
  }

  const filterPills = document.querySelectorAll('#categoryFilterBar .filter-pill');
  filterPills.forEach(pill => {
    if (pill.getAttribute('data-filter') === categoryKey) {
      pill.classList.add('active');
    } else {
      pill.classList.remove('active');
    }
  });

  initProjectGrid(categoryKey);

  const workSection = document.getElementById('work');
  if (workSection) {
    const yOffset = -40;
    const y = workSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

/**
 * Switch back to the Category Collage view
 */
function showCollageView() {
  const collageView = document.getElementById('categoriesCollageView');
  const projectsView = document.getElementById('categoryProjectsView');
  const viewCollageBtn = document.getElementById('viewCollageBtn');
  const viewGridBtn = document.getElementById('viewGridBtn');

  if (projectsView) projectsView.style.display = 'none';
  if (collageView) collageView.style.display = 'block';

  if (viewGridBtn) viewGridBtn.classList.remove('active');
  if (viewCollageBtn) viewCollageBtn.classList.add('active');

  const workSection = document.getElementById('work');
  if (workSection) {
    const yOffset = -40;
    const y = workSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

/**
 * View Toggles & Back Button Listeners
 */
function initViewToggle() {
  const viewCollageBtn = document.getElementById('viewCollageBtn');
  const viewGridBtn = document.getElementById('viewGridBtn');
  const backToCollageBtn = document.getElementById('backToCollageBtn');

  if (viewCollageBtn) {
    viewCollageBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showCollageView();
    });
  }

  if (viewGridBtn) {
    viewGridBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openCategoryProjects('all');
    });
  }

  if (backToCollageBtn) {
    backToCollageBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showCollageView();
    });
  }
}

/**
 * Render Projects in the Uniform 3-Column Front Grid
 */
function initProjectGrid(filteredCategory = 'all') {
  const gridContainer = document.getElementById('workGrid');
  if (!gridContainer || !window.PORTFOLIO_PROJECTS) return;

  const projects = window.PORTFOLIO_PROJECTS.filter(project => {
    if (filteredCategory === 'all') return true;
    return project.category.toLowerCase() === filteredCategory.toLowerCase();
  });

  gridContainer.innerHTML = '';

  if (projects.length === 0) {
    gridContainer.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 4rem 0; text-align: center; color: var(--ink-50);">
        <p>No projects currently listed in this category.</p>
      </div>
    `;
    return;
  }

  projects.forEach((project, index) => {
    const spanClass = 'span-square';

    const card = document.createElement('article');
    card.className = `project-card ${spanClass} reveal-up`;
    card.setAttribute('data-id', project.id);
    card.style.animationDelay = `${(index % 6) * 75}ms`;

    card.innerHTML = `
      <div class="project-media-container">
        <img 
          src="${resolveAsset(project.coverImage)}" 
          alt="${project.title}" 
          loading="${index < 6 ? 'eager' : 'lazy'}"
          onerror="this.src='${resolveAsset('assets/hero/priyadarshi-rendered-hero.html')}'"
        />
        <div class="project-card-overlay-hint">
          <span>View Project &rarr;</span>
        </div>
      </div>
      <div class="project-meta-row">
        <h3 class="project-card-title">${project.title}</h3>
        <span class="project-card-category">${project.categoryLabel || project.category}</span>
      </div>
    `;

    card.addEventListener('click', (e) => {
      e.preventDefault();
      openProjectDrawer(project);
    });

    gridContainer.appendChild(card);
  });
}

/**
 * Filter Controls inside Category View
 */
function initFilterControls() {
  const filterPills = document.querySelectorAll('#categoryFilterBar .filter-pill');
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const category = pill.getAttribute('data-filter');
      openCategoryProjects(category);
    });
  });
}

/**
 * 3. Cinematic Fullscreen YouTube Video Player Lightbox
 */
function initCinemaVideo() {
  const openBtn = document.getElementById('openVideoBtn');
  const modal = document.getElementById('cinemaVideoModal');
  const closeBtn = document.getElementById('cinemaCloseBtn');
  const iframe = document.getElementById('cinemaIframe');
  const videoId = 'PZJHHtdgI9k';

  if (!openBtn || !modal || !iframe) return;

  const openVideo = () => {
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeVideo = () => {
    modal.classList.remove('active');
    iframe.src = ''; // Stops audio and video playback
    document.body.style.overflow = '';
  };

  openBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openVideo();
  });

  if (closeBtn) closeBtn.addEventListener('click', closeVideo);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeVideo();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeVideo();
    }
  });
}

/**
 * 4. Bottom-Scroll Enquiry Popup Modal
 */
function initScrollEnquiryPopup() {
  const popup = document.getElementById('scrollEnquiryPopup');
  const closeBtn = document.getElementById('enquiryPopupCloseBtn');
  const dismissBtn = document.getElementById('autoDismissBtn');
  const form = document.getElementById('autoEnquiryForm');
  const whatsappBtn = document.getElementById('autoWhatsappBtn');

  if (!popup) return;

  // Do not show popup on dedicated Contact page where user is already using the contact form
  if (document.getElementById('contactPageForm') || window.location.pathname.includes('/contact')) {
    return;
  }

  let hasTriggered = false;

  const isDismissed = () => {
    return localStorage.getItem('ua_enquiry_dismissed') === 'true' ||
           sessionStorage.getItem('ua_enquiry_dismissed') === 'true';
  };

  const handleScroll = () => {
    if (hasTriggered || isDismissed()) return;

    // Trigger when user scrolls near the bottom of the page (within 950px of page bottom)
    const scrollPosition = window.innerHeight + window.scrollY;
    const pageBottom = document.documentElement.offsetHeight - 950;

    if (scrollPosition >= pageBottom) {
      hasTriggered = true;
      popup.classList.add('active');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  const dismissPopup = () => {
    popup.classList.remove('active');
    localStorage.setItem('ua_enquiry_dismissed', 'true');
    sessionStorage.setItem('ua_enquiry_dismissed', 'true');
  };

  if (closeBtn) closeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    dismissPopup();
  });

  if (dismissBtn) dismissBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    dismissPopup();
  });

  // Close when tapping backdrop scrim on mobile / tablets
  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
      dismissPopup();
    }
  });

  // Close when pressing Escape key on all platforms
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && popup.classList.contains('active')) {
      dismissPopup();
    }
  });

  // Direct WhatsApp Button action
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', () => {
      const name = document.getElementById('autoName')?.value || 'Client';
      const phone = document.getElementById('autoPhone')?.value || '';
      const type = document.getElementById('autoType')?.value || 'Architecture';
      const msg = document.getElementById('autoMessage')?.value || '';

      const text = encodeURIComponent(
        `Hello Urban Architects,\n\nI would like to enquire about a project:\n• Name: ${name}\n• Phone: ${phone}\n• Project Type: ${type}\n• Details: ${msg}`
      );

      window.open(`https://wa.me/919538698091?text=${text}`, '_blank');
      dismissPopup();
    });
  }

  // Submit action
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('autoName')?.value || 'Client';
      const phone = document.getElementById('autoPhone')?.value || '';
      const type = document.getElementById('autoType')?.value || 'Architecture';
      const msg = document.getElementById('autoMessage')?.value || '';

      const text = encodeURIComponent(
        `Hello Urban Architects,\n\nEnquiry Submission:\n• Name: ${name}\n• Phone: ${phone}\n• Project Type: ${type}\n• Details: ${msg}`
      );

      window.open(`https://wa.me/919538698091?text=${text}`, '_blank');
      dismissPopup();
      alert('Thank you! Redirecting you to connect with Urban Architects.');
    });
  }
}

/**
 * 5. Project Detail Slide-Over Drawer
 */
function openProjectDrawer(project) {
  const drawerOverlay = document.getElementById('projectDrawerModal');
  const titleEl = document.getElementById('drawerProjectTitle');
  const catEl = document.getElementById('drawerCategory');
  const locationEl = document.getElementById('drawerLocation');
  const areaEl = document.getElementById('drawerArea');
  const yearEl = document.getElementById('drawerYear');
  const clientEl = document.getElementById('drawerClient');
  const teamEl = document.getElementById('drawerTeam');
  const storyEl = document.getElementById('drawerStory');
  const galleryEl = document.getElementById('drawerGallery');

  if (!drawerOverlay) return;

  if (titleEl) titleEl.textContent = project.title;
  if (catEl) catEl.textContent = project.categoryLabel || project.category;
  if (locationEl) locationEl.textContent = project.location || 'Bengaluru, India';
  if (areaEl) areaEl.textContent = project.builtArea || project.siteArea || 'Custom Design';
  if (yearEl) yearEl.textContent = project.year || 'Recent';
  if (clientEl) clientEl.textContent = project.client || 'Private Client';
  if (teamEl) teamEl.textContent = project.designTeam || 'Urban Architects Design Team';
  if (storyEl) {
    const storyText = project.fullStory || project.description || '';
    let html = storyText.split('\n\n').map(p => `<p style="margin-bottom: 1rem;">${p.trim()}</p>`).join('');
    
    if (project.highlights && project.highlights.length > 0) {
      html += `
        <div style="margin: 2rem 0; padding: 1.25rem 1.5rem; background: rgba(28, 26, 23, 0.04); border-left: 3px solid var(--brick); border-radius: var(--radius-sm);">
          <h4 style="font-family: var(--font-display); font-size: 0.95rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: var(--ink); margin-bottom: 0.75rem;">Design Highlights</h4>
          <ul style="list-style-type: disc; padding-left: 1.25rem; font-size: 0.95rem; line-height: 1.6; color: var(--ink-80);">
            ${project.highlights.map(h => `<li style="margin-bottom: 0.4rem;">${h}</li>`).join('')}
          </ul>
        </div>
      `;
    }
    storyEl.innerHTML = html;
  }

  if (galleryEl) {
    galleryEl.innerHTML = '';
    const images = project.gallery && project.gallery.length > 0 ? project.gallery : [project.coverImage];
    images.forEach(imgUrl => {
      const img = document.createElement('img');
      img.src = resolveAsset(imgUrl);
      img.alt = project.title;
      img.loading = 'lazy';
      img.onerror = () => { img.style.display = 'none'; };
      galleryEl.appendChild(img);
    });
  }

  drawerOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProjectDrawer() {
  const drawerOverlay = document.getElementById('projectDrawerModal');
  if (drawerOverlay) {
    drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/**
 * 6. Consultation & Project Drawer Modals
 */
function initModals() {
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const drawerOverlay = document.getElementById('projectDrawerModal');
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeProjectDrawer);
  if (drawerOverlay) {
    drawerOverlay.addEventListener('click', (e) => {
      if (e.target === drawerOverlay) closeProjectDrawer();
    });
  }

  const consultModal = document.getElementById('consultModal');
  const consultButtons = document.querySelectorAll('.open-consult-modal');
  const consultCloseBtn = document.getElementById('consultCloseBtn');
  const typeSelect = document.getElementById('projectType');

  consultButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const pref = btn.getAttribute('data-pref');
      if (pref && typeSelect) {
        for (let i = 0; i < typeSelect.options.length; i++) {
          if (typeSelect.options[i].text.toLowerCase().includes(pref.toLowerCase()) ||
              typeSelect.options[i].value.toLowerCase().includes(pref.toLowerCase())) {
            typeSelect.selectedIndex = i;
            break;
          }
        }
      }
      if (consultModal) {
        consultModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (consultCloseBtn) {
    consultCloseBtn.addEventListener('click', () => {
      if (consultModal) {
        consultModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  if (consultModal) {
    consultModal.addEventListener('click', (e) => {
      if (e.target === consultModal) {
        consultModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProjectDrawer();
      if (consultModal) {
        consultModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  });

  const consultForm = document.getElementById('consultForm');
  if (consultForm) {
    consultForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('clientName')?.value || 'Client';
      const phone = document.getElementById('clientPhone')?.value || '';
      const type = document.getElementById('projectType')?.value || 'Architecture';
      const location = document.getElementById('projectLoc')?.value || 'Bengaluru';
      const brief = document.getElementById('projectBrief')?.value || '';

      const text = encodeURIComponent(
        `Hello Urban Architects,\n\nI would like to discuss a new project:\n• Name: ${name}\n• Contact: ${phone}\n• Project Type: ${type}\n• Location: ${location}\n• Brief: ${brief}`
      );

      window.open(`https://wa.me/919538698091?text=${text}`, '_blank');
      consultModal.classList.remove('active');
      document.body.style.overflow = '';
      alert('Thank you! Redirecting you to connect with Urban Architects.');
    });
  }
}

/**
 * 7. Mobile Navigation Drawer
 */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const menuOverlay = document.getElementById('mobileNavOverlay');
  const menuCloseBtn = document.getElementById('mobileNavCloseBtn');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuBtn || !menuOverlay) return;

  menuBtn.addEventListener('click', () => {
    menuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  const closeMenu = () => {
    menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (menuCloseBtn) menuCloseBtn.addEventListener('click', closeMenu);
  mobileNavLinks.forEach(link => link.addEventListener('click', closeMenu));
}

/**
 * 8. Scroll Animations
 */
function initScrollAnimations() {
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal-up, .service-card, .stat-item, .blog-preview-card').forEach(el => {
    observer.observe(el);
  });
}

/**
 * 9. Stat Counters Animation
 */
function initStatCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('counted');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  statNumbers.forEach(el => observer.observe(el));
}

/**
 * 10. Reviews Card Hover & Click Interaction
 * Clamped 3-line preview by default, expands on hover and click/tap.
 */
function initReviewsInteraction() {
  const cards = document.querySelectorAll('.review-card-v2');
  if (!cards.length) return;

  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Don't interfere if user clicked an external link inside card
      if (e.target.closest('a')) return;
      
      const isExpanded = card.classList.toggle('expanded');
      const hint = card.querySelector('.review-expand-hint');
      if (hint) {
        hint.textContent = isExpanded ? 'Show less ↑' : 'Read more ↓';
      }
    });
  });
}

/**
 * 11. SEO FAQ Accordion (Matching Prashant Parmar Editorial Reference)
 * Opens answer, toggles icon between '+' and '—'.
 */
function initFaqAccordion() {
  const faqButtons = document.querySelectorAll('.faq-question-btn');
  if (!faqButtons.length) return;

  faqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      if (!item) return;
      const icon = btn.querySelector('.faq-toggle-icon');
      const isOpen = item.classList.contains('is-open');

      if (isOpen) {
        item.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
        if (icon) icon.textContent = '+';
      } else {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
        if (icon) icon.textContent = '—';
      }
    });
  });

  // Show More / Show Less FAQs Toggle
  const showMoreBtn = document.getElementById('faqShowMoreBtn');
  const hiddenFaqs = document.querySelectorAll('.faq-item.faq-hidden');
  if (showMoreBtn && hiddenFaqs.length) {
    let isExpanded = false;
    showMoreBtn.addEventListener('click', () => {
      isExpanded = !isExpanded;
      hiddenFaqs.forEach(faq => {
        faq.style.display = isExpanded ? 'block' : 'none';
        if (isExpanded) {
          faq.classList.add('reveal-up', 'is-in-view');
        }
      });
      showMoreBtn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
      const btnText = showMoreBtn.querySelector('.faq-btn-text');
      const btnIcon = showMoreBtn.querySelector('.faq-btn-icon');
      if (isExpanded) {
        if (btnText) btnText.textContent = 'Show Less Questions';
        if (btnIcon) btnIcon.innerHTML = '&uarr;';
      } else {
        if (btnText) btnText.textContent = `View All ${document.querySelectorAll('.faq-item').length} Questions`;
        if (btnIcon) btnIcon.innerHTML = '&darr;';
        const faqSection = document.getElementById('faqs');
        if (faqSection) {
          faqSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }
}

/**
 * 12. Contact Page Form Handler
 * Validates inputs and reCAPTCHA, routes submission to Info.urbanarchitects@gmail.com
 * via WordPress AJAX (wp_mail) or opens pre-filled email client directly.
 */
function initContactForm() {
  const form = document.getElementById('contactPageForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    const phoneInput = document.getElementById('contactPhone');
    const msgInput = document.getElementById('contactMessage');
    const captchaCheck = document.getElementById('contactRecaptchaCheck');
    const statusBox = document.getElementById('contactFormStatus');
    const submitBtn = document.getElementById('contactSubmitBtn') || form.querySelector('button[type="submit"]');

    if (captchaCheck && !captchaCheck.checked) {
      alert("Please confirm the 'I\\'m not a robot' verification before submitting.");
      return;
    }

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const phone = phoneInput ? phoneInput.value.trim() : '';
    const message = msgInput ? msgInput.value.trim() : '';

    if (!name || !email || !message) {
      alert("Please fill in your name, email, and message.");
      return;
    }

    const originalBtnText = submitBtn ? submitBtn.textContent : 'SUBMIT';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'SENDING...';
    }

    let ajaxHandled = false;

    // 1. Submit via WordPress AJAX if available
    if (window.urbanThemeData && window.urbanThemeData.ajaxUrl) {
      try {
        const formData = new FormData();
        formData.append('action', 'urban_architects_contact_submit');
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('message', message);

        const response = await fetch(window.urbanThemeData.ajaxUrl, {
          method: 'POST',
          body: formData
        });

        const resData = await response.json();
        if (resData && resData.success) {
          ajaxHandled = true;
          if (statusBox) {
            statusBox.style.display = 'block';
            statusBox.style.backgroundColor = '#ecfdf5';
            statusBox.style.border = '1px solid #10b981';
            statusBox.style.color = '#065f46';
            statusBox.innerHTML = `<strong>Enquiry Sent!</strong> Your message has been routed directly to <em>Info.urbanarchitects@gmail.com</em>. Our principal architects will reach out shortly.`;
          } else {
            alert(`Thank you, ${name}! Your enquiry has been routed directly to Info.urbanarchitects@gmail.com.`);
          }
          form.reset();
        }
      } catch (err) {
        console.warn('AJAX contact submission error:', err);
      }
    }

    // 2. Client-side fallback: Pre-fills email to Info.urbanarchitects@gmail.com
    if (!ajaxHandled) {
      const subject = encodeURIComponent(`Architecture Enquiry from ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nProject Requirements / Message:\n${message}\n\n--\nSent via Urban Architects Website`
      );
      window.location.href = `mailto:Info.urbanarchitects@gmail.com?subject=${subject}&body=${body}`;

      if (statusBox) {
        statusBox.style.display = 'block';
        statusBox.style.backgroundColor = '#fffbeb';
        statusBox.style.border = '1px solid #E2882B';
        statusBox.style.color = '#92400e';
        statusBox.innerHTML = `<strong>Enquiry Prepared!</strong> Opening your email client to forward directly to <em>Info.urbanarchitects@gmail.com</em>.`;
      }
      form.reset();
    }

    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
    }
  });
}


