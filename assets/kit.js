/* Página do Kit AL: exemplo fictício nas 4 línguas e lista das 20 respostas-modelo */
(function(){
  var TOPICS = {
    pt: ["Instruções de chegada (check-in)","Check-in antecipado","Guardar bagagem antes ou depois","Wi-Fi","Estacionamento","Check-out e check-out tardio","Animais de estimação","Como chegar e transportes","Lixo e reciclagem","Aquecimento e ar condicionado","Água quente","Avaria ou emergência","Restaurantes recomendados","Praias, passeios e o que visitar","Cancelamento e alteração de datas","Pedido de fatura","Hóspedes extra e visitas","Ruído e vizinhos","Pedido de dados de identificação (porquê o pedimos)","Agradecimento e pedido de avaliação"],
    en: ["Arrival instructions (check-in)","Early check-in","Luggage storage before or after","Wi-Fi","Parking","Check-out and late check-out","Pets","Getting there and public transport","Waste and recycling","Heating and air conditioning","Hot water","Breakdown or emergency","Restaurant tips","Beaches, walks and sights","Cancellation and date changes","Invoice request","Extra guests and visitors","Noise and neighbours","Request for ID details (why we ask)","Thank-you and review request"]
  };
  var EX = {
    pt: {
      h_air: "Anúncio Airbnb", h_title: "Título", h_desc: "Descrição", h_hl: "Destaques", h_book: "Booking.com", h_bname: "Nome do alojamento", h_bdesc: "Texto «Sobre o alojamento»",
      h_guide: "Excerto do guia da casa", h_ans: "3 das 20 respostas-modelo",
      title: "T1 com varanda a 5 min da praia",
      desc: "Apartamento T1 luminoso na Póvoa de Varzim, a 5 minutos a pé da praia e do centro. Tem varanda, cozinha equipada, Wi-Fi rápido e sofá-cama na sala, para até 4 hóspedes. Ideal para casais e famílias pequenas que querem praia, peixe fresco e passeios à beira-mar. Check-in autónomo a partir das 15h. Registo AL n.º 123456/AL.",
      hl: ["5 min a pé da praia e do centro","Varanda com sol à tarde","Check-in autónomo com cofre de chaves","Wi-Fi rápido, bom para teletrabalho"],
      bname: "Casa Maré – Póvoa de Varzim",
      bdesc: "A Casa Maré é um apartamento T1 a 5 minutos a pé da praia da Póvoa de Varzim. Tem um quarto com cama de casal, sala com sofá-cama, cozinha equipada e varanda. Restaurantes, supermercado e metro ficam perto. Registo AL n.º 123456/AL.",
      guide: "<h4>Lixo e reciclagem</h4><p>Em Portugal o lixo é separado nos ecopontos: amarelo (plástico e metal), azul (papel e cartão), verde (vidro). O ecoponto mais próximo fica em frente ao n.º 20.</p><h4>Ruído e vizinhança</h4><p>Vivem pessoas neste prédio. Entre as 23h e as 8h, mantenham o volume baixo e não arrastem as malas nas escadas.</p>",
      ans: [["Check-in","Olá Ana! O check-in é a partir das 15h. As chaves estão num cofre junto à porta; envio-lhe o código na véspera. Qualquer dúvida, ligue-me. Até breve, Rita"],
            ["Check-in antecipado","Olá Ana! Se o apartamento estiver pronto mais cedo, aviso-a no próprio dia. Se não estiver, pode deixar as malas no cofre de bagagem do prédio a partir das 11h."],
            ["Check-out tardio","Olá Ana! O check-out é até às 11h. Vou confirmar se não há hóspedes a chegar e respondo-lhe hoje se pode sair mais tarde."]]
    },
    en: {
      h_air: "Airbnb listing", h_title: "Title", h_desc: "Description", h_hl: "Highlights", h_book: "Booking.com", h_bname: "Property name", h_bdesc: "«About the property» text",
      h_guide: "House guide excerpt", h_ans: "3 of the 20 reply templates",
      title: "1-bed flat with balcony, 5 min to the beach",
      desc: "Bright one-bedroom flat in Póvoa de Varzim, a 5-minute walk from the beach and the town centre. Balcony, fully equipped kitchen, fast Wi-Fi and a sofa bed in the living room, for up to 4 guests. Ideal for couples and small families who want beach days, fresh fish and seaside walks. Self check-in from 3 pm. AL registration no. 123456/AL.",
      hl: ["5-minute walk to the beach and centre","Balcony with afternoon sun","Self check-in with key box","Fast Wi-Fi, good for remote work"],
      bname: "Casa Maré – Póvoa de Varzim",
      bdesc: "Casa Maré is a one-bedroom flat a 5-minute walk from the beach in Póvoa de Varzim. It has a double bedroom, a living room with sofa bed, an equipped kitchen and a balcony. Restaurants, a supermarket and the metro are nearby. AL registration no. 123456/AL.",
      guide: "<h4>Waste and recycling</h4><p>In Portugal waste is sorted at recycling points: yellow (plastic and metal), blue (paper and cardboard), green (glass). The nearest one is opposite no. 20.</p><h4>Noise and neighbours</h4><p>People live in this building. Between 11 pm and 8 am please keep the volume down and don't drag suitcases on the stairs.</p>",
      ans: [["Check-in","Hi Ana! Check-in is from 3 pm. The keys are in a key box by the door; I'll send you the code the day before. Any questions, just call me. See you soon, Rita"],
            ["Early check-in","Hi Ana! If the flat is ready earlier I'll let you know on the day. If not, you can leave your bags in the building's luggage locker from 11 am."],
            ["Late check-out","Hi Ana! Check-out is by 11 am. I'll check whether guests are arriving that day and let you know today if you can stay later."]]
    },
    es: {
      h_air: "Anuncio de Airbnb", h_title: "Título", h_desc: "Descripción", h_hl: "Puntos destacados", h_book: "Booking.com", h_bname: "Nombre del alojamiento", h_bdesc: "Texto «Sobre el alojamiento»",
      h_guide: "Extracto de la guía de la casa", h_ans: "3 de las 20 respuestas modelo",
      title: "Apartamento con balcón a 5 min de la playa",
      desc: "Luminoso apartamento de un dormitorio en Póvoa de Varzim, a 5 minutos a pie de la playa y del centro. Tiene balcón, cocina equipada, wifi rápido y sofá cama en el salón, para hasta 4 huéspedes. Ideal para parejas y familias pequeñas que buscan playa, pescado fresco y paseos junto al mar. Entrada autónoma desde las 15:00. Registro AL n.º 123456/AL.",
      hl: ["A 5 min a pie de la playa y del centro","Balcón con sol por la tarde","Entrada autónoma con caja de llaves","Wifi rápido, ideal para teletrabajo"],
      bname: "Casa Maré – Póvoa de Varzim",
      bdesc: "Casa Maré es un apartamento de un dormitorio a 5 minutos a pie de la playa de Póvoa de Varzim. Tiene un dormitorio con cama de matrimonio, salón con sofá cama, cocina equipada y balcón. Hay restaurantes, supermercado y metro cerca. Registro AL n.º 123456/AL.",
      guide: "<h4>Basura y reciclaje</h4><p>En Portugal la basura se separa en los contenedores: amarillo (plástico y metal), azul (papel y cartón), verde (vidrio). El más cercano está frente al n.º 20.</p><h4>Ruido y vecinos</h4><p>En este edificio vive gente. Entre las 23:00 y las 8:00, mantengan el volumen bajo y no arrastren las maletas por la escalera.</p>",
      ans: [["Entrada","¡Hola, Ana! La entrada es a partir de las 15:00. Las llaves están en una caja junto a la puerta; le envío el código el día antes. Para cualquier duda, llámeme. Hasta pronto, Rita"],
            ["Entrada anticipada","¡Hola, Ana! Si el apartamento está listo antes, se lo diré ese mismo día. Si no, puede dejar las maletas en la consigna del edificio desde las 11:00."],
            ["Salida tardía","¡Hola, Ana! La salida es hasta las 11:00. Voy a comprobar si llegan huéspedes ese día y hoy mismo le confirmo si puede salir más tarde."]]
    },
    fr: {
      h_air: "Annonce Airbnb", h_title: "Titre", h_desc: "Description", h_hl: "Points forts", h_book: "Booking.com", h_bname: "Nom de l'établissement", h_bdesc: "Texte « À propos de l'établissement »",
      h_guide: "Extrait du livret d'accueil", h_ans: "3 des 20 réponses types",
      title: "Appartement avec balcon à 5 min de la plage",
      desc: "Appartement lumineux avec une chambre à Póvoa de Varzim, à 5 minutes à pied de la plage et du centre. Balcon, cuisine équipée, Wi-Fi rapide et canapé-lit au salon, jusqu'à 4 voyageurs. Idéal pour les couples et les petites familles qui aiment la plage, le poisson frais et les balades en bord de mer. Arrivée autonome à partir de 15 h. Enregistrement AL n° 123456/AL.",
      hl: ["À 5 min à pied de la plage et du centre","Balcon ensoleillé l'après-midi","Arrivée autonome avec boîte à clés","Wi-Fi rapide, idéal pour le télétravail"],
      bname: "Casa Maré – Póvoa de Varzim",
      bdesc: "Casa Maré est un appartement d'une chambre à 5 minutes à pied de la plage de Póvoa de Varzim. Il comprend une chambre avec lit double, un salon avec canapé-lit, une cuisine équipée et un balcon. Restaurants, supermarché et métro à proximité. Enregistrement AL n° 123456/AL.",
      guide: "<h4>Déchets et recyclage</h4><p>Au Portugal, les déchets sont triés dans les conteneurs : jaune (plastique et métal), bleu (papier et carton), vert (verre). Le plus proche se trouve en face du n° 20.</p><h4>Bruit et voisinage</h4><p>Des personnes habitent dans cet immeuble. Entre 23 h et 8 h, merci de parler doucement et de ne pas traîner les valises dans l'escalier.</p>",
      ans: [["Arrivée","Bonjour Ana ! L'arrivée se fait à partir de 15 h. Les clés sont dans une boîte à côté de la porte ; je vous envoie le code la veille. Pour toute question, appelez-moi. À bientôt, Rita"],
            ["Arrivée anticipée","Bonjour Ana ! Si l'appartement est prêt plus tôt, je vous préviens le jour même. Sinon, vous pouvez déposer vos bagages dans la consigne de l'immeuble à partir de 11 h."],
            ["Départ tardif","Bonjour Ana ! Le départ est prévu avant 11 h. Je vérifie si des voyageurs arrivent ce jour-là et je vous confirme aujourd'hui si vous pouvez partir plus tard."]]
    }
  };
  var E = function(s){ return AIA.esc(s); };
  function counter(s, max){ var n = [...s].length; return '<span class="counter' + (n > max ? " over" : "") + '">' + n + " / " + max + "</span>"; }
  function render(l){
    var x = EX[l], i = 0;
    var h = '<div lang="' + l + '">';
    h += "<h3>" + x.h_air + "</h3><p><strong>" + x.h_title + ":</strong> " + E(x.title) + " " + counter(x.title, 50) + "</p>";
    h += "<p><strong>" + x.h_desc + ":</strong> " + counter(x.desc, 500) + '</p><p id="ex-desc">' + E(x.desc) + "</p>";
    h += "<p><strong>" + x.h_hl + ":</strong></p><ul>" + x.hl.map(function(s){ return "<li>" + E(s) + "</li>"; }).join("") + "</ul>";
    h += "<h3>" + x.h_book + "</h3><p><strong>" + x.h_bname + ":</strong> " + E(x.bname) + "</p><p><strong>" + x.h_bdesc + ":</strong> " + E(x.bdesc) + "</p>";
    h += "<h3>" + x.h_guide + "</h3>" + x.guide;
    h += "<h3>" + x.h_ans + "</h3>" + x.ans.map(function(a){ i++; return '<div class="answer"><div class="q">' + E(a[0]) + '</div><pre id="kex-' + i + '">' + E(a[1]) + "</pre></div>"; }).join("");
    h += "</div>";
    document.getElementById("kit-example").innerHTML = h;
    document.querySelectorAll("[data-ex]").forEach(function(b){ b.setAttribute("aria-selected", b.getAttribute("data-ex") === l ? "true" : "false"); });
  }
  function topics(){
    var t = TOPICS[AIA.lang() === "en" ? "en" : "pt"];
    document.getElementById("kit-topics").innerHTML = t.map(function(s){ return "<li>" + E(s) + "</li>"; }).join("");
  }
  window.AIA_KIT_EX = EX;
  document.addEventListener("DOMContentLoaded", function(){
    document.querySelectorAll("[data-ex]").forEach(function(b){ b.addEventListener("click", function(){ render(b.getAttribute("data-ex")); }); });
    render(AIA.lang() === "en" ? "en" : "pt"); topics();
    document.addEventListener("aia:lang", topics);
  });
})();
