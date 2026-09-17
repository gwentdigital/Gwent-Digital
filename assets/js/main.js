document.documentElement.classList.add('js');

(function(){
  "use strict";

  // ---- Analytics config -------------------------------------------------
  // Set your real Google Tag Manager container ID (e.g. "GTM-ABCD123") to
  // switch analytics on. Leave the placeholder below to keep this feature
  // fully disabled (no banner, no scripts, no cookies) with zero risk of
  // shipping a broken/placeholder tracking ID to production.
  var GTM_ID = 'GTM-XXXXXXX';
  var ANALYTICS_ENABLED = !!GTM_ID && GTM_ID.indexOf('XXXX') === -1;

  window.gwentTrack = function(name, details){
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event:'gwent_' + name, details:details || {} });
  };

  function loadGTM(id){
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({'gtm.start': new Date().getTime(), event:'gtm.js'});
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtm.js?id=' + encodeURIComponent(id);
    document.head.appendChild(script);
  }

  // Cookie consent banner — only appears when analytics is actually
  // configured (see GTM_ID above). Nothing loads until the visitor accepts.
  if (ANALYTICS_ENABLED){
    var CONSENT_KEY = 'gwent_analytics_consent';
    var consent = null;
    try { consent = window.localStorage.getItem(CONSENT_KEY); } catch (err) { consent = null; }

    if (consent === 'accepted') {
      loadGTM(GTM_ID);
    } else if (consent !== 'declined') {
      var bar = document.createElement('div');
      bar.className = 'cookie-bar';
      bar.setAttribute('role', 'dialog');
      bar.setAttribute('aria-label', 'Cookie consent');
      bar.innerHTML =
        '<p>We use cookies for basic site analytics only, to see what\'s working. No ads, no third-party trackers. ' +
        '<a href="#privacy" id="cookie-privacy-link">Privacy Policy</a></p>' +
        '<div class="cookie-bar-actions">' +
        '<button type="button" class="btn btn-outline btn-sm" id="cookie-decline">Decline</button>' +
        '<button type="button" class="btn btn-gold btn-sm" id="cookie-accept">Accept</button>' +
        '</div>';
      document.body.appendChild(bar);
      document.body.classList.add('has-cookie-bar');

      function dismiss(){
        bar.classList.add('dismissed');
        document.body.classList.remove('has-cookie-bar');
        window.setTimeout(function(){ bar.remove(); }, 300);
      }
      document.getElementById('cookie-accept').addEventListener('click', function(){
        try { window.localStorage.setItem(CONSENT_KEY, 'accepted'); } catch (err) {}
        loadGTM(GTM_ID);
        dismiss();
      });
      document.getElementById('cookie-decline').addEventListener('click', function(){
        try { window.localStorage.setItem(CONSENT_KEY, 'declined'); } catch (err) {}
        dismiss();
      });
      var privacyLink = document.getElementById('cookie-privacy-link');
      if (privacyLink){
        privacyLink.addEventListener('click', function(e){
          var modal = document.getElementById('privacy-modal');
          if (modal){
            e.preventDefault();
            modal.classList.add('open');
            document.body.style.overflow = 'hidden';
          }
        });
      }
    }
  }

  var whatsapp = document.createElement('a');
  whatsapp.className = 'whatsapp-float';
  whatsapp.href = 'https://wa.me/447405376702?text=Hi%20Gwent%20Digital%2C%20I%27d%20like%20to%20ask%20about%20your%20services.';
  whatsapp.target = '_blank';
  whatsapp.rel = 'noopener';
  whatsapp.setAttribute('aria-label', 'Message Gwent Digital on WhatsApp');
  whatsapp.addEventListener('click', function(){ window.gwentTrack('whatsapp_click'); });
  whatsapp.innerHTML = '<span aria-hidden="true">&#9742;</span> WhatsApp us';
  document.body.appendChild(whatsapp);

  // Navbar shadow on scroll
  var navbar = document.getElementById('navbar');
  function onScroll(){
    if (!navbar) return;
    if (window.scrollY > 8) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  }
  onScroll();
  window.addEventListener('scroll', onScroll, {passive:true});

  // Departments dropdown (desktop) — click/keyboard toggle, closes on outside click / Escape
  document.querySelectorAll('.has-dropdown').forEach(function(item){
    var toggle = item.querySelector('.dd-toggle');
    if (!toggle) return;
    toggle.setAttribute('aria-expanded','false');
    toggle.addEventListener('click', function(e){
      e.preventDefault();
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.has-dropdown.open').forEach(function(o){
        o.classList.remove('open');
        var t = o.querySelector('.dd-toggle');
        if (t) t.setAttribute('aria-expanded','false');
      });
      if (!isOpen){
        item.classList.add('open');
        toggle.setAttribute('aria-expanded','true');
      }
    });
  });
  document.addEventListener('click', function(e){
    document.querySelectorAll('.has-dropdown.open').forEach(function(item){
      if (!item.contains(e.target)){
        item.classList.remove('open');
        var t = item.querySelector('.dd-toggle');
        if (t) t.setAttribute('aria-expanded','false');
      }
    });
  });
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape'){
      document.querySelectorAll('.has-dropdown.open').forEach(function(item){
        item.classList.remove('open');
        var t = item.querySelector('.dd-toggle');
        if (t) t.setAttribute('aria-expanded','false');
      });
    }
  });

  // Mobile menu
  var hamburger = document.getElementById('hamburger');
  var mobilePanel = document.getElementById('mobile-panel');
  if (hamburger && mobilePanel){
    function closeMenu(){
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded','false');
      hamburger.setAttribute('aria-label','Open menu');
      mobilePanel.classList.remove('open');
    }
    function openMenu(){
      hamburger.classList.add('open');
      hamburger.setAttribute('aria-expanded','true');
      hamburger.setAttribute('aria-label','Close menu');
      mobilePanel.classList.add('open');
    }
    hamburger.addEventListener('click', function(){
      if (mobilePanel.classList.contains('open')) closeMenu(); else openMenu();
    });
    mobilePanel.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', closeMenu);
    });
  }

  // Scroll reveal
  var revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  if ('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting){
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, {threshold:0.15, rootMargin:'0px 0px -40px 0px'});
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('in-view'); });
  }

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(function(item){
    var btn = item.querySelector('.faq-q');
    var answer = item.querySelector('.faq-a');
    if (!btn || !answer) return;
    function setHeight(){
      answer.style.maxHeight = item.classList.contains('open') ? answer.scrollHeight + 'px' : '0px';
    }
    setHeight();
    btn.addEventListener('click', function(){
      var isOpen = item.classList.contains('open');
      item.parentElement.querySelectorAll('.faq-item.open').forEach(function(openItem){
        if (openItem !== item){
          openItem.classList.remove('open');
          openItem.querySelector('.faq-q').setAttribute('aria-expanded','false');
          openItem.querySelector('.faq-a').style.maxHeight = '0px';
        }
      });
      item.classList.toggle('open', !isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));
      setHeight();
    });
    window.addEventListener('resize', function(){ if (item.classList.contains('open')) setHeight(); });
  });

  // Privacy modal
  var modal = document.getElementById('privacy-modal');
  if (modal){
    var modalClose = document.getElementById('privacy-close');
    function openModal(){ modal.classList.add('open'); document.body.style.overflow='hidden'; }
    function closeModal(){ modal.classList.remove('open'); document.body.style.overflow=''; }
    ['privacy-link','privacy-link-footer'].forEach(function(id){
      var el = document.getElementById(id);
      if (el) el.addEventListener('click', function(e){ e.preventDefault(); openModal(); });
    });
    if (modalClose) modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e){ if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', function(e){ if (e.key === 'Escape') closeModal(); });
    if (window.location.hash === '#privacy') openModal();
  }

  // Contact form: try the admin lead API first, then fall back to Netlify.
  // If the page provides a #f-need select and the URL has ?need=..., pre-select it
  // (used when arriving from a department page's "Ask about X" button).
  var form = document.getElementById('contact-form');
  if (form){
    var needField = document.getElementById('f-need');
    if (needField){
      var params = new URLSearchParams(window.location.search);
      var needParam = params.get('need');
      if (needParam){
        Array.prototype.forEach.call(needField.options, function(opt){
          if (opt.value.toLowerCase() === needParam.toLowerCase()) needField.value = opt.value;
        });
      }
    }
    var status = document.getElementById('form-status');
    form.addEventListener('submit', function(e){
      e.preventDefault();
      window.gwentTrack('enquiry_started', { department: needField ? needField.value : '' });
      var data = new FormData(form);
      var adminEndpoint = form.getAttribute('data-admin-endpoint');
      var adminRequest = adminEndpoint ? fetch(adminEndpoint, { method:'POST', body:JSON.stringify({
        name:data.get('name'), business:data.get('business'), phone:data.get('phone'), email:data.get('email'),
        need:data.get('need'), message:data.get('message'), website:data.get('bot-field')
      }), headers:{'Content-Type':'application/json'} }).then(function(response){
        if (!response.ok) throw new Error('Admin endpoint unavailable');
        return response;
      }) : Promise.reject(new Error('No admin endpoint configured'));
      adminRequest.catch(function(){
        return fetch('/', { method:'POST', body:new URLSearchParams(data).toString(), headers:{'Content-Type':'application/x-www-form-urlencoded'} });
      }).then(function(){
          status.textContent = "Thanks — your enquiry is in. We'll reply within 24 hours.";
          status.className = 'form-status show ok';
          window.gwentTrack('enquiry_submitted', { department: data.get('need') });
          form.reset();
          window.setTimeout(function(){ window.location.href = 'thank-you.html'; }, 450);
        })
        .catch(function(){
          status.textContent = "Something went wrong sending that. Please email hello@gwentdigital.co.uk directly.";
          status.className = 'form-status show err';
        });
    });
  }
})();
