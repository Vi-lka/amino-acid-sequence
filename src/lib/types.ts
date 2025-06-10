import type { AMINO_ACIDS } from "./const";

export type AminoAcid = typeof AMINO_ACIDS[number];

export interface Sequences {
  sequence1: string
  sequence2: string
}