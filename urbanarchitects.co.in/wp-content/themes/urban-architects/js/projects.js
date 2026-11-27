/**
 * URBAN ARCHITECTS - PROJECTS PAGE APPLICATION
 * Handles Category Switching, Deep-Linking (#residential, #commercial, etc.),
 * Dynamic Card Rendering with 100% Guaranteed Visibility, Hover Data Overlays,
 * and Direct Navigation to Dedicated Single Project Case Study Pages.
 */

(function () {
  'use strict';

  // Helper to resolve asset URLs across static and WordPress environments
  function resolveAsset(url) {
    if (!url) return '';
    if (/^(https?:)?\/\//i.test(url) || /^data:/i.test(url)) return url;
    const baseUrl = (window.urbanThemeData && window.urbanThemeData.themeUrl)
      ? window.urbanThemeData.themeUrl.replace(/\/+$/, '') + '/'
      : '';
    return baseUrl + url.replace(/^\/+/, '');
  }

  // Helper to get dedicated single project page URL
  function getProjectDetailUrl(projectId) {
    if (window.urbanThemeData && window.urbanThemeData.themeUrl) {
      // WordPress environment
      var base = window.urbanThemeData.homeUrl || '/';
      return base.replace(/\/+$/, '') + '/project/?id=' + encodeURIComponent(projectId);
    }
    // Static HTML environment
    return 'project-details.html?id=' + encodeURIComponent(projectId);
  }

  // Category Configuration strictly matching Homepage Disciplines
  const CATEGORY_MAP = {
    'residential': {
      title: 'Residential Architecture',
      subtitle: 'Apartments & Modern Villas',
      count: 16,
      desc: 'Bespoke modern villas, lakefront residences, apartments & architectural visualisations across India.'
    },
    'commercial': {
      title: 'Commercial & Workplaces',
      subtitle: 'Workplaces & Commercial Plazas',
      count: 3,
      desc: 'High-performance corporate headquarters, contemporary mess restaurants & commercial plazas.'
    },
    'industrial': {
      title: 'Industrial & Logistics',
      subtitle: 'Industrial Facilities & Logistics',
      count: 3,
      desc: 'PEB industrial dry storage campuses, medical oxygen manufacturing plants & landmark gateways.'
    },
    'civic': {
      title: 'Civic Landmarks & Large-Scale Townships',
      subtitle: 'Civic Landmarks & Large-Scale Townships',
      count: 1,
      desc: 'Plotted luxury villa townships, ecological masterplanning & sustainable infrastructure.'
    }
  };

  let activeCategory = 'all';

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProjectsApp);
  } else {
    initProjectsApp();
  }

  function initProjectsApp() {
    if (typeof PROJECTS_DATA === 'undefined' || !Array.isArray(PROJECTS_DATA)) {
      console.warn('PROJECTS_DATA not found');
      return;
    }

    renderCategoryCounts();
    setupCategoryEventListeners();
    setupModalEventListeners();

    // Check URL Hash or Query Param on load
    handleInitialRoute();

    // Listen for hash changes (e.g. user clicks browser back/forward or category anchor)
    window.addEventListener('hashchange', handleRouteFromHash);
  }

  function normalizeCategory(cat) {
    if (!cat) return 'all';
    cat = cat.toLowerCase().trim();
    if (cat === 'urban-planning' || cat === 'planning') return 'civic';
    return cat;
  }

  function handleInitialRoute() {
    const hash = normalizeCategory(window.location.hash.replace('#', ''));
    const urlParams = new URLSearchParams(window.location.search);
    const catParam = normalizeCategory(urlParams.get('category') || urlParams.get('cat'));

    const target = catParam || hash;
    if (target && (CATEGORY_MAP[target] || target === 'all')) {
      setActiveCategory(target, false);
      // Smooth scroll down to projects section if navigating directly
      setTimeout(() => {
        const gridElem = document.getElementById('projectsContainer');
        if (gridElem) {
          gridElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 250);
    } else {
      setActiveCategory('all', false);
    }
  }

  function handleRouteFromHash() {
    const hash = normalizeCategory(window.location.hash.replace('#', ''));
    if (hash && (CATEGORY_MAP[hash] || hash === 'all')) {
      setActiveCategory(hash, false);
    } else if (!hash) {
      setActiveCategory('all', false);
    }
  }

  function setupCategoryEventListeners() {
    // 1. Filter pill buttons
    const filterPills = document.querySelectorAll('.cat-filter-pill');
    filterPills.forEach(pill => {
      pill.addEventListener('click', (e) => {
        e.preventDefault();
        const cat = normalizeCategory(pill.getAttribute('data-category'));
        setActiveCategory(cat, true);
      });
    });

    // 2. Category Showcase Cards click
    const showcaseCards = document.querySelectorAll('.category-showcase-card');
    showcaseCards.forEach(card => {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        const cat = normalizeCategory(card.getAttribute('data-target-category'));
        if (cat) {
          setActiveCategory(cat, true);
          // Scroll smoothly to project listings
          const subpageHeader = document.getElementById('activeSubpageHeader');
          if (subpageHeader) {
            subpageHeader.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });

    // 3. Back to Categories Button
    const backBtn = document.getElementById('backToOverviewBtn');
    if (backBtn) {
      backBtn.addEventListener('click', (e) => {
        e.preventDefault();
        setActiveCategory('all', true);
        const overviewElem = document.getElementById('categoriesOverview');
        if (overviewElem) {
          overviewElem.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }

  function setActiveCategory(cat, updateHash = true) {
    activeCategory = normalizeCategory(cat || 'all');

    // Update filter pills active state
    document.querySelectorAll('.cat-filter-pill').forEach(pill => {
      const pCat = normalizeCategory(pill.getAttribute('data-category'));
      if (pCat === activeCategory) {
        pill.classList.add('active');
        pill.setAttribute('aria-selected', 'true');
      } else {
        pill.classList.remove('active');
        pill.setAttribute('aria-selected', 'false');
      }
    });

    // Update Subpage Header Info
    const subpageTitle = document.getElementById('subpageCategoryTitle');
    const subpageCount = document.getElementById('subpageCategoryCount');
    const subpageDesc = document.getElementById('subpageCategoryDesc');

    if (activeCategory === 'all') {
      if (subpageTitle) subpageTitle.textContent = 'All Selected Works';
      if (subpageCount) subpageCount.textContent = `${PROJECTS_DATA.length} Projects`;
      if (subpageDesc) subpageDesc.textContent = 'A comprehensive portfolio across residential, workplace, industrial, and urban masterplanning disciplines.';
    } else if (CATEGORY_MAP[activeCategory]) {
      const info = CATEGORY_MAP[activeCategory];
      if (subpageTitle) subpageTitle.textContent = info.subtitle || info.title;
      if (subpageCount) subpageCount.textContent = `${info.count} ${info.count === 1 ? 'Project Listed' : 'Projects Listed'}`;
      if (subpageDesc) subpageDesc.textContent = info.desc;
    }

    if (updateHash) {
      if (activeCategory === 'all') {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      } else {
        window.location.hash = activeCategory;
      }
    }

    renderProjectsGrid();
  }

  function renderCategoryCounts() {
    Object.keys(CATEGORY_MAP).forEach(key => {
      const badge = document.querySelector(`.badge-count-${key}`);
      if (badge) {
        const count = CATEGORY_MAP[key].count;
        badge.textContent = `${count} ${count === 1 ? 'Project' : 'Projects'}`;
      }
    });
  }

  function renderProjectsGrid() {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;

    grid.innerHTML = '';

    const filtered = (activeCategory === 'all')
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter(p => normalizeCategory(p.category) === activeCategory);

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="projects-empty-state" style="grid-column: 1 / -1; text-align: center; padding: 4rem 2rem;">
          <h3 style="font-family: var(--font-display, sans-serif); font-size: 1.5rem; color: #1C1A17; margin-bottom: 0.5rem;">No projects found</h3>
          <p style="color: rgba(28,26,23,0.7);">No projects match this category selection.</p>
        </div>
      `;
      return;
    }

    filtered.forEach((proj, idx) => {
      const card = document.createElement('article');
      // Guarantee 100% visibility & prevent any opacity 0 animation entrapment
      card.className = 'project-card reveal-up is-in-view';
      card.setAttribute('data-id', proj.id);
      card.setAttribute('data-category', proj.category);
      card.style.opacity = '1';
      card.style.transform = 'none';
      card.style.visibility = 'visible';

      const imgSrc = resolveAsset(`assets/projects/${proj.heroFile}`);
      const detailUrl = getProjectDetailUrl(proj.id);
      const cleanName = proj.cleanName || 'Architectural Project';
      const client = proj.client || 'Private Client';
      const size = proj.size || 'Bespoke Area';
      const location = proj.location || 'India';
      const catLabel = proj.categoryLabel || 'Architecture';
      const shortSize = proj.size ? proj.size.split('(')[0].trim() : 'Curated';
      const shortCat = catLabel.split(' ')[0];

      card.innerHTML = `
        <a href="${detailUrl}" class="project-card-link-wrapper" style="text-decoration: none; color: inherit; display: flex; flex-direction: column; height: 100%;" aria-label="View full case study for ${escapeHtml(cleanName)}">
          <div class="project-img-wrap" tabindex="0">
            <img 
              src="${imgSrc}" 
              alt="${escapeHtml(cleanName)} - ${escapeHtml(proj.title || cleanName)}"
              class="project-hero-img"
              loading="${idx < 6 ? 'eager' : 'lazy'}"
              onerror="this.src='${resolveAsset('assets/hero/priyadarshi-rendered-hero.html')}'"
            >
            
            <!-- HOVER METADATA OVERLAY (Client Name, Project Size, Location, without folder numbers) -->
            <div class="project-hover-overlay">
              <div class="hover-overlay-top">
                <span class="hover-category-tag">${escapeHtml(catLabel)}</span>
                ${proj.matterportUrl ? '<span class="hover-badge-vr">360° VR Tour</span>' : ''}
                ${proj.youtubeUrl ? '<span class="hover-badge-video">Film</span>' : ''}
              </div>
              
              <div class="hover-overlay-content">
                <h3 class="hover-project-name">${escapeHtml(cleanName)}</h3>
                
                <div class="hover-meta-list">
                  <div class="hover-meta-item">
                    <span class="hover-meta-label">Client</span>
                    <span class="hover-meta-value">${escapeHtml(client)}</span>
                  </div>
                  <div class="hover-meta-item">
                    <span class="hover-meta-label">Size</span>
                    <span class="hover-meta-value">${escapeHtml(size)}</span>
                  </div>
                  <div class="hover-meta-item">
                    <span class="hover-meta-label">Location</span>
                    <span class="hover-meta-value">${escapeHtml(location)}</span>
                  </div>
                </div>
                
                <div class="hover-action-btn">
                  <span>Open Full Case Study</span>
                  <span class="hover-arrow">&rarr;</span>
                </div>
              </div>
            </div>
          </div>

          <div class="project-card-footer">
            <div class="footer-title-row">
              <h4 class="card-clean-title">${escapeHtml(cleanName)}</h4>
              <span class="card-scope-badge">${escapeHtml(shortSize)}</span>
            </div>
            <div class="footer-meta-row">
              <span class="card-location">${escapeHtml(location)}</span>
              <span class="card-dot">&middot;</span>
              <span class="card-cat-name">${escapeHtml(shortCat)}</span>
            </div>
          </div>
        </a>
      `;

      grid.appendChild(card);
    });
  }

  function openProjectModal(proj) {
    // If modal is ever requested, navigate to full page as primary experience
    window.location.href = getProjectDetailUrl(proj.id);
  }

  function closeProjectModal() {
    const modal = document.getElementById('projectDetailModal');
    if (!modal) return;
    modal.classList.remove('is-active');
    document.body.classList.remove('modal-open');
  }

  function setupModalEventListeners() {
    const modal = document.getElementById('projectDetailModal');
    if (!modal) return;

    const closeBtn = document.getElementById('closeModalBtn');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeProjectModal);
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.classList.contains('modal-backdrop')) {
        closeProjectModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-active')) {
        closeProjectModal();
      }
    });
  }

  function escapeHtml(text) {
    if (!text) return '';
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
})();
