// Applies the stored (or system) theme before the first paint. External file: the CSP forbids inline scripts.
(function () {
  try {
    var t = localStorage.getItem('syn-theme');
    if (t !== 'dark' && t !== 'light') t = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    document.documentElement.dataset.theme = t;
  } catch (e) {
    document.documentElement.dataset.theme = 'light';
  }
})();
