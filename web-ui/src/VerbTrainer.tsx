import React, { useState } from 'react';
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';

// Example data (you can expand this list)
const verbs = [
  { infinitive: "krijgen", meaning: "to get, to receive", imperfectum: ["kreeg", "kregen"], participium: "gekregen" },
  { infinitive: "gaan", meaning: "to go", imperfectum: ["ging", "gingen"], participium: "gegaan" },
  { infinitive: "zien", meaning: "to see", imperfectum: ["zag", "zagen"], participium: "gezien" }
];

export default function VerbTrainer() {
  const [index, setIndex] = useState(0);
  const [inputs, setInputs] = useState({ impSing: "", impPlur: "", part: "" });
  const [checked, setChecked] = useState(false);

  const current = verbs[index];

  const handleChange = (field) => (e) => {
    setInputs({ ...inputs, [field]: e.target.value });
  };

  const checkAnswers = () => {
    setChecked(true);
  };

  const nextVerb = () => {
    setIndex((prev) => (prev + 1) % verbs.length);
    setInputs({ impSing: "", impPlur: "", part: "" });
    setChecked(false);
  };

  const isCorrect = (answer, expected) => answer.trim().toLowerCase() === expected.toLowerCase();

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Card sx={{ width: 400, p: 3, borderRadius: 4, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {current.infinitive} <Typography variant="body2" component="span">({current.meaning})</Typography>
          </Typography>

          <Typography variant="subtitle1" sx={{ mt: 2 }}>imperfectum - verleden tijd</Typography>
          <TextField
            label="Singular"
            value={inputs.impSing}
            onChange={handleChange("impSing")}
            fullWidth
            margin="dense"
            error={checked && !isCorrect(inputs.impSing, current.imperfectum[0])}
            helperText={checked && !isCorrect(inputs.impSing, current.imperfectum[0]) ? current.imperfectum[0] : " "}
          />
          <TextField
            label="Plural"
            value={inputs.impPlur}
            onChange={handleChange("impPlur")}
            fullWidth
            margin="dense"
            error={checked && !isCorrect(inputs.impPlur, current.imperfectum[1])}
            helperText={checked && !isCorrect(inputs.impPlur, current.imperfectum[1]) ? current.imperfectum[1] : " "}
          />

          <Typography variant="subtitle1" sx={{ mt: 2 }}>participium - voltooid deelwoord</Typography>
          <TextField
            label="Participium"
            value={inputs.part}
            onChange={handleChange("part")}
            fullWidth
            margin="dense"
            error={checked && !isCorrect(inputs.part, current.participium)}
            helperText={checked && !isCorrect(inputs.part, current.participium) ? current.participium : " "}
          />

          <Box mt={3} display="flex" justifyContent="space-between">
            <Button variant="outlined" onClick={checkAnswers}>Check</Button>
            <Button variant="contained" color="success" onClick={nextVerb}>Volgende</Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
