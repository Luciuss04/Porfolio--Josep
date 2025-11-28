(function(){
  var temaGuardado = localStorage.getItem('tema');
  if (temaGuardado) document.documentElement.setAttribute('data-theme', temaGuardado);
  var btn = document.getElementById('toggle-tema');
  if (btn){
    var lang = (document.documentElement.getAttribute('lang')||'').toLowerCase();
    var labels = { es: 'Cambiar tema', en: 'Switch theme', va: 'Canviar tema', ja: 'テーマ切替' };
    var base = labels[lang] || labels.en;
    function update(){
      var claro = document.documentElement.getAttribute('data-theme') === 'light';
      btn.textContent = (claro ? '☀️ ' : '🌙 ') + base;
      btn.setAttribute('aria-pressed', claro ? 'true' : 'false');
    }
    update();
    btn.addEventListener('click', function(){
      var actual = document.documentElement.getAttribute('data-theme');
      var nuevo = actual === 'light' ? 'dark' : 'light';
      if (nuevo === 'dark') document.documentElement.removeAttribute('data-theme'); else document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('tema', nuevo);
      update();
    });
  }

  var cards = document.querySelectorAll('.card');
  for (var i=0;i<cards.length;i++){
    (function(card){
      card.addEventListener('mousemove', function(e){
        var r = card.getBoundingClientRect();
        var x = ((e.clientX - r.left)/r.width)*100;
        var y = ((e.clientY - r.top)/r.height)*100;
        card.style.setProperty('--hx', x+'%');
        card.style.setProperty('--hy', y+'%');
      });
      card.addEventListener('mouseleave', function(){ card.style.removeProperty('--hx'); card.style.removeProperty('--hy'); });
    })(cards[i]);
  }
  var secciones = document.querySelectorAll('.reveal');
  if (secciones.length){
    var io = new IntersectionObserver(function(entries){ entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('is-visible'); } }); }, { threshold: 0.15 });
    secciones.forEach(function(s){ io.observe(s); });
  }
  var enlaces = document.querySelectorAll('.menu-hero a');
  if (enlaces.length){
    var mapa = Array.prototype.map.call(enlaces, function(a){ var id = a.getAttribute('href').replace('#',''); return {a:a, id:id, el:document.getElementById(id)}; });
    window.addEventListener('scroll', function(){ var pos = window.scrollY + 100; var activo = null; mapa.forEach(function(m){ if(m.el && m.el.offsetTop <= pos) activo = m; }); enlaces.forEach(function(a){ a.classList.remove('active'); }); if(activo) activo.a.classList.add('active'); });
  }
  document.body.insertAdjacentHTML('beforeend','<button id="backToTop">↑</button>');
  var topBtn = document.getElementById('backToTop');
  if (topBtn){
    topBtn.addEventListener('click', function(){ window.scrollTo({ top:0, behavior:'smooth' }); });
    window.addEventListener('scroll', function(){ if(window.scrollY > 300){ topBtn.classList.add('show'); } else { topBtn.classList.remove('show'); } });
  }
  var cont = document.querySelector('.contenido-hero');
  window.addEventListener('mousemove', function(ev){ if(!cont) return; var x = (ev.clientX / window.innerWidth - 0.5) * 10; var y = (ev.clientY / window.innerHeight - 0.5) * 10; document.documentElement.style.setProperty('--tiltX', x+'px'); document.documentElement.style.setProperty('--tiltY', y+'px'); });
  var params = new URLSearchParams(location.search);
  var notice = document.getElementById('lang-notice');
  if (params.get('from') === 'redirect' && notice) { notice.classList.add('show'); setTimeout(function(){ notice.classList.remove('show'); }, 3200); }
  var langEl = document.documentElement.getAttribute('lang')||'';
  var links = document.querySelectorAll('nav .idiomas a');
  links.forEach(function(a){ var al = a.getAttribute('lang')||''; if (al && langEl && al.toLowerCase()===langEl.toLowerCase()){ a.classList.add('active'); a.setAttribute('aria-current','page'); } });
})();
