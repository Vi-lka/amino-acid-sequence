import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import type { AminoAcid, Sequences } from "../lib/types"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Alert from "@mui/material/Alert"
import Button from "@mui/material/Button"
import { AMINO_ACIDS } from "../lib/const"

const isValidAminoAcid = (char: string): boolean => {
  return AMINO_ACIDS.includes(char.toUpperCase() as AminoAcid);
};

const sequenceSchema = z
  .object({
    sequence1: z
      .string()
      .min(1, "First sequence is required")
      .refine(
        (val) => [...val].every((char) => isValidAminoAcid(char)),
        "Sequence can only contain valid amino acid letters (A, R, N, D, C, E, Q, G, H, I, L, K, M, F, P, S, T, W, Y, V) and '-'",
      ),
    sequence2: z
      .string()
      .min(1, "Second sequence is required")
      .refine(
        (val) => [...val].every((char) => isValidAminoAcid(char)),
        "Sequence can only contain valid amino acid letters (A, R, N, D, C, E, Q, G, H, I, L, K, M, F, P, S, T, W, Y, V) and '-'",
      ),
  })
  .refine((data) => data.sequence1.length === data.sequence2.length, {
    message: "Both sequences must be the same length",
    path: ["sequence2"],
  })

interface SequenceAlignmentFormProps {
  onSubmit: (data: Sequences) => void
}


export default function SequenceAlignmentForm({ onSubmit }: SequenceAlignmentFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Sequences>({
    resolver: zodResolver(sequenceSchema),
    defaultValues: {
      sequence1: "",
      sequence2: "",
    },
  })


  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate marginTop={2}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="sequence1"
        label="First Amino Acid Sequence"
        placeholder="e.g., VLSPADKTNIKASWEKIGSHG"
        {...register("sequence1")}
        error={!!errors.sequence1}
        helperText={errors.sequence1?.message}
        slotProps={{
          htmlInput: { style: { fontFamily: "monospace" } }
        }}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="sequence2"
        label="Second Amino Acid Sequence"
        placeholder="e.g., VLSPADKTNIKASWEKIGSHG"
        {...register("sequence2")}
        error={!!errors.sequence2}
        helperText={errors.sequence2?.message}
        slotProps={{
          htmlInput: { style: { fontFamily: "monospace" } }
        }}

      />
      {errors.root && <Alert severity="error">{errors.root.message}</Alert>}
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Visualize Alignment
      </Button>
    </Box>
  )
}
