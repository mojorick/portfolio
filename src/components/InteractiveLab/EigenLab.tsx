import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MathTex } from '../../utils/katex';
import { Language } from '../../types';
import { Play, RotateCcw, Sparkles, Brain, Cpu, Sigma } from 'lucide-react';

interface EigenLabProps {
  lang: Language;
}

interface Matrix2x2 {
  a: number;
  b: number;
  c: number;
  d: number;
}

export const EigenLab: React.FC<EigenLabProps> = ({ lang }) => {
  // Matrix coefficients: [a, b; c, d]
  const [matrix, setMatrix] = useState<Matrix2x2>({
    a: 2.0,
    b: 0.8,
    c: 0.8,
    d: 1.2
  });

  // Interactive user probe vector x
  const [probeVector, setProbeVector] = useState<{ x: number; y: number }>({ x: 1, y: 0.5 });
  const [isDragging, setIsDragging] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Presets
  const presets = [
    {
      id: 'covariance',
      name: { fr: 'Matrice de Covariance (PCA)', en: 'Covariance Matrix (PCA)' },
      matrix: { a: 2.2, b: 0.9, c: 0.9, d: 1.1 },
      desc: {
        fr: 'Matrice symétrique (A = A^T) : vecteurs propres orthogonaux. Base de la PCA et réduction de dimension.',
        en: 'Symmetric matrix (A = A^T): orthogonal eigenvectors. Core of PCA and dimensionality reduction.'
      }
    },
    {
      id: 'scaling',
      name: { fr: 'Dilatation Asymétrique', en: 'Anisotropic Scaling' },
      matrix: { a: 2.5, b: 0.0, c: 0.0, d: 0.6 },
      desc: {
        fr: 'Étirement pur selon les axes canoniques. Les axes X et Y sont directement les vecteurs propres.',
        en: 'Pure stretch along canonical axes. X and Y axes are the eigenvectors.'
      }
    },
    {
      id: 'shear',
      name: { fr: 'Cisaillement (Shear)', en: 'Shear Mapping' },
      matrix: { a: 1.0, b: 1.5, c: 0.0, d: 1.0 },
      desc: {
        fr: 'Déformation latérale : valeur propre double λ = 1 avec un seul sous-espace propre réel invariant.',
        en: 'Lateral shear: double eigenvalue λ = 1 with a single invariant eigenspace.'
      }
    },
    {
      id: 'projection',
      name: { fr: 'Projection Singulière (SVD)', en: 'Singular Projection (SVD)' },
      matrix: { a: 1.6, b: 0.8, c: 0.8, d: 0.4 },
      desc: {
        fr: 'Matrice de rang 1 : det(A) = 0. Le cercle unitaire s\'écrase sur une droite (espace latent 1D).',
        en: 'Rank-1 matrix: det(A) = 0. The unit circle collapses onto a 1D latent subspace.'
      }
    }
  ];

  // Mathematical computations
  const trace = matrix.a + matrix.d;
  const det = matrix.a * matrix.d - matrix.b * matrix.c;
  const discriminant = trace * trace - 4 * det;

  let lambda1: number | null = null;
  let lambda2: number | null = null;
  let v1: { x: number; y: number } | null = null;
  let v2: { x: number; y: number } | null = null;
  const hasRealEigenvalues = discriminant >= 0;

  if (hasRealEigenvalues) {
    const sqrtDisc = Math.sqrt(Math.max(0, discriminant));
    lambda1 = (trace + sqrtDisc) / 2;
    lambda2 = (trace - sqrtDisc) / 2;

    // Helper to calculate eigenvector for eigenvalue lambda
    const getEigenvector = (lam: number) => {
      // (a - lam)*x + b*y = 0  => y = -(a-lam)*x / b if b != 0
      if (Math.abs(matrix.b) > 1e-5) {
        const vx = matrix.b;
        const vy = lam - matrix.a;
        const norm = Math.hypot(vx, vy);
        return norm > 0 ? { x: vx / norm, y: vy / norm } : { x: 1, y: 0 };
      } else if (Math.abs(matrix.c) > 1e-5) {
        const vx = lam - matrix.d;
        const vy = matrix.c;
        const norm = Math.hypot(vx, vy);
        return norm > 0 ? { x: vx / norm, y: vy / norm } : { x: 0, y: 1 };
      } else {
        // Diagonal matrix
        if (Math.abs(lam - matrix.a) < 1e-4) return { x: 1, y: 0 };
        return { x: 0, y: 1 };
      }
    };

    v1 = getEigenvector(lambda1);
    v2 = getEigenvector(lambda2);
  }

  // Transformed probe vector Ax
  const transformedProbe = {
    x: matrix.a * probeVector.x + matrix.b * probeVector.y,
    y: matrix.c * probeVector.x + matrix.d * probeVector.y
  };

  // Check if probe vector is close to an eigenvector
  const probeNorm = Math.hypot(probeVector.x, probeVector.y);
  const transNorm = Math.hypot(transformedProbe.x, transformedProbe.y);
  let isAligned = false;
  let currentEigenRatio = 0;

  if (probeNorm > 0.05 && transNorm > 0.05) {
    // Cross product in 2D = x1*y2 - y1*x2
    const cross = Math.abs(probeVector.x * transformedProbe.y - probeVector.y * transformedProbe.x);
    const dot = probeVector.x * transformedProbe.x + probeVector.y * transformedProbe.y;
    if (cross / (probeNorm * transNorm) < 0.08) {
      isAligned = true;
      currentEigenRatio = dot / (probeNorm * probeNorm);
    }
  }

  // Canvas drawing
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const scale = 50; // pixels per unit
    const cx = width / 2;
    const cy = height / 2;

    // Reset & clear
    ctx.clearRect(0, 0, width, height);

    // Dark grid background
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;
    for (let x = -6; x <= 6; x++) {
      ctx.beginPath();
      ctx.moveTo(cx + x * scale, 0);
      ctx.lineTo(cx + x * scale, height);
      ctx.stroke();
    }
    for (let y = -6; y <= 6; y++) {
      ctx.beginPath();
      ctx.moveTo(0, cy - y * scale);
      ctx.lineTo(width, cy - y * scale);
      ctx.stroke();
    }

    // Transformed warped grid lines (showing the deformation of linear space)
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.12)';
    ctx.lineWidth = 1;
    for (let i = -5; i <= 5; i++) {
      // Line parallel to canonical Y: x = i, y from -5 to 5
      const p1 = { x: matrix.a * i + matrix.b * -5, y: matrix.c * i + matrix.d * -5 };
      const p2 = { x: matrix.a * i + matrix.b * 5, y: matrix.c * i + matrix.d * 5 };
      ctx.beginPath();
      ctx.moveTo(cx + p1.x * scale, cy - p1.y * scale);
      ctx.lineTo(cx + p2.x * scale, cy - p2.y * scale);
      ctx.stroke();

      // Line parallel to canonical X: y = i, x from -5 to 5
      const q1 = { x: matrix.a * -5 + matrix.b * i, y: matrix.c * -5 + matrix.d * i };
      const q2 = { x: matrix.a * 5 + matrix.b * i, y: matrix.c * 5 + matrix.d * i };
      ctx.beginPath();
      ctx.moveTo(cx + q1.x * scale, cy - q1.y * scale);
      ctx.lineTo(cx + q2.x * scale, cy - q2.y * scale);
      ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, cy);
    ctx.lineTo(width, cy);
    ctx.moveTo(cx, 0);
    ctx.lineTo(cx, height);
    ctx.stroke();

    // Original Unit Circle S^1 (Dotted cyan)
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.arc(cx, cy, scale, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Transformed Unit Circle -> Ellipse (A * S^1)
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.9)';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = 'rgba(56, 189, 248, 0.6)';
    ctx.shadowBlur = 12;
    ctx.beginPath();
    const steps = 120;
    for (let i = 0; i <= steps; i++) {
      const angle = (i / steps) * Math.PI * 2;
      const ux = Math.cos(angle);
      const uy = Math.sin(angle);
      const tx = matrix.a * ux + matrix.b * uy;
      const ty = matrix.c * ux + matrix.d * uy;
      const px = cx + tx * scale;
      const py = cy - ty * scale;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Draw Eigenvector axes (if real)
    if (hasRealEigenvalues && v1 && v2 && lambda1 !== null && lambda2 !== null) {
      // Eigenvector 1 (Emerald/Cyan glow)
      const drawEigAxis = (vec: { x: number; y: number }, lam: number, color: string, label: string) => {
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 6]);
        ctx.beginPath();
        ctx.moveTo(cx - vec.x * scale * 4, cy + vec.y * scale * 4);
        ctx.lineTo(cx + vec.x * scale * 4, cy - vec.y * scale * 4);
        ctx.stroke();
        ctx.setLineDash([]);

        // Transformed vector v_i * lambda
        const tvx = vec.x * lam;
        const tvy = vec.y * lam;
        ctx.strokeStyle = color;
        ctx.lineWidth = 3.5;
        ctx.shadowColor = color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + tvx * scale, cy - tvy * scale);
        ctx.stroke();

        // Arrow head
        const angle = Math.atan2(-tvy, tvx);
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(cx + tvx * scale, cy - tvy * scale);
        ctx.lineTo(
          cx + tvx * scale - 12 * Math.cos(angle - Math.PI / 6),
          cy - tvy * scale - 12 * Math.sin(angle - Math.PI / 6)
        );
        ctx.lineTo(
          cx + tvx * scale - 12 * Math.cos(angle + Math.PI / 6),
          cy - tvy * scale - 12 * Math.sin(angle + Math.PI / 6)
        );
        ctx.fill();
        ctx.shadowBlur = 0;

        // Label
        ctx.fillStyle = color;
        ctx.font = 'bold 12px "JetBrains Mono", monospace';
        ctx.fillText(
          `${label} (λ=${lam.toFixed(2)})`,
          cx + tvx * scale + 10,
          cy - tvy * scale - 5
        );
      };

      drawEigAxis(v1, lambda1, '#10b981', 'v₁');
      drawEigAxis(v2, lambda2, '#a855f7', 'v₂');
    }

    // Draw User Probe Vector x (Amber)
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + probeVector.x * scale, cy - probeVector.y * scale);
    ctx.stroke();

    // Probe point draggable handle
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(cx + probeVector.x * scale, cy - probeVector.y * scale, 6, 0, Math.PI * 2);
    ctx.fill();

    // Draw Transformed Vector Ax (Bright Yellow/Orange)
    ctx.strokeStyle = isAligned ? '#10b981' : '#f43f5e';
    ctx.lineWidth = 3;
    ctx.shadowColor = isAligned ? '#10b981' : '#f43f5e';
    ctx.shadowBlur = isAligned ? 15 : 0;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + transformedProbe.x * scale, cy - transformedProbe.y * scale);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Transformed tip
    ctx.fillStyle = isAligned ? '#10b981' : '#f43f5e';
    ctx.beginPath();
    ctx.arc(cx + transformedProbe.x * scale, cy - transformedProbe.y * scale, 5, 0, Math.PI * 2);
    ctx.fill();

    // Labels
    ctx.fillStyle = '#fbbf24';
    ctx.font = '11px monospace';
    ctx.fillText('x (sonde)', cx + probeVector.x * scale + 8, cy - probeVector.y * scale);

    ctx.fillStyle = isAligned ? '#10b981' : '#f43f5e';
    ctx.fillText(
      isAligned ? `Ax = ${currentEigenRatio.toFixed(2)}x !` : 'Ax',
      cx + transformedProbe.x * scale + 8,
      cy - transformedProbe.y * scale
    );
  }, [matrix, probeVector, isAligned, currentEigenRatio, hasRealEigenvalues, lambda1, lambda2, v1, v2, transformedProbe]);

  useEffect(() => {
    draw();
  }, [draw]);

  // Handle canvas mouse dragging
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;
    const scale = 50;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const px = (clientX - cx) / scale;
    const py = (cy - clientY) / scale;

    // If close to probe tip, drag
    const dist = Math.hypot(px - probeVector.x, py - probeVector.y);
    if (dist < 0.6) {
      setIsDragging(true);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;
    const scale = 50;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const newX = (clientX - cx) / scale;
    const newY = (cy - clientY) / scale;
    // Limit bounds
    setProbeVector({
      x: Math.max(-3.5, Math.min(3.5, newX)),
      y: Math.max(-3.5, Math.min(3.5, newY))
    });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="glass-card rounded-2xl p-6 md:p-8 relative overflow-hidden border border-blue-500/20 bg-slate-950/80">
      {/* Background glow accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-medium mb-2">
            <Sigma className="w-3.5 h-3.5" />
            {lang === 'fr' ? 'Démonstrateur Interactif • MPSI / MP* ➔ IA' : 'Interactive Lab • Math Prep (MP*) ➔ AI'}
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
            <span>{lang === 'fr' ? 'Algèbre Spectrale, Vecteurs Propres & Espace Latent' : 'Spectral Algebra, Eigenvectors & Latent Space'}</span>
          </h3>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            {lang === 'fr'
              ? 'Manipulez la matrice A, observez la déformation de l\'espace euclidien et découvrez comment les axes invariants (Av = λv) constituent le fondement mathématique de la PCA, de la SVD et des têtes d\'attention.'
              : 'Manipulate matrix A, observe the Euclidean space warp, and see how invariant eigenspaces (Av = λv) form the mathematical bedrock of PCA, SVD, and Transformer attention.'}
          </p>
        </div>

        {/* Alignment badge */}
        <div className="flex items-center">
          {isAligned ? (
            <div className="px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 text-xs font-mono flex items-center gap-2 animate-pulse shadow-lg shadow-emerald-500/20">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>
                {lang === 'fr'
                  ? `ALIGNEMENT PROPRE DÉTECTÉ : Ax = ${currentEigenRatio.toFixed(2)}x`
                  : `EIGEN-ALIGNMENT DETECTED: Ax = ${currentEigenRatio.toFixed(2)}x`}
              </span>
            </div>
          ) : (
            <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 text-xs font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>{lang === 'fr' ? 'Déplacez la sonde (point orange)' : 'Drag orange probe vector'}</span>
            </div>
          )}
        </div>
      </div>

      {/* Preset selector bar */}
      <div className="mb-6">
        <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2">
          {lang === 'fr' ? 'Configurations Remarquables / Cas d\'usage IA :' : 'Notable Presets / AI Use Cases:'}
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {presets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => setMatrix(preset.matrix)}
              className="text-left p-3 rounded-xl bg-slate-900/80 hover:bg-blue-900/20 border border-slate-800 hover:border-blue-500/40 transition-all text-xs group cursor-pointer"
            >
              <div className="font-semibold text-slate-200 group-hover:text-blue-400 mb-1 flex items-center justify-between">
                <span>{preset.name[lang]}</span>
                <Play className="w-3 h-3 text-slate-500 group-hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-2">{preset.desc[lang]}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Canvas & Math Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left: Canvas visualization */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="relative w-full aspect-square max-w-[480px] bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl flex items-center justify-center">
            <canvas
              ref={canvasRef}
              width={480}
              height={480}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              className="w-full h-full cursor-crosshair touch-none"
            />

            {/* In-canvas legend */}
            <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-2 rounded-lg border border-slate-800/80 text-[11px] font-mono flex flex-col gap-1 pointer-events-none">
              <div className="flex items-center gap-2 text-cyan-400">
                <span className="w-2.5 h-0.5 bg-cyan-400 inline-block" />
                <span>{lang === 'fr' ? 'Cercle unitaire déformé S¹' : 'Transformed Unit Circle S¹'}</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <span className="w-2.5 h-0.5 bg-emerald-400 inline-block" />
                <span>{lang === 'fr' ? 'Vecteur propre v₁ (Axe invariant 1)' : 'Eigenvector v₁ (Invariant axis 1)'}</span>
              </div>
              <div className="flex items-center gap-2 text-purple-400">
                <span className="w-2.5 h-0.5 bg-purple-400 inline-block" />
                <span>{lang === 'fr' ? 'Vecteur propre v₂ (Axe invariant 2)' : 'Eigenvector v₂ (Invariant axis 2)'}</span>
              </div>
              <div className="flex items-center gap-2 text-amber-400">
                <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                <span>{lang === 'fr' ? 'Sonde x (Draggable)' : 'Probe vector x (Draggable)'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Matrix Inputs & Live Math Expressions */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Matrix Input Panel */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-slate-400">
                {lang === 'fr' ? 'Matrice de Transformation A :' : 'Transformation Matrix A:'}
              </span>
              <button
                onClick={() => setMatrix({ a: 2.0, b: 0.8, c: 0.8, d: 1.2 })}
                className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors"
                title="Reset"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 max-w-[280px] mx-auto my-2">
              {(['a', 'b', 'c', 'd'] as const).map((coef) => (
                <div key={coef} className="flex items-center gap-2 bg-slate-950 p-2 rounded-lg border border-slate-800">
                  <span className="text-xs font-mono font-bold text-blue-400 w-4">{coef}:</span>
                  <input
                    type="range"
                    min="-3"
                    max="3"
                    step="0.1"
                    value={matrix[coef]}
                    onChange={(e) =>
                      setMatrix((prev) => ({ ...prev, [coef]: parseFloat(e.target.value) }))
                    }
                    className="w-full accent-blue-500 cursor-pointer h-1.5"
                  />
                  <span className="text-xs font-mono text-slate-200 w-8 text-right">
                    {matrix[coef].toFixed(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Real-time Math Output (KaTeX) */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col gap-3 font-mono text-xs">
            <div className="text-slate-400 border-b border-slate-800/80 pb-2 flex items-center justify-between">
              <span>{lang === 'fr' ? 'Équation Caractéristique :' : 'Characteristic Polynomial:'}</span>
              <span className="text-blue-400">
                <MathTex math={`\\det(A - \\lambda I) = 0`} />
              </span>
            </div>

            <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800/50 flex flex-col gap-2">
              <div>
                <span className="text-slate-400">Polynôme : </span>
                <MathTex
                  math={`P(\\lambda) = \\lambda^2 - (${trace.toFixed(2)})\\lambda + (${det.toFixed(2)})`}
                />
              </div>
              <div>
                <span className="text-slate-400">Discriminant : </span>
                <MathTex
                  math={`\\Delta = T^2 - 4D = ${discriminant.toFixed(2)} \\quad ${
                    hasRealEigenvalues ? '\\ge 0 \\; (\\text{Réel})' : '< 0 \\; (\\text{Complexe})'
                  }`}
                />
              </div>
            </div>

            {/* Calculated Eigenvalues */}
            <div className="grid grid-cols-2 gap-2 mt-1">
              <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30">
                <div className="text-emerald-400 font-semibold mb-1">λ₁ (Valeur propre 1)</div>
                <div className="text-sm font-bold text-slate-100">
                  {hasRealEigenvalues && lambda1 !== null ? lambda1.toFixed(3) : 'Complexe'}
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-purple-950/30 border border-purple-500/30">
                <div className="text-purple-400 font-semibold mb-1">λ₂ (Valeur propre 2)</div>
                <div className="text-sm font-bold text-slate-100">
                  {hasRealEigenvalues && lambda2 !== null ? lambda2.toFixed(3) : 'Complexe'}
                </div>
              </div>
            </div>
          </div>

          {/* Connection to AI & CIFRE */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-blue-950/40 to-slate-900 border border-blue-500/20 flex items-start gap-3">
            <Brain className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div className="text-xs">
              <div className="font-semibold text-blue-300 mb-1">
                {lang === 'fr' ? 'La passerelle MPSI/MP* ➔ Recherche en IA' : 'The MPSI/MP* ➔ AI Research Bridge'}
              </div>
              <p className="text-slate-400 leading-relaxed">
                {lang === 'fr'
                  ? 'En IA, la matrice de covariance C = X^T X est diagonalisée pour extraire les composantes principales (PCA). Dans les Transformers, le produit Q K^T projette les tokens sur des sous-espaces invariants pour calculer les coefficients d\'attention.'
                  : 'In AI, the covariance matrix C = X^T X is diagonalized to extract principal components (PCA). In Transformers, Q K^T projects tokens onto invariant subspaces to compute multi-head attention weights.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
