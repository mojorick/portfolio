import React, { useMemo } from 'react';
import katex from 'katex';

interface MathTexProps {
  math: string;
  display?: boolean;
  className?: string;
}

export const MathTex: React.FC<MathTexProps> = ({ math, display = false, className = '' }) => {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: display,
        throwOnError: false,
      });
    } catch (err) {
      console.error('KaTeX rendering error:', err);
      return math;
    }
  }, [math, display]);

  return (
    <span
      className={`inline-block ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
