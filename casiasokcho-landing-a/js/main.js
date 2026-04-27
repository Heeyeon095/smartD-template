// CASSIA SOKCHO LANDING — A (BLACK)

/* ===== MERIT SWIPER ===== */
(function () {
  var meritEl = document.getElementById('meritSwiper');
  if (!meritEl) return;

  var slides = meritEl.querySelectorAll('.swiper-slide');
  var total = slides.length;
  var currentEl = document.querySelector('.merit-current');
  var progressEl = document.querySelector('.merit-progress');

  function updateMeritCounter(idx) {
    if (currentEl) currentEl.textContent = String(idx + 1).padStart(2, '0');
    if (progressEl) progressEl.style.width = ((idx + 1) / total * 100) + '%';
  }

  var meritSwiper = new Swiper('#meritSwiper', {
    loop: true,
    navigation: {
      prevEl: '.btn-merit-prev',
      nextEl: '.btn-merit-next',
    },
    pagination: {
      el: '.merit-pagination',
      clickable: true,
      enabled: false,
    },
    breakpoints: {
      0: {
        pagination: { enabled: true }
      },
      768: {
        pagination: { enabled: false }
      }
    },
    on: {
      slideChange: function () {
        updateMeritCounter(this.realIndex);
      }
    }
  });

  updateMeritCounter(0);
})();

/* ===== EXCLUSIVE SWIPER ===== */
(function () {
  var exEl = document.getElementById('exclusiveSwiper');
  if (!exEl) return;

  new Swiper('#exclusiveSwiper', {
    slidesPerView: 'auto',
    spaceBetween: 16,
    grabCursor: true,
    breakpoints: {
      768: {
        spaceBetween: 24
      }
    }
  });
})();

(function () {
  'use strict';

  /* ===== ROOM SWIPER + LIGHTBOX ===== */
  const roomSwiperEl = document.getElementById('roomSwiper');
  if (roomSwiperEl && window.Swiper) {
    const tabs = document.querySelectorAll('.room-tab');
    const levelNameEl = document.querySelector('[data-room-level-name]');
    const levelTaglineEl = document.querySelector('[data-room-level-tagline]');

    function syncLevel(idx) {
      tabs.forEach(function (t) {
        t.classList.toggle('is-active', Number(t.dataset.idx) === idx);
      });
      const activeTab = tabs[idx];
      if (activeTab) {
        if (levelNameEl) levelNameEl.textContent = activeTab.dataset.name || '';
        if (levelTaglineEl) levelTaglineEl.textContent = activeTab.dataset.tagline || '';
      }
    }

    const roomSwiper = new Swiper('#roomSwiper', {
      slidesPerView: 1,
      spaceBetween: 0,
      speed: 500,
      grabCursor: true,
      allowTouchMove: true,
      observer: true,
      observeParents: true,
      navigation: {
        prevEl: '.btn-room-prev',
        nextEl: '.btn-room-next',
      },
      on: {
        slideChange: function () {
          syncLevel(this.activeIndex);
        }
      }
    });

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        const idx = Number(tab.dataset.idx);
        roomSwiper.slideTo(idx);
      });
    });

    /* ----- LIGHTBOX ----- */
    const lightbox = document.getElementById('roomLightbox');
    const lightboxSwiperEl = document.getElementById('roomLightboxSwiper');
    const lightboxWrapper = lightboxSwiperEl ? lightboxSwiperEl.querySelector('.swiper-wrapper') : null;
    const lightboxClose = lightbox ? lightbox.querySelector('.room-lightbox-close') : null;
    const currentEl = lightbox ? lightbox.querySelector('.room-lightbox-current') : null;
    const totalEl = lightbox ? lightbox.querySelector('.room-lightbox-total') : null;
    let lightboxSwiper = null;

    function buildLightbox(typeIdx, startIdx) {
      if (!lightboxWrapper) return;
      const gallery = roomSwiperEl.querySelectorAll('.room-gallery')[typeIdx];
      if (!gallery) return;
      const imgs = gallery.querySelectorAll('img');
      lightboxWrapper.innerHTML = '';
      imgs.forEach(function (img) {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        const cloned = document.createElement('img');
        cloned.src = img.getAttribute('src');
        cloned.alt = img.getAttribute('alt') || '';
        slide.appendChild(cloned);
        lightboxWrapper.appendChild(slide);
      });

      if (totalEl) totalEl.textContent = String(imgs.length).padStart(2, '0');

      if (lightboxSwiper) {
        lightboxSwiper.destroy(true, true);
        lightboxSwiper = null;
      }

      lightboxSwiper = new Swiper('#roomLightboxSwiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        speed: 400,
        initialSlide: startIdx,
        keyboard: { enabled: true },
        navigation: {
          prevEl: '.room-lightbox-prev',
          nextEl: '.room-lightbox-next',
        },
        on: {
          slideChange: function () {
            if (currentEl) currentEl.textContent = String(this.realIndex + 1).padStart(2, '0');
          }
        }
      });

      if (currentEl) currentEl.textContent = String(startIdx + 1).padStart(2, '0');
    }

    function openLightbox(typeIdx, imgIdx) {
      if (!lightbox) return;
      buildLightbox(typeIdx, imgIdx);
      lightbox.hidden = false;
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      if (!lightbox) return;
      lightbox.hidden = true;
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lightboxSwiper) {
        lightboxSwiper.destroy(true, true);
        lightboxSwiper = null;
      }
    }

    roomSwiperEl.querySelectorAll('.room-gallery').forEach(function (gallery) {
      const typeIdx = Number(gallery.dataset.typeIdx);
      gallery.querySelectorAll('[data-img-idx]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          openLightbox(typeIdx, Number(btn.dataset.imgIdx));
        });
      });
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightbox) {
      lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) closeLightbox();
      });
    }
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox && !lightbox.hidden) closeLightbox();
    });

    syncLevel(0);
  }

  /* ===== FACILITY TABS + CARD SWIPERS ===== */
  const facilitySection = document.querySelector('.sec-facility');
  if (facilitySection && window.Swiper) {
    const tabs = facilitySection.querySelectorAll('.facility-tab');
    const panels = facilitySection.querySelectorAll('.facility-panel');
    const tabDescs = facilitySection.querySelectorAll('.facility-tab-desc');

    function activateTab(name) {
      tabs.forEach(function (t) {
        t.classList.toggle('is-active', t.dataset.tab === name);
      });
      panels.forEach(function (p) {
        p.classList.toggle('is-active', p.dataset.panel === name);
      });
      tabDescs.forEach(function (d) {
        d.classList.toggle('is-active', d.dataset.tabDesc === name);
      });
      Object.values(cardSwipers).forEach(function (sw) {
        if (sw && sw.update) sw.update();
      });
    }

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        activateTab(tab.dataset.tab);
      });
    });

    const cardSwipers = {};
    const swiperTargets = facilitySection.querySelectorAll('.facility-hero-swiper, .facility-sub-swiper');
    swiperTargets.forEach(function (el, idx) {
      const totalSlides = el.querySelectorAll('.swiper-slide').length;
      const currentEl = el.querySelector('.current');
      const progressEl = el.querySelector('.progress');
      const prevBtn = el.querySelector('.btn-fac-card-prev');
      const nextBtn = el.querySelector('.btn-fac-card-next');

      function updateCounter(i) {
        if (currentEl) currentEl.textContent = String(i + 1).padStart(2, '0');
        if (progressEl) progressEl.style.width = ((i + 1) / totalSlides * 100) + '%';
      }

      const sw = new Swiper(el, {
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 500,
        grabCursor: true,
        allowTouchMove: true,
        observer: true,
        observeParents: true,
        navigation: {
          prevEl: prevBtn,
          nextEl: nextBtn,
        },
        on: {
          slideChange: function () {
            updateCounter(this.activeIndex);
          }
        }
      });

      updateCounter(0);
      cardSwipers[idx] = sw;
    });
  }

  /* ===== CONSULT FORM ===== */
  var SALES_BASE = '';
  var CONSULT_ENDPOINT = SALES_BASE + '/ajax/contact/request';
  var CONSULT_PAYLOAD = { type: 's', cpnNo: 1, userNo: 1632 };

  var consultForm = document.getElementById('consultForm');
  if (consultForm) {

    // 약관 자세히보기 토글
    var termsToggle = consultForm.querySelector('.terms-toggle');
    var termsCollapse = document.getElementById('termsCollapse');
    if (termsToggle && termsCollapse) {
      termsToggle.addEventListener('click', function () {
        var isHidden = termsCollapse.hidden;
        termsCollapse.hidden = !isHidden;
        this.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
        this.textContent = isHidden ? '닫기' : '자세히보기';
      });
    }

    // 전체 동의 ↔ 개별 체크박스 연동
    var agreeAll = document.getElementById('agreeAll');
    var agreeItems = consultForm.querySelectorAll('.agree-item');

    if (agreeAll) {
      agreeAll.addEventListener('change', function () {
        agreeItems.forEach(function (item) { item.checked = agreeAll.checked; });
      });
    }
    agreeItems.forEach(function (item) {
      item.addEventListener('change', function () {
        var allChecked = Array.from(agreeItems).every(function (i) { return i.checked; });
        if (agreeAll) agreeAll.checked = allChecked;
      });
    });

    // 폼 제출
    consultForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name  = consultForm.querySelector('#consultName').value.trim();
      var phone = consultForm.querySelector('#consultPhone').value.trim();
      var agree1 = consultForm.querySelector('#agreeCollect');
      var agree2 = consultForm.querySelector('#agreeThirdParty');

      if (!name)  { alert('성함을 입력해주세요.'); return; }
      if (!phone) { alert('전화번호를 입력해주세요.'); return; }
      if (!agree1 || !agree1.checked) { alert('개인정보 수집·이용에 동의해주세요.'); return; }
      if (!agree2 || !agree2.checked) { alert('개인정보 제3자 제공에 동의해주세요.'); return; }

      var submitBtn = consultForm.querySelector('.btn-primary');
      if (submitBtn) submitBtn.disabled = true;

      var payload = Object.assign({}, CONSULT_PAYLOAD, {
        name: name,
        phone: phone,
        cpnNo: e.target.dataset.campaignNo,
        userNo: e.target.dataset.userNo,
        CC19001: 'Y',
        CC19002: 'Y'
      });

      fetch(CONSULT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(function (res) { return res.json(); })
        .then(function (result) {
          if (result && result.code === '0000') {
            if (result.data && result.data.filePath) {
              var a = document.createElement('a');
              a.href = SALES_BASE + result.data.filePath;
              a.download = result.data.filename || '';
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
            }
            alert('신청이 완료되었습니다.\n빠른 시일 내에 연락드리겠습니다.');
            consultForm.reset();
          } else {
            alert((result && result.message) || '신청에 실패했습니다. 잠시 후 다시 시도해주세요.');
          }
        })
        .catch(function () {
          alert('신청에 실패했습니다. 잠시 후 다시 시도해주세요.');
        })
        .finally(function () {
          if (submitBtn) submitBtn.disabled = false;
        });
    });
  }

  /* ===== HEADER SCROLL ===== */
  const header = document.getElementById('layout-header');
  if (header) {
    function updateHeader() {
      if (window.scrollY === 0) {
        header.style.background = 'transparent';
      } else if (window.scrollY > 60) {
        header.style.background = 'rgba(0,0,0,0.85)';
      } else {
        header.style.background = 'rgba(0,0,0,0.4)';
      }
    }
    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();
  }

})();
