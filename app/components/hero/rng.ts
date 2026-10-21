// Seeded Park-Miller PRNG, the same one mockup C uses. Every product stays
// below 2^53, so the sequence is bit-identical on the server and in any
// browser: art generated from it never causes a hydration mismatch.
export function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}
