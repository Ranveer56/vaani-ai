import React, { useState } from 'react';
import { Database, Search, ExternalLink, Layers, CheckCircle2, Globe } from 'lucide-react';
import { ChunkingStrategy } from '../types';
import { AI4BHARAT_MSMARCO_XI_DATASET } from '../data/ai4bharatDataset';

interface DatasetExplorerProps {
  activeStrategy: ChunkingStrategy;
  onStrategyChange: (s: ChunkingStrategy) => void;
}

export const DatasetExplorer: React.FC<DatasetExplorerProps> = ({
  activeStrategy,
  onStrategyChange,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');

  const filteredDocs = AI4BHARAT_MSMARCO_XI_DATASET.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.keywords.some((k) => k.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesLang =
      selectedLanguage === 'all' || doc.language.toLowerCase().includes(selectedLanguage.toLowerCase());

    return matchesSearch && matchesLang;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900/90 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono mb-1">
            <Database className="w-4 h-4" />
            <span>AI4BHARAT MSMARCO-XI CORPUS // VERIFIED VECTOR STORE</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">Dataset & Knowledge Explorer</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Official HuggingFace dataset partitioned across 11 Indian languages with dense embeddings & BM25 indexing.
          </p>
        </div>

        <a
          href="https://huggingface.co/datasets/ai4bharat/MSMARCO-XI"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold transition-all shadow-[0_0_15px_rgba(6,182,212,0.15)]"
        >
          <span>HuggingFace Dataset</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search AI4Bharat MSMARCO-XI dataset passages by keyword, state, topic, language..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 outline-none focus:border-cyan-500 transition-all placeholder:text-slate-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-slate-400" />
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 outline-none focus:border-cyan-500"
          >
            <option value="all">All Languages (11 Indic)</option>
            <option value="Hindi">Hindi (hi)</option>
            <option value="Bengali">Bengali (bn)</option>
            <option value="Tamil">Tamil (ta)</option>
            <option value="Telugu">Telugu (te)</option>
            <option value="Marathi">Marathi (mr)</option>
            <option value="Gujarati">Gujarati (gu)</option>
            <option value="English">English (en)</option>
          </select>
        </div>
      </div>

      {/* Grid of Passages */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 transition-all space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-[10px] text-cyan-400 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-800/40">
                  {doc.id}
                </span>
                <span className="font-mono text-[10px] text-slate-400">
                  {doc.language}
                </span>
              </div>

              <h4 className="text-sm font-semibold text-white line-clamp-1">{doc.title}</h4>
              <p className="text-xs text-slate-400 line-clamp-4 leading-relaxed">{doc.content}</p>
            </div>

            <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
              <span className="text-slate-500 font-mono truncate max-w-[160px]">{doc.section}</span>
              <span className="text-emerald-400 flex items-center gap-1 font-mono text-[10px]">
                <CheckCircle2 className="w-3 h-3" /> Indexed
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DatasetExplorer;
