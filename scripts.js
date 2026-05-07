/* ═══════════════════════════════════════════════════
   WUNDER DESIGNERS — Natalia López Carmona
   Scripts · Interactions · Canvas · Charts
   ═══════════════════════════════════════════════════ */

// ═══ CURSOR GLOW
const glow = document.getElementById('glow');
document.addEventListener('mousemove', e => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});

// ═══ NAV SCROLL
window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 50);
});

// ═══ SCROLL REVEAL
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

function initReveals() {
  document.querySelectorAll('.page.active .reveal').forEach(el => {
    el.classList.remove('visible');
    revealObserver.observe(el);
  });
}
initReveals();

// ═══ ANIMATED NUMBERS
const numObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting && !e.target.dataset.animated) {
      e.target.dataset.animated = '1';
      const target = parseInt(e.target.dataset.target);
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 45));
      const timer = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        e.target.textContent = current + (target < 10 ? '' : '+');
      }, 30);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-num[data-target]').forEach(el => numObserver.observe(el));

// ═══ PAGE META (SEO: title + description por página)
const pageMeta = {
  portfolio: {
    title: 'Wunder Designers — Natalia López Carmona | Diseño Web, Data Viz & UX en Colombia',
    description: 'Portafolio de Natalia López Carmona: diseño web UX/UI, dashboards en Power BI, branding, e-learning y estrategia digital. +10 años de experiencia en Manizales, Colombia.'
  },
  about: {
    title: 'Sobre Mí — Natalia López Carmona | Diseñadora, Filósofa & Estratega',
    description: 'Natalia López Carmona: diseñadora con maestría en Diseño Interactivo y más de 10 años en diseño web, visualización de datos y comunicación digital en Manizales, Colombia.'
  },
  'srv-branding': {
    title: 'Branding & Identidad Visual — Wunder Designers | Manizales, Colombia',
    description: 'Diseño de logotipos, sistemas de identidad visual, paletas de color y manuales de marca. Wunder Designers — Natalia López Carmona, Manizales, Colombia.'
  },
  'srv-estrategia': {
    title: 'Estrategia Digital & Contenidos — Wunder Designers | Colombia',
    description: 'Estrategia de contenidos, storytelling de marca, posicionamiento SEO y gestión de redes sociales. Wunder Designers — Manizales, Colombia.'
  },
  'srv-dashboards': {
    title: 'Dashboards & Visualización de Datos — Wunder Designers | Power BI, D3.js',
    description: 'Diseño de dashboards en Power BI y visualizaciones interactivas con D3.js. Transforma datos complejos en decisiones claras. Wunder Designers — Colombia.'
  },
  'srv-elearning': {
    title: 'E-Learning & Diseño Instruccional — Wunder Designers | Colombia',
    description: 'Diseño de cursos digitales, interfaces interactivas de aprendizaje e integración con Moodle y LMS. Wunder Designers — Manizales, Colombia.'
  },
  'srv-web': {
    title: 'Diseño Web & UX — Wunder Designers | HTML, WordPress, Figma',
    description: 'Diseño y desarrollo de sitios web con HTML/CSS/JS, WordPress y UX/UI en Figma. Portales institucionales y experiencias digitales. Manizales, Colombia.'
  },
  'srv-audiovisual': {
    title: 'Producción Audiovisual — Wunder Designers | Documentales & Divulgación Científica',
    description: 'Producción y edición de documentales de divulgación científica y piezas audiovisuales institucionales. Wunder Designers — Natalia López Carmona.'
  }
};

function updateMeta(page) {
  const m = pageMeta[page] || pageMeta.portfolio;
  document.title = m.title;
  document.querySelector('meta[name="description"]').setAttribute('content', m.description);
  document.querySelector('meta[property="og:title"]').setAttribute('content', m.title);
  document.querySelector('meta[property="og:description"]').setAttribute('content', m.description);
  document.querySelector('meta[name="twitter:title"]').setAttribute('content', m.title);
  document.querySelector('meta[name="twitter:description"]').setAttribute('content', m.description);
}

// ═══ PAGE SWITCHING
function switchPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');
  const navPage = page.startsWith('srv-') ? 'portfolio' : page;
  document.querySelectorAll('.nav-pill').forEach(n => {
    n.classList.toggle('active', n.dataset.page === navPage);
  });
  updateMeta(page);
  window.scrollTo({ top: 0, behavior: 'smooth' });
  setTimeout(initReveals, 100);
  document.getElementById('navLinks').classList.remove('open');
}

function scrollToEl(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}

// ═══ TRANSLATIONS
const translations = {
  es: {
    'nav.portfolio':'Portafolio','nav.about':'Sobre Mí','nav.contact':'Contacto','nav.cv':'↓ Descargar CV',
    'hero.tag':'Diseño · Estrategia · Datos · Comunicación','hero.h1a':'Datos que','hero.h1b':'inspiran diseño',
    'hero.sub':'Se transforma información compleja en experiencias visuales que impulsan decisiones. Más de 10 años integrando pensamiento crítico, narrativa digital y tecnología.',
    'hero.btn1':'Ver Proyectos →','hero.btn2':'Conóceme',
    'stat.projects':'Proyectos','stat.clients':'Clientes','stat.years':'Años Exp.','stat.degrees':'Títulos',
    'srv.section.tag':'Servicios','srv.section.title':'Lo que <em>se puede hacer</em> por ti','srv.section.sub':'Se combinan diseño, estrategia y tecnología para crear experiencias que conectan.',
    'srv.branding.title':'Branding & Identidad','srv.branding.desc':'Logos, paletas, sistemas visuales coherentes que comunican tu esencia.',
    'srv.estrategia.title':'Estrategia Digital','srv.estrategia.desc':'Marketing de contenidos, storytelling y posicionamiento digital.',
    'srv.dashboards.title':'Dashboards & Data Viz','srv.dashboards.desc':'Visualización interactiva que transforma números en decisiones.',
    'srv.elearning.title':'E-Learning','srv.elearning.desc':'Experiencias de aprendizaje digital y cursos interactivos.',
    'srv.web.title':'Diseño Web & UX','srv.web.desc':'Sitios con diseño editorial y experiencias memorables.',
    'srv.audiovisual.title':'Producción Audiovisual','srv.audiovisual.desc':'Documentales y narrativas para divulgación científica.',
    'prj.tag':'Portafolio','prj.title':'Proyectos <em>Destacados</em>','prj.sub':'Intersección entre diseño, datos y comunicación estratégica.',
    'dash.tag':'Analytics en Acción','dash.title':'Dashboard <em>Demo</em>','dash.sub':'Así se transforman datos en visualizaciones accionables.',
    'contact.tag':'Contacto','contact.title':'¿Lista para <em>transformar</em> tu proyecto?',
    'contact.sub':'Cuéntale sobre tu proyecto. Ya sea diseño, estrategia, dashboards o formación.','contact.email':'✉ Escríbele',
    'about.role':'Diseñadora · Filósofa · Estratega','about.download':'↓ Descargar CV en PDF (formato ATS)','about.download2':'↓ Descargar CV completo en PDF (formato ATS)',
    'about.profile.title':'Perfil Profesional',
    'about.profile.text':'Profesional con más de <strong>10 años de experiencia</strong> en diseño interactivo, visualización de datos, comunicación estratégica y gestión de proyectos digitales. Maestría en Diseño y Creación Interactiva, con formación en Filosofía y Sistemas Informáticos. Especializada en <strong>diseño web UX/UI</strong>, creación de <strong>dashboards interactivos</strong> y experiencias de datos que transforman información compleja en decisiones claras. Se integran el <strong>pensamiento crítico, la narrativa digital</strong> y el código limpio en interfaces que comunican con impacto.',
    'about.exp.title':'Experiencia Profesional','about.edu.title':'Educación','about.skills.title':'Habilidades','about.lang.title':'Idiomas',
    'about.lang.text':'Español — Nativo &nbsp;·&nbsp; Inglés — Intermedio',
    'srv.back.btn':'← Portafolio','srv.page.includes':'¿Qué incluye?','srv.page.ready':'¿Lista?',
    'srv.page.cta':'Hablemos de tu proyecto →','srv.page.back':'Ver más servicios',
    'srv.branding.page.tag':'Servicios · Branding','srv.branding.page.h1a':'Tu marca,','srv.branding.page.h1b':'una historia coherente',
    'srv.branding.page.sub':'Se construyen sistemas de identidad visual que van más allá del logo. Son la arquitectura visual de tu marca en todos los puntos de contacto.',
    'srv.branding.page.title':'Lo que <em>se construye juntas</em>','srv.branding.page.cta.title':'¿Quieres una identidad <em>que dure</em>?',
    'srv.estrategia.page.tag':'Servicios · Estrategia','srv.estrategia.page.h1a':'Comunicación','srv.estrategia.page.h1b':'que posiciona',
    'srv.estrategia.page.sub':'Se desarrollan estrategias de comunicación digital que articulan tu propuesta de valor, construyen audiencia y generan presencia con propósito.',
    'srv.estrategia.page.title':'Estrategia <em>con foco</em>','srv.estrategia.page.cta.title':'¿Tu marca <em>necesita dirección</em>?',
    'srv.dashboards.page.tag':'Servicios · Data','srv.dashboards.page.h1a':'Datos que','srv.dashboards.page.h1b':'cuentan historias',
    'srv.dashboards.page.sub':'Se diseñan y desarrollan dashboards e infográficos interactivos que convierten datos complejos en decisiones claras. Power BI, D3.js y visualización moderna.',
    'srv.dashboards.page.title':'Visualización <em>con propósito</em>','srv.dashboards.page.cta.title':'¿Tus datos <em>merecen ser vistos</em>?',
    'srv.elearning.page.tag':'Servicios · E-Learning','srv.elearning.page.h1a':'Aprendizaje','srv.elearning.page.h1b':'que transforma',
    'srv.elearning.page.sub':'Se diseñan experiencias de aprendizaje digital que combinan pedagogía, UX y narrativa para crear cursos que realmente funcionan.',
    'srv.elearning.page.title':'Formación <em>con diseño</em>','srv.elearning.page.cta.title':'¿Tu conocimiento <em>merece un mejor formato</em>?',
    'srv.web.page.tag':'Servicios · Web & UX','srv.web.page.h1a':'Experiencias','srv.web.page.h1b':'que conectan',
    'srv.web.page.sub':'Se diseñan y desarrollan sitios web con identidad editorial fuerte, código limpio y experiencias de usuario que las personas quieren recordar.',
    'srv.web.page.title':'Web con <em>propósito y estética</em>','srv.web.page.cta.title':'¿Tu proyecto <em>merece un buen sitio</em>?',
    'srv.audiovisual.page.tag':'Servicios · Audiovisual','srv.audiovisual.page.h1a':'Conocimiento','srv.audiovisual.page.h1b':'que se ve',
    'srv.audiovisual.page.sub':'Se producen y editan documentales y piezas audiovisuales que comunican conocimiento científico y cultural con rigor narrativo y sensibilidad estética.',
    'srv.audiovisual.page.title':'Narrativa <em>audiovisual</em>','srv.audiovisual.page.cta.title':'¿Tu historia <em>merece ser contada</em>?',
    'modal.deliverables':'Lo que se desarrolló','modal.tech':'Tecnologías & herramientas','modal.cta':'¿Tienes un proyecto similar? →',
  },
  en: {
    'nav.portfolio':'Portfolio','nav.about':'About Me','nav.contact':'Contact','nav.cv':'↓ Download CV',
    'hero.tag':'Design · Strategy · Data · Communication','hero.h1a':'Data that','hero.h1b':'inspires design',
    'hero.sub':'Transforming complex information into visual experiences that drive decisions. Over 10 years integrating critical thinking, digital storytelling and technology.',
    'hero.btn1':'View Projects →','hero.btn2':'About Me',
    'stat.projects':'Projects','stat.clients':'Clients','stat.years':'Yrs. Exp.','stat.degrees':'Degrees',
    'srv.section.tag':'Services','srv.section.title':'What can be <em>done for you</em>','srv.section.sub':'Combining design, strategy and technology to create experiences that connect.',
    'srv.branding.title':'Branding & Identity','srv.branding.desc':'Logos, palettes, coherent visual systems that communicate your essence.',
    'srv.estrategia.title':'Digital Strategy','srv.estrategia.desc':'Content marketing, storytelling and digital positioning.',
    'srv.dashboards.title':'Dashboards & Data Viz','srv.dashboards.desc':'Interactive visualization that turns numbers into decisions.',
    'srv.elearning.title':'E-Learning','srv.elearning.desc':'Digital learning experiences and interactive courses.',
    'srv.web.title':'Web Design & UX','srv.web.desc':'Editorial design websites and memorable experiences.',
    'srv.audiovisual.title':'Audiovisual Production','srv.audiovisual.desc':'Documentaries and narratives for scientific outreach.',
    'prj.tag':'Portfolio','prj.title':'<em>Featured</em> Projects','prj.sub':'Intersection of design, data and strategic communication.',
    'dash.tag':'Analytics in Action','dash.title':'Dashboard <em>Demo</em>','dash.sub':'Turning data into actionable visualizations.',
    'contact.tag':'Contact','contact.title':'Ready to <em>transform</em> your project?',
    'contact.sub':'Tell her about your project. Whether design, strategy, dashboards or training.','contact.email':'✉ Write to her',
    'about.role':'Designer · Philosopher · Strategist','about.download':'↓ Download CV in PDF (ATS format)','about.download2':'↓ Download full CV in PDF (ATS format)',
    'about.profile.title':'Professional Profile',
    'about.profile.text':'Professional with over <strong>10 years of experience</strong> in interactive design, data visualization, strategic communication and digital project management. Master\'s in Interactive Design & Creation, with a background in Philosophy and Computer Systems. Specialized in <strong>UX/UI web design</strong>, creating <strong>interactive dashboards</strong> and data experiences that transform complex information into clear decisions. Integrating <strong>critical thinking, digital storytelling</strong> and clean code to build interfaces that communicate with impact.',
    'about.exp.title':'Professional Experience','about.edu.title':'Education','about.skills.title':'Skills','about.lang.title':'Languages',
    'about.lang.text':'Spanish — Native &nbsp;·&nbsp; English — Intermediate',
    'srv.back.btn':'← Portfolio','srv.page.includes':'What\'s included?','srv.page.ready':'Ready?',
    'srv.page.cta':'Let\'s talk about your project →','srv.page.back':'View more services',
    'srv.branding.page.tag':'Services · Branding','srv.branding.page.h1a':'Your brand,','srv.branding.page.h1b':'a coherent story',
    'srv.branding.page.sub':'Building visual identity systems that go beyond the logo. The visual architecture of your brand across all touchpoints.',
    'srv.branding.page.title':'What gets <em>built together</em>','srv.branding.page.cta.title':'Want an identity <em>that lasts</em>?',
    'srv.estrategia.page.tag':'Services · Strategy','srv.estrategia.page.h1a':'Communication','srv.estrategia.page.h1b':'that positions',
    'srv.estrategia.page.sub':'Developing digital communication strategies that articulate your value proposition, build audience and generate purposeful presence.',
    'srv.estrategia.page.title':'Strategy <em>with focus</em>','srv.estrategia.page.cta.title':'Does your brand <em>need direction</em>?',
    'srv.dashboards.page.tag':'Services · Data','srv.dashboards.page.h1a':'Data that','srv.dashboards.page.h1b':'tells stories',
    'srv.dashboards.page.sub':'Designing and developing interactive dashboards and infographics that convert complex data into clear decisions. Power BI, D3.js and modern visualization.',
    'srv.dashboards.page.title':'Visualization <em>with purpose</em>','srv.dashboards.page.cta.title':'Do your data <em>deserve to be seen</em>?',
    'srv.elearning.page.tag':'Services · E-Learning','srv.elearning.page.h1a':'Learning','srv.elearning.page.h1b':'that transforms',
    'srv.elearning.page.sub':'Designing digital learning experiences that combine pedagogy, UX and narrative to create courses that actually work.',
    'srv.elearning.page.title':'Training <em>with design</em>','srv.elearning.page.cta.title':'Does your knowledge <em>deserve a better format</em>?',
    'srv.web.page.tag':'Services · Web & UX','srv.web.page.h1a':'Experiences','srv.web.page.h1b':'that connect',
    'srv.web.page.sub':'Designing and developing websites with strong editorial identity, clean code and user experiences people want to remember.',
    'srv.web.page.title':'Web with <em>purpose and aesthetics</em>','srv.web.page.cta.title':'Does your project <em>deserve a good site</em>?',
    'srv.audiovisual.page.tag':'Services · Audiovisual','srv.audiovisual.page.h1a':'Knowledge','srv.audiovisual.page.h1b':'made visible',
    'srv.audiovisual.page.sub':'Producing and editing documentaries and audiovisual pieces that communicate scientific and cultural knowledge with narrative rigor and aesthetic sensibility.',
    'srv.audiovisual.page.title':'<em>Audiovisual</em> narrative','srv.audiovisual.page.cta.title':'Does your story <em>deserve to be told</em>?',
    'modal.deliverables':'What was developed','modal.tech':'Technologies & tools','modal.cta':'Have a similar project? →',
  }
};

let currentLang = 'es';

function toggleLang() { setLang(currentLang === 'es' ? 'en' : 'es'); }

function setLang(lang) {
  currentLang = lang;
  const t = translations[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const v = t[el.dataset.i18n];
    if (v !== undefined) el.textContent = v;
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const v = t[el.dataset.i18nHtml];
    if (v !== undefined) el.innerHTML = v;
  });
  const btn = document.getElementById('langBtn');
  btn.textContent = lang === 'es' ? 'EN' : 'ES';
  btn.classList.toggle('active-lang', lang === 'en');
  document.documentElement.lang = lang;
}

// ═══ PROJECT DATA & MODAL
const projects = {
  'ux-autonoma': {
    icon: '🖥️',
    bg: 'linear-gradient(135deg,#7B61D9,#4a3a8a)',
    typeColor: '#9b84f0',
    impactColor: '#9b84f0',
    impactBg: 'rgba(123,97,217,.1)',
    tech: ['UX Research', 'Diseño Interactivo / Interactive Design', 'Prototipado / Prototyping', 'Multimedia'],
    es: {
      type: 'UX · Interfaces Interactivas',
      title: 'Interfaces Interactivas · U. Autónoma',
      description: 'Diseño de interfaces interactivas para una plataforma de aprendizaje digital de la Universidad Autónoma. El proyecto combinó investigación UX con diseño de experiencias multimedia pensadas para estudiantes universitarios.',
      deliverables: [
        'Investigación de usuarios y definición de flujos de navegación',
        'Wireframes y prototipos de alta fidelidad',
        'Diseño de interfaces interactivas y componentes multimedia',
        'Pruebas de usabilidad con usuarios reales',
      ],
      impact: '▲ Plataforma activa',
    },
    en: {
      type: 'UX · Interactive Interfaces',
      title: 'Interactive Interfaces · U. Autónoma',
      description: 'Design of interactive interfaces for a digital learning platform at Universidad Autónoma. The project combined UX research with multimedia experience design tailored for university students.',
      deliverables: [
        'User research and navigation flow definition',
        'Wireframes and high-fidelity prototypes',
        'Interactive interface design and multimedia components',
        'Usability testing with real users',
      ],
      impact: '▲ Platform live',
    },
  },
  'audiovisual-caldas': {
    icon: '🎬',
    bg: 'linear-gradient(135deg,#FF5733,#c24520)',
    typeColor: '#FF5733',
    impactColor: '#ffa088',
    impactBg: 'rgba(255,87,51,.1)',
    tech: ['Producción / Production', 'Edición de Video / Video Editing', 'Narrativa / Narrative', 'Divulgación Científica / Science Outreach'],
    es: {
      type: 'Producción Audiovisual',
      title: 'Documentales de Divulgación Científica · U. de Caldas',
      description: 'Producción y edición de una serie completa de documentales para comunicar conocimiento científico de la Universidad de Caldas a públicos no especializados. El trabajo abarcó desde el guion hasta la entrega final.',
      deliverables: [
        'Guion narrativo y estructura dramática de cada capítulo',
        'Coordinación y dirección de producción en campo',
        'Edición de video con corrección de color y sonido',
        'Narrativa visual adaptada a divulgación científica',
      ],
      impact: '▲ Serie completa publicada',
    },
    en: {
      type: 'Audiovisual Production',
      title: 'Scientific Outreach Documentaries · U. de Caldas',
      description: 'Production and editing of a full documentary series to communicate scientific knowledge from Universidad de Caldas to general audiences. The work spanned from scriptwriting through final delivery.',
      deliverables: [
        'Narrative script and dramatic structure for each episode',
        'Field production coordination and direction',
        'Video editing with color grading and sound design',
        'Visual storytelling adapted for science outreach',
      ],
      impact: '▲ Full series published',
    },
  },
  'dashboard-consortia': {
    icon: '📊',
    bg: 'linear-gradient(135deg,#1a1a2e,#2a2a4e)',
    typeColor: '#CCFF00',
    impactColor: '#CCFF00',
    impactBg: 'rgba(204,255,0,.08)',
    tech: ['Power BI', 'Data Visualization', 'KPI Design', 'Open Access / Ciencia Abierta'],
    es: {
      type: 'Dashboard · Data Viz',
      title: 'Dashboard Power BI · Consortia SAS',
      description: 'Apoyo al diseño del dashboard de Power BI para Consortia SAS, empresa especializada en gestión de Acuerdos Transformativos para publicación científica en Acceso Abierto. El objetivo era visualizar métricas clave de instituciones académicas aliadas.',
      deliverables: [
        'Diseño visual y arquitectura de información del dashboard',
        'Definición y jerarquización de KPIs para el negocio',
        'Maquetación de reportes y vistas en Power BI',
        'Revisión de paleta de colores e identidad visual de los reportes',
      ],
      impact: '▲ En producción',
    },
    en: {
      type: 'Dashboard · Data Viz',
      title: 'Power BI Dashboard · Consortia SAS',
      description: 'Design support for the Power BI dashboard at Consortia SAS, a company specializing in Transformative Agreements for Open Access scientific publishing. The goal was to visualize key metrics for partner academic institutions.',
      deliverables: [
        'Visual design and information architecture of the dashboard',
        'Definition and prioritization of business KPIs',
        'Report layout and Power BI view design',
        'Color palette and visual identity review for reports',
      ],
      impact: '▲ In production',
    },
  },
  'biblioteca-salmona': {
    icon: '🏛️',
    bg: 'linear-gradient(135deg,#d4cfc4,#b8b2a6)',
    typeColor: '#7B61D9',
    impactColor: '#7B61D9',
    impactBg: 'rgba(123,97,217,.08)',
    tech: ['Identidad Visual / Visual Identity', 'Diseño Web / Web Design', 'Comunicación Digital / Digital Comm.', 'Repositorio / Repository', 'Eventos / Events'],
    es: {
      type: 'Branding · Web · Comunicación',
      title: 'Biblioteca Salmona · U. de Caldas',
      description: 'Coordinación de diseño y comunicación digital de la Biblioteca Centro Cultural Rogelio Salmona durante 8 años. Un proyecto integral que abarcó identidad visual, difusión de contenidos, diseño de eventos académicos y desarrollo del portal web del repositorio institucional.',
      deliverables: [
        'Apoyo al diseño y evolución de la identidad visual institucional',
        'Producción y difusión de contenidos digitales en múltiples canales',
        'Diseño de piezas gráficas para eventos académicos y culturales',
        'Diseño y desarrollo del portal web del repositorio institucional',
      ],
      impact: '▲ 8 años de gestión continua',
    },
    en: {
      type: 'Branding · Web · Communication',
      title: 'Biblioteca Salmona · U. de Caldas',
      description: 'Design and digital communication coordination for the Biblioteca Centro Cultural Rogelio Salmona over 8 years. A comprehensive project covering visual identity, content outreach, academic event design, and development of the institutional repository web portal.',
      deliverables: [
        'Design support and evolution of the institutional visual identity',
        'Production and distribution of digital content across multiple channels',
        'Graphic design for academic and cultural events',
        'Design and development of the institutional repository web portal',
      ],
      impact: '▲ 8 years of continuous management',
    },
  },
  'wunder-portfolio': {
    icon: '💻',
    bg: 'linear-gradient(135deg,#CCFF00,#a8cc00)',
    typeColor: '#5a45b0',
    impactColor: '#5a45b0',
    impactBg: 'rgba(123,97,217,.08)',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Canvas API', 'SEO', 'Editorial Design'],
    es: {
      type: 'Diseño Web · Desarrollo',
      title: 'Wunder Designers Portfolio',
      description: 'Diseño y desarrollo completo del sitio web portfolio de Wunder Designers. Una SPA construida desde cero con HTML, CSS y JavaScript puro — sin frameworks — con sistema de páginas por JS, animaciones en Canvas, dashboard demo interactivo y sección CV descargable.',
      deliverables: [
        'Sistema de diseño propio: paleta, tipografía y variables CSS',
        'Desarrollo HTML/CSS/JS sin dependencias externas',
        'Canvas API para fondo animado que reacciona al cursor',
        'Dashboard demo con gráfica de barras, donut chart y skill bars',
        'Páginas de servicio, sección CV y descarga de PDF',
      ],
      impact: '▲ Este mismo sitio',
    },
    en: {
      type: 'Web Design · Development',
      title: 'Wunder Designers Portfolio',
      description: 'Full design and development of the Wunder Designers portfolio website. A SPA built from scratch with pure HTML, CSS and JavaScript — no frameworks — featuring a JS page system, Canvas animations, an interactive dashboard demo, and a downloadable CV section.',
      deliverables: [
        'Custom design system: palette, typography and CSS variables',
        'HTML/CSS/JS development with no external dependencies',
        'Canvas API for animated background that reacts to the cursor',
        'Dashboard demo with bar chart, donut chart and skill bars',
        'Service pages, CV section and PDF download',
      ],
      impact: '▲ This very site',
    },
  },
};

function openProject(id) {
  const p = projects[id];
  if (!p) return;
  const lang = currentLang || 'es';
  const l = p[lang] || p.es;
  const hero = document.getElementById('modalHero');
  hero.style.background = p.bg;
  hero.textContent = p.icon;
  document.getElementById('modalType').style.color = p.typeColor;
  document.getElementById('modalType').textContent = l.type;
  document.getElementById('modalTitle').textContent = l.title;
  document.getElementById('modalDesc').textContent = l.description;
  document.getElementById('modalDeliverables').innerHTML = l.deliverables.map(d => `<li>${d}</li>`).join('');
  document.getElementById('modalTags').innerHTML = p.tech.map(t => `<span class="modal-tag">${t}</span>`).join('');
  const impact = document.getElementById('modalImpact');
  impact.textContent = l.impact;
  impact.style.color = p.impactColor;
  impact.style.background = p.impactBg;
  document.getElementById('projectModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProject() {
  document.getElementById('projectModal').classList.remove('open');
  document.body.style.overflow = '';
}

function closeProjectOnOverlay(e) {
  if (e.target === document.getElementById('projectModal')) closeProject();
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeProject(); });

// ═══ CHART BARS
const chartData = [
  { l: 'Ene', v: 35, c: 'var(--violet)' },
  { l: 'Feb', v: 55, c: 'var(--lime-dk)' },
  { l: 'Mar', v: 70, c: 'var(--violet)' },
  { l: 'Abr', v: 45, c: 'var(--orange)' },
  { l: 'May', v: 82, c: 'var(--lime-dk)' },
  { l: 'Jun', v: 95, c: 'var(--lime)' },
  { l: 'Jul', v: 60, c: 'var(--violet)' },
  { l: 'Ago', v: 88, c: 'var(--orange)' },
  { l: 'Sep', v: 100, c: 'var(--lime)' },
  { l: 'Oct', v: 78, c: 'var(--violet)' },
  { l: 'Nov', v: 92, c: 'var(--lime-dk)' },
  { l: 'Dic', v: 110, c: 'var(--lime)' },
];
const maxVal = Math.max(...chartData.map(d => d.v));
const chartContainer = document.getElementById('mainChart');
if (chartContainer) {
  chartData.forEach((d, i) => {
    const bar = document.createElement('div');
    bar.className = 'chart-bar';
    bar.style.height = (d.v / maxVal * 100) + '%';
    bar.style.background = d.c;
    bar.style.animationDelay = (i * 0.07) + 's';
    bar.innerHTML = '<span class="bl">' + d.l + '</span>';
    chartContainer.appendChild(bar);
  });
}

// ═══ SKILL BARS
const skills = [
  { n: 'Estrategia Digital', v: 95, c: 'var(--violet)' },
  { n: 'Branding & Diseño', v: 92, c: 'var(--violet)' },
  { n: 'UX / E-Learning', v: 88, c: 'var(--orange)' },
  { n: 'Data Visualization', v: 85, c: 'var(--lime-dk)' },
  { n: 'Producción Audiovisual', v: 90, c: 'var(--orange)' },
  { n: 'Comunicación', v: 96, c: 'var(--violet)' },
];
const skillContainer = document.getElementById('skillBars');
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting && !e.target.dataset.animated) {
      e.target.dataset.animated = '1';
      e.target.querySelectorAll('.mb-fill').forEach(f => { f.style.width = f.dataset.w; });
    }
  });
}, { threshold: 0.3 });
if (skillContainer) {
  skills.forEach(s => {
    const d = document.createElement('div');
    d.className = 'mb-item';
    d.innerHTML = '<span class="mb-label">' + s.n + '</span>' +
      '<div class="mb-bg"><div class="mb-fill" data-w="' + s.v + '%" style="width:0;background:' + s.c + '"></div></div>' +
      '<span class="mb-val" style="color:' + s.c + '">' + s.v + '%</span>';
    skillContainer.appendChild(d);
  });
  skillObserver.observe(skillContainer);
}

// ═══ INTERACTIVE CANVAS SHAPES
const canvas = document.getElementById('shapes-canvas');
const ctx = canvas.getContext('2d');
let cw, ch, shapes;
let mouse = { x: -1000, y: -1000 };

function resizeCanvas() {
  cw = canvas.width = window.innerWidth;
  ch = canvas.height = window.innerHeight;
}

class Shape {
  constructor() {
    this.x = Math.random() * cw;
    this.y = Math.random() * ch;
    this.size = Math.random() * 35 + 8;
    this.speedX = (Math.random() - 0.5) * 0.35;
    this.speedY = (Math.random() - 0.5) * 0.35;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotSpeed = (Math.random() - 0.5) * 0.007;
    this.opacity = Math.random() * 0.04 + 0.015;
    this.type = Math.floor(Math.random() * 4);
    const colors = ['123,97,217', '138,184,0', '255,87,51', '180,180,180'];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.rotation += this.rotSpeed;
    if (this.x < -50) this.x = cw + 50;
    if (this.x > cw + 50) this.x = -50;
    if (this.y < -50) this.y = ch + 50;
    if (this.y > ch + 50) this.y = -50;
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 180) {
      const force = (180 - dist) / 180;
      this.x -= dx * force * 0.012;
      this.y -= dy * force * 0.012;
      this.opacity = Math.min(0.1, this.opacity + 0.001);
    } else {
      this.opacity = Math.max(0.015, this.opacity - 0.0005);
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.globalAlpha = this.opacity;
    ctx.strokeStyle = 'rgba(' + this.color + ',1)';
    ctx.lineWidth = 0.8;
    const s = this.size;
    switch (this.type) {
      case 0:
        ctx.beginPath(); ctx.arc(0, 0, s, 0, Math.PI * 2); ctx.stroke(); break;
      case 1:
        ctx.strokeRect(-s / 2, -s / 2, s, s); break;
      case 2:
        ctx.beginPath(); ctx.moveTo(0, -s); ctx.lineTo(s * 0.866, s * 0.5);
        ctx.lineTo(-s * 0.866, s * 0.5); ctx.closePath(); ctx.stroke(); break;
      case 3:
        ctx.beginPath(); ctx.arc(0, 0, s, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.arc(0, 0, s * 0.6, 0, Math.PI * 2); ctx.stroke(); break;
    }
    ctx.restore();
  }
}

function initCanvas() {
  resizeCanvas();
  shapes = Array.from({ length: 30 }, () => new Shape());
}

function animate() {
  ctx.clearRect(0, 0, cw, ch);
  shapes.forEach(s => { s.update(); s.draw(); });
  // Connecting lines
  for (let i = 0; i < shapes.length; i++) {
    for (let j = i + 1; j < shapes.length; j++) {
      const dx = shapes[i].x - shapes[j].x;
      const dy = shapes[i].y - shapes[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 160) {
        ctx.beginPath();
        ctx.moveTo(shapes[i].x, shapes[i].y);
        ctx.lineTo(shapes[j].x, shapes[j].y);
        ctx.strokeStyle = 'rgba(123,97,217,' + (0.025 * (1 - dist / 160)) + ')';
        ctx.lineWidth = 0.4;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animate);
}

window.addEventListener('resize', resizeCanvas);
document.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
initCanvas();
animate();

// ═══ CV DATA & PDF GENERATOR ════════════════════════════════════════════════
const cvData = {
  es: {
    name: 'Natalia López Carmona',
    role: 'Diseñadora · Filósofa · Estratega',
    contact: {
      email: 'natalia.lopez@wunderdesigners.com',
      phone: '+57 302 426 0911',
      linkedin: 'linkedin.com/in/natalia-lopez-carmona',
      location: 'Manizales, Colombia'
    },
    profile: 'Profesional con más de 10 años de experiencia en diseño interactivo, visualización de datos, comunicación estratégica y gestión de proyectos digitales. Maestría en Diseño y Creación Interactiva, con formación en Filosofía y Sistemas Informáticos. Especializada en diseño web UX/UI, creación de dashboards interactivos y experiencias de datos que transforman información compleja en decisiones claras. Se integran el pensamiento crítico, la narrativa digital y el código limpio en interfaces que comunican con impacto.',
    labels: { profile: 'Perfil Profesional', experience: 'Experiencia Profesional', education: 'Educación', skills: 'Habilidades', languages: 'Idiomas', filename: 'NataliaLopez_CV.pdf' },
    experience: [
      { role: 'Profesional en Investigación', company: 'Consortia SAS', period: '2025 – Actualidad', bullets: [
        'Gestión estratégica de Acuerdos Transformativos para publicación en Acceso Abierto.',
        'Estrategias de fidelización de instituciones académicas en ciencia abierta.',
        'Implementación de políticas de publicación científica y visibilidad institucional.',
        'Articulación entre editoriales, universidades y equipos técnicos.'
      ]},
      { role: 'Docente – Diplomado en Marketing Digital', company: 'Universidad de Caldas', period: 'Feb – Mar 2025', bullets: [
        'Diseño y orientación de módulo en Comunicación Digital.',
        'Acompañamiento en construcción de propuestas de valor y presencia digital.'
      ]},
      { role: 'Consultora en Diseño Web y Comunicación', company: 'Wunder Designers – Independiente', period: '2022 – Actualidad', bullets: [
        'Diseño y desarrollo de sitios web con HTML, CSS, JavaScript y WordPress.',
        'Creación de dashboards interactivos y visualizaciones de datos.',
        'Estrategias de comunicación, branding e identidad visual.',
        'Diseño de experiencias de aprendizaje digital (e-learning).'
      ]},
      { role: 'Docente Universitaria', company: 'U. Católica Luis Amigó / Unitécnica', period: '2022', bullets: [
        'Diseño e implementación de cursos de teoría y práctica audiovisual.',
        'Fomento de creatividad y pensamiento crítico en estudiantes.'
      ]},
      { role: 'Coordinadora de Diseño y Comunicación Digital', company: 'Biblioteca Centro Cultural Rogelio Salmona – U. de Caldas', period: '2014 – 2022', bullets: [
        'Estrategias de visibilidad académica y posicionamiento digital.',
        'Campañas de comunicación institucional con identidad visual coherente.',
        'Diseño web y gestión de plataformas digitales.',
        'Formación en herramientas digitales y alfabetización informacional.',
        'Gestión de proyectos interdisciplinarios.'
      ]},
      { role: 'Realizadora Audiovisual y Editora de Documentales', company: 'Universidad de Caldas', period: '2006 – 2014', bullets: [
        'Producción y edición de documentales de divulgación científica.',
        'Narrativas audiovisuales para comunicación del conocimiento.'
      ]}
    ],
    education: [
      { year: '2018', degree: 'Maestría en Diseño y Creación Interactiva', institution: 'Universidad de Caldas' },
      { year: '2010', degree: 'Pregrado en Filosofía y Letras', institution: 'Universidad de Caldas' },
      { year: '2009', degree: 'Tecnología en Sistemas Informáticos', institution: 'Universidad de Caldas' }
    ],
    skills: 'HTML5 · CSS3 · JavaScript · WordPress · Figma · Adobe Suite · React · D3.js · Python · Power BI · Moodle · UX/UI Design · Dashboard Design · Diseño Responsivo · Storytelling · Marketing de Contenidos · Gestión de Proyectos · Producción Audiovisual · Comunicación Estratégica · Pensamiento Crítico',
    languages: [{ lang: 'Español', level: 'Nativo' }, { lang: 'Inglés', level: 'Intermedio' }]
  },
  en: {
    name: 'Natalia López Carmona',
    role: 'Designer · Philosopher · Strategist',
    contact: {
      email: 'natalia.lopez@wunderdesigners.com',
      phone: '+57 302 426 0911',
      linkedin: 'linkedin.com/in/natalia-lopez-carmona',
      location: 'Manizales, Colombia'
    },
    profile: "Professional with over 10 years of experience in interactive design, data visualization, strategic communication and digital project management. Master's in Interactive Design & Creation, with a background in Philosophy and Computer Systems. Specialized in UX/UI web design, interactive dashboards and data experiences that transform complex information into clear decisions. Integrating critical thinking, digital storytelling and clean code to build interfaces that communicate with impact.",
    labels: { profile: 'Professional Profile', experience: 'Professional Experience', education: 'Education', skills: 'Skills', languages: 'Languages', filename: 'NataliaLopez_CV_EN.pdf' },
    experience: [
      { role: 'Research Professional', company: 'Consortia SAS', period: '2025 – Present', bullets: [
        'Strategic management of Transformative Agreements for Open Access scientific publishing.',
        'Loyalty strategies for academic institutions in open science.',
        'Implementation of scientific publishing policies and institutional visibility.',
        'Liaison between publishers, universities and technical teams.'
      ]},
      { role: 'Lecturer – Digital Marketing Program', company: 'Universidad de Caldas', period: 'Feb – Mar 2025', bullets: [
        'Design and delivery of Digital Communication module.',
        'Support in value proposition building and digital presence.'
      ]},
      { role: 'Web Design & Communication Consultant', company: 'Wunder Designers – Freelance', period: '2022 – Present', bullets: [
        'Design and development of websites with HTML, CSS, JavaScript and WordPress.',
        'Interactive dashboards and data visualizations.',
        'Communication strategies, branding and visual identity.',
        'Digital learning experience design (e-learning).'
      ]},
      { role: 'University Lecturer', company: 'U. Católica Luis Amigó / Unitécnica', period: '2022', bullets: [
        'Design and delivery of audiovisual theory and practice courses.',
        'Fostering creativity and critical thinking in students.'
      ]},
      { role: 'Design & Digital Communication Coordinator', company: 'Biblioteca Rogelio Salmona – U. de Caldas', period: '2014 – 2022', bullets: [
        'Academic visibility strategies and digital positioning.',
        'Institutional communication campaigns with coherent visual identity.',
        'Web design and management of institutional digital platforms.',
        'Training in digital tools and information literacy.',
        'Interdisciplinary project management.'
      ]},
      { role: 'Audiovisual Producer & Documentary Editor', company: 'Universidad de Caldas', period: '2006 – 2014', bullets: [
        'Production and editing of scientific outreach documentaries.',
        'Audiovisual narratives for knowledge communication.'
      ]}
    ],
    education: [
      { year: '2018', degree: "Master's in Interactive Design & Creation", institution: 'Universidad de Caldas' },
      { year: '2010', degree: "Bachelor's in Philosophy and Letters", institution: 'Universidad de Caldas' },
      { year: '2009', degree: 'Technical Degree in Computer Systems', institution: 'Universidad de Caldas' }
    ],
    skills: 'HTML5 · CSS3 · JavaScript · WordPress · Figma · Adobe Suite · React · D3.js · Python · Power BI · Moodle · UX/UI Design · Dashboard Design · Responsive Design · Storytelling · Content Marketing · Project Management · Audiovisual Production · Strategic Communication · Critical Thinking',
    languages: [{ lang: 'Spanish', level: 'Native' }, { lang: 'English', level: 'Intermediate' }]
  }
};

function generateCV() {
  if (!window.jspdf) { alert('PDF generator loading, please try again in a moment.'); return; }
  const lang = currentLang || 'es';
  const d = cvData[lang];
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ format: 'a4', unit: 'mm' });

  const PW = 210, PH = 297, ml = 18, mr = 18, tw = PW - ml - mr;
  let y = 22;

  const K = { dk: [17,17,17], gr: [90,90,90], lg: [160,160,160], ac: [90,69,176] };

  const sz = (size, weight, color) => {
    doc.setFontSize(size); doc.setFont('helvetica', weight); doc.setTextColor(...color);
  };
  const wrap = (text, maxW) => doc.splitTextToSize(text, maxW);
  const checkPage = (needed) => { if (y + needed > PH - 16) { doc.addPage(); y = 22; } };

  const sectionHeader = (label) => {
    y += 5; checkPage(14);
    sz(8, 'bold', K.ac);
    doc.text(label.toUpperCase(), ml, y);
    y += 2;
    doc.setDrawColor(...K.ac); doc.setLineWidth(0.3);
    doc.line(ml, y, PW - mr, y);
    y += 4.5;
  };

  // Header
  sz(22, 'bold', K.dk);
  doc.text(d.name, ml, y);
  y += 8.5;

  sz(10.5, 'normal', K.gr);
  doc.text(d.role, ml, y);
  y += 5.5;

  sz(8.5, 'normal', K.lg);
  const ctLine = `${d.contact.email}  ·  ${d.contact.phone}  ·  ${d.contact.linkedin}  ·  ${d.contact.location}`;
  const ctW = wrap(ctLine, tw);
  doc.text(ctW, ml, y);
  y += ctW.length * 3.8 + 3;

  doc.setDrawColor(...K.lg); doc.setLineWidth(0.25);
  doc.line(ml, y, PW - mr, y);
  y += 1;

  // Perfil
  sectionHeader(d.labels.profile);
  sz(9.5, 'normal', K.dk);
  const profW = wrap(d.profile, tw);
  doc.text(profW, ml, y);
  y += profW.length * 4 + 1;

  // Experiencia
  sectionHeader(d.labels.experience);
  d.experience.forEach(job => {
    checkPage(16 + job.bullets.length * 5);
    sz(10, 'bold', K.dk);
    doc.text(job.role, ml, y);
    sz(9, 'normal', K.lg);
    doc.text(job.period, PW - mr, y, { align: 'right' });
    y += 4.5;
    sz(9, 'italic', K.gr);
    doc.text(job.company, ml, y);
    y += 4.5;
    job.bullets.forEach(b => {
      checkPage(6);
      sz(9, 'normal', K.dk);
      const bW = wrap('•  ' + b, tw - 5);
      doc.text(bW, ml + 3, y);
      y += bW.length * 4;
    });
    y += 3;
  });

  // Educación
  sectionHeader(d.labels.education);
  d.education.forEach(edu => {
    checkPage(14);
    sz(10, 'bold', K.dk);
    doc.text(edu.degree, ml, y);
    sz(9, 'normal', K.lg);
    doc.text(edu.year, PW - mr, y, { align: 'right' });
    y += 4.5;
    sz(9, 'italic', K.gr);
    doc.text(edu.institution, ml, y);
    y += 6;
  });

  // Habilidades
  sectionHeader(d.labels.skills);
  sz(9.5, 'normal', K.dk);
  const skW = wrap(d.skills, tw);
  doc.text(skW, ml, y);
  y += skW.length * 4 + 1;

  // Idiomas
  sectionHeader(d.labels.languages);
  d.languages.forEach(l => {
    checkPage(8);
    sz(9.5, 'bold', K.dk);
    doc.text(l.lang, ml, y);
    sz(9.5, 'normal', K.gr);
    doc.text('— ' + l.level, ml + 28, y);
    y += 5.5;
  });

  // Footer en todas las páginas
  const total = doc.getNumberOfPages();
  for (let i = 1; i <= total; i++) {
    doc.setPage(i);
    sz(7.5, 'normal', K.lg);
    doc.text('wunderdesigners.com', PW / 2, PH - 10, { align: 'center' });
    if (total > 1) doc.text(`${i} / ${total}`, PW - mr, PH - 10, { align: 'right' });
  }

  doc.save(d.labels.filename);
}
