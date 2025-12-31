const Footer = ({ setActiveView }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-24 border-t border-slate-700 shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.7)]">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 text-white text-xl font-semibold">
            DrainSmart
          </div>
          <p className="text-sm mt-3 text-slate-400">
            Proactive water-logging risk management for Delhi
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li
              onClick={() => setActiveView("map")}
              className="cursor-pointer hover:text-white transition"
            >
              Risk Map
            </li>
            <li
              onClick={() => setActiveView("citizen")}
              className="cursor-pointer hover:text-white transition"
            >
              Citizen Portal
            </li>
            <li
              onClick={() => {
                setActiveView("home");
                setTimeout(() => {
                  document
                    .getElementById("emergency-contacts")
                    ?.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
              className="cursor-pointer hover:text-white transition"
            >
              Emergency Contacts
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold mb-3">Contact</h4>
          <p className="text-sm text-slate-400">
            Municipal Corporation of Delhi <br />
            drainsmart@delhigov.in
          </p>
        </div>
      </div>

      <div className="border-t border-slate-700 text-center py-4 text-sm text-slate-400">
        © 2025 Municipal Corporation of Delhi. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
