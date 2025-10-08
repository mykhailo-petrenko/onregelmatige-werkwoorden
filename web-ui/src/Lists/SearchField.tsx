import { useEffect, useState, type JSX } from "react";
import { TextField } from "@mui/material";

export interface SearchFieldProps {
  value?: string;
  onChange: (newValue: string) => void;
  /** debounce delay in milliseconds (default 200) */
  debounceMs?: number;
}

export function SearchField({ value, onChange, debounceMs = 200 }: SearchFieldProps): JSX.Element {
  const [searchQuery, setSearchQuery] = useState<string>(value ?? '');

  // Keep local state in sync when parent `value` changes.
  useEffect(() => {
    setSearchQuery(value ?? '');
  }, [value]);

  // Debounce calling onChange while the user types.
  useEffect(() => {
    const id = setTimeout(() => {
      // only call if value actually changed (optional, but safe)
      onChange(searchQuery);
    }, debounceMs);

    return () => clearTimeout(id);
  }, [searchQuery, debounceMs, onChange]);
  
  return <>
    <TextField
      size="small"
      placeholder="Search" 
      value={searchQuery} 
      onChange={e => setSearchQuery(e.target.value)} 
    />
  </>;
}