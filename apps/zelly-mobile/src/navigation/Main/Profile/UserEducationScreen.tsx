import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';

export const UserEducationScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>UserEducationScreen</Text>
      </TouchableOpacity>
    </View>
  );
};
