/* ============================================================================
   The Social Executive Network × eCommerce Expo — behavior
   Ported verbatim from the approved design: scroll-reveal ([data-reveal]) +
   top progress bar. Honors prefers-reduced-motion (reveals all immediately).
   ============================================================================ */
(function () {
  "use strict";

  var reduce = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var reveals = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));

  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) {
      el.style.opacity = "1";
      el.style.transform = "none";
      el.style.transition = "none";
    });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.style.opacity = "1";
          e.target.style.transform = "none";
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    requestAnimationFrame(function () {
      reveals.forEach(function (el) { io.observe(el); });
    });
  }

  /* top progress bar */
  var bar = document.getElementById("sen-progress");
  if (bar) {
    var doc = document.documentElement;
    var onScroll = function () {
      var max = doc.scrollHeight - doc.clientHeight;
      var p = max > 0
        ? Math.min(1, Math.max(0, (doc.scrollTop || document.body.scrollTop) / max))
        : 0;
      bar.style.transform = "scaleX(" + p + ")";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
})();
