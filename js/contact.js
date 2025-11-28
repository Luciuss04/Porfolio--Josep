(function(){
  var estat = document.getElementById('estado');
  var form = document.getElementById('formulario');
  if (!form) return;
  var webhookURL = window.CONFIG_WEBHOOK_URL || '';
  var mention = window.CONFIG_MENTION || '';
  var lang = (document.documentElement.getAttribute('lang')||'').toLowerCase();
  var texts = {
    es:{fill:"⚠️ Por favor, completa todos los campos.", success:"✨ ¡Gracias! Tu mensaje ha sido enviado.", copy:"✨ Tu mensaje se ha copiado. Pégalo en tu app favorita.", copyErr:"❌ No se pudo copiar el mensaje: ", sendErr:"❌ Error al enviar el mensaje: "},
    en:{fill:"⚠️ Please fill in all fields.", success:"✨ Thank you! Your message was sent.", copy:"✨ Your message was copied. Paste it in your app.", copyErr:"❌ Could not copy message: ", sendErr:"❌ Error sending message: "},
    va:{fill:"⚠️ Per favor, ompli tots els camps.", success:"✨ Gràcies! Enviat.", copy:"✨ El teu missatge s'ha copiat.", copyErr:"❌ No s'ha pogut copiar: ", sendErr:"❌ Error en l'enviament: "},
    ja:{fill:"⚠️ すべての項目を入力してください。", success:"✨ ありがとうございます！送信されました。", copy:"✨ メッセージをコピーしました。", copyErr:"❌ コピーできませんでした: ", sendErr:"❌ 送信エラー: "}
  };
  var t = texts[lang] || texts.en;
  form.addEventListener('submit', async function(e){
    e.preventDefault();
    var nom = document.getElementById('nombre').value.trim();
    var correu = document.getElementById('email').value.trim();
    var missatge = document.getElementById('mensaje').value.trim();
    var idioma = (form.querySelector('input[name="idioma"]')||{}).value || '';
    if (!nom || !correu || !missatge){ estat.textContent = t.fill; estat.className = 'mensaje-estado mensaje-error'; estat.style.display = 'block'; return; }
    if (webhookURL){
      var embed = { content: mention ? (mention+" ")+"⚡" : "⚡", embeds: [{ title: "Mensaje", color: 0x9B59B6, fields: [ { name: "Idioma", value: idioma||lang, inline: true }, { name: "Nombre", value: nom, inline: true }, { name: "Email", value: correu, inline: true }, { name: "Mensaje", value: missatge } ], timestamp: new Date().toISOString() }] };
      fetch(webhookURL, { method:'POST', headers:{ 'Content-Type':'application/json' }, body: JSON.stringify(embed) })
      .then(function(){ estat.textContent = t.success; estat.className = 'mensaje-estado mensaje-exito'; estat.style.display = 'block'; form.reset(); })
      .catch(function(err){ estat.textContent = t.sendErr + err.message; estat.className = 'mensaje-estado mensaje-error'; estat.style.display = 'block'; });
    } else {
      var texto = "Idioma: "+(idioma||lang)+"\nNombre: "+nom+"\nCorreo: "+correu+"\nMensaje:\n"+missatge;
      try{ await navigator.clipboard.writeText(texto); estat.textContent = t.copy; estat.className = 'mensaje-estado mensaje-exito'; estat.style.display = 'block'; form.reset(); }
      catch(err){ estat.textContent = t.copyErr + err.message; estat.className = 'mensaje-estado mensaje-error'; estat.style.display = 'block'; }
    }
  });
  document.body.insertAdjacentHTML('beforeend','<button id="backToTop">↑</button>');
  var topBtn = document.getElementById('backToTop');
  if (topBtn){ topBtn.addEventListener('click', function(){ window.scrollTo({ top:0, behavior:'smooth' }); }); window.addEventListener('scroll', function(){ if(window.scrollY > 300){ topBtn.classList.add('show'); } else { topBtn.classList.remove('show'); } }); }
})();
