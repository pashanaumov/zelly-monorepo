import React from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';

const infoButtons = ['Fact 1', 'Fact 2', 'Fact 3'];

export const ProfileScreenInfoColumns = () => {
  return (
    <View style={styles.container}>
      {infoButtons.map((info, index) => {
        return (
          <View style={styles.innerContainer} key={info + index + ''}>
            <Text style={styles.infoText}>{info}</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    minHeight: 60,
    backgroundColor: 'rgb(249, 250, 251)',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom: 16,
    paddingTop: 8,
    marginTop: -8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 0.84,
    elevation: 5,
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoText: {
    fontWeight: Platform.OS === 'android' ? 'bold' : '600',
  },
});
