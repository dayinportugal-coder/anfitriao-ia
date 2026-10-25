/* Anfitrião IA — comum a todas as páginas: língua PT/EN, copiar, aviso, formulário com fallback mailto */
(function(){
  var KEY = "aia_lang";
  var root = document.documentElement;
  function getLang(){ try { return localStorage.getItem(KEY) || "pt"; } catch(e){ return "pt"; } }
  function setLang(l){
    root.setAttribute("data-lang", l);
    root.setAttribute("lang", l === "en" ? "en" : "pt-PT");
    try { localStorage.setItem(KEY, l); } catch(e){}
    var t = root.getAttribute("data-title-" + l); if (t) document.title = t;
    document.querySelectorAll("[data-ph-pt]").forEach(function(el){ el.placeholder = el.getAttribute("data-ph-" + l) || ""; });
    document.querySelectorAll(".langbtn").forEach(function(b){
      b.textContent = l === "en" ? "PT" : "EN";
      b.setAttribute("aria-label", l === "en" ? "Mudar para português" : "Switch to English");
    });
    document.dispatchEvent(new CustomEvent("aia:lang", {detail: l}));
  }
  window.AIA = window.AIA || {};
  AIA.lang = function(){ return root.getAttribute("data-lang") || "pt"; };
  AIA.setLang = setLang;
  AIA.toast = function(msg){
    var t = document.getElementById("toast");
    if (!t){ t = document.createElement("div"); t.id = "toast"; t.className = "toast"; t.setAttribute("role","status"); t.setAttribute("aria-live","polite"); document.body.appendChild(t); }
    t.textContent = msg; t.classList.add("show"); clearTimeout(t._h); t._h = setTimeout(function(){ t.classList.remove("show"); }, 1800);
  };
  AIA.copy = function(text){
    var done = function(){ AIA.toast(AIA.lang()==="en" ? "Copied" : "Copiado"); };
    if (navigator.clipboard && window.isSecureContext) { navigator.clipboard.writeText(text).then(done, function(){ fallback(); }); }
    else fallback();
    function fallback(){
      var ta = document.createElement("textarea"); ta.value = text; ta.setAttribute("readonly",""); ta.style.position="fixed"; ta.style.opacity="0";
      document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); done(); } catch(e){} document.body.removeChild(ta);
    }
  };
  AIA.esc = function(s){ return String(s == null ? "" : s).replace(/[&<>"']/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]; }); };

  document.addEventListener("DOMContentLoaded", function(){
    setLang(getLang());
    document.querySelectorAll(".langbtn").forEach(function(b){ b.addEventListener("click", function(){ setLang(AIA.lang()==="en" ? "pt" : "en"); }); });
    document.querySelectorAll("[data-copy-target]").forEach(function(b){
      b.addEventListener("click", function(){ var el = document.getElementById(b.getAttribute("data-copy-target")); if (el) AIA.copy(el.innerText.trim()); });
    });
    document.querySelectorAll("[data-print]").forEach(function(b){ b.addEventListener("click", function(){ window.print(); }); });
    var y = document.getElementById("year"); if (y) y.textContent = new Date().getFullYear();

    /* Formulários: tenta enviar para o Netlify Forms (POST para "/").
       Se não estiver no Netlify (ficheiro local, GitHub Pages, localhost), o POST falha
       e abrimos o programa de email com os dados preenchidos (fallback mailto). */
    var BASE = root.getAttribute("data-base") || "";
    var MAILTO_ONLY = root.getAttribute("data-forms") === "mailto";
    document.querySelectorAll("form[data-netlify], form[data-mailto]").forEach(function(f){
      f.addEventListener("submit", function(ev){
        ev.preventDefault();
        if (!f.checkValidity()) { f.reportValidity(); return; }
        var btn = f.querySelector("[type=submit]"); if (btn) btn.disabled = true;
        var data = new URLSearchParams(new FormData(f)).toString();
        var mailto = function(){
          var lines = [];
          Array.prototype.forEach.call(f.elements, function(el){
            if (!el.name || el.name === "form-name" || el.name === "bot-field" || el.type === "submit") return;
            if (el.type === "checkbox") { lines.push(el.name + ": " + (el.checked ? "sim" : "não")); return; }
            lines.push(el.name + ": " + el.value);
          });
          var subject = f.getAttribute("data-mail-subject") || "Pré-reserva Kit AL";
          if (btn) btn.disabled = false;
          var st = f.querySelector(".form-status");
          if (st) st.hidden = false;
          location.href = "mailto:dayinportugal@gmail.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(lines.join("\n"));
        };
        if (MAILTO_ONLY || location.protocol === "file:") { mailto(); return; }
        fetch(BASE + "/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: data })
          .then(function(r){ if (r.ok) { location.href = f.getAttribute("action") || (BASE + "/obrigado.html"); } else mailto(); })
          .catch(mailto);
      });
    });
  });
})();
