import { useEffect, useRef, useState } from "react"
import Box from "@mui/material/Box"
import type { Sequences } from "../../lib/types"
import SequenceChar, { Char } from "./char"
import CopyToast from "./copy-toast"

interface SequenceVisualizationProps {
  sequences: Sequences
}

export default function SequenceVisualization({ sequences }: SequenceVisualizationProps) {
  const [charsPerLine, setCharsPerLine] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLSpanElement>(null)

  const { sequence1, sequence2 } = sequences
  const seq1Upper = sequence1.toUpperCase()
  const seq2Upper = sequence2.toUpperCase()

  const seq1Chunks = getSequenceChunks(seq1Upper, charsPerLine)
  const seq2Chunks = getSequenceChunks(seq2Upper, charsPerLine)

  const calculateCharsPerLine = () => {
    if (!containerRef.current || !measureRef.current) return;

    const containerWidth = containerRef.current.offsetWidth
    const charWidth = measureRef.current.offsetWidth

    const elementStyle = getComputedStyle(measureRef.current);
    const padding = parseFloat(elementStyle.paddingInline)*2;
    const margin = parseFloat(elementStyle.marginInline)*2;

    const totalCharWidth = charWidth + margin + padding

    const maxChars = Math.floor(containerWidth / totalCharWidth)
    setCharsPerLine(Math.max(1, maxChars))
  }

  useEffect(() => {
    calculateCharsPerLine()

    const handleResize = () => calculateCharsPerLine()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <Box
      ref={containerRef}
      sx={{
        fontFamily: "monospace",
        fontSize: { xs: "14px", sm: "16px" },
        userSelect: "text",
        width: "100%",
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        position: "relative"
      }}
    >
      {/* Hidden measuring element */}
      <Char
        ref={measureRef}
        style={{
          visibility: 'hidden',
          position: 'absolute',
          userSelect: "none"
        }}
      >
        A
      </Char>

      {/* Sequences */}
      <Box sx={{ 
        display: "flex", 
        flexDirection: "column", 
        gap: "12px" 
        }}
      >
        {seq1Chunks.map((chunk1, index) => {
          const chunk2 = seq2Chunks[index] || ""
          return (
            <Box 
              key={`chunk-pair-${index}`} 
              sx={{ 
                display: "flex", 
                flexDirection: "column",
                gap: "2px"
              }}
            >
              {/* First sequence chunk */}
              <Box
                component={"p"}
                role="text" 
                aria-label={chunk1}
                display="inline"
                margin={0}
              >
                {[...chunk1].map((char, charIndex) => (
                  <SequenceChar
                    key={`s1-${index}-${charIndex}`}
                    char={char}
                    shouldHighlight={true}
                  />
                ))}
              </Box>
              {/* Second sequence chunk */}
              <Box
                component={"p"}
                role="text" 
                aria-label={chunk2}
                display="inline"
                margin={0}
              >
                {[...chunk2].map((char, charIndex) => (
                  <SequenceChar
                    key={`s1-${index}-${charIndex}`}
                    char={char}
                    shouldHighlight={char !== chunk1[charIndex]}
                  />
                ))}
              </Box>
            </Box>
          )
        })}
      </Box>

      <CopyToast containerRef={containerRef} />
    </Box>
  )
}

const getSequenceChunks = (sequence: string, chunkSize: number) => {
  const chunks = []
  for (let i = 0; i < sequence.length; i += chunkSize) {
    chunks.push(sequence.slice(i, i + chunkSize))
  }
  return chunks
}