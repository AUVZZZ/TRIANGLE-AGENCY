
import React from 'react';
import { CustomTrack } from '../types';
import { Trash2 } from 'lucide-react';
import { FormatText } from './FormatText';

interface CustomTracksProps {
  tracks: CustomTrack[];
  onUpdate: (id: string, value: number) => void;
  onAdd: () => void;
  onRemove: (id: string) => void;
  onRename: (id: string, name: string) => void;
  onMaxChange: (id: string, max: number) => void;
}

export const CustomTracks: React.FC<CustomTracksProps> = ({ tracks, onUpdate, onAdd, onRemove, onRename, onMaxChange }) => {
  return (
    <div className="w-full bg-white p-4 md:p-8 rounded-3xl shadow-sm border border-gray-100 mb-20 md:mb-0">
      <div className="flex justify-between items-center mb-8 border-b-2 border-gray-100 pb-4">
        <h3 className="text-2xl font-black text-gray-900">自定义记录条</h3>
        <button 
          onClick={onAdd}
          className="text-sm bg-gray-900 text-white px-4 py-2 rounded-lg font-bold hover:bg-gray-800 transition-colors"
        >
          + 新增记录
        </button>
      </div>

      <div className="space-y-8">
        {tracks.map(track => {
          const isDoubleRow = track.max > 15;
          
          return (
            <div key={track.id} className="relative border-2 border-gray-200 rounded-2xl p-4 md:p-6 bg-gray-50/50">
              {/* Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                <div className="flex-1 w-full sm:w-auto">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">姓名</label>
                  <input 
                    type="text" 
                    value={track.name}
                    onChange={(e) => onRename(track.id, e.target.value)}
                    className="w-full font-bold text-gray-800 bg-white border border-gray-200 rounded px-2 py-1 focus:border-blue-500 outline-none"
                    placeholder="记录名称..."
                  />
                </div>
                <div className="w-full sm:w-24">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">MAX (Max 30)</label>
                  <input 
                    type="number" 
                    min="1"
                    max="30"
                    value={track.max}
                    onChange={(e) => onMaxChange(track.id, Math.min(30, Math.max(1, parseInt(e.target.value) || 15)))}
                    className="w-full font-mono text-gray-800 bg-white border border-gray-200 rounded px-2 py-1 text-center focus:border-blue-500 outline-none"
                  />
                </div>
              </div>

              {/* The Strip - Scrollable Container */}
              <div className="overflow-x-auto pb-2">
                <div className="flex flex-col gap-2 min-w-max">
                  {/* Row 1: Left to Right */}
                  <div className="flex gap-1 md:gap-2">
                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[15px] border-l-gray-800 border-b-[10px] border-b-transparent mr-2 self-center"></div>
                    {Array.from({ length: Math.min(15, track.max) }).map((_, i) => {
                      const boxNum = i + 1;
                      const isMarked = boxNum <= track.value;
                      
                      return (
                        <div 
                          key={i}
                          onClick={() => onUpdate(track.id, isMarked && boxNum === track.value ? boxNum - 1 : boxNum)}
                          className={`
                            w-8 h-8 md:w-10 md:h-10 border-2 rounded-md flex items-center justify-center text-sm font-mono font-bold cursor-pointer transition-all shrink-0
                            ${isMarked ? 'border-gray-800 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-400 hover:border-gray-500'}
                          `}
                        >
                          <FormatText>{boxNum}</FormatText>
                        </div>
                      );
                    })}
                    {/* Connector if double row */}
                    {isDoubleRow && (
                       <div className="h-full w-4 border-r-4 border-gray-300 rounded-tr-xl rounded-br-xl ml-auto self-stretch" style={{ height: '40px', marginTop: '5px' }}></div>
                    )}
                  </div>

                  {/* Row 2: Right to Left (if needed) */}
                  {isDoubleRow && (
                    <div className="flex flex-row-reverse gap-1 md:gap-2 mr-[14px]"> 
                       <div className="w-4 h-4 rounded-full border-4 border-gray-300 self-center ml-2"></div>
                      {Array.from({ length: track.max - 15 }).map((_, i) => {
                        const boxNum = 16 + i;
                        const isMarked = boxNum <= track.value;
                        
                        return (
                          <div 
                            key={i}
                            onClick={() => onUpdate(track.id, isMarked && boxNum === track.value ? boxNum - 1 : boxNum)}
                            className={`
                              w-8 h-8 md:w-10 md:h-10 border-2 rounded-md flex items-center justify-center text-sm font-mono font-bold cursor-pointer transition-all shrink-0
                              ${isMarked ? 'border-gray-800 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-400 hover:border-gray-500'}
                            `}
                          >
                            <FormatText>{boxNum}</FormatText>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Delete Action */}
              <button 
                onClick={() => onRemove(track.id)}
                className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors"
              >
                <Trash2 size={20} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
