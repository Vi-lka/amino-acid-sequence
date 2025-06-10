import { useState } from 'react'
import type { Sequences } from '../lib/types'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import SequenceAlignmentForm from '../components/SequenceAlignmentForm'
import SequenceVisualization from '../components/SequenceVisualization'

export default function Home() {
  const [sequences, setSequences] = useState<Sequences | null>(null)

  const handleSubmit = (data: Sequences) => {
    setSequences(data)
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" fontSize={{ xs: '1.5rem', md: '2rem' }} gutterBottom align="center">
        Amino Acid Sequence Alignment Visualizer
      </Typography>
      <SequenceAlignmentForm onSubmit={handleSubmit} />
      {sequences && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" component="h2" fontSize={{ xs: '1rem', md: '1.5rem' }} gutterBottom textAlign="center">
            Alignment Visualization
          </Typography>
          <SequenceVisualization sequences={sequences} />
        </Box>
      )}
    </Container>
  )
}
