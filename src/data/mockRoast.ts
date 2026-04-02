import type { RoastResult } from '../types'

export const mockRoast: RoastResult = {
  annotations: [
    {
      lineNumber: 2,
      severity: 'error',
      comment: 'Wait, are we debugging with console.log in production code? What year is this? And that semicolon at the end... how inconsistent.'
    },
    {
      lineNumber: 3,
      severity: 'warning',
      comment: 'VAR?! In 2026?! I thought we killed this monster years ago. Let it rest in peace.'
    },
    {
      lineNumber: 5,
      severity: 'error',
      comment: 'Using == instead of === is like playing Russian roulette with type coercion. WHY WOULD YOU DO THIS?'
    },
    {
      lineNumber: 6,
      severity: 'warning',
      comment: 'Console.log strikes again! We should start charging rent for these debug statements.'
    },
    {
      lineNumber: 10,
      severity: 'fatal',
      comment: 'GLOBAL VARIABLES. That is all. This is a crime against software engineering.'
    }
  ],
  scores: {
    readability: 28,
    performance: 61,
    style: 42
  },
  overallRoast: 'This code reads like it was written during a power outage with no internet connection. Every principle of clean code has been violated, and I am genuinely concerned for whoever has to maintain this. Please, for the sake of future developers, learn about const, let, proper error handling, and maybe consider a different career path.'
}
