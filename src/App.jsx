import { useState, useEffect, useRef } from "react";

const VERSES = [
  { day: 1, ref: "Filipenses 4:13", text: "Todo lo puedo en Cristo que me fortalece.", theme: "Fortaleza", morning: "Comienza este día recordando que no estás sola. Cristo camina contigo.", evening: "Al cerrar este día, agradece los momentos en que Su fortaleza te sostuvo." },
  { day: 2, ref: "Jeremías 29:11", text: "Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz y no de mal.", theme: "Esperanza", morning: "Dios tiene un plan perfecto para ti. Confía en Él hoy.", evening: "Reflexiona: ¿En qué momento viste hoy la mano de Dios guiándote?" },
  { day: 3, ref: "Salmos 46:5", text: "Dios está en medio de ella; no será conmovida.", theme: "Paz", morning: "Ninguna tormenta puede moverte cuando Dios habita en ti.", evening: "Descansa en paz sabiendo que Dios estuvo contigo durante todo este día." },
  { day: 4, ref: "Proverbios 31:25", text: "Fuerza y honor son su vestidura; y se ríe de lo por venir.", theme: "Valentía", morning: "Vístete hoy de fortaleza y dignidad. Eres hija del Rey.", evening: "¿Qué temor enfrentaste hoy con valentía? Celebra ese momento." },
  { day: 5, ref: "Isaías 41:10", text: "No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios.", theme: "Confianza", morning: "El Dios del universo dice: 'No temas'. Él está aquí, ahora mismo.", evening: "Entrega tus preocupaciones de hoy a Dios antes de dormir." },
  { day: 6, ref: "Romanos 8:28", text: "Y sabemos que a los que aman a Dios, todas las cosas les ayudan a bien.", theme: "Fe", morning: "Incluso lo difícil tiene propósito en las manos de Dios.", evening: "¿Qué cosa aparentemente difícil de hoy podría ser una bendición en disguise?" },
  { day: 7, ref: "Mateo 11:28", text: "Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar.", theme: "Descanso", morning: "Suelta tus cargas en los pies de Jesús. Él te ofrece descanso verdadero.", evening: "Descansa esta noche en los brazos del Padre. Mañana es nuevo día." },
  { day: 8, ref: "Juan 16:33", text: "En el mundo tendréis aflicción; pero confiad, yo he vencido al mundo.", theme: "Victoria", morning: "Cristo ya venció. Hoy caminas en esa victoria.", evening: "¿En qué área de tu vida necesitas apropiarte de la victoria de Cristo?" },
  { day: 9, ref: "Salmos 23:1", text: "Jehová es mi pastor; nada me faltará.", theme: "Provisión", morning: "El Señor es tu pastor. Bajo Su cuidado, nada te falta.", evening: "Cuenta tus bendiciones de hoy. ¿Cómo proveyó Dios para ti?" },
  { day: 10, ref: "Lamentaciones 3:23", text: "Nuevas son cada mañana; grande es tu fidelidad.", theme: "Renovación", morning: "Esta mañana trae misericordias nuevas. Recíbelas con gratitud.", evening: "Cierra el día agradeciendo la fidelidad de Dios que no falla nunca." },
  { day: 11, ref: "Efesios 3:20", text: "Y a Aquel que es poderoso para hacer todas las cosas mucho más abundantemente de lo que pedimos o entendemos.", theme: "Abundancia", morning: "Dios puede hacer más de lo que imaginas. Sueña en grande con Él.", evening: "¿Qué deseo pusiste en manos de Dios hoy?" },
  { day: 12, ref: "1 Pedro 5:7", text: "Echando toda vuestra ansiedad sobre él, porque él tiene cuidado de vosotros.", theme: "Cuidado", morning: "No cargues la ansiedad sola. Dios cuida de ti con amor perfecto.", evening: "Antes de dormir, entrega cada preocupación en oración a Dios." },
  { day: 13, ref: "Salmos 139:14", text: "Te alabaré; porque formidables, maravillosas son tus obras; estoy maravillada.", theme: "Identidad", morning: "Fuiste creada maravillosamente. Eres obra de Sus manos.", evening: "Reflexiona: ¿Aceptaste hoy tu valor en Cristo?" },
  { day: 14, ref: "Gálatas 5:22", text: "Mas el fruto del Espíritu es amor, gozo, paz, paciencia, benignidad, bondad, fe.", theme: "Fruto", morning: "Pide al Espíritu Santo que produzca Su fruto en ti hoy.", evening: "¿Cuál fruto del Espíritu manifestaste hoy en tus relaciones?" },
  { day: 15, ref: "2 Corintios 12:9", text: "Bástate mi gracia; porque mi poder se perfecciona en la debilidad.", theme: "Gracia", morning: "En tu debilidad, Su gracia es más que suficiente.", evening: "¿En qué debilidad tuya brilló hoy la gracia de Dios?" },
  { day: 16, ref: "Josué 1:9", text: "Mira que te mando que te esfuerces y seas valiente; no temas ni desmayes.", theme: "Esfuerzo", morning: "Dios te manda ser valiente. Enfrenta este día con coraje.", evening: "¿Qué decisión valiente tomaste hoy?" },
  { day: 17, ref: "Isaías 40:31", text: "Los que esperan a Jehová tendrán nuevas fuerzas; levantarán alas como las águilas.", theme: "Renovación", morning: "Espera en Dios y Sus fuerzas te renovarán como águila.", evening: "Toma un momento para simplemente estar en silencio con Dios." },
  { day: 18, ref: "Proverbios 3:5-6", text: "Fíate de Jehová de todo tu corazón, y no te apoyes en tu propia prudencia.", theme: "Confianza", morning: "Confía en Dios con todo, no solo con lo difícil.", evening: "¿En qué área te cuesta más confiar en Dios? Entrégasela esta noche." },
  { day: 19, ref: "Romanos 15:13", text: "Y el Dios de esperanza os llene de todo gozo y paz en el creer.", theme: "Gozo", morning: "Dios es el Dios de esperanza. Recibe Su gozo y paz hoy.", evening: "¿Qué te trajo gozo genuino hoy?" },
  { day: 20, ref: "Santiago 1:5", text: "Y si alguno de vosotros tiene falta de sabiduría, pídala a Dios.", theme: "Sabiduría", morning: "Pide sabiduría con confianza. Dios da generosamente.", evening: "¿En qué decisión necesitas la sabiduría de Dios esta semana?" },
  { day: 21, ref: "Filipenses 4:6-7", text: "Por nada estéis afanosos; sino sean conocidas vuestras peticiones delante de Dios.", theme: "Oración", morning: "Lleva todo a Dios en oración. Nada es demasiado pequeño para Él.", evening: "Escribe una oración de gratitud antes de dormir esta noche." },
  { day: 22, ref: "Colosenses 3:17", text: "Y todo lo que hacéis, sea de palabra o de hecho, hacedlo todo en el nombre del Señor Jesús.", theme: "Propósito", morning: "Haz cada cosa de hoy como si fuera para el Señor.", evening: "¿Cuál momento de hoy ofreciste conscientemente a Dios?" },
  { day: 23, ref: "2 Timoteo 1:7", text: "Porque no nos ha dado Dios espíritu de cobardía, sino de poder, de amor y de dominio propio.", theme: "Poder", morning: "El miedo no viene de Dios. Hoy camina en poder, amor y dominio.", evening: "¿Qué temor pudiste superar hoy con la ayuda de Dios?" },
  { day: 24, ref: "Salmos 37:4", text: "Deléitate asimismo en Jehová, y él te concederá las peticiones de tu corazón.", theme: "Deleite", morning: "Busca primero deleitarte en Dios, y lo demás vendrá.", evening: "¿Qué petición del corazón llevas a Dios esta noche?" },
  { day: 25, ref: "Hebreos 11:1", text: "Es, pues, la fe la certeza de lo que se espera, la convicción de lo que no se ve.", theme: "Fe", morning: "La fe no necesita verlo todo. Confía en lo que Dios prometió.", evening: "¿En qué área estás caminando por fe y no por vista?" },
  { day: 26, ref: "1 Juan 4:18", text: "En el amor no hay temor, sino que el perfecto amor echa fuera el temor.", theme: "Amor", morning: "El amor de Dios es perfecto. Déjalo expulsar cada temor.", evening: "Reflexiona en el amor incondicional que Dios tiene por ti." },
  { day: 27, ref: "Éxodo 14:14", text: "Jehová peleará por vosotros, y vosotros estaréis tranquilos.", theme: "Quietud", morning: "No tienes que pelear sola. Dios está luchando tus batallas.", evening: "Descansa esta noche sabiendo que Dios está a cargo." },
  { day: 28, ref: "Sofonías 3:17", text: "Jehová está en medio de ti, poderoso, él salvará; se gozará sobre ti con alegría.", theme: "Regocijo", morning: "Dios se regocija sobre ti con cánticos. Eres Su tesoro.", evening: "Cierra este día sabiendo que eres amada con amor eterno." },
  { day: 29, ref: "Números 6:24-25", text: "Jehová te bendiga y te guarde; Jehová haga resplandecer su rostro sobre ti.", theme: "Bendición", morning: "Recibe esta bendición: el rostro de Dios brilla sobre ti hoy.", evening: "¿Cómo fuiste bendecida hoy? ¿A quién bendijiste tú?" },
  { day: 30, ref: "Apocalipsis 21:5", text: "He aquí, yo hago nuevas todas las cosas. Y me dijo: Escribe; porque estas palabras son fieles y verdaderas.", theme: "Renovación", morning: "Treinta días de fe, paz y conexión con Dios. ¡Haz nuevas todas las cosas con Él!", evening: "Reflexiona sobre este viaje de 30 días. ¿Cómo creció tu fe?" },
];

const PRAYERS = [
  { title: "Oración de la Mañana", icon: "🌅", text: "Señor Dios, gracias por un nuevo día lleno de Tu misericordia. Guía mis pasos, ilumina mi camino y que Tu voluntad se cumpla en todo lo que haga hoy. Protégeme a mí y a mis seres queridos. En el nombre de Jesús, amén." },
  { title: "Oración de la Noche", icon: "🌙", text: "Padre celestial, gracias por Tu protección durante este día. Perdona mis errores y lléname de Tu paz para descansar. Guarda a mi familia y a todos mis seres queridos. Me entrego en Tus manos. En el nombre de Jesús, amén." },
  { title: "Oración por la Familia", icon: "👨‍👩‍👧‍👦", text: "Señor, te pido por mi familia. Únalos con lazos de amor y fe. Protege a cada uno de sus miembros, sana las heridas del pasado y fortalece los vínculos que nos unen. Que Cristo sea el centro de nuestro hogar. Amén." },
  { title: "Oración por Sanidad", icon: "🕊️", text: "Dios Todopoderoso, Tú eres el Dios que sana. Toca cada parte de mi cuerpo, alma y espíritu que necesita restauración. Trae salud completa según Tu voluntad perfecta. Confío en Tu poder sanador. Amén." },
  { title: "Oración por Fortaleza", icon: "💪", text: "Señor, en los momentos de debilidad, recuérdame que Tu poder se perfecciona en mi debilidad. Dame fortaleza para enfrentar cada desafío, valentía para no rendirme y fe para seguir adelante. Amén." },
  { title: "Oración de Gratitud", icon: "🙏", text: "Padre amado, gracias por Tu amor que nunca falla. Gracias por la vida, la salud, la familia y todas las bendiciones que muchas veces doy por sentadas. Ayúdame a vivir con un corazón agradecido cada día. Amén." },
];

const PLANS = [
  { id: 1, title: "30 Días de Fe", description: "Un versículo diario para fortalecer tu fe cada mañana.", days: 30, category: "Fe", color: "#e8a4c8" },
  { id: 2, title: "Paz Profunda", description: "Encuentra la paz de Dios que sobrepasa todo entendimiento.", days: 14, category: "Paz", color: "#a4c8e8" },
  { id: 3, title: "Mujer de Proverbios", description: "Estudia la mujer virtuosa de Proverbios 31 paso a paso.", days: 7, category: "Identidad", color: "#c8e8a4" },
  { id: 4, title: "Salmos para el Alma", description: "Los Salmos como oración y meditación para mujeres.", days: 21, category: "Adoración", color: "#e8c8a4" },
];

const QUIZ_QUESTIONS = [
  { q: "¿Qué libro de la Biblia contiene el Salmo 23?", opts: ["Proverbios", "Salmos", "Isaías", "Job"], correct: 1 },
  { q: "¿Quién dijo 'Todo lo puedo en Cristo que me fortalece'?", opts: ["Pedro", "Pablo", "Juan", "Moisés"], correct: 1 },
  { q: "¿En qué libro se encuentra 'Nuevas son cada mañana'?", opts: ["Lamentaciones", "Jeremías", "Ezequiel", "Daniel"], correct: 0 },
  { q: "¿Cuántos libros tiene el Nuevo Testamento?", opts: ["27", "39", "66", "31"], correct: 0 },
  { q: "¿Qué significa 'Immanuel'?", opts: ["Dios salva", "Dios con nosotros", "El Señor es mi pastor", "Hijo de Dios"], correct: 1 },
  { q: "¿Qué mujer del Antiguo Testamento es conocida por su lealtad?", opts: ["Jezabel", "Dalila", "Rut", "Herodías"], correct: 2 },
];

const BOOKMARKS_KEY = "devocional_bookmarks";
const NOTES_KEY = "devocional_notes";
const PROGRESS_KEY = "devocional_progress";
const FAVORITES_KEY = "devocional_favorites";

export default function App() {
  const [screen, setScreen] = useState("home");
  const [currentDay, setCurrentDay] = useState(1);
  const [timeOfDay, setTimeOfDay] = useState("morning");
  const [bookmarks, setBookmarks] = useState(() => JSON.parse(localStorage.getItem(BOOKMARKS_KEY) || "[]"));
  const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem(NOTES_KEY) || "{}"));
  const [progress, setProgress] = useState(() => JSON.parse(localStorage.getItem(PROGRESS_KEY) || "[]"));
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]"));
  const [selectedVerse, setSelectedVerse] = useState(null);
  const [noteText, setNoteText] = useState("");
  const [reflectionMorning, setReflectionMorning] = useState("");
  const [reflectionEvening, setReflectionEvening] = useState("");
  const [amenActive, setAmenActive] = useState(false);
  const [amenCount, setAmenCount] = useState(0);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizSelected, setQuizSelected] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showAmenMsg, setShowAmenMsg] = useState(false);
  const [calendarMonth] = useState(new Date());
  const amenTimerRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedVerses, setHighlightedVerses] = useState(() => JSON.parse(localStorage.getItem("highlights") || "[]"));
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const h = new Date().getHours();
    setTimeOfDay(h >= 5 && h < 17 ? "morning" : "evening");
    const d = new Date();
    const start = new Date(d.getFullYear(), 0, 1);
    const dayOfYear = Math.floor((d - start) / 86400000) % 30 + 1;
    setCurrentDay(dayOfYear);
  }, []);

  useEffect(() => { localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks)); }, [bookmarks]);
  useEffect(() => { localStorage.setItem(NOTES_KEY, JSON.stringify(notes)); }, [notes]);
  useEffect(() => { localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress)); }, [progress]);
  useEffect(() => { localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites)); }, [favorites]);
  useEffect(() => { localStorage.setItem("highlights", JSON.stringify(highlightedVerses)); }, [highlightedVerses]);

  const showNotif = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 2500);
  };

  const toggleBookmark = (day) => {
    setBookmarks(b => b.includes(day) ? b.filter(x => x !== day) : [...b, day]);
    showNotif(bookmarks.includes(day) ? "Marcador eliminado" : "¡Versículo guardado! 🔖");
  };

  const toggleFavorite = (day) => {
    setFavorites(f => f.includes(day) ? f.filter(x => x !== day) : [...f, day]);
    showNotif(favorites.includes(day) ? "Favorito eliminado" : "¡Añadido a favoritos! ❤️");
  };

  const toggleHighlight = (day) => {
    setHighlightedVerses(h => h.includes(day) ? h.filter(x => x !== day) : [...h, day]);
    showNotif("Versículo resaltado ✨");
  };

  const markAsRead = (day) => {
    if (!progress.includes(day)) {
      setProgress(p => [...p, day]);
      showNotif("¡Día completado! 🎉");
    }
  };

  const handleAmen = () => {
    setAmenActive(true);
    setShowAmenMsg(true);
    setAmenCount(c => c + 1);
    clearTimeout(amenTimerRef.current);
    amenTimerRef.current = setTimeout(() => {
      setAmenActive(false);
      setShowAmenMsg(false);
    }, 4000);
  };

  const saveNote = () => {
    if (selectedVerse && noteText.trim()) {
      setNotes(n => ({ ...n, [selectedVerse.day]: noteText }));
      showNotif("Nota guardada 📝");
    }
  };

  const saveReflection = (day, morning, evening) => {
    const key = `reflection_${day}`;
    localStorage.setItem(key, JSON.stringify({ morning, evening }));
    showNotif("Reflexión guardada ✍️");
  };

  const loadReflection = (day) => {
    const key = `reflection_${day}`;
    const saved = JSON.parse(localStorage.getItem(key) || '{"morning":"","evening":""}');
    setReflectionMorning(saved.morning || "");
    setReflectionEvening(saved.evening || "");
  };

  const handleVerseOpen = (verse) => {
    setSelectedVerse(verse);
    setNoteText(notes[verse.day] || "");
    loadReflection(verse.day);
    setScreen("verse");
  };

  const handleQuizAnswer = (idx) => {
    setQuizSelected(idx);
    if (idx === QUIZ_QUESTIONS[quizIdx].correct) setQuizScore(s => s + 1);
    setTimeout(() => {
      if (quizIdx + 1 >= QUIZ_QUESTIONS.length) setQuizDone(true);
      else setQuizIdx(i => i + 1);
      setQuizSelected(null);
    }, 1200);
  };

  const resetQuiz = () => {
    setQuizIdx(0); setQuizScore(0); setQuizDone(false); setQuizSelected(null);
  };

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDay = (year, month) => new Date(year, month, 1).getDay();

  const filteredVerses = VERSES.filter(v =>
    v.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.ref.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.theme.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const styles = {
    app: { fontFamily: "'Georgia', serif", background: "linear-gradient(160deg, #fef9f5 0%, #fce4f0 50%, #f0e6ff 100%)", minHeight: "100vh", maxWidth: 430, margin: "0 auto", position: "relative", overflowX: "hidden" },
    header: { background: "linear-gradient(135deg, #c2185b 0%, #880e4f 60%, #6a1b9a 100%)", padding: "20px 16px 16px", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 12px rgba(194,24,91,0.3)" },
    headerTop: { display: "flex", alignItems: "center", justifyContent: "space-between" },
    headerTitle: { color: "#fff", fontSize: 18, fontWeight: "bold", letterSpacing: 0.5 },
    headerSub: { color: "#f8bbd0", fontSize: 12, marginTop: 2 },
    backBtn: { color: "#fff", background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 20, padding: "6px 14px", fontSize: 14, cursor: "pointer", fontFamily: "inherit" },
    nav: { display: "flex", justifyContent: "space-around", background: "#fff", borderTop: "1px solid #f8bbd0", padding: "8px 0 12px", position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 430, zIndex: 100, boxShadow: "0 -2px 12px rgba(0,0,0,0.08)" },
    navBtn: (active) => ({ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, background: "none", border: "none", cursor: "pointer", padding: "4px 8px", color: active ? "#c2185b" : "#9e9e9e", fontSize: 10, fontWeight: active ? "bold" : "normal", transition: "all 0.2s" }),
    navIcon: { fontSize: 22 },
    content: { padding: "16px 16px 80px" },
    card: { background: "#fff", borderRadius: 16, padding: 16, marginBottom: 12, boxShadow: "0 2px 10px rgba(194,24,91,0.08)", border: "1px solid #fce4f0" },
    dayCard: (isToday, isRead, isFav) => ({
      background: isToday ? "linear-gradient(135deg, #fce4f0, #f3e5f5)" : isFav ? "linear-gradient(135deg, #fff0f5, #fff)" : "#fff",
      borderRadius: 16, padding: "14px 16px", marginBottom: 10,
      boxShadow: isToday ? "0 4px 16px rgba(194,24,91,0.2)" : "0 2px 8px rgba(0,0,0,0.06)",
      border: isToday ? "2px solid #c2185b" : isFav ? "2px solid #e91e63" : "1px solid #fce4f0",
      cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s",
      opacity: 1,
    }),
    verseRef: { color: "#c2185b", fontWeight: "bold", fontSize: 13, marginBottom: 4 },
    verseText: { color: "#4a1942", fontSize: 14, lineHeight: 1.6, fontStyle: "italic" },
    themeTag: (color) => ({ display: "inline-block", background: color || "#fce4f0", color: "#880e4f", fontSize: 11, padding: "2px 10px", borderRadius: 20, marginTop: 6, fontWeight: "bold" }),
    sectionTitle: { color: "#880e4f", fontSize: 18, fontWeight: "bold", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 },
    amenBtn: (active) => ({
      background: active ? "linear-gradient(135deg, #c2185b, #6a1b9a)" : "linear-gradient(135deg, #e91e63, #c2185b)",
      color: "#fff", border: "none", borderRadius: 30, padding: active ? "14px 40px" : "12px 36px",
      fontSize: active ? 18 : 16, fontWeight: "bold", cursor: "pointer", width: "100%",
      transition: "all 0.5s ease", boxShadow: active ? "0 6px 24px rgba(194,24,91,0.5)" : "0 3px 12px rgba(194,24,91,0.3)",
      transform: active ? "scale(1.04)" : "scale(1)", letterSpacing: active ? 2 : 1,
    }),
    prayerCard: { background: "linear-gradient(135deg, #fce4f0, #f3e5f5)", borderRadius: 16, padding: 16, marginBottom: 12, border: "1px solid #f8bbd0" },
    prayerTitle: { color: "#880e4f", fontWeight: "bold", fontSize: 15, marginBottom: 8 },
    prayerText: { color: "#5d4037", fontSize: 14, lineHeight: 1.7 },
    input: { width: "100%", border: "1px solid #f8bbd0", borderRadius: 10, padding: "10px 12px", fontFamily: "inherit", fontSize: 13, color: "#4a1942", background: "#fef9f5", resize: "vertical", outline: "none", boxSizing: "border-box" },
    btn: (variant) => ({
      background: variant === "primary" ? "linear-gradient(135deg, #c2185b, #880e4f)" : variant === "outline" ? "transparent" : "#f8bbd0",
      color: variant === "primary" ? "#fff" : "#880e4f",
      border: variant === "outline" ? "2px solid #c2185b" : "none",
      borderRadius: 25, padding: "10px 22px", fontSize: 14, fontWeight: "bold", cursor: "pointer",
      fontFamily: "inherit", transition: "all 0.2s", letterSpacing: 0.5,
    }),
    heroCard: { background: "linear-gradient(135deg, #c2185b 0%, #880e4f 50%, #6a1b9a 100%)", borderRadius: 20, padding: 20, color: "#fff", marginBottom: 16, position: "relative", overflow: "hidden" },
    heroFlower: { position: "absolute", right: 10, top: 10, fontSize: 60, opacity: 0.15 },
    progressBar: (pct) => ({ height: 6, background: "#f8bbd0", borderRadius: 3, overflow: "hidden", marginTop: 8, children: null }),
    progressFill: (pct) => ({ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg, #e91e63, #c2185b)", borderRadius: 3, transition: "width 0.5s" }),
    quizOpt: (sel, correct, idx) => ({
      background: sel === null ? "#fef9f5" : idx === correct ? "#e8f5e9" : sel === idx ? "#fce4e4" : "#fef9f5",
      border: sel === null ? "1px solid #f8bbd0" : idx === correct ? "2px solid #4caf50" : sel === idx ? "2px solid #f44336" : "1px solid #f8bbd0",
      borderRadius: 12, padding: "12px 16px", marginBottom: 8, cursor: sel === null ? "pointer" : "default",
      fontSize: 14, color: "#4a1942", textAlign: "left", width: "100%", fontFamily: "inherit", transition: "all 0.3s",
    }),
    calCell: (hasFav, isToday, hasProgress) => ({
      width: "100%", aspectRatio: "1", borderRadius: 8, border: "none",
      background: hasFav ? "linear-gradient(135deg, #fce4f0, #f8bbd0)" : isToday ? "#c2185b" : hasProgress ? "#f3e5f5" : "#fef9f5",
      color: isToday ? "#fff" : hasFav ? "#880e4f" : "#4a1942",
      fontSize: 12, fontWeight: isToday ? "bold" : "normal", cursor: "pointer",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      gap: 0, position: "relative",
    }),
    notifBanner: { position: "fixed", top: 80, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg, #c2185b, #880e4f)", color: "#fff", borderRadius: 20, padding: "8px 20px", fontSize: 13, fontWeight: "bold", zIndex: 999, boxShadow: "0 4px 16px rgba(194,24,91,0.4)", whiteSpace: "nowrap", transition: "all 0.3s" },
    reflectionSection: { background: "linear-gradient(135deg, #fef9f5, #f3e5f5)", borderRadius: 12, padding: 14, marginTop: 14, border: "1px solid #f8bbd0" },
    reflectionTitle: { color: "#880e4f", fontWeight: "bold", fontSize: 14, marginBottom: 8 },
    tabBtns: { display: "flex", gap: 8, marginBottom: 12 },
    tabBtn: (active) => ({ flex: 1, padding: "8px", borderRadius: 10, border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: active ? "bold" : "normal", background: active ? "#c2185b" : "#fce4f0", color: active ? "#fff" : "#880e4f", transition: "all 0.2s" }),
  };

  const navItems = [
    { id: "home", icon: "🏠", label: "Inicio" },
    { id: "verses", icon: "📖", label: "Versículos" },
    { id: "prayer", icon: "🙏", label: "Oración" },
    { id: "plans", icon: "📅", label: "Planes" },
    { id: "quiz", icon: "💡", label: "Quiz" },
  ];

  const renderHome = () => {
    const todayVerse = VERSES.find(v => v.day === currentDay) || VERSES[0];
    const pct = Math.round((progress.length / 30) * 100);
    return (
      <div style={styles.content}>
        <div style={styles.heroCard}>
          <div style={styles.heroFlower}>🌸</div>
          <div style={{ fontSize: 12, color: "#f8bbd0", marginBottom: 4 }}>30 DÍAS DE FE, PAZ Y CONEXIÓN CON DIOS</div>
          <div style={{ fontSize: 22, fontWeight: "bold", marginBottom: 6 }}>
            {timeOfDay === "morning" ? "🌅 Buenos días," : "🌙 Buenas noches,"}
          </div>
          <div style={{ fontSize: 14, color: "#f8bbd0", marginBottom: 12 }}>Hija de Dios 💗</div>
          <div style={{ fontSize: 12, color: "#f8bbd0", marginBottom: 4 }}>Tu progreso: {pct}% ({progress.length}/30 días)</div>
          <div style={styles.progressBar(pct)}>
            <div style={styles.progressFill(pct)} />
          </div>
          <div style={{ height: 6, background: "#f8bbd050", borderRadius: 3, marginTop: 8, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${pct}%`, background: "#fff9", borderRadius: 3, transition: "width 0.5s" }} />
          </div>
        </div>

        <div style={{ ...styles.card, background: "linear-gradient(135deg, #fff9f0, #fce4f0)", border: "2px solid #f8bbd0" }}>
          <div style={{ color: "#880e4f", fontSize: 13, fontWeight: "bold", marginBottom: 6 }}>
            📖 Versículo del Día — Día {currentDay}
          </div>
          <div style={{ color: "#c2185b", fontWeight: "bold", fontSize: 14, marginBottom: 6 }}>{todayVerse.ref}</div>
          <div style={{ ...styles.verseText, fontSize: 15 }}>"{todayVerse.text}"</div>
          <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
            <span style={styles.themeTag("#fce4f0")}>🏷️ {todayVerse.theme}</span>
            {favorites.includes(todayVerse.day) && <span style={styles.themeTag("#ffe0ea")}>❤️ Favorito</span>}
          </div>
          <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
            <button style={styles.btn("primary")} onClick={() => handleVerseOpen(todayVerse)}>Leer más</button>
            <button style={styles.btn("outline")} onClick={() => toggleFavorite(todayVerse.day)}>
              {favorites.includes(todayVerse.day) ? "❤️" : "🤍"}
            </button>
          </div>
        </div>

        <div style={styles.sectionTitle}>🌸 Accesos Rápidos</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
          {[
            { icon: "📅", label: "Planes de Lectura", action: () => setScreen("plans") },
            { icon: "🙏", label: "Oraciones", action: () => setScreen("prayer") },
            { icon: "🔖", label: "Mis Marcadores", action: () => setScreen("bookmarks") },
            { icon: "💡", label: "Quiz Bíblico", action: () => setScreen("quiz") },
          ].map((item, i) => (
            <button key={i} onClick={item.action} style={{ background: "#fff", border: "1px solid #f8bbd0", borderRadius: 14, padding: "14px 10px", cursor: "pointer", textAlign: "center", boxShadow: "0 2px 8px rgba(194,24,91,0.08)", transition: "transform 0.2s" }}
              onMouseOver={e => e.currentTarget.style.transform = "scale(1.03)"}
              onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}>
              <div style={{ fontSize: 28, marginBottom: 4 }}>{item.icon}</div>
              <div style={{ color: "#880e4f", fontSize: 12, fontWeight: "bold" }}>{item.label}</div>
            </button>
          ))}
        </div>

        <div style={styles.sectionTitle}>🌺 Devoción de Hoy</div>
        <div style={styles.card}>
          <div style={{ color: "#c2185b", fontWeight: "bold", marginBottom: 6, fontSize: 14 }}>
            {timeOfDay === "morning" ? "🌅 Meditación Matutina" : "🌙 Reflexión Vespertina"}
          </div>
          <div style={{ color: "#5d4037", fontSize: 14, lineHeight: 1.7 }}>
            {timeOfDay === "morning" ? todayVerse.morning : todayVerse.evening}
          </div>
          <button style={{ ...styles.btn("outline"), marginTop: 10, fontSize: 13 }} onClick={() => handleVerseOpen(todayVerse)}>
            ✍️ Escribir mi reflexión
          </button>
        </div>
      </div>
    );
  };

  const renderVerses = () => (
    <div style={styles.content}>
      <div style={styles.sectionTitle}>📖 30 Días de Versículos</div>
      <input style={{ ...styles.input, marginBottom: 14 }} placeholder="🔍 Buscar versículo, referencia o tema..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
      <div style={{ fontSize: 12, color: "#9e9e9e", marginBottom: 10 }}>
        ✅ Completados: {progress.length}/30 · ❤️ Favoritos: {favorites.length} · 🔖 Marcadores: {bookmarks.length}
      </div>
      {filteredVerses.map(verse => (
        <div key={verse.day} style={styles.dayCard(verse.day === currentDay, progress.includes(verse.day), favorites.includes(verse.day))}
          onClick={() => handleVerseOpen(verse)}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                <span style={{ background: "#c2185b", color: "#fff", borderRadius: 12, padding: "2px 8px", fontSize: 11, fontWeight: "bold" }}>Día {verse.day}</span>
                {progress.includes(verse.day) && <span style={{ fontSize: 12 }}>✅</span>}
                {favorites.includes(verse.day) && <span style={{ fontSize: 14 }}>❤️</span>}
                {bookmarks.includes(verse.day) && <span style={{ fontSize: 12 }}>🔖</span>}
                {highlightedVerses.includes(verse.day) && <span style={{ fontSize: 12 }}>✨</span>}
              </div>
              <div style={styles.verseRef}>{verse.ref}</div>
              <div style={{ ...styles.verseText, fontSize: 13 }}>"{verse.text.slice(0, 80)}{verse.text.length > 80 ? "..." : ""}"</div>
              <span style={styles.themeTag()}>{verse.theme}</span>
            </div>
            <div style={{ fontSize: 20, marginLeft: 8 }}>›</div>
          </div>
        </div>
      ))}
      {filteredVerses.length === 0 && (
        <div style={{ textAlign: "center", color: "#9e9e9e", padding: 40 }}>
          <div style={{ fontSize: 40 }}>🔍</div>
          <div>No se encontraron versículos</div>
        </div>
      )}
    </div>
  );

  const renderVerseDetail = () => {
    if (!selectedVerse) return null;
    return (
      <div style={styles.content}>
        <div style={{ background: "linear-gradient(135deg, #c2185b, #880e4f)", borderRadius: 20, padding: 20, color: "#fff", marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: "#f8bbd0", marginBottom: 4 }}>DÍA {selectedVerse.day} · {selectedVerse.theme.toUpperCase()}</div>
          <div style={{ fontWeight: "bold", fontSize: 17, marginBottom: 8 }}>{selectedVerse.ref}</div>
          <div style={{ fontSize: 16, lineHeight: 1.7, fontStyle: "italic" }}>"{selectedVerse.text}"</div>
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
          <button style={styles.btn(bookmarks.includes(selectedVerse.day) ? "primary" : "outline")} onClick={() => toggleBookmark(selectedVerse.day)}>
            {bookmarks.includes(selectedVerse.day) ? "🔖 Guardado" : "🔖 Guardar"}
          </button>
          <button style={styles.btn(favorites.includes(selectedVerse.day) ? "primary" : "outline")} onClick={() => toggleFavorite(selectedVerse.day)}>
            {favorites.includes(selectedVerse.day) ? "❤️ Favorito" : "🤍 Favorito"}
          </button>
          <button style={styles.btn(highlightedVerses.includes(selectedVerse.day) ? "primary" : "outline")} onClick={() => toggleHighlight(selectedVerse.day)}>
            ✨ Resaltar
          </button>
          <button style={styles.btn(progress.includes(selectedVerse.day) ? "primary" : "outline")} onClick={() => markAsRead(selectedVerse.day)}>
            {progress.includes(selectedVerse.day) ? "✅ Leído" : "📖 Marcar leído"}
          </button>
        </div>

        <div style={styles.reflectionSection}>
          <div style={styles.reflectionTitle}>🕊️ Devoción del Día</div>
          <div style={styles.tabBtns}>
            <button style={styles.tabBtn(timeOfDay === "morning")} onClick={() => setTimeOfDay("morning")}>🌅 Mañana</button>
            <button style={styles.tabBtn(timeOfDay === "evening")} onClick={() => setTimeOfDay("evening")}>🌙 Noche</button>
          </div>
          <div style={{ color: "#5d4037", fontSize: 14, lineHeight: 1.7 }}>
            {timeOfDay === "morning" ? selectedVerse.morning : selectedVerse.evening}
          </div>
        </div>

        <div style={{ ...styles.reflectionSection, marginTop: 14 }}>
          <div style={styles.reflectionTitle}>✍️ Mi Reflexión Personal</div>
          <div style={{ marginBottom: 10 }}>
            <div style={{ color: "#c2185b", fontSize: 13, fontWeight: "bold", marginBottom: 6 }}>🌅 Reflexión de Mañana</div>
            <textarea style={{ ...styles.input, minHeight: 70, marginBottom: 8 }} placeholder="¿Qué te dice Dios esta mañana a través de este versículo?" value={reflectionMorning} onChange={e => setReflectionMorning(e.target.value)} />
          </div>
          <div>
            <div style={{ color: "#6a1b9a", fontSize: 13, fontWeight: "bold", marginBottom: 6 }}>🌙 Reflexión de Noche</div>
            <textarea style={{ ...styles.input, minHeight: 70 }} placeholder="Al cerrar el día, ¿cómo viviste este versículo hoy?" value={reflectionEvening} onChange={e => setReflectionEvening(e.target.value)} />
          </div>
          <button style={{ ...styles.btn("primary"), width: "100%", marginTop: 10 }} onClick={() => saveReflection(selectedVerse.day, reflectionMorning, reflectionEvening)}>
            Guardar Reflexiones 💾
          </button>
        </div>

        <div style={styles.card}>
          <div style={{ color: "#880e4f", fontWeight: "bold", fontSize: 14, marginBottom: 8 }}>📝 Mis Notas Personales</div>
          <textarea style={{ ...styles.input, minHeight: 90 }} placeholder="Escribe tus pensamientos, revelaciones o lo que Dios puso en tu corazón..." value={noteText} onChange={e => setNoteText(e.target.value)} />
          <button style={{ ...styles.btn("primary"), width: "100%", marginTop: 8 }} onClick={saveNote}>Guardar Nota</button>
        </div>

        <div style={{ ...styles.card, textAlign: "center" }}>
          <div style={{ color: "#880e4f", fontWeight: "bold", marginBottom: 8 }}>¿Este versículo habló a tu corazón?</div>
          {showAmenMsg && (
            <div style={{ background: "linear-gradient(135deg, #fce4f0, #f3e5f5)", borderRadius: 12, padding: "10px 16px", marginBottom: 12, color: "#880e4f", fontSize: 14, fontStyle: "italic" }}>
              🕊️ "Que así sea en tu vida, hija de Dios. Su Palabra es fiel y verdadera." — Apocalipsis 21:5
            </div>
          )}
          <button style={amenBtn(amenActive)} onClick={handleAmen}>
            {amenActive ? "🙏 ¡Amén! ¡Amén! ¡Amén!" : "🙏 Amén"}
          </button>
          {amenCount > 0 && <div style={{ color: "#9e9e9e", fontSize: 12, marginTop: 8 }}>Has dicho amén {amenCount} {amenCount === 1 ? "vez" : "veces"} 🌸</div>}
        </div>

        function amenBtn(active) {
      return styles.amenBtn(active);
    }
      </div>
    );
  };

  function amenBtn(active) {
    return styles.amenBtn(active);
  }

  const renderPrayer = () => (
    <div style={styles.content}>
      <div style={styles.sectionTitle}>🙏 Oraciones para Mujeres</div>
      <div style={{ ...styles.card, background: "linear-gradient(135deg, #fce4f0, #f3e5f5)", marginBottom: 16 }}>
        <div style={{ color: "#880e4f", fontWeight: "bold", marginBottom: 6 }}>💗 Oración del Día</div>
        <div style={{ color: "#5d4037", fontSize: 13, lineHeight: 1.7 }}>
          "Señor, gracias por el regalo de este día. Que Tu amor me guíe, Tu paz me sostenga y Tu sabiduría ilumine cada paso que dé hoy. Amén."
        </div>
        <button style={{ ...styles.amenBtn(amenActive), marginTop: 12 }} onClick={handleAmen}>
          {amenActive ? "🙏 ¡Amén!" : "🙏 Decir Amén"}
        </button>
      </div>
      {PRAYERS.map((prayer, i) => (
        <div key={i} style={styles.prayerCard}>
          <div style={styles.prayerTitle}>{prayer.icon} {prayer.title}</div>
          <div style={styles.prayerText}>{prayer.text}</div>
          <button style={{ ...styles.btn("outline"), marginTop: 10, fontSize: 12 }} onClick={handleAmen}>🙏 Amén</button>
        </div>
      ))}
      <div style={styles.card}>
        <div style={{ color: "#880e4f", fontWeight: "bold", marginBottom: 8 }}>✍️ Mi Oración Personal</div>
        <textarea style={{ ...styles.input, minHeight: 110 }} placeholder="Escribe aquí tu oración personal. Dios escucha cada palabra de tu corazón..." />
        <button style={{ ...styles.btn("primary"), width: "100%", marginTop: 8 }} onClick={() => showNotif("Oración guardada 🙏")}>Guardar Oración</button>
      </div>
      {/* TODO: Implementar recordatorios de oración con notificaciones push reales */}
      <div style={styles.card}>
        <div style={{ color: "#880e4f", fontWeight: "bold", marginBottom: 8 }}>🔔 Recordatorio de Oración</div>
        <div style={{ color: "#9e9e9e", fontSize: 13, marginBottom: 10 }}>Configura un recordatorio para tu tiempo de oración diario</div>
        <div style={{ display: "flex", gap: 8 }}>
          <input type="time" style={{ ...styles.input, flex: 1 }} defaultValue="07:00" />
          <button style={{ ...styles.btn("primary"), whiteSpace: "nowrap" }} onClick={() => showNotif("Recordatorio configurado 🔔")}>Activar</button>
        </div>
      </div>
    </div>
  );

  const renderPlans = () => (
    <div style={styles.content}>
      <div style={styles.sectionTitle}>📅 Planes de Lectura</div>
      {PLANS.map(plan => (
        <div key={plan.id} style={{ ...styles.card, cursor: "pointer", borderLeft: `4px solid ${plan.color}` }}
          onClick={() => { setSelectedPlan(plan); setScreen("planDetail"); }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ color: "#880e4f", fontWeight: "bold", fontSize: 16, marginBottom: 4 }}>{plan.title}</div>
              <div style={{ color: "#5d4037", fontSize: 13, marginBottom: 6 }}>{plan.description}</div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={styles.themeTag(plan.color + "60")}>📅 {plan.days} días</span>
                <span style={styles.themeTag("#fce4f0")}>{plan.category}</span>
              </div>
            </div>
            <div style={{ fontSize: 24, marginLeft: 8 }}>›</div>
          </div>
        </div>
      ))}
      <div style={{ ...styles.card, background: "linear-gradient(135deg, #c2185b, #6a1b9a)", color: "#fff" }}>
        <div style={{ fontWeight: "bold", fontSize: 16, marginBottom: 6 }}>🌟 Plan Activo</div>
        <div style={{ fontSize: 14, color: "#f8bbd0", marginBottom: 8 }}>30 Días de Fe, Paz y Conexión con Dios</div>
        <div style={{ fontSize: 12, color: "#f8bbd0", marginBottom: 6 }}>Día {currentDay} de 30 · {progress.length} días completados</div>
        <div style={{ background: "#ffffff30", borderRadius: 4, height: 6, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${(progress.length / 30) * 100}%`, background: "#fff", borderRadius: 4 }} />
        </div>
      </div>
    </div>
  );

  const renderPlanDetail = () => {
    if (!selectedPlan) return null;
    return (
      <div style={styles.content}>
        <div style={{ background: `linear-gradient(135deg, ${selectedPlan.color}, #c2185b)`, borderRadius: 20, padding: 20, color: "#fff", marginBottom: 16 }}>
          <div style={{ fontSize: 22, fontWeight: "bold", marginBottom: 4 }}>{selectedPlan.title}</div>
          <div style={{ fontSize: 14, opacity: 0.9, marginBottom: 8 }}>{selectedPlan.description}</div>
          <span style={{ background: "#ffffff30", borderRadius: 20, padding: "4px 12px", fontSize: 12 }}>{selectedPlan.days} días · {selectedPlan.category}</span>
        </div>
        <div style={styles.card}>
          <div style={{ color: "#880e4f", fontWeight: "bold", marginBottom: 10 }}>📋 Descripción del Plan</div>
          <div style={{ color: "#5d4037", fontSize: 14, lineHeight: 1.7 }}>
            Este plan te guiará día a día a través de versículos seleccionados especialmente para mujeres. Cada día incluye un versículo, una meditación y un espacio para reflexionar.
          </div>
          <button style={{ ...styles.btn("primary"), width: "100%", marginTop: 14 }} onClick={() => { setScreen("verses"); showNotif("¡Plan iniciado! 🌸"); }}>
            Comenzar Plan 🌸
          </button>
        </div>
        {VERSES.slice(0, selectedPlan.days).map(v => (
          <div key={v.day} style={styles.dayCard(v.day === currentDay, progress.includes(v.day), favorites.includes(v.day))}
            onClick={() => handleVerseOpen(v)}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ background: "#c2185b", color: "#fff", borderRadius: 12, padding: "2px 8px", fontSize: 11, fontWeight: "bold", minWidth: 40, textAlign: "center" }}>Día {v.day}</span>
              <div>
                <div style={{ color: "#c2185b", fontWeight: "bold", fontSize: 13 }}>{v.ref}</div>
                <div style={{ color: "#5d4037", fontSize: 12 }}>{v.theme}</div>
              </div>
              <div style={{ marginLeft: "auto", display: "flex", gap: 4 }}>
                {progress.includes(v.day) && <span>✅</span>}
                {favorites.includes(v.day) && <span>❤️</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderQuiz = () => {
    if (quizDone) {
      const pct = Math.round((quizScore / QUIZ_QUESTIONS.length) * 100);
      return (
        <div style={styles.content}>
          <div style={{ ...styles.heroCard, textAlign: "center" }}>
            <div style={{ fontSize: 50, marginBottom: 10 }}>{pct >= 80 ? "🏆" : pct >= 50 ? "🌟" : "📖"}</div>
            <div style={{ fontSize: 22, fontWeight: "bold", marginBottom: 6 }}>¡Quiz Completado!</div>
            <div style={{ fontSize: 48, fontWeight: "bold", marginBottom: 6 }}>{pct}%</div>
            <div style={{ color: "#f8bbd0", fontSize: 15 }}>{quizScore} de {QUIZ_QUESTIONS.length} respuestas correctas</div>
            <div style={{ marginTop: 10, fontSize: 14 }}>
              {pct >= 80 ? "¡Excelente! Tu conocimiento bíblico es inspirador 🌸" : pct >= 50 ? "¡Bien hecho! Sigue estudiando la Palabra 📖" : "Sigue leyendo tu Biblia cada día 🙏"}
            </div>
          </div>
          <button style={{ ...styles.btn("primary"), width: "100%", padding: "14px" }} onClick={resetQuiz}>Jugar de Nuevo 🔄</button>
        </div>
      );
    }
    const q = QUIZ_QUESTIONS[quizIdx];
    return (
      <div style={styles.content}>
        <div style={styles.sectionTitle}>💡 Quiz Bíblico</div>
        <div style={{ ...styles.card, background: "linear-gradient(135deg, #fce4f0, #f3e5f5)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <span style={{ color: "#c2185b", fontWeight: "bold", fontSize: 13 }}>Pregunta {quizIdx + 1} de {QUIZ_QUESTIONS.length}</span>
            <span style={{ color: "#9e9e9e", fontSize: 13 }}>⭐ {quizScore} correctas</span>
          </div>
          <div style={{ background: "#c2185b", borderRadius: 6, height: 4, marginBottom: 14, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${((quizIdx) / QUIZ_QUESTIONS.length) * 100}%`, background: "#fff", borderRadius: 6 }} />
          </div>
          <div style={{ color: "#880e4f", fontWeight: "bold", fontSize: 16, lineHeight: 1.5, marginBottom: 16 }}>📖 {q.q}</div>
          {q.opts.map((opt, idx) => (
            <button key={idx} style={styles.quizOpt(quizSelected, q.correct, idx)} onClick={() => quizSelected === null && handleQuizAnswer(idx)} disabled={quizSelected !== null}>
              <span style={{ fontWeight: "bold", color: "#c2185b", marginRight: 8 }}>{String.fromCharCode(65 + idx)}.</span>
              {opt}
              {quizSelected !== null && idx === q.correct && <span style={{ float: "right" }}>✅</span>}
              {quizSelected === idx && idx !== q.correct && <span style={{ float: "right" }}>❌</span>}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderBookmarks = () => (
    <div style={styles.content}>
      <div style={styles.sectionTitle}>🔖 Mis Marcadores y Favoritos</div>
      {bookmarks.length === 0 && favorites.length === 0 ? (
        <div style={{ textAlign: "center", padding: 40, color: "#9e9e9e" }}>
          <div style={{ fontSize: 40 }}>🔖</div>
          <div>Aún no tienes versículos guardados</div>
          <div style={{ fontSize: 13, marginTop: 6 }}>Ve a "Versículos" y guarda los que toquen tu corazón</div>
        </div>
      ) : null}
      {favorites.length > 0 && (
        <>
          <div style={{ color: "#e91e63", fontWeight: "bold", marginBottom: 8 }}>❤️ Favoritos ({favorites.length})</div>
          {VERSES.filter(v => favorites.includes(v.day)).map(verse => (
            <div key={verse.day} style={{ ...styles.dayCard(false, false, true), cursor: "pointer" }} onClick={() => handleVerseOpen(verse)}>
              <div style={styles.verseRef}>{verse.ref} — Día {verse.day}</div>
              <div style={{ ...styles.verseText, fontSize: 13 }}>"{verse.text.slice(0, 70)}..."</div>
            </div>
          ))}
        </>
      )}
      {bookmarks.length > 0 && (
        <>
          <div style={{ color: "#c2185b", fontWeight: "bold", marginBottom: 8, marginTop: 12 }}>🔖 Marcadores ({bookmarks.length})</div>
          {VERSES.filter(v => bookmarks.includes(v.day)).map(verse => (
            <div key={verse.day} style={styles.dayCard(false, progress.includes(verse.day), false)} onClick={() => handleVerseOpen(verse)}>
              <div style={styles.verseRef}>{verse.ref} — Día {verse.day}</div>
              <div style={{ ...styles.verseText, fontSize: 13 }}>"{verse.text.slice(0, 70)}..."</div>
            </div>
          ))}
        </>
      )}
    </div>
  );

  const renderCalendar = () => {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDay(year, month);
    const today = new Date().getDate();
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
    const cells = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    return (
      <div style={styles.content}>
        <div style={styles.sectionTitle}>🗓️ Calendario Devocional</div>
        <div style={styles.card}>
          <div style={{ textAlign: "center", color: "#880e4f", fontWeight: "bold", fontSize: 16, marginBottom: 12 }}>
            {monthNames[month]} {year}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginBottom: 8 }}>
            {dayNames.map(d => (
              <div key={d} style={{ textAlign: "center", color: "#9e9e9e", fontSize: 10, fontWeight: "bold", padding: "4px 0" }}>{d}</div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
            {cells.map((day, i) => {
              if (!day) return <div key={i} />;
              const dayVerse = VERSES.find(v => v.day === day);
              const isFav = dayVerse && favorites.includes(dayVerse.day);
              const hasProgress = dayVerse && progress.includes(dayVerse.day);
              const isToday = day === today;
              return (
                <button key={i} style={styles.calCell(isFav, isToday, hasProgress)}
                  onClick={() => dayVerse && handleVerseOpen(dayVerse)}>
                  <span style={{ fontSize: 11 }}>{day}</span>
                  {isFav && <span style={{ fontSize: 8 }}>❤️</span>}
                  {hasProgress && !isFav && <span style={{ fontSize: 8 }}>✓</span>}
                </button>
              );
            })}
          </div>
          <div style={{ marginTop: 12, display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#9e9e9e" }}>
              <div style={{ width: 12, height: 12, background: "#c2185b", borderRadius: 2 }} /> Hoy
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#9e9e9e" }}>
              <span>❤️</span> Favorito
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#9e9e9e" }}>
              <div style={{ width: 12, height: 12, background: "#f3e5f5", borderRadius: 2 }} /> Leído
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderHeader = () => {
    const titles = {
      home: { title: "Guía Devocional 🌸", sub: "30 días de fe, paz y conexión con Dios" },
      verses: { title: "📖 Versículos", sub: "30 días de sabiduría" },
      verse: { title: selectedVerse ? `Día ${selectedVerse.day}` : "Versículo", sub: selectedVerse?.theme || "" },
      prayer: { title: "🙏 Oraciones", sub: "Para mujeres de fe" },
      plans: { title: "📅 Planes", sub: "Rutas de lectura" },
      planDetail: { title: selectedPlan?.title || "Plan", sub: `${selectedPlan?.days || ""} días` },
      quiz: { title: "💡 Quiz Bíblico", sub: "Pon a prueba tu conocimiento" },
      bookmarks: { title: "🔖 Guardados", sub: "Tus versículos favoritos" },
      calendar: { title: "🗓️ Calendario", sub: "Tu progreso mensual" },
    };
    const t = titles[screen] || titles.home;
    const showBack = screen !== "home" && !["verses", "prayer", "plans", "quiz"].includes(screen);
    const mainScreens = ["verses", "prayer", "plans", "quiz"];
    return (
      <div style={styles.header}>
        <div style={styles.headerTop}>
          {showBack ? (
            <button style={styles.backBtn} onClick={() => {
              if (screen === "verse") setScreen("verses");
              else if (screen === "planDetail") setScreen("plans");
              else setScreen("home");
            }}>← Volver</button>
          ) : (
            <div style={{ display: "flex", gap: 6 }}>
              <button style={{ ...styles.backBtn, padding: "6px 10px" }} onClick={() => setScreen("bookmarks")}>🔖</button>
              <button style={{ ...styles.backBtn, padding: "6px 10px" }} onClick={() => setScreen("calendar")}>🗓️</button>
            </div>
          )}
          <div style={{ textAlign: "right" }}>
            <div style={styles.headerTitle}>{t.title}</div>
            <div style={styles.headerSub}>{t.sub}</div>
          </div>
        </div>
      </div>
    );
  };

  const renderScreen = () => {
    switch (screen) {
      case "home": return renderHome();
      case "verses": return renderVerses();
      case "verse": return renderVerseDetail();
      case "prayer": return renderPrayer();
      case "plans": return renderPlans();
      case "planDetail": return renderPlanDetail();
      case "quiz": return renderQuiz();
      case "bookmarks": return renderBookmarks();
      case "calendar": return renderCalendar();
      default: return renderHome();
    }
  };

  const mainNav = ["home", "verses", "prayer", "plans", "quiz"];

  return (
    <div style={styles.app}>
      {notification && <div style={styles.notifBanner}>{notification}</div>}
      {renderHeader()}
      {renderScreen()}
      <nav style={styles.nav}>
        {navItems.map(item => (
          <button key={item.id} style={styles.navBtn(screen === item.id)} onClick={() => setScreen(item.id)}>
            <span style={styles.navIcon}>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}