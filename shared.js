/* Melhorias colaborativas SST | autoria original: Lenilson, projeto SST */
(() => {
'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const normalize = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  const readSetting = key => { try { return localStorage.getItem(key); } catch { return null; } };
  const saveSetting = (key, value) => { try { localStorage.setItem(key, value); } catch { /* indisponível no modo privado */ } };

  // Tema visual — nunca substitui conteúdo pedagógico ou faz requisições de notícias.
  const themeButton = $('#theme-toggle');
  const preferDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  function setTheme(isDark) {
    document.body.classList.toggle('dark', isDark);
    themeButton.textContent = isDark ? '☀' : '☾';
    themeButton.setAttribute('aria-label', isDark ? 'Ativar tema claro' : 'Ativar tema escuro');
    themeButton.setAttribute('aria-pressed', String(isDark));
    saveSetting('sst-em-foco-theme', isDark ? 'dark' : 'light');
  }
  setTheme((readSetting('sst-em-foco-theme') || (preferDark ? 'dark' : 'light')) === 'dark');
  themeButton.addEventListener('click', () => setTheme(!document.body.classList.contains('dark')));

  // Navegação adaptada a telas pequenas e suporte de teclado.
  const menuToggle = $('#menu-toggle');
  const menu = $('#primary-nav');
  function closeMenu() {
    menu.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menu de navegação');
  }
  menuToggle.addEventListener('click', () => {
    const willOpen = !menu.classList.contains('open');
    menu.classList.toggle('open', willOpen);
    menuToggle.setAttribute('aria-expanded', String(willOpen));
    menuToggle.setAttribute('aria-label', willOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação');
  });
  $$('#primary-nav a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu.classList.contains('open')) { closeMenu(); menuToggle.focus(); }
  });

})();
