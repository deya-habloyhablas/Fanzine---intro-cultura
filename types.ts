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
  imageSrc?: string; // URL to the image
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
    imageSrc: 'https://i.imgur.com/example_botin_placeholder.jpg', // Placeholder, creates logic for Botin
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
    imageSrc: 'https://i.imgur.com/example_nuria_placeholder.jpg', // Placeholder for Nuria Mora
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