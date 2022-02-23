import React, { memo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput as Input } from 'react-native-paper';
import { theme } from '../../ui/theme';

type Props = React.ComponentProps<typeof Input> & {
  errorText?: string;
  withPasswordEye?: boolean;
  secureInputAction?: () => void;
};

const TextInput = ({
  errorText,
  withPasswordEye,
  secureInputAction,
  ...props
}: Props) => (
  <View style={styles.container}>
    <Input
      style={styles.input}
      selectionColor={theme.colors.primary}
      underlineColor="transparent"
      mode="outlined"
      right={
        withPasswordEye ? (
          <Input.Icon onPress={secureInputAction} name="eye" />
        ) : null
      }
      {...props}
    />
    {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  input: {
    backgroundColor: theme.colors.surface,
  },
  error: {
    fontSize: 14,
    color: theme.colors.error,
    paddingHorizontal: 4,
    paddingTop: 4,
  },
});

export default memo(TextInput);
