import React from 'react';
import { TextField, InputAdornment, IconButton, TextFieldProps } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

interface GenericSearchBarProps extends Omit<TextFieldProps, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  variant?: 'standard' | 'filled' | 'outlined';
  size?: 'small' | 'medium';
  fullWidth?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
  className?: string;
  InputProps?: TextFieldProps['InputProps'];
}

const GenericSearchBar: React.FC<GenericSearchBarProps> = ({
  value,
  onChange,
  onClear,
  placeholder = 'Search',
  variant = 'outlined',
  size = 'medium',
  fullWidth = true,
  autoFocus = false,
  disabled = false,
  className,
  InputProps,
  ...otherProps
}) => {
  const handleClear = (): void => {
    if (onClear) {
      onClear();
    } else if (onChange) {
      onChange('');
    }
  };

  return (
    <TextField
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
      placeholder={placeholder}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      autoFocus={autoFocus}
      disabled={disabled}
      className={className}
      InputProps={{
        ...InputProps,
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: value ? (
          <InputAdornment position="end">
            <IconButton
              aria-label="clear search"
              onClick={handleClear}
              edge="end"
              size="small"
            >
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        ) : null,
      }}
      {...otherProps}
    />
  );
};

export default GenericSearchBar;
