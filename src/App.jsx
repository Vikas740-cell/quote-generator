import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { 
  Quote as QuoteIcon, 
  RefreshCw, 
  Copy, 
  Twitter, 
  Moon, 
  Sun,
  Layout
} from "lucide-react";
import Background from "./components/Background";
import QuoteCard from "./components/QuoteCard";

const API_URL = "https://api.quotable.io/random";
const FALLBACK_QUOTES = [
  { content: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { content: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
  { content: "Your time is limited, so don't waste it living someone else's life.", author: "Steve Jobs" },
  { content: "Stay hungry, stay foolish.", author: "Steve Jobs" },
  { content: "Design is not just what it looks like and feels like. Design is how it works.", author: "Steve Jobs" }
];

function App() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return !window.matchMedia("(prefers-color-scheme: light)").matches;
    }
    return true;
  });
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchQuote = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      const response = await axios.get(API_URL);
      setQuote(response.data);
    } catch (err) {
      console.error("Failed to fetch quote:", err);
      const randomFallback = FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)];
      setQuote(randomFallback);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuote();
  }, [fetchQuote]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const copyToClipboard = () => {
    if (quote) {
      navigator.clipboard.writeText(`${quote.content} — ${quote.author}`);
      // You could add a toast notification here
    }
  };

  const shareOnTwitter = () => {
    if (quote) {
      const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote.content}" — ${quote.author}`)}`;
      window.open(url, "_blank");
    }
  };

  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center p-6 relative overflow-hidden bg-mesh transition-colors duration-700 ${isDark ? 'dark' : 'light'}`}>
      <Background isDark={isDark} />
      
      {/* Header / Theme Toggle */}
      <Motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="absolute top-8 right-8 z-50"
      >
        <button 
          onClick={toggleTheme}
          className="p-3 rounded-2xl glass transition-all hover:scale-110 active:scale-95 group"
          aria-label="Toggle Theme"
        >
          {isDark ? (
            <Sun className="w-5 h-5 text-yellow-400 group-hover:rotate-45 transition-transform" />
          ) : (
            <Moon className="w-5 h-5 text-indigo-600 group-hover:-rotate-12 transition-transform" />
          )}
        </button>
      </Motion.div>

      <main className="w-full max-w-2xl z-10">
        <AnimatePresence mode="wait">
          {loading ? (
            <Motion.div
              key="loader"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="relative w-16 h-16">
                 <Motion.div 
                   animate={{ rotate: 360 }}
                   transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                   className="w-full h-full border-4 border-primary/20 border-t-primary rounded-full"
                 />
                 <QuoteIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-primary" />
              </div>
              <span className="text-sm font-medium text-muted-foreground animate-pulse">Collecting wisdom...</span>
            </Motion.div>
          ) : (
            <QuoteCard 
              quote={quote} 
              onNewQuote={fetchQuote} 
              onCopy={copyToClipboard} 
              onShare={shareOnTwitter} 
            />
          )}
        </AnimatePresence>
      </main>

      <footer className="absolute bottom-8 text-sm text-muted-foreground font-medium z-10">
         <Motion.p
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 1 }}
         >
           Made with <span className="text-red-500 animate-pulse">❤️</span> by Vikas
         </Motion.p>
      </footer>
    </div>
  );
}

export default App;
