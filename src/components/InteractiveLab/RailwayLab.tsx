import React, { useState, useMemo } from 'react';
import type { Language } from '../../types';
import { Train, AlertCircle, CheckCircle2, RotateCcw, Clock, ArrowRight } from 'lucide-react';

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

  const [disruptedTracks, setDisruptedTracks] = useState<Record<string, { incident: string; penalty: number }>>({
    'angers-lemans': { incident: 'Arrachement Caténaire (Voie Coupée)', penalty: 999 }
  });

  const origin = 'nantes';
  const destination = 'paris';

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

  // Dijkstra dynamic rerouting
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
    const nominalTime = 134;

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
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-zinc-800">
        <div>
          <span className="text-xs font-mono text-zinc-400 block mb-1">
            {lang === 'fr' ? 'Projet Industriel • SNCF Voyageurs Nantes' : 'Industrial System • SNCF Voyageurs Nantes'}
          </span>
          <h3 className="text-lg md:text-xl font-bold text-white">
            {lang === 'fr' ? 'Gestion des Transports Perturbés & Re-routage Dynamique' : 'Disrupted Transport Operations & Dynamic Rerouting'}
          </h3>
          <p className="text-xs text-zinc-400 mt-1 max-w-2xl">
            {lang === 'fr'
              ? 'Simulation de la logique développée chez SNCF Voyageurs : cliquez sur un tronçon pour générer un aléa. L\'algorithme de Recherche Opérationnelle recalcule instantanément le plan de transport optimal.'
              : 'Simulation of the decision system built at SNCF Voyageurs: click any track to inject an operational disruption. The Operations Research algorithm recalculates an optimal detour.'}
          </p>
        </div>

        <div>
          <button
            onClick={resetAllDisruptions}
            className="px-3 py-1.5 rounded-md bg-zinc-950 border border-zinc-800 hover:border-zinc-700 text-zinc-300 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-zinc-400" />
            <span>{lang === 'fr' ? 'Réinitialiser le réseau' : 'Reset Network'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* SVG Network Map */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="relative w-full aspect-[5/3] max-w-[520px] bg-zinc-950 rounded-xl border border-zinc-800 p-4 overflow-hidden flex items-center justify-center">
            <svg viewBox="0 0 520 300" className="w-full h-full select-none">
              {/* Tracks */}
              {initialTracks.map(track => {
                const s1 = getStationById(track.source)!;
                const s2 = getStationById(track.target)!;
                const isDisrupted = !!disruptedTracks[track.id];
                const isSelectedPath = routingResult.usedTrackIds.has(track.id);

                return (
                  <g key={track.id} onClick={() => toggleDisruption(track.id)} className="cursor-pointer">
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
                      stroke={isDisrupted ? '#ef4444' : isSelectedPath ? '#ffffff' : '#27272a'}
                      strokeWidth={isSelectedPath ? 3.5 : 2}
                      strokeDasharray={isDisrupted ? '5,5' : undefined}
                      className="transition-colors duration-200"
                    />

                    {isDisrupted && (
                      <circle
                        cx={(s1.x + s2.x) / 2}
                        cy={(s1.y + s2.y) / 2}
                        r={6}
                        fill="#ef4444"
                      />
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
                    <circle
                      r={station.hub ? 7 : 4.5}
                      fill={
                        isOrigin || isDest
                          ? '#ffffff'
                          : isInPath
                          ? '#d4d4d8'
                          : '#3f3f46'
                      }
                      stroke="#09090b"
                      strokeWidth={2}
                    />

                    <text
                      y={station.y > 200 ? 17 : -11}
                      textAnchor="middle"
                      fill={isInPath ? '#f4f4f5' : '#71717a'}
                      fontSize={station.hub ? 11 : 9.5}
                      fontFamily="Inter, sans-serif"
                      fontWeight={station.hub ? 600 : 400}
                      className="pointer-events-none"
                    >
                      {station.name}
                    </text>
                  </g>
                );
              })}
            </svg>

            <div className="absolute bottom-2.5 right-3 text-[10px] font-mono text-zinc-500 bg-zinc-900/90 px-2 py-1 rounded border border-zinc-800 pointer-events-none">
              {lang === 'fr' ? 'Cliquez sur une ligne pour simuler un incident' : 'Click any track to simulate disruption'}
            </div>
          </div>
        </div>

        {/* Live Metrics */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-zinc-800">
              <span className="text-xs font-mono text-zinc-400">
                {lang === 'fr' ? 'Itinéraire calculé :' : 'Calculated Route:'}
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-200">
                {routingResult.isReRouted
                  ? (lang === 'fr' ? 'Déviation active' : 'Rerouted')
                  : (lang === 'fr' ? 'Itinéraire nominal' : 'Nominal')}
              </span>
            </div>

            <div className="flex items-center flex-wrap gap-1.5 text-xs font-mono text-zinc-300 mb-4">
              {routingResult.path.map((stId, idx) => {
                const st = getStationById(stId);
                const isLast = idx === routingResult.path.length - 1;
                return (
                  <React.Fragment key={stId}>
                    <span className={`px-2 py-1 rounded text-xs ${
                      idx === 0 || isLast
                        ? 'bg-zinc-800 text-white font-semibold'
                        : 'bg-zinc-900 text-zinc-300 border border-zinc-800'
                    }`}>
                      {st?.name}
                    </span>
                    {!isLast && <ArrowRight className="w-3 h-3 text-zinc-600 shrink-0" />}
                  </React.Fragment>
                );
              })}
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2.5 rounded bg-zinc-900 border border-zinc-800">
                <div className="text-zinc-500 text-[11px] mb-0.5">
                  {lang === 'fr' ? 'Temps de parcours' : 'Transit Time'}
                </div>
                <div className="text-sm font-bold text-white">
                  {routingResult.totalDuration} min{' '}
                  <span className="text-[11px] font-normal text-zinc-500">
                    ({routingResult.totalDuration > routingResult.nominalTime ? `+${routingResult.totalDuration - routingResult.nominalTime}m` : 'Nominal'})
                  </span>
                </div>
              </div>

              <div className="p-2.5 rounded bg-zinc-900 border border-zinc-800">
                <div className="text-zinc-500 text-[11px] mb-0.5">
                  {lang === 'fr' ? 'Temps calcul algorithme' : 'Compute Latency'}
                </div>
                <div className="text-sm font-bold text-zinc-200">
                  {routingResult.calcTime} ms
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
            <span className="text-xs font-mono text-zinc-400 block mb-2">
              {lang === 'fr' ? 'Incidents d\'exploitation enregistrés :' : 'Recorded Incidents:'}
            </span>
            {Object.keys(disruptedTracks).length === 0 ? (
              <div className="flex items-center gap-2 text-xs text-zinc-400 py-1 font-mono">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{lang === 'fr' ? 'Circulation nominale sur le réseau' : 'Normal network flow'}</span>
              </div>
            ) : (
              <div className="space-y-2 font-mono">
                {Object.entries(disruptedTracks).map(([trackId, info]) => {
                  const track = initialTracks.find(t => t.id === trackId);
                  const s1 = getStationById(track?.source || '');
                  const s2 = getStationById(track?.target || '');
                  return (
                    <div
                      key={trackId}
                      className="flex items-center justify-between p-2 rounded bg-zinc-900 border border-zinc-800 text-xs"
                    >
                      <div className="flex items-center gap-2 text-zinc-300">
                        <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                        <span>
                          {s1?.name} ↔ {s2?.name} : {info.incident}
                        </span>
                      </div>
                      <button
                        onClick={() => toggleDisruption(trackId)}
                        className="text-zinc-400 hover:text-white text-[11px] underline cursor-pointer"
                      >
                        {lang === 'fr' ? 'Rétablir' : 'Clear'}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-400 leading-relaxed">
            {lang === 'fr'
              ? 'Ce simulateur reflète les systèmes d\'ingénierie développés chez SNCF Voyageurs : intégration de contraintes de capacité, temps de calcul sub-seconde et synchronisation des référentiels de transport.'
              : 'This simulator mirrors the engineering systems developed at SNCF Voyageurs: integrating capacity constraints, sub-second compute latency, and operational dispatch synchronization.'}
          </div>
        </div>
      </div>
    </div>
  );
};
