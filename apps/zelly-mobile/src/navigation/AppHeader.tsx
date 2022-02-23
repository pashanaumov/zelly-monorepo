import React from 'react';
import { Appbar } from 'react-native-paper';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Props {
  back?: boolean;
  navigation: NativeStackNavigationProp<ParamListBase>;
}

export function AppHeader({ back, navigation }: Props) {
  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
    </Appbar.Header>
  );
}
