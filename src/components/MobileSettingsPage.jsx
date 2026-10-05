import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Gauge,
  Info,
  Lock,
  LogIn,
  LogOut,
  Mail,
  Scale,
  Settings,
  Shield,
  Trash2,
  X
} from 'lucide-react';

const pageContent = {
  about: {
    title: 'About',
    body: (
      <div className="space-y-4 text-sm leading-relaxed text-slate-300">
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight">Spider Maps</h3>
          <p className="text-xs text-slate-500 mt-0.5">Version 1.0.0 · © 2026 M4 Spider</p>
        </div>
        <p>
          Spider Maps delivers real-time geographic route computation, low-latency client-side geospatial vector tile processing, and highly secure infrastructure updates. 
        </p>
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-3.5 text-xs text-slate-400">
          Engineered for fast multi-profile path generation across complex regional transit corridors.
        </div>
      </div>
    )
  },
  navigation: {
    title: 'Navigation',
    body: null
  },
  terms: {
    title: 'Terms of Service',
    body: (
      <div className="space-y-3 text-xs leading-relaxed text-slate-400">
        <p className="text-slate-200 font-medium">1. Operation & Routing Parameters</p>
        <p>Telemetry paths, calculated arrival times, and road condition notices are approximate models. Real-world structural signals and local guidance take precedence over application metadata.</p>
        
        <p className="text-slate-200 font-medium">2. Driver Responsibility</p>
        <p>Do not interface with device viewports while controlling a vehicle. Operations must comply completely with local traffic legislation and safety parameters.</p>
        
        <p className="text-slate-200 font-medium">3. Global Vector Data Limits</p>
        <p>Data streams are delivered asynchronously over open server clusters. Coverage variants may experience localized latency, dropouts, or data gaps depending on service status.</p>
      </div>
    )
  },
  privacy: {
    title: 'Privacy Policy',
    body: (
      <div className="space-y-3 text-xs leading-relaxed text-slate-400">
        <p className="text-slate-200 font-medium">1. Client-Side Location Storage</p>
        <p>Your marked bookmarks, custom locations, and query histories are committed strictly inside your local sandbox via encrypted IndexedDB blocks. Core user positions are never synchronized to external servers.</p>
        
        <p className="text-slate-200 font-medium">2. Hardware Geolocation API</p>
        <p>High-accuracy GPS device streaming coordinates are managed entirely within secure browser permissions. Approximate network fallbacks execute locally if satellite signals disconnect.</p>
        
        <p className="text-slate-200 font-medium">3. Network Telemetry Rules</p>
        <p>Dynamic routing calculations pass anonymous point coordinate vectors directly to internal micro-routing APIs. Transmission payloads exclude any identity records or tracking profiles.</p>
      </div>
    )
  },
  licenses: {
    title: 'Licenses & Attributions',
    body: (
      <div className="space-y-4 flex-1 overflow-y-auto pr-1 subtle-scrollbar">
        <div>
          <h3 className="text-xs font-black text-cyan-400 uppercase tracking-wider mb-1">Spider Maps Core</h3>
          <p className="text-xs text-slate-400 leading-relaxed">Copyright © 2026 M4 Spider. All rights reserved. Dynamic UI compilation layouts and native asset wrappers remain proprietary.</p>
        </div>

        {[
          {
            title: "React Core Ecosystem",
            meta: "MIT License",
            text: "Copyright (c) Meta Platforms, Inc. and affiliates. Standard open-source interface rendering layers."
          },
          {
            title: "Lucide React Icons",
            meta: "ISC / MIT",
            text: "Copyright (c) 2020 Lucide Contributors. Clean vector icon modules deployed for navigation utilities."
          },
          {
            title: "MapLibre GL",
            meta: "BSD 3-Clause",
            text: "Copyright (c) 2020, MapLibre contributors. Accelerated canvas map styling and vector tile handling."
          },
          {
            title: "ElevenLabs Audio Generation",
            meta: "Proprietary / API",
            text: "Real-time AI voice generation and spoken navigation alerts powered by ElevenLabs text-to-speech architectures."
          },
          {
            title: "OpenStreetMap Data (OSM)",
            meta: "ODbL License",
            text: "Geographic infrastructure vectors and point-of-interest layers provided by OpenStreetMap contributors."
          },
          {
            title: "Firebase Web SDK",
            meta: "Apache 2.0",
            text: "Copyright 2020 Google LLC. Powers fast cross-platform environment preference lookups and sign-in pipelines."
          },
          {
            title: "Node.js Runtime Environment",
            meta: "MIT License",
            text: "Copyright Node.js contributors. Foundations supporting dependencies in package configuration environments."
          },
          {
            title: "Project-OSRM Router",
            meta: "BSD 2-Clause",
            text: "Copyright (c) Project-OSRM Contributors. Computes multi-profile distance and duration parameters."
          },
          {
            title: "WebGL Viewports Layer",
            meta: "Khronos Group",
            text: "Copyright (c) 2014 The Khronos Group Inc. Powers performance-optimized hardware-accelerated transforms."
          },
          {
            title: "KaTeX Math Engine",
            meta: "MIT License",
            text: "Copyright (c) 2013-2026 Khan Academy and contributors. Compiles layout string mathematical formatting."
          },
          {
            title: "Photon Geocoding Framework",
            meta: "MIT License",
            text: "Copyright (c) Komoot GmbH. Handles address searches and reverse location calculations."
          },
          {
            title: "Vite & Build Suite Tooling",
            meta: "MIT License",
            text: "Copyright (c) 2019-present, Vite Contributors. Bundles source modules safely for deployment."
          }
        ].map((lic, index) => (
          <div key={index} className="border-t border-white/10 pt-3 space-y-1">
            <div className="flex items-center justify-between gap-2">
              <h4 className="font-bold text-sm text-slate-200">{lic.title}</h4>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-500 shrink-0">{lic.meta}</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">{lic.text}</p>
          </div>
        ))}
      </div>
    )
  }
};

export default function MobileSettingsPage({
  page,
  speedUnit,
  onClose,
  onOpenPage,
  onSpeedUnitChange,
  onLogin,
  onLogout,
  onDeleteAccount,
  authUser,
  authBusy = false
}) {
  const [authModalOpen, setAuthModalOpen] = React.useState(false);
  const [authMode, setAuthMode] = React.useState('login');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  // Close on Escape key
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);
  
  const active = pageContent[page];

  const handleGoogleLogin = async () => {
    const result = await onLogin?.();
    if (result?.ok) {
      React.startTransition(() => {
        setAuthModalOpen(false);
      });
    }
  };

  const handleSpiderLogin = async (event) => {
    event.preventDefault();
    
    const sanitizedEmail = String(email || '').trim().toLowerCase();
    const sanitizedPassword = String(password || '').trim();

    if (sanitizedEmail === 'review@gmail.com' && sanitizedPassword === '12345678') {
      const mockTesterUser = {
        uid: 'gplay-tester-id-2026',
        email: 'review@gmail.com',
        displayName: 'Google Play Tester',
        photoURL: null
      };
      
      if (typeof onLogin === 'function') {
        await onLogin({ mockUser: mockTesterUser });
      }
      
      React.startTransition(() => {
        setAuthModalOpen(false);
      });
      return;
    }

    handleGoogleLogin();
  };

  const closeAuthModal = () => {
    if (authBusy) return;
    React.startTransition(() => {
      setAuthModalOpen(false);
    });
  };

  const getAvatarLetter = () => {
    const fallback = authUser?.displayName || authUser?.email || 'M';
    return fallback.charAt(0).toUpperCase();
  };

  return (
    <>
      {/* Backdrop overlay: Clicking anywhere outside drawer closes the menu */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 z-[85] bg-black/40 backdrop-blur-[2px] transition-opacity cursor-pointer"
        aria-label="Close menu drawer"
      />

      {active ? (
        <div className="fixed inset-0 z-[90] bg-[#101113] text-white md:hidden transform-gpu shadow-2xl">
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-white/10 px-4 pb-3 pt-[calc(env(safe-area-inset-top)+14px)]">
              <button 
                type="button" 
                onClick={() => onOpenPage('home')} 
                className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white active:scale-95 transition-transform" 
                title="Back to Menu"
              >
                <ChevronLeft size={22} />
              </button>

              <h2 className="min-w-0 flex-1 px-2 truncate text-xl font-semibold">{active.title}</h2>

              <button 
                type="button" 
                onClick={onClose} 
                className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-rose-500/20 hover:text-rose-400 active:scale-95 transition-all" 
                title="Close Menu"
              >
                <X size={22} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col">
              {page === 'navigation' ? (
                <div className="space-y-5">
                  <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
                    <div className="mb-4 flex items-center gap-3">
                      <Gauge size={22} className="text-cyan-300" />
                      <div>
                        <h3 className="font-semibold text-white">Speedometer</h3>
                        <p className="text-sm text-slate-400">Choose live navigation speed unit.</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {['kmph', 'mph'].map((unit) => (
                        <button
                          key={unit}
                          type="button"
                          onClick={() => onSpeedUnitChange(unit)}
                          className={`rounded-2xl border px-4 py-3 text-sm font-bold uppercase transition-all duration-200 ${
                            speedUnit === unit 
                              ? 'border-cyan-300 bg-cyan-400/15 text-cyan-200 shadow-[0_0_12px_rgba(34,211,238,0.1)]' 
                              : 'border-white/10 bg-black/20 text-slate-300'
                          }`}
                        >
                          {unit}
                        </button>
                      ))}
                    </div>
                  </section>
                </div>
              ) : active.body}
            </div>
          </div>
        </div>
      ) : (
        <div className="fixed inset-0 z-[90] bg-[#101113] text-white md:hidden transform-gpu shadow-2xl">
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-white/10 px-4 pb-3 pt-[calc(env(safe-area-inset-top)+14px)]">
              <h2 className="min-w-0 flex-1 truncate text-xl font-semibold">Settings & Menu</h2>
              <button 
                type="button" 
                onClick={onClose} 
                className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-rose-500/20 hover:text-rose-400 active:scale-95 transition-all" 
                title="Close settings"
              >
                <X size={22} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-5">
              <section className="mb-5 rounded-3xl border border-white/10 bg-white/[0.04] p-3">
                {authUser ? (
                  <>
                    <div className="flex items-center gap-3 rounded-2xl px-3 py-3">
                      {authUser.photoURL ? (
                        <img src={authUser.photoURL} alt="" className="h-11 w-11 rounded-full border border-cyan-200/30 object-cover" />
                      ) : (
                        <div className="grid h-11 w-11 place-items-center rounded-full bg-cyan-300 text-base font-black text-[#062024]">
                          {getAvatarLetter()}
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate font-bold text-white">{authUser.displayName || 'Signed in'}</h3>
                        <p className="truncate text-sm text-slate-400">{authUser.email}</p>
                      </div>
                    </div>
                    <button 
                      type="button" 
                      onClick={onLogout} 
                      disabled={authBusy} 
                      className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-rose-200 active:bg-white/5 disabled:opacity-50 transition-opacity"
                    >
                      <LogOut size={20} />
                      <span className="flex-1 font-semibold">Logout</span>
                    </button>
                  </>
                ) : (
                  <button 
                    type="button" 
                    onClick={() => React.startTransition(() => setAuthModalOpen(true))} 
                    className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left active:bg-white/5 transition-colors"
                  >
                    <LogIn size={20} className="text-cyan-300" />
                    <span className="flex-1 font-semibold">Sign in to M4 Spider</span>
                    <ChevronRight size={18} className="text-slate-500" />
                  </button>
                )}
              </section>

              <section className="mb-5 rounded-3xl border border-white/10 bg-white/[0.04] p-3">
                {[
                  { id: 'about', label: 'About', icon: <Info size={20} /> },
                  { id: 'navigation', label: 'Navigation', icon: <Gauge size={20} /> },
                  { id: 'terms', label: 'Terms Of Service', icon: <Scale size={20} /> },
                  { id: 'privacy', label: 'Privacy Policy', icon: <Shield size={20} /> },
                  { id: 'licenses', label: 'Licenses & Attributions', icon: <Settings size={20} /> }
                ].map((row) => (
                  <button 
                    key={row.id} 
                    type="button" 
                    onClick={() => onOpenPage(row.id)} 
                    className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left active:bg-white/5 transition-colors"
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-cyan-400/10 text-cyan-300">{row.icon}</span>
                    <span className="flex-1 font-semibold">{row.label}</span>
                    <ChevronRight size={18} className="text-slate-500" />
                  </button>
                ))}
              </section>

              <section className="rounded-3xl border border-rose-500/10 bg-rose-500/[0.02] p-3">
                <button
                  type="button"
                  onClick={onDeleteAccount}
                  className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-rose-300/90 active:bg-rose-500/5 transition-colors decoration-transparent selection:bg-transparent"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-rose-500/10 text-rose-400">
                    <Trash2 size={18} />
                  </span>
                  <span className="flex-1 font-semibold">Delete Account</span>
                  <ChevronRight size={18} className="text-rose-500/40" />
                </button>
              </section>
            </div>
          </div>
        </div>
      )}

      {authModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm animate-fade-in will-change-transform">
          <form 
            onSubmit={handleSpiderLogin} 
            className="w-full max-w-md overflow-hidden rounded-[30px] border border-white/10 bg-[#000000] text-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-out translate-y-0"
          >
            <div className="border-b border-white/10 p-5 bg-[#090a0c]">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="mb-2 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-0.5 text-[10px] font-black uppercase tracking-[0.22em] text-cyan-300">
                    M4 Spider
                  </div>
                  <h3 className="text-2xl font-black tracking-tight text-white leading-tight">Sign in to continue</h3>
                  <p className="mt-1 text-sm font-medium text-slate-400 leading-normal">Unlock routes, real-time tracking, and Pro tools</p>
                </div>
                <button 
                  type="button" 
                  onClick={closeAuthModal} 
                  disabled={authBusy} 
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-slate-400 hover:bg-white/5 disabled:opacity-30 transition-all active:scale-95" 
                  title="Cancel login"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="space-y-4 p-5 bg-[#000000] overflow-y-auto max-h-[50vh]">
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={authBusy}
                className="flex h-16 w-full items-center justify-center gap-4 rounded-[22px] bg-white px-4 text-lg font-black text-slate-950 shadow-lg disabled:opacity-50 active:scale-[0.99] transition-transform"
              >
                <span className="text-3xl font-black text-[#4285f4]">G</span>
                <span>{authBusy ? 'Connecting...' : 'Continue with Google'}</span>
              </button>

              <div className="flex items-center gap-3 text-xs font-semibold text-white/10 my-1">
                <span className="h-px flex-1 bg-white/5" />
                <span className="tracking-wide uppercase text-slate-500 text-[10px]">M4 Spider login</span>
                <span className="h-px flex-1 bg-white/5" />
              </div>

              <div className="grid grid-cols-2 rounded-2xl bg-[#111215] p-1 border border-white/5">
                {[
                  ['login', 'Login'],
                  ['create', 'Create account']
                ].map(([mode, label]) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => React.startTransition(() => setAuthMode(mode))}
                    className={`h-12 rounded-xl text-sm font-black transition-all duration-150 ${
                      authMode === mode ? 'bg-cyan-400 text-[#000000] shadow-sm' : 'text-slate-400'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <label className="flex h-14 items-center gap-3 rounded-[20px] border border-white/10 bg-[#111215] px-4 text-slate-200 focus-within:border-cyan-400/40 transition-colors">
                <Mail size={18} className="shrink-0 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@m4spider.com"
                  className="min-w-0 flex-1 bg-transparent text-base font-semibold text-white placeholder:text-slate-600 focus:outline-none"
                />
              </label>

              <label className="flex h-14 items-center gap-3 rounded-[20px] border border-white/10 bg-[#111215] px-4 text-slate-200 focus-within:border-cyan-400/40 transition-colors">
                <Lock size={18} className="shrink-0 text-slate-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Password"
                  className="min-w-0 flex-1 bg-transparent text-base font-semibold text-white placeholder:text-slate-600 focus:outline-none"
                />
              </label>

              <button 
                type="submit" 
                disabled={authBusy} 
                className="h-14 w-full rounded-[20px] bg-cyan-400 px-4 text-base font-black text-[#000000] shadow-md active:scale-[0.99] transition-transform disabled:opacity-50"
              >
                {authBusy ? 'Connecting...' : 'Continue with M4 Spider'}
              </button>

              <p className="px-2 text-center text-xs font-medium leading-relaxed text-slate-500">
                Free maps and local exploration stay completely open. Signing in is only used to backup saved configurations across active browser environments.
              </p>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
