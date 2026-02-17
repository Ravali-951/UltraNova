"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket,
  Brain,
  Shield,
  TrendingUp,
  AlertTriangle,
  MessageCircle,
  CheckCircle,
  Zap,
  Sun,
  Eye,
  Map,
  Users,
  Globe,
  Briefcase,
  Package,
  Building2,
  DollarSign,
  ChevronUp,
  ChevronDown,
    Target,
} from "lucide-react";

export default function Home() {
  const [idea, setIdea] = useState("Education");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("vision");
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
  document.documentElement.classList.toggle("dark", darkMode);
}, [darkMode]);

  // Advanced settings state
  const [personality, setPersonality] = useState("Aggressive");
  const [runway, setRunway] = useState("7");
  const [clarity, setClarity] = useState("Clear ✓");

  const analyze = () => {
    setLoading(true);
    setTimeout(() => {
      setResult({
        vision: "Build a focused solution for Education",
        roadmap: {
          now: ["Validate"],
          next: ["Build"],
          later: ["Scale"],
        },
        decision: {
          chosen: "Proceed",
          confidence: 0.8,
          description:
            "Be direct: Founder-level decision based on clarity and risk",
        },
        teams: [
          { name: "Marketing", score: 70 },
          { name: "Sales", score: 70 },
          { name: "Product", score: 80 },
          { name: "Tech", score: 80 },
          { name: "Ops", score: 90 },
        ],
        teamEvaluations: [
          { name: "Marketing", score: 70 },
          { name: "Product", score: 60 },
          { name: "Operations", score: 50 },
          { name: "Sales", score: 70 },
          { name: "Tech", score: 60 },
        ],
        metrics: {
          decisionConfidence: 80,
          teamConfidence: 78,
          conflictMode: "ALIGNED",
          hardTruths: 0,
        },
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0a0b14] text-white font-sans antialiased relative overflow-hidden">
      {/* Background glow */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-purple-600/20 blur-[200px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-indigo-600/20 blur-[200px] rounded-full" />
      </div>

      {/* Header */}
      <header className="flex justify-between items-center px-6 md:px-12 py-6 border-b border-white/5">
        <div className="flex items-center gap-2 text-2xl font-semibold">
          <span>UltraNova</span>
          <span className="text-indigo-400">FOUNDER OS</span>
        </div>
        <button
  onClick={() => setDarkMode(!darkMode)}
  className="px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition text-sm"
>
  {darkMode ? "Light Mode" : "Dark Mode"}
</button>

      </header>

      {/* Hero */}
      <section className="flex flex-col items-center text-center px-4 pt-16 pb-8">
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-sm text-purple-300">
          ⚡ AI-Powered Founder Intelligence
        </div>
        <h1 className="text-5xl md:text-6xl font-semibold leading-tight max-w-4xl">
          Turn your idea into a{" "}
          <span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            strategic blueprint
          </span>
        </h1>
        <p className="mt-6 text-white/60 max-w-2xl text-lg">
          Enter your startup concept and let UltraNova's AI engine generate
          vision, roadmap, team analysis, and confidence-scored decisions.
        </p>

        {/* Input + Advanced Settings */}
        <div className="mt-10 w-full max-w-4xl">
          <div className="flex items-center bg-[#0f111a] border border-white/10 rounded-full px-6 py-3 shadow-xl">
            <input
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="e.g., Education Platform"
              className="flex-1 bg-transparent outline-none text-white placeholder:text-white/40"
            />
            <button
              onClick={analyze}
              disabled={loading}
              className="ml-4 px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:opacity-90 transition disabled:opacity-50 text-white font-medium whitespace-nowrap"
            >
              {loading ? "Analyzing..." : "Analyze →"}
            </button>
          </div>

          {/* Example suggestion */}
          <div className="mt-3 text-left text-sm text-white/40 px-2">
            Education Platform
          </div>

          {/* Advanced Settings */}
          <div className="mt-6 text-left">
            <div className="text-sm text-white/60 mb-3 px-2">Advanced Settings</div>
            <div className="flex flex-wrap items-center gap-4">
              {/* PERSONALITY */}
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
                <span className="text-white/60 text-xs">PERSONALITY</span>
                <select
                  value={personality}
                  onChange={(e) => setPersonality(e.target.value)}
                  className="bg-transparent outline-none text-white text-sm"
                >
                  <option>Aggressive</option>
                  <option>Balanced</option>
                  <option>Conservative</option>
                </select>
              </div>

              {/* RUNWAY (MONTHS) */}
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
                <span className="text-white/60 text-xs">RUNWAY (MONTHS)</span>
                <input
                  type="number"
                  value={runway}
                  onChange={(e) => setRunway(e.target.value)}
                  className="w-16 bg-transparent outline-none text-white text-sm"
                />
                <span className="text-white/40 text-xs">Build, test, review</span>
              </div>

              {/* PRODUCT CLARITY */}
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
                <span className="text-white/60 text-xs">PRODUCT CLARITY</span>
                <select
                  value={clarity}
                  onChange={(e) => setClarity(e.target.value)}
                  className="bg-transparent outline-none text-white text-sm"
                >
                  <option>Clear ✓</option>
                  <option>Fuzzy</option>
                  <option>Undefined</option>
                </select>
                <span className="text-white/40 text-xs">Product direction is defined</span>
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
              />
              <MetricCard
                icon={<TrendingUp className="w-5 h-5" />}
                label="TEAM CONFIDENCE"
                value={`${result.metrics.teamConfidence}%`}
                sub="Across all teams"
              />
              <MetricCard
                icon={<AlertTriangle className="w-5 h-5" />}
                label="CONFLICT MODE"
                value={result.metrics.conflictMode}
                sub="Teams aligned"
              />
              <MetricCard
                icon={<Target className="w-5 h-5" />}
                label="HARD TRUTHS"
                value={result.metrics.hardTruths.toString()}
                sub="No warnings"
              />
            </div>

            {/* Tabs */}
            <div className="flex justify-center mb-8">
              <div className="flex gap-2 bg-white/5 border border-white/10 rounded-full px-2 py-2 backdrop-blur-xl">
                {["vision", "roadmap", "decision", "teams"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-2 rounded-full capitalize text-sm transition ${
                      activeTab === tab
                        ? "bg-white/10 text-white"
                        : "text-white/60 hover:text-white/80"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* Left Column (Tab Content) */}
              <div className="md:col-span-2">
                {activeTab === "vision" && (
                  <VisionPanel vision={result.vision} />
                )}
                {activeTab === "roadmap" && (
                  <RoadmapPanel roadmap={result.roadmap} />
                )}
                {activeTab === "decision" && (
                  <DecisionPanel decision={result.decision} />
                )}
                {activeTab === "teams" && (
                  <TeamsPanel evaluations={result.teamEvaluations} />
                )}
              </div>

              {/* Right Column (Always visible) */}
              <div className="space-y-6">
                <DecisionSummaryCard decision={result.decision} />
                <TeamScoresCard teams={result.teams} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Copilot */}
      <motion.button
  whileHover={{ scale: 1.15 }}
  whileTap={{ scale: 0.95 }}
  className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 shadow-2xl flex items-center justify-center"
>
  <MessageCircle className="w-6 h-6 text-white" />
</motion.button>

    </div>
  );
}

// ---------- Reusable Components ----------

function MetricCard({ icon, label, value, sub }: any) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="p-5 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-xl"
    >
      <div className="flex items-center gap-2 text-white/70 mb-2 text-xs tracking-wider">
        {icon}
        <span>{label}</span>
      </div>
      <div className="text-2xl font-semibold">{value}</div>
      {sub && <div className="text-xs text-white/50 mt-1">{sub}</div>}
    </motion.div>
  );
}

function VisionPanel({ vision }: { vision: string }) {
  return (
    <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-8">
      <div className="text-xs text-indigo-400 mb-3 tracking-wider">STRATEGIC VISION</div>
      <h2 className="text-2xl md:text-3xl font-semibold leading-relaxed">“{vision}”</h2>
      <div className="flex gap-3 mt-6">
        <span className="px-3 py-1 text-xs bg-indigo-500/20 text-indigo-300 rounded-full">
          Strategy Agent
        </span>
        <span className="px-3 py-1 text-xs bg-white/10 rounded-full text-white/70">
          Founder-ready
        </span>
      </div>
    </div>
  );
}

function RoadmapPanel({ roadmap }: { roadmap: any }) {
  const phases = [
    { key: "now", label: "IMMEDIATE", color: "bg-purple-500" },
    { key: "next", label: "SHORT-TERM", color: "bg-cyan-400" },
    { key: "later", label: "LONG-TERM", color: "bg-orange-400" },
  ];
  return (
    <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-8 space-y-8">
      {phases.map((phase) => (
        <div key={phase.key}>
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-3 h-3 rounded-full ${phase.color}`} />
            <span className="text-sm text-white/70 tracking-wide">{phase.label}</span>
          </div>
          <div className="ml-6">
            {roadmap[phase.key].map((item: string, i: number) => (
              <div key={i} className="text-white/80 text-sm mb-1">
                • {item}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function DecisionPanel({ decision }: { decision: any }) {
  return (
    <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8">
      <div className="w-28 h-28 rounded-full border-8 border-indigo-500 flex items-center justify-center text-3xl font-semibold">
        {Math.round(decision.confidence * 100)}%
      </div>
      <div>
        <h2 className="text-3xl font-semibold mb-2">{decision.chosen}</h2>
        <p className="text-white/60 mb-4">{decision.description}</p>
        <div className="flex gap-3">
          <span className="px-3 py-1 text-xs bg-green-500/20 text-green-400 rounded-full">
            Decision Engine
          </span>
          <span className="px-3 py-1 text-xs bg-indigo-500/20 text-indigo-300 rounded-full">
            Personality Applied
          </span>
        </div>
      </div>
    </div>
  );
}

function TeamsPanel({ evaluations }: { evaluations: any[] }) {
  return (
    <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-8">
      <h3 className="text-lg font-semibold mb-6">TEAM EVALUATIONS</h3>
      <div className="grid grid-cols-2 gap-6">
        {evaluations.map((team) => (
          <div key={team.name}>
            <div className="flex justify-between text-sm mb-1">
              <span>{team.name}</span>
              <span>{team.score}% confirmed</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"
                style={{ width: `${team.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 text-sm text-white/50">Conflict Status: ALIGNED</div>
    </div>
  );
}

function DecisionSummaryCard({ decision }: { decision: any }) {
  return (
    <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6">
      <div className="text-xs text-indigo-400 mb-3">DECISION SUMMARY</div>
      <div className="text-green-400 font-semibold text-lg">{decision.chosen}</div>
      <p className="text-sm text-white/60 mt-2">{decision.description}</p>
      <div className="flex items-center justify-between mt-4 text-sm">
        <span className="text-white/70">FINAL DECISION</span>
        <span className="text-white font-mono">{Math.round(decision.confidence * 100)}%</span>
      </div>
    </div>
  );
}

function TeamScoresCard({ teams }: { teams: any[] }) {
  return (
    <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6">
      <div className="text-xs text-indigo-400 mb-4">TEAM SCORES</div>
      <div className="space-y-4">
        {teams.map((team) => (
          <div key={team.name}>
            <div className="flex justify-between text-sm mb-1">
              <span>{team.name}</span>
              <span>{team.score}%</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"
                style={{ width: `${team.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}