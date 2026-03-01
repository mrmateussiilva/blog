document.addEventListener('DOMContentLoaded', function () {
  // Reading Progress Bar
  window.addEventListener('scroll', function () {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    var bar = document.getElementById('progress-bar');
    if (bar) bar.style.width = scrolled + '%';
  });

  // Theme Toggle
  var btn = document.getElementById('theme-toggle');
  var icon = document.getElementById('theme-icon');

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (icon) icon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }

  // Icone inicial
  var current = document.documentElement.getAttribute('data-theme') || 'light';
  if (icon) icon.textContent = current === 'dark' ? '☀️' : '🌙';

  if (btn) {
    btn.addEventListener('click', function () {
      var c = document.documentElement.getAttribute('data-theme') || 'light';
      applyTheme(c === 'dark' ? 'light' : 'dark');
    });
  }
});
