
import React from 'react';
import { FormatText } from './FormatText';
import { Trophy, FileWarning, Plus, Minus } from 'lucide-react';
import { WlTrackState } from '../types';

interface WorkLifeBalanceProps {
  trackState: WlTrackState;
  onUpdate: (track: keyof WlTrackState, newValue: number) => void;
  mvpCount: number;
  probationCount: number;
  onMvpChange: (val: number) => void;
  onProbationChange: (val: number) => void;
}

// 30 Boxes for each track. 
// Row 1 (1-15): L -> R
// Row 2 (16-30): R -> L

// Competency (Red)
const COMPETENCY_LABELS = [
  "", "", "A3", "", "", "D4", "", "", "G3", "", "", "J3", "", "", "N3", // 1-15
  "", "", "Q3", "", "", "T3", "", "", "W8", "", "", "Y2", "", "", ""  // 16-30
];

// Reality (Yellow)
const REALITY_LABELS = [
  "C4", "", "", "L11", "", "", "", "E2", "", "04", "", "", "", "T6", "", // 1-15
  "", "V2", "", "X3", "", "H5", "", "", "E3", "", "", "", "", "", "" // 16-30
];

// Anomaly (Blue)
const ANOMALY_LABELS = [
  "H4", "H3", "", "", "U2", "", "X2", "", "", "", "N1", "", "Q2", "", "", // 1-15
  "", "L10", "", "G8", "", "", "", "A7", "", "", "", "", "", "", "" // 16-30
];

const TrackRenderer = ({ 
  title, 
  description,
  labels, 
  colorClass, 
  value,
  burned,
  onUpdate
}: { 
  title: string, 
  description: string,
  labels: string[], 
  colorClass: string, 
  value: number,
  burned: number,
  onUpdate: (val: number) => void
}) => {
  const row1Labels = labels.slice(0, 15);
  const row2Labels = labels.slice(15, 30); 

  const totalBoxes = 30;

  // Helper to determine box state
  const getBoxState = (index: number) => {
    // 0-based index
    const logicalNum = index + 1;
    
    // Is it burned? (Burned boxes are at the END)
    // If burned = 1, index 29 is burned. 
    // If burned = 5, indices 25, 26, 27, 28, 29 are burned.
    const isBurned = index >= (totalBoxes - burned);
    
    // Is it marked?
    const isMarked = logicalNum <= value;

    return { isBurned, isMarked, logicalNum };
  };

  const handleBoxClick = (index: number) => {
    const { isBurned, logicalNum, isMarked } = getBoxState(index);
    
    if (isBurned) return; // Cannot click burned boxes

    // Logic: 
    // If clicking an empty box, set value to that box's number.
    // If clicking the *current* max value, unmark it (go back one).
    // If clicking an already marked box below max, set value to that box (unmark higher ones).
    
    if (isMarked && logicalNum === value) {
      onUpdate(value - 1);
    } else {
      onUpdate(logicalNum);
    }
  };

  return (
    <div className="mb-8 md:mb-12">
      <div className="flex items-center mb-4">
        <h3 className={`text-xl md:text-2xl font-black ${colorClass.replace('bg-', 'text-')} uppercase mr-4`}><FormatText>{title}</FormatText></h3>
        <p className="text-[10px] md:text-xs text-gray-500 max-w-lg leading-tight"><FormatText>{description}</FormatText></p>
      </div>

      {/* Container - Scrollable on mobile */}
      <div className="overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0">
        <div className="relative min-w-[600px] pl-8 pr-8">
          
          {/* Row 1 (Left to Right) */}
          <div className="flex justify-between items-center mb-4">
            {/* Start Arrow */}
            <div className={`w-0 h-0 border-t-[10px] border-t-transparent border-l-[15px] ${colorClass.replace('bg-', 'border-l-')} border-b-[10px] border-b-transparent absolute -left-0`}></div>
            
            {row1Labels.map((label, i) => {
              const { isBurned, isMarked } = getBoxState(i);
              const nextState = getBoxState(i + 1);
              
              return (
                <React.Fragment key={i}>
                  <div 
                    onClick={() => handleBoxClick(i)}
                    className={`
                      w-8 h-8 md:w-10 md:h-10 border-2 rounded-md flex items-center justify-center cursor-pointer transition-all z-10 shrink-0
                      ${isBurned 
                        ? 'bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed' 
                        : isMarked 
                          ? `${colorClass} text-white border-transparent` 
                          : 'bg-white border-gray-200 hover:border-gray-400 text-gray-800'
                      }
                    `}
                  >
                    <span className="text-[10px] sm:text-xs font-black"><FormatText>{label}</FormatText></span>
                  </div>
                  {/* Connector Line */}
                  {i < 14 && (
                    <div className={`flex-1 h-1 min-w-[10px] 
                      ${isBurned || nextState.isBurned ? 'bg-gray-200' : (isMarked && nextState.isMarked ? colorClass : 'bg-gray-200')}
                    `}></div>
                  )}
                </React.Fragment>
              );
            })}
            
            {/* Vertical Connector Down (Right side) */}
            {/* Logic: Colored if box 14 and 15 are active. Gray if burned reaches here? Burned logic is separate. */}
            {(() => {
               const box14 = getBoxState(14);
               const box15 = getBoxState(15);
               const isLineActive = box14.isMarked && box15.isMarked && !box14.isBurned && !box15.isBurned;
               return (
                 <div className={`absolute right-0 top-4 md:top-5 w-8 h-14 border-r-4 ${isLineActive ? colorClass.replace('bg-', 'border-') : 'border-gray-200'} rounded-tr-xl rounded-br-xl -mr-4 pointer-events-none`}></div>
               );
            })()}
          </div>

          {/* Row 2 (Right to Left) */}
          <div className="flex justify-between items-center flex-row-reverse">
             {/* Start Circle (Left side, end of track) */}
             {(() => {
                const box29 = getBoxState(29);
                return (
                  <div className={`w-6 h-6 rounded-full border-4 ${box29.isMarked && !box29.isBurned ? colorClass.replace('bg-', 'border-') : 'border-gray-200'} absolute -left-2 bg-white z-10`}></div>
                );
             })()}

             {row2Labels.map((label, i) => {
               // i goes 0 to 14. 
               // Rightmost (Start of row 2) is index 15.
               // Leftmost (End of row 2) is index 29.
               // flex-row-reverse renders first item on Right.
               
               const logicalIndex = 15 + i; // 15...29
               const { isBurned, isMarked } = getBoxState(logicalIndex);
               const nextLogicalBox = getBoxState(logicalIndex + 1); // For connector to the LEFT (visually next in sequence)
               
               return (
                 <React.Fragment key={i}>
                   <div 
                     onClick={() => handleBoxClick(logicalIndex)}
                     className={`
                       w-8 h-8 md:w-10 md:h-10 border-2 rounded-md flex items-center justify-center cursor-pointer transition-all z-10 shrink-0
                       ${isBurned 
                         ? 'bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed' 
                         : isMarked 
                           ? `${colorClass} text-white border-transparent` 
                           : 'bg-white border-gray-200 hover:border-gray-400 text-gray-800'
                       }
                     `}
                   >
                     <span className="text-[10px] sm:text-xs font-black"><FormatText>{label}</FormatText></span>
                   </div>
                   {/* Connector Line (Visually to the left) */}
                   {i < 14 && (
                     <div className={`flex-1 h-1 min-w-[10px] 
                       ${isBurned || nextLogicalBox.isBurned ? 'bg-gray-200' : (isMarked && nextLogicalBox.isMarked ? colorClass : 'bg-gray-200')}
                     `}></div>
                   )}
                 </React.Fragment>
               );
             })}
          </div>

        </div>
      </div>
    </div>
  );
};

export const WorkLifeBalance: React.FC<WorkLifeBalanceProps> = ({ 
  trackState, 
  onUpdate,
  mvpCount,
  probationCount,
  onMvpChange,
  onProbationChange
}) => {
  return (
    <div className="w-full bg-white p-4 md:p-8 rounded-3xl shadow-sm border border-gray-100 mb-20 md:mb-0">
      
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b-2 border-gray-100 pb-6 mb-8 gap-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter mb-2">工作/生活平衡</h2>
          <div className="flex items-center text-red-500 bg-red-50 px-3 py-2 rounded-lg text-xs font-bold border border-red-100">
            <FileWarning size={16} className="mr-2 flex-shrink-0" />
            每当你标记一格时，其他记录条上限减1。
          </div>
        </div>

        {/* Counters */}
        <div className="flex gap-4 w-full md:w-auto">
          {/* MVP */}
          <div className="bg-white border-2 border-red-100 rounded-xl p-3 flex flex-col items-center flex-1 md:flex-none md:min-w-[120px]">
            <div className="flex items-center text-red-600 mb-2">
              <Trophy size={18} className="mr-1" />
              <span className="font-black text-base md:text-lg">MVP</span>
            </div>
            <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2">获得次数</div>
            <div className="flex items-center gap-3">
              <button onClick={() => onMvpChange(Math.max(0, mvpCount - 1))} className="w-6 h-6 rounded bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-gray-200"><Minus size={14}/></button>
              <span className="font-mono text-xl font-black text-gray-900"><FormatText>{mvpCount}</FormatText></span>
              <button onClick={() => onMvpChange(mvpCount + 1)} className="w-6 h-6 rounded bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100"><Plus size={14}/></button>
            </div>
          </div>

          {/* Probation */}
          <div className="bg-white border-2 border-gray-200 rounded-xl p-3 flex flex-col items-center flex-1 md:flex-none md:min-w-[120px]">
            <div className="flex items-center text-gray-800 mb-2">
              <FileWarning size={18} className="mr-1" />
              <span className="font-black text-base md:text-lg">察看期</span>
            </div>
            <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2">获得次数</div>
            <div className="flex items-center gap-3">
              <button onClick={() => onProbationChange(Math.max(0, probationCount - 1))} className="w-6 h-6 rounded bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-gray-200"><Minus size={14}/></button>
              <span className="font-mono text-xl font-black text-gray-900"><FormatText>{probationCount}</FormatText></span>
              <button onClick={() => onProbationChange(probationCount + 1)} className="w-6 h-6 rounded bg-gray-100 text-gray-800 flex items-center justify-center hover:bg-gray-200"><Plus size={14}/></button>
            </div>
          </div>
        </div>
      </div>

      <TrackRenderer
        title="职能"
        description="每当你在职能记录条上标记一格时，将任意一项资质的“资质保证上限”提升1点，最高不超过9点。"
        labels={COMPETENCY_LABELS}
        colorClass="bg-red-500"
        value={trackState.competency.value}
        burned={trackState.competency.burned}
        onUpdate={(val) => onUpdate('competency', val)}
      />

      <TrackRenderer
        title="现实"
        description="每当你在现实记录条上标记一格时，将你与任意一段“关系”的“连结”提升1点。"
        labels={REALITY_LABELS}
        colorClass="bg-yellow-400"
        value={trackState.reality.value}
        burned={trackState.reality.burned}
        onUpdate={(val) => onUpdate('reality', val)}
      />

      <TrackRenderer
        title="异常"
        description="每当你在异常记录条上标记一格时，选择一项：练习或广为人知。"
        labels={ANOMALY_LABELS}
        colorClass="bg-blue-500"
        value={trackState.anomaly.value}
        burned={trackState.anomaly.burned}
        onUpdate={(val) => onUpdate('anomaly', val)}
      />

    </div>
  );
};
