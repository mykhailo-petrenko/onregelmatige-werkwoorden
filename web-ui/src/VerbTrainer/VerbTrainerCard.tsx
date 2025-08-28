import { useCallback, useEffect, useRef, useState, type ChangeEvent, type FC } from 'react';
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import type { VerbInfo } from "./VerbTypes";
import { VerbControl } from './VerbControl';


export interface VerbTrainerCardProps {
  current: VerbInfo;
  onNext: () => void;
}

export const VerbTrainerCard: FC<VerbTrainerCardProps> = function VerbTrainerCard(props: VerbTrainerCardProps) {
  const current = props?.current;

  const [checked, setChecked] = useState(false);
  const [inputs, setInputs] = useState({ impSing: "", impPlur: "", part: "" });
  
  const firstInputRef = useRef<HTMLInputElement>(null);

  const reset = () => {
    setInputs({ impSing: "", impPlur: "", part: "" });
    setChecked(false);
    firstInputRef?.current?.focus();
  };

  useEffect(() => {
    reset();
  }, [current]);

  const handleChange = useCallback((fieldName: string) => (e: ChangeEvent<HTMLInputElement >) => {
    setInputs({ ...inputs, [fieldName]: e.target.value });
  }, [inputs]);

  const isCorrect = (answer: string, expected: string) => {
   return answer.trim().toLowerCase() === expected.trim().toLowerCase();
  };

  const onNext = () => {
    reset();

    if (props?.onNext) {
      props.onNext();
    }
  };

  const checkAnswers = () => {
    setChecked(true);
  };

  const isValid = {
    impSing: isCorrect(inputs.impSing, current.imperfectum[0]),
    impPlur: isCorrect(inputs.impPlur, current.imperfectum[1]),
    part: isCorrect(inputs.part, current.participium),
  };

  const isValidTotal = (
    isValid.impSing && isValid.impPlur && isValid.part
  );

  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!checked) {
      checkAnswers();
    } else {
      onNext();
    }
  };

  if (!current) {
    return null;
  }

  const controls = [];

  if (!checked) {
    controls.push(
      <Button key="c_check" type="submit" variant="outlined" onClick={checkAnswers}>Check</Button>
    );
  } else {
    controls.push(
      <Button key="c_next" type="submit" variant="contained" color={isValidTotal ? 'success' : 'warning'} onClick={onNext}>Volgende</Button>
    );
  }

  return (
    <Card sx={{ width: 400, p: 3, borderRadius: 4, boxShadow: 3 }}>
      <CardContent>
        <form onSubmit={onSubmit}>
          <Typography variant="h4" gutterBottom>
            {current.infinitive} <Typography variant="body2" component="span">({current.meaning})</Typography>
          </Typography>

          <Typography variant="subtitle1" sx={{ mt: 2 }}>Imperfectum</Typography>
          <VerbControl 
            id="impSing"
            label="Singular (hij / zij / het)"
            value={inputs.impSing}
            onChange={handleChange('impSing')}
            isCorrect={isValid.impSing}
            correct={current.imperfectum[0]}
            isChecked={checked}
            ref={firstInputRef}
          />
          <VerbControl 
            id="impPlur"
            label="Plural (wij / zij / jullie)"
            value={inputs.impPlur}
            onChange={handleChange('impPlur')}
            isCorrect={isValid.impPlur}
            correct={current.imperfectum[1]}
            isChecked={checked}
          />

          <Typography variant="subtitle1" sx={{ mt: 2 }}>Perfectum</Typography>
          <VerbControl 
            id="part"
            label="Participium"
            value={inputs.part}
            onChange={handleChange('part')}
            isCorrect={isValid.part}
            correct={current.participium}
            isChecked={checked}
          />

          <Box mt={3} display="flex" justifyContent="flex-end">
            {controls}
          </Box>
        </form>
      </CardContent>
    </Card>
  );
}

export default VerbTrainerCard;