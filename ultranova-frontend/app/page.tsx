"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  TrendingUp,
  AlertTriangle,
  Target,
  MessageCircle,
  Eye,
  Map,
  Users,
  Shield,
  CheckCircle,
  Zap,
  Rocket,
  Sun,
  Moon,
} from "lucide-react";

declare global {
  interface Window {
    puter: any;
  }
}

export default function Home() {
  const [idea, setIdea] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("vision");
  const [darkMode, setDarkMode] = useState(true);
  const [recentSearches, setRecentSearches] = useState<Array<{idea: string, timestamp: string}>>([]);
    const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([
  { role: 'assistant', content: "👋 Hi! I'm your founder assistant. Ask me anything about your startup!" }
]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  // Advanced settings state
  const [personality, setPersonality] = useState("Aggressive");
  const [runway, setRunway] = useState("7");
  const [clarity, setClarity] = useState("Clear ✓");

  useEffect(() => {
  const saved = localStorage.getItem('recentSearches');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        setRecentSearches(parsed);
      }
    } catch (e) {
      console.error("Failed to parse recent searches", e);
    }
  }
}, []);

  // Theme classes based on darkMode
  const theme = {
    bg: darkMode ? "bg-[#030014]" : "bg-gray-50",
    text: darkMode ? "text-white" : "text-gray-900",
    textMuted: darkMode ? "text-white/60" : "text-gray-500",
    textMutedLighter: darkMode ? "text-white/40" : "text-gray-400",
    border: darkMode ? "border-white/10" : "border-gray-200",
    cardBg: darkMode ? "bg-white/5" : "bg-white",
    cardBorder: darkMode ? "border-white/10" : "border-gray-200",
    inputBg: darkMode ? "bg-[#0a0a1a]" : "bg-white",
    inputBorder: darkMode ? "border-white/10" : "border-gray-300",
    tabBg: darkMode ? "bg-white/5" : "bg-gray-100",
    tabBorder: darkMode ? "border-white/10" : "border-gray-200",
    tabActive: darkMode ? "bg-white/10" : "bg-gray-200",
    tabInactive: darkMode ? "text-white/60" : "text-gray-500",
    badgeBg: darkMode ? "bg-indigo-500/20" : "bg-indigo-100",
    badgeText: darkMode ? "text-indigo-300" : "text-indigo-600",
    progressBg: darkMode ? "bg-white/10" : "bg-gray-200",
  };

const analyze = () => {
  setLoading(true);
  
  setTimeout(() => {
    try {
      const ideaLower = idea.toLowerCase();
      
      // Base confidence affected by clarity and personality
      let baseConfidence = 75;
      
      // Adjust for clarity
      if (clarity.includes("Clear")) baseConfidence += 10;
      if (clarity.includes("Fuzzy")) baseConfidence += 0;
      if (clarity.includes("Undefined")) baseConfidence -= 10;
      
      // Adjust for personality
      if (personality === "Aggressive") baseConfidence += 5;
      if (personality === "Conservative") baseConfidence -= 5;
      
      // Adjust for runway (more runway = more confidence)
      const runwayNum = parseInt(runway) || 7;
      baseConfidence += Math.floor(runwayNum / 3);
      
      // Cap at reasonable range
      baseConfidence = Math.min(95, Math.max(40, baseConfidence));
      
      // Generate dynamic vision and decision based on idea
      let visionText = "Build a focused solution for " + idea;
      let confidenceScore = baseConfidence;
      let decisionText = confidenceScore > 70 ? "Proceed" : "Pivot";
      let decisionDesc = "";
      
      // Customize based on idea content
      if (ideaLower.includes("ai") || ideaLower.includes("artificial")) {
        visionText = "Democratize AI access for small businesses";
        confidenceScore = Math.min(95, baseConfidence + 7);
      } else if (ideaLower.includes("edu") || ideaLower.includes("learn") || ideaLower.includes("education")) {
        visionText = "Revolutionize personalized learning through technology";
        confidenceScore = Math.min(95, baseConfidence + 3);
      } else if (ideaLower.includes("health") || ideaLower.includes("wellness") || ideaLower.includes("mental")) {
        visionText = "Make mental wellness accessible to everyone";
        confidenceScore = Math.min(95, baseConfidence + 10);
      } else if (ideaLower.includes("food") || ideaLower.includes("restaurant")) {
        visionText = "Connect local food lovers with unique dining experiences";
        confidenceScore = Math.min(95, baseConfidence - 5);
      }
      
      // Generate decision description based on settings
      if (confidenceScore > 80) {
        decisionDesc = `High confidence. ${personality} approach with ${clarity} product vision.`;
      } else if (confidenceScore > 60) {
        decisionDesc = `Moderate potential. Consider more validation given ${clarity} clarity.`;
      } else {
        decisionDesc = `Proceed with caution. ${personality} strategy may need adjustment.`;
      }
      
      // Generate team scores based on idea and settings
      let marketingScore = 70 + (personality === "Aggressive" ? 5 : personality === "Conservative" ? -5 : 0);
      let salesScore = 70;
      let productScore = clarity.includes("Clear") ? 85 : clarity.includes("Fuzzy") ? 70 : 55;
      let techScore = runwayNum > 12 ? 90 : runwayNum > 6 ? 80 : 70;
      let opsScore = 80;
      
      // Adjust based on idea type
      if (ideaLower.includes("ai") || ideaLower.includes("tech")) {
        techScore += 15;
        marketingScore -= 5;
      } else if (ideaLower.includes("edu")) {
        productScore += 10;
        salesScore += 5;
      } else if (ideaLower.includes("health")) {
        opsScore += 10;
        productScore += 5;
      }
      
      // Keep scores in range
      marketingScore = Math.min(100, Math.max(30, marketingScore));
      salesScore = Math.min(100, Math.max(30, salesScore));
      productScore = Math.min(100, Math.max(30, productScore));
      techScore = Math.min(100, Math.max(30, techScore));
      opsScore = Math.min(100, Math.max(30, opsScore));
      
      setResult({
        vision: visionText,
        roadmap: {
          now: ["Market research", "User interviews", "Build prototype"],
          next: ["Launch MVP", "Get first 100 users", "Iterate based on feedback"],
          later: ["Scale to new markets", "Series A funding", "Expand team"]
        },
        decision: {
          chosen: decisionText,
          confidence: confidenceScore / 100,
          description: decisionDesc
        },
        teams: [
          { name: "Marketing", score: marketingScore },
          { name: "Sales", score: salesScore },
          { name: "Product", score: productScore },
          { name: "Tech", score: techScore },
          { name: "Ops", score: opsScore }
        ],
        teamEvaluations: [
          { name: "Marketing", score: Math.min(100, marketingScore + Math.floor(Math.random() * 10) - 5) },
          { name: "Product", score: Math.min(100, productScore + Math.floor(Math.random() * 10) - 5) },
          { name: "Operations", score: Math.min(100, opsScore + Math.floor(Math.random() * 10) - 5) },
          { name: "Sales", score: Math.min(100, salesScore + Math.floor(Math.random() * 10) - 5) },
          { name: "Tech", score: Math.min(100, techScore + Math.floor(Math.random() * 10) - 5) }
        ],
        metrics: {
          decisionConfidence: confidenceScore,
          teamConfidence: Math.round((marketingScore + salesScore + productScore + techScore + opsScore) / 5),
          conflictMode: confidenceScore > 80 ? "ALIGNED" : confidenceScore > 60 ? "NEUTRAL" : "CAUTION",
          hardTruths: Math.floor(Math.random() * 3)
        }
      });
      saveSearch(idea);
      
    } catch (error) {
      console.error("Analysis error:", error);
    } finally {
      setLoading(false);
    }
  }, 1500);
};

const saveSearch = (searchedIdea: string) => {
  if (!searchedIdea.trim()) return;
  
  const newSearch = {
    idea: searchedIdea,
    timestamp: new Date().toISOString()
  };
  
  // Remove any existing entry with SAME idea (case insensitive)
  const filtered = recentSearches.filter(
    item => item.idea.toLowerCase() !== searchedIdea.toLowerCase()
  );
  
  // Add new search at the beginning, keep only 8 total
  const updatedSearches = [newSearch, ...filtered].slice(0, 8);
  
  setRecentSearches(updatedSearches);
  localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
};

const sendChatMessage = async (message: string) => {
  try {
    // Load Puter.js if not already loaded
    if (typeof window !== 'undefined' && !window.puter) {
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://js.puter.com/v2/';
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Check if Puter is available
    if (!window.puter?.ai) {
      throw new Error("Puter AI not available");
    }

    // Get response from Puter
    const result = await window.puter.ai.chat(message, {
      model: "gpt-4o-mini",
      system: "You are a professional startup advisor. Give concise, practical advice. Keep responses under 3 sentences."
    });
    
    // Extract the text - handle both string and object responses
    let responseText = "";
    if (typeof result === 'string') {
      responseText = result;
    } else if (result && typeof result === 'object') {
      // Try to extract message from common response formats
      responseText = result.message?.content || 
                     result.choices?.[0]?.message?.content || 
                     result.response || 
                     result.text || 
                     "Thanks for your question! Let me help with your startup.";
    }
    
    return responseText;
  } catch (error) {
    console.error('Chat error:', error);
    
    // 100% WORKING FALLBACK - NO API NEEDED
    const q = message.toLowerCase();
    
    const responses = {
      cookie: "For a cookies startup: Start with 3 signature flavors. Test at local markets. Price at $3-5. Build Instagram presence daily. Partner with coffee shops.",
      ai: "AI startup: Solve ONE specific problem. Use existing APIs for MVP. Your value is domain expertise, not the model. Focus on data moats.",
      fintech: "Fintech: Compliance first. Start narrow (e.g., budgeting for freelancers). Partner with regulated bank. Security audits early.",
      health: "Healthtech: Understand FDA path before coding. Pilot with one clinic. HIPAA mandatory. Sales cycles 12-18 months.",
      edu: "EdTech: Teachers are users, admins buyers. Free for teachers, charge schools. Content quality > features. Partner with districts.",
      saas: "SaaS: Find 10 paying customers before building. Focus on activation rate. Price based on value. $10k MRR before raising.",
      market: "Market size: TAM = total market. SAM = you can reach. SOM = you can get. Be conservative.",
      competitor: "List top 5 competitors. Find what they MISS. Be 10x better for ONE use case. Talk to their customers.",
      fund: "Pre-seed: $100-500k angels. Seed: $1-3M VCs with traction. Series A: $5-15M proven model. Raise when you DON'T need it.",
      runway: "Monthly burn = all expenses. Aim for 18 months minimum. Raise enough to reach next milestone.",
      team: "Technical + business co-founder ideal. First 5 hires: attitude over experience. 4-year vesting with 1-year cliff.",
      mvp: "MVP = simplest thing that delivers value. Launch in 4-6 weeks max. If longer, you're overbuilding."
    };
    
    for (const [key, value] of Object.entries(responses)) {
      if (q.includes(key)) return value;
    }
    
    return "I can help with: 🍪 Food startups, 🤖 AI, 💰 Fintech, 🏥 Healthtech, 📚 EdTech, 💻 SaaS, 📊 Market size, 🏆 Competitors, 💵 Fundraising, ⏱️ Runway, 👥 Team building, 🛠️ MVP. What interests you?";
  }
};

const handleSendMessage = async () => {
  if (!chatInput.trim()) return;
  
  const userMessage = chatInput;
  setChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);
  setChatInput('');
  setChatLoading(true);
  
  const aiResponse = await sendChatMessage(userMessage);
  
  setChatMessages(prev => [...prev, { 
    role: 'assistant', 
    content: aiResponse 
  }]);
  setChatLoading(false);
};

// Helper functions for dynamic stats
const getMarketSize = (idea: string) => {
  const ideaLower = idea.toLowerCase();
  if (ideaLower.includes("ai") || ideaLower.includes("artificial")) return "$5.2B";
  if (ideaLower.includes("edu") || ideaLower.includes("learn")) return "$2.8B";
  if (ideaLower.includes("health") || ideaLower.includes("wellness")) return "$4.1B";
  if (ideaLower.includes("food") || ideaLower.includes("restaurant")) return "$3.2B";
  if (ideaLower.includes("fin") || ideaLower.includes("bank")) return "$7.5B";
  if (ideaLower.includes("game") || ideaLower.includes("gaming")) return "$1.9B";
  if (ideaLower.includes("social") || ideaLower.includes("community")) return "$3.6B";
  return "$2.4B"; // default
};

const getCompetitors = (idea: string) => {
  const ideaLower = idea.toLowerCase();
  if (ideaLower.includes("ai") || ideaLower.includes("artificial")) return "24";
  if (ideaLower.includes("edu") || ideaLower.includes("learn")) return "15";
  if (ideaLower.includes("health") || ideaLower.includes("wellness")) return "18";
  if (ideaLower.includes("food") || ideaLower.includes("restaurant")) return "32";
  if (ideaLower.includes("fin") || ideaLower.includes("bank")) return "28";
  if (ideaLower.includes("game") || ideaLower.includes("gaming")) return "42";
  if (ideaLower.includes("social") || ideaLower.includes("community")) return "22";
  return "12"; // default
};

const getGrowthRate = (idea: string) => {
  const ideaLower = idea.toLowerCase();
  if (ideaLower.includes("ai") || ideaLower.includes("artificial")) return "32%";
  if (ideaLower.includes("edu") || ideaLower.includes("learn")) return "18%";
  if (ideaLower.includes("health") || ideaLower.includes("wellness")) return "22%";
  if (ideaLower.includes("food") || ideaLower.includes("restaurant")) return "12%";
  if (ideaLower.includes("fin") || ideaLower.includes("bank")) return "15%";
  if (ideaLower.includes("game") || ideaLower.includes("gaming")) return "24%";
  if (ideaLower.includes("social") || ideaLower.includes("community")) return "28%";
  return "18%"; // default
};

const getTimeToMarket = (runway: number, clarity: string, personality: string) => {
  // Base time depends on runway
  let months = Math.max(3, Math.min(12, Math.floor(runway / 2)));
  
  // Adjust based on clarity
  if (clarity.includes("Clear")) months -= 1;
  if (clarity.includes("Fuzzy")) months += 1;
  if (clarity.includes("Undefined")) months += 2;
  
  // Adjust based on personality
  if (personality === "Aggressive") months -= 1;
  if (personality === "Conservative") months += 1;
  
  // Keep within reasonable range
  months = Math.max(2, Math.min(12, months));
  
  return `${months} mo`;
};

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} font-sans antialiased relative overflow-hidden transition-colors duration-300`}>
      {/* Background glow - only show in dark mode */}
      {darkMode && (
        <div className="fixed inset-0 -z-10">
          <div className="absolute top-20 left-10 w-2 h-2 bg-white rounded-full opacity-20" />
          <div className="absolute top-40 right-20 w-1 h-1 bg-white rounded-full opacity-20" />
          <div className="absolute bottom-40 left-20 w-2 h-2 bg-white rounded-full opacity-20" />
          <div className="absolute bottom-20 right-40 w-1 h-1 bg-white rounded-full opacity-20" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-purple-600/15 blur-[200px] rounded-full" />
          <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-indigo-600/15 blur-[200px] rounded-full" />
        </div>
      )}

      {/* Header */}
      <header className={`flex justify-between items-center px-6 md:px-12 py-6 border-b ${theme.border}`}>
        <div className="flex items-center gap-2">
          <Rocket className={`w-6 h-6 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
          <span className="text-xl font-semibold">UltraNova</span>
          <span className={`text-xl font-semibold ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>FOUNDER OS</span>
        </div>
        
        {/* Theme Toggle Button */}
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className={`px-5 py-2 rounded-full ${theme.cardBg} ${theme.cardBorder} backdrop-blur-sm hover:bg-opacity-20 transition text-sm flex items-center gap-2`}
        >
          {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </header>

      {/* Hero */}
      <section className="flex flex-col items-center text-center px-4 pt-16 pb-8">
        <div className={`mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full ${theme.cardBg} ${theme.cardBorder} backdrop-blur-sm text-sm ${darkMode ? 'text-purple-300' : 'text-purple-600'}`}>
          <Zap className="w-4 h-4" />
          AI-Powered Founder Intelligence
        </div>
        <h1 className="text-5xl md:text-6xl font-semibold leading-tight max-w-4xl">
          Turn your idea into a{" "}
          <span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            strategic blueprint
          </span>
        </h1>
        <p className={`mt-6 ${theme.textMuted} max-w-2xl text-lg`}>
          Enter your startup concept and let UltraNova's AI engine generate
          vision, roadmap, team analysis, and confidence-scored decisions.
        </p>

        {/* Input + Advanced Settings */}
        <div className="mt-10 w-full max-w-4xl">
          <div className={`flex items-center ${theme.inputBg} ${theme.inputBorder} rounded-full px-6 py-3 shadow-xl`}>
            <input
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="e.g., Education Platform"
              className={`flex-1 bg-transparent outline-none ${theme.text} placeholder:${theme.textMutedLighter}`}
            />
           <button
  onClick={analyze}  // ← analyze() should ONLY be here
  disabled={loading}
  className="ml-4 px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:opacity-90 transition disabled:opacity-50 text-white font-medium whitespace-nowrap"
>
  {loading ? "Analyzing..." : "Analyze →"}
</button>
          </div>

          {/* Example suggestion */}
          <div className={`mt-3 text-left text-sm ${theme.textMutedLighter} px-2 flex items-center gap-2`}>
            <span className={darkMode ? 'text-indigo-400' : 'text-indigo-600'}>Education Platform</span>
          </div>

          {/* Advanced Settings */}
          <div className="mt-6 text-left">
            <div className={`text-sm ${theme.textMuted} mb-3 px-2 flex items-center gap-2`}>
              <Shield className="w-4 h-4" />
              Advanced Settings
            </div>
            <div className="flex flex-wrap items-center gap-4">
      {/* PERSONALITY - Fixed Version */}
<div className={`flex items-center gap-2 ${theme.cardBg} ${theme.cardBorder} rounded-full px-4 py-2 backdrop-blur-sm`}>
  <span className={`${theme.textMuted} text-xs`}>PERSONALITY</span>
  <div className="relative inline-block">
    <select
      value={personality}
      onChange={(e) => setPersonality(e.target.value)}
      className="appearance-none bg-transparent outline-none text-sm pr-6 cursor-pointer"
      style={{ color: darkMode ? 'white' : 'black' }}
    >
      <option value="Aggressive" style={{ backgroundColor: darkMode ? '#0a0a1a' : '#f9fafb', color: darkMode ? 'white' : 'black' }}>Aggressive</option>
      <option value="Balanced" style={{ backgroundColor: darkMode ? '#0a0a1a' : '#f9fafb', color: darkMode ? 'white' : 'black' }}>Balanced</option>
      <option value="Conservative" style={{ backgroundColor: darkMode ? '#0a0a1a' : '#f9fafb', color: darkMode ? 'white' : 'black' }}>Conservative</option>
    </select>
    <ChevronDown className={`absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 ${theme.textMuted} pointer-events-none`} />
  </div>
</div>

              {/* RUNWAY (MONTHS) */}
              <div className={`flex items-center gap-2 ${theme.cardBg} ${theme.cardBorder} rounded-full px-4 py-2 backdrop-blur-sm`}>
                <span className={`${theme.textMuted} text-xs`}>RUNWAY (MONTHS)</span>
                <input
                  type="number"
                  value={runway}
                  onChange={(e) => setRunway(e.target.value)}
                  className={`w-16 bg-transparent outline-none ${theme.text} text-sm`}
                />
                <span className={`${theme.textMutedLighter} text-xs`}>Build, test, review</span>
              </div>

              {/* PRODUCT CLARITY */}
<div className={`flex items-center gap-2 ${theme.cardBg} ${theme.cardBorder} rounded-full px-4 py-2 backdrop-blur-sm`}>
  <span className={`${theme.textMuted} text-xs`}>PRODUCT CLARITY</span>
  <select
    value={clarity}
    onChange={(e) => setClarity(e.target.value)}
    className={`bg-transparent outline-none ${theme.text} text-sm [&>option]:bg-[#0a0a1a] [&>option]:text-white`}
    style={{ color: darkMode ? 'white' : 'black' }}
  >
    <option value="Clear ✓" className={darkMode ? 'bg-[#0a0a1a] text-white' : 'bg-white text-black'}>Clear ✓</option>
    <option value="Fuzzy" className={darkMode ? 'bg-[#0a0a1a] text-white' : 'bg-white text-black'}>Fuzzy</option>
    <option value="Undefined" className={darkMode ? 'bg-[#0a0a1a] text-white' : 'bg-white text-black'}>Undefined</option>
  </select>
  <span className={`${theme.textMutedLighter} text-xs`}>Product direction is defined</span>
</div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="px-4 pb-16 max-w-7xl mx-auto"
          >
            {/* Metric Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              <MetricCard
                icon={<Brain className="w-5 h-5" />}
                label="DECISION CONFIDENCE"
                value={`${result.metrics.decisionConfidence}%`}
                sub="Proceed"
                theme={theme}
                darkMode={darkMode}
              />
              <MetricCard
                icon={<TrendingUp className="w-5 h-5" />}
                label="TEAM CONFIDENCE"
                value={`${result.metrics.teamConfidence}%`}
                sub="Across all teams"
                theme={theme}
                darkMode={darkMode}
              />
              <MetricCard
                icon={<AlertTriangle className="w-5 h-5" />}
                label="CONFLICT MODE"
                value={result.metrics.conflictMode}
                sub="Teams aligned"
                theme={theme}
                darkMode={darkMode}
              />
              <MetricCard
                icon={<Target className="w-5 h-5" />}
                label="HARD TRUTHS"
                value={result.metrics.hardTruths.toString()}
                sub="No warnings"
                theme={theme}
                darkMode={darkMode}
              />
            </div>

{/* Quick Stats Row */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
  {/* Market Size */}
  <div className={`p-4 ${theme.cardBg} ${theme.cardBorder} rounded-xl text-center backdrop-blur-sm`}>
    <div className={`text-xs ${theme.textMuted} mb-1`}>Market Size</div>
    <div className="text-xl font-bold text-green-400">
      {idea.trim() === "" ? "$0" : getMarketSize(idea)}
    </div>
    <div className={`text-xs ${theme.textMutedLighter} mt-1`}>TAM</div>
  </div>
  
  {/* Competitors */}
  <div className={`p-4 ${theme.cardBg} ${theme.cardBorder} rounded-xl text-center backdrop-blur-sm`}>
    <div className={`text-xs ${theme.textMuted} mb-1`}>Competitors</div>
    <div className="text-xl font-bold text-yellow-400">
      {idea.trim() === "" ? "0" : getCompetitors(idea)}
    </div>
    <div className={`text-xs ${theme.textMutedLighter} mt-1`}>Direct</div>
  </div>
  
  {/* Growth Rate */}
  <div className={`p-4 ${theme.cardBg} ${theme.cardBorder} rounded-xl text-center backdrop-blur-sm`}>
    <div className={`text-xs ${theme.textMuted} mb-1`}>Growth Rate</div>
    <div className="text-xl font-bold text-green-400">
      {idea.trim() === "" ? "0%" : getGrowthRate(idea)}
    </div>
    <div className={`text-xs ${theme.textMutedLighter} mt-1`}>YoY</div>
  </div>
  
  {/* Time to Market */}
  <div className={`p-4 ${theme.cardBg} ${theme.cardBorder} rounded-xl text-center backdrop-blur-sm`}>
    <div className={`text-xs ${theme.textMuted} mb-1`}>Time to Market</div>
    <div className="text-xl font-bold text-indigo-400">
      {idea.trim() === "" ? "0 mo" : getTimeToMarket(parseInt(runway), clarity, personality)}
    </div>
    <div className={`text-xs ${theme.textMutedLighter} mt-1`}>MVP ready</div>
  </div>
</div>

            {/* Tabs */}
            <div className="flex justify-center mb-8">
              <div className={`flex gap-2 ${theme.tabBg} ${theme.tabBorder} rounded-full px-2 py-2 backdrop-blur-xl`}>
                {[
                  { id: "vision", icon: <Eye className="w-4 h-4" /> },
                  { id: "roadmap", icon: <Map className="w-4 h-4" /> },
                  { id: "decision", icon: <Target className="w-4 h-4" /> },
                  { id: "teams", icon: <Users className="w-4 h-4" /> },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-2 rounded-full capitalize text-sm transition flex items-center gap-2 ${
                      activeTab === tab.id
                        ? theme.tabActive + " " + theme.text
                        : theme.tabInactive
                    }`}
                  >
                    {tab.icon}
                    {tab.id}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* Left Column (Tab Content) */}
              <div className="md:col-span-2 space-y-6">
                {activeTab === "vision" && (
                  <VisionPanel vision={result.vision} theme={theme} darkMode={darkMode} />
                )}
                {activeTab === "roadmap" && (
                  <RoadmapPanel roadmap={result.roadmap} theme={theme} darkMode={darkMode} />
                )}
                {activeTab === "decision" && (
                  <DecisionPanel decision={result.decision} theme={theme} darkMode={darkMode} />
                )}
                {activeTab === "teams" && (
                  <TeamsPanel evaluations={result.teamEvaluations} theme={theme} darkMode={darkMode} />
                )}
              </div>

              {/* Right Column (Always visible on desktop) */}
              <div className="hidden md:block space-y-6">
                <DecisionSummaryCard decision={result.decision} theme={theme} darkMode={darkMode} />
                <TeamScoresCard teams={result.teams} theme={theme} darkMode={darkMode} />
              </div>
            </div>

                    {/* Mobile bottom sections */}
          <div className="md:hidden mt-8 space-y-6">
            {result && <TeamScoresCard teams={result.teams} theme={theme} darkMode={darkMode} />}
          </div>
        </motion.div>
      )}
    </AnimatePresence>

{/* RECENT ANALYSES - HORIZONTAL WITH ICON */}
{recentSearches && recentSearches.length > 0 && (
  <div className={`mt-10 p-6 ${theme.cardBg} ${theme.cardBorder} backdrop-blur-xl rounded-2xl`}>
    <div className="flex items-center gap-2 mb-4">
      <Zap className={`w-5 h-5 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
      <h3 className={`text-lg font-semibold ${theme.text}`}>Recent Analyses</h3>
    </div>
    
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {recentSearches.slice(0, 4).map((item: any, i: number) => {
        // Calculate REAL time ago
        const searchDate = new Date(item.timestamp);
        const now = new Date();
        const diffMs = now.getTime() - searchDate.getTime();
        const diffMins = Math.floor(diffMs / (1000 * 60));
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        
        let timeAgo;
        if (diffMins < 1) timeAgo = 'Just now';
        else if (diffMins < 60) timeAgo = `${diffMins} min ago`;
        else if (diffHours < 24) timeAgo = `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
        else if (diffDays === 1) timeAgo = 'Yesterday';
        else timeAgo = `${diffDays} days ago`;
        
        return (
          <div
            key={i}
            onClick={() => setIdea(item.idea)}
            className={`p-4 ${theme.cardBg} border ${theme.border} rounded-xl hover:border-indigo-400 transition-colors cursor-pointer group`}
          >
            <div className={`font-medium ${theme.text} group-hover:text-indigo-400 transition-colors mb-2 truncate`}>
              {item.idea}
            </div>
            <div className={`text-sm ${theme.textMutedLighter}`}>
              {timeAgo}
            </div>
          </div>
        );
      })}
    </div>
    {recentSearches.length > 3 && (
  <div className="mt-3 text-right">
    <button
      onClick={() => {
        setRecentSearches([]);
        localStorage.removeItem('recentSearches');
      }}
      className={`text-xs ${theme.textMutedLighter} hover:text-red-400 transition-colors`}
    >
      Clear all
    </button>
  </div>
)}
  </div>
)}

        {/* Floating Chatbot Button */}
<motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
  onClick={() => setChatOpen(true)}
  className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 shadow-2xl flex items-center justify-center z-40 hover:shadow-indigo-500/25 transition-shadow"
>
  <MessageCircle className="w-6 h-6 text-white" />
</motion.button>

{/* Chatbot Panel */}
<AnimatePresence>
  {chatOpen && (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className="fixed bottom-24 right-6 w-80 md:w-96 z-50"
    >
      <div className={`${theme.cardBg} ${theme.cardBorder} rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl`}>
        
        {/* Header */}
        <div className={`p-4 border-b ${theme.border} flex justify-between items-center bg-gradient-to-r from-indigo-500/10 to-violet-500/10`}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className={`text-sm font-semibold ${theme.text}`}>Founder Assistant</h4>
              <p className={`text-xs ${theme.textMutedLighter}`}>Online • Startup Advisor</p>
            </div>
          </div>
          <button
            onClick={() => setChatOpen(false)}
            className={`p-1.5 rounded-full ${theme.cardBg} border ${theme.border} hover:border-indigo-400 transition-colors`}
          >
            <svg className={`w-4 h-4 ${theme.textMuted}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="h-80 overflow-y-auto p-4 space-y-3">
          {chatMessages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                msg.role === 'user' 
                  ? 'bg-indigo-500 text-white rounded-br-none' 
                  : `${theme.cardBg} border ${theme.border} ${theme.text} rounded-bl-none`
              }`}>
                {msg.content}
              </div>
            </motion.div>
          ))}
          
          {chatLoading && (
            <div className="flex justify-start">
              <div className={`${theme.cardBg} border ${theme.border} p-4 rounded-2xl`}>
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className={`p-4 border-t ${theme.border} bg-gradient-to-r from-indigo-500/5 to-violet-500/5`}>
          <div className="flex gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask about your startup..."
              className={`flex-1 px-4 py-2 ${theme.inputBg} border ${theme.inputBorder} rounded-xl text-sm ${theme.text} placeholder-${theme.textMutedLighter} outline-none focus:border-indigo-500/50 transition-colors`}
            />
            <button
              onClick={handleSendMessage}
              disabled={chatLoading}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-sm font-medium hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
          <p className={`text-xs ${theme.textMutedLighter} mt-2 text-center`}>
            Ask about runway, market size, competitors, fundraising, or strategy
          </p>
        </div>
      </div>
    </motion.div>
  )}
</AnimatePresence>
  </div>
);
}

// ---------- Reusable Components (Updated with theme props) ----------

function MetricCard({ icon, label, value, sub, theme, darkMode }: any) {
  // Determine color based on value
  const getValueColor = () => {
    if (label.includes("CONFIDENCE")) {
      const num = parseInt(value);
      if (num >= 80) return "text-green-400";
      if (num >= 60) return "text-yellow-400";
      return "text-red-400";
    }
    if (label.includes("CONFLICT")) {
      if (value === "ALIGNED") return "text-green-400";
      if (value === "NEUTRAL") return "text-yellow-400";
      return "text-red-400";
    }
    return theme.text;
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      className={`p-5 backdrop-blur-md ${theme.cardBg} ${theme.cardBorder} rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl`}
    >
      <div className={`flex items-center gap-2 ${darkMode ? 'text-indigo-300' : 'text-indigo-600'} mb-2 text-xs tracking-wider uppercase`}>
        {icon}
        <span>{label}</span>
      </div>
      <div className={`text-3xl font-bold ${getValueColor()}`}>{value}</div>
      {sub && <div className={`text-xs ${theme.textMutedLighter} mt-1 flex items-center gap-1`}>
        <span className="w-1 h-1 rounded-full bg-current opacity-50"></span>
        {sub}
      </div>}
    </motion.div>
  );
}



function VisionPanel({ vision, theme, darkMode }: any) {
  return (
    <div className={`${theme.cardBg} ${theme.cardBorder} backdrop-blur-xl rounded-2xl p-8`}>
      <div className={`flex items-center gap-2 text-xs ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} mb-3 tracking-wider`}>
        <Eye className="w-4 h-4" />
        STRATEGIC VISION
      </div>
      <h2 className={`text-2xl md:text-3xl font-semibold leading-relaxed ${theme.text}`}>“{vision}”</h2>
      <div className="flex flex-wrap gap-3 mt-6">
        <span className={`px-3 py-1 text-xs ${darkMode ? 'bg-indigo-500/20 text-indigo-300' : 'bg-indigo-100 text-indigo-600'} rounded-full flex items-center gap-1`}>
          <Brain className="w-3 h-3" />
          Strategy Agent
        </span>
        <span className={`px-3 py-1 text-xs ${theme.cardBg} ${theme.textMuted} rounded-full flex items-center gap-1`}>
          <CheckCircle className="w-3 h-3" />
          Founder-ready
        </span>
      </div>
    </div>
  );
}

function RoadmapPanel({ roadmap, theme, darkMode }: any) {
  const phases = [
    { key: "now", label: "IMMEDIATE", color: "bg-purple-500", icon: <Zap className="w-3 h-3" /> },
    { key: "next", label: "SHORT-TERM", color: "bg-cyan-400", icon: <TrendingUp className="w-3 h-3" /> },
    { key: "later", label: "LONG-TERM", color: "bg-orange-400", icon: <Target className="w-3 h-3" /> },
  ];
  return (
    <div className={`${theme.cardBg} ${theme.cardBorder} backdrop-blur-xl rounded-2xl p-8 space-y-8`}>
      {phases.map((phase) => (
        <div key={phase.key}>
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-3 h-3 rounded-full ${phase.color}`} />
            <span className={`text-sm ${theme.textMuted} tracking-wide flex items-center gap-1`}>
              {phase.icon}
              {phase.label}
            </span>
          </div>
          <div className="ml-6">
            {roadmap[phase.key].map((item: string, i: number) => (
              <div key={i} className={`${theme.textMuted} text-sm mb-1 flex items-center gap-2`}>
                <span className={`w-1 h-1 ${darkMode ? 'bg-indigo-400' : 'bg-indigo-600'} rounded-full`} />
                {item}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function DecisionPanel({ decision, theme, darkMode }: any) {
  return (
    <div className={`${theme.cardBg} ${theme.cardBorder} backdrop-blur-xl rounded-2xl p-8`}>
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="relative">
          <div className={`w-28 h-28 rounded-full border-4 ${darkMode ? 'border-indigo-500' : 'border-indigo-400'} flex items-center justify-center text-3xl font-semibold ${darkMode ? 'bg-indigo-500/10' : 'bg-indigo-50'}`}>
            {Math.round(decision.confidence * 100)}%
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <CheckCircle className="w-4 h-4" />
          </div>
        </div>
        <div className="text-center md:text-left">
          <h2 className={`text-3xl font-semibold mb-2 ${theme.text}`}>{decision.chosen}</h2>
          <p className={`${theme.textMuted} mb-4`}>{decision.description}</p>
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <span className={`px-3 py-1 text-xs ${darkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600'} rounded-full flex items-center gap-1`}>
              <Brain className="w-3 h-3" />
              Decision Engine
            </span>
            <span className={`px-3 py-1 text-xs ${darkMode ? 'bg-indigo-500/20 text-indigo-300' : 'bg-indigo-100 text-indigo-600'} rounded-full flex items-center gap-1`}>
              <Zap className="w-3 h-3" />
              Personality Applied
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function TeamsPanel({ evaluations, theme, darkMode }: any) {
  // Add type for evaluation item
  type EvaluationItem = {
    name: string;
    score: number;
  };
  
  // Sort by score for better visual
  const sortedEvals = [...evaluations].sort((a: EvaluationItem, b: EvaluationItem) => b.score - a.score);
  
  // Check if any team has low score
  const hasLowScore = evaluations.some((t: EvaluationItem) => t.score < 60);
  
  return (
    <div className={`${theme.cardBg} ${theme.cardBorder} backdrop-blur-xl rounded-2xl p-8`}>
      <h3 className={`text-lg font-semibold mb-6 flex items-center gap-2 ${theme.text}`}>
        <Users className={`w-5 h-5 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
        TEAM EVALUATIONS
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sortedEvals.map((team: EvaluationItem, index: number) => (
          <motion.div 
            key={team.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="space-y-2"
          >
            <div className="flex justify-between text-sm">
              <span className={theme.textMuted}>{team.name}</span>
              <span className={`font-medium ${
                team.score >= 80 ? 'text-green-400' : 
                team.score >= 60 ? 'text-yellow-400' : 
                'text-red-400'
              }`}>
                {team.score}% confirmed
              </span>
            </div>
            <div className={`w-full h-2.5 ${theme.progressBg} rounded-full overflow-hidden`}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${team.score}%` }}
                transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                className={`h-2.5 rounded-full ${
                  team.score >= 80 ? 'bg-gradient-to-r from-green-500 to-green-400' : 
                  team.score >= 60 ? 'bg-gradient-to-r from-yellow-500 to-yellow-400' : 
                  'bg-gradient-to-r from-red-500 to-red-400'
                }`}
              />
            </div>
          </motion.div>
        ))}
      </div>
      <div className={`mt-6 text-sm ${theme.textMutedLighter} flex items-center gap-2 p-3 ${theme.cardBg} rounded-lg`}>
        <AlertTriangle className="w-4 h-4" />
        Conflict Status: <span className={
          hasLowScore ? 'text-yellow-400' : 'text-green-400'
        }>
          {hasLowScore ? 'NEEDS ATTENTION' : 'ALIGNED'}
        </span>
      </div>
    </div>
  );
}

function DecisionSummaryCard({ decision, theme, darkMode }: any) {
  return (
    <div className={`${theme.cardBg} ${theme.cardBorder} backdrop-blur-xl rounded-2xl p-6`}>
      <div className={`flex items-center gap-2 text-xs ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} mb-3`}>
        <Target className="w-4 h-4" />
        DECISION SUMMARY
      </div>
      <div className={`text-green-400 font-semibold text-lg flex items-center gap-2`}>
        <CheckCircle className="w-5 h-5" />
        {decision.chosen}
      </div>
      <p className={`text-sm ${theme.textMuted} mt-2`}>{decision.description}</p>
      <div className={`flex items-center justify-between mt-4 text-sm pt-4 border-t ${theme.border}`}>
        <span className={`${theme.textMuted} flex items-center gap-1`}>
          <Zap className="w-4 h-4" />
          FINAL DECISION
        </span>
        <span className={`${theme.text} font-mono ${theme.cardBg} px-3 py-1 rounded-full`}>
          {Math.round(decision.confidence * 100)}%
        </span>
      </div>
    </div>
  );
}

function TeamScoresCard({ teams, theme, darkMode }: any) {
  // Add type for team item
  type TeamItem = {
    name: string;
    score: number;
  };
  
  const average = Math.round(teams.reduce((acc: number, t: TeamItem) => acc + t.score, 0) / teams.length);
  
  return (
    <div className={`${theme.cardBg} ${theme.cardBorder} backdrop-blur-xl rounded-2xl p-6`}>
      <div className="flex justify-between items-center mb-4">
        <div className={`flex items-center gap-2 text-xs ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
          <Users className="w-4 h-4" />
          TEAM SCORES
        </div>
        <div className={`text-sm font-semibold ${average >= 80 ? 'text-green-400' : average >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
          Avg: {average}%
        </div>
      </div>
      <div className="space-y-4">
        {teams.map((team: TeamItem, index: number) => (
          <motion.div 
            key={team.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex justify-between text-sm mb-1">
              <span className={theme.textMuted}>{team.name}</span>
              <span className={`${
                team.score >= 80 ? 'text-green-400' : 
                team.score >= 60 ? 'text-yellow-400' : 
                'text-red-400'
              }`}>
                {team.score}%
              </span>
            </div>
            <div className={`w-full h-2 ${theme.progressBg} rounded-full overflow-hidden`}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${team.score}%` }}
                transition={{ duration: 1, delay: 0.1 + index * 0.1 }}
                className={`h-2 rounded-full ${
                  team.score >= 80 ? 'bg-gradient-to-r from-purple-500 to-indigo-500' : 
                  team.score >= 60 ? 'bg-gradient-to-r from-indigo-500 to-blue-500' : 
                  'bg-gradient-to-r from-gray-500 to-gray-400'
                }`}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

