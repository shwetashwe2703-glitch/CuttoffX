import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  Target,
  Share2,
  ArrowRight,
} from 'lucide-react';

export default function Layout({ children }) {
  const location = useLocation();

  const navItems = [
    {
      name: 'Dashboard',
      path: '/',
      icon: LayoutDashboard,
    },
    {
      name: 'Companies',
      path: '/companies',
      icon: Building2,
    },
    {
      name: 'Strategist',
      path: '/strategist',
      icon: Target,
    },
    {
      name: 'Share Experience',
      path: '/submit',
      icon: Share2,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/20">
              <Target className="h-5 w-5 text-white" />
            </div>

            <div className="hidden sm:block">
              <div className="text-sm font-bold tracking-tight">
                SRM Placement Strategist
              </div>
              <div className="text-xs text-slate-400">
                Turn uncertainty into a strategy.
              </div>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active =
                item.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                    active
                      ? 'bg-white/10 text-white'
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* CTA */}
          <Link
            to="/strategist"
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
          >
            <span className="hidden sm:inline">Build My Strategy</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Mobile navigation */}
        <div className="border-t border-white/5 md:hidden">
          <nav className="mx-auto flex max-w-7xl overflow-x-auto px-4 py-2 sm:px-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active =
                item.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`mr-2 flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium ${
                    active
                      ? 'bg-white/10 text-white'
                      : 'text-slate-400'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-8 text-center sm:px-6 lg:px-8">
          <p className="text-sm text-slate-500">
            Independent student project • Community-reported information
          </p>

          <p className="mx-auto mt-2 max-w-2xl text-xs leading-5 text-slate-600">
            SRM Placement Strategist is not an official SRM placement portal.
            Community-reported information may be incomplete or inaccurate and
            should not be treated as official placement policy.
          </p>
        </div>
      </footer>
    </div>
  );
}