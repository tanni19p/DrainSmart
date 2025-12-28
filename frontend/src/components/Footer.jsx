import { Droplets } from 'lucide-react';

const Footer = () => (
  <footer className="bg-slate-800 text-gray-300 mt-12">
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="grid grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Droplets className="w-6 h-6 text-cyan-400" />
            <div className="font-bold text-white">MonsoonGuard</div>
          </div>
          <p className="text-sm text-gray-400">
            Proactive water-logging risk management for Delhi
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-3">Quick Links</h4>
          <div className="space-y-2 text-sm">
            <div>Risk Map</div>
            <div>Citizen Portal</div>
            <div>Emergency Contacts</div>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-3">Contact</h4>
          <div className="text-sm">
            <div>Municipal Corporation of Delhi</div>
            <div className="text-gray-400">monsoonguard@delhigov.in</div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
        © 2025 Municipal Corporation of Delhi. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
