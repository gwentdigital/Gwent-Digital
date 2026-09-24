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
            openModal();
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
    document.addEventListener('keydown', function(e){if(e.key==='Escape' && mobilePanel.classList.contains('open')){closeMenu();hamburger.focus();}});
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
    var previousFocus;
    function openModal(){ previousFocus = document.activeElement; modal.classList.add('open'); document.body.style.overflow='hidden'; if(modalClose) modalClose.focus(); }
    modal.addEventListener('keydown', function(e){
      if(e.key !== 'Tab') return;
      var items = modal.querySelectorAll('button,a[href],input,select,textarea,[tabindex="0"]');
      var first=items[0], last=items[items.length-1];
      if(e.shiftKey && document.activeElement===first){e.preventDefault();last.focus();}
      else if(!e.shiftKey && document.activeElement===last){e.preventDefault();first.focus();}
    });
    function closeModal(){ if(!modal.classList.contains('open')) return; modal.classList.remove('open'); document.body.style.overflow=''; if(previousFocus) previousFocus.focus(); }
    ['privacy-link','privacy-link-footer'].forEach(function(id){
      var el = document.getElementById(id);
      if (el) el.addEventListener('click', function(e){ e.preventDefault(); openModal(); });
    });
    if (modalClose) modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e){ if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', function(e){ if (e.key === 'Escape') closeModal(); });
    if (window.location.hash === '#privacy') openModal();
  }

  // Contact form: Netlify Forms. Only report success for an accepted response.
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
      if (form.dataset.sending === 'true') return;
      form.dataset.sending = 'true';
      var submitButton = form.querySelector('[type="submit"]');
      if (submitButton) submitButton.disabled = true;
      status.textContent = 'Sending your enquiry...';
      status.className = 'form-status show';
      fetch('/', {method:'POST', body:new URLSearchParams(data).toString(), headers:{'Content-Type':'application/x-www-form-urlencoded'}})
        .then(function(response){
          if (!response.ok) throw new Error('Enquiry was not accepted');
          status.textContent = "Thanks — your enquiry is in. We'll reply within 24 hours.";
          status.className = 'form-status show ok';
          window.gwentTrack('enquiry_submitted', { department: data.get('need') });
          form.reset();
          window.setTimeout(function(){ window.location.href = 'thank-you.html'; }, 450);
        })
        .catch(function(){
          status.textContent = "Something went wrong sending that. Please email hello@gwentdigital.co.uk directly.";
          status.className = 'form-status show err';
          status.focus();
          form.dataset.sending = 'false';
          if (submitButton) submitButton.disabled = false;
        });
    });
  }

  // Interactive Project Cost Calculator
  var calcContainer = document.getElementById('project-calculator');
  if (calcContainer) {
    var projectRadios = calcContainer.querySelectorAll('input[name="calc-project"]');
    var scopeRadios = calcContainer.querySelectorAll('input[name="calc-pages"]');
    var addonCheckboxes = calcContainer.querySelectorAll('input[name="calc-addon"]');

    var breakdownEl = document.getElementById('calc-breakdown');
    var totalAmountEl = document.getElementById('calc-total-amount');
    var monthlyAmountEl = document.getElementById('calc-monthly-amount');
    var turnaroundEl = document.getElementById('calc-turnaround');
    var depositEl = document.getElementById('calc-deposit');
    var quoteContactBtn = document.getElementById('calc-btn-contact');
    var quoteWhatsappBtn = document.getElementById('calc-btn-whatsapp');
    var prevOneTimeTotal = null;
    var prevDeposit = null;

    function animateNumber(el, startVal, endVal, prefix, suffix, isBounce) {
      if (!el) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || startVal === null || startVal === endVal) {
        el.textContent = (prefix || '') + endVal.toLocaleString('en-GB') + (suffix || '');
        return;
      }
      if (isBounce) {
        el.classList.remove('price-bump');
        void el.offsetWidth;
        el.classList.add('price-bump');
      }
      var startTime = performance.now();
      var duration = 280;
      function tick(now) {
        var elapsed = now - startTime;
        var progress = Math.min(elapsed / duration, 1);
        var ease = 1 - Math.pow(1 - progress, 3);
        var current = Math.round(startVal + (endVal - startVal) * ease);
        el.textContent = (prefix || '') + current.toLocaleString('en-GB') + (suffix || '');
        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          el.textContent = (prefix || '') + endVal.toLocaleString('en-GB') + (suffix || '');
        }
      }
      requestAnimationFrame(tick);
    }

    function updateCalculator() {
      var selectedProject = calcContainer.querySelector('input[name="calc-project"]:checked');
      var selectedScope = calcContainer.querySelector('input[name="calc-pages"]:checked');

      // Update active classes for choices
      calcContainer.querySelectorAll('.calc-choice').forEach(function(choice) {
        var input = choice.querySelector('input');
        if (input) {
          if (input.checked) {
            choice.classList.add('active');
          } else {
            choice.classList.remove('active');
          }
        }
      });

      var basePrice = selectedProject ? parseInt(selectedProject.getAttribute('data-price'), 10) : 850;
      var projectName = selectedProject ? selectedProject.getAttribute('data-name') : 'Custom Website Build';
      var deptName = selectedProject ? selectedProject.getAttribute('data-dept') : 'Web Design & Development';
      var baseTurnaround = selectedProject ? selectedProject.getAttribute('data-turnaround') : '7–12 days';

      var scopePrice = selectedScope ? parseInt(selectedScope.getAttribute('data-price'), 10) : 0;
      var scopeName = selectedScope ? selectedScope.getAttribute('data-name') : 'Standard Scope';

      var oneTimeTotal = basePrice + scopePrice;
      var monthlyTotal = 0;
      var addonsList = [];

      addonCheckboxes.forEach(function(cb) {
        if (cb.checked) {
          var price = parseInt(cb.getAttribute('data-price'), 10);
          var isMonthly = cb.getAttribute('data-is-monthly') === 'true';
          var name = cb.getAttribute('data-name');
          if (isMonthly) {
            monthlyTotal += price;
            addonsList.push({ name: name, price: '£' + price + '/mo' });
          } else {
            oneTimeTotal += price;
            addonsList.push({ name: name, price: '£' + price });
          }
        }
      });

      // Build breakdown HTML
      var html = '';
      html += '<li><span>' + projectName + '</span><span>£' + basePrice.toLocaleString('en-GB') + '</span></li>';
      if (scopePrice > 0) {
        html += '<li><span>' + scopeName + '</span><span>+£' + scopePrice.toLocaleString('en-GB') + '</span></li>';
      }
      addonsList.forEach(function(item) {
        html += '<li><span>' + item.name + '</span><span>+' + item.price + '</span></li>';
      });
      if (breakdownEl) breakdownEl.innerHTML = html;

      // Update Total Displays with smooth rolling counter animation
      if (totalAmountEl) {
        animateNumber(totalAmountEl, prevOneTimeTotal, oneTimeTotal, '£', '', true);
        prevOneTimeTotal = oneTimeTotal;
      }
      if (monthlyAmountEl) {
        if (monthlyTotal > 0) {
          monthlyAmountEl.textContent = '+ £' + monthlyTotal + '/month (ongoing retainer)';
          monthlyAmountEl.style.display = 'block';
        } else {
          monthlyAmountEl.style.display = 'none';
        }
      }

      // 50% milestone deposit with animated counter
      var deposit = Math.round(oneTimeTotal / 2);
      if (depositEl) {
        animateNumber(depositEl, prevDeposit, deposit, '£', '', false);
        prevDeposit = deposit;
      }

      // Turnaround estimate
      if (turnaroundEl) turnaroundEl.textContent = baseTurnaround;

      // Compose pre-fill message
      var summaryMsg = "Hi Gwent Digital,\n\nI just calculated an estimate on your website for:\n" +
        "- Project: " + projectName + "\n" +
        "- Scope: " + scopeName + "\n";
      if (addonsList.length > 0) {
        summaryMsg += "- Add-ons: " + addonsList.map(function(a){ return a.name + " (" + a.price + ")"; }).join(', ') + "\n";
      }
      summaryMsg += "- Estimated One-Time Investment: £" + oneTimeTotal.toLocaleString('en-GB') + "\n";
      if (monthlyTotal > 0) {
        summaryMsg += "- Estimated Ongoing Care: £" + monthlyTotal + "/month\n";
      }
      summaryMsg += "\nCould we discuss this project?";

      // Wire WhatsApp button
      if (quoteWhatsappBtn) {
        quoteWhatsappBtn.href = "https://wa.me/447405376702?text=" + encodeURIComponent(summaryMsg);
      }

      // Wire Lock-in / Contact button
      if (quoteContactBtn) {
        quoteContactBtn.onclick = function(e) {
          e.preventDefault();
          var contactSection = document.getElementById('contact');
          var msgField = document.getElementById('f-message');
          var needField = document.getElementById('f-need');
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
          }
          if (msgField) {
            msgField.value = summaryMsg;
          }
          if (needField) {
            Array.prototype.forEach.call(needField.options, function(opt) {
              if (opt.value.toLowerCase().indexOf(deptName.toLowerCase().slice(0, 5)) !== -1) {
                needField.value = opt.value;
              }
            });
          }
        };
      }
    }

    calcContainer.querySelectorAll('input').forEach(function(input) {
      input.addEventListener('change', updateCalculator);
    });

    updateCalculator();
  }
})();
