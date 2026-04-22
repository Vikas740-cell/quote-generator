import React, { useState } from "react";
import { motion as Motion } from "framer-motion";
import { 
  Quote as QuoteIcon, 
  RefreshCw, 
  Copy, 
  Twitter, 
  CheckCircle2,
  Share2
} from "lucide-react";

const QuoteCard = ({ quote, onNewQuote, onCopy, onShare }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ scale: 1.01 }}
      className="glass p-8 md:p-12 rounded-[2.5rem] relative group"
    >
      {/* Decorative Icon */}
      <div className="absolute -top-6 -left-6 w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-xl shadow-primary/30 group-hover:rotate-12 transition-transform duration-500">
        <QuoteIcon className="w-8 h-8 text-white fill-white/20" />
      </div>

      {/* Quote Content */}
      <div className="space-y-8">
        <Motion.div 
          key={quote?.content}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative"
        >
          <p className="text-2xl md:text-4xl font-semibold leading-relaxed tracking-tight text-foreground/90 italic">
            "{quote?.content}"
          </p>
        </Motion.div>

        <Motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-end gap-3"
        >
          <div className="h-[1px] w-12 bg-primary/30" />
          <p className="text-lg md:text-xl font-medium text-muted-foreground">
            {quote?.author || "Unknown"}
          </p>
        </Motion.div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-foreground/5">
          <div className="flex gap-3">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-foreground/5 hover:bg-foreground/10 text-foreground transition-all active:scale-95 border border-foreground/5"
              title="Copy to clipboard"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <span className="font-semibold text-sm">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5 opacity-70" />
                  <span className="font-semibold text-sm">Copy</span>
                </>
              )}
            </button>

            <button
              onClick={onShare}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-foreground/5 hover:bg-foreground/10 text-foreground transition-all active:scale-95 border border-foreground/5"
              title="Share on Twitter"
            >
              <Twitter className="w-5 h-5 text-[#1DA1F2]" />
              <span className="font-semibold text-sm">Share</span>
            </button>
          </div>

          <button
            onClick={onNewQuote}
            className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:scale-[1.02] transition-all active:scale-95 group font-bold tracking-wide"
          >
            <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-700" />
            New Quote
          </button>
        </div>
      </div>

      {/* Subtle Bottom Glow */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-2/3 h-20 bg-primary/20 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
    </Motion.div>
  );
};

export default QuoteCard;
