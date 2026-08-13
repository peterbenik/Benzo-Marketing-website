// Benzo Marketing — behaviour every page shares: the header's scrolled state,
// the mobile drawer, and the scroll-reveal observer. Loaded by index.html,
// kontakt.html and the case study pages.
(function(){
  'use strict';
  var nav = document.getElementById('nav');
  var onScroll = function(){ nav.classList.toggle('scrolled', window.scrollY > 20); };
  window.addEventListener('scroll', onScroll, {passive:true}); onScroll();

  var menuBtn = document.getElementById('menuBtn');
  var mobileMenu = document.getElementById('mobileMenu');
  menuBtn.addEventListener('click', function(){
    var open = mobileMenu.classList.toggle('hidden') === false;
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  Array.prototype.forEach.call(document.querySelectorAll('.mobile-link'), function(l){
    l.addEventListener('click', function(){ mobileMenu.classList.add('hidden'); menuBtn.setAttribute('aria-expanded','false'); });
  });

  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window){
    var ro = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add('in'); ro.unobserve(e.target); } });
    }, {threshold:0.12, rootMargin:'0px 0px -6% 0px'});
    revealEls.forEach(function(el){ ro.observe(el); });
  } else { revealEls.forEach(function(el){ el.classList.add('in'); }); }
})();
