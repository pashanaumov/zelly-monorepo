import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Subheading, Text } from 'react-native-paper';
import { WorkingDate } from '@zelly/core/types/Utility/DateTime';
import {
  UserCarbonFootprintAmount,
  UserCarbonFootprintCalculationType,
} from '@zelly/core/types/FootprintCalculations/FootprintCaclulations';
import { SubscriptText } from '../Common/Text/SubScriptText';
import { useNavigation } from '@react-navigation/core';

type Calculation = {
  date: WorkingDate<string>;
  calculationType: UserCarbonFootprintCalculationType;
  footprintAmount: UserCarbonFootprintAmount;
};

const lastCalculations: Array<Calculation> = [
  {
    date: new Date().toISOString().substring(0, 10),
    calculationType: 'weekly',
    footprintAmount: 1,
  },
  {
    date: new Date().toISOString().substring(0, 10),
    calculationType: 'monthly',
    footprintAmount: 4,
  },
  {
    date: new Date().toISOString().substring(0, 10),
    calculationType: 'yearly',
    footprintAmount: 108,
  },
];

export const ProfileScreenLastCalculations = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Subheading style={styles.subheading}>
        Last footprint calculations
      </Subheading>
      <>
        {lastCalculations.map((calc, index) => {
          return (
            <Card.Title
              key={'' + calc.date + index}
              style={styles.cardContainer}
              leftStyle={styles.leftPartContainer}
              title={calc.date}
              subtitle={calc.calculationType}
              left={() => (
                <Text style={styles.footprintText}>
                  {calc.footprintAmount}{' '}
                  <SubscriptText subscriptFontSize={10}>kg</SubscriptText>
                </Text>
              )}
            />
          );
        })}
      </>
      <Button
        style={styles.showAllButton}
        mode="text"
        // @ts-ignore
        onPress={() => navigation.navigate('UserCarbonFootprint')}>
        Show all
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardContainer: {
    borderBottomWidth: 0.33,
    borderColor: 'rgb(203, 207, 214)',
    marginBottom: 4,
  },
  subheading: {
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 8,
    fontWeight: '600',
  },
  footprintText: {
    fontSize: 24,
    fontWeight: '600',
  },
  leftPartContainer: {
    marginRight: 24,
    minWidth: '20%',
  },
  showAllButton: {
    marginTop: 8,
    borderRadius: 10,
  },
  showAllText: {
    fontWeight: '600',
    fontSize: 16,
  },
});
