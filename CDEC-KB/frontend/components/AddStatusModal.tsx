"use client";
import { useState } from "react";
import axios from "axios";

interface AddStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddStatusModal({ isOpen, onClose, onSuccess }: AddStatusModalProps) {
  // Updated State with new fields
  const [formData, setFormData] = useState({
    status_name: "",
    module: "manifest",
    description: "",
    owner_role: "",
    trigger_conditions: "",
    required_checks: "",
    next_actions: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/status-definitions/", formData);
      onSuccess();
      onClose();
      // Reset form
      setFormData({ 
        status_name: "", module: "manifest", description: "", owner_role: "",
        trigger_conditions: "", required_checks: "", next_actions: ""
      }); 
    } catch (error) {
      console.error("Failed to add status", error);
      alert("Error adding status.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-gray-800 border-2 border-cdec-purple p-6 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-cdec-cyan mb-6">Add New Status Logic</h2>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* LEFT COLUMN: Basic Info */}
          <div className="space-y-4">
            <div>
              <label className="block text-cdec-purple text-sm mb-1">Status Name</label>
              <input 
                type="text" required
                className="w-full bg-gray-700 text-white p-2 rounded focus:ring-2 focus:ring-cdec-orange"
                value={formData.status_name}
                onChange={(e) => setFormData({...formData, status_name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-cdec-purple text-sm mb-1">Module</label>
              <select 
                className="w-full bg-gray-700 text-white p-2 rounded focus:ring-2 focus:ring-cdec-orange"
                value={formData.module}
                onChange={(e) => setFormData({...formData, module: e.target.value})}
              >
                <option value="manifest">Manifest</option>
                <option value="cusdec">CUSDEC</option>
                <option value="payment">Payment</option>
                <option value="release">Release</option>
              </select>
            </div>
            <div>
              <label className="block text-cdec-purple text-sm mb-1">Owner Role</label>
              <input 
                type="text" required
                className="w-full bg-gray-700 text-white p-2 rounded focus:ring-2 focus:ring-cdec-orange"
                value={formData.owner_role}
                onChange={(e) => setFormData({...formData, owner_role: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-cdec-purple text-sm mb-1">Description</label>
              <textarea 
                required rows={3}
                className="w-full bg-gray-700 text-white p-2 rounded focus:ring-2 focus:ring-cdec-orange"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>
          </div>

          {/* RIGHT COLUMN: Operational Logic (New) */}
          <div className="space-y-4 bg-gray-900 p-4 rounded border border-gray-700">
             <div>
              <label className="block text-cdec-yellow text-sm mb-1 font-bold">Trigger Conditions (When?)</label>
              <textarea 
                rows={2} placeholder="e.g. Received error code 501..."
                className="w-full bg-gray-700 text-white p-2 rounded focus:ring-2 focus:ring-cdec-yellow"
                value={formData.trigger_conditions}
                onChange={(e) => setFormData({...formData, trigger_conditions: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-cdec-cyan text-sm mb-1 font-bold">Required Checks (What to verify?)</label>
              <textarea 
                rows={2} placeholder="e.g. Check BOL number in manifest system..."
                className="w-full bg-gray-700 text-white p-2 rounded focus:ring-2 focus:ring-cdec-cyan"
                value={formData.required_checks}
                onChange={(e) => setFormData({...formData, required_checks: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-cdec-orange text-sm mb-1 font-bold">Allowed Next Actions (Fix?)</label>
              <textarea 
                rows={2} placeholder="e.g. Escalate to Level 2 or Trigger re-send..."
                className="w-full bg-gray-700 text-white p-2 rounded focus:ring-2 focus:ring-cdec-orange"
                value={formData.next_actions}
                onChange={(e) => setFormData({...formData, next_actions: e.target.value})}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="col-span-1 md:col-span-2 flex justify-end gap-3 mt-4 border-t border-gray-600 pt-4">
            <button type="button" onClick={onClose} className="text-gray-400 hover:text-white">Cancel</button>
            <button type="submit" className="bg-cdec-orange text-white px-6 py-2 rounded font-bold hover:bg-orange-600">Save Status Logic</button>
          </div>

        </form>
      </div>
    </div>
  );
}