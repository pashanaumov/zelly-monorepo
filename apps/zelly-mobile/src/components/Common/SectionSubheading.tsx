import React, { FC, ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

interface Props {
  children: ReactNode;
  extraStyles?: ViewStyle;
}

export const SectionSubheading: FC<Props> = ({ extraStyles, children }) => {
  return <View style={[styles.container, extraStyles]}>{children}</View>;
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
});
