export default function ScrollReveal() {
  // Static inline script for scroll-triggered reveal animations.
  // Content is a hardcoded string literal (no user input), so XSS risk is zero.
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function init() {
            if (typeof IntersectionObserver === 'undefined') return;
            var observer = new IntersectionObserver(function(entries) {
              for (var i = 0; i < entries.length; i++) {
                if (entries[i].isIntersecting) {
                  entries[i].target.classList.add('visible');
                  observer.unobserve(entries[i].target);
                }
              }
            }, { threshold: 0.05, rootMargin: '0px 0px -30px 0px' });

            function scan() {
              var els = document.querySelectorAll('.reveal:not(.visible),.reveal-left:not(.visible),.reveal-right:not(.visible),.reveal-scale:not(.visible)');
              for (var i = 0; i < els.length; i++) observer.observe(els[i]);
            }

            if (document.readyState === 'loading') {
              document.addEventListener('DOMContentLoaded', scan);
            } else {
              scan();
            }

            new MutationObserver(scan).observe(document.documentElement, { childList: true, subtree: true });
          })();
        `,
      }}
    />
  );
}
