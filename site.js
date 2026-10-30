(function () {
  'use strict';

  function evaluate(operator, a, b) {
    if (operator === 'AND') return Boolean(a && b);
    if (operator === 'OR') return Boolean(a || b);
    if (operator === 'NOT') return !a;
    throw new Error('Operador desconhecido');
  }
  globalThis.CircuitLogic = Object.freeze({ evaluate });
  if (typeof document === 'undefined') return;
  document.documentElement.classList.add('js');

  const nav = document.querySelector('.main-nav');
  const menuButton = document.querySelector('.menu-toggle');
  const encounter = document.querySelector('.encounter-menu');
  const dropdownButton = document.querySelector('.dropdown-toggle');
  const desktop = window.matchMedia('(min-width: 1280px) and (hover: hover)');
  const setDropdown = open => {
    if (!encounter || !dropdownButton) return;
    encounter.classList.toggle('is-open', open);
    dropdownButton.setAttribute('aria-expanded', String(open));
    dropdownButton.setAttribute('aria-label', `${open ? 'Fechar' : 'Abrir'} submenu dos seis encontros`);
  };
  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    nav?.classList.toggle('is-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    if (!open) setDropdown(false);
  });
  dropdownButton?.addEventListener('click', () => setDropdown(dropdownButton.getAttribute('aria-expanded') !== 'true'));
  encounter?.addEventListener('mouseenter', () => { if (desktop.matches) setDropdown(true); });
  encounter?.addEventListener('mouseleave', () => {
    if (desktop.matches && !encounter.contains(document.activeElement)) setDropdown(false);
  });
  encounter?.addEventListener('focusin', event => {
    if (event.target instanceof HTMLAnchorElement) setDropdown(true);
  });
  encounter?.addEventListener('focusout', () => {
    setTimeout(() => { if (!encounter.contains(document.activeElement)) setDropdown(false); }, 0);
  });
  document.addEventListener('click', event => {
    if (encounter && !encounter.contains(event.target)) setDropdown(false);
    if (nav?.classList.contains('is-open') && !nav.contains(event.target) && !menuButton?.contains(event.target)) {
      nav.classList.remove('is-open');
      menuButton?.setAttribute('aria-expanded', 'false');
    }
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    if (dropdownButton?.getAttribute('aria-expanded') === 'true') {
      setDropdown(false);
      dropdownButton.focus();
    } else if (menuButton?.getAttribute('aria-expanded') === 'true') {
      nav?.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.focus();
    }
  });

  document.querySelectorAll('[data-video]').forEach(cover => {
    cover.querySelector('button')?.addEventListener('click', () => {
      const id = cover.dataset.video;
      if (!/^[\w-]{11}$/.test(id || '')) return;
      const frame = document.createElement('iframe');
      frame.src = `https://www.youtube-nocookie.com/embed/${id}?rel=0`;
      frame.title = cover.dataset.videoTitle || 'Vídeo de apoio';
      frame.allow = 'accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      frame.allowFullscreen = true;
      frame.referrerPolicy = 'strict-origin-when-cross-origin';
      cover.replaceChildren(frame);
    }, { once: true });
  });

  document.querySelectorAll('[data-filter-group]').forEach(group => {
    const target = document.getElementById(group.dataset.filterGroup);
    if (!target) return;
    const cards = Array.from(target.querySelectorAll('[data-video-category], [data-material-kind]'));
    const status = document.querySelector(`[data-filter-status="${group.dataset.filterGroup}"]`);
    group.querySelectorAll('button').forEach(button => {
      button.addEventListener('click', () => {
        const chosen = button.dataset.filter;
        let shown = 0;
        cards.forEach(card => {
          const category = card.dataset.videoCategory || card.dataset.materialKind;
          card.hidden = chosen !== 'all' && category !== chosen;
          if (!card.hidden) shown += 1;
        });
        group.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
        if (status) status.textContent = `${shown} ${shown === 1 ? 'recurso disponível' : 'recursos disponíveis'}.`;
      });
    });
  });

  document.querySelectorAll('[data-logic-lab]').forEach(lab => {
    let operator = lab.dataset.initial || 'AND';
    const aInput = lab.querySelector('[data-input="a"]');
    const bInput = lab.querySelector('[data-input="b"]');
    const result = lab.querySelector('.lab-result');
    const rule = lab.querySelector('.lab-rule');
    const table = lab.querySelector('table');
    const rules = {
      AND: 'AND: ambas as condições precisam ser verdadeiras.',
      OR: 'OR inclusivo: ao menos uma condição verdadeira.',
      NOT: 'NOT: inverte o valor lógico de uma única condição.'
    };
    function render() {
      const a = aInput.checked;
      const b = bInput.checked;
      const value = evaluate(operator, a, b);
      result.replaceChildren(document.createTextNode('Resultado: '));
      const strong = document.createElement('strong');
      strong.textContent = value ? 'Verdadeiro (V)' : 'Falso (F)';
      result.append(strong);
      rule.textContent = rules[operator];
      lab.querySelector('[data-condition-b]').hidden = operator === 'NOT';
      bInput.disabled = operator === 'NOT';
      lab.querySelectorAll('[data-operator]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.operator === operator)));
      const pair = operator === 'NOT' ? [[false], [true]] : [[false, false], [false, true], [true, false], [true, true]];
      const symbol = value => value ? 'V' : 'F';
      table.querySelector('caption').textContent = `Tabela do operador ${operator}`;
      table.querySelector('thead').innerHTML = operator === 'NOT'
        ? '<tr><th scope="col">A</th><th scope="col">NOT A</th></tr>'
        : `<tr><th scope="col">A</th><th scope="col">B</th><th scope="col">A ${operator} B</th></tr>`;
      table.querySelector('tbody').innerHTML = pair.map(values => {
        const active = values[0] === a && (operator === 'NOT' || values[1] === b);
        return `<tr ${active ? 'data-active="true"' : ''}>${values.map(value => `<td>${symbol(value)}</td>`).join('')}<td>${symbol(evaluate(operator, values[0], values[1]))}</td></tr>`;
      }).join('');
    }
    lab.querySelectorAll('[data-operator]').forEach(button => button.addEventListener('click', () => { operator = button.dataset.operator; render(); }));
    aInput.addEventListener('change', render);
    bInput.addEventListener('change', render);
    render();
  });
})();
