import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ArrowRight, Trophy, Check, X, Users, RotateCcw } from 'lucide-react';

// --- TYPES & DATA ---

export type GamePhase = 'START' | 'TEAMS' | 'PREP' | 'QUIZ' | 'RANKING';

export interface Team {
  id: string;
  name: string;
  score: number;
}

export interface Question {
  id: number;
  questionES: string;
  questionEN: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  imageType?: 'question' | 'answer';
  imageSrc?: string; 
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    questionES: "¿Cómo empieza la letra oficial del himno de España?",
    questionEN: "How does the official lyrics of the Spanish anthem begin?",
    options: [
      { id: 'A', text: "En el país del sol…", isCorrect: false },
      { id: 'B', text: "En la patria…", isCorrect: false },
      { id: 'C', text: "No tiene / It doesn't have one", isCorrect: true },
    ]
  },
  {
    id: 2,
    questionES: "¿Dónde está el restaurante más antiguo del mundo?",
    questionEN: "Where is the oldest restaurant in the world?",
    imageType: 'answer',
    // CAMBIA ESTE ENLACE POR TU FOTO
    imageSrc: 'https://upload.wikimedia.org/wikipedia/commons/4/42/Sobrino_de_Bot%C3%ADn_madrid.jpg', 
    options: [
      { id: 'A', text: "España", isCorrect: true },
      { id: 'B', text: "México", isCorrect: false },
      { id: 'C', text: "Argentina", isCorrect: false },
    ]
  },
  {
    id: 3,
    questionES: "¿Qué famoso pintor trabajó allí?",
    questionEN: "Which famous painter worked there?",
    imageType: 'question',
    // CAMBIA ESTE ENLACE POR TU FOTO
    imageSrc: 'https://upload.wikimedia.org/wikipedia/commons/4/42/Sobrino_de_Bot%C3%ADn_madrid.jpg',
    options: [
      { id: 'A', text: "Goya", isCorrect: true },
      { id: 'B', text: "Picasso", isCorrect: false },
      { id: 'C', text: "Dalí", isCorrect: false },
    ]
  },
  {
    id: 4,
    questionES: "Oficialmente, si no quiero decir ni alumnos, ni alumnas, digo…",
    questionEN: "Officially, if I don't want to say 'alumnos' or 'alumnas', I say...",
    options: [
      { id: 'A', text: "alumnxs", isCorrect: false },
      { id: 'B', text: "alumnes", isCorrect: false },
      { id: 'C', text: "alumnado", isCorrect: true },
    ]
  },
  {
    id: 5,
    questionES: "¿De qué artista hay una exposición en HK?",
    questionEN: "Which artist has an exhibition in HK?",
    imageType: 'answer', 
    // CAMBIA ESTE ENLACE POR TU FOTO
    imageSrc: 'https://whitestone-gallery.com/cdn/shop/articles/NuriaMora_KV_1578x.jpg?v=1706691763',
    options: [
      { id: 'A', text: "Picasso", isCorrect: false },
      { id: 'B', text: "Nuria Mora", isCorrect: true },
      { id: 'C', text: "Rosa Montero", isCorrect: false },
    ]
  },
  {
    id: 6,
    questionES: "¿Qué es un tinto en Colombia?",
    questionEN: "What is a 'tinto' in Colombia?",
    options: [
      { id: 'A', text: "Vino / Wine", isCorrect: false },
      { id: 'B', text: "Tapa / Snack", isCorrect: false },
      { id: 'C', text: "Café / Coffee", isCorrect: true },
    ]
  },
  {
    id: 7,
    questionES: "¿Qué director hispanoparlante tiene 3 Oscar, ha ganado el Goya, y 2 globos de oro?",
    questionEN: "Which Spanish-speaking director has 3 Oscars, a Goya, and 2 Golden Globes?",
    options: [
      { id: 'A', text: "Pedro Almodóvar", isCorrect: false },
      { id: 'B', text: "Guillermo del Toro", isCorrect: true },
      { id: 'C', text: "Pedro Amenábar", isCorrect: false },
    ]
  },
  {
    id: 8,
    questionES: "¿Cuál es el tercer país del mundo con más museos?",
    questionEN: "Which is the country with the third most museums in the world?",
    options: [
      { id: 'A', text: "Colombia", isCorrect: false },
      { id: 'B', text: "México", isCorrect: false },
      { id: 'C', text: "España", isCorrect: true },
    ]
  },
  {
    id: 9,
    questionES: "A buenas horas…",
    questionEN: "At good hours... (Spanish idiom equivalent to 'better late than never' but sarcastic)",
    options: [
      { id: 'A', text: "mangas verdes", isCorrect: true },
      { id: 'B', text: "llegas tarde", isCorrect: false },
      { id: 'C', text: "dios nos ayuda", isCorrect: false },
    ]
  },
  {
    id: 10,
    questionES: "¿Por qué se llama Berghain la canción de Rosalía?",
    questionEN: "Why is Rosalía's song called Berghain?",
    options: [
      { id: 'A', text: "Porque allí conoció a su ex novio", isCorrect: false },
      { id: 'B', text: "Porque su novio le robó una canción", isCorrect: true },
      { id: 'C', text: "Porque allí dio su primer concierto", isCorrect: false },
    ]
  },
  {
    id: 11,
    questionES: "¿Qué país tiene la bandera más antigua de América que sigue en uso (adoptada en 1816)?",
    questionEN: "Which country has the oldest flag in America still in use?",
    options: [
      { id: 'A', text: "México", isCorrect: false },
      { id: 'B', text: "Bolivia", isCorrect: false },
      { id: 'C', text: "Argentina", isCorrect: true },
    ]
  },
  {
    id: 12,
    questionES: "¿En qué países está el glaciar Perito Moreno?",
    questionEN: "In which countries is the Perito Moreno glacier?",
    options: [
      { id: 'A', text: "España - Andorra", isCorrect: false },
      { id: 'B', text: "Chile - Argentina", isCorrect: true },
      { id: 'C', text: "Argentina - Uruguay", isCorrect: false },
    ]
  },
];

// --- COMPONENTS ---

interface NeonFrameProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'low' | 'high';
}

const NeonFrame: React.FC<NeonFrameProps> = ({ children, className = '', intensity = 'high' }) => {
  const borderGlow = intensity === 'high' 
    ? "border-red-600 shadow-[0_0_30px_rgba(220,38,38,0.6)]" 
    : "border-red-800 shadow-[0_0_15px_rgba(220,38,38,0.3)]";

  return (
    <div className={`relative p-6 border-4 rounded-xl bg-black/80 backdrop-blur-sm ${borderGlow} ${className}`}>
      {/* Corner Stickers */}
      <div className="absolute -top-6 -left-6 text-4xl transform -rotate-12 z-10 drop-shadow-[0_0_10px_rgba(255,0,0,0.5)]">🥘</div>
      <div className="absolute -bottom-6 -right-6 text-4xl transform rotate-12 z-10 drop-shadow-[0_0_10px_rgba(255,0,0,0.5)]">💃</div>
      <div className="absolute -top-6 -right-6 text-4xl transform rotate-45 z-10 drop-shadow-[0_0_10px_rgba(255,0,0,0.5)]">💀</div>
      <div className="absolute -bottom-6 -left-6 text-4xl transform -rotate-45 z-10 drop-shadow-[0_0_10px_rgba(255,0,0,0.5)]">🪭</div>
      {children}
    </div>
  );
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "px-6 py-3 rounded-lg font-bold uppercase tracking-widest transition-all transform active:scale-95 border-2";
  
  const variants = {
    primary: "bg-red-700 text-yellow-100 border-yellow-500 hover:bg-red-600 hover:shadow-[0_0_20px_rgba(234,179,8,0.6)]",
    secondary: "bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700",
    success: "bg-green-700 text-white border-green-400 hover:bg-green-600 shadow-[0_0_15px_rgba(74,222,128,0.5)]"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

// --- MAIN APP ---

// IMAGEN DE PORTADA (Cámbiala aquí)
const COVER_IMAGE = "https://images.unsplash.com/photo-1542662565-7e4b66bae529?q=80&w=2727&auto=format&fit=crop";

const App: React.FC = () => {
  const [phase, setPhase] = useState<GamePhase>('START');
  const [teams, setTeams] = useState<Team[]>([]);
  const [tempTeamCount, setTempTeamCount] = useState<number>(2);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [winnersForCurrentRound, setWinnersForCurrentRound] = useState<string[]>([]);

  const currentQuestion: Question = QUESTIONS[currentQuestionIndex];

  const fireConfetti = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  useEffect(() => {
    if (phase === 'RANKING') {
      fireConfetti();
    }
  }, [phase]);

  const handleStartGame = () => setPhase('TEAMS');

  const initializeTeams = () => {
    const newTeams: Team[] = Array.from({ length: tempTeamCount }).map((_, i) => ({
      id: `team-${i}`,
      name: `Equipo ${i + 1}`,
      score: 0
    }));
    setTeams(newTeams);
  };

  const updateTeamName = (id: string, name: string) => {
    setTeams(prev => prev.map(t => t.id === id ? { ...t, name } : t));
  };

  const handleTeamsConfirmed = () => setPhase('PREP');

  const handlePrepDone = () => {
    setTimeout(() => {
        setPhase('QUIZ');
    }, 2000); 
  };

  const toggleWinner = (teamId: string) => {
    if (winnersForCurrentRound.includes(teamId)) {
      setWinnersForCurrentRound(prev => prev.filter(id => id !== teamId));
    } else {
      setWinnersForCurrentRound(prev => [...prev, teamId]);
    }
  };

  const handleNextQuestion = () => {
    setTeams(prev => prev.map(t => ({
      ...t,
      score: winnersForCurrentRound.includes(t.id) ? t.score + 1 : t.score
    })));

    setWinnersForCurrentRound([]);
    setShowAnswer(false);

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setPhase('RANKING');
    }
  };

  const renderStartScreen = () => (
    <div className="relative w-full h-full flex flex-col items-center justify-end pb-20 bg-black">
      <div className="absolute inset-0 bg-cover bg-center z-0 opacity-60" style={{ backgroundImage: `url(${COVER_IMAGE})` }} />
      <div className="absolute inset-0 bg-gradient-to-t from-red-900/90 via-black/40 to-transparent z-10" />
      <div className="relative z-20 flex flex-col items-center gap-8">
        <NeonFrame intensity="high" className="bg-red-900/80 mb-8 max-w-2xl text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-yellow-300 drop-shadow-[0_0_15px_rgba(253,224,71,0.8)] font-serif tracking-widest uppercase">
                FANZINE
            </h1>
            <p className="text-xl text-red-100 mt-2 font-mono tracking-widest">TRIVIAL SHOW</p>
        </NeonFrame>
        <Button onClick={handleStartGame} className="text-2xl px-12 py-4 animate-bounce">
          COMENZAR
        </Button>
      </div>
    </div>
  );

  const renderTeamSetup = () => (
    <div className="flex flex-col items-center justify-center min-h-screen w-full max-w-4xl mx-auto p-4 z-20 relative">
      <NeonFrame className="w-full">
        <h2 className="text-3xl text-yellow-400 mb-6 text-center font-bold drop-shadow-[0_0_5px_rgba(250,204,21,0.8)]">
          CONFIGURACIÓN DE EQUIPOS
        </h2>
        <div className="mb-6 flex items-center justify-center gap-4">
          <label className="text-white text-lg">¿Cuántos grupos?</label>
          <input 
            type="number" min={1} max={8} value={tempTeamCount}
            onChange={(e) => { const val = parseInt(e.target.value) || 2; setTempTeamCount(val); }}
            className="w-20 bg-gray-900 border-2 border-red-500 text-white text-center p-2 rounded text-xl"
          />
          <Button onClick={initializeTeams} variant="secondary" className="text-sm py-2">Set</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[50vh] overflow-y-auto p-2">
          {teams.map((team) => (
            <div key={team.id} className="flex flex-col gap-1">
               <label className="text-red-300 text-xs uppercase tracking-wide">Nombre del Equipo</label>
               <input type="text" value={team.name} onChange={(e) => updateTeamName(team.id, e.target.value)}
                 className="bg-black/50 border border-yellow-600 text-white p-3 rounded focus:outline-none focus:border-yellow-400 focus:shadow-[0_0_10px_rgba(250,204,21,0.5)] transition-all"
               />
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-end">
           {teams.length > 0 && (
             <Button onClick={handleTeamsConfirmed} className="flex items-center gap-2">SIGUIENTE <ArrowRight /></Button>
           )}
        </div>
      </NeonFrame>
    </div>
  );

  const renderPrepScreen = () => (
    <div onClick={handlePrepDone} className="cursor-pointer min-h-screen flex items-center justify-center z-20 relative w-full">
        <motion.h1 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: [1, 1.2, 1], opacity: 1, y: [0, -50, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            className="text-6xl md:text-9xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-br from-yellow-300 to-red-600 drop-shadow-[0_0_25px_rgba(255,0,0,1)] uppercase"
        >
            ¿PREPARADAS?
        </motion.h1>
        <p className="absolute bottom-10 text-white opacity-50 animate-pulse">Click para continuar</p>
    </div>
  );

  const renderQuiz = () => {
    const questionImage = currentQuestion.imageSrc;
    const showImageNow = (currentQuestion.imageType === 'question' || (currentQuestion.imageType === 'answer' && showAnswer)) && questionImage;

    return (
      <div className="flex flex-col items-center w-full max-w-5xl mx-auto p-4 z-20 relative pb-24">
        <div className="w-full flex justify-between items-center mb-6 text-yellow-500 font-mono">
           <span>PREGUNTA {currentQuestionIndex + 1} / {QUESTIONS.length}</span>
           <div className="flex gap-4">
               {teams.map(t => (
                   <div key={t.id} className="text-xs border border-red-900 p-1 rounded bg-black/50">
                       <span className="text-gray-400">{t.name}:</span> <span className="text-white font-bold">{t.score}</span>
                   </div>
               ))}
           </div>
        </div>
        <NeonFrame className="w-full mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
                {currentQuestion.questionES}
            </h2>
            <p className="text-lg text-red-300 italic border-t border-red-900/50 pt-2 mt-2">
                {currentQuestion.questionEN}
            </p>
            <AnimatePresence>
                {showImageNow && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-6 rounded-lg overflow-hidden border-2 border-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                        <img src={questionImage} alt="Reference" className="w-full h-64 md:h-80 object-cover" />
                    </motion.div>
                )}
            </AnimatePresence>
        </NeonFrame>
        <div className="grid grid-cols-1 gap-4 w-full mb-8">
            {currentQuestion.options.map((opt) => {
                const isCorrect = opt.isCorrect;
                const highlight = showAnswer && isCorrect;
                const dim = showAnswer && !isCorrect;
                return (
                    <motion.div key={opt.id} animate={highlight ? { scale: 1.05 } : { scale: 1 }}
                        className={`relative p-4 rounded-lg border-2 transition-all flex items-center ${highlight ? 'bg-green-900/80 border-green-400 shadow-[0_0_20px_rgba(74,222,128,0.6)] z-10' : 'bg-gray-900/60 border-red-900 hover:border-yellow-600'} ${dim ? 'opacity-40 grayscale' : 'opacity-100'}`}
                    >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl mr-4 border-2 ${highlight ? 'bg-green-500 text-black border-white' : 'bg-black text-red-500 border-red-800'}`}>
                            {opt.id}
                        </div>
                        <span className={`text-xl ${highlight ? 'text-white font-bold' : 'text-gray-200'}`}>{opt.text}</span>
                        {highlight && <Check className="ml-auto text-green-400 w-8 h-8" />}
                    </motion.div>
                )
            })}
        </div>
        <div className="fixed bottom-0 left-0 w-full bg-black/90 border-t border-red-800 p-4 flex flex-col items-center gap-4 z-50 backdrop-blur">
            {!showAnswer ? (
                <Button onClick={() => setShowAnswer(true)} className="w-full md:w-auto text-xl">VER RESPUESTA</Button>
            ) : (
                <div className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-between gap-4 animate-in slide-in-from-bottom duration-500">
                    <div className="flex flex-col gap-2 w-full">
                        <span className="text-yellow-500 text-center font-bold uppercase tracking-widest text-sm">¿Quién acertó? (1 Punto)</span>
                        <div className="flex flex-wrap justify-center gap-2">
                            {teams.map(team => {
                                const isSelected = winnersForCurrentRound.includes(team.id);
                                return (
                                    <button key={team.id} onClick={() => toggleWinner(team.id)} className={`px-4 py-2 rounded border-2 transition-all flex items-center gap-2 ${isSelected ? 'bg-green-700 border-green-400 text-white shadow-[0_0_10px_rgba(74,222,128,0.5)]' : 'bg-gray-800 border-gray-600 text-gray-400 hover:bg-gray-700'}`}>
                                        {isSelected ? <Check size={16}/> : <Users size={16} />} {team.name}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    <Button onClick={handleNextQuestion} className="bg-yellow-600 border-yellow-300 text-black hover:bg-yellow-500 whitespace-nowrap">SIGUIENTE <ArrowRight className="inline ml-2" /></Button>
                </div>
            )}
        </div>
      </div>
    );
  };

  const renderRanking = () => {
    const sortedTeams = [...teams].sort((a, b) => b.score - a.score);
    const winner = sortedTeams[0];
    const others = sortedTeams.slice(1);
    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full max-w-4xl mx-auto p-4 z-20 relative">
            <motion.div animate={{ y: [0, -20, 0], rotate: [0, -5, 5, 0] }} transition={{ duration: 2, repeat: Infinity }} className="mb-8">
                <Trophy size={120} className="text-yellow-400 drop-shadow-[0_0_30px_rgba(250,204,21,0.8)]" />
            </motion.div>
            <NeonFrame className="text-center w-full max-w-2xl bg-gradient-to-b from-red-900/50 to-black/80">
                <h2 className="text-yellow-200 uppercase tracking-widest mb-4">Ganadoras</h2>
                <div className="text-6xl md:text-8xl font-bold text-white mb-2 drop-shadow-[0_0_10px_white]">{winner.name}</div>
                <div className="text-4xl text-yellow-500 font-mono font-bold mb-8">{winner.score} Puntos</div>
                <div className="border-t border-red-800 pt-8 w-full">
                    <h3 className="text-red-400 mb-4 uppercase text-sm">Tabla de Clasificación</h3>
                    <div className="space-y-4">
                        {others.map((team, idx) => (
                            <div key={team.id} className="flex justify-between items-center bg-black/40 p-3 rounded border border-red-900/30">
                                <div className="flex items-center gap-4"><span className="text-gray-500 font-mono">#{idx + 2}</span><span className="text-xl text-gray-200">{team.name}</span></div>
                                <span className="text-2xl text-yellow-600 font-bold">{team.score} pts</span>
                            </div>
                        ))}
                    </div>
                </div>
            </NeonFrame>
            <Button onClick={() => window.location.reload()} variant="secondary" className="mt-12 flex gap-2 items-center"><RotateCcw size={20} /> REINICIAR JUEGO</Button>
        </div>
    )
  };

  return (
    <main className="min-h-screen w-full bg-neutral-900 text-white font-sans overflow-x-hidden relative selection:bg-red-500 selection:text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-black to-black z-0 pointer-events-none" />
      <div className="fixed inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[1] bg-[length:100%_2px,3px_100%] pointer-events-none" />
      {phase === 'START' && renderStartScreen()}
      {phase === 'TEAMS' && renderTeamSetup()}
      {phase === 'PREP' && renderPrepScreen()}
      {phase === 'QUIZ' && renderQuiz()}
      {phase === 'RANKING' && renderRanking()}
    </main>
  );
};

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error("Could not find root element to mount to");
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
