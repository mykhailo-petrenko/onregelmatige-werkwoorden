import React, { useState } from 'react';
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';
import VerbTrainerCard from './VerbTrainerCard';
import type { VerbInfo } from './VerbTypes';

// Example data (you can expand this list)
const verbs = [
  { infinitive: "krijgen", meaning: "to get, to receive", imperfectum: ["kreeg", "kregen"], participium: "gekregen" },
  { infinitive: "gaan", meaning: "to go", imperfectum: ["ging", "gingen"], participium: "gegaan" },
  { infinitive: "zien", meaning: "to see", imperfectum: ["zag", "zagen"], participium: "gezien" }
];

export default function VerbTrainer() {
  const [index, setIndex] = useState(0);


  const current = verbs[index] as VerbInfo;

  const next = () => {
    setIndex((prev) => (prev + 1) % verbs.length);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <VerbTrainerCard
        current={current}
        onNext={next}
      />
    </Box>
  );
}
