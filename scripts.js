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
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      e.target.dataset.revealed = '1';
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

function initReveals() {
  document.querySelectorAll('.page.active .reveal').forEach(el => {
    if (el.dataset.revealed) {
      el.classList.add('visible'); // ya visto: mostrar de inmediato sin animación
    } else {
      revealObserver.observe(el); // primera vez: animar al entrar al viewport
    }
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
  landing: {
    title: 'Wunder Designers — Natalia López Carmona | Diseño Web, Data Viz & UX',
    description: 'Portafolio de Natalia López Carmona: diseñadora interactiva UX/UI, visualización de datos y e-learning. 12 años de experiencia en Manizales, Colombia.'
  },
  portfolio: {
    title: 'Wunder Designers — Natalia López Carmona | Diseño Web, Data Viz & UX en Colombia',
    description: 'Portafolio de Natalia López Carmona: diseño web UX/UI, dashboards en Power BI, e-learning, branding y estrategia digital. +12 años de experiencia en Manizales, Colombia.'
  },
  about: {
    title: 'Sobre Mí — Natalia López Carmona | Diseñadora UX/UI, Datos & E-learning',
    description: 'Natalia López Carmona: diseñadora con maestría en Diseño Interactivo y más de 12 años en diseño web, visualización de datos y comunicación digital en Manizales, Colombia.'
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
  HeroAnimationManager.activate(page);
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
    'landing.h1':'¿Por dónde <span class="g">empezamos</span>?',
    'landing.sub':'Diseñadora Interactiva · Datos · UX/UI · E-learning',
    'landing.about.title':'Conóceme','landing.about.desc':'Mi historia, experiencia, formación y lo que me mueve.',
    'landing.portfolio.title':'Mi Portafolio','landing.portfolio.desc':'Proyectos, servicios y demos interactivos.',
    'landing.or':'o','fab.title':'Contactar',
    'nav.home':'⌂ Inicio','nav.portfolio':'Portafolio','nav.about':'Sobre Mí','nav.contact':'Contacto','nav.cv':'↓ Descargar CV',
    'hero.tag':'Diseño · Estrategia · Datos · Comunicación','hero.h1a':'Datos que','hero.h1b':'inspiran diseño',
    'hero.sub':'Transformamos información compleja en experiencias visuales que impulsan decisiones. 12 años integrando pensamiento crítico, narrativa digital y tecnología.',
    'hero.btn1':'Ver Proyectos →','hero.btn2':'Conóceme',
    'stat.projects':'Proyectos','stat.clients':'Clientes','stat.years':'Años Exp.','stat.degrees':'Títulos',
    'srv.section.tag':'Servicios','srv.section.title':'Lo que <em>se puede hacer</em> por ti','srv.section.sub':'Combinamos diseño, estrategia y tecnología para crear experiencias significativas.',
    'srv.branding.title':'Branding & Identidad','srv.branding.desc':'Logos, paletas, sistemas visuales coherentes que comunican tu esencia.',
    'srv.estrategia.title':'Estrategia Digital','srv.estrategia.desc':'Marketing de contenidos, storytelling y posicionamiento digital.',
    'srv.dashboards.title':'Dashboards & Data Viz','srv.dashboards.desc':'Visualización interactiva que transforma números en decisiones.',
    'srv.elearning.title':'E-Learning','srv.elearning.desc':'Experiencias de aprendizaje digital y cursos interactivos.',
    'srv.web.title':'Diseño Web & UX','srv.web.desc':'Sitios con diseño editorial y experiencias memorables.',
    'srv.audiovisual.title':'Producción Audiovisual','srv.audiovisual.desc':'Documentales y narrativas para divulgación científica.',
    'prj.tag':'Portafolio','prj.title':'Proyectos <em>Destacados</em>','prj.sub':'Intersección entre diseño, datos y comunicación estratégica.',
    'dash.tag':'Analytics en Acción','dash.title':'Dashboard <em>Demo</em>','dash.sub':'Así se transforman datos en visualizaciones accionables.',
    'contact.tag':'Contacto','contact.title':'¿Lista para <em>transformar</em> tu proyecto?',
    'contact.sub':'Cuéntanos sobre tu proyecto. Ya sea diseño, estrategia, dashboards o formación.','contact.email':'✉ Escríbeme',
    'about.role':'Diseñadora Interactiva UX/UI · Visualización de Datos · E-learning','about.download':'↓ Descargar CV en PDF','about.download2':'↓ Descargar CV completo en PDF',
    'about.profile.title':'Perfil Profesional',
    'about.profile.text':'Magíster en Diseño y Creación Interactiva, con formación en Filosofía y Letras y Tecnología en Sistemas Informáticos (Universidad de Caldas), y <strong>12 años de experiencia</strong> construyendo interfaces web, dashboards interactivos y experiencias educativas digitales. Integro pensamiento crítico humanístico, base tecnológica y <strong>diseño UX/UI, visualización de datos e inteligencia artificial</strong> para transformar información compleja en soluciones claras y accionables. Trabajo colaborativamente, con comunicación asertiva y orientación a la resolución de problemas.',
    'about.exp.title':'Experiencia Profesional','about.edu.title':'Educación','about.comp.title':'Formación Complementaria','about.skills.title':'Habilidades Técnicas','about.softskills.title':'Habilidades Blandas','about.lang.title':'Idiomas','about.pub.title':'Publicaciones',
    'about.lang.text':'Español — Nativo &nbsp;·&nbsp; Inglés — B1',
    'srv.back.btn':'← Portafolio','srv.page.includes':'¿Qué incluye?','srv.page.ready':'¿Lista?',
    'srv.page.cta':'Hablemos de tu proyecto →','srv.page.back':'Ver más servicios',
    'srv.branding.page.tag':'Servicios · Branding','srv.branding.page.h1a':'Tu marca,','srv.branding.page.h1b':'una historia coherente',
    'srv.branding.page.sub':'Construímos sistemas de identidad visual que van más allá del logo. Son la arquitectura visual de tu marca en todos los puntos de contacto.',
    'srv.branding.page.title':'Lo que <em>se construye juntas</em>','srv.branding.page.cta.title':'¿Quieres una identidad <em>que dure</em>?',
    'srv.estrategia.page.tag':'Servicios · Estrategia','srv.estrategia.page.h1a':'Comunicación','srv.estrategia.page.h1b':'que posiciona',
    'srv.estrategia.page.sub':'Desarrollamos estrategias de comunicación digital que articulan tu propuesta de valor, construyen audiencia y generan presencia con propósito.',
    'srv.estrategia.page.title':'Estrategia <em>con foco</em>','srv.estrategia.page.cta.title':'¿Tu marca <em>necesita dirección</em>?',
    'srv.dashboards.page.tag':'Servicios · Data','srv.dashboards.page.h1a':'Datos que','srv.dashboards.page.h1b':'cuentan historias',
    'srv.dashboards.page.sub':'Diseñamos y desarrollamos dashboards e infográficos interactivos que convierten datos complejos en decisiones claras. Power BI, D3.js y visualización moderna.',
    'srv.dashboards.page.title':'Visualización <em>con propósito</em>','srv.dashboards.page.cta.title':'¿Tus datos <em>merecen ser vistos</em>?',
    'srv.elearning.page.tag':'Servicios · E-Learning','srv.elearning.page.h1a':'Aprendizaje','srv.elearning.page.h1b':'que transforma',
    'srv.elearning.page.sub':'Diseñamos experiencias de aprendizaje digital que combinan pedagogía, UX y narrativa para crear cursos que realmente funcionan.',
    'srv.elearning.page.title':'Formación <em>con diseño</em>','srv.elearning.page.cta.title':'¿Tu conocimiento <em>merece un mejor formato</em>?',
    'srv.web.page.tag':'Servicios · Web & UX','srv.web.page.h1a':'Experiencias','srv.web.page.h1b':'que conectan',
    'srv.web.page.sub':'Diseñamos y desarrollamos sitios web con identidad editorial fuerte, código limpio y experiencias de usuario que las personas quieren recordar.',
    'srv.web.page.title':'Web con <em>propósito y estética</em>','srv.web.page.cta.title':'¿Tu proyecto <em>merece un buen sitio</em>?',
    'srv.audiovisual.page.tag':'Servicios · Audiovisual','srv.audiovisual.page.h1a':'Conocimiento','srv.audiovisual.page.h1b':'que se ve',
    'srv.audiovisual.page.sub':'Producimos y editamos documentales y piezas audiovisuales que comunican conocimiento científico y cultural con rigor narrativo y sensibilidad estética.',
    'srv.audiovisual.page.title':'Narrativa <em>audiovisual</em>','srv.audiovisual.page.cta.title':'¿Tu historia <em>merece ser contada</em>?',
    'modal.deliverables':'Lo que se desarrolló','modal.tech':'Tecnologías & herramientas','modal.cta':'¿Tienes un proyecto similar? →',
    'modal.close':'Cerrar',
    // Project cards
    'prj.ux.type':'UX · Interfaces Interactivas','prj.ux.title':'Interfaces Interactivas · U. Autónoma','prj.ux.tech':'UX · Diseño Interactivo · Multimedia',
    'prj.view':'▲ Ver proyecto',
    'prj.audiovisual.type':'Audiovisual','prj.audiovisual.title':'Documentales Divulgación Científica','prj.audiovisual.tech':'Producción · Edición · Narrativa',
    'prj.dashboard.type':'Dashboard','prj.dashboard.title':'Dashboard Power BI · Consortia SAS','prj.dashboard.tech':'Power BI · Visualización · Datos',
    'prj.biblioteca.type':'Branding · Web · Comunicación','prj.biblioteca.title':'Biblioteca Salmona · U. de Caldas','prj.biblioteca.tech':'Diseño · Difusión · Portal Repositorio · Eventos',
    'prj.wunder.type':'Web Design','prj.wunder.tech':'HTML · CSS · JS · Animaciones',
    // Dashboard demo
    'dash.chart.title':'Crecimiento de Proyectos','dash.chart.sub':'Últimos 12 meses',
    'dash.dist.title':'Distribución','dash.dist.sub':'Por servicio',
    'dash.legend.design':'Diseño 35%','dash.legend.dashboards':'Dashboards 25%','dash.legend.strategy':'Estrategia 20%','dash.legend.elearning':'E-Learning 20%',
    'dash.skills.title':'Competencias Técnicas','dash.skills.sub':'Nivel de dominio',
    // Service pages – intro & CTA subs
    'srv.branding.intro':'Una identidad visual completa y coherente para posicionar tu marca con solidez.',
    'srv.branding.cta.sub':'Cuéntame sobre tu proyecto y construiremos tu marca juntos.',
    'srv.estrategia.intro':'Una hoja de ruta clara para que tu comunicación digital genere resultados reales.',
    'srv.estrategia.cta.sub':'Cuéntame dónde estás y hacia dónde quieres ir.',
    'srv.dashboards.intro':'De los datos en bruto a la decisión clara, sin escalas innecesarias.',
    'srv.dashboards.cta.sub':'Cuéntame qué información tienes y qué decisiones necesitas tomar.',
    'srv.elearning.intro':'Cursos y plataformas que los estudiantes realmente quieren usar.',
    'srv.elearning.cta.sub':'Cuéntame qué quieres enseñar y a quién.',
    'srv.web.intro':'Desde el wireframe hasta el código: sitios que funcionan y se ven bien en cualquier pantalla.',
    'srv.web.cta.sub':'Cuéntame qué necesitas construir.',
    'srv.audiovisual.intro':'Piezas que comunican con profundidad, no solo con imagen.',
    'srv.audiovisual.cta.sub':'Cuéntame qué quieres comunicar y para quién.',
    // Service detail items – Branding
    'srv.branding.item1.title':'Diseño de Logotipo','srv.branding.item1.desc':'Concepto, bocetos y versión final con variantes para diferentes contextos de uso.',
    'srv.branding.item2.title':'Paleta & Tipografía','srv.branding.item2.desc':'Sistema de colores y tipografías que comunican la personalidad de tu marca.',
    'srv.branding.item3.title':'Manual de Identidad','srv.branding.item3.desc':'Guía de uso: normas, proporciones, usos incorrectos y aplicaciones digitales e impresas.',
    'srv.branding.item4.title':'Aplicaciones Digitales','srv.branding.item4.desc':'Adaptaciones para redes sociales, web, presentaciones y piezas digitales.',
    'srv.branding.item5.title':'Materiales Impresos','srv.branding.item5.desc':'Tarjetas, papelería, señalética y cualquier pieza física que necesites.',
    'srv.branding.item6.title':'Estrategia de Marca','srv.branding.item6.desc':'Análisis de posicionamiento, audiencia y diferencial competitivo de tu marca.',
    // Service detail items – Estrategia
    'srv.estrategia.item1.title':'Estrategia de Contenidos','srv.estrategia.item1.desc':'Plan editorial, temas clave, formatos y frecuencias adaptados a tu audiencia.',
    'srv.estrategia.item2.title':'Storytelling de Marca','srv.estrategia.item2.desc':'Narrativa que conecta emocionalmente tu marca con las personas que importan.',
    'srv.estrategia.item3.title':'Posicionamiento SEO','srv.estrategia.item3.desc':'Palabras clave, estructura de contenido y optimización para visibilidad orgánica.',
    'srv.estrategia.item4.title':'Gestión de Redes Sociales','srv.estrategia.item4.desc':'Estrategia por plataforma, tono de voz y acompañamiento en la publicación.',
    'srv.estrategia.item5.title':'Métricas & Seguimiento','srv.estrategia.item5.desc':'Definición de KPIs, análisis de resultados y ajuste continuo de la estrategia.',
    'srv.estrategia.item6.title':'Propuesta de Valor','srv.estrategia.item6.desc':'Diagnóstico del diferencial competitivo y construcción del mensaje central.',
    // Service detail items – Dashboards
    'srv.dashboards.item1.title':'Dashboards en Power BI','srv.dashboards.item1.desc':'Diseño visual y funcional de reportes interactivos para equipos y directivos.',
    'srv.dashboards.item2.title':'Visualización con D3.js','srv.dashboards.item2.desc':'Gráficas personalizadas e interactivas para web, con animaciones y datos dinámicos.',
    'srv.dashboards.item3.title':'Diseño de KPIs','srv.dashboards.item3.desc':'Selección y jerarquización de métricas clave según los objetivos del negocio.',
    'srv.dashboards.item4.title':'Reportes Ejecutivos','srv.dashboards.item4.desc':'Infografías y reportes visuales que comunican resultados a audiencias no técnicas.',
    'srv.dashboards.item5.title':'Arquitectura de Datos','srv.dashboards.item5.desc':'Organización y limpieza de fuentes para que la visualización sea precisa y confiable.',
    'srv.dashboards.item6.title':'Diseño Editorial de Datos','srv.dashboards.item6.desc':'Infografías estáticas e interactivas con identidad visual consistente.',
    // Service detail items – E-Learning
    'srv.elearning.item1.title':'Diseño Instruccional','srv.elearning.item1.desc':'Estructura pedagógica del contenido: objetivos, secuencia, evaluaciones y recursos.',
    'srv.elearning.item2.title':'Interfaces Interactivas','srv.elearning.item2.desc':'Diseño UX/UI de plataformas y módulos de aprendizaje orientados al usuario.',
    'srv.elearning.item3.title':'Integración con LMS','srv.elearning.item3.desc':'Implementación y configuración en Moodle, Canvas u otras plataformas de aprendizaje.',
    'srv.elearning.item4.title':'Recursos Multimedia','srv.elearning.item4.desc':'Videos, animaciones, infografías y piezas interactivas para enriquecer el contenido.',
    'srv.elearning.item5.title':'Evaluaciones & Seguimiento','srv.elearning.item5.desc':'Diseño de actividades, rúbricas y sistemas de seguimiento del aprendizaje.',
    'srv.elearning.item6.title':'Accesibilidad','srv.elearning.item6.desc':'Cursos diseñados para ser inclusivos y accesibles para todo tipo de estudiante.',
    // Service detail items – Web
    'srv.web.item1.title':'UX Research & Wireframes','srv.web.item1.desc':'Investigación de usuarios, arquitectura de información y prototipado antes de diseñar.',
    'srv.web.item2.title':'Diseño UI en Figma','srv.web.item2.desc':'Diseño visual de alta fidelidad con sistema de componentes y guías de estilo.',
    'srv.web.item3.title':'Desarrollo HTML/CSS/JS','srv.web.item3.desc':'Código limpio, semántico y accesible. Animaciones, interacciones y rendimiento optimizado.',
    'srv.web.item4.title':'WordPress','srv.web.item4.desc':'Implementación con temas a medida, plugins y panel de gestión fácil de usar.',
    'srv.web.item5.title':'Diseño Responsivo','srv.web.item5.desc':'Experiencia impecable en móvil, tablet y escritorio desde el primer pixel.',
    'srv.web.item6.title':'Portales Institucionales','srv.web.item6.desc':'Repositorios, portales académicos y sitios de organizaciones con necesidades específicas.',
    // Service detail items – Audiovisual
    'srv.audiovisual.item1.title':'Guion & Narrativa','srv.audiovisual.item1.desc':'Construcción del relato: estructura, arco narrativo, voz y ritmo del documental.',
    'srv.audiovisual.item2.title':'Producción','srv.audiovisual.item2.desc':'Planificación, logística de rodaje, dirección y coordinación del equipo técnico.',
    'srv.audiovisual.item3.title':'Edición de Video','srv.audiovisual.item3.desc':'Montaje narrativo, corrección de color, sonido y entrega en formatos requeridos.',
    'srv.audiovisual.item4.title':'Divulgación Científica','srv.audiovisual.item4.desc':'Traducción de investigación académica en narrativas visuales accesibles al público general.',
    'srv.audiovisual.item5.title':'Piezas Institucionales','srv.audiovisual.item5.desc':'Videos corporativos y registro de eventos académicos y culturales.',
    'srv.audiovisual.item6.title':'Distribución & Difusión','srv.audiovisual.item6.desc':'Estrategia para llevar el contenido audiovisual a las audiencias correctas.',
    // About – experience roles & companies (Spanish)
    'about.exp.docente1.role':'Docente – Comunicación Digital y Analítica Web',
    'about.exp.docente1.company':'Universidad de Caldas – Técnico Profesional en Marketing Digital',
    'about.exp.blue.company':'Blue Studies International (Australia, remoto)',
    'about.exp.stanton.role':'Diseñadora Gráfica y Contenido Digital',
    'about.exp.stanton.company':'Stanton Optical (EE.UU., remoto)',
    'about.exp.risaralda.role':'Consultora – Visualización de Datos y Dashboards',
    'about.exp.risaralda.date':'May – Dic 2023',
    'about.exp.uautonoma.role':'Diseñadora de Unidad Virtual – E-learning y Estrategia Digital',
    'about.exp.uautonoma.date':'Ene – Nov 2023',
    'about.exp.wunder.role':'Proyectos Independientes – Diseño Web y Datos',
    'about.exp.wunder.company':'Wunder Designers – Independiente',
    'about.exp.wunder.date':'2022 – Presente',
    'about.exp.docente2.role':'Docente – Producción Audiovisual y Herramientas Digitales',
    'about.exp.biblioteca.role':'Coordinadora de Diseño y Comunicación Digital',
    'about.exp.biblioteca.date':'Ago 2014 – Sep 2022',
    'about.exp.audiovisual.role':'Productora Audiovisual y Editora de Documentales',
    // About – experience bullets
    'about.exp.consortia.li1':'Diseño y estructuración visual del dashboard de Acuerdos Transformativos en Power BI, centralizando métricas de publicación en acceso abierto para más de 30 IES en Colombia.',
    'about.exp.consortia.li2':'Análisis de producción académica institucional y elaboración de informes estratégicos sobre comportamiento editorial.',
    'about.exp.consortia.li3':'Apoyo a procesos de fidelización institucional y gestión de acuerdos transformativos.',
    'about.exp.docente1.li1':'Diseño y dictado de los módulos de Comunicación Digital y Analítica Web.',
    'about.exp.docente1.li2':'Apoyo en construcción de propuesta de valor y presencia digital para estudiantes.',
    'about.exp.blue.li1':'Dirección creativa y diseño de interfaces digitales para proyectos internacionales.',
    'about.exp.blue.li2':'Desarrollo de identidad visual y coordinación con equipos multidisciplinarios remotos.',
    'about.exp.stanton.li1':'Diseño de piezas gráficas y animadas para campañas en redes sociales en múltiples estados.',
    'about.exp.stanton.li2':'Producción en flujos ágiles manteniendo consistencia de marca.',
    'about.exp.risaralda.li1':'Diseño y estructuración visual de tableros de indicadores socioeconómicos por municipio en Tableau, traduciendo datasets complejos en narrativas visuales accesibles.',
    'about.exp.risaralda.li2':'Definición de arquitectura de información y jerarquía visual para tomadores de decisión no técnicos.',
    'about.exp.risaralda.li3':'Colaboración interdisciplinaria con analistas de datos para alinear análisis y comunicación visual.',
    'about.exp.uautonoma.li1':'Diseño y creación de interfaces interactivas para múltiples cursos virtuales en Moodle y Storyline 360.',
    'about.exp.uautonoma.li2':'Estructuración visual y narrativa de cursos para educación superior con enfoque en usabilidad.',
    'about.exp.uautonoma.li3':'Optimización de experiencia de usuario en plataformas educativas digitales.',
    'about.exp.wunder.li1':'Diseño y desarrollo de sitios web con HTML5, CSS3, JavaScript y WordPress.',
    'about.exp.wunder.li2':'Dashboards interactivos y visualizaciones de datos con D3.js y Power BI.',
    'about.exp.wunder.li3':'Estrategias de comunicación, branding e identidad visual.',
    'about.exp.wunder.li4':'Diseño de experiencias de aprendizaje digital (e-learning).',
    'about.exp.docente2.li1':'Formación en producción audiovisual, narrativas visuales y herramientas digitales.',
    'about.exp.docente2.li2':'Acompañamiento a estudiantes en construcción de narrativas visuales y sonoras.',
    'about.exp.biblioteca.li1':'Creación e implementación del primer sistema de diseño y comunicación institucional de la biblioteca, estableciendo identidad visual coherente y lineamientos para todas las plataformas.',
    'about.exp.biblioteca.li2':'Generación y liderazgo de espacios de encuentro en torno a la cultura y las humanidades digitales.',
    'about.exp.biblioteca.li3':'Diseño y facilitación de talleres de formación en herramientas digitales.',
    'about.exp.biblioteca.li4':'Participación en implementación del Repositorio Institucional (DSpace) y acompañamiento a investigadores en visibilidad académica (Scopus, WoS, Google Scholar).',
    'about.exp.biblioteca.li5':'Diseño web y gestión de plataformas digitales institucionales.',
    'about.exp.audiovisual.li1':'Producción y edición de documentales de divulgación científica e institucional.',
    // About – education
    'about.edu.master':'Maestría en Diseño y Creación Interactiva',
    'about.edu.bachelor':'Profesional en Filosofía y Letras',
    'about.edu.tech':'Tecnóloga en Sistemas Informáticos',
    // About – complementary training
    'about.comp.ai':'Bootcamp de Programación con Inteligencia Artificial',
    'about.comp.powerbi':'Fundamentos de Power BI',
    'about.comp.jsanim':'JavaScript: Animación Web',
    // About – skills cloud
    'skill.responsive':'Diseño Responsivo','skill.dataviz':'Visualización de Datos',
    'skill.estrategia':'Estrategia Digital','skill.comest':'Comunicación Estratégica',
    'skill.mktcont':'Marketing de Contenidos','skill.pensamiento':'Pensamiento Crítico',
    'skill.gestion':'Gestión de Proyectos','skill.audiovisual.prod':'Producción Audiovisual',
    // About – soft skills
    'softskill.teamwork':'Trabajo en equipo','softskill.comms':'Comunicación asertiva',
    'softskill.conflict':'Resolución de conflictos','softskill.critical':'Pensamiento crítico',
    'softskill.collab':'Colaboración interdisciplinaria','softskill.adapt':'Adaptabilidad',
  },
  en: {
    'landing.h1':'Where do we <span class="g">start</span>?',
    'landing.sub':'Interactive Designer · Data · UX/UI · E-learning',
    'landing.about.title':'Know Me','landing.about.desc':'My story, experience, background and what drives me.',
    'landing.portfolio.title':'My Portfolio','landing.portfolio.desc':'Projects, services and interactive demos.',
    'landing.or':'or','fab.title':'Contact',
    'nav.home':'⌂ Home','nav.portfolio':'Portfolio','nav.about':'About Me','nav.contact':'Contact','nav.cv':'↓ Download CV',
    'hero.tag':'Design · Strategy · Data · Communication','hero.h1a':'Data that','hero.h1b':'inspires design',
    'hero.sub':'Transforming complex information into visual experiences that drive decisions. 12 years integrating critical thinking, digital storytelling and technology.',
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
    'contact.sub':'Tell me about your project. Whether design, strategy, dashboards or training.','contact.email':'✉ Write to me',
    'about.role':'Interactive UX/UI Designer · Data Visualization · E-learning','about.download':'↓ Download CV in PDF','about.download2':'↓ Download full CV in PDF',
    'about.profile.title':'Professional Profile',
    'about.profile.text':'Master\'s in Interactive Design & Creation, with a background in Philosophy and Computer Systems (Universidad de Caldas), and <strong>12 years of experience</strong> building web interfaces, interactive dashboards and digital educational experiences. Integrating humanistic critical thinking, technical foundation and <strong>UX/UI design, data visualization and AI</strong> to transform complex information into clear, actionable solutions. Collaborative, assertive communicator with a problem-solving orientation.',
    'about.exp.title':'Professional Experience','about.edu.title':'Education','about.comp.title':'Complementary Training','about.skills.title':'Technical Skills','about.softskills.title':'Soft Skills','about.lang.title':'Languages','about.pub.title':'Publications',
    'about.lang.text':'Spanish — Native &nbsp;·&nbsp; English — B1',
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
    'modal.close':'Close',
    // Project cards
    'prj.ux.type':'UX · Interactive Interfaces','prj.ux.title':'Interactive Interfaces · U. Autónoma','prj.ux.tech':'UX · Interactive Design · Multimedia',
    'prj.view':'▲ View project',
    'prj.audiovisual.type':'Audiovisual','prj.audiovisual.title':'Scientific Outreach Documentaries','prj.audiovisual.tech':'Production · Editing · Narrative',
    'prj.dashboard.type':'Dashboard','prj.dashboard.title':'Power BI Dashboard · Consortia SAS','prj.dashboard.tech':'Power BI · Visualization · Data',
    'prj.biblioteca.type':'Branding · Web · Communication','prj.biblioteca.title':'Biblioteca Salmona · U. de Caldas','prj.biblioteca.tech':'Design · Outreach · Repository Portal · Events',
    'prj.wunder.type':'Web Design','prj.wunder.tech':'HTML · CSS · JS · Animations',
    // Dashboard demo
    'dash.chart.title':'Project Growth','dash.chart.sub':'Last 12 months',
    'dash.dist.title':'Distribution','dash.dist.sub':'By service',
    'dash.legend.design':'Design 35%','dash.legend.dashboards':'Dashboards 25%','dash.legend.strategy':'Strategy 20%','dash.legend.elearning':'E-Learning 20%',
    'dash.skills.title':'Technical Skills','dash.skills.sub':'Proficiency level',
    // Service pages – intro & CTA subs
    'srv.branding.intro':'A complete, coherent visual identity to position your brand with confidence.',
    'srv.branding.cta.sub':'Tell me about your project and we\'ll build your brand together.',
    'srv.estrategia.intro':'A clear roadmap so your digital communication delivers real results.',
    'srv.estrategia.cta.sub':'Tell me where you are and where you want to go.',
    'srv.dashboards.intro':'From raw data to clear decisions, without unnecessary steps.',
    'srv.dashboards.cta.sub':'Tell me what data you have and what decisions you need to make.',
    'srv.elearning.intro':'Courses and platforms that students actually want to use.',
    'srv.elearning.cta.sub':'Tell me what you want to teach and who your learners are.',
    'srv.web.intro':'From wireframe to code: sites that work and look great on any screen.',
    'srv.web.cta.sub':'Tell me what you need to build.',
    'srv.audiovisual.intro':'Pieces that communicate with depth, not just with images.',
    'srv.audiovisual.cta.sub':'Tell me what you want to communicate and for whom.',
    // Service detail items – Branding
    'srv.branding.item1.title':'Logo Design','srv.branding.item1.desc':'Concept, sketches and final version with variants for different usage contexts.',
    'srv.branding.item2.title':'Palette & Typography','srv.branding.item2.desc':'Color and type system that communicates your brand\'s personality.',
    'srv.branding.item3.title':'Brand Identity Manual','srv.branding.item3.desc':'Usage guide: rules, proportions, incorrect uses and digital/print applications.',
    'srv.branding.item4.title':'Digital Applications','srv.branding.item4.desc':'Adaptations for social media, web, presentations and digital assets.',
    'srv.branding.item5.title':'Print Materials','srv.branding.item5.desc':'Cards, stationery, signage and any physical piece you need.',
    'srv.branding.item6.title':'Brand Strategy','srv.branding.item6.desc':'Positioning analysis, audience and competitive differentiator for your brand.',
    // Service detail items – Estrategia
    'srv.estrategia.item1.title':'Content Strategy','srv.estrategia.item1.desc':'Editorial plan, key topics, formats and frequency adapted to your audience.',
    'srv.estrategia.item2.title':'Brand Storytelling','srv.estrategia.item2.desc':'Narrative that emotionally connects your brand with the people who matter.',
    'srv.estrategia.item3.title':'SEO Positioning','srv.estrategia.item3.desc':'Keywords, content structure and optimization for organic visibility.',
    'srv.estrategia.item4.title':'Social Media Management','srv.estrategia.item4.desc':'Platform strategy, tone of voice and publishing support.',
    'srv.estrategia.item5.title':'Metrics & Tracking','srv.estrategia.item5.desc':'KPI definition, results analysis and continuous strategy adjustment.',
    'srv.estrategia.item6.title':'Value Proposition','srv.estrategia.item6.desc':'Competitive differentiator diagnosis and core message building.',
    // Service detail items – Dashboards
    'srv.dashboards.item1.title':'Power BI Dashboards','srv.dashboards.item1.desc':'Visual and functional design of interactive reports for teams and executives.',
    'srv.dashboards.item2.title':'D3.js Visualization','srv.dashboards.item2.desc':'Custom interactive charts for the web, with animations and dynamic data.',
    'srv.dashboards.item3.title':'KPI Design','srv.dashboards.item3.desc':'Selection and prioritization of key metrics aligned with business goals.',
    'srv.dashboards.item4.title':'Executive Reports','srv.dashboards.item4.desc':'Infographics and visual reports that communicate results to non-technical audiences.',
    'srv.dashboards.item5.title':'Data Architecture','srv.dashboards.item5.desc':'Source organization and cleanup so visualizations are accurate and reliable.',
    'srv.dashboards.item6.title':'Data Editorial Design','srv.dashboards.item6.desc':'Static and interactive infographics with consistent visual identity.',
    // Service detail items – E-Learning
    'srv.elearning.item1.title':'Instructional Design','srv.elearning.item1.desc':'Pedagogical content structure: objectives, sequence, assessments and resources.',
    'srv.elearning.item2.title':'Interactive Interfaces','srv.elearning.item2.desc':'UX/UI design of user-centered learning platforms and modules.',
    'srv.elearning.item3.title':'LMS Integration','srv.elearning.item3.desc':'Implementation and setup in Moodle, Canvas or other learning platforms.',
    'srv.elearning.item4.title':'Multimedia Resources','srv.elearning.item4.desc':'Videos, animations, infographics and interactive pieces to enrich the content.',
    'srv.elearning.item5.title':'Assessments & Tracking','srv.elearning.item5.desc':'Activity design, rubrics and learning progress tracking systems.',
    'srv.elearning.item6.title':'Accessibility','srv.elearning.item6.desc':'Courses designed to be inclusive and accessible for all types of learners.',
    // Service detail items – Web
    'srv.web.item1.title':'UX Research & Wireframes','srv.web.item1.desc':'User research, information architecture and prototyping before design begins.',
    'srv.web.item2.title':'UI Design in Figma','srv.web.item2.desc':'High-fidelity visual design with a component system and style guides.',
    'srv.web.item3.title':'HTML/CSS/JS Development','srv.web.item3.desc':'Clean, semantic and accessible code. Animations, interactions and optimized performance.',
    'srv.web.item4.title':'WordPress','srv.web.item4.desc':'Implementation with custom themes, plugins and an easy-to-use management panel.',
    'srv.web.item5.title':'Responsive Design','srv.web.item5.desc':'Flawless experience on mobile, tablet and desktop from the very first pixel.',
    'srv.web.item6.title':'Institutional Portals','srv.web.item6.desc':'Repositories, academic portals and organizational sites with specific needs.',
    // Service detail items – Audiovisual
    'srv.audiovisual.item1.title':'Script & Narrative','srv.audiovisual.item1.desc':'Story construction: structure, narrative arc, voice and documentary pace.',
    'srv.audiovisual.item2.title':'Production','srv.audiovisual.item2.desc':'Planning, shooting logistics, direction and technical team coordination.',
    'srv.audiovisual.item3.title':'Video Editing','srv.audiovisual.item3.desc':'Narrative editing, color grading, sound and delivery in required formats.',
    'srv.audiovisual.item4.title':'Science Outreach','srv.audiovisual.item4.desc':'Translating academic research into visual narratives accessible to general audiences.',
    'srv.audiovisual.item5.title':'Institutional Pieces','srv.audiovisual.item5.desc':'Corporate videos and documentation of academic and cultural events.',
    'srv.audiovisual.item6.title':'Distribution & Outreach','srv.audiovisual.item6.desc':'Strategy to reach the right audiences with your audiovisual content.',
    // About – experience roles & companies (EN)
    'about.exp.docente1.role':'Lecturer – Digital Communication & Web Analytics',
    'about.exp.docente1.company':'Universidad de Caldas – Professional Technical Program in Digital Marketing',
    'about.exp.blue.company':'Blue Studies International (Australia, remote)',
    'about.exp.stanton.role':'Graphic Designer & Digital Content',
    'about.exp.stanton.company':'Stanton Optical (USA, remote)',
    'about.exp.risaralda.role':'Data Visualization & Dashboard Consultant',
    'about.exp.risaralda.date':'May – Dec 2023',
    'about.exp.uautonoma.role':'Virtual Unit Designer – E-learning & Digital Strategy',
    'about.exp.uautonoma.date':'Jan – Nov 2023',
    'about.exp.wunder.role':'Independent Projects – Web Design & Data',
    'about.exp.wunder.company':'Wunder Designers – Freelance',
    'about.exp.wunder.date':'2022 – Present',
    'about.exp.docente2.role':'Lecturer – Audiovisual Production & Digital Tools',
    'about.exp.biblioteca.role':'Design & Digital Communication Coordinator',
    'about.exp.biblioteca.date':'Aug 2014 – Sep 2022',
    'about.exp.audiovisual.role':'Audiovisual Producer & Documentary Editor',
    // About – experience bullets (EN)
    'about.exp.consortia.li1':'Design and visual structuring of the Transformative Agreements Power BI dashboard, centralizing open access publishing metrics for 30+ HEIs in Colombia.',
    'about.exp.consortia.li2':'Institutional academic production analysis and strategic reporting on editorial behavior.',
    'about.exp.consortia.li3':'Support for institutional retention processes and transformative agreement management.',
    'about.exp.docente1.li1':'Design and delivery of the Digital Communication and Web Analytics modules.',
    'about.exp.docente1.li2':'Support in value proposition building and digital presence for students.',
    'about.exp.blue.li1':'Creative direction and digital interface design for international projects.',
    'about.exp.blue.li2':'Visual identity development and coordination with remote multidisciplinary teams.',
    'about.exp.stanton.li1':'Design of graphic and animated assets for social media campaigns across multiple states.',
    'about.exp.stanton.li2':'Production in agile workflows while maintaining brand consistency.',
    'about.exp.risaralda.li1':'Design and visual structuring of socioeconomic indicator dashboards by municipality in Tableau, translating complex datasets into accessible visual narratives.',
    'about.exp.risaralda.li2':'Information architecture and visual hierarchy definition for non-technical decision-makers.',
    'about.exp.risaralda.li3':'Interdisciplinary collaboration with data analysts to align analysis and visual communication.',
    'about.exp.uautonoma.li1':'Design and development of interactive interfaces for multiple virtual courses in Moodle and Storyline 360.',
    'about.exp.uautonoma.li2':'Visual and narrative structuring of higher education courses with a usability focus.',
    'about.exp.uautonoma.li3':'User experience optimization on digital educational platforms.',
    'about.exp.wunder.li1':'Design and development of websites with HTML5, CSS3, JavaScript and WordPress.',
    'about.exp.wunder.li2':'Interactive dashboards and data visualizations with D3.js and Power BI.',
    'about.exp.wunder.li3':'Communication strategies, branding and visual identity.',
    'about.exp.wunder.li4':'Digital learning experience design (e-learning).',
    'about.exp.docente2.li1':'Training in audiovisual production, visual narratives and digital tools.',
    'about.exp.docente2.li2':'Student support in building visual and sound narratives.',
    'about.exp.biblioteca.li1':'Creation and implementation of the library\'s first institutional design and communication system, establishing coherent visual identity and guidelines across all platforms.',
    'about.exp.biblioteca.li2':'Leadership of cultural and digital humanities community spaces.',
    'about.exp.biblioteca.li3':'Design and delivery of digital tools training workshops.',
    'about.exp.biblioteca.li4':'Participation in implementing the Institutional Repository (DSpace) and researcher support for academic visibility (Scopus, WoS, Google Scholar).',
    'about.exp.biblioteca.li5':'Web design and management of institutional digital platforms.',
    'about.exp.audiovisual.li1':'Production and editing of scientific outreach and institutional documentaries.',
    // About – education (EN)
    'about.edu.master':"Master's in Interactive Design & Creation",
    'about.edu.bachelor':"Bachelor's in Philosophy and Letters",
    'about.edu.tech':'Technical Degree in Computer Systems',
    // About – complementary training (EN)
    'about.comp.ai':'AI Programming Bootcamp',
    'about.comp.powerbi':'Power BI Fundamentals',
    'about.comp.jsanim':'JavaScript: Web Animation',
    // About – skills cloud (EN)
    'skill.responsive':'Responsive Design','skill.dataviz':'Data Visualization',
    'skill.estrategia':'Digital Strategy','skill.comest':'Strategic Communication',
    'skill.mktcont':'Content Marketing','skill.pensamiento':'Critical Thinking',
    'skill.gestion':'Project Management','skill.audiovisual.prod':'Audiovisual Production',
    // About – soft skills (EN)
    'softskill.teamwork':'Teamwork','softskill.comms':'Assertive communication',
    'softskill.conflict':'Conflict resolution','softskill.critical':'Critical thinking',
    'softskill.collab':'Interdisciplinary collaboration','softskill.adapt':'Adaptability',
  }
};

const monthLabels = {
  es: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
  en: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
};

const skillLabels = {
  es: ['Estrategia Digital','Branding & Diseño','UX / E-Learning','Data Visualization','Producción Audiovisual','Comunicación'],
  en: ['Digital Strategy','Branding & Design','UX / E-Learning','Data Visualization','Audiovisual Production','Communication']
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
  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const v = t[el.dataset.i18nAria];
    if (v !== undefined) el.setAttribute('aria-label', v);
  });
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const v = t[el.dataset.i18nTitle];
    if (v !== undefined) el.setAttribute('title', v);
  });
  // Update dynamically generated chart month labels
  document.querySelectorAll('#mainChart .bl').forEach((el, i) => {
    if (monthLabels[lang][i]) el.textContent = monthLabels[lang][i];
  });
  // Update dynamically generated skill bar labels
  document.querySelectorAll('#skillBars .mb-label').forEach((el, i) => {
    if (skillLabels[lang][i]) el.textContent = skillLabels[lang][i];
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

// ═══ HERO ANIMATIONS ════════════════════════════════════════════════════════

// ── Manager ──────────────────────────────────────────────────────────────────
const HeroAnimationManager = {
  registry: new Map(),
  activeId: null,
  rafId: null,
  lastTs: 0,

  register(id, inst) { this.registry.set(id, inst); },

  activate(pageId) {
    if (this.activeId) {
      const prev = this.registry.get(this.activeId);
      if (prev) prev.canvas.classList.remove('hc-active');
    }
    const inst = this.registry.get(pageId);
    this.activeId = inst ? pageId : null;
    if (inst) {
      const hero = inst.canvas.closest('section');
      inst.resize(hero.offsetWidth, hero.offsetHeight);
      inst.canvas.classList.add('hc-active');
    }
    if (!this.rafId) this._startLoop();
  },

  _startLoop() {
    const loop = ts => {
      this.rafId = requestAnimationFrame(loop);
      const dt = Math.min(ts - this.lastTs, 50);
      this.lastTs = ts;
      if (!this.activeId) return;
      const inst = this.registry.get(this.activeId);
      if (inst) inst.draw(dt);
    };
    this.rafId = requestAnimationFrame(loop);
  }
};

document.addEventListener('mousemove', e => {
  if (!HeroAnimationManager.activeId) return;
  const inst = HeroAnimationManager.registry.get(HeroAnimationManager.activeId);
  if (!inst) return;
  const r = inst.canvas.getBoundingClientRect();
  inst.mx = e.clientX - r.left;
  inst.my = e.clientY - r.top;
});

let _hcRT;
window.addEventListener('resize', () => {
  clearTimeout(_hcRT);
  _hcRT = setTimeout(() => {
    if (!HeroAnimationManager.activeId) return;
    const inst = HeroAnimationManager.registry.get(HeroAnimationManager.activeId);
    if (!inst) return;
    const hero = inst.canvas.closest('section');
    inst.resize(hero.offsetWidth, hero.offsetHeight);
  }, 120);
});

// ── Base class ────────────────────────────────────────────────────────────────
class HeroAnim {
  constructor(id) {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext('2d');
    this.w = 0; this.h = 0;
    this.mx = -999; this.my = -999;
    this.t = 0;
    this.mobile = window.matchMedia('(max-width:768px),(hover:none)').matches;
  }
  resize(w, h) { this.w = this.canvas.width = w; this.h = this.canvas.height = h; this._init(); }
  draw(dt) { this.t += dt; this._draw(dt); }
  _init() {} _draw() {}
}

// ── 1. NodeNetworkAnim — Portfolio ───────────────────────────────────────────
class NodeNetworkAnim extends HeroAnim {
  _init() {
    const n = this.mobile ? 25 : 45;
    this.nodes = Array.from({length: n}, () => ({
      x: Math.random() * this.w,
      y: Math.random() * this.h,
      vx: (Math.random() - .5) * .4,
      vy: (Math.random() - .5) * .4,
      r: Math.random() * 2 + 2
    }));
  }
  _draw() {
    const {ctx, w, h, nodes, mx, my} = this;
    ctx.clearRect(0, 0, w, h);
    for (const nd of nodes) {
      const dx = mx - nd.x, dy = my - nd.y;
      const d = Math.sqrt(dx*dx + dy*dy);
      if (d < 120 && d > 0) {
        nd.vx += (dx/d) * .012; nd.vy += (dy/d) * .012;
      }
      nd.vx *= .97; nd.vy *= .97;
      nd.x += nd.vx; nd.y += nd.vy;
      if (nd.x < 0) nd.x = w; if (nd.x > w) nd.x = 0;
      if (nd.y < 0) nd.y = h; if (nd.y > h) nd.y = 0;
    }
    // líneas
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i+1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
        const d = Math.sqrt(dx*dx + dy*dy);
        if (d < 130) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(204,255,0,${0.07*(1-d/130)})`;
          ctx.lineWidth = .7;
          ctx.stroke();
        }
      }
    }
    // nodos
    for (const nd of nodes) {
      const d = Math.hypot(mx - nd.x, my - nd.y);
      const hot = d < 120;
      ctx.beginPath();
      ctx.arc(nd.x, nd.y, hot ? nd.r * 1.9 : nd.r, 0, Math.PI*2);
      ctx.fillStyle = hot ? 'rgba(255,87,51,.9)' : 'rgba(123,97,217,.65)';
      ctx.fill();
    }
  }
}

// ── 2. MorphShapesAnim — Branding ────────────────────────────────────────────
class MorphShapesAnim extends HeroAnim {
  _rndPoly(cx, cy, n, r) {
    return Array.from({length: n}, (_, i) => {
      const a = (i/n) * Math.PI*2;
      return { x: cx + Math.cos(a)*(r + (Math.random()-.5)*r*.5),
               y: cy + Math.sin(a)*(r + (Math.random()-.5)*r*.5) };
    });
  }
  _init() {
    const W = this.w, H = this.h;
    this.shapes = Array.from({length: 6}, () => {
      const cx = Math.random()*W, cy = Math.random()*H;
      const n = 5 + Math.floor(Math.random()*4);
      const r = 40 + Math.random()*60;
      const a = this._rndPoly(cx, cy, n, r);
      const b = this._rndPoly(cx, cy, n, r);
      return { cx, cy, vx:(Math.random()-.5)*.25, vy:(Math.random()-.5)*.25,
               a, b, n, r, prog:Math.random(), spd:(.003+Math.random()*.003) };
    });
  }
  _eio(t) { return t < .5 ? 2*t*t : -1+(4-2*t)*t; }
  _draw() {
    const {ctx, w, h, shapes, mx, my} = this;
    ctx.clearRect(0, 0, w, h);
    for (const s of shapes) {
      s.prog += s.spd;
      if (s.prog >= 1) {
        s.a = s.b;
        s.b = this._rndPoly(s.cx, s.cy, s.n, s.r);
        s.prog = 0;
      }
      const e = this._eio(s.prog);
      const verts = s.a.map((pa, i) => {
        const pb = s.b[i];
        let vx = pa.x + (pb.x - pa.x)*e;
        let vy = pa.y + (pb.y - pa.y)*e;
        const d = Math.hypot(mx - vx, my - vy);
        if (d < 150 && d > 0) { vx += (vx-mx)/d*((150-d)/150)*18; vy += (vy-my)/d*((150-d)/150)*18; }
        return {x:vx, y:vy};
      });
      const distC = Math.hypot(mx - s.cx, my - s.cy);
      const hot = distC < 160;
      ctx.beginPath();
      ctx.moveTo(verts[0].x, verts[0].y);
      for (let i = 1; i < verts.length; i++) ctx.lineTo(verts[i].x, verts[i].y);
      ctx.closePath();
      ctx.strokeStyle = hot ? 'rgba(255,87,51,.45)' : 'rgba(123,97,217,.28)';
      ctx.lineWidth = 1;
      ctx.stroke();
      s.cx += s.vx; s.cy += s.vy;
      if (s.cx < 0 || s.cx > w) s.vx *= -1;
      if (s.cy < 0 || s.cy > h) s.vy *= -1;
    }
  }
}

// ── 3. SignalWavesAnim — Estrategia ──────────────────────────────────────────
class SignalWavesAnim extends HeroAnim {
  _init() {
    this.waves = Array.from({length: 5}, (_, i) => ({
      amp:  30 + Math.random()*40,
      freq: .008 + Math.random()*.012,
      phase: Math.random()*Math.PI*2,
      spd:  .018 + Math.random()*.025,
      yBase: this.h * (.2 + i*.15)
    }));
    this.ripple = null;
    this.pmx = -999; this.pmy = -999;
  }
  _draw(dt) {
    const {ctx, w, h, waves, mx, my} = this;
    ctx.clearRect(0, 0, w, h);
    const speed = Math.hypot(mx - this.pmx, my - this.pmy);
    if (speed > 12 && mx > 0 && mx < w) this.ripple = {x:mx, y:my, r:0, a:.28};
    this.pmx = mx; this.pmy = my;
    for (const wv of waves) {
      wv.phase += wv.spd * dt/16;
      ctx.beginPath();
      for (let x = 0; x <= w; x += 3) {
        let y = wv.yBase + wv.amp * Math.sin(wv.freq*x + wv.phase);
        const dxm = x - mx, dym = y - my;
        const dm = Math.sqrt(dxm*dxm + dym*dym);
        if (dm < 110) y += ((110-dm)/110)*22*Math.sin(dxm*.05);
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(204,255,0,.15)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    if (this.ripple) {
      const rp = this.ripple;
      rp.r += 2.5 * dt/16;
      rp.a -= .006 * dt/16;
      if (rp.a <= 0) { this.ripple = null; }
      else {
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI*2);
        ctx.strokeStyle = `rgba(123,97,217,${rp.a})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }
}

// ── 4. DataGridAnim — Dashboards ─────────────────────────────────────────────
class DataGridAnim extends HeroAnim {
  _init() {
    const gs = 40;
    this.gs = gs;
    const cols = Math.ceil(this.w / gs), rows = Math.ceil(this.h / gs);
    // barras en columnas pares
    this.bars = [];
    for (let c = 2; c < cols-1; c += 3) {
      const x = c * gs;
      this.bars.push({ x, h: 30, th: 30 + Math.random()*80, w: 6+Math.random()*5, timer: 0 });
    }
    this.bars = this.bars.slice(0, 12);
    // partículas
    this.parts = Array.from({length: this.mobile?12:22}, () => this._newPart());
  }
  _newPart() {
    const gs = this.gs;
    const cols = Math.floor(this.w / gs), rows = Math.floor(this.h / gs);
    const ci = Math.floor(Math.random()*cols), ri = Math.floor(Math.random()*rows);
    const horiz = Math.random() > .5;
    return { x: ci*gs, y: ri*gs, dir: horiz ? 1 : 2, speed: 1+Math.random(), ci, ri };
  }
  _draw(dt) {
    const {ctx, w, h, gs, bars, parts, mx, my} = this;
    ctx.clearRect(0, 0, w, h);
    // grid
    ctx.strokeStyle = 'rgba(123,97,217,.07)';
    ctx.lineWidth = .5;
    for (let x = 0; x < w; x += gs) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,h); ctx.stroke(); }
    for (let y = 0; y < h; y += gs) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(w,y); ctx.stroke(); }
    // puntos de intersección
    for (let x = 0; x <= w; x += gs) {
      for (let y = 0; y <= h; y += gs) {
        const d = Math.hypot(mx-x, my-y);
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI*2);
        ctx.fillStyle = d < 80 ? 'rgba(204,255,0,.5)' : 'rgba(123,97,217,.15)';
        ctx.fill();
      }
    }
    // barras
    const yBase = h * .72;
    for (const b of bars) {
      b.timer += dt;
      if (b.timer > 1200 + Math.random()*800) { b.th = 20 + Math.random()*100; b.timer = 0; }
      b.h += (b.th - b.h) * .05;
      const d = Math.abs(mx - b.x);
      const hot = d < 55;
      if (hot) { ctx.fillStyle = 'rgba(255,87,51,.75)'; }
      else { ctx.fillStyle = 'rgba(204,255,0,.45)'; }
      const bh = hot ? b.h * 2 : b.h;
      ctx.fillRect(b.x - b.w/2, yBase - bh, b.w, bh);
      // reflejo
      ctx.fillStyle = hot ? 'rgba(255,87,51,.15)' : 'rgba(204,255,0,.1)';
      ctx.fillRect(b.x - b.w/2, yBase, b.w, bh * .3);
    }
    // partículas
    for (const p of parts) {
      const inMouseQ = (mx > 0 && Math.abs(mx - p.x) < w/2 && Math.abs(my - p.y) < h/2);
      const spd = (p.speed * (inMouseQ ? 2 : 1)) * dt/16;
      if (p.dir === 1) p.x += spd; else p.y += spd;
      const cols = Math.floor(w/gs), rows = Math.floor(h/gs);
      if (p.x > (p.ci+1)*gs) { p.ci++; if (p.ci >= cols) { Object.assign(p, this._newPart()); continue; } p.x = p.ci*gs; if (Math.random()>.5) p.dir = 2; }
      if (p.y > (p.ri+1)*gs) { p.ri++; if (p.ri >= rows) { Object.assign(p, this._newPart()); continue; } p.y = p.ri*gs; if (Math.random()>.5) p.dir = 1; }
      ctx.beginPath(); ctx.arc(p.x, p.y, 1.5, 0, Math.PI*2);
      ctx.fillStyle = 'rgba(204,255,0,.55)'; ctx.fill();
    }
  }
}

// ── 5. ConstellationAnim — E-Learning ────────────────────────────────────────
class ConstellationAnim extends HeroAnim {
  _init() {
    const W = this.w, H = this.h;
    this.nodes = Array.from({length: 3}, (_, i) => {
      const cx = W * (.25 + i*.25), cy = H * (.3 + Math.random()*.4);
      const orbs = Array.from({length: 5}, (__, j) => ({
        angle: (j/5)*Math.PI*2 + Math.random(),
        radius: 50 + Math.random()*50,
        aspd: .012 + Math.random()*.013,
        x: 0, y: 0
      }));
      return { cx, cy, vx:(Math.random()-.5)*.2, vy:(Math.random()-.5)*.2, orbs };
    });
  }
  _draw(dt) {
    const {ctx, w, h, nodes, mx, my} = this;
    ctx.clearRect(0, 0, w, h);
    // recopilar satélites para conexiones cruzadas
    const allOrbs = [];
    for (const nd of nodes) {
      nd.cx += nd.vx; nd.cy += nd.vy;
      if (nd.cx < 60 || nd.cx > w-60) nd.vx *= -1;
      if (nd.cy < 60 || nd.cy > h-60) nd.vy *= -1;
      const d = Math.hypot(mx - nd.cx, my - nd.cy);
      const spd = d < 110 ? 2.5 : 1;
      for (const ob of nd.orbs) {
        ob.angle += ob.aspd * spd * dt/16;
        ob.x = nd.cx + ob.radius * Math.cos(ob.angle);
        ob.y = nd.cy + ob.radius * Math.sin(ob.angle);
        allOrbs.push(ob);
        ctx.beginPath(); ctx.moveTo(nd.cx, nd.cy); ctx.lineTo(ob.x, ob.y);
        ctx.strokeStyle = 'rgba(204,255,0,.1)'; ctx.lineWidth = .6; ctx.stroke();
        ctx.beginPath(); ctx.arc(ob.x, ob.y, 3.5, 0, Math.PI*2);
        ctx.fillStyle = 'rgba(255,87,51,.65)'; ctx.fill();
      }
      // halo
      ctx.save();
      ctx.shadowBlur = 18; ctx.shadowColor = '#CCFF00';
      ctx.beginPath(); ctx.arc(nd.cx, nd.cy, 10, 0, Math.PI*2);
      ctx.fillStyle = 'rgba(123,97,217,.8)'; ctx.fill();
      ctx.restore();
    }
    // conexiones cruzadas entre satélites
    for (let i = 0; i < allOrbs.length; i++) {
      for (let j = i+1; j < allOrbs.length; j++) {
        const d = Math.hypot(allOrbs[i].x - allOrbs[j].x, allOrbs[i].y - allOrbs[j].y);
        if (d < 70) {
          ctx.beginPath();
          ctx.moveTo(allOrbs[i].x, allOrbs[i].y);
          ctx.lineTo(allOrbs[j].x, allOrbs[j].y);
          ctx.strokeStyle = `rgba(123,97,217,${.08*(1-d/70)})`;
          ctx.lineWidth = .5; ctx.stroke();
        }
      }
    }
  }
}

// ── 6. WireframeAnim — Web & UX ──────────────────────────────────────────────
class WireframeAnim extends HeroAnim {
  _init() {
    const W = this.w, H = this.h;
    this.rects = [
      {x:.05,y:.1,w:.9,h:.12},  // header
      {x:.05,y:.28,w:.28,h:.55}, // sidebar
      {x:.36,y:.28,w:.28,h:.26}, // card 1
      {x:.67,y:.28,w:.28,h:.26}, // card 2
      {x:.36,y:.58,w:.28,h:.25}, // card 3
      {x:.67,y:.58,w:.28,h:.25}, // card 4
      {x:.05,y:.88,w:.9,h:.08},  // footer
      {x:.38,y:.3,w:.22,h:.06},  // label en card
      {x:.69,y:.3,w:.22,h:.06},
      {x:.38,y:.6,w:.22,h:.06},
      {x:.69,y:.6,w:.22,h:.06},
    ].map(r => ({
      ax: r.x*W, ay: r.y*H, aw: r.w*W, ah: r.h*H,
      gx: 0, gy: 0
    }));
  }
  _draw(dt) {
    const {ctx, w, h, rects, mx, my, t} = this;
    ctx.clearRect(0, 0, w, h);
    // guías
    ctx.strokeStyle = 'rgba(204,255,0,.03)';
    ctx.lineWidth = .5;
    for (let x = 0; x < w; x += 80) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,h); ctx.stroke(); }
    for (let y = 0; y < h; y += 80) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(w,y); ctx.stroke(); }
    for (const r of rects) {
      const cx = r.ax + r.aw/2, cy = r.ay + r.ah/2;
      const d = Math.hypot(mx - cx, my - cy);
      const hot = d < 90;
      const force = hot ? (90-d)/90 : 0;
      r.gx += (Math.sin(t*.0003)*3*force - r.gx) * .12;
      r.gy += (Math.cos(t*.0004)*3*force - r.gy) * .12;
      const rx = r.ax + r.gx, ry = r.ay + r.gy;
      ctx.strokeStyle = hot ? `rgba(204,255,0,${.2+force*.25})` : 'rgba(123,97,217,.22)';
      ctx.lineWidth = hot ? 1 : .7;
      ctx.strokeRect(rx, ry, r.aw, r.ah);
      // puntos de anclaje en esquinas
      const alpha = hot ? .6 : .18;
      for (const [ox, oy] of [[rx,ry],[rx+r.aw,ry],[rx,ry+r.ah],[rx+r.aw,ry+r.ah]]) {
        ctx.beginPath(); ctx.arc(ox, oy, 2.5, 0, Math.PI*2);
        ctx.fillStyle = hot ? `rgba(204,255,0,${alpha})` : `rgba(123,97,217,${alpha})`;
        ctx.fill();
      }
      // línea de "texto" interna
      if (r.aw > 60 && r.ah > 20) {
        ctx.beginPath();
        ctx.moveTo(rx+8+r.gx, ry+10); ctx.lineTo(rx+r.aw*.6+r.gx, ry+10);
        ctx.strokeStyle = hot ? 'rgba(204,255,0,.25)' : 'rgba(123,97,217,.15)';
        ctx.lineWidth = 1; ctx.stroke();
      }
    }
  }
}

// ── 7. WaveformAnim — Audiovisual ────────────────────────────────────────────
class WaveformAnim extends HeroAnim {
  _init() {
    this.nb = this.mobile ? 18 : 35;
    this.bars = Array.from({length: this.nb}, (_, i) => ({
      h: 20 + Math.random()*60, th: 20, i
    }));
  }
  _draw(dt) {
    const {ctx, w, h, bars, mx, my, t, nb} = this;
    ctx.clearRect(0, 0, w, h);
    const yC = h * .5;
    const ampMul = my > 0 && my < h ? .4 + (1 - my/h)*1.2 : 1;
    const bw = (w - 40) / nb;
    // barras
    for (const b of bars) {
      const bx = 20 + b.i * bw + bw/2;
      b.th = (15 + Math.abs(Math.sin(t*.0013 + b.i*.4))*70) * ampMul;
      const d = Math.abs(mx - bx);
      const hot = d < bw * 1.5;
      if (hot) b.th *= 2.2;
      b.h += (b.th - b.h) * .08;
      ctx.fillStyle = hot ? 'rgba(255,87,51,.75)' : 'rgba(204,255,0,.45)';
      ctx.fillRect(bx - bw*.3, yC - b.h, bw*.6, b.h);
      // reflejo
      ctx.fillStyle = hot ? 'rgba(255,87,51,.18)' : 'rgba(204,255,0,.12)';
      ctx.fillRect(bx - bw*.3, yC, bw*.6, b.h * .35);
    }
    // onda principal
    const waveY = x => yC + ampMul*(
      28*Math.sin(.012*x + t*.0015) +
      14*Math.sin(.024*x - t*.002) +
       8*Math.sin(.038*x + t*.001)
    );
    ctx.beginPath();
    for (let x = 0; x <= w; x += 2) {
      const y = waveY(x); x === 0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
    }
    ctx.strokeStyle = 'rgba(204,255,0,.7)';
    ctx.lineWidth = 2; ctx.stroke();
    // reflejo de onda
    ctx.beginPath();
    for (let x = 0; x <= w; x += 2) {
      const y = 2*yC - waveY(x); x === 0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
    }
    ctx.strokeStyle = 'rgba(204,255,0,.2)';
    ctx.lineWidth = 1; ctx.stroke();
  }
}

// ── DualOrbitAnim — Landing ───────────────────────────────────────────────────
class DualOrbitAnim extends HeroAnim {
  _init() {
    const total = this.mobile ? 30 : 60;
    this.pts = Array.from({length: total}, (_, i) => {
      const side = i < total / 2 ? 'v' : 'l';
      return {
        side,
        x: side === 'v'
          ? Math.random() * this.w * 0.6
          : this.w * 0.4 + Math.random() * this.w * 0.6,
        y: Math.random() * this.h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 2 + 1,
      };
    });
  }

  _draw() {
    const {ctx, w, h, mx, my} = this;
    ctx.clearRect(0, 0, w, h);
    const mouseLeft = mx < w / 2;

    for (const p of this.pts) {
      const dx = mx - p.x, dy = my - p.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      const sameZone = (p.side === 'v' && mouseLeft) || (p.side === 'l' && !mouseLeft);
      if (d < 160 && sameZone) {
        const f = (160 - d) / 160 * 0.018;
        p.vx += dx * f; p.vy += dy * f;
      }
      const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      if (spd > 1.2) { p.vx *= 1.2 / spd; p.vy *= 1.2 / spd; }
      p.x += p.vx; p.y += p.vy;
      if (p.x < -20) p.x = w + 20; if (p.x > w + 20) p.x = -20;
      if (p.y < -20) p.y = h + 20; if (p.y > h + 20) p.y = -20;

      const col = p.side === 'v' ? '123,97,217' : '204,255,0';
      const alpha = sameZone ? 0.65 : 0.28;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${col},${alpha})`;
      ctx.fill();
    }

    for (let i = 0; i < this.pts.length; i++) {
      for (let j = i + 1; j < this.pts.length; j++) {
        const a = this.pts[i], b = this.pts[j];
        if (a.side !== b.side) continue;
        const dx = a.x - b.x, dy = a.y - b.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 90) {
          ctx.strokeStyle = `rgba(${a.side === 'v' ? '123,97,217' : '204,255,0'},${(1 - d / 90) * 0.14})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
    }
  }
}

// ── Registro e inicialización ─────────────────────────────────────────────────
HeroAnimationManager.register('landing',        new DualOrbitAnim('hc-landing'));
HeroAnimationManager.register('portfolio',      new NodeNetworkAnim('hc-portfolio'));
HeroAnimationManager.register('srv-branding',   new MorphShapesAnim('hc-branding'));
HeroAnimationManager.register('srv-estrategia', new SignalWavesAnim('hc-estrategia'));
HeroAnimationManager.register('srv-dashboards', new DataGridAnim('hc-dashboards'));
HeroAnimationManager.register('srv-elearning',  new ConstellationAnim('hc-elearning'));
HeroAnimationManager.register('srv-web',        new WireframeAnim('hc-web'));
HeroAnimationManager.register('srv-audiovisual',new WaveformAnim('hc-audiovisual'));
HeroAnimationManager.activate('landing');

// ═══ BFCACHE FIX — reinicia animaciones y reveals al volver con el botón atrás
window.addEventListener('pageshow', e => {
  if (e.persisted) {
    const activePage = document.querySelector('.page.active');
    const pageId = activePage ? activePage.id.replace('page-', '') : 'landing';
    initReveals();
    HeroAnimationManager.activate(pageId);
  }
});

// ═══ CV DATA & PDF GENERATOR ════════════════════════════════════════════════
const cvData = {
  es: {
    name: 'Natalia López Carmona',
    role: 'Diseñadora Interactiva UX/UI · Visualización de Datos · E-learning',
    contact: {
      email: 'natalia.lopez.wd@gmail.com',
      phone: '+57 302 426 0911  ·  +57 313 748 6249',
      linkedin: 'linkedin.com/in/natalia-lopez-carmona',
      location: 'Manizales, Colombia'
    },
    profile: 'Magíster en Diseño y Creación Interactiva, con formación en Filosofía y Letras y Tecnología en Sistemas Informáticos (Universidad de Caldas), y 12 años de experiencia construyendo interfaces web, dashboards interactivos y experiencias educativas digitales. Integro pensamiento crítico humanístico, base tecnológica y diseño UX/UI, visualización de datos e inteligencia artificial para transformar información compleja en soluciones claras y accionables. Trabajo colaborativamente, con comunicación asertiva y orientación a la resolución de problemas.',
    labels: { profile: 'Perfil Profesional', experience: 'Experiencia Profesional', education: 'Educación', skills: 'Habilidades Técnicas', languages: 'Idiomas', filename: 'NataliaLopez_CV.pdf' },
    experience: [
      { role: 'Research & Data Analyst', company: 'Consortia Colombia', period: 'Mar 2025 – Feb 2026', bullets: [
        'Diseño y estructuración visual del dashboard de Acuerdos Transformativos en Power BI, centralizando métricas de publicación en acceso abierto para más de 30 IES en Colombia.',
        'Análisis de producción académica institucional y elaboración de informes estratégicos sobre comportamiento editorial.',
        'Apoyo a procesos de fidelización institucional y gestión de acuerdos transformativos.'
      ]},
      { role: 'Docente – Comunicación Digital y Analítica Web', company: 'Universidad de Caldas – Técnico Profesional en Marketing Digital', period: 'Feb–Mar 2025 / Mar–May 2026', bullets: [
        'Diseño y dictado de los módulos de Comunicación Digital y Analítica Web.',
        'Apoyo en construcción de propuesta de valor y presencia digital para estudiantes.'
      ]},
      { role: 'Design Lead', company: 'Blue Studies International (Australia, remoto)', period: 'Mar – Oct 2024', bullets: [
        'Dirección creativa y diseño de interfaces digitales para proyectos internacionales.',
        'Desarrollo de identidad visual y coordinación con equipos multidisciplinarios remotos.'
      ]},
      { role: 'Diseñadora Gráfica y Contenido Digital', company: 'Stanton Optical (EE.UU., remoto)', period: 'Nov 2023 – Feb 2024', bullets: [
        'Diseño de piezas gráficas y animadas para campañas en redes sociales en múltiples estados.',
        'Producción en flujos ágiles manteniendo consistencia de marca.'
      ]},
      { role: 'Consultora – Visualización de Datos y Dashboards', company: 'Laboratorio de Desarrollo Territorial de Risaralda', period: 'May – Dic 2023', bullets: [
        'Diseño y estructuración visual de tableros de indicadores socioeconómicos por municipio en Tableau.',
        'Definición de arquitectura de información y jerarquía visual para tomadores de decisión no técnicos.',
        'Colaboración interdisciplinaria con analistas de datos para alinear análisis y comunicación visual.'
      ]},
      { role: 'Diseñadora de Unidad Virtual – E-learning y Estrategia Digital', company: 'Universidad Autónoma de Manizales', period: 'Ene – Nov 2023', bullets: [
        'Diseño y creación de interfaces interactivas para múltiples cursos virtuales en Moodle y Storyline 360.',
        'Estructuración visual y narrativa de cursos para educación superior con enfoque en usabilidad.',
        'Optimización de experiencia de usuario en plataformas educativas digitales.'
      ]},
      { role: 'Proyectos Independientes – Diseño Web y Datos', company: 'Wunder Designers – Independiente', period: '2022 – Presente', bullets: [
        'Diseño y desarrollo de sitios web con HTML5, CSS3, JavaScript y WordPress.',
        'Dashboards interactivos y visualizaciones de datos con D3.js y Power BI.',
        'Estrategias de comunicación, branding e identidad visual.',
        'Diseño de experiencias de aprendizaje digital (e-learning).'
      ]},
      { role: 'Docente – Producción Audiovisual y Herramientas Digitales', company: 'Universidad Católica Luis Amigó / Unitécnica', period: '2022 – 2023', bullets: [
        'Formación en producción audiovisual, narrativas visuales y herramientas digitales.',
        'Acompañamiento a estudiantes en construcción de narrativas visuales y sonoras.'
      ]},
      { role: 'Coordinadora de Diseño y Comunicación Digital', company: 'Centro de Bibliotecas Rogelio Salmona – U. de Caldas', period: 'Ago 2014 – Sep 2022', bullets: [
        'Creación e implementación del primer sistema de diseño y comunicación institucional de la biblioteca, estableciendo identidad visual coherente para todas las plataformas.',
        'Generación y liderazgo de espacios de encuentro en torno a la cultura y las humanidades digitales.',
        'Diseño y facilitación de talleres de formación en herramientas digitales.',
        'Implementación del Repositorio Institucional (DSpace) y acompañamiento en visibilidad académica (Scopus, WoS, Google Scholar).',
        'Diseño web y gestión de plataformas digitales institucionales.'
      ]},
      { role: 'Productora Audiovisual y Editora de Documentales', company: 'Universidad de Caldas', period: '2004 – 2014', bullets: [
        'Producción y edición de documentales de divulgación científica e institucional.'
      ]}
    ],
    education: [
      { year: '2013 – 2018', degree: 'Maestría en Diseño y Creación Interactiva', institution: 'Universidad de Caldas' },
      { year: '2002 – 2010', degree: 'Profesional en Filosofía y Letras', institution: 'Universidad de Caldas' },
      { year: '2007 – 2009', degree: 'Tecnóloga en Sistemas Informáticos', institution: 'Universidad de Caldas' }
    ],
    skills: 'HTML5 · CSS3 · JavaScript · React · WordPress · Figma · Adobe Suite · D3.js · Python · Power BI · Tableau · Moodle · Storyline 360 · DSpace · Git · UX/UI Design · Dashboard Design · Diseño Interactivo · Diseño Responsivo · Visualización de Datos · Storytelling · E-learning · Producción Audiovisual · Gestión de Proyectos · Comunicación Estratégica · Marketing de Contenidos · Pensamiento Crítico',
    languages: [{ lang: 'Español', level: 'Nativo' }, { lang: 'Inglés', level: 'B1' }]
  },
  en: {
    name: 'Natalia López Carmona',
    role: 'Interactive UX/UI Designer · Data Visualization · E-learning',
    contact: {
      email: 'natalia.lopez.wd@gmail.com',
      phone: '+57 302 426 0911  ·  +57 313 748 6249',
      linkedin: 'linkedin.com/in/natalia-lopez-carmona',
      location: 'Manizales, Colombia'
    },
    profile: "Master's in Interactive Design & Creation, with a background in Philosophy and Computer Systems (Universidad de Caldas), and 12 years of experience building web interfaces, interactive dashboards and digital educational experiences. Integrating humanistic critical thinking, technical foundation and UX/UI design, data visualization and AI to transform complex information into clear, actionable solutions. Collaborative, assertive communicator with a problem-solving orientation.",
    labels: { profile: 'Professional Profile', experience: 'Professional Experience', education: 'Education', skills: 'Technical Skills', languages: 'Languages', filename: 'NataliaLopez_CV_EN.pdf' },
    experience: [
      { role: 'Research & Data Analyst', company: 'Consortia Colombia', period: 'Mar 2025 – Feb 2026', bullets: [
        'Design and visual structuring of the Transformative Agreements Power BI dashboard, centralizing open access publishing metrics for 30+ HEIs in Colombia.',
        'Institutional academic production analysis and strategic reporting on editorial behavior.',
        'Support for institutional retention processes and transformative agreement management.'
      ]},
      { role: 'Lecturer – Digital Communication & Web Analytics', company: 'Universidad de Caldas – Professional Technical Program in Digital Marketing', period: 'Feb–Mar 2025 / Mar–May 2026', bullets: [
        'Design and delivery of the Digital Communication and Web Analytics modules.',
        'Support in value proposition building and digital presence for students.'
      ]},
      { role: 'Design Lead', company: 'Blue Studies International (Australia, remote)', period: 'Mar – Oct 2024', bullets: [
        'Creative direction and digital interface design for international projects.',
        'Visual identity development and coordination with remote multidisciplinary teams.'
      ]},
      { role: 'Graphic Designer & Digital Content', company: 'Stanton Optical (USA, remote)', period: 'Nov 2023 – Feb 2024', bullets: [
        'Design of graphic and animated assets for social media campaigns across multiple states.',
        'Production in agile workflows while maintaining brand consistency.'
      ]},
      { role: 'Data Visualization & Dashboard Consultant', company: 'Laboratorio de Desarrollo Territorial de Risaralda', period: 'May – Dec 2023', bullets: [
        'Design and visual structuring of socioeconomic indicator dashboards by municipality in Tableau.',
        'Information architecture and visual hierarchy definition for non-technical decision-makers.',
        'Interdisciplinary collaboration with data analysts to align analysis and visual communication.'
      ]},
      { role: 'Virtual Unit Designer – E-learning & Digital Strategy', company: 'Universidad Autónoma de Manizales', period: 'Jan – Nov 2023', bullets: [
        'Design and development of interactive interfaces for multiple virtual courses in Moodle and Storyline 360.',
        'Visual and narrative structuring of higher education courses with a usability focus.',
        'User experience optimization on digital educational platforms.'
      ]},
      { role: 'Independent Projects – Web Design & Data', company: 'Wunder Designers – Freelance', period: '2022 – Present', bullets: [
        'Design and development of websites with HTML5, CSS3, JavaScript and WordPress.',
        'Interactive dashboards and data visualizations with D3.js and Power BI.',
        'Communication strategies, branding and visual identity.',
        'Digital learning experience design (e-learning).'
      ]},
      { role: 'Lecturer – Audiovisual Production & Digital Tools', company: 'Universidad Católica Luis Amigó / Unitécnica', period: '2022 – 2023', bullets: [
        'Training in audiovisual production, visual narratives and digital tools.',
        'Student support in building visual and sound narratives.'
      ]},
      { role: 'Design & Digital Communication Coordinator', company: 'Centro de Bibliotecas Rogelio Salmona – U. de Caldas', period: 'Aug 2014 – Sep 2022', bullets: [
        'Creation and implementation of the library\'s first institutional design and communication system, establishing coherent visual identity across all platforms.',
        'Leadership of cultural and digital humanities community spaces.',
        'Design and delivery of digital tools training workshops.',
        'Implementation of Institutional Repository (DSpace) and academic visibility support (Scopus, WoS, Google Scholar).',
        'Web design and management of institutional digital platforms.'
      ]},
      { role: 'Audiovisual Producer & Documentary Editor', company: 'Universidad de Caldas', period: '2004 – 2014', bullets: [
        'Production and editing of scientific outreach and institutional documentaries.'
      ]}
    ],
    education: [
      { year: '2013 – 2018', degree: "Master's in Interactive Design & Creation", institution: 'Universidad de Caldas' },
      { year: '2002 – 2010', degree: "Bachelor's in Philosophy and Letters", institution: 'Universidad de Caldas' },
      { year: '2007 – 2009', degree: 'Technical Degree in Computer Systems', institution: 'Universidad de Caldas' }
    ],
    skills: 'HTML5 · CSS3 · JavaScript · React · WordPress · Figma · Adobe Suite · D3.js · Python · Power BI · Tableau · Moodle · Storyline 360 · DSpace · Git · UX/UI Design · Dashboard Design · Interactive Design · Responsive Design · Data Visualization · Storytelling · E-learning · Audiovisual Production · Project Management · Strategic Communication · Content Marketing · Critical Thinking',
    languages: [{ lang: 'Spanish', level: 'Native' }, { lang: 'English', level: 'B1' }]
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
