import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/* ── Clean SVG line-art icons ── */
const IconDashboard = () => (
  <svg className="nav-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="7" height="7" rx="1.5"/>
    <rect x="11" y="2" width="7" height="7" rx="1.5"/>
    <rect x="2" y="11" width="7" height="7" rx="1.5"/>
    <rect x="11" y="11" width="7" height="7" rx="1.5"/>
  </svg>
);

const IconTasks = () => (
  <svg className="nav-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 10l2 2 4-4"/>
    <rect x="3" y="3" width="14" height="14" rx="2"/>
  </svg>
);

const IconLogout = () => (
  <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 10H3M13 10l-3-3M13 10l-3 3"/>
    <path d="M7 4H4a1 1 0 00-1 1v10a1 1 0 001 1h3"/>
  </svg>
);

const navItems = [
  { label: 'My Dashboard', path: '/talent/dashboard', Icon: IconDashboard },
  { label: 'My Tasks',     path: '/talent/tasks',     Icon: IconTasks     },
];

const TalentSidebar = () => {
  const { user, logout } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();

  return (
    <aside className="left-0 z-50 fixed inset-y-0 flex flex-col w-[220px]"
      style={{ background: '#0D0D0D' }}>

      {/* Brand */}
      <div className="flex justify-center items-center px-5 py-6">
        <img src="/modelsuite-talents.png" alt="ModelSuite Talents" className="w-36 h-auto object-contain" />
      </div>

      <div className="mx-4 sidebar-divider" />

      {/* Nav */}
      <nav className="flex flex-col flex-1 gap-0.5 px-3 pt-5">
        <p className="mb-2 px-2 font-semibold text-[9.5px] uppercase tracking-[0.12em]"
          style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'Inter, sans-serif' }}>
          Menu
        </p>

        {navItems.map(({ label, path, Icon }) => {
          const isActive = location.pathname === path || location.pathname.startsWith(path + '/');
          return (
            <button key={path}
              onClick={() => navigate(path)}
              className={`nav-item ${isActive ? 'nav-active' : ''}`}>
              <Icon />
              <span>{label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 pb-5">
        <div className="mb-4 sidebar-divider" />
        <div className="flex justify-between items-center gap-2 px-1">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex justify-center items-center rounded-full w-8 h-8 font-bold text-[12px] text-white avatar-talent shrink-0">
              {user?.name?.[0]?.toUpperCase() ?? 'T'}
            </div>
            <div className="min-w-0">
              <p className="max-w-[100px] font-semibold text-[13px] truncate"
                style={{ color: '#E5E2E1', fontFamily: 'Inter, sans-serif' }}>
                {user?.name}
              </p>
              <p className="text-[11px]" style={{ color: '#4B5563' }}>Talent</p>
            </div>
          </div>

          <button
            onClick={() => { logout(); navigate('/login'); }}
            title="Sign out"
            className="logout-btn">
            <IconLogout />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default TalentSidebar;
