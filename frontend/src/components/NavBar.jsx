import { Droplets } from 'lucide-react';

const NavBar = ({ activeView, setActiveView }) => {
  return (
    <nav className="bg-slate-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between">
        <div className="flex items-center gap-3">
          <Droplets className="w-8 h-8 text-cyan-400" />
          <div>
            <h1 className="text-xl font-bold">MonsoonGuard</h1>
            <p className="text-xs text-cyan-300">
              Delhi Water-logging Risk Management System
            </p>
          </div>
        </div>

        <div className="flex gap-1">
          {['home','map','analytics','admin','citizen','about'].map(view => (
            <button
              key={view}
              onClick={() => setActiveView(view)}
              className={`px-4 py-2 rounded text-sm font-medium ${
                activeView === view
                  ? 'bg-cyan-600'
                  : 'text-gray-300 hover:bg-slate-700'
              }`}
            >
              {view.charAt(0).toUpperCase() + view.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
