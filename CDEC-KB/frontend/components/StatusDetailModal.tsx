"use client";

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

interface StatusDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  status: Status | null;
}

export default function StatusDetailModal({ isOpen, onClose, status }: StatusDetailModalProps) {
  if (!isOpen || !status) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-4">
      <div className="bg-gray-800 border-2 border-cdec-cyan rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-2xl">
        
        {/* Header */}
        <div className="bg-gray-900 p-6 border-b border-gray-700 sticky top-0">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">{status.status_name}</h2>
              <span className={`px-3 py-1 rounded text-sm font-bold uppercase text-black ${
                 status.module === 'manifest' ? 'bg-purple-300' : 
                 status.module === 'cusdec' ? 'bg-cdec-yellow' : 'bg-gray-200'
              }`}>
                {status.module}
              </span>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl font-bold">&times;</button>
          </div>
          <p className="text-gray-300 mt-4 text-lg">{status.description}</p>
        </div>

        {/* The Operational Logic Grid */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Column 1: Triggers */}
          <div className="bg-gray-900/50 p-4 rounded border border-gray-700">
            <h3 className="text-cdec-yellow font-bold text-lg mb-3 border-b border-gray-700 pb-2">
              ⚠️ Trigger Conditions
            </h3>
            <p className="text-gray-300 whitespace-pre-wrap font-mono text-sm">
              {status.trigger_conditions || "No specific triggers defined."}
            </p>
          </div>

          {/* Column 2: Checks */}
          <div className="bg-gray-900/50 p-4 rounded border border-gray-700">
            <h3 className="text-cdec-cyan font-bold text-lg mb-3 border-b border-gray-700 pb-2">
              🔍 Required Checks
            </h3>
            <p className="text-gray-300 whitespace-pre-wrap font-mono text-sm">
              {status.required_checks || "No manual checks required."}
            </p>
          </div>

          {/* Column 3: Actions */}
          <div className="bg-gray-900/50 p-4 rounded border border-gray-700">
            <h3 className="text-cdec-orange font-bold text-lg mb-3 border-b border-gray-700 pb-2">
              🚀 Next Actions
            </h3>
            <p className="text-gray-300 whitespace-pre-wrap font-mono text-sm">
              {status.next_actions || "No specific actions defined."}
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-gray-900 p-4 border-t border-gray-700 text-right">
          <span className="text-cdec-purple text-sm mr-4">Responsible: {status.owner_role}</span>
          <button onClick={onClose} className="bg-cdec-cyan text-black px-6 py-2 rounded font-bold hover:bg-white">
            Close
          </button>
        </div>

      </div>
    </div>
  );
}