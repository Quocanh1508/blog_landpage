/**
 * BLOQ Saigon Landing Page Logical Engine
 * Handles State management, Admin actions, Dynamic rendering, and CSS transitions.
 */

(function () {
  // Global State
  let state = {};
  let isAdmin = false;
  let currentBgUrl = "";
  let currentBgType = "";
  let firebaseReady = false;
  let configRef = null;

  // Slideshow state
  let slideshowTimer = null;
  let slideshowIndex = 0;
  let slideshowEditList = []; // temp list while editing in admin modal

  // ==========================================================================
  // Firebase Setup
  // ==========================================================================
  const firebaseConfig = {
    apiKey: "AIzaSyBuJpN8WK6Blde2mBZwmaYmcKokF8d57so",
    authDomain: "bloq-36312.firebaseapp.com",
    databaseURL: "https://bloq-36312-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "bloq-36312",
    storageBucket: "bloq-36312.firebasestorage.app",
    messagingSenderId: "348658092099",
    appId: "1:348658092099:web:1596b06b1b53178caeacf6"
  };

  function initFirebase() {
    try {
      firebase.initializeApp(firebaseConfig);
      configRef = firebase.database().ref("config");
      firebaseReady = true;
      console.log("Firebase connected.");
    } catch (err) {
      console.error("Firebase init failed, running in offline mode:", err);
      firebaseReady = false;
    }
  }

  // DOM Elements Cache
  const els = {
    bgVideo: document.getElementById("bg-video"),
    bgImage: document.getElementById("bg-image"),
    bgImageNext: document.getElementById("bg-image-next"),
    siteLogo: document.getElementById("site-logo"),
    siteTitle: document.getElementById("site-title"),
    siteTagline: document.getElementById("site-tagline"),
    facebookLink: document.getElementById("facebook-link"),
    instagramLink: document.getElementById("instagram-link"),
    
    // Sidebar
    navSidebar: document.getElementById("nav-sidebar"),
    menuToggleBtn: document.getElementById("menu-toggle-btn"),
    sidebarCloseBtn: document.getElementById("sidebar-close-btn"),
    navLinkBtns: document.querySelectorAll(".nav-link-btn"),

    // Sections
    overlayPanels: document.querySelectorAll(".overlay-panel"),
    aboutTitle: document.getElementById("about-title"),
    aboutSubtitle: document.getElementById("about-subtitle"),
    aboutDesc: document.getElementById("about-desc"),
    aboutImg: document.getElementById("about-img"),

    leasingTitle: document.getElementById("leasing-title"),
    leasingSubtitle: document.getElementById("leasing-subtitle"),
    leasingDesc: document.getElementById("leasing-desc"),
    leasingEmail: document.getElementById("leasing-email"),
    leasingPhone: document.getElementById("leasing-phone"),
    leasingImg: document.getElementById("leasing-img"),

    shopsGrid: document.getElementById("shops-grid"),
    eventsListContainer: document.getElementById("events-list-container"),

    // Modals
    adminLoginModal: document.getElementById("admin-login-modal"),
    adminLoginTrigger: document.getElementById("admin-login-trigger"),
    closeLoginBtn: document.getElementById("close-login-btn"),
    cancelLoginBtn: document.getElementById("cancel-login-btn"),
    loginForm: document.getElementById("login-form"),
    adminPasswordInput: document.getElementById("admin-password"),

    // Admin Bar
    adminControlBar: document.getElementById("admin-control-bar"),
    adminEditGeneralBtn: document.getElementById("admin-edit-general-btn"),
    adminExportBtn: document.getElementById("admin-export-btn"),
    adminImportBtn: document.getElementById("admin-import-btn"),
    adminImportFile: document.getElementById("admin-import-file"),
    adminResetBtn: document.getElementById("admin-reset-btn"),
    adminLogoutBtn: document.getElementById("admin-logout-btn"),

    // Toast Container
    toastContainer: document.getElementById("toast-container"),

    // General edit modal
    generalEditModal: document.getElementById("general-edit-modal"),
    generalEditForm: document.getElementById("general-edit-form"),
    editSiteTitle: document.getElementById("edit-site-title"),
    editSiteTagline: document.getElementById("edit-site-tagline"),
    editLogoUrl: document.getElementById("edit-logo-url"),
    editDesktopBg: document.getElementById("edit-desktop-bg"),
    editDesktopBgType: document.getElementById("edit-desktop-bg-type"),
    editMobileBg: document.getElementById("edit-mobile-bg"),
    editMobileBgType: document.getElementById("edit-mobile-bg-type"),
    editFacebookUrl: document.getElementById("edit-facebook-url"),
    editInstagramUrl: document.getElementById("edit-instagram-url"),

    // Shop edit modal
    shopEditModal: document.getElementById("shop-edit-modal"),
    shopModalTitle: document.getElementById("shop-modal-title"),
    shopEditForm: document.getElementById("shop-edit-form"),
    editShopId: document.getElementById("edit-shop-id"),
    editShopName: document.getElementById("edit-shop-name"),
    editShopSubtitle: document.getElementById("edit-shop-subtitle"),
    editShopImage: document.getElementById("edit-shop-image"),
    editShopDrive: document.getElementById("edit-shop-drive"),
    editShopDesc: document.getElementById("edit-shop-desc"),
    addShopBtn: document.getElementById("add-shop-btn"),
    closeShopModalBtn: document.getElementById("close-shop-modal-btn"),
    cancelShopModalBtn: document.getElementById("cancel-shop-modal-btn"),

    // Section edit modal
    sectionEditModal: document.getElementById("section-edit-modal"),
    sectionModalTitle: document.getElementById("section-modal-title"),
    sectionEditForm: document.getElementById("section-edit-form"),
    editSectionName: document.getElementById("edit-section-name"),
    editSectionTitle: document.getElementById("edit-section-title"),
    editSectionSubtitle: document.getElementById("edit-section-subtitle"),
    editSectionImage: document.getElementById("edit-section-image"),
    editSectionDesc: document.getElementById("edit-section-desc"),
    leasingFields: document.getElementById("leasing-fields"),
    editLeasingEmail: document.getElementById("edit-leasing-email"),
    editLeasingPhone: document.getElementById("edit-leasing-phone"),
    closeSectionModalBtn: document.getElementById("close-section-modal-btn"),
    cancelSectionModalBtn: document.getElementById("cancel-section-modal-btn"),

    // Event edit modal
    eventEditModal: document.getElementById("event-edit-modal"),
    eventModalTitle: document.getElementById("event-modal-title"),
    eventEditForm: document.getElementById("event-edit-form"),
    editEventId: document.getElementById("edit-event-id"),
    editEventTitle: document.getElementById("edit-event-title"),
    editEventDate: document.getElementById("edit-event-date"),
    editEventImage: document.getElementById("edit-event-image"),
    editEventDesc: document.getElementById("edit-event-desc"),
    addEventBtn: document.getElementById("add-event-btn"),
    closeEventModalBtn: document.getElementById("close-event-modal-btn"),
    cancelEventModalBtn: document.getElementById("cancel-event-modal-btn"),

    // File Upload Inputs
    uploadLogo: document.getElementById("upload-logo"),
    uploadDesktopBg: document.getElementById("upload-desktop-bg"),
    uploadMobileBg: document.getElementById("upload-mobile-bg"),
    uploadShopImage: document.getElementById("upload-shop-image"),
    uploadSectionImage: document.getElementById("upload-section-image"),
    uploadEventImage: document.getElementById("upload-event-image"),
  };

  // ==========================================================================
  // Initialization & State Management
  // ==========================================================================
  function init() {
    initFirebase();
    loadState();
    checkAdminSession();
    renderAll();
    setupEventListeners();
    startFirebaseSync();
  }

  function loadState() {
    // Step 1: Load from localStorage for INSTANT display (no network wait)
    const cached = localStorage.getItem("bloq_saigon_config");
    if (cached) {
      try {
        state = JSON.parse(cached);
      } catch (e) {
        console.error("Error parsing local cache, using defaults", e);
        state = { ...window.DEFAULT_CONFIG };
      }
    } else {
      state = { ...window.DEFAULT_CONFIG };
    }
    // localStorage is just a fast cache now; Firebase is the source of truth
    localStorage.setItem("bloq_saigon_config", JSON.stringify(state));
  }

  function startFirebaseSync() {
    if (!firebaseReady || !configRef) return;

    // Listen for real-time updates from Firebase
    configRef.on("value", function(snapshot) {
      var firebaseData = snapshot.val();

      if (firebaseData && firebaseData.siteName) {
        // Firebase has config — use it as source of truth
        state = firebaseData;

        // Auto-upgrade Firebase config if version is older
        const latestVersion = window.DEFAULT_CONFIG.configVersion;
        if (!state.configVersion || state.configVersion < latestVersion) {
          console.log(`Upgrading Firebase config from version ${state.configVersion || 1} to ${latestVersion}`);
          state.configVersion = latestVersion;
          
          // Apply new default backgrounds if they were still using the default old ones
          if (!state.desktopBgUrl || state.desktopBgUrl.includes("mixkit.co")) {
            state.desktopBgUrl = window.DEFAULT_CONFIG.desktopBgUrl;
            state.desktopBgType = window.DEFAULT_CONFIG.desktopBgType;
          }
          if (!state.mobileBgUrl || state.mobileBgUrl.includes("unsplash.com") || state.mobileBgUrl === "assets/0522 (2)(6)-Cover.jpg") {
            state.mobileBgUrl = window.DEFAULT_CONFIG.mobileBgUrl;
            state.mobileBgType = window.DEFAULT_CONFIG.mobileBgType;
          }
          
          // Write back to Firebase
          configRef.set(state).catch(function(err) {
            console.error("Failed to auto-upgrade Firebase config:", err);
          });
        }

        localStorage.setItem("bloq_saigon_config", JSON.stringify(state));
        currentBgUrl = "";
        currentBgType = "";
        renderAll();
        console.log("Config synced from Firebase.");
      } else {
        // Firebase is empty (first time) — push defaults to Firebase
        console.log("Firebase empty, pushing defaults...");
        configRef.set(state).then(function() {
          console.log("Defaults pushed to Firebase.");
        }).catch(function(err) {
          console.error("Failed to push defaults to Firebase:", err);
        });
      }
    }, function(err) {
      console.error("Firebase listener error:", err);
    });
  }

  function saveState() {
    // Save to localStorage (instant, offline cache)
    localStorage.setItem("bloq_saigon_config", JSON.stringify(state));

    // Save to Firebase (cloud sync to all devices)
    if (firebaseReady && configRef) {
      configRef.set(state).catch(function(err) {
        console.error("Firebase save error:", err);
        showToast("Cloud sync failed. Changes saved locally only.", "error");
      });
    }
  }

  function checkAdminSession() {
    const session = sessionStorage.getItem("bloq_admin_active");
    if (session === "true") {
      isAdmin = true;
      document.body.classList.add("admin-logged-in");
    } else {
      isAdmin = false;
      document.body.classList.remove("admin-logged-in");
    }
  }

  // ==========================================================================
  // Toast Notifications
  // ==========================================================================
  function showToast(message, type = "success") {
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    
    // Simple inline icon representation
    let iconSvg = "";
    if (type === "success") {
      iconSvg = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
    } else if (type === "error") {
      iconSvg = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`;
    } else {
      iconSvg = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;
    }

    toast.innerHTML = `${iconSvg} <span>${message}</span>`;
    els.toastContainer.appendChild(toast);

    // Fade in
    setTimeout(() => {
      toast.classList.add("show");
    }, 10);

    // Fade out and remove
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => {
        toast.remove();
      }, 400);
    }, 3200);
  }

  // Helper for reading local files as Data URLs
  function handleLocalFileUpload(fileInput, textInput, fileType) {
    const file = fileInput.files[0];
    if (!file) return;

    const sizeInMB = file.size / (1024 * 1024);

    // Hard limit check (4.5 MB)
    if (sizeInMB > 4.5) {
      showToast(`File is too large (${sizeInMB.toFixed(2)} MB). Firebase limit is 4.5MB for base64 uploads. Please compress it or use an online URL.`, "error");
      fileInput.value = ""; // Clear file selector
      return;
    }

    // Warnings
    if (fileType === "video" && sizeInMB > 1.5) {
      showToast(`Warning: Video is ${sizeInMB.toFixed(2)} MB. Large base64 uploads will slow down website loading on mobile.`, "error");
    } else if (fileType === "image" && sizeInMB > 1.0) {
      showToast(`Warning: Image is ${sizeInMB.toFixed(2)} MB. Compressed images (<500KB) or external URLs are highly recommended.`, "error");
    }

    const reader = new FileReader();
    reader.onload = function(e) {
      textInput.value = e.target.result;
      showToast("File processed successfully. Remember to click Save/Apply!");
    };
    reader.onerror = function() {
      showToast("Failed to read local file.", "error");
    };
    reader.readAsDataURL(file);
  }

  // Auto-convert standard Google Drive and Dropbox links to direct rendering URLs
  function convertGoogleDriveLink(url, fileType = "image") {
    if (!url) return "";
    
    // 1. Google Drive Conversion
    const driveRegex = /(?:\/file\/d\/|\/open\?id=|\/d\/|\/file\/)([a-zA-Z0-9_-]{25,})/;
    const match = url.match(driveRegex);
    if (match && match[1]) {
      const fileId = match[1];
      if (fileType === "video") {
        return `https://drive.google.com/uc?export=download&id=${fileId}`;
      } else {
        return `https://lh3.googleusercontent.com/d/${fileId}`;
      }
    }

    // 2. Dropbox Conversion
    if (url.includes("dropbox.com")) {
      if (url.includes("dl=0")) {
        return url.replace("dl=0", "raw=1");
      } else if (url.includes("dl=1")) {
        return url.replace("dl=1", "raw=1");
      } else if (!url.includes("raw=1")) {
        const separator = url.includes("?") ? "&" : "?";
        return `${url}${separator}raw=1`;
      }
    }
    
    return url;
  }

  // ==========================================================================
  // Rendering Functions
  // ==========================================================================
  function renderAll() {
    renderBranding();
    renderAboutSection();
    renderLeasingSection();
    renderShops();
    renderEvents();
  }

  function renderBranding() {
    // Text branding
    els.siteLogo.src = state.logoUrl;
    els.siteTitle.textContent = state.siteName;
    els.siteTagline.textContent = state.siteTagline;

    // Social links
    els.facebookLink.href = state.facebookUrl;
    els.instagramLink.href = state.instagramUrl;

    // Background rendering
    updateBackground();
  }

  function updateBackground(forceRefresh) {
    const isMobile = window.innerWidth < 768;
    
    // Auto-migrate legacy configuration if loading from older browser cache
    if (!state.desktopBgUrl && state.videoUrl) {
      state.desktopBgUrl = state.videoUrl;
      state.desktopBgType = "video";
      state.mobileBgUrl = state.videoUrl;
      state.mobileBgType = "video";
      delete state.videoUrl;
      saveState();
    }

    const bgUrl = isMobile ? state.mobileBgUrl : state.desktopBgUrl;
    const bgType = isMobile ? state.mobileBgType : state.desktopBgType;

    // Check if background URL or Type changed (skip cache check on force refresh)
    if (!forceRefresh && bgUrl === currentBgUrl && bgType === currentBgType) return;

    currentBgUrl = bgUrl;
    currentBgType = bgType;

    // Stop any existing slideshow timer
    stopSlideshow();

    if (bgType === "slideshow" && !isMobile) {
      // === SLIDESHOW MODE ===
      els.bgVideo.style.opacity = "0";
      els.bgVideo.pause();
      els.bgVideo.removeAttribute("src");
      els.bgImageNext.style.opacity = "0";

      const slides = state.desktopSlideshow || [];
      if (slides.length === 0) {
        // No slides — show fallback
        els.bgImage.style.backgroundImage = "url('assets/0522 (2)(6)-Cover.jpg')";
        els.bgImage.style.opacity = "1";
        return;
      }

      // Show first slide immediately
      slideshowIndex = 0;
      els.bgImage.style.backgroundImage = `url('${slides[0]}')`;
      els.bgImage.style.opacity = "1";

      if (slides.length > 1) {
        startSlideshow(slides);
      }
    } else if (bgType === "video") {
      // === VIDEO MODE ===
      els.bgImageNext.style.opacity = "0";
      const loadingImg = "assets/0522 (2)(6)-Cover.jpg";
      els.bgImage.style.backgroundImage = `url('${loadingImg}')`;
      els.bgImage.style.opacity = "1";

      els.bgVideo.style.opacity = "0";
      els.bgVideo.src = bgUrl;
      els.bgVideo.load();
      
      var fallbackTriggered = false;
      const videoFallback = function() {
        if (fallbackTriggered) return;
        fallbackTriggered = true;
        console.log("Video failed to load/play, falling back to image background.");
        els.bgVideo.style.opacity = "0";
        els.bgVideo.pause();
        els.bgImage.style.opacity = "1";
      };
      
      const handlePlaySuccess = function() {
        if (fallbackTriggered) return;
        els.bgVideo.style.opacity = "1";
        els.bgImage.style.opacity = "0";
      };

      els.bgVideo.onerror = videoFallback;
      
      els.bgVideo.oncanplay = function() {
        els.bgVideo.play()
          .then(handlePlaySuccess)
          .catch(function(err) {
            console.log("Autoplay blocked on canplay, will play on user touch.", err);
          });
      };
      
      els.bgVideo.play()
        .then(handlePlaySuccess)
        .catch(function(err) {
          console.log("Initial autoplay attempt deferred:", err);
        });
      
      var touchPlayHandler = function() {
        if (els.bgVideo.paused && els.bgVideo.style.opacity !== "1") {
          els.bgVideo.play()
            .then(handlePlaySuccess)
            .catch(function() {});
        }
        document.removeEventListener("touchstart", touchPlayHandler);
        document.removeEventListener("click", touchPlayHandler);
      };
      document.addEventListener("touchstart", touchPlayHandler, { once: true });
      document.addEventListener("click", touchPlayHandler, { once: true });
      
      setTimeout(function() {
        if (els.bgVideo.paused && els.bgVideo.style.opacity === "0" && !fallbackTriggered) {
          console.log("Video still not playing after timeout, showing fallback.");
          videoFallback();
        }
      }, 8000);
    } else {
      // === IMAGE MODE ===
      els.bgVideo.style.opacity = "0";
      els.bgVideo.pause();
      els.bgVideo.removeAttribute("src");
      els.bgImageNext.style.opacity = "0";

      els.bgImage.style.backgroundImage = `url('${bgUrl}')`;
      els.bgImage.style.opacity = "1";
    }
  }

  // ==========================================================================
  // Slideshow Engine
  // ==========================================================================
  function startSlideshow(slides) {
    const interval = (state.slideshowInterval || 60) * 1000;

    slideshowTimer = setInterval(function() {
      slideshowIndex = (slideshowIndex + 1) % slides.length;
      const nextUrl = slides[slideshowIndex];

      // Preload the next image
      const preloader = new Image();
      preloader.onload = function() {
        // Set next image on the hidden layer, then cross-fade
        els.bgImageNext.style.backgroundImage = `url('${nextUrl}')`;
        els.bgImageNext.style.opacity = "1";
        els.bgImage.style.opacity = "0";

        // After transition completes, swap layers
        setTimeout(function() {
          els.bgImage.style.backgroundImage = `url('${nextUrl}')`;
          els.bgImage.style.opacity = "1";
          els.bgImageNext.style.opacity = "0";
        }, 1600); // slightly longer than the CSS transition (1.5s)
      };
      preloader.src = nextUrl;
    }, interval);
  }

  function stopSlideshow() {
    if (slideshowTimer) {
      clearInterval(slideshowTimer);
      slideshowTimer = null;
    }
  }

  function renderAboutSection() {
    els.aboutTitle.textContent = state.aboutUs.title;
    els.aboutSubtitle.textContent = state.aboutUs.subtitle;
    els.aboutDesc.textContent = state.aboutUs.description;
    els.aboutImg.src = state.aboutUs.image;
  }

  function renderLeasingSection() {
    els.leasingTitle.textContent = state.leasing.title;
    els.leasingSubtitle.textContent = state.leasing.subtitle;
    els.leasingDesc.textContent = state.leasing.description;
    els.leasingEmail.textContent = state.leasing.email;
    els.leasingPhone.textContent = state.leasing.phone;
    els.leasingImg.src = state.leasing.image;
  }

  function renderShops() {
    els.shopsGrid.innerHTML = "";

    if (state.shops.length === 0) {
      els.shopsGrid.innerHTML = `<p class="section-text" style="text-align: center; grid-column: span 2;">No shops available. Log in as admin to add some!</p>`;
      return;
    }

    state.shops.forEach(shop => {
      // Create shop card
      const card = document.createElement("div");
      card.className = "shop-card";
      
      // We open Drive URL on card click, EXCEPT if clicked on admin controls
      card.addEventListener("click", (e) => {
        if (e.target.closest(".admin-action-btn")) return; // Don't redirect on admin action click
        window.open(shop.driveUrl, "_blank", "noopener,noreferrer");
      });

      let adminControls = "";
      if (isAdmin) {
        adminControls = `
          <div class="admin-edit-placeholder" style="display: flex; gap: 0.5rem; margin-top: 1rem;">
            <button class="admin-action-btn edit-btn edit-shop-btn-trigger" data-id="${shop.id}">Edit</button>
            <button class="admin-action-btn delete-btn delete-shop-btn-trigger" data-id="${shop.id}">Delete</button>
          </div>
        `;
      }

      card.innerHTML = `
        <div class="shop-card-visual">
          <img src="${shop.image}" alt="${shop.name}" class="shop-card-img" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600'">
        </div>
        <div class="shop-card-content">
          <h3 class="shop-card-title">${shop.name}</h3>
          <h4 class="shop-card-subtitle">${shop.subtitle}</h4>
          <p class="shop-card-desc">${shop.description}</p>
          <div class="shop-card-action">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
            </svg>
            Click here for menu (Google Drive PDF)
          </div>
          ${adminControls}
        </div>
      `;

      els.shopsGrid.appendChild(card);
    });

    // Wire up triggers inside newly rendered shop cards
    if (isAdmin) {
      document.querySelectorAll(".edit-shop-btn-trigger").forEach(btn => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          const shopId = btn.getAttribute("data-id");
          openShopEditModal(shopId);
        });
      });

      document.querySelectorAll(".delete-shop-btn-trigger").forEach(btn => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          const shopId = btn.getAttribute("data-id");
          deleteShop(shopId);
        });
      });
    }
  }

  function renderEvents() {
    els.eventsListContainer.innerHTML = "";

    if (state.events.length === 0) {
      els.eventsListContainer.innerHTML = `<p class="section-text" style="text-align: center;">No events scheduled. Log in as admin to add some!</p>`;
      return;
    }

    state.events.forEach(event => {
      const card = document.createElement("div");
      card.className = "event-card";

      let adminControls = "";
      if (isAdmin) {
        adminControls = `
          <div class="admin-edit-placeholder" style="display: flex; gap: 0.5rem; margin-top: 1rem;">
            <button class="admin-action-btn edit-btn edit-event-btn-trigger" data-id="${event.id}">Edit</button>
            <button class="admin-action-btn delete-btn delete-event-btn-trigger" data-id="${event.id}">Delete</button>
          </div>
        `;
      }

      card.innerHTML = `
        <div class="event-visual">
          <img src="${event.image}" alt="${event.title}" class="event-img" onerror="this.src='https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600'">
        </div>
        <div class="event-info">
          <h3 class="event-title">${event.title}</h3>
          <div class="event-date">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            ${event.date}
          </div>
          <p class="event-desc">${event.description}</p>
          ${adminControls}
        </div>
      `;

      els.eventsListContainer.appendChild(card);
    });

    if (isAdmin) {
      document.querySelectorAll(".edit-event-btn-trigger").forEach(btn => {
        btn.addEventListener("click", (e) => {
          const eventId = btn.getAttribute("data-id");
          openEventEditModal(eventId);
        });
      });

      document.querySelectorAll(".delete-event-btn-trigger").forEach(btn => {
        btn.addEventListener("click", (e) => {
          const eventId = btn.getAttribute("data-id");
          deleteEvent(eventId);
        });
      });
    }
  }

  // ==========================================================================
  // Sidebar & Navigation Transitions
  // ==========================================================================
  function openSidebar() {
    els.navSidebar.classList.add("open");
  }

  function closeSidebar() {
    els.navSidebar.classList.remove("open");
  }

  function openPanel(panelId) {
    closeSidebar();
    
    // Close any other open panels first
    els.overlayPanels.forEach(panel => {
      panel.classList.remove("open");
    });

    const targetPanel = document.getElementById(panelId);
    if (targetPanel) {
      targetPanel.classList.add("open");
    }
  }

  function closePanel(panel) {
    panel.classList.remove("open");
  }

  function closeAllPanels() {
    els.overlayPanels.forEach(panel => {
      panel.classList.remove("open");
    });
  }

  // ==========================================================================
  // Admin Authentication Logic
  // ==========================================================================
  function openLoginModal() {
    els.adminLoginModal.classList.add("open");
    els.adminPasswordInput.value = "";
    setTimeout(() => els.adminPasswordInput.focus(), 100);
  }

  function closeLoginModal() {
    els.adminLoginModal.classList.remove("open");
  }

  function handleLogin(e) {
    e.preventDefault();
    const password = els.adminPasswordInput.value;
    
    // Check credentials: admin / bloqthaodien
    if (password === "bloqthaodien") {
      isAdmin = true;
      sessionStorage.setItem("bloq_admin_active", "true");
      document.body.classList.add("admin-logged-in");
      closeLoginModal();
      renderAll();
      showToast("Access Granted. BLOQ CMS enabled.");
    } else {
      showToast("Incorrect Password!", "error");
      els.adminPasswordInput.select();
    }
  }

  function handleLogout() {
    isAdmin = false;
    sessionStorage.removeItem("bloq_admin_active");
    document.body.classList.remove("admin-logged-in");
    renderAll();
    showToast("Logged out from admin session.", "info");
  }

  // ==========================================================================
  // Admin Editing Actions
  // ==========================================================================
  
  // A. General configuration (Branding)
  function openGeneralEditModal() {
    els.editSiteTitle.value = state.siteName;
    els.editSiteTagline.value = state.siteTagline;
    els.editLogoUrl.value = state.logoUrl;
    els.editDesktopBg.value = state.desktopBgUrl || "";
    els.editDesktopBgType.value = state.desktopBgType || "video";
    els.editMobileBg.value = state.mobileBgUrl || "";
    els.editMobileBgType.value = state.mobileBgType || "video";
    els.editFacebookUrl.value = state.facebookUrl;
    els.editInstagramUrl.value = state.instagramUrl;

    // Initialize slideshow edit list
    slideshowEditList = (state.desktopSlideshow || []).slice();
    var intervalInput = document.getElementById("edit-slideshow-interval");
    if (intervalInput) intervalInput.value = state.slideshowInterval || 60;
    renderSlideshowEditList();
    toggleDesktopBgMode();

    els.generalEditModal.classList.add("open");
  }

  function closeGeneralEditModal() {
    els.generalEditModal.classList.remove("open");
  }

  function toggleDesktopBgMode() {
    var type = els.editDesktopBgType.value;
    var singleEl = document.getElementById("desktop-bg-single");
    var slideshowEl = document.getElementById("desktop-slideshow-manager");
    if (type === "slideshow") {
      singleEl.style.display = "none";
      slideshowEl.style.display = "block";
    } else {
      singleEl.style.display = "flex";
      slideshowEl.style.display = "none";
    }
  }

  function renderSlideshowEditList() {
    var listEl = document.getElementById("slideshow-list");
    if (!listEl) return;
    listEl.innerHTML = "";

    if (slideshowEditList.length === 0) {
      listEl.innerHTML = '<p style="color: var(--text-muted); font-size: 0.85rem; text-align: center; padding: 1rem 0;">No slides added yet. Add image URLs below.</p>';
      return;
    }

    slideshowEditList.forEach(function(url, i) {
      var item = document.createElement("div");
      item.className = "slideshow-item";
      var shortUrl = url.length > 50 ? url.substring(0, 50) + "..." : url;
      item.innerHTML = `
        <span class="slideshow-item-num">${i + 1}</span>
        <img class="slideshow-item-thumb" src="${url}" alt="Slide ${i + 1}" onerror="this.style.display='none'">
        <span class="slideshow-item-url" title="${url}">${shortUrl}</span>
        <button type="button" class="slideshow-item-remove" data-index="${i}">&times;</button>
      `;
      listEl.appendChild(item);
    });

    // Attach remove handlers
    listEl.querySelectorAll(".slideshow-item-remove").forEach(function(btn) {
      btn.addEventListener("click", function(e) {
        e.preventDefault();
        var idx = parseInt(btn.getAttribute("data-index"));
        slideshowEditList.splice(idx, 1);
        renderSlideshowEditList();
      });
    });
  }

  function addSlideshowImage() {
    var input = document.getElementById("slideshow-new-url");
    var url = input.value.trim();
    if (!url) {
      showToast("Please enter an image URL.", "error");
      return;
    }
    url = convertGoogleDriveLink(url, "image");
    slideshowEditList.push(url);
    input.value = "";
    renderSlideshowEditList();
    showToast(`Slide #${slideshowEditList.length} added.`);
  }

  function saveGeneralEdit(e) {
    e.preventDefault();
    state.siteName = els.editSiteTitle.value.trim();
    state.siteTagline = els.editSiteTagline.value.trim();
    state.logoUrl = convertGoogleDriveLink(els.editLogoUrl.value.trim(), "image");
    
    // Save separate desktop and mobile backgrounds
    const desktopType = els.editDesktopBgType.value;
    const mobileType = els.editMobileBgType.value;
    
    if (desktopType === "slideshow") {
      state.desktopBgType = "slideshow";
      state.desktopSlideshow = slideshowEditList.slice();
      var intervalInput = document.getElementById("edit-slideshow-interval");
      state.slideshowInterval = parseInt(intervalInput.value) || 60;
      // Set desktopBgUrl to first slide for compatibility
      state.desktopBgUrl = slideshowEditList.length > 0 ? slideshowEditList[0] : "";
    } else {
      state.desktopBgUrl = convertGoogleDriveLink(els.editDesktopBg.value.trim(), desktopType);
      state.desktopBgType = desktopType;
    }
    
    state.mobileBgUrl = convertGoogleDriveLink(els.editMobileBg.value.trim(), mobileType);
    state.mobileBgType = mobileType;
    
    state.facebookUrl = els.editFacebookUrl.value.trim();
    state.instagramUrl = els.editInstagramUrl.value.trim();
    
    saveState();
    
    // Reset background cache so both desktop and mobile configs take effect
    currentBgUrl = "";
    currentBgType = "";
    renderBranding();
    closeGeneralEditModal();
    showToast("Branding settings saved.");
  }

  // B. Shops
  function openShopEditModal(shopId = "") {
    if (shopId) {
      // Edit mode
      const shop = state.shops.find(s => s.id === shopId);
      if (!shop) return;
      els.shopModalTitle.textContent = "Edit Shop Details";
      els.editShopId.value = shop.id;
      els.editShopName.value = shop.name;
      els.editShopSubtitle.value = shop.subtitle;
      els.editShopImage.value = shop.image;
      els.editShopDrive.value = shop.driveUrl;
      els.editShopDesc.value = shop.description;
    } else {
      // Add mode
      els.shopModalTitle.textContent = "Add New Shop";
      els.editShopId.value = "";
      els.editShopName.value = "";
      els.editShopSubtitle.value = "";
      els.editShopImage.value = "";
      els.editShopDrive.value = "";
      els.editShopDesc.value = "";
    }
    els.shopEditModal.classList.add("open");
  }

  function closeShopEditModal() {
    els.shopEditModal.classList.remove("open");
  }

  function saveShop(e) {
    e.preventDefault();
    const id = els.editShopId.value;
    const shopData = {
      name: els.editShopName.value.trim(),
      subtitle: els.editShopSubtitle.value.trim(),
      image: convertGoogleDriveLink(els.editShopImage.value.trim(), "image"),
      driveUrl: els.editShopDrive.value.trim(),
      description: els.editShopDesc.value.trim()
    };

    if (id) {
      // Update
      const index = state.shops.findIndex(s => s.id === id);
      if (index !== -1) {
        state.shops[index] = { ...state.shops[index], ...shopData };
        showToast("Shop profile updated.");
      }
    } else {
      // Create
      shopData.id = "shop-" + Date.now();
      state.shops.push(shopData);
      showToast("New shop added.");
    }

    saveState();
    renderShops();
    closeShopEditModal();
  }

  function deleteShop(shopId) {
    const shop = state.shops.find(s => s.id === shopId);
    if (!shop) return;
    
    if (confirm(`Are you sure you want to delete shop "${shop.name}"?`)) {
      state.shops = state.shops.filter(s => s.id !== shopId);
      saveState();
      renderShops();
      showToast(`Shop "${shop.name}" deleted.`, "error");
    }
  }

  // C. Sections (About Us & Leasing)
  function openSectionEditModal(sectionKey) {
    els.editSectionName.value = sectionKey;
    els.leasingFields.style.display = sectionKey === "leasing" ? "grid" : "none";

    if (sectionKey === "about") {
      els.sectionModalTitle.textContent = "Edit About Us Section";
      els.editSectionTitle.value = state.aboutUs.title;
      els.editSectionSubtitle.value = state.aboutUs.subtitle;
      els.editSectionImage.value = state.aboutUs.image;
      els.editSectionDesc.value = state.aboutUs.description;
    } else if (sectionKey === "leasing") {
      els.sectionModalTitle.textContent = "Edit Leasing Section";
      els.editSectionTitle.value = state.leasing.title;
      els.editSectionSubtitle.value = state.leasing.subtitle;
      els.editSectionImage.value = state.leasing.image;
      els.editSectionDesc.value = state.leasing.description;
      els.editLeasingEmail.value = state.leasing.email;
      els.editLeasingPhone.value = state.leasing.phone;
    }
    
    els.sectionEditModal.classList.add("open");
  }

  function closeSectionEditModal() {
    els.sectionEditModal.classList.remove("open");
  }

  function saveSection(e) {
    e.preventDefault();
    const sectionKey = els.editSectionName.value;
    
    if (sectionKey === "about") {
      state.aboutUs.title = els.editSectionTitle.value.trim();
      state.aboutUs.subtitle = els.editSectionSubtitle.value.trim();
      state.aboutUs.image = convertGoogleDriveLink(els.editSectionImage.value.trim(), "image");
      state.aboutUs.description = els.editSectionDesc.value.trim();
      renderAboutSection();
    } else if (sectionKey === "leasing") {
      state.leasing.title = els.editSectionTitle.value.trim();
      state.leasing.subtitle = els.editSectionSubtitle.value.trim();
      state.leasing.image = convertGoogleDriveLink(els.editSectionImage.value.trim(), "image");
      state.leasing.description = els.editSectionDesc.value.trim();
      state.leasing.email = els.editLeasingEmail.value.trim();
      state.leasing.phone = els.editLeasingPhone.value.trim();
      renderLeasingSection();
    }

    saveState();
    closeSectionEditModal();
    showToast("Section updated successfully.");
  }

  // D. Events
  function openEventEditModal(eventId = "") {
    if (eventId) {
      // Edit mode
      const event = state.events.find(e => e.id === eventId);
      if (!event) return;
      els.eventModalTitle.textContent = "Edit Event Details";
      els.editEventId.value = event.id;
      els.editEventTitle.value = event.title;
      els.editEventDate.value = event.date;
      els.editEventImage.value = event.image;
      els.editEventDesc.value = event.description;
    } else {
      // Add mode
      els.eventModalTitle.textContent = "Add New Event";
      els.editEventId.value = "";
      els.editEventTitle.value = "";
      els.editEventDate.value = "";
      els.editEventImage.value = "";
      els.editEventDesc.value = "";
    }
    els.eventEditModal.classList.add("open");
  }

  function closeEventEditModal() {
    els.eventEditModal.classList.remove("open");
  }

  function saveEvent(e) {
    e.preventDefault();
    const id = els.editEventId.value;
    const eventData = {
      title: els.editEventTitle.value.trim(),
      date: els.editEventDate.value.trim(),
      image: convertGoogleDriveLink(els.editEventImage.value.trim(), "image"),
      description: els.editEventDesc.value.trim()
    };

    if (id) {
      // Update
      const index = state.events.findIndex(e => e.id === id);
      if (index !== -1) {
        state.events[index] = { ...state.events[index], ...eventData };
        showToast("Event updated.");
      }
    } else {
      // Create
      eventData.id = "event-" + Date.now();
      state.events.push(eventData);
      showToast("New event scheduled.");
    }

    saveState();
    renderEvents();
    closeEventEditModal();
  }

  function deleteEvent(eventId) {
    const event = state.events.find(e => e.id === eventId);
    if (!event) return;

    if (confirm(`Are you sure you want to delete event "${event.title}"?`)) {
      state.events = state.events.filter(e => e.id !== eventId);
      saveState();
      renderEvents();
      showToast(`Event deleted.`, "error");
    }
  }

  // E. Backup & Restore CMS System
  function exportConfig() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "bloq_saigon_config.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("Configuration file exported.");
  }

  function triggerImport() {
    els.adminImportFile.click();
  }

  function handleImport(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (event) {
      try {
        const importedData = JSON.parse(event.target.result);
        
        // Simple structural checks
        if (importedData.siteName && importedData.shops && Array.isArray(importedData.shops)) {
          state = importedData;
          // Reset background cache so imported config applies correctly
          currentBgUrl = "";
          currentBgType = "";
          saveState();
          renderAll();
          showToast("Configuration imported successfully!");
        } else {
          showToast("Invalid config file structure!", "error");
        }
      } catch (err) {
        showToast("Error parsing JSON config!", "error");
        console.error(err);
      }
      // Clear input value so same file can be imported again
      els.adminImportFile.value = "";
    };
    reader.readAsText(file);
  }

  function resetToDefaults() {
    if (confirm("Are you sure you want to reset all modifications to default values? This cannot be undone.")) {
      state = { ...window.DEFAULT_CONFIG };
      // Reset background cache so defaults apply correctly
      currentBgUrl = "";
      currentBgType = "";
      saveState();
      renderAll();
      showToast("Reset to default demo values.", "info");
    }
  }

  // ==========================================================================
  // Event Listeners Mapping
  // ==========================================================================
  function setupEventListeners() {
    // Unblock video autoplay on mobile devices upon the first user interaction
    const unblockAutoplay = () => {
      if (els.bgVideo && els.bgVideo.paused) {
        els.bgVideo.play().catch(err => {
          console.log("Autoplay unblock failed:", err);
        });
      }
    };
    document.addEventListener("click", unblockAutoplay, { once: true });
    document.addEventListener("touchstart", unblockAutoplay, { once: true });

    // Menu Sidebar buttons
    els.menuToggleBtn.addEventListener("click", openSidebar);
    els.sidebarCloseBtn.addEventListener("click", closeSidebar);

    // Nav Links (Sidebar -> Panel slide open)
    els.navLinkBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const targetPanelId = btn.getAttribute("data-target");
        openPanel(targetPanelId);
      });
    });

    // Panel Back/Close Buttons
    els.overlayPanels.forEach(panel => {
      const backBtn = panel.querySelector(".panel-back-btn");
      const closeBtn = panel.querySelector(".panel-close-btn");

      if (backBtn) {
        backBtn.addEventListener("click", () => {
          closePanel(panel);
          openSidebar();
        });
      }

      if (closeBtn) {
        closeBtn.addEventListener("click", () => {
          closePanel(panel);
        });
      }
    });

    // Admin Auth triggers
    els.adminLoginTrigger.addEventListener("click", openLoginModal);
    els.closeLoginBtn.addEventListener("click", closeLoginModal);
    els.cancelLoginBtn.addEventListener("click", closeLoginModal);
    els.loginForm.addEventListener("submit", handleLogin);
    els.adminLogoutBtn.addEventListener("click", handleLogout);

    // Admin CMS Toolbar actions
    els.adminEditGeneralBtn.addEventListener("click", openGeneralEditModal);
    els.adminExportBtn.addEventListener("click", exportConfig);
    els.adminImportBtn.addEventListener("click", triggerImport);
    els.adminImportFile.addEventListener("change", handleImport);
    els.adminResetBtn.addEventListener("click", resetToDefaults);

    // Edit branding triggers (inline double-click or click)
    els.siteLogo.addEventListener("click", () => {
      if (isAdmin) openGeneralEditModal();
    });
    els.siteTitle.addEventListener("click", () => {
      if (isAdmin) openGeneralEditModal();
    });
    els.siteTagline.addEventListener("click", () => {
      if (isAdmin) openGeneralEditModal();
    });

    // Form close triggers
    document.querySelectorAll(".general-edit-close").forEach(btn => {
      btn.addEventListener("click", closeGeneralEditModal);
    });
    els.generalEditForm.addEventListener("submit", saveGeneralEdit);

    // Desktop bg type toggle (show/hide slideshow manager)
    els.editDesktopBgType.addEventListener("change", toggleDesktopBgMode);

    // Slideshow admin controls
    var slideshowAddBtn = document.getElementById("slideshow-add-btn");
    if (slideshowAddBtn) {
      slideshowAddBtn.addEventListener("click", addSlideshowImage);
    }
    var uploadSlideshowImg = document.getElementById("upload-slideshow-img");
    if (uploadSlideshowImg) {
      uploadSlideshowImg.addEventListener("change", function() {
        var newUrlInput = document.getElementById("slideshow-new-url");
        handleLocalFileUpload(uploadSlideshowImg, newUrlInput, "image");
      });
    }

    // Shop editing triggers
    els.addShopBtn.addEventListener("click", () => openShopEditModal());
    els.closeShopModalBtn.addEventListener("click", closeShopEditModal);
    els.cancelShopModalBtn.addEventListener("click", closeShopEditModal);
    els.shopEditForm.addEventListener("submit", saveShop);

    // Event editing triggers
    els.addEventBtn.addEventListener("click", () => openEventEditModal());
    els.closeEventModalBtn.addEventListener("click", closeEventEditModal);
    els.cancelEventModalBtn.addEventListener("click", closeEventEditModal);
    els.eventEditForm.addEventListener("submit", saveEvent);

    // Text section editing triggers
    document.querySelectorAll(".edit-section-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const section = btn.getAttribute("data-section");
        openSectionEditModal(section);
      });
    });
    els.closeSectionModalBtn.addEventListener("click", closeSectionEditModal);
    els.cancelSectionModalBtn.addEventListener("click", closeSectionEditModal);
    els.sectionEditForm.addEventListener("submit", saveSection);

    // Update background on window resize (cross Desktop/Mobile boundary)
    let resizeTimer;
    window.addEventListener("resize", function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        // Force refresh on resize so desktop/mobile switch takes effect
        currentBgUrl = "";
        currentBgType = "";
        updateBackground(true);
      }, 250);
    });

    // File upload change listeners
    if (els.uploadLogo) {
      els.uploadLogo.addEventListener("change", () => handleLocalFileUpload(els.uploadLogo, els.editLogoUrl, "image"));
    }
    if (els.uploadDesktopBg) {
      els.uploadDesktopBg.addEventListener("change", () => {
        const type = els.editDesktopBgType.value;
        handleLocalFileUpload(els.uploadDesktopBg, els.editDesktopBg, type);
      });
    }
    if (els.uploadMobileBg) {
      els.uploadMobileBg.addEventListener("change", () => {
        const type = els.editMobileBgType.value;
        handleLocalFileUpload(els.uploadMobileBg, els.editMobileBg, type);
      });
    }
    if (els.uploadShopImage) {
      els.uploadShopImage.addEventListener("change", () => handleLocalFileUpload(els.uploadShopImage, els.editShopImage, "image"));
    }
    if (els.uploadSectionImage) {
      els.uploadSectionImage.addEventListener("change", () => handleLocalFileUpload(els.uploadSectionImage, els.editSectionImage, "image"));
    }
    if (els.uploadEventImage) {
      els.uploadEventImage.addEventListener("change", () => handleLocalFileUpload(els.uploadEventImage, els.editEventImage, "image"));
    }

    // Close modals on clicking overlay background
    document.querySelectorAll(".modal-overlay").forEach(modal => {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.classList.remove("open");
        }
      });
    });

    // ESC Key to close opened panels / modals
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeSidebar();
        closeAllPanels();
        document.querySelectorAll(".modal-overlay").forEach(modal => {
          modal.classList.remove("open");
        });
      }
    });
  }

  // Run initial configuration load
  window.addEventListener("DOMContentLoaded", init);

})();
