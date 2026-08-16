import React, { useState, useEffect } from 'react';
import { 
  Database, 
  Layers, 
  FileText, 
  Plus, 
  Search, 
  RefreshCw, 
  Check, 
  Cpu, 
  Sparkles,
  SlidersHorizontal,
  FolderOpen
} from 'lucide-react';
import { Document, Chunk, ChunkingStrategy } from '../types';

interface DatasetExplorerProps {
  onReindex: (strategy: ChunkingStrategy) => Promise<void>;
  onAddDocument: (doc: Document) => Promise<void>;
  activeStrategy: ChunkingStrategy;
}

export const DatasetExplorer: React.FC<DatasetExplorerProps> = ({
  onReindex,
  onAddDocument,
  activeStrategy,
}) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [isReindexing, setIsReindexing] = useState(false);
  const [isAddingDoc, setIsAddingDoc] = useState(false);

  // New Doc Form
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState('science');

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const res = await fetch('/api/dataset/documents');
      if (res.ok) {
        const data = await res.json();
        setDocuments(data.documents || []);
        if (data.documents && data.documents.length > 0 && !selectedDoc) {
          setSelectedDoc(data.documents[0]);
        }
      }
    } catch (e) {
      console.warn('Failed to load dataset:', e);
    }
  };

  const handleReindexStrategy = async (strategy: ChunkingStrategy) => {
    setIsReindexing(true);
    try {
      await onReindex(strategy);
      await fetchDocuments();
    } finally {
      setIsReindexing(false);
    }
  };

  const handleCreateDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newDoc: Document = {
      id: `DOC-USR-${Date.now().toString().slice(-4)}`,
      title: newTitle.trim(),
      passage: newContent.trim(),
      content: newContent.trim(),
      source: 'User Upload / MSMARCO Extension',
      metadata: {
        category: newCategory,
        author: 'User',
        date: new Date().toISOString().split('T')[0],
        tokenCount: Math.ceil(newContent.trim().split(/\s+/).length * 1.3),
      },
    };

    try {
      await onAddDocument(newDoc);
      setNewTitle('');
      setNewContent('');
      setIsAddingDoc(false);
      await fetchDocuments();
    } catch (err) {
      console.error('Error adding document:', err);
    }
  };

  const filteredDocs = documents.filter((doc) => {
    if (!searchFilter.trim()) return true;
    const q = searchFilter.toLowerCase();
    return (
      doc.title.toLowerCase().includes(q) ||
      (doc.passage || doc.content || '').toLowerCase().includes(q) ||
      (doc.metadata?.category || '').toLowerCase().includes(q)
    );
  });

  return (
    <section id="dataset" className="py-20 px-4 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="flex flex-col gap-2.5 text-center md:text-left">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-cyan-400 uppercase justify-center md:justify-start font-bold">
            <span className="w-3 h-[2px] bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
            <span>04 / CORPUS EXPLORER</span>
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight">
            MSMARCO-XI Knowledge Base
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl">
            Inspect ingested domain passages, verify chunking segmentation boundaries, or upload custom documents to evaluate real-time index adaptation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAddingDoc(!isAddingDoc)}
            className="flex items-center gap-2 px-5 py-3 rounded-full bg-slate-900 hover:bg-slate-800 border border-cyan-500/30 text-xs font-bold text-cyan-300 hover:text-white transition-all shadow-lg active:scale-95"
          >
            <Plus className="w-4 h-4 text-cyan-400" />
            <span>{isAddingDoc ? 'CANCEL' : 'INGEST DOCUMENT'}</span>
          </button>
        </div>
      </div>

      {/* Upload Document Form Drawer */}
      {isAddingDoc && (
        <form
          onSubmit={handleCreateDocument}
          className="glass-aurora rounded-3xl p-6 sm:p-8 border border-cyan-500/30 mb-8 animate-fadeIn shadow-2xl shadow-cyan-950/40"
        >
          <h3 className="font-display font-bold text-lg text-white mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Ingest New Verified Knowledge Passage</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div className="sm:col-span-2">
              <label className="text-[11px] font-mono text-cyan-300 font-bold uppercase block mb-1">
                Document Title
              </label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. 'Quantum Teleportation Protocols'"
                required
                className="w-full bg-slate-950 border border-cyan-500/25 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono text-cyan-300 font-bold uppercase block mb-1">
                Domain Category
              </label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full bg-slate-950 border border-cyan-500/25 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-400"
              >
                <option value="science">Physics & Science</option>
                <option value="deep_learning">AI & Deep Learning</option>
                <option value="space">Space Exploration</option>
                <option value="geography">Geography & Regional</option>
                <option value="infrastructure">Digital Public Infrastructure</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="text-[11px] font-mono text-cyan-300 font-bold uppercase block mb-1">
              Passage Content
            </label>
            <textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="Paste comprehensive paragraph text here..."
              rows={4}
              required
              className="w-full bg-slate-950 border border-cyan-500/25 rounded-xl p-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 resize-none font-sans"
            />
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-cyan-400/40"
          >
            <span>INGEST & VECTORIZE CHUNKS</span>
          </button>
        </form>
      )}

      {/* Explorer Bento */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Document List (5 cols) */}
        <div className="lg:col-span-5 glass-aurora rounded-3xl p-5 border border-cyan-500/20 flex flex-col gap-4">
          <div className="relative">
            <Search className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Filter corpus documents..."
              className="w-full bg-slate-950/90 border border-cyan-500/25 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="flex flex-col gap-2 max-h-[460px] overflow-y-auto pr-1">
            {filteredDocs.map((doc) => {
              const isSelected = selectedDoc?.id === doc.id;
              return (
                <button
                  key={doc.id}
                  onClick={() => setSelectedDoc(doc)}
                  className={`flex flex-col text-left p-3.5 rounded-2xl border transition-all ${
                    isSelected
                      ? 'bg-cyan-500/15 border-cyan-400/50 shadow-md shadow-cyan-950/40'
                      : 'bg-slate-950/50 border-slate-800/80 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="text-xs font-bold text-white tracking-tight truncate max-w-[220px]">
                      {doc.title}
                    </span>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-300 uppercase">
                      {doc.metadata?.category || 'General'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed font-sans">
                    {doc.passage || doc.content}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Document Detail & Chunks (7 cols) */}
        <div className="lg:col-span-7 glass-aurora rounded-3xl p-6 sm:p-8 border border-cyan-500/20 flex flex-col justify-between">
          {selectedDoc ? (
            <div className="flex flex-col gap-5">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div>
                  <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-widest mb-1">
                    DOC ID: {selectedDoc.id}
                  </div>
                  <h3 className="font-display font-bold text-xl text-white">
                    {selectedDoc.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
                  <span>Category: <strong className="text-cyan-300 uppercase">{selectedDoc.metadata?.category}</strong></span>
                </div>
              </div>

              <div>
                <div className="text-xs font-mono text-cyan-300/80 font-bold uppercase tracking-wider mb-2">
                  FULL VERIFIED PASSAGE TEXT:
                </div>
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-cyan-500/15 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans max-h-64 overflow-y-auto">
                  {selectedDoc.passage || selectedDoc.content}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-800 font-mono text-xs">
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="text-[9px] text-slate-400 uppercase">Author</div>
                  <div className="font-bold text-white truncate">{selectedDoc.metadata?.author || 'MSMARCO'}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="text-[9px] text-slate-400 uppercase">Provenance</div>
                  <div className="font-bold text-cyan-300 truncate">{selectedDoc.source}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="text-[9px] text-slate-400 uppercase">Est Tokens</div>
                  <div className="font-bold text-white">{selectedDoc.metadata?.tokenCount || 120}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="text-[9px] text-slate-400 uppercase">Index Mode</div>
                  <div className="font-bold text-emerald-400">{activeStrategy}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-24 text-center text-slate-500">
              <FolderOpen className="w-12 h-12 mx-auto mb-2 text-slate-600" />
              <div>Select a document to inspect full content & metadata</div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
