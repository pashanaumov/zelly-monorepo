import {
  RegisterUserPayload,
  runRegisterUser,
} from '@zelly/core/redux/sagas/registerSaga';
import { AppDispatch } from '@zelly/core/redux/storeNative';
import { useFormik } from 'formik';
import React, { memo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import Background from '../../components/Common/Background';
import Button from '../../components/Common/Button/Button';
import Header from '../../components/Common/Header';
import Logo from '../../components/Common/Logo';
import TextInput from '../../components/Common/TextInput';
import { Navigation } from '../../Types';
import { theme } from '../../ui/theme';
import {
  countryValidator,
  emailValidator,
  passwordValidator,
} from '../../ui/utils';

type Props = {
  navigation: Navigation;
};

const RegisterScreen = ({ navigation }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const [_email, setEmail] = useState({ error: '' });
  const [_password, setPassword] = useState({ error: '' });
  const [_country, setCountry] = useState({ error: '' });

  const _onSignUpPressed = (
    email: string,
    password: string,
    country: string,
    successCb: () => void,
  ) => {
    const emailError = emailValidator(email);
    const passwordError = passwordValidator(password);
    const countryError = countryValidator(country);

    if (emailError || passwordError || countryError) {
      setEmail({ error: emailError });
      setPassword({ error: passwordError });
      setCountry({
        error: countryError,
      });
      return;
    }
    successCb();
  };

  function onRegister(data: Omit<RegisterUserPayload, 'type'>) {
    _onSignUpPressed(data.email, data.password, data.country, () =>
      dispatch(runRegisterUser(data)),
    );
  }

  function navigateToLogin() {
    navigation.navigate('Login');
  }

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: '',
      password: '',
      country: '',
    },
    onSubmit: (_values) => {
      onRegister(_values);
    },
  });

  const { email, password, country } = values;

  return (
    <Background>
      <Logo />

      <Header>Create Account</Header>

      <TextInput
        autoComplete={'email'}
        label="Email"
        returnKeyType="next"
        value={email}
        onChangeText={handleChange('email')}
        error={!!_email.error}
        errorText={_email.error}
        autoCapitalize="none"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label="Country"
        returnKeyType="done"
        value={country}
        onChangeText={handleChange('country')}
        error={!!_country.error}
        errorText={_country.error}
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password}
        onChangeText={handleChange('password')}
        error={!!_password.error}
        errorText={_password.error}
        secureTextEntry
      />

      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        Sign Up
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Already have an account? </Text>
        <TouchableOpacity onPress={navigateToLogin}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
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
  modalContainer: {
    width: '100%',
  },
});

export default memo(RegisterScreen);
