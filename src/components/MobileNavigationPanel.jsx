import React, { useEffect, useRef, useState } from 'react';
import {
  AlertTriangle,
  ArrowUp,
  ArrowUpFromLine,
  Compass,
  CornerUpLeft,
  CornerUpRight,
  Crosshair,
  MapPin,
  Layers,
  Map as MapIcon,
  MoveUpLeft,
  MoveUpRight,
  Navigation,
  Route,
  RotateCcw,
  Search,
  Share2,
  Spline,
  Volume2,
  VolumeX,
  X
} from 'lucide-react';

const getManeuverDisplay = (instruction = '', kind = '') => {
  const text = String(instruction || '').toLowerCase();
  if (/\barriv/.test(text)) return { symbol: '⌖', label: 'Arrived', kind: 'arrive', Icon: MapPin };
  if (kind === 'bend-left') return { symbol: 'BL', label: 'Bear left', kind: 'bend-left', Icon: MoveUpLeft };
  if (kind === 'bend-right') return { symbol: 'BR', label: 'Bear right', kind: 'bend-right', Icon: MoveUpRight };
  if (kind === 'left') return { symbol: 'L', label: 'Turn left', kind: 'left', Icon: CornerUpLeft };
  if (kind === 'right') return { symbol: 'R', label: 'Turn right', kind: 'right', Icon: CornerUpRight };
  if (kind === 'straight') return { symbol: '↑', label: 'Go straight', kind: 'straight', Icon: ArrowUp };
  if (/\bu[-\s]?turn\b|\bmake a u\b/.test(text)) return { symbol: 'U', label: 'U-turn', kind: 'uturn', Icon: RotateCcw };
  if (/\bleft\b/.test(text)) return { symbol: 'L', label: 'Turn left', kind: 'left', Icon: CornerUpLeft };
  if (/\bright\b/.test(text)) return { symbol: 'R', label: 'Turn right', kind: 'right', Icon: CornerUpRight };
  if (kind === 'flyover' || /\b(flyover|overpass|viaduct|elevated|bridge|ramp)\b/.test(text)) {
    return { symbol: '^', label: 'Flyover ahead', kind: 'flyover', Icon: ArrowUpFromLine };
  }
  if (kind === 'winding' || /\b(zig[\s-]?zag|winding|hairpin|switchback|ghat)\b/.test(text)) {
    return { symbol: '~', label: 'Winding road', kind: 'winding', Icon: Spline };
  }
  if (/\bu[-\s]?turn\b|\bmake a u\b/.test(text)) return { symbol: '↶', label: 'U-turn', kind: 'uturn', Icon: RotateCcw };
  if (/\bleft\b/.test(text)) return { symbol: '↰', label: 'Turn left', kind: 'left', Icon: CornerUpLeft };
  if (/\bright\b/.test(text)) return { symbol: '↱', label: 'Turn right', kind: 'right', Icon: CornerUpRight };
  if (/\bstraight\b|\bcontinue\b|\btowards\b/.test(text)) return { symbol: '↑', label: 'Go straight', kind: 'straight', Icon: ArrowUp };
  return { symbol: '➜', label: 'Navigation', kind: 'route', Icon: Navigation };
};

export default function MobileNavigationPanel({
  activeLocation,
  routeMeta,
  navTelemetry,
  speedUnit,
  soundEnabled,
  mobileNavMenuOpen,
  mobileRecenterExpanded,
  onExitNavigation,
  onToggleRouteMenu,
  onCloseRouteMenu,
  onToggleSound,
  onRecenter,
  onSearchAlongRoute,
  onAddReport,
  onShareProgress,
  onSatellite,
  onOpenSettings,
  onPreviewStepChange,
}) {
  const [activePanel, setActivePanel] = useState(null);
  const [routeSearchQuery, setRouteSearchQuery] = useState('');
  const [previewStepIndex, setPreviewStepIndex] = useState(0);
  const searchInputRef = useRef(null);
  const swipeStartRef = useRef(null);

  useEffect(() => {
    if (activePanel === 'search') {
      window.setTimeout(() => searchInputRef.current?.focus(), 40);
    }
  }, [activePanel]);

  useEffect(() => {
    setPreviewStepIndex(0);
  }, [routeMeta?.routeTo, routeMeta?.routeFrom]);

  const openSearch = () => {
    setActivePanel((panel) => (panel === 'search' ? null : 'search'));
    onCloseRouteMenu();
  };

  const submitSearch = (event) => {
    event.preventDefault();
    onSearchAlongRoute(routeSearchQuery.trim());
    setActivePanel(null);
  };

  const openDirections = () => {
    setActivePanel((panel) => (panel === 'directions' ? null : 'directions'));
    onCloseRouteMenu();
  };

  const handleSwipeStart = (event) => {
    const touch = event.touches?.[0];
    if (!touch) return;
    swipeStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      at: Date.now()
    };
  };

  const handleSwipeEnd = (event) => {
    const start = swipeStartRef.current;
    const touch = event.changedTouches?.[0];
    swipeStartRef.current = null;
    if (!start || !touch) return;

    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    const elapsed = Date.now() - start.at;
    const isHorizontalSwipe = Math.abs(dx) > 52 && Math.abs(dx) > Math.abs(dy) * 1.25 && elapsed < 700;
    if (!isHorizontalSwipe) return;

    setPreviewStepIndex((index) => {
      const maxIndex = Math.max(0, directionSteps.length - 1);
      if (dx < 0) return Math.min(maxIndex, index + 1);
      return Math.max(0, index - 1);
    });
  };

  const handleRecenter = () => {
    setPreviewStepIndex(0);
    onRecenter();
  };

  const menuItems = [
    { label: 'Add a report', icon: <AlertTriangle size={24} />, action: onAddReport },
    { label: 'Share ride progress', icon: <Share2 size={24} />, action: onShareProgress },
    { label: 'Search along route', icon: <Search size={24} />, action: openSearch },
    { label: 'Directions', icon: <Route size={24} />, action: openDirections },
    { label: 'Show satellite map', icon: <MapIcon size={24} />, action: onSatellite },
    { label: 'Settings', icon: <Layers size={24} />, action: onOpenSettings }
  ];
  const speedValue = speedUnit === 'mph'
    ? Math.round((navTelemetry?.speedKmh || 0) * 0.621371)
    : Math.round(navTelemetry?.speedKmh || 0);
  const coveredValue = speedUnit === 'mph'
    ? `${((navTelemetry?.coveredKm || 0) * 0.621371).toFixed(2)} mi`
    : `${(navTelemetry?.coveredKm || 0).toFixed(2)} km`;
  const formatStepDistance = (meters = 0) => {
    if (meters >= 1000) return `${(meters / 1000).toFixed(1)} km`;
    return `${Math.max(10, Math.round(meters / 10) * 10)} m`;
  };
  const routeModeLabel = (() => {
    const raw = routeMeta?.source || routeMeta?.estimateLabel || 'Route';
    if (/walk/i.test(raw)) return 'Walking';
    if (/bike/i.test(raw)) return 'Bike';
    if (/cycle/i.test(raw)) return 'Cycle';
    if (/track/i.test(raw)) return 'Tracking';
    if (/car|drive/i.test(raw)) return 'Drive';
    return raw.replace(/\s*estimate$/i, '') || 'Route';
  })();
  const currentInstruction = routeMeta?.instruction || `towards ${activeLocation.name}`;
  const directionSteps = routeMeta?.steps?.length
    ? routeMeta.steps
    : [{ instruction: currentInstruction || 'Continue on route', distance: 0 }];
  const previewStep = previewStepIndex > 0 ? directionSteps[previewStepIndex] : null;
  const bannerInstruction = previewStep?.instruction || currentInstruction;
  const currentManeuver = getManeuverDisplay(
    bannerInstruction,
    previewStep?.kind || routeMeta?.maneuverKind
  );
  const CurrentManeuverIcon = currentManeuver.Icon;
  const bannerDistance = previewStep?.distance ? formatStepDistance(previewStep.distance) : null;
  const bannerPrimaryMeta = previewStep
    ? 'At junction'
    : (routeMeta?.duration || 'Start');
  const bannerSecondaryMeta = previewStep
    ? `Step ${previewStepIndex + 1} of ${Math.max(1, directionSteps.length)}${bannerDistance ? ` - then ${bannerDistance}` : ''}`
    : (routeMeta?.routeSummary || `towards ${activeLocation.name}`);
  const bannerClassName = previewStep
    ? 'fixed left-3 right-3 top-[calc(env(safe-area-inset-top)+14px)] z-50 rounded-2xl bg-zinc-500/96 p-3 text-white shadow-2xl md:hidden'
    : 'fixed left-3 right-3 top-[calc(env(safe-area-inset-top)+14px)] z-50 rounded-2xl bg-[#00746c]/96 p-3 text-white shadow-2xl md:hidden';
  const soundButtonClassName = previewStep
    ? 'grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-zinc-600'
    : 'grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-[#00746c]';

  useEffect(() => {
    onPreviewStepChange?.(previewStepIndex, previewStep || null, directionSteps);
  }, [previewStepIndex, previewStep, directionSteps, onPreviewStepChange]);

  return (
    <>
      <div
        className={bannerClassName}
        onTouchStart={handleSwipeStart}
        onTouchEnd={handleSwipeEnd}
      >
        <div className="flex items-center gap-3">
          <span className={`nav-maneuver-icon ${currentManeuver.kind} shrink-0`} aria-label={currentManeuver.label}>
            <CurrentManeuverIcon size={34} strokeWidth={3} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex min-w-0 items-center gap-2">
              <span className="shrink-0 rounded-full bg-white/15 px-2 py-1 text-[11px] font-black uppercase tracking-wide text-white">
                {previewStep ? 'Preview' : routeModeLabel}
              </span>
              <span className="truncate text-xl font-light leading-none">{bannerPrimaryMeta}</span>
            </div>
            <div className="mt-1 truncate text-lg font-semibold leading-tight">{bannerInstruction}</div>
            <div className="mt-0.5 truncate text-xs font-medium text-white/75">{bannerSecondaryMeta}</div>
          </div>
          <button type="button" onClick={onToggleSound} className={soundButtonClassName} title="Voice">
            {soundEnabled ? <Volume2 size={22} /> : <VolumeX size={22} />}
          </button>
        </div>
      </div>

      {(mobileRecenterExpanded || previewStep) && (
        <button type="button" onClick={handleRecenter} className="fixed bottom-[132px] left-4 z-50 flex h-12 items-center gap-2 rounded-full bg-black/90 px-4 text-base font-bold text-white shadow-2xl md:hidden" title="Re-centre">
          <Navigation size={20} />
          Re-centre
        </button>
      )}

      <div className="fixed right-4 top-[42vh] z-50 flex flex-col gap-3 md:hidden">
        <button type="button" onClick={handleRecenter} className="grid h-12 w-12 place-items-center rounded-full bg-black/90 text-white shadow-2xl" title="Compass / re-centre">
          <Compass size={22} />
        </button>
        <button type="button" onClick={openSearch} className="grid h-12 w-12 place-items-center rounded-full bg-black/90 text-white shadow-2xl" title="Search along route">
          <Search size={22} />
        </button>
        <button type="button" onClick={onToggleSound} className="grid h-12 w-12 place-items-center rounded-full bg-black/90 text-white shadow-2xl" title="Mute">
          {soundEnabled ? <Volume2 size={22} /> : <VolumeX size={22} />}
        </button>
        <button type="button" onClick={onAddReport} className="grid h-12 w-12 place-items-center rounded-full bg-black/90 text-white shadow-2xl" title="Report">
          <AlertTriangle size={22} className="text-amber-300" />
        </button>
      </div>

      {!previewStep && (
      <div className="fixed bottom-[132px] left-4 z-50 rounded-full bg-black/90 px-4 py-3 text-center text-white shadow-2xl md:hidden">
        <div className="text-lg font-bold leading-none">{speedValue}</div>
        <div className="text-[10px] font-semibold text-slate-300">{speedUnit === 'mph' ? 'mph' : 'km/h'}</div>
        <div className="mt-1 text-[10px] text-slate-400">{coveredValue}</div>
      </div>
      )}

      {mobileNavMenuOpen && (
        <div className="fixed inset-x-0 bottom-[96px] z-50 rounded-t-3xl bg-[#101010]/98 px-5 py-4 text-slate-300 shadow-[0_-24px_70px_rgba(0,0,0,0.15)] md:hidden">
          {menuItems.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={item.action}
              className="flex h-12 w-full items-center gap-5 border-b border-white/10 text-left text-base font-medium text-slate-300 last:border-b-0"
            >
              <span className="grid w-8 place-items-center text-slate-400">{item.icon}</span>
              <span className="truncate">{item.label}</span>
            </button>
          ))}
        </div>
      )}

      {activePanel === 'search' && (
        <form onSubmit={submitSearch} className="fixed left-3 right-3 top-[calc(env(safe-area-inset-top)+86px)] z-[60] flex h-14 items-center gap-3 rounded-full bg-[#202124]/98 px-4 py-3 text-white shadow-2xl md:hidden">
          <Search size={22} className="shrink-0 text-slate-300" />
          <input
            ref={searchInputRef}
            value={routeSearchQuery}
            onChange={(event) => setRouteSearchQuery(event.target.value)}
            placeholder="Search along route"
            className="min-w-0 flex-1 bg-transparent text-base font-medium text-white placeholder:text-slate-400 focus:outline-none"
          />
          <button type="button" onClick={() => setActivePanel(null)} className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-slate-300" title="Close search">
            <X size={20} />
          </button>
        </form>
      )}

      {activePanel === 'directions' && (
        <div className="fixed inset-x-3 bottom-[96px] top-[calc(env(safe-area-inset-top)+86px)] z-[60] overflow-hidden rounded-3xl bg-[#101010]/98 text-white shadow-[0_-24px_70px_rgba(0,0,0,0.58)] md:hidden">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div className="min-w-0">
              <h3 className="truncate text-base font-bold">Directions</h3>
              <p className="truncate text-xs text-slate-400">{routeMeta?.routeSummary || 'Current route'}</p>
            </div>
            <button type="button" onClick={() => setActivePanel(null)} className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white" title="Close directions">
              <X size={20} />
            </button>
          </div>
          <div className="max-h-full overflow-y-auto px-4 py-3 pb-20">
            {directionSteps.map((step, index) => {
              const stepManeuver = getManeuverDisplay(step.instruction);
              return (
                <div key={`${step.instruction}-${index}`} className="flex gap-3 border-b border-white/10 py-3 last:border-b-0">
                  <div className={`direction-maneuver-icon ${stepManeuver.kind}`}>
                    {stepManeuver.symbol}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold text-slate-100">{step.instruction}</div>
                    <div className="mt-1 text-xs text-slate-500">{formatStepDistance(step.distance)}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="fixed inset-x-0 bottom-0 z-50 rounded-t-3xl bg-black/96 px-4 pb-[calc(env(safe-area-inset-bottom)+10px)] pt-2 text-white shadow-[0_-24px_70px_rgba(0,0,0,0.58)] md:hidden">
        <div className="mx-auto mb-3 h-1 w-11 rounded-full bg-white/35" />
        <div className="flex items-center justify-between gap-4">
          <button type="button" onClick={onExitNavigation} className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-white/25 text-white" title="Exit navigation">
            <X size={30} />
          </button>
          <div className="min-w-0 flex-1 text-center">
            <div className="mx-auto mb-1 w-fit rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-slate-200">{routeModeLabel}</div>
            <div className="text-2xl font-semibold text-emerald-300">{routeMeta?.duration || '--'}</div>
            <div className="mt-0.5 truncate text-sm text-slate-300">{routeMeta?.distance || '--'} - {routeMeta?.estimateLabel || 'Route estimate'}</div>
            {routeMeta?.routeSummary && (
              <div className="mt-0.5 truncate text-[11px] text-slate-500">{routeMeta.routeSummary}</div>
            )}
          </div>
          <button type="button" onClick={onToggleRouteMenu} className="flex h-14 shrink-0 items-center gap-2 rounded-full border border-white/25 px-4 text-sm font-bold text-white" title="Route options">
            <Route size={22} />
            Options
          </button>
        </div>
      </div>
    </>
  );
}
