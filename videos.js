/* Catálogo do projeto original preservado; player sob demanda. */
(() => {
'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const normalize = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  const readSetting = key => { try { return localStorage.getItem(key); } catch { return null; } };
  const saveSetting = (key, value) => { try { localStorage.setItem(key, value); } catch { /* indisponível no modo privado */ } };

  // Catálogo original + vídeos novos. Nenhum iframe é carregado antes da interação.
  const videos = Array.isArray(window.SST_VIDEO_CATALOG) ? window.SST_VIDEO_CATALOG : [];
  const videosGrid = $('#video-grid');
  const videoSearch = $('#video-search');
  const videoFilters = $$('#video-filters button');
  const allCategories = { todos: () => true, normas: c => c.includes('normas'), riscos: c => c.includes('risco'), equipamento: c => c.includes('equipamento'), comportamento: c => c.includes('comportamento') };
  let videoCategory = 'todos';
  let videoLimit = 9;
  const fallbackArt = {'normas':'assets/altura.svg','riscos':'assets/eletricidade.svg','equipamento':'assets/maquinas.svg','comportamento':'assets/hero-seguranca.svg'};
  const safeEmbed = raw => /^https:\/\/www\.youtube\.com\/embed\/[A-Za-z0-9_-]{11}$/.test(raw || '') ? raw : null;
  const getId = video => (safeEmbed(video.embed) || '').split('/').pop();
  function createVideoCard(video) {
    const card = document.createElement('article'); card.className = 'video-card';
    const thumb = document.createElement('button'); thumb.type = 'button'; thumb.className = 'video-thumb';
    thumb.setAttribute('aria-label', `Reproduzir vídeo: ${video.title}`);
    const img = document.createElement('img');
    const fallback = video.image || fallbackArt[video.category] || 'assets/hero-seguranca.svg';
    img.src = video.id.startsWith('novo-') ? fallback : `https://i.ytimg.com/vi/${getId(video)}/hqdefault.jpg`;
    img.alt = `Miniatura do vídeo ${video.title}`;
    img.loading = 'lazy'; img.decoding = 'async';
    img.onerror = () => { img.onerror = null; img.src = fallback; };
    const play = document.createElement('span'); play.className = 'play-icon'; play.setAttribute('aria-hidden', 'true'); play.textContent = '▶';
    const badge = document.createElement('span'); badge.className = 'video-tag'; badge.textContent = video.category;
    thumb.append(img, play, badge); thumb.addEventListener('click', () => openVideo(video));
    const info = document.createElement('div'); info.className = 'video-info';
    const title = document.createElement('h3'); title.textContent = video.title;
    const credit = document.createElement('p'); credit.textContent = video.source || 'Acervo do projeto original';
    info.append(title, credit); card.append(thumb, info);
    return card;
  }
  function getFilteredVideos() {
    const q = normalize(videoSearch.value);
    return videos.filter(video => {
      const category = normalize(video.category);
      const matchesCategory = (allCategories[videoCategory] || allCategories.todos)(category);
      const matchesText = !q || normalize([video.title, video.category, video.source].join(' ')).includes(q);
      return matchesCategory && matchesText && safeEmbed(video.embed);
    });
  }
  function renderVideos() {
    const matching = getFilteredVideos();
    const displayed = matching.slice(0, videoLimit);
    videosGrid.replaceChildren(...displayed.map(createVideoCard));
    $('#video-counter').textContent = `${matching.length} ${matching.length === 1 ? 'vídeo disponível' : 'vídeos disponíveis'}`;
    $('#video-empty').hidden = matching.length > 0;
    $('#load-more-videos').hidden = matching.length <= videoLimit;
  }
  videoSearch.addEventListener('input', () => { videoLimit = 9; renderVideos(); });
  videoFilters.forEach(b => b.addEventListener('click', () => {
    videoCategory = b.dataset.category; videoLimit = 9;
    videoFilters.forEach(btn => { const active = btn === b; btn.classList.toggle('active', active); btn.setAttribute('aria-pressed', String(active)); });
    renderVideos();
  }));
  $('#load-more-videos').addEventListener('click', () => { videoLimit += 9; renderVideos(); });

  const videoDialog = $('#video-dialog');
  let previousFocus;
  function openVideo(video) {
    const url = safeEmbed(video.embed);
    if (!url) return;
    previousFocus = document.activeElement;
    $('#dialog-title').textContent = video.title;
    $('#dialog-credit').textContent = `Canal / origem: ${video.source || 'Acervo do projeto original'}. Confira a atualização das NRs em fonte oficial.`;
    $('#dialog-external').href = `https://www.youtube.com/watch?v=${getId(video)}`;
    const iframe = document.createElement('iframe');
    iframe.title = 'Reprodução: ' + video.title;
    iframe.src = url.replace('youtube.com', 'youtube-nocookie.com') + '?rel=0';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.allowFullscreen = true;
    iframe.loading = 'eager';
    $('#dialog-frame-container').replaceChildren(iframe);
    if (typeof videoDialog.showModal === 'function') videoDialog.showModal();
    else videoDialog.setAttribute('open', '');
    document.body.classList.add('modal-open');
  }
  function closeVideo() {
    if (videoDialog.open && typeof videoDialog.close === 'function') videoDialog.close();
    else videoDialog.removeAttribute('open');
  }
  $('#close-dialog').addEventListener('click', closeVideo);
  videoDialog.addEventListener('click', e => { if (e.target === videoDialog) closeVideo(); });
  videoDialog.addEventListener('close', () => {
    $('#dialog-frame-container').replaceChildren(); // interrompe a reprodução
    document.body.classList.remove('modal-open');
    if (previousFocus?.isConnected) previousFocus.focus();
  });
  renderVideos();
})();
