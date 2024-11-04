import React, { useState } from 'react';
import { FormControl, Input, Icon, Pressable, IInputProps } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

interface FormInputProps extends Omit<IInputProps, 'type'> {
  type?: 'text' | 'number' | 'password';
  label?: string;
  error?: string;
  onChangeText?: (value: string) => void;
}

export const FormInput: React.FC<FormInputProps> = ({
  type = 'text',
  label,
  placeholder,
  value,
  onChangeText,
  error,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const getInputType = (): 'text' | 'password' => {
    if (type === 'password') {
      return showPassword ? 'text' : 'password';
    }
    return 'text';
  };

  const renderRightElement = (): JSX.Element | undefined => {
    if (type === 'password') {
      return (
        <Pressable onPress={() => setShowPassword(!showPassword)}>
          <Icon
            as={MaterialIcons}
            name={showPassword ? 'visibility' : 'visibility-off'}
            size={5}
            mr="2"
            color="muted.400"
          />
        </Pressable>
      );
    }
    return undefined;
  };

  return (
    <FormControl isInvalid={!!error} mb={4}>
      {label && <FormControl.Label>{label}</FormControl.Label>}
      
      <Input
        type={getInputType()}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={type === 'number' ? 'numeric' : 'default'}
        InputRightElement={renderRightElement()}
        {...props}
      />
      
      {error && (
        <FormControl.ErrorMessage>
          {error}
        </FormControl.ErrorMessage>
      )}
    </FormControl>
  );
};
