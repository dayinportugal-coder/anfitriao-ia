/* Gerador do guia da casa (só PT) + 3 respostas-modelo. Tudo no navegador; nada é enviado. */
(function(){
  var KEY = "aia_guia_v1";
  var E = function(s){ return AIA.esc(s); };
  function lines(s){ return String(s || "").split(/\n+/).map(function(x){ return x.trim(); }).filter(Boolean); }
  function hhmm(t){ return t ? t.replace(/^0(\d)/, "$1").replace(":00", "h").replace(":", "h") : ""; }
  function data(f){
    var d = {};
    Array.prototype.forEach.call(f.elements, function(el){ if (!el.name) return; d[el.name] = el.type === "checkbox" ? el.checked : el.value.trim(); });
    return d;
  }
  function fill(f, d){
    Array.prototype.forEach.call(f.elements, function(el){ if (!el.name || !(el.name in d)) return; if (el.type === "checkbox") el.checked = !!d[el.name]; else el.value = d[el.name]; });
  }
  var ACESSO = {
    cofre: "As chaves estão num cofre de chaves junto à entrada. Enviamos o código antes da chegada.",
    fechadura: "A porta tem fechadura eletrónica. Enviamos o código antes da chegada.",
    pessoal: "Entregamos as chaves pessoalmente. Avisem-nos da hora prevista de chegada."
  };
  var SAIDA_CHAVES = {
    cofre: "Deixem as chaves no cofre de chaves e fechem-no.",
    fechadura: "A porta tranca automaticamente. Confirmem que ficou bem fechada.",
    pessoal: "Entreguem-nos as chaves pessoalmente (combinem a hora connosco)."
  };
  var ESTAC = {
    rua: "Estacionamento na rua (vejam a sinalização: algumas zonas são pagas).",
    privado: "Lugar de estacionamento privado incluído.",
    nenhum: "O alojamento não tem estacionamento próprio."
  };
  function guide(d){
    var h = [];
    h.push('<p class="printonly meta">Livro de informações · ' + E(d.nome) + '</p>');
    h.push("<h2>" + E(d.nome) + "</h2>");
    var meta = [E(d.localidade)];
    if (d.morada) meta.push(E(d.morada));
    if (d.registo) meta.push("N.º de registo AL: " + E(d.registo));
    h.push('<p class="meta">' + meta.join(" · ") + "</p>");
    h.push("<h3>Bem-vindos</h3><p>Sejam bem-vindos a " + E(d.nome) + "! É um prazer recebê-los. Neste guia encontram as informações e as regras da casa para uma estadia tranquila. Se tiverem alguma dúvida, contactem-nos.</p>");
    h.push("<h3>Chegada</h3><ul><li>Check-in a partir das " + E(hhmm(d.checkin)) + ".</li><li>" + ACESSO[d.acesso] + "</li>" + (d.andar ? "<li>Andar / porta: " + E(d.andar) + "</li>" : "") + "</ul>");
    if (d.wifi_rede) h.push("<h3>Wi-Fi</h3><ul><li>Rede: <strong>" + E(d.wifi_rede) + "</strong></li>" + (d.wifi_pass ? "<li>Palavra-passe: <strong>" + E(d.wifi_pass) + "</strong></li>" : "") + "</ul>");
    h.push("<h3>Estacionamento</h3><p>" + ESTAC[d.estacionamento] + (d.estac_notas ? " " + E(d.estac_notas) : "") + "</p>");
    var r = [];
    r.push("Capacidade máxima: " + E(d.capacidade) + " hóspedes. Não podem pernoitar pessoas adicionais.");
    r.push(d.fumar === "exterior" ? "Só é permitido fumar no exterior ou na varanda. Usem o cinzeiro." : "É proibido fumar no interior do alojamento.");
    r.push(d.animais === "sim" ? "Animais de estimação são bem-vindos, mediante aviso prévio." : "Não são permitidos animais de estimação.");
    lines(d.regras).forEach(function(x){ r.push(E(x)); });
    r.push("Quando saírem, fechem portas e janelas e desliguem as luzes, o ar condicionado e o aquecimento.");
    r.push("Comuniquem-nos qualquer avaria ou dano assim que possível.");
    h.push("<h3>Regras da casa</h3><ul>" + r.map(function(x){ return "<li>" + x + "</li>"; }).join("") + "</ul>");
    var ruido = ["Horário de silêncio: a partir das " + E(hhmm(d.silencio)) + " e até às 8h. Neste período, mantenham o volume baixo (vozes, música e televisão)."];
    if (d.predio) ruido.push("Vivem pessoas neste prédio: falem baixo nas escadas e nos corredores e não batam com as portas. Se chegarem ou saírem à noite, transportem as malas em vez de as arrastar.");
    h.push("<h3>Ruído e vizinhança</h3><ul>" + ruido.map(function(x){ return "<li>" + x + "</li>"; }).join("") + "</ul>");
    if (d.predio) {
      var c = lines(d.condominio);
      h.push("<h3>Regras do condomínio</h3>" + (c.length ? "<ul>" + c.map(function(x){ return "<li>" + E(x) + "</li>"; }).join("") + "</ul>" :
        '<p><em>[Acrescente aqui as regras do condomínio relevantes para os hóspedes: a lei exige-as em prédios de habitação coletiva.]</em></p>'));
    }
    h.push("<h3>Lixo e reciclagem</h3><p>Em Portugal o lixo é separado nos ecopontos:</p><ul>" +
      "<li><strong>Amarelo</strong>: embalagens de plástico e de metal (garrafas, latas, pacotes de leite e de sumo).</li>" +
      "<li><strong>Azul</strong>: papel e cartão (sem gordura).</li>" +
      "<li><strong>Verde</strong>: garrafas, frascos e boiões de vidro, sem tampas.</li>" +
      "<li><strong>Indiferenciado</strong>: o resto do lixo, em sacos bem fechados.</li></ul>" +
      (d.ecoponto ? "<p>Ecoponto mais próximo: " + E(d.ecoponto) + "</p>" : ""));
    h.push("<h3>Eletrodomésticos</h3><p><em>[Acrescente aqui como funcionam a placa, o forno, as máquinas, o ar condicionado e a água quente: a lei pede que o livro de informações explique o funcionamento dos eletrodomésticos.]</em></p>");
    if (d.transportes) h.push("<h3>Transportes</h3><p>" + E(d.transportes).replace(/\n/g, "<br>") + "</p>");
    var rec = lines(d.recomendacoes);
    if (rec.length) h.push("<h3>Sugestões perto de casa</h3><ul>" + rec.map(function(x){ return "<li>" + E(x) + "</li>"; }).join("") + "</ul>");
    h.push("<h3>Saída</h3><ul><li>Check-out até às " + E(hhmm(d.checkout)) + ".</li><li>" + SAIDA_CHAVES[d.acesso] + "</li><li>Fechem as janelas e desliguem as luzes, o ar condicionado e o aquecimento.</li></ul>");
    var em = ["Emergência (ambulância, bombeiros, polícia): <strong>112</strong>",
      "Linha SNS 24 (aconselhamento de saúde, 24 h): <strong>808 24 24 24</strong>",
      "Responsável pelo alojamento: <strong>" + E(d.contacto_nome) + "</strong>, <strong>" + E(d.contacto_tel) + "</strong>" + (d.contacto_email ? " · " + E(d.contacto_email) : "")];
    if (d.seguranca_local) em.push("Extintor, manta de incêndio e kit de primeiros socorros: " + E(d.seguranca_local));
    em.push("Livro de Reclamações: existe em papel (peçam-no ao responsável) e em formato eletrónico em www.livroreclamacoes.pt.");
    h.push("<h3>Emergências e contactos</h3><ul>" + em.map(function(x){ return "<li>" + x + "</li>"; }).join("") + "</ul>");
    h.push("<p>Obrigado pela visita e boa estadia!</p>");
    return h.join("\n");
  }
  function answers(d){
    var nome = d.contacto_nome ? d.contacto_nome.split(" ")[0] : "";
    var sig = "\n\nAté breve,\n" + (nome || "[o seu nome]");
    var A = [
      ["Check-in: como entro?", "Olá [nome do hóspede]!\n\nO check-in em " + d.nome + " é a partir das " + hhmm(d.checkin) + ". " + ACESSO[d.acesso] +
        (d.andar ? " Fica no " + d.andar + "." : "") + (d.morada ? " Morada: " + d.morada + "." : "") +
        "\n\nSe precisar de alguma coisa no dia, ligue-me: " + d.contacto_tel + "." + sig],
      ["Qual é a password do Wi-Fi?", "Olá [nome do hóspede]!\n\n" + (d.wifi_rede ? "A rede Wi-Fi é «" + d.wifi_rede + "»" + (d.wifi_pass ? " e a palavra-passe é «" + d.wifi_pass + "»." : ".") : "[Indique aqui a rede e a palavra-passe do Wi-Fi.]") +
        " Também está no guia da casa. Se a ligação falhar, desligue o router da tomada durante 30 segundos e volte a ligar. Se continuar sem internet, diga-me." + sig],
      ["Posso fazer o check-out mais tarde?", "Olá [nome do hóspede]!\n\nO check-out é até às " + hhmm(d.checkout) + ". Vou ver se não há hóspedes a chegar nesse dia e confirmo-lhe se é possível sair mais tarde. " +
        SAIDA_CHAVES[d.acesso] + "\n\nObrigado pela estadia!" + sig]
    ];
    return A.map(function(a, i){
      return '<div class="answer"><div class="q">' + E(a[0]) + '</div><pre id="ans-' + i + '">' + E(a[1]) + '</pre><button class="btn small alt" type="button" data-copy-target="ans-' + i + '">Copiar / Copy</button></div>';
    }).join("");
  }
  document.addEventListener("DOMContentLoaded", function(){
    var f = document.getElementById("guia-form");
    var res = document.getElementById("guia-result");
    try { var saved = JSON.parse(localStorage.getItem(KEY) || "null"); if (saved) fill(f, saved); } catch(e){}
    f.addEventListener("submit", function(ev){
      ev.preventDefault();
      if (!f.checkValidity()) { f.reportValidity(); return; }
      var d = data(f);
      try { localStorage.setItem(KEY, JSON.stringify(d)); } catch(e){}
      document.getElementById("guia-out").innerHTML = guide(d);
      var r = document.getElementById("respostas"); r.innerHTML = answers(d);
      r.querySelectorAll("[data-copy-target]").forEach(function(b){ b.addEventListener("click", function(){ AIA.copy(document.getElementById(b.getAttribute("data-copy-target")).innerText); }); });
      f.hidden = true; res.hidden = false; res.scrollIntoView({behavior: "smooth"});
    });
    document.getElementById("guia-edit").addEventListener("click", function(){ res.hidden = true; f.hidden = false; f.scrollIntoView(); });
    document.getElementById("guia-clear").addEventListener("click", function(){ try { localStorage.removeItem(KEY); } catch(e){} f.reset(); });
  });
})();
