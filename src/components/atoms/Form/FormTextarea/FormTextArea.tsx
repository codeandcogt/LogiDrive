import React from 'react';
import { FormControl, TextArea, ITextAreaProps } from 'native-base';

interface FormTextAreaProps extends Omit<ITextAreaProps, 'value' | 'onChangeText'> {
  label?: string;
  error?: string;
  value?: string;
  onChangeText?: (value: string) => void;
  maxLength?: number;
  showCharacterCount?: boolean;
}

export const FormTextArea: React.FC<FormTextAreaProps> = ({
  label,
  error,
  value = '',
  onChangeText,
  maxLength,
  showCharacterCount = false,
  numberOfLines = 4,
  placeholder,
  ...props
}) => {
  const characterCount = value.length;
  
  return (
    <FormControl isInvalid={!!error} mb={4}>
      {label && <FormControl.Label>{label}</FormControl.Label>}
      
      <TextArea
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        w="100%"
        numberOfLines={numberOfLines}
        maxLength={maxLength}
        autoCompleteType={undefined}
        {...props}
      />
      
      {(showCharacterCount && maxLength) && (
        <FormControl.HelperText textAlign="right">
          {characterCount}/{maxLength}
        </FormControl.HelperText>
      )}
      
      {error && (
        <FormControl.ErrorMessage>
          {error}
        </FormControl.ErrorMessage>
      )}
    </FormControl>
  );
};