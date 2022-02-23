import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { SectionSubheading } from '../Common/SectionSubheading';

const infoButtons = ['Fact 1', 'Fact 2', 'Fact 3'];

export const ProfileScreenInfoColumns = () => {
  return (
    <SectionSubheading>
      {infoButtons.map((info, index) => {
        return (
          <View style={styles.innerContainer} key={info + index + ''}>
            <Text style={styles.infoText}>{info}</Text>
          </View>
        );
      })}
    </SectionSubheading>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoText: {
    fontWeight: Platform.OS === 'android' ? 'bold' : '600',
  },
});
