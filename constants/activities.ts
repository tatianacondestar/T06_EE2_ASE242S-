export type Activity = {
  id: string;
  name: string;
  short: string;
  image: string;
  duration: string;
  level: string;
  includes: string[];
};

export const bookingOptions = [
  {
    id: "canotaje",
    image:
      "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0b/97/59/a0.jpg",
  },
  {
    id: "zip-line",
    image:
      "https://expedicioneslunahuana.com/wp-content/uploads/2026/02/dasd-2.png",
  },
  {
    id: "cuatrimotos",
    image:
      "https://adventur.pe/wp-content/uploads/2024/08/paseo-en-cuatrimoto.webp",
  },
];

export const activityDetails: Activity[] = [
  {
    id: "caballos",
    name: "Paseo a Caballos",
    short: "Recorrido tranquilo para toda la familia.",
    image: "https://www.jalara.pe/gallery/paseo-caballos/paseo-caballos.jpg",
    duration: "30 a 45 minutos",
    level: "Suave / familiar",
    includes: ["Guia local", "Ruta por el valle", "Equipo basico de seguridad"],
  },
  {
    id: "zip-line",
    name: "Zip Line",
    short: "Deslizate con vista panoramica del valle.",
    image:
      "https://www.ericadventures.com/wp-content/uploads/peru-lima-lunahuana-canopy-tours3.jpg",
    duration: "20 a 30 minutos",
    level: "Moderado",
    includes: ["Arnes y casco", "Guia certificado", "Briefing de seguridad"],
  },
  {
    id: "rapel",
    name: "Rapel en Lunahuana",
    short: "Descenso vertical guiado en entorno natural.",
    image: "https://www.ericadventures.com/wp-content/uploads/lunahuanas-1.jpg",
    duration: "45 a 60 minutos",
    level: "Intermedio",
    includes: ["Cuerdas y casco", "Instructor", "Zona segura de descenso"],
  },
  {
    id: "tour",
    name: "Tour Guiado",
    short: "Conoce historia, cultura y puntos clave del valle.",
    image:
      "https://sumaquillatours.com/wp-content/uploads/2022/09/lunahuana.jpg",
    duration: "1.5 a 2 horas",
    level: "Suave",
    includes: ["Guia local", "Ruta turistica", "Paradas fotograficas"],
  },
  {
    id: "canotaje",
    name: "Canotaje",
    short: "Rapidos y adrenalina en el rio Canete.",
    image:
      "https://travitour.pe/cdn/shop/files/CANOTAJEEXTREMOENELRIOMAYOENTARAPOTOSANMARTIN_6.jpg?v=1684289373&width=1445",
    duration: "45 a 60 minutos",
    level: "Moderado a intenso",
    includes: ["Balsa y remo", "Chaleco salvavidas", "Guia experto"],
  },
  {
    id: "cuatrimotos",
    name: "Circuito en Cuatrimotos",
    short: "Recorre rutas off-road y paisajes del valle.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoYbYC4R_UkbztjSxU-fMDeoSfXtOX1yeYwg&s",
    duration: "30 a 45 minutos",
    level: "Moderado",
    includes: ["Cuatrimoto", "Casco", "Acompanamiento en ruta"],
  },
];
