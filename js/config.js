/* ============================================================
   CONFIGURAÇÃO CENTRAL — edite SÓ este ficheiro para atualizar o site
   ============================================================ */
const CONFIG = {
  name: "014Barbershop",
  logo: "assets/img/logo.jpg", // trocar pela logo original em alta qualidade
  booksyUrl: "https://014barbershop.booksy.com/", // URL única usada por TODOS os botões de reserva
  instagramUrl: "https://www.instagram.com/014barbershop/",
  // Coordenadas aproximadas da zona indicada pelo código postal
  mapCoordinates: { lat: 32.660075, lon: -16.9500402 },
  // VÍDEOS da secção Instagram: ficheiro (sem som), imagem de capa e link do Reel no Instagram
  reels: [
    {
      video: "assets/video/reel-1.mp4",
      poster: "assets/video/reel-1.jpg",
      url: "https://www.instagram.com/reel/DeZjyerxNof/",
    },
    {
      video: "assets/video/reel-2.mp4",
      poster: "assets/video/reel-2.jpg",
      url: "https://www.instagram.com/reel/DdzFaY3iAnB/",
    },
    {
      video: "assets/video/reel-3.mp4",
      poster: "assets/video/reel-3.jpg",
      url: "https://www.instagram.com/reel/Dcl5FKZMHib/",
    },
    {
      video: "assets/video/reel-4.mp4",
      poster: "assets/video/reel-4.jpg",
      url: "https://www.instagram.com/reel/DbyF6FGtBLd/",
    },
    {
      video: "assets/video/reel-5.mp4",
      poster: "assets/video/reel-5.jpg",
      url: "https://www.instagram.com/reel/DZXdhdpAMzg/",
    },
    {
      video: "assets/video/reel-6.mp4",
      poster: "assets/video/reel-6.jpg",
      url: "https://www.instagram.com/reel/DZKwoSgs4zL/",
    },
  ],
  instagramHandle: "@014barbershop",
  address:
    "Caminho de 29A, Tv. de Santa Quitéria 29A, 9020-119, Funchal, Portugal",
  // Cores: ver variáveis no topo de css/style.css

  // Fotografias (trocar por fotos reais; manter proporção aproximada)
  images: {
    hero: {
      src: "assets/img/hero.jpg",
      alt: "Corte com cabelo penteado para trás e barba alinhada",
      pos: "70% 30%",
    },
    about: { src: "assets/img/equipa.jpg", alt: "Equipa da 014Barbershop" },
    // GALERIA "O detalhe faz a diferença": 4 fotos. pos = enquadramento (mantém logo e rosto visíveis)
    gallery: [
      {
        src: "assets/img/corte-1.jpg",
        alt: "Degradê com linhas e barba alinhada",
        title: "Degradê e freestyle",
        pos: "12% 50%",
      },
      {
        src: "assets/img/corte-2.jpg",
        alt: "Corte infantil com degradê lateral",
        title: "Corte infantil",
        pos: "50% 30%",
      },
      {
        src: "assets/img/corte-3.jpg",
        alt: "Degradê em cabelo cacheado",
        title: "Cabelo cacheado",
        pos: "35% 50%",
      },
      {
        src: "assets/img/corte-4.jpg",
        alt: "Degradê clássico com acabamento limpo",
        title: "Degradê clássico",
        pos: "40% 50%",
      },
    ],
    // Fotos das categorias principais (null = placeholder dourado)
    categories: {
      cortes: "assets/img/cortes.jpg",
      barba: "assets/img/barba.jpg",
      imagem: "assets/img/imagem.jpg",
      tratamentos: "assets/img/tratamentos.jpg",
    },
    // Proporção (largura/altura) de cada foto — o cartão adapta-se para mostrar a foto INTEIRA. Ex.: 0.75 = vertical 3:4, 1 = quadrada
    categoryRatio: { cortes: 0.75, barba: 1, imagem: 0.75, tratamentos: 0.75 },
  },

  // Serviços (sem preços — consultar no Booksy). main:true = destaque na grelha
  categories: [
    {
      id: "cortes",
      title: "Cortes de cabelo",
      text: "Do clássico ao moderno.",
      main: true,
      items: [
        "Degradê / Fade",
        "Tesoura / Scissor Cut",
        "Simples / Simple Haircut",
        "Rapa / Buzzcut",
        "Cabelo Jeicsi",
        "Freestyle",
      ],
    },
    {
      id: "barba",
      title: "Barba",
      text: "Linhas limpas e barba alinhada.",
      main: true,
      items: [
        "Alinhamento de Barba / Beard Design",
        "Cabelo e Barba / Hair and Beard",
        "Rapado e Barba / Buzzcut and Beard",
        "Cabelo e Barba Jeicsi",
      ],
    },
    {
      id: "imagem",
      title: "Cuidados de imagem",
      text: "Os detalhes que completam o visual.",
      main: true,
      items: [
        "Degradê + Sobrancelhas / Fade + Eyebrows",
        "Degradê + Barba + Pigmentação",
        "Sobrancelhas a Cera / Wax Eyebrows",
      ],
    },
    {
      id: "tratamentos",
      title: "Tratamentos",
      text: "Coloração e cuidados para o cabelo.",
      main: true,
      items: [
        "Descoloração / Bleaching",
        "Pigmentação Preta Cabelo / Hair Pigmentation",
        "Madeixas / Highlights",
        "Selagem / Sealing",
        "Nariz e Orelhas a Cera / Nose and Ears Waxing",
        "Coloração / Coloring",
        "Hidratação",
      ],
    },
    {
      id: "faciais",
      title: "Tratamentos faciais",
      text: "Cuidados para a pele do rosto.",
      items: [
        "Máscara Preta / Black Mask",
        "Hidratação Facial / Hydrating Facial Mask",
        "Limpeza Facial / Facial Cleansing",
      ],
    },
    {
      id: "assinatura",
      title: "Assinatura 014Barbershop",
      text: "Serviços destinados aos clientes abrangidos pelos pacotes de assinatura, conforme a descrição disponibilizada no Booksy.",
      signature: true,
      items: [
        "Barba Assinatura",
        "Cabelo Assinatura",
        "Cabelo e Barba Assinatura",
      ],
    },
  ],

  // Equipa — confirmar nomes com a barbearia. Sem foto: usa a inicial. visible:false oculta o perfil
  team: [
    {
      visible: true,
      name: "Jeicsi",
      role: "",
      bio: "",
      photo: "",
      instagram: "",
    },
    {
      visible: true,
      name: "Otávio",
      role: "",
      bio: "",
      photo: "",
      instagram: "",
    },
    {
      visible: true,
      name: "Eliana",
      role: "",
      bio: "",
      photo: "",
      instagram: "",
    },
    {
      visible: true,
      name: "Xandy",
      role: "",
      bio: "",
      photo: "",
      instagram: "",
    },
  ],
};
