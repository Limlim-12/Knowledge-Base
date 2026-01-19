"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import AddStatusModal from "@/components/AddStatusModal";
import AddArticleModal from "@/components/AddArticleModal";
import StatusDetailModal from "@/components/StatusDetailModal"; // NEW IMPORT

// Define Types (Updated with new fields)
interface Status {
  id: number;
  status_name: string;
  module: string;
  description: string;
  owner_role: string;
  trigger_conditions?: string;
  required_checks?: string;
  next_actions?: string;
}

interface Article {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

export default function Home() {
  const [viewMode, setViewMode] = useState<'status' | 'kb'>('status');

  const [statuses, setStatuses] = useState<Status[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Modals
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<Status | null>(null); // NEW STATE

  const fetchData = () => {
    axios.get("http://127.0.0.1:8000/status-definitions/")
      .then((res) => setStatuses(res.data));
    
    axios.get("http://127.0.0.1:8000/articles/")
      .then((res) => setArticles(res.data));
  };

  useEffect(() => { fetchData(); }, []);

  const filteredStatuses = statuses.filter(s => 
    s.status_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredArticles = articles.filter(a => 
    a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-cdec-slate text-white p-10">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-cdec-cyan">CDEC Knowledge Base</h1>
        <div className="flex gap-2">
          <button 
            onClick={() => setViewMode('status')}
            className={`px-6 py-2 rounded font-bold ${viewMode === 'status' ? 'bg-cdec-orange text-white' : 'bg-gray-700 text-gray-400'}`}
          >
            Status Reference
          </button>
          <button 
            onClick={() => setViewMode('kb')}
            className={`px-6 py-2 rounded font-bold ${viewMode === 'kb' ? 'bg-cdec-cyan text-black' : 'bg-gray-700 text-gray-400'}`}
          >
            Error Codes & Guides
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex justify-between bg-gray-800 p-4 rounded-lg mb-8">
        <input 
          type="text" 
          placeholder={`Search ${viewMode === 'status' ? 'statuses' : 'errors'}...`}
          className="bg-gray-700 text-white p-2 rounded w-1/3 focus:outline-none focus:ring-2 focus:ring-cdec-orange"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <button 
          onClick={() => viewMode === 'status' ? setIsStatusModalOpen(true) : setIsArticleModalOpen(true)}
          className="bg-gray-600 hover:bg-white hover:text-black text-white px-4 py-2 rounded font-bold transition"
        >
          + Add New {viewMode === 'status' ? 'Status' : 'Article'}
        </button>
      </div>

      {/* CONTENT AREA */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* VIEW 1: STATUSES */}
        {viewMode === 'status' && filteredStatuses.map((item) => (
          <div 
            key={item.id} 
            onClick={() => setSelectedStatus(item)} // CLICK TO OPEN DETAIL
            className="bg-gray-800 border-l-4 border-cdec-orange p-6 rounded-lg shadow-lg hover:shadow-cdec-cyan/50 transition cursor-pointer"
          >
            <h2 className="text-xl font-bold text-white mb-2">{item.status_name}</h2>
            <span className={`text-xs px-2 py-1 rounded uppercase font-bold text-black ${
                 item.module === 'manifest' ? 'bg-purple-300' : 
                 item.module === 'cusdec' ? 'bg-cdec-yellow' : 'bg-gray-200'
              }`}>
                {item.module}
            </span>
            <p className="text-gray-300 text-sm mt-3">{item.description}</p>
          </div>
        ))}

        {/* VIEW 2: ARTICLES */}
        {viewMode === 'kb' && filteredArticles.map((item) => (
          <div key={item.id} className="bg-gray-800 border-t-4 border-cdec-cyan p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold text-cdec-cyan mb-2">{item.title}</h2>
            <div className="text-gray-300 text-sm whitespace-pre-wrap font-mono bg-gray-900 p-3 rounded max-h-40 overflow-y-auto">
              {item.content}
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Posted: {new Date(item.created_at).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      <AddStatusModal isOpen={isStatusModalOpen} onClose={() => setIsStatusModalOpen(false)} onSuccess={fetchData} />
      <AddArticleModal isOpen={isArticleModalOpen} onClose={() => setIsArticleModalOpen(false)} onSuccess={fetchData} />
      
      {/* NEW DETAIL MODAL */}
      <StatusDetailModal 
        isOpen={!!selectedStatus} 
        onClose={() => setSelectedStatus(null)} 
        status={selectedStatus} 
      />

    </main>
  );
}