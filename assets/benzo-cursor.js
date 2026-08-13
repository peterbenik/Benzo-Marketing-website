// Benzo Marketing — the electric-blue cursor follower. Separate from benzo.js
// because it belongs on the editorial pages (home, case studies) but not on the
// qualifier form, where a trailing ring competes with the input caret.
(function(){
  'use strict';
  if (!window.matchMedia('(pointer:fine)').matches) return;                 // skip touch / no mouse
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var dot = document.createElement('div');  dot.className  = 'cursor-dot';  dot.setAttribute('aria-hidden','true');
  var ring = document.createElement('div'); ring.className = 'cursor-ring'; ring.setAttribute('aria-hidden','true');
  document.body.appendChild(ring);
  document.body.appendChild(dot);

  var mx = window.innerWidth/2, my = window.innerHeight/2;   // mouse target
  var dx = mx, dy = my, rx = mx, ry = my;                     // eased positions
  var seen = false;

  window.addEventListener('mousemove', function(e){
    mx = e.clientX; my = e.clientY;
    if (!seen){ seen = true; dx = rx = mx; dy = ry = my; dot.style.opacity = ring.style.opacity = 1; }
  }, { passive:true });
  document.addEventListener('mouseleave', function(){ dot.style.opacity = ring.style.opacity = 0; });
  document.addEventListener('mouseenter', function(){ if (seen){ dot.style.opacity = ring.style.opacity = 1; } });

  // grow the ring over anything interactive
  var INTERACTIVE = 'a,button,input,textarea,select,label,summary,.logo-item,[role="button"]';
  document.addEventListener('pointerover', function(e){
    var hit = e.target.closest ? e.target.closest(INTERACTIVE) : null;
    ring.classList.toggle('is-hover', !!hit);
  });
  document.addEventListener('mousedown', function(){ ring.classList.add('is-down'); });
  document.addEventListener('mouseup',   function(){ ring.classList.remove('is-down'); });

  function loop(){
    dx += (mx - dx) * 0.35;  dy += (my - dy) * 0.35;   // dot: snappy
    rx += (mx - rx) * 0.16;  ry += (my - ry) * 0.16;   // ring: soft trailing lag
    dot.style.transform  = 'translate3d(' + dx + 'px,' + dy + 'px,0) translate(-50%,-50%)';
    ring.style.transform = 'translate3d(' + rx + 'px,' + ry + 'px,0) translate(-50%,-50%)';
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();
