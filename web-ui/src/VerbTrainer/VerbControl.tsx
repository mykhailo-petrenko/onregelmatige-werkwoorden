import type { ChangeEvent, FC } from 'react';
import { FormControl, FormHelperText, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export interface VerbInputFieldProps {
  id: string;
  label: string;
  value: string;
  correct: string;
  onChange: (e: ChangeEvent<HTMLInputElement >) => void;
  isChecked: boolean;
  isCorrect: boolean;
  ref?: React.Ref<HTMLInputElement>;
}

export const VerbControl: FC<VerbInputFieldProps> = function VerVerbControlbInputField(props: VerbInputFieldProps) {
  const id = `input-${props.id}`;
  const isChecked = props.isChecked;
  const isCorrect = props.isCorrect;
  const isError = (isChecked && !isCorrect);
  const isSuccess = (isChecked && isCorrect);

  let endAdornment = null;
  let color = null;

  if (isError) {
    color = 'red';
    endAdornment = <InputAdornment position="end"><CancelIcon sx={{ color: color }} /></InputAdornment>;
  }

  if (isSuccess) {
    color = 'green';
    endAdornment = <InputAdornment position="end"><CheckCircleIcon sx={{ color: color }} /></InputAdornment>;
  }

  return (
    <FormControl 
      fullWidth
      error={isError}
      sx={{ m: 1 }}
    >
      <InputLabel htmlFor={id}>{props.label}</InputLabel>
      <OutlinedInput
        id={id}
        label={props.label}
        value={props.value}
        endAdornment={endAdornment}
        onChange={props.onChange}
        margin="dense"
        error={isError}
        aria-describedby="helper-impSing"
        inputRef={props.ref}
      />
      <FormHelperText 
        id="helper-impSing"
        sx={{ color: color, fontSize: '1.2em' }}

      >{(isChecked) ? props.correct : ' '}</FormHelperText>
    </FormControl>
  );
}