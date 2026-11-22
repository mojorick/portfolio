declare module 'katex' {
  export interface KatexOptions {
    displayMode?: boolean;
    output?: 'html' | 'mathml' | 'htmlAndMathml';
    leqno?: boolean;
    fleqn?: boolean;
    throwOnError?: boolean;
    errorColor?: string;
    macros?: any;
    minRuleThickness?: number;
    colorIsTextColor?: boolean;
    strict?: boolean | string | Function;
    trust?: boolean | Function;
  }
  export function renderToString(tex: string, options?: KatexOptions): string;
}
