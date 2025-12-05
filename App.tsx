
import React, { useState, useEffect } from 'react';
import { ANOMALIES, REALITIES, COMPETENCIES, STATS_LIST, COMPETENCY_QUIZZES } from './constants';
import { ArcOption, CharacterStats, CustomTrack, StatType, WlTrackState, AgentSaveData } from './types';
import { TriangleStat } from './components/TriangleStat';
import { WorkLifeBalance } from './components/WorkLifeBalance';
import { CustomTracks } from './components/CustomTracks';
import { FormatText } from './components/FormatText';
import { IconAnomaly, IconReality, IconCompetency, getArcIcon } from './components/Icons';
import { Shield, Briefcase, Triangle, ChevronRight, X, Plus, RefreshCw, Heart, Save, Upload, Download } from 'lucide-react';

const ArcSelector = ({ 
  title, 
  options, 
  onSelect, 
  colorClass, 
  icon,
  selectedId
}: { 
  title: string, 
  options: ArcOption[], 
  onSelect: (opt: ArcOption) => void,
  colorClass: string,
  icon: React.ReactNode,
  selectedId?: string
}) => (
  <div className="mb-8">
    <h2 className={`text-2xl font-black uppercase mb-6 flex items-center ${colorClass}`}>
      <span className="mr-3 p-2 bg-white rounded-lg shadow-sm border border-gray-100">{icon}</span>
      <span><FormatText>{title}</FormatText></span>
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {options.map((opt) => {
        const ItemIcon = getArcIcon(opt.id);
        return (
          <button
            key={opt.id}
            onClick={() => onSelect(opt)}
            className={`group relative overflow-hidden bg-white border-2 rounded-2xl p-5 text-left transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1
              ${selectedId === opt.id ? `border-current ${colorClass} ring-2 ring-offset-2 ring-current ring-opacity-50` : 'border-gray-100 hover:border-current hover:text-gray-900'}
            `}
          >
            {/* Background decoration */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity ${colorClass.replace('text-', 'bg-')}`}></div>
            
            <div className="flex items-start justify-between mb-3 relative z-10">
               {/* Specific Icon - Resized */}
              <div className={`w-10 h-10 ${selectedId === opt.id ? colorClass : 'text-gray-400 group-hover:text-gray-900'} transition-colors`}>
                {ItemIcon}
              </div>
              
              {/* Checkmark indicator if selected */}
              {selectedId === opt.id && (
                <div className={`w-6 h-6 rounded-full ${colorClass.replace('text-', 'bg-')} text-white flex items-center justify-center`}>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
                </div>
              )}
            </div>

            <h3 className={`text-lg font-black mb-1 tracking-tight relative z-10`}>{opt.name}</h3>
            <p className="text-xs text-gray-500 font-medium leading-relaxed relative z-10"><FormatText>{opt.description}</FormatText></p>
          </button>
        );
      })}
    </div>
  </div>
);

type Tab = 'home' | 'anomaly' | 'reality' | 'competency' | 'worklife' | 'custom';

function App() {
  // --- State ---
  const [characterName, setCharacterName] = useState("");
  const [pronouns, setPronouns] = useState("");
  const [agencyTitle, setAgencyTitle] = useState("");
  const [agencyRating, setAgencyRating] = useState("0");
  
  const [activeTab, setActiveTab] = useState<Tab>('home');
  
  // ARCs
  const [anomaly, setAnomaly] = useState<ArcOption | null>(null);
  const [reality, setReality] = useState<ArcOption | null>(null);
  const [competency, setCompetency] = useState<ArcOption | null>(null);
  
  // Reality Inputs
  const [realityTrigger, setRealityTrigger] = useState("");
  const [overloadRelief, setOverloadRelief] = useState("");

  // Stats (Current / Max system)
  const initialStats: CharacterStats = {};
  STATS_LIST.forEach(stat => {
    initialStats[stat] = { current: 0, max: 0 };
  });
  const [stats, setStats] = useState<CharacterStats>(initialStats);
  const [totalGrowthPoints, setTotalGrowthPoints] = useState(0); 
  
  // Status Panel
  const [commendations, setCommendations] = useState(0);
  const [reprimands, setReprimands] = useState(0);
  const [overload, setOverload] = useState(0);

  // W/L Balance Extras
  const [mvpCount, setMvpCount] = useState(0);
  const [probationCount, setProbationCount] = useState(0);

  // UI Logic
  const [setupPhase, setSetupPhase] = useState(true); 
  const [quizMode, setQuizMode] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ArcOption | null>(null);

  // Tracks State with Value and Burned
  const [wlTrackState, setWlTrackState] = useState<WlTrackState>({
    competency: { value: 0, burned: 0 },
    reality: { value: 0, burned: 0 },
    anomaly: { value: 0, burned: 0 }
  });

  const [customTracks, setCustomTracks] = useState<CustomTrack[]>([
    { id: '1', name: '自选记录', value: 0, max: 15 }
  ]);

  // --- Effects ---

  // Load Data on Mount
  useEffect(() => {
    const saved = localStorage.getItem('triangle_agency_data');
    if (saved) {
      try {
        const data: AgentSaveData = JSON.parse(saved);
        loadAgentData(data);
      } catch (e) {
        console.error("Failed to load save data", e);
      }
    }
  }, []);

  // Save Data on Change
  useEffect(() => {
    if (!setupPhase) { // Only auto-save if setup is complete to avoid partial overwrites of new chars unless intended
       saveAgentData();
    }
  }, [
    characterName, pronouns, agencyTitle, agencyRating, 
    anomaly, reality, competency, 
    realityTrigger, overloadRelief, 
    stats, totalGrowthPoints, commendations, reprimands, overload, 
    mvpCount, probationCount, wlTrackState, customTracks, setupPhase
  ]);

  // Update Reality inputs when Reality changes (if empty)
  useEffect(() => {
    if (reality && !realityTrigger) {
      setRealityTrigger(reality.defaultTrigger || "");
      setOverloadRelief(reality.defaultRelief || "");
    }
  }, [reality]);

  // --- Persistence Functions ---

  const getSaveData = (): AgentSaveData => ({
    characterName, pronouns, agencyTitle, agencyRating,
    anomalyId: anomaly?.id || null,
    realityId: reality?.id || null,
    competencyId: competency?.id || null,
    realityTrigger, overloadRelief,
    stats, totalGrowthPoints,
    commendations, reprimands, overload,
    mvpCount, probationCount,
    wlTrackState,
    customTracks,
    setupPhase
  });

  const saveAgentData = () => {
    const data = getSaveData();
    localStorage.setItem('triangle_agency_data', JSON.stringify(data));
  };

  const loadAgentData = (data: AgentSaveData) => {
    setCharacterName(data.characterName);
    setPronouns(data.pronouns);
    setAgencyTitle(data.agencyTitle);
    setAgencyRating(data.agencyRating);
    
    setAnomaly(ANOMALIES.find(a => a.id === data.anomalyId) || null);
    setReality(REALITIES.find(r => r.id === data.realityId) || null);
    setCompetency(COMPETENCIES.find(c => c.id === data.competencyId) || null);
    
    setRealityTrigger(data.realityTrigger);
    setOverloadRelief(data.overloadRelief);
    setStats(data.stats);
    setTotalGrowthPoints(data.totalGrowthPoints);
    setCommendations(data.commendations);
    setReprimands(data.reprimands);
    setOverload(data.overload);
    setMvpCount(data.mvpCount || 0);
    setProbationCount(data.probationCount || 0);
    setWlTrackState(data.wlTrackState || {
      competency: { value: 0, burned: 0 },
      reality: { value: 0, burned: 0 },
      anomaly: { value: 0, burned: 0 }
    });
    setCustomTracks(data.customTracks);
    setSetupPhase(data.setupPhase);
  };

  const handleExport = () => {
    const data = getSaveData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `triangle_agency_${characterName || 'agent'}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result as string);
          loadAgentData(data);
        } catch (err) {
          alert("Invalid save file");
        }
      };
      reader.readAsText(file);
    }
  };

  // --- Actions ---

  const handleSpendStat = (stat: string) => {
    setStats(prev => ({
      ...prev,
      [stat]: { ...prev[stat], current: Math.max(0, prev[stat].current - 1) }
    }));
  };

  const handleRefreshStat = (stat: string) => {
    setStats(prev => ({
      ...prev,
      [stat]: { ...prev[stat], current: prev[stat].max }
    }));
  };

  const handleIncreaseMax = (stat: string) => {
    if (totalGrowthPoints > 0 && stats[stat].max < 9) {
      setStats(prev => ({
        ...prev,
        [stat]: { max: prev[stat].max + 1, current: prev[stat].current + 1 }
      }));
      setTotalGrowthPoints(prev => prev - 1);
    }
  };

  const handleRefreshAll = () => {
    const newStats = { ...stats };
    Object.keys(newStats).forEach(key => {
      newStats[key] = { ...newStats[key], current: newStats[key].max };
    });
    setStats(newStats);
  };

  const handleAddGrowthPoint = () => {
    setTotalGrowthPoints(prev => prev + 1);
  };

  // Complex Logic for W/L Balance: Increasing one value burns others.
  const handleWlUpdate = (track: keyof WlTrackState, newValue: number) => {
    setWlTrackState(prev => {
      const oldValue = prev[track].value;
      const delta = newValue - oldValue;
      
      const newState = { ...prev };
      
      // Update target track value
      newState[track] = { ...newState[track], value: newValue };
      
      // If delta is positive (marked a box), burn others
      // If delta is negative (unmarked a box), unburn others? 
      // Rule says "Each time you mark a box, you must strike one out...". 
      // It implies cost. If we unmark (undo), we should probably refund the cost.
      
      const others = (Object.keys(newState) as Array<keyof WlTrackState>).filter(k => k !== track);
      others.forEach(otherKey => {
        // Calculate new burned amount. Cannot go below 0 or above 30.
        const currentBurn = newState[otherKey].burned;
        const newBurn = Math.min(30, Math.max(0, currentBurn + delta));
        newState[otherKey] = { ...newState[otherKey], burned: newBurn };
      });

      return newState;
    });
  };

  const startQuiz = () => {
    setQuizMode(true);
    // Reset stats base for quiz calculation
    const resetStats = { ...stats };
    Object.keys(resetStats).forEach(key => {
      resetStats[key] = { current: 0, max: 0 };
    });
    setStats(resetStats);
    setQuizIndex(0);
  };

  const handleQuizAnswer = (stat: StatType, amount: number) => {
    setStats(prev => {
        const newMax = prev[stat].max + amount;
        return {
            ...prev,
            [stat]: { 
              max: newMax, 
              current: newMax 
            }
        };
    });
    
    const questions = COMPETENCY_QUIZZES[competency?.id || 'default'] || COMPETENCY_QUIZZES['default'];
    
    setTimeout(() => {
        if (quizIndex < questions.length - 1) {
            setQuizIndex(prev => prev + 1);
        } else {
            setQuizMode(false);
            setSetupPhase(false);
            // Save initial state immediately
            setTimeout(() => saveAgentData(), 100);
        }
    }, 50);
  };

  // --- Renderers ---

  // 1. Setup / ARC Selection View
  if (setupPhase && !quizMode) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-12 font-sans text-gray-900 flex flex-col">
        <div className="max-w-6xl mx-auto w-full flex-1">
          <header className="mb-16 text-center flex flex-col items-center justify-center">
            <div className="mb-6 text-red-600 transform hover:scale-110 transition-transform duration-500">
               <Triangle size={80} className="fill-current rotate-180 drop-shadow-xl" />
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter uppercase text-gray-900">
              TRIANGLE <span className="text-red-600">AGENCY</span> OS
            </h1>
            <div className="h-1 w-24 bg-gray-900 mb-6"></div>
            <p className="text-xl md:text-2xl text-gray-500 font-mono tracking-[0.2em] uppercase">欢迎新特工</p>
            
            {/* Import Button on Setup */}
            <div className="mt-8">
               <label className="cursor-pointer bg-white border-2 border-gray-200 text-gray-600 px-4 py-2 rounded-lg font-bold hover:bg-gray-100 transition-colors flex items-center shadow-sm">
                 <Upload size={16} className="mr-2" /> 载入存档 (Load JSON)
                 <input type="file" accept=".json" onChange={handleImport} className="hidden" />
               </label>
            </div>
          </header>

          <div className="mb-16 bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 max-w-2xl mx-auto transform hover:-translate-y-1 transition-transform">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">特工姓名 (Agent Name)</label>
            <input 
              type="text" 
              value={characterName} 
              onChange={e => setCharacterName(e.target.value)}
              placeholder="请输入姓名..."
              className="w-full text-3xl md:text-4xl font-black bg-transparent border-b-4 border-gray-100 focus:border-red-600 outline-none pb-4 placeholder-gray-200 text-gray-900 transition-colors"
            />
          </div>

          <div className="space-y-20">
            <ArcSelector 
              title="选择异常 (ANOMALY)" 
              options={ANOMALIES} 
              onSelect={setAnomaly} 
              selectedId={anomaly?.id}
              colorClass="text-blue-600"
              icon={<IconAnomaly className="w-8 h-8" />}
            />

            <ArcSelector 
              title="选择现实 (REALITY)" 
              options={REALITIES} 
              onSelect={setReality} 
              selectedId={reality?.id}
              colorClass="text-yellow-500"
              icon={<IconReality className="w-8 h-8" />}
            />

            <ArcSelector 
              title="选择职能 (COMPETENCY)" 
              options={COMPETENCIES} 
              onSelect={setCompetency} 
              selectedId={competency?.id}
              colorClass="text-red-600"
              icon={<IconCompetency className="w-8 h-8" />}
            />
          </div>

          <div className="sticky bottom-6 flex justify-center mt-20 pb-10 z-30">
            <button 
              disabled={!anomaly || !reality || !competency}
              onClick={startQuiz}
              className="bg-gray-900 text-white px-12 py-5 rounded-full font-black text-2xl shadow-2xl hover:scale-105 hover:bg-gray-800 transition-all disabled:opacity-50 disabled:scale-100 flex items-center ring-4 ring-white"
            >
              初始化特工 <ChevronRight className="ml-3 w-8 h-8" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. Quiz View
  if (quizMode) {
    const questions = COMPETENCY_QUIZZES[competency?.id || 'default'] || COMPETENCY_QUIZZES['default'];
    const currentQ = questions[quizIndex];

    return (
      <div className="min-h-screen bg-red-600 flex items-center justify-center p-6 font-sans">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-2xl w-full relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-3 bg-gray-900"></div>
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-sm font-bold text-red-600 uppercase tracking-widest flex items-center">
                <Briefcase className="w-4 h-4 mr-2" />
                职能评估
            </h2>
            <span className="font-mono text-gray-400 font-bold text-lg"><FormatText>{quizIndex + 1}</FormatText> / <FormatText>{questions.length}</FormatText></span>
          </div>
          
          <h1 className="text-2xl md:text-4xl font-black text-gray-900 mb-12 leading-tight">
            <FormatText>{currentQ.question}</FormatText>
          </h1>

          <div className="space-y-4">
            {currentQ.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleQuizAnswer(opt.bonusStat, opt.bonusAmount)}
                className="w-full text-left p-6 border-2 border-gray-100 rounded-2xl hover:border-red-600 hover:bg-red-50 transition-all group"
              >
                <span className="font-bold text-xl text-gray-800 group-hover:text-red-700 block mb-2"><FormatText>{opt.text}</FormatText></span>
                <div className="inline-block bg-gray-100 text-gray-500 text-xs font-mono font-bold px-2 py-1 rounded group-hover:bg-red-200 group-hover:text-red-800 uppercase">
                  {opt.bonusStat} +{opt.bonusAmount}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 3. Main Application (Tabbed)
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => setActiveTab('home')}>
                <Triangle className="w-8 h-8 text-red-600 rotate-180 fill-current" />
                <span className="ml-2 text-xl font-black tracking-tighter hidden sm:block">AGENCY OS</span>
              </div>
              <div className="hidden md:ml-8 md:flex md:space-x-1">
                {[
                  { id: 'home', label: '首页' },
                  { id: 'anomaly', label: '异常', color: 'text-blue-600' },
                  { id: 'reality', label: '现实', color: 'text-yellow-500' },
                  { id: 'competency', label: '职能', color: 'text-red-600' },
                  { id: 'worklife', label: '平衡' },
                  { id: 'custom', label: '记录' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as Tab)}
                    className={`
                      px-3 lg:px-4 py-2 rounded-md text-sm font-bold transition-colors
                      ${activeTab === item.id 
                        ? 'bg-gray-100 text-gray-900' 
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}
                      ${activeTab === item.id && item.color ? item.color : ''}
                    `}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={handleExport}
                className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full"
                title="导出数据 (Download Save)"
              >
                <Download size={20} />
              </button>
              <label className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full cursor-pointer" title="导入数据 (Load Save)">
                <Upload size={20} />
                <input type="file" accept=".json" onChange={handleImport} className="hidden" />
              </label>
              
              <div className="h-6 w-px bg-gray-200 mx-2 hidden sm:block"></div>
              
              <span className="font-bold text-gray-800 hidden sm:block truncate max-w-[150px] text-right">{characterName || "Agent"}</span>
              <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded font-mono hidden sm:block">
                {competency?.name || "UNK"}
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu (simplified) */}
        <div className="md:hidden flex overflow-x-auto py-2 px-4 space-x-2 border-t border-gray-100 no-scrollbar bg-white">
           {[
              { id: 'home', label: '首页' },
              { id: 'anomaly', label: '异常' },
              { id: 'reality', label: '现实' },
              { id: 'competency', label: '职能' },
              { id: 'worklife', label: '平衡' },
              { id: 'custom', label: '记录' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as Tab)}
                className={`
                  flex-shrink-0 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap
                  ${activeTab === item.id ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'}
                `}
              >
                {item.label}
              </button>
            ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 pb-32 md:pb-8">
        
        {/* TAB: HOME */}
        {activeTab === 'home' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column (Main Content) */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Agent Details Inputs */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">人称代词</label>
                  <input 
                    type="text" value={pronouns} onChange={e => setPronouns(e.target.value)} placeholder="他/她/它..."
                    className="w-full bg-gray-50 border-b-2 border-gray-200 focus:border-red-500 outline-none px-3 py-2 rounded text-sm font-bold text-gray-900" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">机构头衔</label>
                  <input 
                    type="text" value={agencyTitle} onChange={e => setAgencyTitle(e.target.value)} placeholder="见习生..."
                    className="w-full bg-gray-50 border-b-2 border-gray-200 focus:border-red-500 outline-none px-3 py-2 rounded text-sm font-bold text-gray-900" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">机构评级</label>
                  <input 
                    type="text" value={agencyRating} onChange={e => setAgencyRating(e.target.value)}
                    className="w-full bg-gray-50 border-b-2 border-gray-200 focus:border-red-500 outline-none px-3 py-2 rounded text-sm font-black text-gray-900" 
                  />
                </div>
              </div>

              {/* Stats Grid */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-black uppercase flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    QA 资质表
                  </h2>
                  <div className="flex space-x-2">
                    <button 
                      onClick={handleRefreshAll}
                      className="text-xs font-bold bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors flex items-center"
                    >
                      <RefreshCw size={14} className="mr-1" /> 全部恢复
                    </button>
                    <div className="flex items-center bg-gray-100 px-3 py-1.5 rounded-lg">
                      <span className="text-xs text-gray-500 mr-2 uppercase font-bold">剩余点数</span>
                      <span className="text-sm font-black text-gray-900 mr-2"><FormatText>{totalGrowthPoints}</FormatText></span>
                      <button onClick={handleAddGrowthPoint} className="bg-white rounded-full p-0.5 text-green-600 shadow-sm hover:text-green-700">
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {STATS_LIST.map(stat => (
                    <TriangleStat
                      key={stat}
                      label={stat}
                      stat={stats[stat]}
                      onSpend={() => handleSpendStat(stat)}
                      onRefresh={() => handleRefreshStat(stat)}
                      onIncreaseMax={() => handleIncreaseMax(stat)}
                      canIncreaseMax={totalGrowthPoints > 0}
                    />
                  ))}
                </div>
              </div>

              {/* Reality & Competency Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Reality Box */}
                <div className="bg-yellow-50 border-2 border-yellow-100 rounded-3xl p-6">
                  <div className="flex items-center mb-4 text-yellow-600">
                    <Heart size={20} className="mr-2" />
                    <h3 className="font-black text-lg">现实 (REALITY)</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-yellow-700 uppercase mb-1">现实触发器</label>
                      <input 
                        type="text" 
                        value={realityTrigger} 
                        onChange={e => setRealityTrigger(e.target.value)}
                        className="w-full bg-white border border-yellow-200 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-yellow-500"
                        placeholder="例如: 需要关爱..."
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-yellow-700 uppercase mb-1">过载解除</label>
                      <input 
                        type="text" 
                        value={overloadRelief} 
                        onChange={e => setOverloadRelief(e.target.value)}
                        className="w-full bg-white border border-yellow-200 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-yellow-500"
                        placeholder="例如: 这是你的最爱！"
                      />
                    </div>
                  </div>
                </div>

                {/* Competency Box */}
                <div className="bg-red-50 border-2 border-red-100 rounded-3xl p-6">
                  <div className="flex items-center mb-4 text-red-600">
                    <Briefcase size={20} className="mr-2" />
                    <h3 className="font-black text-lg">职能 (COMPETENCY)</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-red-700 uppercase mb-1">首要指令 (Prime Directive)</label>
                      <div className="bg-white border border-red-200 rounded p-3 text-xs md:text-sm text-gray-800 leading-snug">
                        <FormatText>{competency?.primeDirective || "暂无指令"}</FormatText>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-red-700 uppercase mb-1">许可行为 (Authorized Activities)</label>
                      <div className="bg-white border border-red-200 rounded p-3 text-xs md:text-sm text-gray-800 leading-snug">
                        <ul className="list-disc list-inside space-y-1">
                          {competency?.authorizedActivities?.map((act, i) => (
                            <li key={i}><FormatText>{act}</FormatText></li>
                          )) || <li>暂无许可行为</li>}
                        </ul>
                        <div className="mt-2 text-[10px] text-red-400 font-bold text-right">完成任一获得 1 嘉奖</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ARC Summary Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button onClick={() => {setModalContent(anomaly); setModalOpen(true)}} className="bg-blue-600 text-white p-6 rounded-2xl shadow-lg hover:bg-blue-700 transition-colors text-left relative overflow-hidden group">
                  <div className="w-16 h-16 absolute -bottom-4 -right-4 opacity-20 group-hover:scale-110 transition-transform text-white">
                    {anomaly && getArcIcon(anomaly.id)}
                  </div>
                  <div className="text-xs font-bold opacity-75 uppercase mb-1">异常 (Anomaly)</div>
                  <div className="text-xl font-black">{anomaly?.name}</div>
                </button>
                <button onClick={() => {setModalContent(reality); setModalOpen(true)}} className="bg-yellow-400 text-gray-900 p-6 rounded-2xl shadow-lg hover:bg-yellow-300 transition-colors text-left relative overflow-hidden group">
                  <div className="w-16 h-16 absolute -bottom-4 -right-4 opacity-20 group-hover:scale-110 transition-transform text-gray-900">
                    {reality && getArcIcon(reality.id)}
                  </div>
                  <div className="text-xs font-bold opacity-75 uppercase mb-1">现实 (Reality)</div>
                  <div className="text-xl font-black">{reality?.name}</div>
                </button>
                <button onClick={() => {setModalContent(competency); setModalOpen(true)}} className="bg-red-600 text-white p-6 rounded-2xl shadow-lg hover:bg-red-700 transition-colors text-left relative overflow-hidden group">
                  <div className="w-16 h-16 absolute -bottom-4 -right-4 opacity-20 group-hover:scale-110 transition-transform text-white">
                    {competency && getArcIcon(competency.id)}
                  </div>
                  <div className="text-xs font-bold opacity-75 uppercase mb-1">职能 (Competency)</div>
                  <div className="text-xl font-black">{competency?.name}</div>
                </button>
              </div>
            </div>

            {/* Right Column: Status Panel (Desktop) */}
            <div className="hidden lg:block space-y-6">
              <div className="bg-gray-900 text-white p-6 rounded-3xl shadow-lg sticky top-24">
                <h3 className="font-bold text-gray-400 uppercase text-xs tracking-widest mb-6 border-b border-gray-800 pb-2">当前状态</h3>
                
                <div className="space-y-6">
                  {/* Commendations */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-gray-300">嘉奖</span>
                    <div className="flex items-center space-x-3">
                      <button onClick={() => setCommendations(Math.max(0, commendations - 1))} className="w-6 h-6 flex items-center justify-center bg-gray-800 rounded hover:bg-gray-700 text-gray-400">-</button>
                      <span className="font-mono text-2xl font-black w-8 text-center"><FormatText>{commendations}</FormatText></span>
                      <button onClick={() => setCommendations(commendations + 1)} className="w-6 h-6 flex items-center justify-center bg-gray-800 rounded hover:bg-gray-700 text-white">+</button>
                    </div>
                  </div>

                  {/* Reprimands */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-gray-300">申诫</span>
                    <div className="flex items-center space-x-3">
                      <button onClick={() => setReprimands(Math.max(0, reprimands - 1))} className="w-6 h-6 flex items-center justify-center bg-gray-800 rounded hover:bg-gray-700 text-gray-400">-</button>
                      <span className="font-mono text-2xl font-black text-red-500 w-8 text-center"><FormatText>{reprimands}</FormatText></span>
                      <button onClick={() => setReprimands(reprimands + 1)} className="w-6 h-6 flex items-center justify-center bg-gray-800 rounded hover:bg-gray-700 text-white">+</button>
                    </div>
                  </div>

                  {/* Overload */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                    <span className="text-sm font-bold text-gray-300">过载</span>
                    <div className="flex items-center space-x-3">
                      <button onClick={() => setOverload(Math.max(0, overload - 1))} className="w-6 h-6 flex items-center justify-center bg-gray-800 rounded hover:bg-gray-700 text-gray-400">-</button>
                      <span className="font-mono text-2xl font-black text-yellow-500 w-8 text-center"><FormatText>{overload}</FormatText></span>
                      <button onClick={() => setOverload(overload + 1)} className="w-6 h-6 flex items-center justify-center bg-gray-800 rounded hover:bg-gray-700 text-white">+</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: ANOMALY */}
        {activeTab === 'anomaly' && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white p-8 rounded-3xl border-t-8 border-blue-600 shadow-sm mb-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-4">
                  {anomaly && getArcIcon(anomaly.id)}
                </div>
                <div>
                  <h2 className="text-3xl font-black text-gray-900">{anomaly?.name}</h2>
                  <p className="text-blue-600 font-medium"><FormatText>{anomaly?.description}</FormatText></p>
                </div>
              </div>
              
              <div className="space-y-4 mb-8">
                <h3 className="font-bold text-gray-400 uppercase text-xs tracking-widest">能力</h3>
                {anomaly?.details?.map((detail, i) => (
                  <div key={i} className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-blue-900 font-medium">
                    <FormatText>{detail}</FormatText>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="font-bold text-gray-400 uppercase text-xs tracking-widest mb-2">异常体描述 / 笔记</h3>
                <textarea 
                  className="w-full h-40 p-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none resize-none text-sm"
                  placeholder="在此记录共鸣特征或显现形式..."
                ></textarea>
              </div>
            </div>
          </div>
        )}

        {/* TAB: REALITY */}
        {activeTab === 'reality' && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white p-8 rounded-3xl border-t-8 border-yellow-400 shadow-sm mb-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 mr-4">
                  {reality && getArcIcon(reality.id)}
                </div>
                <div>
                  <h2 className="text-3xl font-black text-gray-900">{reality?.name}</h2>
                  <p className="text-yellow-600 font-medium"><FormatText>{reality?.description}</FormatText></p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <h3 className="font-bold text-gray-400 uppercase text-xs tracking-widest">特征</h3>
                <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100 text-yellow-900 font-medium">
                  <strong>触发器：</strong> <FormatText>{realityTrigger}</FormatText>
                </div>
                <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100 text-yellow-900 font-medium">
                  <strong>解除：</strong> <FormatText>{overloadRelief}</FormatText>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-gray-400 uppercase text-xs tracking-widest mb-4">人际关系 (Relationships)</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <div className="w-8 h-8 rounded-full bg-yellow-400 text-white flex items-center justify-center text-sm font-bold mr-3">{i}</div>
                      <input 
                        type="text" 
                        className="flex-1 bg-transparent border-b border-gray-300 focus:border-yellow-500 outline-none px-2 py-1" 
                        placeholder="姓名 / 关系..." 
                      />
                      <div className="flex items-center ml-4">
                        <span className="text-xs text-gray-400 mr-2 uppercase">连结</span>
                        <input type="number" className="w-12 text-center bg-white border border-gray-200 rounded py-1 font-mono" defaultValue={1} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: COMPETENCY */}
        {activeTab === 'competency' && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white p-8 rounded-3xl border-t-8 border-red-600 shadow-sm mb-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 mr-4">
                  {competency && getArcIcon(competency.id)}
                </div>
                <div>
                  <h2 className="text-3xl font-black text-gray-900">{competency?.name}</h2>
                  <p className="text-red-600 font-medium"><FormatText>{competency?.description}</FormatText></p>
                </div>
              </div>

              <div className="space-y-6 mb-8">
                <div className="bg-red-50 p-4 rounded-xl border border-red-100 text-red-900">
                  <div className="text-xs font-bold text-red-400 uppercase mb-1">首要指令</div>
                  <div className="font-bold"><FormatText>{competency?.primeDirective}</FormatText></div>
                </div>
                <div className="bg-red-50 p-4 rounded-xl border border-red-100 text-red-900">
                  <div className="text-xs font-bold text-red-400 uppercase mb-1">许可行为</div>
                  <ul className="list-disc list-inside font-medium">
                    {competency?.authorizedActivities?.map((act, i) => (
                      <li key={i}><FormatText>{act}</FormatText></li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <h3 className="font-bold text-gray-400 uppercase text-xs tracking-widest">申领物 (Requisitions)</h3>
                {competency?.details?.map((detail, i) => (
                  <div key={i} className="bg-gray-100 p-4 rounded-xl border border-gray-200 text-gray-800 font-medium">
                    <FormatText>{detail}</FormatText>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="font-bold text-gray-400 uppercase text-xs tracking-widest mb-4">库存 (Inventory)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="bg-gray-50 p-3 rounded-xl border border-dashed border-gray-300 flex items-center">
                      <span className="text-gray-300 font-bold mr-3"><FormatText>{i}</FormatText>.</span>
                      <input type="text" className="bg-transparent w-full outline-none text-sm" placeholder="空槽位..." />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: WORK/LIFE BALANCE */}
        {activeTab === 'worklife' && (
          <WorkLifeBalance 
            trackState={wlTrackState} 
            onUpdate={handleWlUpdate} 
            mvpCount={mvpCount}
            probationCount={probationCount}
            onMvpChange={setMvpCount}
            onProbationChange={setProbationCount}
          />
        )}

        {/* TAB: CUSTOM RECORDS */}
        {activeTab === 'custom' && (
          <CustomTracks 
            tracks={customTracks}
            onAdd={() => setCustomTracks(prev => [...prev, { id: Date.now().toString(), name: '', value: 0, max: 15 }])}
            onRemove={(id) => setCustomTracks(prev => prev.filter(t => t.id !== id))}
            onRename={(id, name) => setCustomTracks(prev => prev.map(t => t.id === id ? { ...t, name } : t))}
            onUpdate={(id, value) => setCustomTracks(prev => prev.map(t => t.id === id ? { ...t, value } : t))}
            onMaxChange={(id, max) => setCustomTracks(prev => prev.map(t => t.id === id ? { ...t, max } : t))}
          />
        )}

      </main>

      {/* Mobile Sticky Stats Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-3 z-30 shadow-2xl border-t border-gray-800">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-2">
          {/* Commendations */}
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-gray-400 font-bold uppercase">嘉奖</span>
            <div className="flex items-center space-x-2">
              <button onClick={() => setCommendations(Math.max(0, commendations - 1))} className="text-gray-500 hover:text-white">-</button>
              <span className="font-mono text-lg font-black"><FormatText>{commendations}</FormatText></span>
              <button onClick={() => setCommendations(commendations + 1)} className="text-gray-500 hover:text-white">+</button>
            </div>
          </div>
          
          <div className="w-px h-8 bg-gray-700"></div>

          {/* Reprimands */}
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-gray-400 font-bold uppercase">申诫</span>
            <div className="flex items-center space-x-2">
              <button onClick={() => setReprimands(Math.max(0, reprimands - 1))} className="text-gray-500 hover:text-white">-</button>
              <span className="font-mono text-lg font-black text-red-500"><FormatText>{reprimands}</FormatText></span>
              <button onClick={() => setReprimands(reprimands + 1)} className="text-gray-500 hover:text-white">+</button>
            </div>
          </div>

          <div className="w-px h-8 bg-gray-700"></div>

          {/* Overload */}
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-gray-400 font-bold uppercase">过载</span>
            <div className="flex items-center space-x-2">
              <button onClick={() => setOverload(Math.max(0, overload - 1))} className="text-gray-500 hover:text-white">-</button>
              <span className="font-mono text-lg font-black text-yellow-500"><FormatText>{overload}</FormatText></span>
              <button onClick={() => setOverload(overload + 1)} className="text-gray-500 hover:text-white">+</button>
            </div>
          </div>
        </div>
      </div>

      {/* Info Modal */}
      {modalOpen && modalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/80 backdrop-blur-sm" onClick={() => setModalOpen(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative" onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setModalOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-900"
            >
              <X />
            </button>
            <div className="flex items-center mb-4">
               <div className="w-12 h-12 mr-4 text-current opacity-80">
                 {getArcIcon(modalContent.id)}
               </div>
               <h2 className="text-3xl font-black text-gray-900">{modalContent.name}</h2>
            </div>
            
            <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase mb-6 
              ${modalContent.type === 'Anomaly' ? 'bg-blue-100 text-blue-700' : 
                modalContent.type === 'Reality' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
              {modalContent.type === 'Anomaly' ? '异常' : modalContent.type === 'Reality' ? '现实' : '职能'}
            </div>
            <p className="text-lg text-gray-700 mb-6 font-medium leading-relaxed">
              <FormatText>{modalContent.description}</FormatText>
            </p>
            {modalContent.details && (
              <div className="bg-gray-50 p-6 rounded-2xl">
                <h4 className="font-bold text-gray-900 mb-3 text-xs uppercase tracking-wide">详细信息</h4>
                <ul className="space-y-2">
                  {modalContent.details.map((d, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-start">
                      <span className="mr-2 text-red-500 font-bold">▶</span> <FormatText>{d}</FormatText>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
