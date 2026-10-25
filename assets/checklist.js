/* Checklist: marcações guardadas no localStorage deste navegador */
(function(){
  var KEY = "aia_checklist_v1";
  function load(){ try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch(e){ return {}; } }
  function save(s){ try { localStorage.setItem(KEY, JSON.stringify(s)); } catch(e){} }
  document.addEventListener("DOMContentLoaded", function(){
    var boxes = Array.prototype.slice.call(document.querySelectorAll("input[data-cl]"));
    var state = load();
    function update(){
      var n = boxes.filter(function(b){ return b.checked; }).length;
      var bar = document.getElementById("cl-bar"); if (bar) bar.style.width = (100 * n / boxes.length) + "%";
      var c = document.getElementById("cl-count");
      if (c) c.textContent = AIA.lang() === "en" ? (n + " of " + boxes.length + " done") : (n + " de " + boxes.length + " cumpridas");
    }
    boxes.forEach(function(b){
      b.checked = !!state[b.getAttribute("data-cl")];
      b.addEventListener("change", function(){ state[b.getAttribute("data-cl")] = b.checked; save(state); update(); });
    });
    var r = document.getElementById("cl-reset");
    if (r) r.addEventListener("click", function(){ state = {}; save(state); boxes.forEach(function(b){ b.checked = false; }); update(); });
    document.addEventListener("aia:lang", update);
    update();
  });
})();
