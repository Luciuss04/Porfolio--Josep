(function(){
  var qs = (location.search || '').toLowerCase();
  var hash = (location.hash || '').toLowerCase();
  if (qs.indexOf('no-redirect=1') !== -1 || hash.indexOf('no-redirect') !== -1) return;
  var lang = (navigator.languages && navigator.languages[0]) || navigator.language || '';
  lang = (lang || '').toLowerCase();
  var dest = 'en';
  if (lang.indexOf('es') === 0) dest = 'es';
  else if (lang.indexOf('en') === 0) dest = 'en';
  else if (lang.indexOf('ja') === 0) dest = 'jp';
  else if (lang.indexOf('ca') === 0 || lang.indexOf('val') !== -1) dest = 'va';
  var target = dest + '/index.html?from=redirect';
  if (location.pathname.indexOf('/' + target) === -1) {
    setTimeout(function(){ location.href = target; }, 350);
  }
})();
