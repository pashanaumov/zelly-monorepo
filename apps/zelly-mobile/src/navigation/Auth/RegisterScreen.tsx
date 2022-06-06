import {
  RegisterUserPayload,
  runRegisterUser,
} from '@zelly/core/redux/sagas/registerSaga';
import { AppDispatch } from '@zelly/core/redux/storeNative';
import { useFormik } from 'formik';
import React, { memo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { useDispatch } from 'react-redux';
import Background from '../../components/Common/Background';
import Button from '../../components/Common/Button/Button';
import Header from '../../components/Common/Header';
import Logo from '../../components/Common/Logo';
import TextInput from '../../components/Common/TextInput';
import { countryList } from '@zelly/core/data/countriesList';
import { Navigation } from '../../Types';
import { theme } from '../../ui/theme';
import { emailValidator, passwordValidator } from '../../ui/utils';

type Props = {
  navigation: Navigation;
};

const ageRanges = [
  '12-17',
  '18-24',
  '25-34',
  '35-44',
  '45-54',
  '55-64',
  '65-74',
  '75+',
];

const RegisterScreen = ({ navigation }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const [_email, setEmail] = useState({ error: '' });
  const [_password, setPassword] = useState({ error: '' });
  const [country, setCountry] = useState('');
  const [ageRange, setAgeRange] = useState('');

  const _onSignUpPressed = (
    email: string,
    password: string,
    successCb: () => void,
  ) => {
    const emailError = emailValidator(email);
    const passwordError = passwordValidator(password);

    if (emailError || passwordError) {
      setEmail({ error: emailError });
      setPassword({ error: passwordError });
      return;
    }
    successCb();
  };

  function onRegister(data: Omit<RegisterUserPayload, 'type'>) {
    _onSignUpPressed(data.email, data.password, () =>
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
    },
    onSubmit: (_values) => {
      onRegister({ ..._values, ageRange, country });
    },
  });

  const { email, password } = values;

  const isButtonDisabled = !email || !password || !ageRange || !country;

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
        label="Password"
        returnKeyType="done"
        value={password}
        onChangeText={handleChange('password')}
        error={!!_password.error}
        errorText={_password.error}
        secureTextEntry
        style={styles.bottomTextInput}
      />

      <SelectDropdown
        data={countryList}
        onSelect={(selectedItem) => {
          setCountry(selectedItem);
        }}
        buttonTextAfterSelection={(selectedItem) => {
          return selectedItem;
        }}
        rowTextForSelection={(item) => {
          return item;
        }}
        defaultButtonText={'Country'}
        buttonStyle={styles.buttonContainer}
        buttonTextStyle={styles.buttonTextColor}
      />

      <SelectDropdown
        data={ageRanges}
        onSelect={(selectedItem) => {
          setAgeRange(selectedItem);
        }}
        buttonTextAfterSelection={(selectedItem) => {
          return selectedItem;
        }}
        rowTextForSelection={(item) => {
          return item;
        }}
        defaultButtonText={'Age range'}
        buttonStyle={styles.buttonContainer}
        buttonTextStyle={styles.buttonTextColor}
      />

      <Button
        disabled={isButtonDisabled}
        mode="contained"
        onPress={handleSubmit}
        style={styles.button}>
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
  buttonContainer: {
    borderWidth: 1,
    width: '100%',
    marginBottom: 12,
    borderRadius: 4,
    backgroundColor: 'white',
  },
  buttonTextColor: {
    color: '#414757',
  },
  bottomTextInput: {
    marginTop: -16,
    marginBottom: 16,
  },
});

export default memo(RegisterScreen);
