import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MathTex } from '../../utils/katex';
import type { Language } from '../../types';
import { RotateCcw, Sigma, CheckCircle2 } from 'lucide-react';

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
  const [matrix, setMatrix] = useState<Matrix2x2>({
    a: 2.0,
    b: 0.8,
    c: 0.8,
    d: 1.2
  });

  const [probeVector, setProbeVector] = useState<{ x: number; y: number }>({ x: 1, y: 0.5 });
  const [isDragging, setIsDragging] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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
        fr: 'Matrice de rang 1 : det(A) = 0. Le cercle unitaire se projette sur une droite (espace latent 1D).',
        en: 'Rank-1 matrix: det(A) = 0. The unit circle projects onto a 1D line.'
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

    const getEigenvector = (lam: number) => {
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
        if (Math.abs(lam - matrix.a) < 1e-4) return { x: 1, y: 0 };
        return { x: 0, y: 1 };
      }
    };

    v1 = getEigenvector(lambda1);
    v2 = getEigenvector(lambda2);
  }

  const transformedProbe = {
    x: matrix.a * probeVector.x + matrix.b * probeVector.y,
    y: matrix.c * probeVector.x + matrix.d * probeVector.y
  };

  const probeNorm = Math.hypot(probeVector.x, probeVector.y);
  const transNorm = Math.hypot(transformedProbe.x, transformedProbe.y);
  let isAligned = false;
  let currentEigenRatio = 0;

  if (probeNorm > 0.05 && transNorm > 0.05) {
    const cross = Math.abs(probeVector.x * transformedProbe.y - probeVector.y * transformedProbe.x);
    const dot = probeVector.x * transformedProbe.x + probeVector.y * transformedProbe.y;
    if (cross / (probeNorm * transNorm) < 0.08) {
      isAligned = true;
      currentEigenRatio = dot / (probeNorm * probeNorm);
    }
  }

  // Draw technical workbench canvas
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const scale = 50;
    const cx = width / 2;
    const cy = height / 2;

    ctx.clearRect(0, 0, width, height);

    // Subtle technical grid
    ctx.strokeStyle = '#18181b';
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

    // Warped grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let i = -5; i <= 5; i++) {
      const p1 = { x: matrix.a * i + matrix.b * -5, y: matrix.c * i + matrix.d * -5 };
      const p2 = { x: matrix.a * i + matrix.b * 5, y: matrix.c * i + matrix.d * 5 };
      ctx.beginPath();
      ctx.moveTo(cx + p1.x * scale, cy - p1.y * scale);
      ctx.lineTo(cx + p2.x * scale, cy - p2.y * scale);
      ctx.stroke();

      const q1 = { x: matrix.a * -5 + matrix.b * i, y: matrix.c * -5 + matrix.d * i };
      const q2 = { x: matrix.a * 5 + matrix.b * i, y: matrix.c * 5 + matrix.d * i };
      ctx.beginPath();
      ctx.moveTo(cx + q1.x * scale, cy - q1.y * scale);
      ctx.lineTo(cx + q2.x * scale, cy - q2.y * scale);
      ctx.stroke();
    }

    // Main Axes
    ctx.strokeStyle = '#3f3f46';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, cy);
    ctx.lineTo(width, cy);
    ctx.moveTo(cx, 0);
    ctx.lineTo(cx, height);
    ctx.stroke();

    // Unit Circle S^1 (Dotted)
    ctx.strokeStyle = '#52525b';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.arc(cx, cy, scale, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Transformed Unit Circle -> Ellipse (A * S^1)
    ctx.strokeStyle = '#e4e4e7';
    ctx.lineWidth = 2;
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

    // Invariant Eigenspaces (if real)
    if (hasRealEigenvalues && v1 && v2 && lambda1 !== null && lambda2 !== null) {
      const drawEigAxis = (vec: { x: number; y: number }, lam: number, color: string, label: string) => {
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(cx - vec.x * scale * 4, cy + vec.y * scale * 4);
        ctx.lineTo(cx + vec.x * scale * 4, cy - vec.y * scale * 4);
        ctx.stroke();
        ctx.setLineDash([]);

        const tvx = vec.x * lam;
        const tvy = vec.y * lam;
        ctx.strokeStyle = color;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + tvx * scale, cy - tvy * scale);
        ctx.stroke();

        ctx.fillStyle = color;
        ctx.font = '11px "JetBrains Mono", monospace';
        ctx.fillText(
          `${label} (λ=${lam.toFixed(2)})`,
          cx + tvx * scale + 8,
          cy - tvy * scale - 4
        );
      };

      drawEigAxis(v1, lambda1, '#22c55e', 'v₁');
      drawEigAxis(v2, lambda2, '#a855f7', 'v₂');
    }

    // User Probe Vector x
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + probeVector.x * scale, cy - probeVector.y * scale);
    ctx.stroke();

    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(cx + probeVector.x * scale, cy - probeVector.y * scale, 5, 0, Math.PI * 2);
    ctx.fill();

    // Transformed Vector Ax
    ctx.strokeStyle = isAligned ? '#22c55e' : '#f43f5e';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + transformedProbe.x * scale, cy - transformedProbe.y * scale);
    ctx.stroke();

    ctx.fillStyle = isAligned ? '#22c55e' : '#f43f5e';
    ctx.beginPath();
    ctx.arc(cx + transformedProbe.x * scale, cy - transformedProbe.y * scale, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#f59e0b';
    ctx.font = '11px monospace';
    ctx.fillText('x', cx + probeVector.x * scale + 8, cy - probeVector.y * scale);

    ctx.fillStyle = isAligned ? '#22c55e' : '#f43f5e';
    ctx.fillText(
      isAligned ? `Ax = ${currentEigenRatio.toFixed(2)}x` : 'Ax',
      cx + transformedProbe.x * scale + 8,
      cy - transformedProbe.y * scale
    );
  }, [matrix, probeVector, isAligned, currentEigenRatio, hasRealEigenvalues, lambda1, lambda2, v1, v2, transformedProbe]);

  useEffect(() => {
    draw();
  }, [draw]);

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
    setProbeVector({
      x: Math.max(-3.5, Math.min(3.5, newX)),
      y: Math.max(-3.5, Math.min(3.5, newY))
    });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-zinc-800">
        <div>
          <span className="text-xs font-mono text-zinc-400 block mb-1">
            {lang === 'fr' ? 'Fondations Mathématiques (MPSI / MP*) ➔ Espaces Latents & IA' : 'Mathematical Foundations (MP*) ➔ Latent Space & AI'}
          </span>
          <h3 className="text-lg md:text-xl font-bold text-white">
            {lang === 'fr' ? 'Algèbre Spectrale, Vecteurs Propres & Projection' : 'Spectral Algebra, Eigenvectors & Linear Mapping'}
          </h3>
          <p className="text-xs text-zinc-400 mt-1 max-w-2xl">
            {lang === 'fr'
              ? 'Modifiez les coefficients de la matrice A et observez la transformation linéaire. Les axes invariants (Av = λv) forment la colonne vertébrale mathématique de la PCA, de la SVD et des têtes d\'attention.'
              : 'Modify the matrix coefficients to inspect the linear transformation. Invariant eigenspaces (Av = λv) represent the mathematical bedrock of PCA, SVD, and Transformer attention.'}
          </p>
        </div>

        <div>
          {isAligned ? (
            <div className="px-3 py-1.5 rounded-md bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-mono flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>
                {lang === 'fr'
                  ? `Sous-espace propre identifié : Ax = ${currentEigenRatio.toFixed(2)}x`
                  : `Invariant eigenspace aligned: Ax = ${currentEigenRatio.toFixed(2)}x`}
              </span>
            </div>
          ) : (
            <div className="px-3 py-1.5 rounded-md bg-zinc-950 border border-zinc-800 text-zinc-400 text-xs font-mono">
              {lang === 'fr' ? 'Glissez le vecteur x (point orange)' : 'Drag probe vector x (orange dot)'}
            </div>
          )}
        </div>
      </div>

      {/* Presets */}
      <div className="mb-6">
        <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
          {lang === 'fr' ? 'Configurations matricielles remarquables :' : 'Standard Matrix Presets:'}
        </span>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {presets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => setMatrix(preset.matrix)}
              className="text-left p-3 rounded-lg bg-zinc-950 hover:bg-zinc-800/80 border border-zinc-800 hover:border-zinc-700 transition-colors text-xs cursor-pointer"
            >
              <div className="font-medium text-zinc-200 mb-1">
                {preset.name[lang]}
              </div>
              <p className="text-[11px] text-zinc-500 line-clamp-2">{preset.desc[lang]}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left: Canvas */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="relative w-full aspect-square max-w-[460px] bg-zinc-950 rounded-xl border border-zinc-800 overflow-hidden flex items-center justify-center">
            <canvas
              ref={canvasRef}
              width={460}
              height={460}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              className="w-full h-full cursor-crosshair touch-none"
            />

            <div className="absolute bottom-3 left-3 bg-zinc-950/90 px-3 py-2 rounded border border-zinc-800 text-[11px] font-mono flex flex-col gap-1 pointer-events-none">
              <div className="flex items-center gap-2 text-zinc-300">
                <span className="w-2.5 h-0.5 bg-zinc-300 inline-block" />
                <span>{lang === 'fr' ? 'Cercle unitaire déformé S¹' : 'Transformed Unit Circle S¹'}</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <span className="w-2.5 h-0.5 bg-emerald-400 inline-block" />
                <span>{lang === 'fr' ? 'Vecteur propre v₁' : 'Eigenvector v₁'}</span>
              </div>
              <div className="flex items-center gap-2 text-purple-400">
                <span className="w-2.5 h-0.5 bg-purple-400 inline-block" />
                <span>{lang === 'fr' ? 'Vecteur propre v₂' : 'Eigenvector v₂'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Controls & Equations */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-zinc-400">
                {lang === 'fr' ? 'Matrice de transformation A :' : 'Transformation Matrix A:'}
              </span>
              <button
                onClick={() => setMatrix({ a: 2.0, b: 0.8, c: 0.8, d: 1.2 })}
                className="text-zinc-500 hover:text-zinc-300 p-1 transition-colors cursor-pointer"
                title="Reset"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5 max-w-[280px] mx-auto my-1">
              {(['a', 'b', 'c', 'd'] as const).map((coef) => (
                <div key={coef} className="flex items-center gap-2 bg-zinc-900 p-2 rounded border border-zinc-800">
                  <span className="text-xs font-mono font-bold text-zinc-300 w-4">{coef}:</span>
                  <input
                    type="range"
                    min="-3"
                    max="3"
                    step="0.1"
                    value={matrix[coef]}
                    onChange={(e) =>
                      setMatrix((prev) => ({ ...prev, [coef]: parseFloat(e.target.value) }))
                    }
                    className="w-full accent-zinc-400 cursor-pointer h-1.5"
                  />
                  <span className="text-xs font-mono text-zinc-200 w-8 text-right">
                    {matrix[coef].toFixed(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex flex-col gap-3 font-mono text-xs">
            <div className="text-zinc-400 border-b border-zinc-800 pb-2 flex items-center justify-between">
              <span>{lang === 'fr' ? 'Équation Caractéristique :' : 'Characteristic Polynomial:'}</span>
              <span className="text-zinc-200">
                <MathTex math={`\\det(A - \\lambda I) = 0`} />
              </span>
            </div>

            <div className="bg-zinc-900/60 p-3 rounded border border-zinc-800/80 flex flex-col gap-1.5">
              <div>
                <span className="text-zinc-500">Polynôme : </span>
                <MathTex
                  math={`P(\\lambda) = \\lambda^2 - (${trace.toFixed(2)})\\lambda + (${det.toFixed(2)})`}
                />
              </div>
              <div>
                <span className="text-zinc-500">Discriminant : </span>
                <MathTex
                  math={`\\Delta = ${discriminant.toFixed(2)} \\quad ${
                    hasRealEigenvalues ? '\\ge 0 \\; (\\text{Racines réelles})' : '< 0 \\; (\\text{Racines complexes})'
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-1">
              <div className="p-2.5 rounded bg-zinc-900 border border-zinc-800">
                <div className="text-zinc-400 text-[11px] mb-0.5">λ₁ (Valeur propre 1)</div>
                <div className="text-sm font-bold text-white">
                  {hasRealEigenvalues && lambda1 !== null ? lambda1.toFixed(3) : 'Complexe'}
                </div>
              </div>
              <div className="p-2.5 rounded bg-zinc-900 border border-zinc-800">
                <div className="text-zinc-400 text-[11px] mb-0.5">λ₂ (Valeur propre 2)</div>
                <div className="text-sm font-bold text-white">
                  {hasRealEigenvalues && lambda2 !== null ? lambda2.toFixed(3) : 'Complexe'}
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-400 leading-relaxed">
            <div className="font-semibold text-zinc-200 mb-1">
              {lang === 'fr' ? 'Application aux modèles d\'apprentissage (IA)' : 'Application to Machine Learning Models'}
            </div>
            <p>
              {lang === 'fr'
                ? 'La diagonalisation de la matrice de covariance C = X^T X isole les composantes principales de variance (PCA). Dans les Transformers, le produit Q K^T est une forme bilinéaire projetant les représentations sur des axes de corrélation sémantique.'
                : 'Diagonalizing the covariance matrix C = X^T X isolates principal variance components (PCA). In Transformers, Q K^T operates as a bilinear form projecting representations onto semantic correlation axes.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
