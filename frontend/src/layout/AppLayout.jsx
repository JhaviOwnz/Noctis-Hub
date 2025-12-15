import { NavLink, Outlet } from "react-router-dom";
import { Home, FolderCog, FileText, Receipt } from "lucide-react";

/**
 * Main layout for Noctis Ops Hub.
 * Left sidebar + top bar + content area.
 * Child routes render inside <Outlet />.
 */
export default function AppLayout() {
  const navItems = [
    { label: "Home", icon: Home, to: "/" },
    { label: "OE&S Planner", icon: FolderCog, to: "/oes-planner" },
    { label: "Executive Insights", icon: FileText, to: "/executive-insights" },
    { label: "Refunds", icon: Receipt, to: "/refunds" },
  ];

  return (
    <div className="app-container">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo-circle">N</div>
          <div className="logo-text">
            <span className="logo-title">Noctis Ops Hub</span>
            <span className="logo-subtitle">Internal tools</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  "nav-item" + (isActive ? " nav-item-active" : "")
                }
              >
                <Icon className="nav-icon" size={18} />
                <span className="nav-label">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {/* MAIN AREA */}
      <div className="main-area">
        <header className="topbar">
          <div className="topbar-title">Noctis Operations Workspace</div>
          <div className="topbar-meta">Local environment</div>
        </header>

        <main className="content">
          {/* Aquí se renderizan las páginas hijas */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
