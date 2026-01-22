import { motion } from "framer-motion";
import { useState } from "react";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const sampleQueries = [
  "Show stars with periodic dimming in the last 5 years",
  "Find exoplanets within 100 light-years",
  "Compare brightness data for Proxima Centauri",
  "List anomalies detected this month",
];

const mockConversation = [
  {
    role: "user",
    content: "Show me stars with periodic dimming patterns",
  },
  {
    role: "assistant",
    content: "I found **847 stars** with periodic dimming patterns in your datasets. The most notable ones include:\n\n• **KIC 8462852** (Tabby's Star) - Irregular dimming up to 22%\n• **TRAPPIST-1** - 7 transiting planets detected\n• **HD 140283** - Ancient star with subtle variations\n\nWould you like me to generate a visualization or export this data?",
  },
];

export function ChatbotSection() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState(mockConversation);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    setMessages([...messages, { role: "user", content: inputValue }]);
    setInputValue("");
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "I'm analyzing your query. In a full implementation, I would search your astronomical datasets and provide relevant insights with visualizations.",
      }]);
    }, 1000);
  };

  return (
    <section id="chatbot" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-primary text-sm font-medium tracking-wider uppercase">
            <Bot className="w-4 h-4" />
            AI Chatbot
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-4 mb-6">
            Ask Your <span className="text-gradient-cosmic">Data Anything</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Query your astronomical datasets using natural language. Get instant 
            insights, visualizations, and data exports.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {/* Chat Window */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card-cosmic rounded-2xl overflow-hidden"
          >
            {/* Chat Header */}
            <div className="bg-secondary/50 px-6 py-4 border-b border-border flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-semibold">AstroFusion AI</h3>
                <p className="text-xs text-muted-foreground">Natural language data querying</p>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-xs text-muted-foreground">Online</span>
              </div>
            </div>

            {/* Messages */}
            <div className="p-6 space-y-6 max-h-96 overflow-y-auto">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex gap-3 ${message.role === "user" ? "justify-end" : ""}`}
                >
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                  )}
                  
                  <div className={`max-w-md px-4 py-3 rounded-2xl ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-secondary/50 text-foreground rounded-bl-sm"
                  }`}>
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                  </div>
                  
                  {message.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                      <User className="w-4 h-4 text-accent" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask about your astronomical data..."
                  className="flex-1 h-12 px-4 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-foreground placeholder:text-muted-foreground"
                />
                <Button variant="cosmic" size="icon" className="h-12 w-12" onClick={handleSend}>
                  <Send className="w-5 h-5" />
                </Button>
              </div>
              
              {/* Quick Queries */}
              <div className="flex flex-wrap gap-2 mt-4">
                {sampleQueries.map((query, index) => (
                  <button
                    key={index}
                    onClick={() => setInputValue(query)}
                    className="text-xs px-3 py-1.5 rounded-full bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  >
                    {query}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
