import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Sparkles, ArrowRight, Play, CheckCircle2, Shield, MessageSquare, Calendar, TrendingUp, Sparkle, Mic, Volume2, X, DollarSign, Flame, ChevronLeft, ChevronRight, Brain, Frown, Smile, AlertCircle, Hourglass, Clock, Grid } from 'lucide-react';

const situations = [
    {
        tabLabel: "Acordando na segunda",
        emoji: "🌅",
        userMessage: "Controle-C, o que eu tenho programado para hoje e qual é a primeira tarefa da minha semana?",
        botReply: "Bom dia, chefe! Você tem 3 compromissos hoje. O primeiro é a Reunião de Alinhamento às 10:00. Sua primeira tarefa pendente é 'Revisar proposta do Controle-C'.",
        category: "Agenda & Tarefas",
        tags: ["Agenda", "Tarefas"],
        metricLabel: "Progresso Semanal",
        metricValue: "12%",
        metricBarWidth: "w-[12%]",
        floatingTitle: "Agenda",
        floatingVal: "Reunião de Alinhamento",
        floatingIcon: "📅",
        floatingColor: "text-accent-purple bg-accent-purple/10",
        videoUrl: "https://pub-91424e7b1d9d42bba2633f0dd91bcea1.r2.dev/hero-segunda.mp4"
    },
    {
        tabLabel: "Na fila do café",
        emoji: "☕",
        userMessage: "Controle-C, comprei um cappuccino e um pão na chapa. Deu R$ 18,50 no débito.",
        botReply: "Anotado, chefe! R$ 18,50 lançados em Alimentação. Seu gasto na categoria esta semana está em R$ 94,20 (dentro da meta de R$ 250).",
        category: "Finanças Pessoais",
        tags: ["Finanças", "Alimentação"],
        metricLabel: "Orçamento Diário",
        metricValue: "45%",
        metricBarWidth: "w-[45%]",
        floatingTitle: "Finanças",
        floatingVal: "Starbucks: R$ 18,50",
        floatingIcon: "💰",
        floatingColor: "text-accent-emerald bg-accent-emerald/10",
        videoUrl: "https://pub-91424e7b1d9d42bba2633f0dd91bcea1.r2.dev/hero-fila-cafe.mp4"
    },
    {
        tabLabel: "Briefing diário",
        emoji: "📊",
        userMessage: "Controle-C, me dá um resumo do meu orçamento e compromissos de hoje de forma rápida.",
        botReply: "Resumo pronto! Compromissos: 2 reuniões à tarde. Gastos de hoje: R$ 0,00 lançados. Saldo restante do mês dentro do planejado. Você está no caminho certo!",
        category: "Relatórios & Resumos",
        tags: ["Briefing", "Sincronizado"],
        metricLabel: "Previsão Mensal",
        metricValue: "Meta Batida",
        metricBarWidth: "w-[100%]",
        floatingTitle: "Meta",
        floatingVal: "+ R$ 1.500,00 poupados",
        floatingIcon: "📈",
        floatingColor: "text-accent-cyan bg-accent-cyan/10",
        videoUrl: "https://pub-91424e7b1d9d42bba2633f0dd91bcea1.r2.dev/hero-briefing.mp4"
    },
    {
        tabLabel: "Querendo aprender",
        emoji: "💡",
        userMessage: "Controle-C, salve esse link sobre Inteligência Artificial na minha base de conhecimento para ler mais tarde.",
        botReply: "Link salvo com sucesso na sua Base de Conhecimento! Marquei como 'Tecnologia' e 'Leitura'. Deseja que eu agende um lembrete para domingo às 19:00?",
        category: "Base de Conhecimento",
        tags: ["Conhecimento", "Leitura"],
        metricLabel: "Artigos Salvos",
        metricValue: "8 links",
        metricBarWidth: "w-[65%]",
        floatingTitle: "Base de Conhecimento",
        floatingVal: "Salvo com sucesso",
        floatingIcon: "💡",
        floatingColor: "text-amber-400 bg-amber-400/10",
        videoUrl: "https://pub-91424e7b1d9d42bba2633f0dd91bcea1.r2.dev/hero-reuniao.mp4"
    },
    {
        tabLabel: "Sexta à noite",
        emoji: "🎉",
        userMessage: "Controle-C, acabei de treinar agora na academia. Marca como concluído meu hábito de exercícios.",
        botReply: "Excelente trabalho, chefe! Hábito de 'Exercícios Físicos' marcado. Você completou 5 dias seguidos! Streak de fogo ativado: 🔥 5 dias!",
        category: "Gestão de Hábitos",
        tags: ["Habits", "🔥 Streak!"],
        metricLabel: "Hábito Semanal",
        metricValue: "🔥 5 dias seguidos",
        metricBarWidth: "w-[83%]",
        floatingTitle: "Saúde",
        floatingVal: "Exercícios Feitos",
        floatingIcon: "🏋️",
        floatingColor: "text-rose-500 bg-rose-500/10",
        videoUrl: "https://pub-91424e7b1d9d42bba2633f0dd91bcea1.r2.dev/hero-sexta.mp4"
    },
    {
        tabLabel: "Final do mês",
        emoji: "📈",
        userMessage: "Controle-C, como fecharam minhas contas este mês? Consegui poupar o planejado?",
        botReply: "Parabéns, chefe! Você poupou R$ 1.500,00 este mês, superando a meta em 15%. Seus maiores gastos foram Alimentação e Lazer. Relatório detalhado disponível no painel!",
        category: "Finanças Avançadas",
        tags: ["Balanço", "Relatório"],
        metricLabel: "Saldo Economizado",
        metricValue: "115% da meta",
        metricBarWidth: "w-[100%]",
        floatingTitle: "Economia",
        floatingVal: "+ R$ 1.500,00",
        floatingIcon: "💰",
        floatingColor: "text-accent-emerald bg-accent-emerald/10",
        videoUrl: "https://pub-91424e7b1d9d42bba2633f0dd91bcea1.r2.dev/hero-final-mes.mp4"
    }
];

const tutorials = [
    {
        title: "Agenda",
        menuTitle: "Agenda",
        description: "Entenda como funciona a sincronia com o Google Agenda em tempo real.",
        icon: "📅",
        videoUrl: "https://player-vz-19ec53c2-073.tv.pandavideo.com.br/embed/?v=f34ce234-1b88-46de-853d-99f708dce428"
    },
    {
        title: "Lista de Tarefas por Projetos",
        menuTitle: "Tarefas",
        description: "Entenda como funciona a lista de tarefas, projetos e prazos dentro do Controle-C.",
        icon: "📋",
        videoUrl: "https://player-vz-19ec53c2-073.tv.pandavideo.com.br/embed/?v=edefa0e6-3c82-4932-a0eb-d9770a9b93af"
    },
    {
        title: "Rastreador de Hábitos e Rotinas & Gamificação",
        menuTitle: "Hábitos",
        description: "Entenda como o controle de hábitos e rotinas é feito dentro do Controle-C e como ele é gamificado e rastreado.",
        icon: "🔥",
        videoUrl: "https://player-vz-19ec53c2-073.tv.pandavideo.com.br/embed/?v=dec69694-820c-43ec-b2af-d1d49e71a0e8"
    },
    {
        title: "Controle Financeiro Completo",
        menuTitle: "Financeiro",
        description: "Entenda como funcionam todas as funcionalidades de finanças dentro do Controle-C.",
        icon: "💰",
        videoUrl: "https://player-vz-19ec53c2-073.tv.pandavideo.com.br/embed/?v=2b7dcaa2-7954-4b05-8f34-3fc3d03d7eca"
    }
];

const App = () => {
    const containerRef = useRef(null);
    const timelineRef = useRef(null);
    const pricingRef = useRef(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [showDemoModal, setShowDemoModal] = useState(false);
    const [simStep, setSimStep] = useState(0); // 0: audio processing, 1: processed/revealed
    const [cardTilt, setCardTilt] = useState({ x: 0, y: 0 });
    const [billingPeriod, setBillingPeriod] = useState('annual');
    const [activeTutorialTab, setActiveTutorialTab] = useState(0);

    const isOfferActive = useMemo(() => {
        const now = new Date();
        const startDate = new Date('2026-06-06T00:00:00');
        const endDate = new Date('2026-07-06T23:59:59');
        return now >= startDate && now <= endDate;
    }, []);

    const alternatingWords = useMemo(() => [
        { text: "agenda", colorClass: "text-[#ffd700]" },
        { text: "tarefas", colorClass: "text-[#ffd700]" },
        { text: "finanças", colorClass: "text-[#ffd700]" },
        { text: "hábitos", colorClass: "text-[#ffd700]" }
    ], []);

    const [wordIndex, setWordIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setWordIndex((prev) => (prev + 1) % alternatingWords.length);
        }, 2500);
        return () => clearInterval(interval);
    }, [alternatingWords]);

    // ── Mobile Performance Guard ──
    // Detects mobile/touch devices robustly (even if "Request Desktop Site" is active)
    // useMemo ensures this is only computed once on mount, not on every re-render
    const isMobile = useMemo(() => typeof window !== 'undefined' && (
        /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || 
        window.innerWidth < 1024 || 
        ('ontouchstart' in window) || 
        (navigator.maxTouchPoints > 0)
    ), []);
    // Helper: disabled to prevent GPU overload and WebKit rendering bugs (returns empty object)
    const fb = (px) => ({});
    // Helper: returns viewport options (once: true and smaller margin on mobile to prevent elements staying invisible)
    const vp = (marginStr) => isMobile ? { once: true, margin: "-20px 0px" } : { once: false, margin: marginStr };

    // ── Mobile video play state (poster → video on demand) ──
    const [mobileVideoPlaying, setMobileVideoPlaying] = useState(false);
    const mobileVideoRef = useRef(null);

    const handleMouseMoveCard = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const tiltX = (y / (rect.height / 2)) * -12;
        const tiltY = (x / (rect.width / 2)) * 12;
        setCardTilt({ x: tiltX, y: tiltY });
    };

    const handleMouseLeaveCard = () => {
        setCardTilt({ x: 0, y: 0 });
    };

    // States and refs for interactive micro-interfaces in timeline cards
    const [activeFinanceCategory, setActiveFinanceCategory] = useState(null);
    const [tasks, setTasks] = useState([
        { id: 1, project: "Casa", text: "Comprar Airfryer", deadline: "Amanhã", color: "bg-[#ffa751]/10 text-[#ffa751] border-[#ffa751]/20", completed: false },
        { id: 2, project: "Empresa", text: "Pagar conta de internet do escritório", deadline: "Todo dia 17", color: "bg-[#0cf2cd]/10 text-[#0cf2cd] border-[#0cf2cd]/20", completed: false },
        { id: 3, project: "Filho", text: "Levar para o pediatra", deadline: "Sem prazo", color: "bg-[#8b5cf6]/10 text-[#8b5cf6] border-[#8b5cf6]/20", completed: false }
    ]);
    const toggleTask = (id) => {
        setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const [habitDays, setHabitDays] = useState([
        { id: 1, label: "SEG", number: 1, completed: true },
        { id: 2, label: "TER", number: 2, completed: true },
        { id: 3, label: "QUA", number: 3, completed: false, isToday: true },
        { id: 4, label: "QUI", number: 4, completed: false },
        { id: 5, label: "SEX", number: 5, completed: false },
        { id: 6, label: "SÁB", number: 6, completed: false },
        { id: 7, label: "DOM", number: 7, completed: false }
    ]);
    const [activeHabitTab, setActiveHabitTab] = useState("semanal");
    const toggleHabitDay = (id) => {
        setHabitDays(prev => prev.map(d => d.id === id ? { ...d, completed: !d.completed } : d));
    };

    const budgetData = [
        { category: "Alimentação", current: 185, max: 250, color: "bg-[#ffa751]" },
        { category: "Transporte", current: 90, max: 150, color: "bg-[#ffe259]" },
        { category: "Lazer", current: 310, max: 300, color: "bg-rose-500" }
    ];

    // ── Timeline scroll animation (desktop only) ──
    // On mobile, useScroll adds a continuous scroll listener that saturates the main thread
    // combined with video decoding — we skip it and show the line at full scale statically.
    const { scrollYProgress } = useScroll(
        isMobile
            ? {} // no target/offset on mobile — hook still called (Rules of Hooks), but inactive
            : { target: timelineRef, offset: ["start 60%", "end 85%"] }
    );
    const scaleY = useSpring(
        isMobile ? 1 : scrollYProgress,
        { stiffness: 100, damping: 30, restDelta: 0.001 }
    );

    useEffect(() => {
        let isCancelled = false;
        setSimStep(0);
        // Reset mobile video state when tab changes
        setMobileVideoPlaying(false);

        // Sync with video audio processing (approx 1.8 seconds)
        const timer = setTimeout(() => {
            if (isCancelled) return;
            setSimStep(1);
        }, 1800);

        return () => {
            isCancelled = true;
            clearTimeout(timer);
        };
    }, [activeTab]);

    // Auto-cycle situations showcase every 8 seconds (disabled on mobile to prevent memory buildup)
    useEffect(() => {
        if (isMobile) return;
        const cycleTimer = setInterval(() => {
            setActiveTab((prev) => (prev + 1) % situations.length);
        }, 8000);
        return () => clearInterval(cycleTimer);
    }, [isMobile]);

    // High-performance cursor tracking for dynamic background glow spotlight (desktop only)
    useEffect(() => {
        if (isMobile) return; // No cursor tracking on touch devices
        const container = containerRef.current;
        if (!container) return;

        const handleMouseMove = (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            container.style.setProperty('--mouse-x', `${x}px`);
            container.style.setProperty('--mouse-y', `${y}px`);
        };

        container.addEventListener('mousemove', handleMouseMove);
        return () => {
            container.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    // Auto-play mobile video on user touch or scroll interaction
    useEffect(() => {
        if (!isMobile) return;

        const handleInteraction = () => {
            if (mobileVideoRef.current) {
                mobileVideoRef.current.play()
                    .then(() => {
                        removeListeners();
                    })
                    .catch((err) => {
                        console.log("Mobile interaction autoplay prevented:", err);
                    });
            }
        };

        const removeListeners = () => {
            window.removeEventListener('touchstart', handleInteraction);
            window.removeEventListener('scroll', handleInteraction);
        };

        window.addEventListener('touchstart', handleInteraction, { passive: true });
        window.addEventListener('scroll', handleInteraction, { passive: true });

        return removeListeners;
    }, [isMobile]);

    // Animações do Framer Motion - Tactile Spring
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.05
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 90, damping: 20 }
        }
    };

    return (
        <div ref={containerRef} className={`min-h-screen bg-bg-space text-text-main font-body-jakarta overflow-x-hidden relative ${isOfferActive ? 'pt-[36px] sm:pt-[40px]' : ''}`}>
            
            {isOfferActive && (
                <div className="fixed top-0 left-0 right-0 z-50 w-full bg-[#030712]/85 backdrop-blur-md border-b border-[#0cf2cd]/30 text-xs sm:text-sm py-2 px-4 flex items-center justify-center text-center gap-2 select-none animate-slide-down">
                    <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0cf2cd] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0cf2cd]"></span>
                    </span>
                    <span className="text-white font-medium">
                        🔥 <strong className="text-[#0cf2cd]">Oferta Especial:</strong> Garanta <strong className="text-[#ffd700]">20% de desconto</strong> em todos os planos até 06/07!
                    </span>
                    <a 
                        href="#precos" 
                        className="ml-2 bg-[#0cf2cd]/10 hover:bg-[#0cf2cd]/20 border border-[#0cf2cd]/30 text-[#0cf2cd] font-bold px-3 py-1 rounded-full text-[10px] sm:text-xs transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                        Aproveitar Desconto
                    </a>
                </div>
            )}
            
            {/* ── INTERACTIVE CURSOR SPOTLIGHT GLOW (Desktop only — GPU layer removed on mobile) ── */}
            {!isMobile && <div 
                className="absolute inset-0 pointer-events-none z-[1] mix-blend-screen"
                style={{
                    background: 'radial-gradient(450px circle at var(--mouse-x, -999px) var(--mouse-y, -999px), rgba(6,182,212,0.18) 0%, rgba(29,78,216,0.06) 45%, transparent 80%)',
                }}
            />}
            
            {/* ── HIGH-FIDELITY REF BACKGROUND (Multi-Column Diagonal Split - Vivid Tech - Hyper Animated) ──── */}
            {/* Base escura profunda e Wrapper do Ciclo Nebular de Cores - FIXED FOR ENTIRE PAGE */}
            <div className="fixed inset-0 bg-[#010307] pointer-events-none z-0 overflow-hidden animate-nebula-cycle">
                
                {/* COLUNA 1: Extremo Esquerdo (Deep Royal Blue & Sapphire) */}
                <div 
                    className="absolute top-0 left-[-20%] w-[45vw] h-[120vh] -skew-x-[20deg] origin-top border-r border-white/[0.03] pointer-events-none z-0 overflow-hidden mix-blend-screen"
                    style={{
                        background: 'linear-gradient(135deg, rgba(29,78,216,0.06) 0%, #010307 100%)'
                    }}
                >
                    {/* Glow Interno Azul Real & Ciano Premium */}
                    <div 
                        className="absolute top-[-10%] left-[-10%] w-[120%] h-[75%] rounded-full blur-[100px] animate-liquid-fast-1"
                        style={{
                            background: 'radial-gradient(circle, rgba(37,99,235,0.35) 0%, rgba(6,182,212,0.12) 60%, transparent 100%)'
                        }}
                    />
                </div>

                {/* COLUNA 2: Centro-Esquerda (Brilho Ciano Elétrico / Cyan Glow) */}
                <div 
                    className="absolute top-0 left-[22%] w-[30vw] h-[120vh] origin-top border-r border-white/[0.04] pointer-events-none z-0 shadow-[-20px_0_40px_rgba(0,0,0,0.85)] overflow-hidden mix-blend-screen animate-col-slide-hyper-1"
                    style={{
                        background: 'linear-gradient(135deg, rgba(6,182,212,0.08) 0%, #010408 100%)'
                    }}
                >
                    {/* Glow Principal Ciano muito vibrante e vivo */}
                    <div 
                        className="absolute top-[10%] left-[-20%] w-[140%] h-[65%] rounded-full blur-[110px] animate-liquid-fast-2"
                        style={{
                            background: 'radial-gradient(circle, rgba(6,182,212,0.60) 0%, rgba(59,130,246,0.30) 45%, transparent 100%)'
                        }}
                    />
                </div>

                {/* COLUNA 3: Centro-Direita (Glow Azul Royal Elétrico / Electric Blue) */}
                <div 
                    className="absolute top-0 left-[48%] w-[28vw] h-[120vh] origin-top border-r border-white/[0.05] border-l border-white/[0.02] pointer-events-none z-0 shadow-[-25px_0_50px_rgba(0,0,0,0.9)] overflow-hidden mix-blend-screen animate-col-slide-hyper-2"
                    style={{
                        background: 'linear-gradient(135deg, rgba(0,102,255,0.08) 0%, #010307 100%)'
                    }}
                >
                    {/* Glow Azul Royal de Alta Intensidade e Vivacidade */}
                    <div 
                        className="absolute top-[20%] left-[-15%] w-[130%] h-[60%] rounded-full blur-[90px] animate-liquid-fast-3"
                        style={{
                            background: 'radial-gradient(circle, rgba(0,102,255,0.65) 0%, rgba(56,189,248,0.20) 50%, transparent 100%)'
                        }}
                    />
                </div>

                {/* COLUNA 4: Extremo Direito (Glow Deep Cobalt & Sky Blue) */}
                {/* Esta coluna carrega a nossa linha de corte super iluminada em Cyan e o glow azul principal */}
                <div 
                    className="absolute top-0 left-[72%] w-[40vw] h-[120vh] border-l border-accent-cyan/50 origin-top pointer-events-none z-0 shadow-[-25px_0_80px_rgba(0,0,0,0.95),-8px_0_40px_rgba(12,242,205,0.45)] overflow-hidden animate-col-slide-hyper-3"
                    style={{
                        background: 'linear-gradient(135deg, rgba(29,78,216,0.08) 0%, #010307 100%)'
                    }}
                >
                    {/* Glow Interno no Separador para destacar a borda diagonal com brilho ciano */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(6,182,212,0.12),transparent_50%)] pointer-events-none" />

                    {/* LADO DIREITO (Dentro da fatia diagonal): Glow Azul/Ciano Tech super vivo */}
                    <div className="absolute inset-0 skew-x-[20deg] origin-top mix-blend-screen">
                        <div 
                            className="absolute top-[-5%] right-[-10%] w-[115%] h-[80%] rounded-full blur-[100px] sm:blur-[130px] opacity-100 animate-liquid-fast-1"
                            style={{
                                background: 'radial-gradient(circle, rgba(30,64,175,0.55) 0%, rgba(56,189,248,0.25) 45%, rgba(0,0,0,0) 80%)'
                            }}
                        />
                    </div>
                </div>
                {/* Sutil malha de pontos para adicionar textura tech premium sobre toda a tela */}
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:40px_40px] pointer-events-none z-0 mix-blend-overlay" />
            </div>

            {/* ── MOBILE AURORA BACKGROUND ──────────────────────────────────────────
                Controlado por CSS (lg:hidden) — garante que aparece em mobile
                independente da detecção JS de isMobile. FIXED FOR ENTIRE PAGE.
                ─────────────────────────────────────────────────────────────────── */}
            <div className="lg:hidden fixed inset-0 pointer-events-none z-[1] bg-[#010307]">

                {/* Orb 1 — Cyan/Blue grande · topo-esquerda · 7s */}
                <div style={{
                    position: 'absolute',
                    width: '340px', height: '340px',
                    top: '-100px', left: '-80px',
                    borderRadius: '50%',
                    willChange: 'transform, opacity',
                    background: 'radial-gradient(circle, rgba(6,182,212,0.60) 0%, rgba(29,78,216,0.28) 42%, transparent 70%)',
                    animation: 'mobile-aurora-1 7s ease-in-out infinite',
                }} />

                {/* Orb 2 — Amber/Orange · direita-centro · 9s */}
                <div style={{
                    position: 'absolute',
                    width: '280px', height: '280px',
                    top: '25%', right: '-80px',
                    borderRadius: '50%',
                    willChange: 'transform, opacity',
                    background: 'radial-gradient(circle, rgba(255,167,81,0.58) 0%, rgba(255,226,89,0.22) 45%, transparent 70%)',
                    animation: 'mobile-aurora-2 9s ease-in-out infinite',
                }} />

                {/* Orb 3 — Purple · esquerda-baixo · 11s */}
                <div style={{
                    position: 'absolute',
                    width: '300px', height: '300px',
                    top: '48%', left: '-100px',
                    borderRadius: '50%',
                    willChange: 'transform, opacity',
                    background: 'radial-gradient(circle, rgba(168,85,247,0.55) 0%, rgba(139,92,246,0.20) 45%, transparent 70%)',
                    animation: 'mobile-aurora-3 11s ease-in-out infinite',
                }} />

                {/* Orb 4 — Cyan puro · topo-direita · 13s */}
                <div style={{
                    position: 'absolute',
                    width: '220px', height: '220px',
                    top: '5%', right: '-40px',
                    borderRadius: '50%',
                    willChange: 'transform, opacity',
                    background: 'radial-gradient(circle, rgba(12,242,205,0.50) 0%, rgba(6,182,212,0.18) 47%, transparent 72%)',
                    animation: 'mobile-aurora-4 13s ease-in-out infinite',
                }} />

                {/* Malha de pontos sutil — textura tech, estática, sem custo */}
                <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: 'radial-gradient(rgba(255,255,255,0.030) 1px, transparent 1px)',
                    backgroundSize: '30px 30px',
                }} />
            </div>

            {/* ── HERO WRAPPER (Restringe o conteúdo do Hero) ── */}
            <div className="relative overflow-hidden w-full">



            {/* ── HERO SECTION (Centered & Premium Editorial) ────────────────── */}
            <header className="relative pt-20 pb-4 sm:pt-24 sm:pb-6 flex flex-col items-center justify-center z-10 w-full">
                <div className="max-w-5xl mx-auto px-6 w-full flex flex-col items-center text-center">
                    
                    {/* Elementos Centrais de Texto */}
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col items-center w-full"
                    >
                        {/* Elegant Minimal Badge */}
                        <motion.div 
                            variants={itemVariants}
                            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border-glass bg-white/[0.02] text-text-muted text-xs sm:text-sm font-medium mb-4 backdrop-blur-md animate-pulse"
                        >
                            <Sparkle className="w-3.5 h-3.5 text-accent-cyan" />
                            <span>✨ +2.000 pessoas no controle da própria rotina</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan/40" />
                        </motion.div>

                        {/* Centered Editorial Headline (Jakarta + Instrument Serif Contrast) */}
                        <motion.h1 
                            variants={itemVariants}
                            className="font-body-jakarta font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.15] mb-4 max-w-4xl premium-text-shadow"
                        >
                            A única ferramenta que você precisa <br className="hidden sm:block" /> para organizar{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffe259] to-[#ffa751]">
                                sua vida inteira.
                            </span>
                        </motion.h1>

                        {/* Premium Editorial Subheadline */}
                        <motion.p 
                            variants={itemVariants}
                            className="text-text-muted text-sm sm:text-base lg:text-lg font-normal leading-relaxed max-w-2xl mb-6 premium-subtext-shadow"
                        >
                            Do Caos à Ordem. Organize sua agenda, finanças, hábitos e tarefas em um só lugar, de forma simples e dinâmica.
                        </motion.p>

                        {/* Centered CTAs */}
                        <motion.div 
                            variants={itemVariants}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-6"
                        >
                            <a 
                                href="#precos" 
                                className="inline-flex items-center justify-center gap-2 bg-white text-bg-space font-semibold text-sm py-3.5 px-8 rounded-full shadow-[0_4px_25px_rgba(255,255,255,0.15)] hover:bg-slate-100 hover:scale-[1.02] active:scale-100 transition-all duration-300 w-full sm:w-auto cursor-pointer"
                            >
                                Usar agora
                                <ArrowRight className="w-4 h-4 text-bg-space" />
                            </a>
                        </motion.div>

                        {/* Trust Assurances below CTAs */}
                        <motion.div 
                            variants={itemVariants}
                            className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-text-muted"
                        >
                            <span className="flex items-center gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-accent-cyan" /> Garantia de Satisfação
                            </span>
                            <span className="hidden sm:inline opacity-30">•</span>
                            <span className="flex items-center gap-1.5">
                                <Shield className="w-3.5 h-3.5 text-accent-cyan" /> Computador e Celulares
                            </span>
                            <span className="hidden sm:inline opacity-30">•</span>
                            <span className="flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5 text-accent-cyan" /> 5 minutos de configuração
                            </span>
                        </motion.div>

                    </motion.div>

                    {/* GRAND CENTERPIECE DEVICE (Product-as-the-Demo Showcase) */}
                    <motion.div 
                        initial={{ opacity: 0, y: 50, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ type: "spring", stiffness: 70, damping: 22, delay: 0.45 }}
                        className="w-full max-w-5xl relative z-10 mt-10 sm:mt-14"
                    >
                        
                        {/* O Console de Dashboard Horizontal (Editorial & Clean) */}
                        <div className="w-full bg-[#010307]/60 backdrop-blur-3xl border border-white/[0.08] rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-500 hover:border-white/[0.15]">
                            
                            {/* Top Bar da Janela (Browser Mockup Style) */}
                            <div className="flex items-center px-5 py-3.5 border-b border-white/[0.06] bg-white/[0.02]">
                                <div className="flex gap-2 flex-shrink-0">
                                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                                </div>
                                <div className="grow mx-4 text-center px-5 py-1.5 rounded-full bg-[#010307]/50 border border-white/[0.08] text-xs text-text-muted select-none whitespace-nowrap">
                                    app.controle-c.com.br
                                </div>
                                <div className="w-[52px] flex-shrink-0" />
                            </div>

                            {/* Conteúdo do Console Integrado */}
                            <div className="w-full aspect-video bg-[#010307]/30 relative overflow-hidden flex items-center justify-center">
                                {/* Glow interno sutil */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-accent-cyan/5 to-transparent pointer-events-none" />

                                {isMobile ? (
                                    /* ── MOBILE: Vídeo único com capa e play manual/automático ao interagir/scrollar ── */
                                    <div className="relative w-full h-full flex items-center justify-center bg-[#010307]">
                                        <video
                                            ref={mobileVideoRef}
                                            src="/demo%20lp.mp4"
                                            muted
                                            loop
                                            playsInline
                                            preload="metadata"
                                            onPlay={() => setMobileVideoPlaying(true)}
                                            onPause={() => setMobileVideoPlaying(false)}
                                            className={`w-full h-full object-contain transition-opacity duration-300 ${mobileVideoPlaying ? 'opacity-100' : 'opacity-50'}`}
                                        />
                                        {!mobileVideoPlaying && (
                                            <>
                                                {/* Gradiente sutil por cima */}
                                                <div className="absolute inset-0 bg-gradient-to-br from-[#010307]/50 via-transparent to-[#010307]/50 pointer-events-none" />
                                                {/* Botão de Play */}
                                                <button
                                                    onClick={() => {
                                                        if (mobileVideoRef.current) {
                                                            mobileVideoRef.current.play();
                                                        }
                                                    }}
                                                    className="absolute z-10 flex items-center justify-center w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 text-white backdrop-blur-md transition-all active:scale-95 cursor-pointer shadow-2xl"
                                                    aria-label="Reproduzir demonstração"
                                                >
                                                    <Play className="w-6 h-6 fill-white ml-0.5" />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                ) : (
                                    /* ── DESKTOP: vídeo completo com autoPlay ── */
                                    <motion.video
                                        key="demo-lp"
                                        initial={{ opacity: 0, scale: 0.99 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.99 }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                        src="/demo%20lp.mp4"
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        preload="auto"
                                        className="w-full h-full object-contain"
                                    />
                                )}

                                {/* Sutil overlay de reflexo de vidro */}
                                <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/0 via-white/[0.02] to-white/[0.06]" />
                            </div>
                        </div>

                    </motion.div>

                </div>
            </header>
            
            </div>

            {/* ── TIMELINE SECTION: COMO O CONTROLE-C RESOLVE SUA VIDA ── */}
            <section ref={timelineRef} id="funcionamento" className="relative py-28 z-10 w-full max-w-5xl mx-auto px-6">
                
                {/* Header da Seção */}
                <div className="text-center mb-20 flex flex-col items-center">
                    <motion.div 
                        initial={{ opacity: 0, y: 15, scale: 0.97, ...fb(12) }}
                        whileInView={{ opacity: 1, y: 0, scale: 1, ...fb(0) }}
                        viewport={vp("-180px 0px -100px 0px")}
                        transition={{ type: "spring", stiffness: 15, damping: 13, mass: 1.4 }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] text-xs font-semibold uppercase tracking-wider text-[#ffa751] mb-4 backdrop-blur-md"
                    >
                        <Sparkle className="w-3.5 h-3.5 text-[#ffa751]" />
                        <span>Funcionamento</span>
                    </motion.div>
                    
                    <motion.h2 
                        initial={{ opacity: 0, y: 15, scale: 0.98, ...fb(15) }}
                        whileInView={{ opacity: 1, y: 0, scale: 1, ...fb(0) }}
                        viewport={vp("-180px 0px -100px 0px")}
                        transition={{ type: "spring", stiffness: 15, damping: 13, mass: 1.4, delay: 0.15 }}
                        className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4 max-w-2xl premium-text-shadow"
                    >
                        Como o Controle-C resolve sua vida
                    </motion.h2>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 12, scale: 0.99, ...fb(10) }}
                        whileInView={{ opacity: 1, y: 0, scale: 1, ...fb(0) }}
                        viewport={vp("-180px 0px -100px 0px")}
                        transition={{ type: "spring", stiffness: 15, damping: 13, mass: 1.4, delay: 0.3 }}
                        className="text-text-muted text-sm sm:text-base max-w-xl leading-relaxed"
                    >
                        Entenda todas as funcionalidades. A ferramenta foi pensada para resolver e organizar todas as suas questões pessoais em um só lugar.
                    </motion.p>
                </div>

                {/* Grid da Linha do Tempo */}
                <div className="relative w-full">
                    
                    {/* Linha Fina de Fundo (Rail) */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/[0.05] -translate-x-[1px]" />
                    
                    {/* Linha Ativa com Crescimento via Scroll */}
                    <motion.div 
                        className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#ffe259] via-[#ffa751] to-[#00f0ff] origin-top -translate-x-[1px]"
                        style={{ scaleY }}
                    />

                    {/* Espaçador superior da linha do tempo */}
                    <div className="h-6" />

                    {/* Card 1: Finanças */}
                    <div className="relative flex flex-col md:flex-row items-start md:justify-between mb-24 w-full pl-12 md:pl-0">
                        {/* Ponto de Junção no Trilho */}
                        <motion.div 
                            initial={{ scale: 0.7, borderColor: "rgba(255,255,255,0.1)", boxShadow: "0 0 0px rgba(0,0,0,0)" }}
                            whileInView={{ scale: 1.1, borderColor: "#ffa751", boxShadow: "0 0 15px rgba(250,167,81,0.4)" }}
                            viewport={vp("-180px 0px -100px 0px")}
                            transition={{ type: "spring", stiffness: 100, damping: 15 }}
                            className="absolute left-[3px] md:left-1/2 top-4 md:-translate-x-1/2 w-6 h-6 rounded-full bg-[#010307] border-2 flex items-center justify-center z-20"
                        >
                            <motion.span 
                                initial={{ scale: 0, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={vp("-180px 0px -100px 0px")}
                                className="w-2 h-2 rounded-full bg-[#ffa751]" 
                            />
                        </motion.div>
                        
                        {/* Card Lado Esquerdo */}
                        <motion.div 
                            initial={{ opacity: 0, y: 15, scale: 0.98, ...fb(15) }}
                            whileInView={{ opacity: 1, y: 0, scale: 1, ...fb(0) }}
                            viewport={vp("-180px 0px -100px 0px")}
                            transition={{ type: "spring", stiffness: 15, damping: 13, mass: 1.4 }}
                            className="w-full md:w-[45%] bg-[#010307]/50 backdrop-blur-xl border border-white/[0.08] hover:border-[#ffa751]/30 hover:shadow-[0_0_30px_rgba(250,167,81,0.06)] rounded-2xl p-6 transition-all duration-500 text-left"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-[#ffa751]/10 border border-[#ffa751]/20 flex items-center justify-center text-[#ffa751]">
                                    <DollarSign className="w-5 h-5" />
                                </div>
                                <h3 className="text-xl font-bold text-white">Controle Financeiro na Palma da Mão</h3>
                            </div>
                            <p className="text-text-muted text-sm leading-relaxed mb-6">
                                Registre despesas e receitas em qualquer forma de pagamento e planeje gastos para até 24 meses. Crie lembretes recorrentes, exporte extratos em PDF e acompanhe tudo em gráficos.
                            </p>
                            
                            {/* Micro-Interface Interativa de Finanças */}
                            <div className="bg-[#010307]/60 border border-white/[0.06] rounded-xl p-4 space-y-4">
                                <div className="flex items-center justify-between text-xs text-text-dimmed pb-2 border-b border-white/[0.04]">
                                    <span>Transações Recentes</span>
                                    <span className="text-[#ffa751] text-[9px] font-bold tracking-wide uppercase animate-pulse">● Live Sync</span>
                                </div>
                                
                                {/* 3 transações */}
                                <div className="space-y-2 select-none">
                                    <div className="flex items-center justify-between p-2 rounded bg-white/[0.01] border border-white/[0.02] hover:bg-white/[0.03] transition-colors">
                                        <div className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-rose-500" />
                                            <div className="text-left">
                                                <p className="text-white text-xs font-bold font-body-jakarta">Jantar / Uber Eats</p>
                                                <p className="text-[9px] text-text-dimmed font-body-jakarta">Alimentação · Débito</p>
                                            </div>
                                        </div>
                                        <span className="text-rose-400 text-xs font-mono font-bold">- R$ 89,90</span>
                                    </div>
                                    <div className="flex items-center justify-between p-2 rounded bg-white/[0.01] border border-white/[0.02] hover:bg-white/[0.03] transition-colors">
                                        <div className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-rose-500" />
                                            <div className="text-left">
                                                <p className="text-white text-xs font-bold font-body-jakarta">Assinatura Netflix</p>
                                                <p className="text-[9px] text-text-dimmed font-body-jakarta">Serviços · Crédito</p>
                                            </div>
                                        </div>
                                        <span className="text-rose-400 text-xs font-mono font-bold">- R$ 55,90</span>
                                    </div>
                                    <div className="flex items-center justify-between p-2 rounded bg-white/[0.01] border border-white/[0.02] hover:bg-white/[0.03] transition-colors">
                                        <div className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                            <div className="text-left">
                                                <p className="text-white text-xs font-bold font-body-jakarta">Pix Recebido</p>
                                                <p className="text-[9px] text-text-dimmed font-body-jakarta">Receita · Conta Corrente</p>
                                            </div>
                                        </div>
                                        <span className="text-emerald-400 text-xs font-mono font-bold">+ R$ 1.200,00</span>
                                    </div>
                                </div>

                                {/* Gráfico Simples */}
                                <div className="pt-2 select-none">
                                    <p className="text-[10px] text-text-dimmed mb-3 text-left font-body-jakarta">Evolução do Saldo (Últimos Dias)</p>
                                    <div className="p-3 bg-white/[0.01] border border-white/[0.04] rounded-lg">
                                        <svg className="w-full h-16 overflow-visible" viewBox="0 0 300 60">
                                            <defs>
                                                <linearGradient id="balance-glow" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="0%" stopColor="#ffa751" stopOpacity="0.25" />
                                                    <stop offset="100%" stopColor="#ffa751" stopOpacity="0.0" />
                                                </linearGradient>
                                            </defs>
                                            
                                            {/* Area fill */}
                                            <path 
                                                d="M 10 50 L 70 42 L 130 48 L 190 20 L 250 28 L 290 32 L 290 60 L 10 60 Z" 
                                                fill="url(#balance-glow)" 
                                            />
                                            
                                            {/* Line */}
                                            <motion.path 
                                                d="M 10 50 L 70 42 L 130 48 L 190 20 L 250 28 L 290 32" 
                                                fill="none" 
                                                stroke="#ffa751" 
                                                strokeWidth="2" 
                                                strokeLinecap="round"
                                                initial={{ pathLength: 0 }}
                                                whileInView={{ pathLength: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1.2, ease: "easeOut" }}
                                            />
                                            
                                            {/* Grid dots */}
                                            <circle cx="10" cy="50" r="3" fill="#010307" stroke="#ffa751" strokeWidth="1.5" />
                                            <circle cx="70" cy="42" r="3" fill="#010307" stroke="#ffa751" strokeWidth="1.5" />
                                            <circle cx="130" cy="48" r="3" fill="#010307" stroke="#ffa751" strokeWidth="1.5" />
                                            <circle cx="190" cy="20" r="3" fill="#010307" stroke="#ffa751" strokeWidth="1.5" />
                                            <circle cx="250" cy="28" r="3" fill="#010307" stroke="#ffa751" strokeWidth="1.5" />
                                            <circle cx="290" cy="32" r="3" fill="#010307" stroke="#ffa751" strokeWidth="1.5" />
                                        </svg>
                                        <div className="flex justify-between text-[8px] text-text-muted font-bold px-1 pt-2 font-mono">
                                            <span>28 Mai</span>
                                            <span>29 Mai</span>
                                            <span>30 Mai</span>
                                            <span>31 Mai</span>
                                            <span>Hoje</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                        
                        {/* Lado Direito Invisível no Desktop (Para balancear a estrutura alternada) */}
                        <div className="hidden md:block w-[45%]" />
                    </div>

                    {/* Card 2: Agenda */}
                    <div className="relative flex flex-col md:flex-row-reverse items-start md:justify-between mb-24 w-full pl-12 md:pl-0">
                        {/* Ponto de Junção no Trilho */}
                        <motion.div 
                            initial={{ scale: 0.7, borderColor: "rgba(255,255,255,0.1)", boxShadow: "0 0 0px rgba(0,0,0,0)" }}
                            whileInView={{ scale: 1.1, borderColor: "#00f0ff", boxShadow: "0 0 15px rgba(0,240,255,0.4)" }}
                            viewport={vp("-180px 0px -100px 0px")}
                            transition={{ type: "spring", stiffness: 100, damping: 15 }}
                            className="absolute left-[3px] md:left-1/2 top-4 md:-translate-x-1/2 w-6 h-6 rounded-full bg-[#010307] border-2 flex items-center justify-center z-20"
                        >
                            <motion.span 
                                initial={{ scale: 0, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={vp("-180px 0px -100px 0px")}
                                className="w-2 h-2 rounded-full bg-[#00f0ff]" 
                            />
                        </motion.div>
                        
                        {/* Card Lado Direito */}
                        <motion.div 
                            initial={{ opacity: 0, y: 15, scale: 0.98, ...fb(15) }}
                            whileInView={{ opacity: 1, y: 0, scale: 1, ...fb(0) }}
                            viewport={vp("-180px 0px -100px 0px")}
                            transition={{ type: "spring", stiffness: 15, damping: 13, mass: 1.4 }}
                            className="w-full md:w-[45%] bg-[#010307]/50 backdrop-blur-xl border border-white/[0.08] hover:border-[#00f0ff]/30 hover:shadow-[0_0_30px_rgba(0,240,255,0.06)] rounded-2xl p-6 transition-all duration-500 text-left"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-[#00f0ff]/10 border border-[#00f0ff]/20 flex items-center justify-center text-[#00f0ff]">
                                    <Calendar className="w-5 h-5" />
                                </div>
                                <h3 className="text-xl font-bold text-white">Sua Agenda Integrada</h3>
                            </div>
                            <p className="text-text-muted text-sm leading-relaxed mb-6">
                                Conecte sua agenda ao Google Agenda e tenha sincronização em tempo real. Crie e gerencie todos os seus compromissos através do Controle-C.
                            </p>
                            
                            {/* Micro-Interface Interativa de Agenda */}
                            <div className="bg-[#010307]/60 border border-white/[0.06] rounded-xl p-4">
                                <div className="flex items-center justify-between gap-3 text-xs text-text-dimmed mb-6 border-b border-white/[0.05] pb-4">
                                    <span className="text-xs text-white font-bold uppercase tracking-wider select-none font-body-jakarta">
                                        Seus Compromissos
                                    </span>
                                    <button className="px-3 py-1 rounded bg-[#3b82f6] text-white hover:bg-[#2563eb] text-[10px] font-bold shadow-[0_0_10px_rgba(59,130,246,0.3)] transition-all">
                                        + Novo Agendamento
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {/* Dia 1 */}
                                    <div>
                                        <div className="text-[#8b5cf6] text-[10px] font-extrabold uppercase tracking-wider mb-2 text-center select-none font-body-jakarta">
                                            Terça-Feira, 2 De Junho De 2026
                                        </div>
                                        <div className="relative flex items-center p-2.5 rounded-xl bg-[#090e1a]/80 border border-white/[0.05]">
                                            <div className="flex flex-col items-center justify-center bg-[#131d35] border border-white/[0.05] rounded-lg px-2.5 py-1 min-w-[50px]">
                                                <Clock className="w-3.5 h-3.5 text-white/70 mb-0.5" />
                                                <span className="text-white font-mono text-[9px] font-bold">13:00</span>
                                            </div>
                                            <div className="ml-3 text-left">
                                                <p className="text-white/80 text-xs font-semibold font-body-jakarta">Reunião com Guilherme</p>
                                            </div>
                                            <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-slate-500" />
                                        </div>
                                    </div>

                                    {/* Dia 2 */}
                                    <div>
                                        <div className="text-[#8b5cf6] text-[10px] font-extrabold uppercase tracking-wider mb-2 text-center select-none font-body-jakarta">
                                            Quarta-Feira, 3 De Junho De 2026
                                        </div>
                                        <motion.div 
                                            whileHover={{ scale: 1.01 }}
                                            className="relative flex items-center p-2.5 rounded-xl bg-[#090e1a]/80 border border-white/[0.05] border-l-2 border-l-accent-cyan cursor-pointer transition-all shadow-[0_0_15px_rgba(12,242,205,0.02)]"
                                        >
                                            <div className="flex flex-col items-center justify-center bg-[#131d35] border border-white/[0.05] rounded-lg px-2.5 py-1 min-w-[50px]">
                                                <Clock className="w-3.5 h-3.5 text-accent-cyan mb-0.5" />
                                                <span className="text-white font-mono text-[9px] font-bold">14:00</span>
                                            </div>
                                            <div className="ml-3 text-left">
                                                <p className="text-white text-xs font-bold font-body-jakarta">Reunião Marketing</p>
                                            </div>
                                            <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                        
                        {/* Lado Esquerdo Invisível no Desktop */}
                        <div className="hidden md:block w-[45%]" />
                    </div>

                    {/* Card 3: Projetos */}
                    <div className="relative flex flex-col md:flex-row items-start md:justify-between mb-24 w-full pl-12 md:pl-0">
                        {/* Ponto de Junção no Trilho */}
                        <motion.div 
                            initial={{ scale: 0.7, borderColor: "rgba(255,255,255,0.1)", boxShadow: "0 0 0px rgba(0,0,0,0)" }}
                            whileInView={{ scale: 1.1, borderColor: "#a855f7", boxShadow: "0 0 15px rgba(168,85,247,0.4)" }}
                            viewport={vp("-180px 0px -100px 0px")}
                            transition={{ type: "spring", stiffness: 100, damping: 15 }}
                            className="absolute left-[3px] md:left-1/2 top-4 md:-translate-x-1/2 w-6 h-6 rounded-full bg-[#010307] border-2 flex items-center justify-center z-20"
                        >
                            <motion.span 
                                initial={{ scale: 0, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={vp("-180px 0px -100px 0px")}
                                className="w-2 h-2 rounded-full bg-[#a855f7]" 
                            />
                        </motion.div>
                        
                        {/* Card Lado Esquerdo */}
                        <motion.div 
                            initial={{ opacity: 0, y: 15, scale: 0.98, ...fb(15) }}
                            whileInView={{ opacity: 1, y: 0, scale: 1, ...fb(0) }}
                            viewport={vp("-180px 0px -100px 0px")}
                            transition={{ type: "spring", stiffness: 15, damping: 13, mass: 1.4 }}
                            className="w-full md:w-[45%] bg-[#010307]/50 backdrop-blur-xl border border-white/[0.08] hover:border-[#a855f7]/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.06)] rounded-2xl p-6 transition-all duration-500 text-left"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-[#a855f7]/10 border border-[#a855f7]/20 flex items-center justify-center text-[#a855f7]">
                                    <Sparkles className="w-5 h-5" />
                                </div>
                                <h3 className="text-xl font-bold text-white">Crie Tarefas por Projetos da sua Vida</h3>
                            </div>
                            <p className="text-text-muted text-sm leading-relaxed mb-6">
                                No Controle-C, você pode criar vários projetos simultaneamente, cada um com suas tarefas específicas e prazos definidos para a realização de cada atividade.
                            </p>
                            
                            {/* Micro-Interface Interativa de Tarefas */}
                            <div className="bg-[#010307]/60 border border-white/[0.06] rounded-xl p-4">
                                <div className="flex items-center justify-between text-xs text-text-dimmed mb-4 border-b border-white/[0.04] pb-2">
                                    <span>Lista de Tarefas por Projeto</span>
                                    <span className="text-[10px] text-[#a855f7]">Clique para concluir</span>
                                </div>
                                <div className="space-y-3 select-none">
                                    {tasks.map((task) => (
                                        <div 
                                            key={task.id}
                                            onClick={() => toggleTask(task.id)}
                                            className="flex flex-col gap-2 p-3 rounded-xl bg-white/[0.01] hover:bg-white/[0.03] border border-white/[0.02] hover:border-white/[0.06] cursor-pointer transition-all duration-300 group"
                                        >
                                            {/* Tag do Projeto e Checkbox */}
                                            <div className="flex items-center justify-between">
                                                <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full border ${task.color} select-none`}>
                                                    Projeto: {task.project}
                                                </span>
                                                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${task.completed ? 'bg-[#a855f7] border-[#a855f7]' : 'border-white/20 group-hover:border-[#a855f7]'}`}>
                                                    {task.completed && <CheckCircle2 className="w-3 h-3 text-white" />}
                                                </div>
                                            </div>
                                            {/* Texto da Tarefa */}
                                            <span className={`text-xs font-bold font-body-jakarta transition-all ${task.completed ? 'line-through text-text-dimmed opacity-60' : 'text-white'}`}>
                                                {task.text}
                                            </span>
                                            {/* Prazo */}
                                            <div className="flex items-center gap-1.5 text-[9px] text-text-dimmed font-body-jakarta">
                                                <Calendar className="w-3.5 h-3.5 opacity-60" />
                                                <span>Prazo: {task.deadline}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                        
                        {/* Lado Direito Invisível no Desktop */}
                        <div className="hidden md:block w-[45%]" />
                    </div>

                    {/* Card 4: Hábitos */}
                    <div className="relative flex flex-col md:flex-row-reverse items-start md:justify-between mb-16 w-full pl-12 md:pl-0">
                        {/* Ponto de Junção no Trilho */}
                        <motion.div 
                            initial={{ scale: 0.7, borderColor: "rgba(255,255,255,0.1)", boxShadow: "0 0 0px rgba(0,0,0,0)" }}
                            whileInView={{ scale: 1.1, borderColor: "#f43f5e", boxShadow: "0 0 15px rgba(244,63,94,0.4)" }}
                            viewport={vp("-180px 0px -100px 0px")}
                            transition={{ type: "spring", stiffness: 100, damping: 15 }}
                            className="absolute left-[3px] md:left-1/2 top-4 md:-translate-x-1/2 w-6 h-6 rounded-full bg-[#010307] border-2 flex items-center justify-center z-20"
                        >
                            <motion.span 
                                initial={{ scale: 0, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={vp("-180px 0px -100px 0px")}
                                className="w-2 h-2 rounded-full bg-[#f43f5e]" 
                            />
                        </motion.div>
                        
                        {/* Card Lado Direito */}
                        <motion.div 
                            initial={{ opacity: 0, y: 15, scale: 0.98, ...fb(15) }}
                            whileInView={{ opacity: 1, y: 0, scale: 1, ...fb(0) }}
                            viewport={vp("-180px 0px -100px 0px")}
                            transition={{ type: "spring", stiffness: 15, damping: 13, mass: 1.4 }}
                            className="w-full md:w-[45%] bg-[#010307]/50 backdrop-blur-xl border border-white/[0.08] hover:border-[#f43f5e]/30 hover:shadow-[0_0_30px_rgba(244,63,94,0.06)] rounded-2xl p-6 transition-all duration-500 text-left"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-[#f43f5e]/10 border border-[#f43f5e]/20 flex items-center justify-center text-[#f43f5e]">
                                    <Flame className="w-5 h-5 animate-pulse" />
                                </div>
                                <h3 className="text-xl font-bold text-white">Gamifique seus Hábitos</h3>
                            </div>
                            <p className="text-text-muted text-sm leading-relaxed mb-6">
                                Acompanhe sua disciplina diária. Registre e cumpra seus hábitos no Controle-C. Gamifique sua performance, evolua e acompanhe seu histórico semanal e mensal.
                            </p>
                            
                            {/* Micro-Interface Interativa de Hábitos */}
                            <div className="bg-[#0b1329] border border-white/[0.08] rounded-2xl p-5 shadow-2xl relative select-none">
                                {/* Botão Fechar X no canto superior direito */}
                                <button className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors">
                                    <X className="w-4 h-4" />
                                </button>

                                {/* Cabeçalho do Hábito (Academia) */}
                                <div className="flex items-center gap-3">
                                    {/* Ícone com Sparkles e Ponto de Status */}
                                    <div className="relative w-12 h-12 rounded-2xl bg-[#111e38] border border-white/[0.08] flex items-center justify-center text-[#ffa751]">
                                        {/* Ponto Ciano Piscante / Brilhante */}
                                        <span className="absolute -top-1 -left-1 w-2.5 h-2.5 rounded-full bg-[#00c286] shadow-[0_0_8px_#00c286] border border-[#0b1329]" />
                                        <Sparkles className="w-6 h-6 text-[#ffa751]" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-white leading-tight">Academia</h4>
                                        <p className="text-xs text-text-dimmed mt-0.5 font-medium">Desde 04/05/2026</p>
                                    </div>
                                </div>

                                {/* Seletor de Abas (Vista Semanal / Vista Mensal) */}
                                <div className="flex bg-[#070d1e] rounded-xl p-1 mt-5 mb-5 border border-white/[0.04]">
                                    <button 
                                        type="button"
                                        onClick={() => setActiveHabitTab("semanal")}
                                        className={`flex-1 py-2 text-center text-xs font-semibold rounded-lg transition-all duration-300 ${activeHabitTab === "semanal" ? 'bg-[#00c286] text-white shadow-[0_4px_12px_rgba(0,194,134,0.15)] font-bold' : 'text-text-muted hover:text-white'}`}
                                    >
                                        Vista Semanal
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={() => setActiveHabitTab("mensal")}
                                        className={`flex-1 py-2 text-center text-xs font-semibold rounded-lg transition-all duration-300 ${activeHabitTab === "mensal" ? 'bg-[#00c286] text-white shadow-[0_4px_12px_rgba(0,194,134,0.15)] font-bold' : 'text-text-muted hover:text-white'}`}
                                    >
                                        Vista Mensal
                                    </button>
                                </div>

                                {/* Conteúdo Conforme Aba Ativa */}
                                <AnimatePresence mode="wait">
                                    {activeHabitTab === "semanal" ? (
                                        <motion.div 
                                            key="semanal"
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -5 }}
                                            transition={{ duration: 0.2 }}
                                            className="grid grid-cols-7 gap-2"
                                        >
                                            {habitDays.map((h) => (
                                                <div 
                                                    key={h.id}
                                                    onClick={() => toggleHabitDay(h.id)}
                                                    className="flex flex-col items-center gap-1.5 cursor-pointer group"
                                                >
                                                    <span className="text-[10px] font-bold text-text-dimmed group-hover:text-white transition-colors">{h.label}</span>
                                                    <motion.div 
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        className={`w-full aspect-square rounded-xl flex items-center justify-center text-sm font-bold transition-all border ${
                                                            h.completed 
                                                                ? 'bg-[#00c286] border-[#00c286] text-[#07120e] shadow-[0_0_12px_rgba(0,194,134,0.25)]' 
                                                                : h.isToday 
                                                                    ? 'border-white bg-[#0e172c] text-white' 
                                                                    : 'bg-[#0d1527] border-white/[0.04] text-text-dimmed hover:border-white/10'
                                                        }`}
                                                    >
                                                        {h.number}
                                                    </motion.div>
                                                </div>
                                            ))}
                                        </motion.div>
                                    ) : (
                                        <motion.div 
                                            key="mensal"
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -5 }}
                                            transition={{ duration: 0.2 }}
                                            className="grid grid-cols-7 gap-1.5 max-h-[140px] overflow-y-auto pr-0.5"
                                        >
                                            {[...Array(30)].map((_, index) => {
                                                const dayNum = index + 1;
                                                const isCompleted = dayNum <= 15;
                                                const isCurrent = dayNum === 16;
                                                return (
                                                    <motion.div
                                                        key={index}
                                                        whileHover={{ scale: 1.05 }}
                                                        className={`aspect-square rounded-lg flex items-center justify-center text-[9px] font-bold transition-all border ${
                                                            isCompleted 
                                                                ? 'bg-[#00c286]/80 border-[#00c286]/20 text-[#07120e] shadow-[0_0_6px_rgba(0,194,134,0.1)]' 
                                                                : isCurrent 
                                                                    ? 'border-white bg-[#0e172c] text-white' 
                                                                    : 'bg-[#0d1527] border-white/[0.04] text-text-dimmed'
                                                        }`}
                                                    >
                                                        {dayNum}
                                                    </motion.div>
                                                );
                                            })}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                        
                        {/* Lado Esquerdo Invisível no Desktop */}
                        <div className="hidden md:block w-[45%]" />
                    </div>

                </div>
            </section>

            {/* ── SEÇÃO: UM DIA COM O CONTROLE-C (DUAL DEVICE MOCKUP) ── */}
            <section className="relative py-28 z-10 w-full max-w-5xl mx-auto px-6 overflow-hidden">
                {/* Header da Seção */}
                <div className="text-center mb-16 flex flex-col items-center">
                    <motion.div 
                        initial={{ opacity: 0, y: 15, scale: 0.97, ...fb(12) }}
                        whileInView={{ opacity: 1, y: 0, scale: 1, ...fb(0) }}
                        viewport={vp("-180px 0px -100px 0px")}
                        transition={{ type: "spring", stiffness: 15, damping: 13, mass: 1.4 }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] text-xs font-semibold uppercase tracking-wider text-[#00f0ff] mb-4 backdrop-blur-md"
                    >
                        <Sparkle className="w-3.5 h-3.5 text-[#00f0ff]" />
                        <span>💻 Desktop & 📱 Mobile</span>
                    </motion.div>
                    
                    <motion.h2 
                        initial={{ opacity: 0, y: 15, scale: 0.98, ...fb(15) }}
                        whileInView={{ opacity: 1, y: 0, scale: 1, ...fb(0) }}
                        viewport={vp("-180px 0px -100px 0px")}
                        transition={{ type: "spring", stiffness: 15, damping: 13, mass: 1.4, delay: 0.15 }}
                        className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4 max-w-2xl premium-text-shadow"
                    >
                        No computador ou no celular. O controle é seu.
                    </motion.h2>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 12, scale: 0.99, ...fb(10) }}
                        whileInView={{ opacity: 1, y: 0, scale: 1, ...fb(0) }}
                        viewport={vp("-180px 0px -100px 0px")}
                        transition={{ type: "spring", stiffness: 15, damping: 13, mass: 1.4, delay: 0.3 }}
                        className="text-text-muted text-sm sm:text-base max-w-2xl leading-relaxed"
                    >
                        Use a tela cheia no computador para planejar sua semana e o celular na rua para atualizar seu processo em tempo real.
                    </motion.p>
                </div>

                {/* Container do Dual Mockup */}
                <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center">
                    
                    {/* Glow de fundo extra para dar profundidade de luz */}
                    <div className="absolute -left-12 top-1/4 w-80 h-80 rounded-full bg-[#00f0ff]/5 blur-[120px] pointer-events-none z-0" />
                    <div className="absolute -right-12 bottom-1/4 w-80 h-80 rounded-full bg-[#ffa751]/5 blur-[120px] pointer-events-none z-0" />

                    {/* MOCKUP DESKTOP (LAPTOP) */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30, ...fb(15), scale: 0.96 }}
                        whileInView={{ opacity: 1, y: 0, ...fb(0), scale: 1 }}
                        viewport={vp("-100px")}
                        transition={{ type: "spring", stiffness: 15, damping: 13, mass: 1.4 }}
                        className="w-full md:w-[88%] mr-auto relative z-10"
                    >
                        {/* Tela do Laptop */}
                        <div className="bg-[#010307] border border-white/[0.08] rounded-t-2xl shadow-2xl p-2 relative overflow-hidden">
                            {/* Barra Superior do Navegador */}
                            <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/[0.05] bg-white/[0.02]">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                                <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                                <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                                
                                {/* URL Bar */}
                                <div className="flex-1 max-w-sm mx-auto flex items-center justify-center h-5 px-3 rounded bg-white/[0.03] border border-white/[0.04] text-[9px] text-text-dimmed tracking-wider">
                                    <span className="opacity-45">controle-c.com.br</span>
                                </div>
                            </div>
                            
                            {/* Conteúdo da Tela */}
                            <div className="aspect-[1.65] w-full bg-[#030712]/98 relative overflow-hidden">
                                <img 
                                    src="/dashboard_desktop.png" 
                                    alt="Controle-C Desktop Dashboard" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        
                        {/* Base Física do Laptop (Chassis) */}
                        <div className="w-[104%] -ml-[2%] h-3 bg-gradient-to-b from-[#1e293b] to-[#0b0f19] rounded-b-xl border-t border-white/[0.15] relative z-20 shadow-[0_15px_30px_rgba(0,0,0,0.8)]" />
                        <div className="w-[30%] mx-auto h-2 bg-[#080b12] rounded-b-lg relative z-30" />
                    </motion.div>

                    {/* MOCKUP MOBILE (SMARTPHONE COM EFEITO 3D ISOMÉTRICO E HOVER DINÂMICO) */}
                    <motion.div 
                        className="absolute right-4 md:-right-8 bottom-[-45px] w-[26%] z-30 hidden md:block"
                        initial={{ y: 40, opacity: 0, rotateY: -18, rotateX: 10, rotateZ: 3 }}
                        whileInView={{ y: 0, opacity: 1, rotateY: -18, rotateX: 10, rotateZ: 3 }}
                        whileHover={{ y: -8, rotateY: -12, rotateX: 8, rotateZ: 1 }}
                        viewport={vp("-100px")}
                        transition={{ type: "spring", stiffness: 25, damping: 15, mass: 1.2 }}
                        style={{
                            transformStyle: 'preserve-3d',
                            perspective: '1500px',
                        }}
                    >
                        {/* Chassi do Telefone (Phone Frame) */}
                        <div className="w-full bg-[#010307] rounded-[38px] border-[5px] border-[#1e293b]/90 p-2 shadow-[-20px_20px_50px_rgba(0,0,0,0.85)] overflow-hidden relative border-t-white/[0.08] border-l-white/[0.08]">
                            
                            {/* Dynamic Island */}
                            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[60px] h-[15px] rounded-full bg-black z-40 border border-white/[0.05] flex items-center justify-end px-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#091530]" />
                            </div>

                            {/* Tela do Telefone */}
                            <div className="rounded-[28px] overflow-hidden bg-[#030712] aspect-[1170/2387] w-full border border-white/[0.04] relative select-none">
                                <img 
                                    src="/tela_mobile.PNG" 
                                    alt="Controle-C Mobile Dashboard" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* MOCKUP COMPANION COMPATÍVEL COM CELULAR (REVELADO APENAS EM MOBILE) */}
                    <div className="w-[230px] mx-auto mt-8 block md:hidden z-20">
                        {/* Phone Frame */}
                        <div className="w-full bg-[#010307] rounded-[36px] border-[4px] border-[#1e293b]/90 p-1.5 shadow-2xl relative">
                            
                            {/* Dynamic Island */}
                            <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-14 h-[12px] rounded-full bg-black z-40" />

                            <div className="rounded-[26px] overflow-hidden bg-[#030712] aspect-[1170/2387] w-full border border-white/[0.04] relative">
                                <img 
                                    src="/tela_mobile.PNG" 
                                    alt="Controle-C Mobile Dashboard" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                    
                </div>
            </section>

            {/* ── SEÇÃO: A PSICOLOGIA DA ORDEM (QUADRO DE ANOTAÇÕES) ── */}
            <section id="psicologia-ordem" className="relative py-20 md:py-24 z-10 w-full max-w-4xl mx-auto px-6 overflow-hidden">
                {/* Glow de fundo sutil para atmosfera de reflexão */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-white/[0.01] blur-[120px] pointer-events-none z-0" />

                {/* Header da Seção */}
                <div className="text-center mb-16 flex flex-col items-center relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, y: 15, scale: 0.97, ...fb(12) }}
                        whileInView={{ opacity: 1, y: 0, scale: 1, ...fb(0) }}
                        viewport={vp("-180px 0px -20px 0px")}
                        transition={{ type: "spring", stiffness: 15, damping: 13, mass: 1.4 }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] text-xs font-semibold uppercase tracking-wider text-[#a855f7] mb-4 backdrop-blur-md"
                    >
                        <Brain className="w-3.5 h-3.5 text-[#a855f7]" />
                        <span>Fricção vs. Liberdade</span>
                    </motion.div>
                    
                    <motion.h2 
                        initial={{ opacity: 0, y: 15, scale: 0.98, ...fb(15) }}
                        whileInView={{ opacity: 1, y: 0, scale: 1, ...fb(0) }}
                        viewport={vp("-180px 0px -20px 0px")}
                        transition={{ type: "spring", stiffness: 15, damping: 13, mass: 1.4, delay: 0.15 }}
                        className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4 premium-text-shadow"
                    >
                        O peso do caos. A leveza do controle.
                    </motion.h2>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 12, scale: 0.99, ...fb(10) }}
                        whileInView={{ opacity: 1, y: 0, scale: 1, ...fb(0) }}
                        viewport={vp("-180px 0px -20px 0px")}
                        transition={{ type: "spring", stiffness: 15, damping: 13, mass: 1.4, delay: 0.3 }}
                        className="text-text-muted text-sm sm:text-base max-w-xl mx-auto leading-relaxed"
                    >
                        Uma vida desorganizada consome sua energia aos poucos. Veja a diferença entre viver no caos e ter o controle com uma ferramenta integrada e única.
                    </motion.p>
                </div>

                {/* Grid dos Notepads (Quadro de Anotações) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                    
                    {/* NOTEPAD CAOS (Vida sem o Controle-C) */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20, rotate: -2, scale: 0.98 }}
                        whileInView={{ opacity: 1, x: 0, rotate: -1.5, scale: 1 }}
                        viewport={vp("-180px 0px -20px 0px")}
                        transition={{ type: "spring", stiffness: 25, damping: 16, mass: 1.2 }}
                        whileHover={{ rotate: -0.5, y: -4, transition: { duration: 0.2 } }}
                        className="relative rounded-2xl border border-rose-500/10 bg-gradient-to-b from-[#08090a]/95 to-[#020304]/98 p-6 md:p-8 shadow-[0_15px_30px_rgba(244,63,94,0.02)] overflow-hidden group select-none"
                    >
                        {/* Detalhe de furos de espiral de caderno no topo */}
                        <div className="flex gap-3 justify-center mb-6 pb-5 border-b border-white/[0.04] opacity-40">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="flex flex-col items-center gap-1">
                                    <div className="w-1.5 h-3 bg-white/[0.12] rounded-full" />
                                    <div className="w-2 h-2 bg-black rounded-full border border-white/[0.08]" />
                                </div>
                            ))}
                        </div>

                        {/* Título do Bloco */}
                        <h3 className="font-display-premium text-2xl md:text-3xl italic text-rose-400 mb-6 text-center">
                            Vida sem o Controle-C
                        </h3>

                        {/* Lista de Sintomas */}
                        <div className="space-y-4">
                            <div className="flex gap-3 items-start">
                                <span className="w-5 h-5 rounded-full bg-rose-500/15 border border-rose-500/25 text-rose-400 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5 select-none">✗</span>
                                <div className="text-left">
                                    <h4 className="text-white text-xs font-bold">Boletos & Finanças</h4>
                                    <p className="text-text-muted text-[11px] mt-0.5 leading-relaxed">Gastos invisíveis e juros surpresa acumulando por preguiça de planilhas.</p>
                                </div>
                            </div>
                            <div className="flex gap-3 items-start">
                                <span className="w-5 h-5 rounded-full bg-rose-500/15 border border-rose-500/25 text-rose-400 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5 select-none">✗</span>
                                <div className="text-left">
                                    <h4 className="text-white text-xs font-bold">Sobrecarga Mental</h4>
                                    <p className="text-text-muted text-[11px] mt-0.5 leading-relaxed">Deitar cansado na cama com a cabeça fervendo, tentando lembrar de tarefas.</p>
                                </div>
                            </div>
                            <div className="flex gap-3 items-start">
                                <span className="w-5 h-5 rounded-full bg-rose-500/15 border border-rose-500/25 text-rose-400 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5 select-none">✗</span>
                                <div className="text-left">
                                    <h4 className="text-white text-xs font-bold">Rotina Reativa</h4>
                                    <p className="text-text-muted text-[11px] mt-0.5 leading-relaxed">Passar o dia inteiro correndo para apagar incêndios e engavetando seus sonhos.</p>
                                </div>
                            </div>
                            <div className="flex gap-3 items-start">
                                <span className="w-5 h-5 rounded-full bg-rose-500/15 border border-rose-500/25 text-rose-400 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5 select-none">✗</span>
                                <div className="text-left">
                                    <h4 className="text-white text-xs font-bold">Hábitos Perdidos</h4>
                                    <p className="text-text-muted text-[11px] mt-0.5 leading-relaxed">Promessas de mudança e treinos que duram no máximo até o dia 5.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* NOTEPAD CONTROLE (Vida com o Controle-C) */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20, rotate: 2, scale: 0.98 }}
                        whileInView={{ opacity: 1, x: 0, rotate: 1.5, scale: 1 }}
                        viewport={vp("-180px 0px -20px 0px")}
                        transition={{ type: "spring", stiffness: 25, damping: 16, mass: 1.2 }}
                        whileHover={{ rotate: 0.5, y: -4, transition: { duration: 0.2 } }}
                        className="relative rounded-2xl border border-emerald-500/10 bg-gradient-to-b from-[#08090a]/95 to-[#020304]/98 p-6 md:p-8 shadow-[0_15px_30px_rgba(12,242,205,0.02)] overflow-hidden group select-none"
                    >
                        {/* Glow verde sutil interno no caderno com controle */}
                        <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-[#0cf2cd]/3 blur-[80px] pointer-events-none group-hover:bg-[#0cf2cd]/5 transition-all duration-500" />

                        {/* Detalhe de furos de espiral de caderno no topo */}
                        <div className="flex gap-3 justify-center mb-6 pb-5 border-b border-white/[0.04] opacity-40">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="flex flex-col items-center gap-1">
                                    <div className="w-1.5 h-3 bg-white/[0.12] rounded-full" />
                                    <div className="w-2 h-2 bg-black rounded-full border border-white/[0.08]" />
                                </div>
                            ))}
                        </div>

                        {/* Título do Bloco */}
                        <h3 className="font-display-premium text-2xl md:text-3xl italic text-[#0cf2cd] mb-6 text-center">
                            Vida com o Controle-C
                        </h3>

                        {/* Lista de Melhorias */}
                        <div className="space-y-4">
                            <div className="flex gap-3 items-start">
                                <span className="w-5 h-5 rounded-full bg-[#0cf2cd]/15 border border-[#0cf2cd]/25 text-[#0cf2cd] text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5 select-none">✓</span>
                                <div className="text-left">
                                    <h4 className="text-white text-xs font-bold">Finanças Organizadas</h4>
                                    <p className="text-text-muted text-[11px] mt-0.5 leading-relaxed">Controle total de suas despesas e orçamentos diários de forma automática, prática e 100% livre de planilhas complexas.</p>
                                </div>
                            </div>
                            <div className="flex gap-3 items-start">
                                <span className="w-5 h-5 rounded-full bg-[#0cf2cd]/15 border border-[#0cf2cd]/25 text-[#0cf2cd] text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5 select-none">✓</span>
                                <div className="text-left">
                                    <h4 className="text-white text-xs font-bold">Mente 100% Livre</h4>
                                    <p className="text-text-muted text-[11px] mt-0.5 leading-relaxed">A paz de dormir sabendo que tudo está anotado e processado pelo Controle-C.</p>
                                </div>
                            </div>
                            <div className="flex gap-3 items-start">
                                <span className="w-5 h-5 rounded-full bg-[#0cf2cd]/15 border border-[#0cf2cd]/25 text-[#0cf2cd] text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5 select-none">✓</span>
                                <div className="text-left">
                                    <h4 className="text-white text-xs font-bold">Foco no Essencial</h4>
                                    <p className="text-text-muted text-[11px] mt-0.5 leading-relaxed">Suas prioridades reais e seus planos futuros no centro da sua rotina.</p>
                                </div>
                            </div>
                            <div className="flex gap-3 items-start">
                                <span className="w-5 h-5 rounded-full bg-[#0cf2cd]/15 border border-[#0cf2cd]/25 text-[#0cf2cd] text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5 select-none">✓</span>
                                <div className="text-left">
                                    <h4 className="text-white text-xs font-bold">Hábitos que Colam</h4>
                                    <p className="text-text-muted text-[11px] mt-0.5 leading-relaxed">Consistência diária reforçada por lembretes leves e streaks visíveis de orgulho.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </section>

            {/* ── ESTILOS DE ANIMAÇÃO CIBERNÉTICA INLINE ── */}
            <style>{`
                @keyframes bounce-voice {
                    0%, 100% { height: 4px; }
                    50% { height: 18px; }
                }
                .voice-bar {
                    animation: bounce-voice 1.2s ease-in-out infinite;
                }
                .voice-bar:nth-child(2) { animation-delay: 0.15s; }
                .voice-bar:nth-child(3) { animation-delay: 0.3s; }
                .voice-bar:nth-child(4) { animation-delay: 0.45s; }
                .voice-bar:nth-child(5) { animation-delay: 0.6s; }

                @keyframes wiggle-bell {
                    0%, 100% { transform: rotate(0deg); }
                    15% { transform: rotate(8deg); }
                    30% { transform: rotate(-8deg); }
                    45% { transform: rotate(6deg); }
                    60% { transform: rotate(-6deg); }
                    75% { transform: rotate(3deg); }
                    90% { transform: rotate(-3deg); }
                }
                .wiggle-bell-animation {
                    animation: wiggle-bell 1.5s ease-in-out infinite;
                }

                .shine-card::before {
                    content: '';
                    position: absolute;
                    top: 0; left: -150%;
                    width: 60%; height: 100%;
                    background: linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent);
                    transform: skewX(-25deg);
                    transition: 0.8s ease;
                }
                .shine-card:hover::before {
                    left: 150%;
                }

                @keyframes shine-btn-sweep {
                    0% { left: -100%; }
                    100% { left: 200%; }
                }
                .animate-shine-btn {
                    position: relative;
                    overflow: hidden;
                }
                .animate-shine-btn::before {
                    content: '';
                    position: absolute;
                    top: 0; left: -100%;
                    width: 50%; height: 100%;
                    background: linear-gradient(to right, transparent, rgba(255,255,255,0.35), transparent);
                    transform: skewX(-25deg);
                    pointer-events: none;
                    z-index: 1;
                }
                .animate-shine-btn:hover::before {
                    animation: shine-btn-sweep 0.85s cubic-bezier(0.4, 0, 0.2, 1);
                }
            `}</style>

            {/* ── SEÇÃO: PASSE LIVRE PARA O CONTROLE (PORTAL DE ACESSO HOLOGRÁFICO) ── */}
            <section ref={pricingRef} id="precos" className="relative py-24 md:py-28 z-10 w-full max-w-5xl mx-auto px-6 overflow-hidden">
                {/* Atmosfera de Luz de Fundo (Tech Space Glows) */}
                <div className="absolute right-[-10%] top-1/4 w-[400px] h-[400px] rounded-full bg-[#0cf2cd]/4 blur-[130px] pointer-events-none z-0" />
                <div className="absolute left-[-10%] bottom-1/4 w-[400px] h-[400px] rounded-full bg-[#8b5cf6]/4 blur-[130px] pointer-events-none z-0" />

                {/* ── HEADER DA SEÇÃO CENTRALIZADO NO TOPO ── */}
                <div className="text-center mb-16 flex flex-col items-center relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, y: 15, scale: 0.97, ...fb(12) }}
                        whileInView={{ opacity: 1, y: 0, scale: 1, ...fb(0) }}
                        viewport={vp("-180px 0px -20px 0px")}
                        transition={{ type: "spring", stiffness: 15, damping: 13, mass: 1.4 }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] text-xs font-semibold uppercase tracking-wider text-[#0cf2cd] mb-4 backdrop-blur-md"
                    >
                        <Sparkles className="w-3.5 h-3.5 text-[#0cf2cd]" />
                        <span>Controle Absoluto · Acesso Controle-C Anual</span>
                    </motion.div>

                    <motion.h2 
                        initial={{ opacity: 0, y: 15, scale: 0.98, ...fb(15) }}
                        whileInView={{ opacity: 1, y: 0, scale: 1, ...fb(0) }}
                        viewport={vp("-180px 0px -20px 0px")}
                        transition={{ type: "spring", stiffness: 15, damping: 13, mass: 1.4, delay: 0.15 }}
                        className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4 premium-text-shadow font-body-jakarta"
                    >
                        Sua rotina redesenhada e consistente
                    </motion.h2>
                    
                    <motion.p
                        initial={{ opacity: 0, y: 12, scale: 0.99, ...fb(10) }}
                        whileInView={{ opacity: 1, y: 0, scale: 1, ...fb(0) }}
                        viewport={vp("-180px 0px -20px 0px")}
                        transition={{ type: "spring", stiffness: 15, damping: 13, mass: 1.4, delay: 0.3 }}
                        className="text-text-muted text-sm sm:text-base leading-relaxed max-w-2xl mx-auto"
                    >
                        O Controle-C não é apenas mais uma ferramenta de organização. É um sistema completo e invisível que trabalha para você. Escolha o seu plano abaixo.
                    </motion.p>
                </div>

                {/* Grid Lateral Lado a Lado (12 colunas no desktop) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10 w-full">
                    
                    {/* COLUNA ESQUERDA: LISTA PREMIUM DE VANTAGENS (7/12) */}
                    <div className="lg:col-span-7 flex flex-col gap-6 text-left w-full h-full justify-center">
                        {/* Lista Premium e Minimalista de 8 Benefícios Exclusivos (2 Colunas) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 w-full pr-0 lg:pr-4">
                            
                            {[
                                {
                                    highlight: "Controle Total de Agenda",
                                    desc: "Vincule o Google Agenda e acompanhe seus compromissos em tempo real. Crie e edite eventos, configure reuniões e adicione descrições ou locais."
                                },
                                {
                                    highlight: "Listas de Tarefas por Projetos",
                                    desc: "Crie listas por projetos, defina prazos para priorizar suas tarefas diárias e organize seu fluxo de trabalho todos os dias."
                                },
                                {
                                    highlight: "Rastreador de Hábitos e Rotinas com Gamificação",
                                    desc: "Consolide hábitos e rotinas importantes para você. Acompanhe seu progresso na semana e no mês com gamificação em tempo real."
                                },
                                {
                                    highlight: "Controle Financeiro Completo",
                                    desc: "Registre receitas e despesas em todas as formas de pagamento (Pix, dinheiro, débito e crédito) e planeje seus gastos para até 24 meses."
                                },
                                {
                                    highlight: "Limites Mensais",
                                    desc: "Defina limites de gastos mensais e orçamentos por categorias inteligentes para economizar sem precisar de planilhas."
                                },
                                {
                                    highlight: "Lembrete Inteligente de Contas",
                                    desc: "Evite juros e atrasos. O sistema monitora e lembra você ativamente antes do vencimento de boletos e contas recorrentes."
                                },
                                {
                                    highlight: "Gráficos Financeiros e Comparativos",
                                    desc: "Filtre seus dados por período para comparar receitas e despesas de forma visual por meio de gráficos e relatórios comparativos."
                                },
                                {
                                    highlight: "Painel Web 360° Exclusivo",
                                    desc: "Acesse uma interface espetacular, limpa e responsiva para computador e celular para ver toda a sua vida organizada de forma consolidada."
                                },
                                {
                                    highlight: "Controle-C: Toda a sua Vida Organizada",
                                    desc: "Centralize suas finanças, compromissos, tarefas e hábitos em um ecossistema invisível, prático e totalmente livre de problemas."
                                }
                            ].map((item, idx) => (
                                <motion.div 
                                    key={idx}
                                    initial={{ opacity: 0, y: 15, scale: 0.97, ...fb(10) }}
                                    whileInView={{ opacity: 1, y: 0, scale: 1, ...fb(0) }}
                                    viewport={vp("-180px 0px -20px 0px")}
                                    transition={{ type: "spring", stiffness: 15, damping: 13, mass: 1.4, delay: 0.15 + idx * 0.04 }}
                                    className="flex items-start gap-3.5 py-3 border-b border-white/[0.03] transition-all hover:border-[#0cf2cd]/15 group cursor-default"
                                >
                                    <span className="w-5 h-5 rounded-full bg-[#0cf2cd]/8 border border-[#0cf2cd]/20 text-[#0cf2cd] text-[10px] font-black flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#0cf2cd]/15 group-hover:border-[#0cf2cd]/40 transition-all select-none">
                                        ✓
                                    </span>
                                    <div className="text-left leading-tight">
                                        <span className="text-white text-xs sm:text-sm font-extrabold tracking-tight group-hover:text-[#0cf2cd] transition-colors duration-200">
                                            {item.highlight}
                                        </span>
                                        <p className="text-text-muted text-[10.5px] sm:text-xs leading-relaxed mt-1 group-hover:text-text-dimmed transition-colors duration-200">
                                            {item.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}

                        </div>
                    </div>

                    {/* COLUNA DIREITA: O PASSE DE ACESSO HOLOGRÁFICO 3D (5/12) */}
                    <div className="lg:col-span-5 flex flex-col items-center justify-center w-full h-full relative">
                        {/* Glow rotativo de fundo exclusivo para o card de checkout */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#0cf2cd]/4 blur-[100px] pointer-events-none z-0" />
                        
                        <motion.div
                            initial={{ opacity: 0, y: 30, scale: 0.95, ...fb(15) }}
                            whileInView={{ opacity: 1, y: 0, scale: 1, ...fb(0) }}
                            viewport={vp("-180px 0px -20px 0px")}
                            transition={{ type: "spring", stiffness: 15, damping: 13, mass: 1.4, delay: 0.35 }}
                            className="w-full flex justify-center z-10"
                        >
                            <div
                                className="w-full max-w-[350px] rounded-3xl border border-[#0cf2cd]/20 bg-gradient-to-b from-[#0a0f18]/95 to-[#030712]/98 p-8 shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_40px_rgba(12,242,205,0.06)] relative overflow-hidden flex flex-col justify-between group shine-card select-none border-t-white/[0.08] z-10"
                            >
                                {/* Glow de destaque interno metálico */}
                                <div className="absolute -right-20 -top-20 w-44 h-44 rounded-full bg-[#0cf2cd]/6 blur-[80px] pointer-events-none" />

                                {/* Tag de Acesso */}
                                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.04] relative z-10">
                                    {billingPeriod === 'annual' ? (
                                        <div className="flex items-center gap-2">
                                            <span className="text-[9px] text-[#0cf2cd] font-bold uppercase tracking-wider bg-[#0cf2cd]/8 px-2.5 py-1 rounded-full border border-[#0cf2cd]/20 animate-pulse">
                                                LICENÇA ANUAL COMPLETA
                                            </span>
                                            <span className="text-[9px] text-white font-black uppercase tracking-wider bg-purple-600 px-2.5 py-1 rounded-full border border-purple-500 shadow-[0_0_12px_rgba(147,51,234,0.45)]">
                                                ★ RECOMENDADO
                                            </span>
                                        </div>
                                    ) : (
                                        <span className="text-[9px] text-[#0cf2cd] font-bold uppercase tracking-wider bg-[#0cf2cd]/8 px-2.5 py-1 rounded-full border border-[#0cf2cd]/20">
                                            ASSINATURA MENSAL
                                        </span>
                                    )}
                                </div>

                                {/* Seletor de Planos (Mensal vs Anual) */}
                                <div className="relative z-10 mb-8 w-full p-1 bg-white/[0.01] border border-white/[0.06] rounded-xl flex items-center justify-between backdrop-blur-md">
                                    <button
                                        onClick={() => setBillingPeriod('monthly')}
                                        className={`flex-1 py-2 px-3 text-center rounded-lg text-xs font-bold transition-all duration-300 ${billingPeriod === 'monthly' ? 'bg-[#0cf2cd] text-black shadow-[0_0_15px_rgba(12,242,205,0.25)]' : 'text-text-muted hover:text-white'}`}
                                    >
                                        Mensal
                                    </button>
                                    <button
                                        onClick={() => setBillingPeriod('annual')}
                                        className={`flex-1 py-2 px-3 text-center rounded-lg text-xs font-bold transition-all duration-300 relative ${billingPeriod === 'annual' ? 'bg-[#0cf2cd] text-black shadow-[0_0_15px_rgba(12,242,205,0.25)]' : 'text-text-muted hover:text-white'}`}
                                    >
                                        Anual
                                        <span className="absolute -top-2.5 -right-1 bg-purple-600 text-white text-[7.5px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                                            37% OFF
                                        </span>
                                    </button>
                                </div>

                                {/* Preços com Tipografia Monumental de Clímax */}
                                <div className="text-left mb-6 relative z-10">
                                    {billingPeriod === 'annual' ? (
                                        <>
                                            <p className="text-[10px] text-text-muted/60 line-through font-semibold tracking-wide uppercase mb-1">
                                                {isOfferActive ? "De 12x R$ 61,69" : "De R$ 99,90/mês"}
                                            </p>
                                            <p className="text-[11px] text-text-dimmed font-bold uppercase tracking-wider mb-2.5">Por apenas</p>
                                            
                                            <div className="flex flex-col relative leading-none text-left">
                                                {/* Giant elegant Serif display block for numbers */}
                                                <span className="text-lg sm:text-2xl font-bold text-white/70 tracking-normal mb-1">12x</span>
                                                <span className="text-5xl sm:text-6xl font-black text-white tracking-tighter premium-text-shadow font-display">
                                                    <span className="text-[26px] sm:text-[34px] font-extrabold tracking-normal mr-1">R$</span>{isOfferActive ? "49,35" : "61,69"}
                                                </span>
                                            </div>
                                            <p className="text-[10px] text-[#0cf2cd] font-semibold mt-3 select-none uppercase tracking-wider">
                                                {isOfferActive ? "Ou R$ 480,00 à vista (20% de Desconto Adicional)" : "Ou R$ 600,00 à vista (Economize 37%)"}
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <p className="text-[10px] text-text-muted/60 line-through font-semibold tracking-wide uppercase mb-1">
                                                {isOfferActive ? "De R$ 80,00/mês" : "De R$ 120,00/mês"}
                                            </p>
                                            <p className="text-[11px] text-text-dimmed font-bold uppercase tracking-wider mb-2.5">Por apenas</p>
                                            
                                            <div className="flex flex-col relative leading-none">
                                                {/* Giant elegant Serif display block for numbers */}
                                                <span className="text-5xl sm:text-6xl font-black text-white tracking-tighter premium-text-shadow font-display">
                                                    <span className="text-[26px] sm:text-[34px] font-extrabold tracking-normal">R$</span> {isOfferActive ? "64,00" : "80,00"}<span className="text-xs text-text-muted tracking-normal font-medium"> /mês</span>
                                                </span>
                                            </div>
                                            <p className="text-[10px] text-[#0cf2cd] font-semibold mt-3 select-none uppercase tracking-wider">
                                                {isOfferActive ? "Sem fidelidade · 20% OFF de R$ 80,00" : "Sem fidelidade · Cancele quando quiser"}
                                            </p>
                                        </>
                                    )}
                                </div>

                                <p className="text-text-muted text-[10.5px] leading-relaxed text-left mb-6 relative z-10 border-l border-white/[0.08] pl-3 italic">
                                    {billingPeriod === 'annual' 
                                        ? "Equivalente a R$ 2,05 por dia. Menos que um único café expresso por dia para colocar a sua mente e sua vida no controle absoluto."
                                        : "Equivalente a R$ 2,67 por dia. Menos que um único café expresso por dia para colocar a sua mente e sua vida no controle absoluto."
                                    }
                                </p>

                                {/* 🎁 Destaque de Bônus da Reunião com Consultor */}
                                <div className="relative z-10 mb-6 bg-gradient-to-r from-[#0cf2cd]/10 to-[#8b5cf6]/10 border border-[#0cf2cd]/20 rounded-2xl p-4 text-left shadow-[0_4px_20px_rgba(12,242,205,0.05)]">
                                    <div className="absolute top-[-8px] left-4 bg-purple-600 text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider border border-purple-500 shadow-[0_0_8px_rgba(147,51,234,0.4)]">
                                        BÔNUS INCLUSO 🎁
                                    </div>
                                    <p className="text-[11.5px] sm:text-xs text-white leading-relaxed mt-1 font-body-jakarta">
                                        Assinando agora, você receberá uma <strong className="text-[#0cf2cd]">reunião com o consultor do Controle-C</strong> para fazer as configurações necessárias e te instruir.
                                    </p>
                                </div>

                                {/* Botão de Ignição e Disparo Cibernético (CTA Máximo) */}
                                <div className="relative z-10 w-full mb-6">
                                    <motion.a 
                                        href={billingPeriod === 'annual' ? "https://pay.zouti.com.br/checkout?product_offer_id=prod_offer_ynkqy38q0c15pcg9sgvz1u" : "https://pay.zouti.com.br/checkout?product_offer_id=prod_offer_ydek6nmp28nqr06wkqifds"}
                                        whileHover={{ scale: 1.025, y: -1.5 }}
                                        whileTap={{ scale: 0.985 }}
                                        className="animate-shine-btn bg-gradient-to-r from-[#0cf2cd] via-[#00f5d4] to-[#01c7b7] text-black font-black text-[11px] sm:text-xs md:text-[13px] tracking-widest uppercase flex items-center justify-center gap-2.5 rounded-2xl py-4 sm:py-4.5 px-6 w-full text-center transition-all duration-500 shadow-[0_0_20px_rgba(12,242,205,0.25),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:shadow-[0_0_35px_rgba(12,242,205,0.5),inset_0_1px_1px_rgba(255,255,255,0.5)] cursor-pointer border border-white/20 group"
                                    >
                                        <span className="relative z-10">Quero organizar minha vida agora</span>
                                        <ArrowRight className="w-4 h-4 text-black flex-shrink-0 stroke-[3] group-hover:translate-x-1.5 transition-transform duration-300 relative z-10" />
                                    </motion.a>
                                </div>

                                {/* Selos de Segurança e Confiança Premium */}
                                <div className="space-y-2 pt-5 border-t border-white/[0.04] relative z-10 text-left">
                                    <div className="flex items-center gap-2 text-text-dimmed text-[10px] font-semibold">
                                        <span>✅</span>
                                        <span>Garantia de Satisfação de 7 dias</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-text-dimmed text-[10px] font-semibold">
                                        <span>✅</span>
                                        <span>Acesso Imediato após a assinatura</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-text-dimmed text-[10px] font-semibold">
                                        <span>✅</span>
                                        <span>Dados 100% criptografados e seguros</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </section>

            {/* ── SEÇÃO: VIDEO TUTORIAIS / DÚVIDAS DAS FUNCIONALIDADES ── */}
            <section id="tutoriais" className="relative py-24 md:py-28 z-10 w-full max-w-5xl mx-auto px-6 overflow-hidden">
                {/* Glows de Fundo */}
                <div className="absolute left-[-10%] top-1/3 w-[350px] h-[350px] rounded-full bg-[#8b5cf6]/4 blur-[120px] pointer-events-none z-0" />
                <div className="absolute right-[-10%] bottom-1/3 w-[350px] h-[350px] rounded-full bg-[#0cf2cd]/4 blur-[120px] pointer-events-none z-0" />

                {/* Header */}
                <div className="text-center mb-16 flex flex-col items-center relative z-10">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] text-xs font-semibold uppercase tracking-wider text-purple-400 mb-4 backdrop-blur-md">
                        <span>Dúvidas Frequentes</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4 premium-text-shadow font-body-jakarta">
                        Possui dúvidas sobre as funcionalidades?
                    </h2>
                    <p className="text-text-muted text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
                        Entenda um pouco mais do que tem dentro do Controle-C através de algumas vídeo aulas do nosso consultor.
                    </p>
                </div>

                {/* Horizontal Premium Navigation Menu */}
                <div className="flex overflow-x-auto lg:justify-center items-center gap-4 pb-6 scrollbar-none w-full max-w-4xl mx-auto mb-6 relative z-10 px-1">
                    {tutorials.map((tutorial, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveTutorialTab(idx)}
                            className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                                activeTutorialTab === idx
                                    ? 'bg-[#0cf2cd]/10 border-[#0cf2cd]/40 text-[#0cf2cd] shadow-[0_0_20px_rgba(12,242,205,0.08)]'
                                    : 'bg-[#0b0f19]/80 border-white/[0.05] text-text-muted hover:text-white hover:border-white/[0.12]'
                            }`}
                        >
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 border ${
                                activeTutorialTab === idx
                                    ? 'bg-[#0cf2cd]/15 border-[#0cf2cd]/30 text-[#0cf2cd]'
                                    : 'bg-white/[0.02] border-white/[0.08] text-text-muted'
                            }`}>
                                {(() => {
                                    const Icon = [Calendar, CheckCircle2, Flame, DollarSign][idx];
                                    return <Icon className="w-4 h-4" />;
                                })()}
                            </div>
                            <div className="text-left leading-tight">
                                <span className="text-xs sm:text-sm font-bold tracking-tight block font-display">
                                    {tutorial.menuTitle}
                                </span>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Centered Active Tab Description */}
                <p className="text-center text-text-muted text-xs sm:text-sm max-w-xl mx-auto mb-10 min-h-[40px] relative z-10 leading-relaxed px-4">
                    {tutorials[activeTutorialTab]?.description}
                </p>

                {/* Centered Premium Mockup for Walkthrough Video */}
                <div className="w-full max-w-3xl mx-auto bg-[#010307]/60 border border-white/[0.08] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden mb-12 relative z-10">
                    {/* Browser Mockup Top Bar */}
                    <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06] bg-white/[0.01]">
                        <div className="flex gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                        </div>
                        <div className="px-4 py-1 rounded-full bg-[#010307]/50 border border-white/[0.08] text-[10px] text-text-muted select-none font-display">
                            Configurando {tutorials[activeTutorialTab]?.title || 'Controle-C'}
                        </div>
                        <span className="w-2.5 h-2.5 rounded-full bg-[#0cf2cd]/60 animate-pulse" />
                    </div>
                    {/* Active Video Stream */}
                    <div className="aspect-video w-full bg-[#010307]/40 relative overflow-hidden">
                        <iframe
                            id={`panda-${tutorials[activeTutorialTab]?.videoUrl.split('?v=')[1]}`}
                            src={tutorials[activeTutorialTab]?.videoUrl}
                            title={tutorials[activeTutorialTab]?.title}
                            style={{ border: 'none' }}
                            allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture"
                            allowFullScreen={true}
                            className="w-full h-full border-0"
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>

                {/* Section Footer CTA */}
                <div className="text-center relative z-10 flex flex-col items-center">
                    <button
                        onClick={() => pricingRef.current?.scrollIntoView({ behavior: 'smooth' })}
                        className="inline-flex items-center justify-center gap-2 bg-white text-bg-space font-semibold text-sm py-4 px-8 rounded-full shadow-[0_4px_25px_rgba(255,255,255,0.15)] hover:bg-slate-100 hover:scale-[1.02] active:scale-100 transition-all duration-300 cursor-pointer"
                    >
                        🚀 Assinar agora
                    </button>
                </div>
            </section>

            {/* ── FOOTER ────────────────── */}
            <footer className="relative z-10 border-t border-white/[0.06] bg-[#010307]/30 py-10">
                <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex flex-col items-center sm:items-start gap-1">
                        <span className="text-white font-black text-lg tracking-tight font-display">
                            Controle<span className="text-[#0cf2cd]">-C</span>
                        </span>
                        <p className="text-xs text-text-muted font-body-jakarta">
                            Sua produtividade sob total controle.
                        </p>
                    </div>
                    <div className="flex flex-col items-center sm:items-end gap-1 text-xs text-text-dimmed">
                        <p>&copy; {new Date().getFullYear()} Controle-C. Todos os direitos reservados.</p>
                        <p className="text-[10px] text-text-muted">Feito para simplificar sua rotina.</p>
                    </div>
                </div>
            </footer>

            {/* ── VIDEO DEMO MODAL ────────────────── */}
            <AnimatePresence>
                {showDemoModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg"
                        onClick={() => setShowDemoModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.95, y: 20, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="relative w-full max-w-4xl bg-[#010307]/80 border border-white/[0.1] rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(12,242,205,0.15)]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header with Title and Close Button */}
                            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-white/[0.01]">
                                <h3 className="text-white font-bold text-sm sm:text-base flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-accent-cyan animate-pulse" />
                                    Vídeo Demonstrativo - Controle-C
                                </h3>
                                <button
                                    onClick={() => setShowDemoModal(false)}
                                    className="p-1.5 rounded-full bg-white/5 border border-white/[0.08] text-text-muted hover:text-white hover:bg-white/10 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Video Container (aspect-video) */}
                            <div className="aspect-video w-full bg-black">
                                <iframe
                                    src="https://www.youtube.com/embed/GbvdjrKxfBc?autoplay=1&rel=0&modestbranding=1&color=white"
                                    title="Controle-C Demo Video"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full border-0"
                                ></iframe>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>



        </div>
    );
};

export default App;
