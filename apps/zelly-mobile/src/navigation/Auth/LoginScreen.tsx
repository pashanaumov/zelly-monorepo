import React, { memo, useState } from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { AppDispatch } from '@zelly/core/redux/storeNative';
import { runFetchData } from '@zelly/core/redux/sagas/authSaga';
import { UserEmail, UserPassword } from '@zelly/core/types/Utility/User';
import { AuthStackNavigation } from '../AppNavigator';
import Background from '../../components/Common/Background';
import Logo from '../../components/Common/Logo';
import Header from '../../components/Common/Header';
import Button from '../../components/Common/Button/Button';
import TextInput from '../../components/Common/TextInput';
import { theme } from '../../ui/theme';
import { emailValidator, passwordValidator } from '../../ui/utils';

type Props = AuthStackNavigation<'Login'>;

const LoginScreen = ({ navigation }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const [_email, setEmail] = useState({ error: '' });
  const [_password, setPassword] = useState({ error: '' });

  const [isSecureInput, setIsSecureInput] = useState<boolean>(true);

  function toggleSecureInput() {
    setIsSecureInput((isSecure) => !isSecure);
  }

  const _onLoginPressed = (
    email: string,
    password: string,
    successCb: () => void,
  ) => {
    const emailError = emailValidator(email);
    const passwordError = passwordValidator(password);

    if (emailError || passwordError) {
      setEmail({
        error: emailError,
      });
      setPassword({ error: passwordError });
      return;
    }
    successCb();
  };

  async function onLogin({
    email,
    password,
  }: {
    email: UserEmail;
    password: UserPassword;
  }) {
    _onLoginPressed(email, password, () =>
      dispatch(runFetchData({ email, password })),
    );
  }

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (_values) => {
      Keyboard.dismiss();
      await onLogin({ ..._values });
    },
  });

  const { email, password } = values;

  const isButtonDisabled = !email || !password;

  return (
    <Background>
      <Logo />
      <Header>Welcome back.</Header>
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email}
        error={!!_email.error}
        errorText={_email.error}
        onChangeText={handleChange('email')}
        autoCapitalize="none"
        textContentType="emailAddress"
        keyboardType="email-address"
        autoCorrect={false}
      />

      <TextInput
        error={!!_password.error}
        errorText={_password.error}
        label="Password"
        returnKeyType="done"
        value={password}
        secureTextEntry={isSecureInput}
        onChangeText={handleChange('password')}
        withPasswordEye={true}
        secureInputAction={toggleSecureInput}
      />

      <View style={styles.forgotPassword}>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.label}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>

      <Button
        disabled={isButtonDisabled}
        mode="contained"
        onPress={handleSubmit}>
        Login
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default memo(LoginScreen);
