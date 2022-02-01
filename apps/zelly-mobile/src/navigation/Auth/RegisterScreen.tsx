import React, { memo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { Picker } from '@react-native-picker/picker';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import Background from '../../components/Common/Background';
import Logo from '../../components/Common/Logo';
import Header from '../../components/Common/Header';
import Button from '../../components/Common/Button/Button';
import TextInput from '../../components/Common/TextInput';
import { theme } from '../../ui/theme';
import { Navigation } from '../../Types';
import {
  countryValidator,
  emailValidator,
  passwordValidator,
} from '../../ui/utils';
import { UserLanguage } from '@zelly/core/types/Utility/User';
import { AppDispatch } from '@zelly/core/redux/storeNative';
import {
  RegisterUserPayload,
  runRegisterUser,
} from '@zelly/core/redux/sagas/registerSaga';

type Props = {
  navigation: Navigation;
};

const RegisterScreen = ({ navigation }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const [language, setLanguage] = useState<UserLanguage | ''>('');
  const [_email, setEmail] = useState({ error: '' });
  const [_password, setPassword] = useState({ error: '' });
  const [_country, setCountry] = useState({ error: '' });

  const [showModal, setShowModal] = useState<boolean>(false);

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
      if (language) {
        onRegister({ ..._values, language });
      }
    },
  });

  function toggleModal() {
    setShowModal((prev) => !prev);
  }

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

      <TouchableOpacity
        onPress={toggleModal}
        style={{
          width: '100%',
        }}>
        <View pointerEvents={'none'}>
          <TextInput
            value={language}
            label="Language"
            returnKeyType="done"
            error={!!_country.error}
            errorText={_country.error}
          />
        </View>
      </TouchableOpacity>

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

      {showModal && (
        <Modal isVisible={showModal}>
          <View style={styles.modalContainer}>
            <View>
              <Picker selectedValue={language} onValueChange={setLanguage}>
                <Picker.Item label="English" value="ENG" />
                <Picker.Item label="Русский" value="RU" />
              </Picker>

              <Button
                mode="contained"
                onPress={toggleModal}
                style={styles.button}>
                Close
              </Button>
            </View>
          </View>
        </Modal>
      )}
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
