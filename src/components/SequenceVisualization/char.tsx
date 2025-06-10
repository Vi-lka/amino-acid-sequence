import { forwardRef, memo, type ReactNode } from "react";
import { AMINO_ACID_COLORS } from "../../lib/const";
import type { AminoAcid } from "../../lib/types";

interface CharProps {
  children: ReactNode;
  style?: React.CSSProperties
}

export const Char = forwardRef<HTMLSpanElement, CharProps>(({children, style}, ref) => {
  return (
    <span
      ref={ref}
      style={{
        ...style,
        padding: "2px 4px",
        margin: "1px",
        borderRadius: "2px",
      }}
    >
      {children}
    </span>
  );
});

const SequenceChar = memo(({ 
  char, 
  shouldHighlight, 
}: { 
  char: string; 
  shouldHighlight: boolean; 
}) => {
  const backgroundColor = shouldHighlight 
    ? AMINO_ACID_COLORS[char as AminoAcid] || 'transparent'
    : 'transparent';

  return (
    <Char style={{backgroundColor: backgroundColor}}>
      {char}
    </Char>
  );
});

export default SequenceChar;