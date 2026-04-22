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

  /* ===== GALLERY SLIDER ===== */
  const galleryTrack = document.getElementById('galleryTrack');
  if (galleryTrack) {
    const items = galleryTrack.querySelectorAll('.gallery-item');
    const total = items.length;
    let current = 0;

    function goGallery(idx) {
      current = (idx + total) % total;
      galleryTrack.style.transform = 'translateX(-' + (current * 100) + '%)';
    }

    const prevBtn = document.querySelector('.btn-gallery-prev');
    const nextBtn = document.querySelector('.btn-gallery-next');
    if (prevBtn) prevBtn.addEventListener('click', function () { goGallery(current - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goGallery(current + 1); });

    setInterval(function () { goGallery(current + 1); }, 4000);
  }

  /* ===== ROOM SLIDER ===== */
  const roomSlider = document.getElementById('roomSlider');
  if (roomSlider) {
    const slides = roomSlider.querySelector('.room-slides');
    const items = roomSlider.querySelectorAll('.room-slide');
    const total = items.length;
    let current = 0;

    const progressEl = document.querySelector('.slide-progress');
    const currentEl = document.querySelector('.slide-current');

    function updateRoomCounter() {
      if (currentEl) currentEl.textContent = String(current + 1).padStart(2, '0');
      if (progressEl) progressEl.style.width = ((current + 1) / total * 100) + '%';
    }

    function goRoom(idx) {
      current = (idx + total) % total;
      slides.style.transform = 'translateX(-' + (current * 100) + '%)';
      updateRoomCounter();
    }

    const prevBtn = document.querySelector('.btn-slide-prev');
    const nextBtn = document.querySelector('.btn-slide-next');
    if (prevBtn) prevBtn.addEventListener('click', function () { goRoom(current - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goRoom(current + 1); });

    updateRoomCounter();
  }

  /* ===== FACILITY SLIDER ===== */
  const facilitySlider = document.getElementById('facilitySlider');
  if (facilitySlider) {
    const slides = facilitySlider.querySelector('.facility-slides');
    const items = facilitySlider.querySelectorAll('.facility-slide');
    const total = items.length;
    let current = 0;

    function goFacility(idx) {
      current = (idx + total) % total;
      slides.style.transform = 'translateX(-' + (current * 100) + '%)';
    }

    const prevBtn = facilitySlider.querySelector('.btn-fac-prev');
    const nextBtn = facilitySlider.querySelector('.btn-fac-next');
    if (prevBtn) prevBtn.addEventListener('click', function () { goFacility(current - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goFacility(current + 1); });
  }

  /* ===== CONSULT FORM ===== */
  var SALES_BASE = 'https://cassia.bunpil.com';
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

  /* ===== HAMBURGER MENU ===== */
  const btnMenu = document.querySelector('.btn-menu');
  if (btnMenu) {
    btnMenu.addEventListener('click', function () {
      this.classList.toggle('is-open');
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
