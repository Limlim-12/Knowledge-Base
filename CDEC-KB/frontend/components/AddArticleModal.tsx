"use client";
import { useState } from "react";
import axios from "axios";

interface AddArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddArticleModal({ isOpen, onClose, onSuccess }: AddArticleModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "Error Code", 
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/articles/", formData);
      onSuccess();
      onClose();
      setFormData({ title: "", content: "", category: "Error Code" });
    } catch (error) {
      console.error("Failed to add article", error);
      alert("Error adding article.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-gray-800 border-2 border-cdec-cyan p-8 rounded-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-cdec-cyan mb-6">Add Knowledge Article</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Title / Error Code */}
          <div>
            <label className="block text-cdec-purple text-sm mb-1">Title (or Error Code)</label>
            <input 
              type="text" 
              required
              placeholder="e.g. Error 503: Gateway Timeout or How to reset password"
              className="w-full bg-gray-700 text-white p-2 rounded focus:ring-2 focus:ring-cdec-cyan"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>

          {/* Content Area */}
          <div>
            <label className="block text-cdec-purple text-sm mb-1">Solution / Content</label>
            <textarea 
              required
              rows={10}
              placeholder="Type the step-by-step solution here..."
              className="w-full bg-gray-700 text-white p-2 rounded focus:ring-2 focus:ring-cdec-cyan font-mono text-sm"
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button type="button" onClick={onClose} className="text-gray-400 hover:text-white">Cancel</button>
            <button type="submit" className="bg-cdec-cyan text-black px-6 py-2 rounded font-bold hover:bg-white transition">
              Publish Article
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}