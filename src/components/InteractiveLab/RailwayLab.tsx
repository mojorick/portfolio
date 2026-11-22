import React, { useState, useMemo } from 'react';
import type { Language } from '../../types';
import { Train, AlertTriangle, CheckCircle2, RotateCcw, Zap, GitBranch, Clock, ArrowRight } from 'lucide-react';

interface RailwayLabProps {
  lang: Language;
}

interface Station {
  id: string;
  name: string;
  x: number;
  y: number;
  hub?: boolean;
}

interface Track {
  id: string;
  source: string;
  target: string;
  baseWeight: number; // minutes
  capacity: number;
}

export const RailwayLab: React.FC<RailwayLabProps> = ({ lang }) => {
  // Graph Stations (Western France corridor towards Paris, centered around Nantes/SNCF Voyageurs)
  const stations: Station[] = [
    { id: 'nantes', name: 'Nantes', x: 120, y: 220, hub: true },
    { id: 'st-nazaire', name: 'Saint-Nazaire', x: 40, y: 200 },
    { id: 'angers', name: 'Angers St-Laud', x: 230, y: 190 },
    { id: 'rennes', name: 'Rennes', x: 160, y: 110, hub: true },
    { id: 'le-mans', name: 'Le Mans', x: 330, y: 150, hub: true },
    { id: 'tours', name: 'Tours', x: 320, y: 250 },
    { id: 'paris', name: 'Paris Montparnasse', x: 460, y: 80, hub: true },
    { id: 'redon', name: 'Redon', x: 90, y: 150 },
  ];

  // Railway tracks connecting stations
  const initialTracks: Track[] = [
    { id: 'stnazaire-nantes', source: 'st-nazaire', target: 'nantes', baseWeight: 35, capacity: 6 },
    { id: 'nantes-redon', source: 'nantes', target: 'redon', baseWeight: 40, capacity: 5 },
    { id: 'redon-rennes', source: 'redon', target: 'rennes', baseWeight: 45, capacity: 8 },
    { id: 'nantes-angers', source: 'nantes', target: 'angers', baseWeight: 38, capacity: 12 },
    { id: 'angers-lemans', source: 'angers', target: 'le-mans', baseWeight: 42, capacity: 10 },
    { id: 'angers-tours', source: 'angers', target: 'tours', baseWeight: 50, capacity: 7 },
    { id: 'rennes-lemans', source: 'rennes', target: 'le-mans', baseWeight: 55, capacity: 14 },
    { id: 'lemans-paris', source: 'le-mans', target: 'paris', baseWeight: 54, capacity: 20 },
    { id: 'tours-paris', source: 'tours', target: 'paris', baseWeight: 70, capacity: 12 },
  ];

  // Active track disruptions: trackId -> extra delay / status
  const [disruptedTracks, setDisruptedTracks] = useState<Record<string, { incident: string; penalty: number }>>({
    'angers-lemans': { incident: 'Arrachement Caténaire (Ligne Coupée)', penalty: 999 }
  });

  const origin = 'nantes';
  const destination = 'paris';

  // Toggle track disruption
  const toggleDisruption = (trackId: string) => {
    setDisruptedTracks(prev => {
      const next = { ...prev };
      if (next[trackId]) {
        delete next[trackId];
      } else {
        next[trackId] = {
          incident: 'Aléa d\'Exploitation / Ralentissement',
          penalty: 120
        };
      }
      return next;
    });
  };

  const resetAllDisruptions = () => {
    setDisruptedTracks({});
  };

  // Dijkstra / A* Routing Algorithm
  const routingResult = useMemo(() => {
    const startTime = performance.now();
    const distances: Record<string, number> = {};
    const previous: Record<string, { station: string; track: Track } | null> = {};
    const unvisited = new Set<string>();

    stations.forEach(s => {
      distances[s.id] = Infinity;
      previous[s.id] = null;
      unvisited.add(s.id);
    });

    distances[origin] = 0;

    while (unvisited.size > 0) {
      let current: string | null = null;
      let minDistance = Infinity;

      unvisited.forEach(stationId => {
        if (distances[stationId] < minDistance) {
          minDistance = distances[stationId];
          current = stationId;
        }
      });

      if (!current || minDistance === Infinity || current === destination) break;
      unvisited.delete(current);

      // Find neighbors
      const currentStationId: string = current;
      initialTracks.forEach(track => {
        let neighborId: string | null = null;
        if (track.source === currentStationId) neighborId = track.target;
        else if (track.target === currentStationId) neighborId = track.source;

        if (neighborId && unvisited.has(neighborId)) {
          const penalty = disruptedTracks[track.id] ? disruptedTracks[track.id].penalty : 0;
          const alt = distances[currentStationId] + track.baseWeight + penalty;
          if (alt < distances[neighborId]) {
            distances[neighborId] = alt;
            previous[neighborId] = { station: currentStationId, track };
          }
        }
      });
    }

    // Reconstruct path
    const path: string[] = [];
    const usedTrackIds = new Set<string>();
    let curr: string | null = destination;

    if (distances[destination] !== Infinity) {
      while (curr) {
        path.unshift(curr);
        const prevInfo: { station: string; track: Track } | null = previous[curr] || null;
        if (prevInfo) {
          usedTrackIds.add(prevInfo.track.id);
          curr = prevInfo.station;
        } else {
          curr = null;
        }
      }
    }

    const calcTime = Math.max(0.4, Number((performance.now() - startTime).toFixed(2)));
    const nominalTime = 134; // Nantes -> Angers -> Le Mans -> Paris = 38 + 42 + 54 = 134 min

    return {
      path,
      usedTrackIds,
      totalDuration: distances[destination],
      nominalTime,
      calcTime,
      isReRouted: usedTrackIds.has('rennes-lemans') || usedTrackIds.has('nantes-redon') || usedTrackIds.has('tours-paris')
    };
  }, [origin, destination, disruptedTracks]);

  const getStationById = (id: string) => stations.find(s => s.id === id);

  return (
    <div className="glass-card rounded-2xl p-6 md:p-8 relative overflow-hidden border border-cyan-500/20 bg-slate-950/80">
      {/* Background glow accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-medium mb-2">
            <Train className="w-3.5 h-3.5" />
            <span>{lang === 'fr' ? 'Démonstrateur Industriel • SNCF Voyageurs & RO' : 'Industrial Lab • SNCF Voyageurs & OR'}</span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
            <span>{lang === 'fr' ? 'Gestion des Transports Perturbés & Re-routage Dynamique' : 'Disrupted Transport Management & Dynamic Rerouting'}</span>
          </h3>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            {lang === 'fr'
              ? 'Simulation en temps réel de mon projet chez SNCF Voyageurs : cliquez sur un tronçon pour générer un aléa ferroviaire. L\'algorithme de Recherche Opérationnelle recalcule instantanément un itinéraire optimal de contournement.'
              : 'Real-time simulation based on my SNCF Voyageurs project: click any railway track to trigger an operational hazard. The Operations Research algorithm instantly recalculates an optimal detour.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetAllDisruptions}
            className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{lang === 'fr' ? 'Rétablir le réseau' : 'Reset Network'}</span>
          </button>
        </div>
      </div>

      {/* Network Map & Control Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Interactive SVG Network Map */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="relative w-full aspect-[5/3] max-w-[540px] bg-slate-950 rounded-2xl border border-slate-800 p-4 shadow-2xl overflow-hidden flex items-center justify-center">
            <svg
              viewBox="0 0 520 300"
              className="w-full h-full select-none"
            >
              <defs>
                <linearGradient id="activeRouteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>

              {/* Tracks */}
              {initialTracks.map(track => {
                const s1 = getStationById(track.source)!;
                const s2 = getStationById(track.target)!;
                const isDisrupted = !!disruptedTracks[track.id];
                const isSelectedPath = routingResult.usedTrackIds.has(track.id);

                return (
                  <g key={track.id} onClick={() => toggleDisruption(track.id)} className="cursor-pointer group">
                    <line
                      x1={s1.x}
                      y1={s1.y}
                      x2={s2.x}
                      y2={s2.y}
                      stroke="transparent"
                      strokeWidth={20}
                    />

                    <line
                      x1={s1.x}
                      y1={s1.y}
                      x2={s2.x}
                      y2={s2.y}
                      stroke={isDisrupted ? '#ef4444' : isSelectedPath ? 'url(#activeRouteGrad)' : '#1e293b'}
                      strokeWidth={isSelectedPath ? 4.5 : 2.5}
                      strokeDasharray={isDisrupted ? '6,6' : undefined}
                      className="transition-all duration-300"
                    />

                    {isSelectedPath && !isDisrupted && (
                      <line
                        x1={s1.x}
                        y1={s1.y}
                        x2={s2.x}
                        y2={s2.y}
                        stroke="#38bdf8"
                        strokeWidth={2}
                        strokeDasharray="8,12"
                        className="animate-pulse"
                      />
                    )}

                    {isDisrupted && (
                      <circle
                        cx={(s1.x + s2.x) / 2}
                        cy={(s1.y + s2.y) / 2}
                        r={10}
                        fill="#7f1d1d"
                        stroke="#ef4444"
                        strokeWidth={2}
                        className="animate-ping opacity-75"
                      />
                    )}
                    {isDisrupted && (
                      <g transform={`translate(${(s1.x + s2.x) / 2 - 8}, ${(s1.y + s2.y) / 2 - 8})`}>
                        <AlertTriangle className="w-4 h-4 text-red-400" />
                      </g>
                    )}
                  </g>
                );
              })}

              {/* Stations */}
              {stations.map(station => {
                const isOrigin = station.id === origin;
                const isDest = station.id === destination;
                const isInPath = routingResult.path.includes(station.id);

                return (
                  <g key={station.id} transform={`translate(${station.x}, ${station.y})`}>
                    {(isOrigin || isDest) && (
                      <circle
                        r={14}
                        fill={isOrigin ? '#10b981' : '#3b82f6'}
                        className="opacity-30 animate-ping"
                      />
                    )}

                    <circle
                      r={station.hub ? 8 : 5}
                      fill={
                        isOrigin
                          ? '#10b981'
                          : isDest
                          ? '#3b82f6'
                          : isInPath
                          ? '#38bdf8'
                          : '#334155'
                      }
                      stroke="#0f172a"
                      strokeWidth={2}
                      className="transition-colors duration-300"
                    />

                    <text
                      y={station.y > 200 ? 18 : -12}
                      textAnchor="middle"
                      fill={isInPath ? '#f8fafc' : '#94a3b8'}
                      fontSize={station.hub ? 11 : 9}
                      fontFamily="Inter, sans-serif"
                      fontWeight={station.hub ? 600 : 400}
                      className="pointer-events-none drop-shadow"
                    >
                      {station.name}
                    </text>
                  </g>
                );
              })}
            </svg>

            <div className="absolute bottom-2 right-3 text-[10px] font-mono text-slate-500 bg-slate-900/80 px-2 py-1 rounded border border-slate-800 pointer-events-none">
              {lang === 'fr' ? '💡 Cliquez sur une voie pour simuler un incident' : '💡 Click any track to toggle disruption'}
            </div>
          </div>
        </div>

        {/* Live Metrics & Algorithmic Result */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
              <span className="text-xs font-mono text-slate-400">
                {lang === 'fr' ? 'Itinéraire & Plan de Transport :' : 'Routing & Operational Dispatch:'}
              </span>
              <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${
                routingResult.isReRouted
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              }`}>
                {routingResult.isReRouted
                  ? (lang === 'fr' ? 'DÉVIATION ACTIVE' : 'REROUTED')
                  : (lang === 'fr' ? 'ITINÉRAIRE NOMINAL' : 'NOMINAL PATH')}
              </span>
            </div>

            <div className="flex items-center flex-wrap gap-1.5 text-xs font-mono text-slate-200 mb-4">
              {routingResult.path.map((stId, idx) => {
                const st = getStationById(stId);
                const isLast = idx === routingResult.path.length - 1;
                return (
                  <React.Fragment key={stId}>
                    <span className={`px-2 py-1 rounded ${
                      idx === 0
                        ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-semibold'
                        : isLast
                        ? 'bg-blue-950/60 border border-blue-500/40 text-blue-300 font-semibold'
                        : 'bg-slate-800/80 text-slate-300'
                    }`}>
                      {st?.name}
                    </span>
                    {!isLast && <ArrowRight className="w-3 h-3 text-slate-600 shrink-0" />}
                  </React.Fragment>
                );
              })}
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-slate-400 text-[11px] flex items-center gap-1 mb-1">
                  <Clock className="w-3 h-3 text-cyan-400" />
                  <span>{lang === 'fr' ? 'Temps de parcours' : 'Transit Time'}</span>
                </div>
                <div className="text-sm font-bold text-white">
                  {routingResult.totalDuration} min{' '}
                  <span className="text-[11px] font-normal text-slate-500">
                    ({routingResult.totalDuration > routingResult.nominalTime ? `+${routingResult.totalDuration - routingResult.nominalTime}m` : 'Nominal'})
                  </span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-slate-400 text-[11px] flex items-center gap-1 mb-1">
                  <Zap className="w-3 h-3 text-emerald-400" />
                  <span>{lang === 'fr' ? 'Calcul Heuristique' : 'Heuristic Compute'}</span>
                </div>
                <div className="text-sm font-bold text-emerald-400">
                  {routingResult.calcTime} ms
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
            <span className="text-xs font-mono text-slate-400 block mb-2">
              {lang === 'fr' ? 'Aléas Détectés en Temps Réel :' : 'Real-time Detected Hazards:'}
            </span>
            {Object.keys(disruptedTracks).length === 0 ? (
              <div className="flex items-center gap-2 text-xs text-emerald-400 py-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>{lang === 'fr' ? 'Trafic fluide sur l\'ensemble des lignes' : 'All railway corridors operating normally'}</span>
              </div>
            ) : (
              <div className="space-y-2">
                {Object.entries(disruptedTracks).map(([trackId, info]) => {
                  const track = initialTracks.find(t => t.id === trackId);
                  const s1 = getStationById(track?.source || '');
                  const s2 = getStationById(track?.target || '');
                  return (
                    <div
                      key={trackId}
                      className="flex items-center justify-between p-2 rounded-lg bg-red-950/20 border border-red-500/30 text-xs"
                    >
                      <div className="flex items-center gap-2 text-red-300">
                        <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                        <span>
                          {s1?.name} ↔ {s2?.name} : {info.incident}
                        </span>
                      </div>
                      <button
                        onClick={() => toggleDisruption(trackId)}
                        className="text-slate-400 hover:text-white text-[11px] underline cursor-pointer"
                      >
                        {lang === 'fr' ? 'Résoudre' : 'Clear'}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-xs text-slate-400 flex items-start gap-2.5">
            <GitBranch className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <p>
              {lang === 'fr'
                ? 'Ce démonstrateur illustre les défis réels traités au quotidien chez SNCF Voyageurs : concilier l\'optimisation combinatoire (RO) et la haute disponibilité logicielle (Python, React) pour assister les régulateurs lors de crises d\'exploitation.'
                : 'This simulator demonstrates the real engineering challenges solved daily at SNCF Voyageurs: marrying combinatorial optimization (OR) with high-availability reactive software (Python, React) to empower dispatchers during critical operational incidents.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
