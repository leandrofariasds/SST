/* Filtragem temática educativa, não taxonomia normativa oficial. */
(() => {
'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const normalize = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  const readSetting = key => { try { return localStorage.getItem(key); } catch { return null; } };
  const saveSetting = (key, value) => { try { localStorage.setItem(key, value); } catch { /* indisponível no modo privado */ } };

  // Filtros de NRs: categorias originais preservadas, inclusive revogadas.
  const nrSearch = $('#nrSearch');
  const nrButtons = $$('.filter-btn');
  const nrCategories = $$('.nr-groups > div');
  const nrCards = $$('.nrcard');
  let nrFilter = 'all';
  let riskFilter = 'todos';
  const riskButtons = $$('.risk-filter');
  function filterNRs() {
    const search = normalize(nrSearch.value);
    let found = 0;
    nrCategories.forEach(group => {
      const kind = ['gerais', 'especiais', 'setoriais', 'revogadas'].find(k => group.classList.contains('nr-' + k));
      let visibleInGroup = 0;
      $$('.nrcard', group).forEach(card => {
        const matches = (nrFilter === 'all' || nrFilter === kind) && (riskFilter === 'todos' || (card.dataset.risk || '').split(' ').includes(riskFilter)) && normalize(card.textContent).includes(search);
        card.hidden = !matches;
        if (matches) { found += 1; visibleInGroup += 1; }
      });
      group.hidden = visibleInGroup === 0;
    });
    $('#nr-counter').textContent = `${found} ${found === 1 ? 'norma encontrada' : 'normas encontradas'}.`;
  }
  nrSearch.addEventListener('input', filterNRs);
  nrButtons.forEach(btn => btn.addEventListener('click', () => {
    nrFilter = btn.dataset.filter;
    nrButtons.forEach(item => {
      const active = item === btn;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    filterNRs();
  }));
  $$('[data-nr-jump]').forEach(link => link.addEventListener('click', () => {
    nrFilter = 'all';
    nrButtons.forEach(b => { const selected = b.dataset.filter === 'all'; b.classList.toggle('active', selected); b.setAttribute('aria-pressed', String(selected)); });
    nrSearch.value = `NR ${link.dataset.nrJump}`;
    filterNRs();
  }));
  riskButtons.forEach(btn => btn.addEventListener('click', () => {
    riskFilter = btn.dataset.risk;
    riskButtons.forEach(item => { const active = item === btn; item.classList.toggle('active', active); item.setAttribute('aria-pressed', String(active)); });
    filterNRs();
  }));
  filterNRs();

  // Hierarquia de medidas de prevenção: dados ilustrativos para conscientização.
  const controlLevels = [
    ['Eliminar', 'Remover a fonte do perigo, quando tecnicamente possível. Ex.: deixar de executar uma etapa desnecessária em área de risco.'],
    ['Substituir', 'Trocar uma substância, processo ou equipamento perigoso por uma alternativa menos perigosa, após avaliação.'],
    ['Proteção coletiva / engenharia', 'Instalar barreiras, enclausuramento, exaustão ou intertravamentos que protejam a área ou o conjunto de pessoas.'],
    ['Medidas administrativas', 'Definir procedimentos, permissões de trabalho, manutenção, sinalização, capacitação e organização das atividades.'],
    ['EPI', 'Usar equipamentos de proteção individual adequados aos riscos remanescentes, com seleção, treinamento e inspeção.'],
  ];
  $$('.hierarchy-step').forEach(btn => btn.addEventListener('click', () => {
    const level = Number(btn.dataset.level);
    $$('.hierarchy-step').forEach(b => {
      const active = b === btn;
      b.classList.toggle('selected', active);
      b.setAttribute('aria-pressed', String(active));
    });
    const [title, text] = controlLevels[level];
    const explain = $('#hierarchy-explanation');
    explain.replaceChildren();
    const strong = document.createElement('strong'); strong.textContent = title;
    const p = document.createElement('p'); p.textContent = text;
    explain.append(strong, p);
  }));

})();
