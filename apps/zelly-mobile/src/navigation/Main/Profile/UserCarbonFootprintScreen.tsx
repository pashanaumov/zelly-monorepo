import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { SectionHeading } from '../../../components/Common/SectionHeading';
import { SectionSubheading } from '../../../components/Common/SectionSubheading';
import { Navigation } from '../../../Types';
import { FootprintCalculationsList } from '../../../components/Profile/CarbonFootprint/FootprintCalculationsList';

interface Props {
  navigation: Navigation;
}

export const UserCarbonFootprintScreen: FC<Props> = ({ navigation }) => {
  function goToCalculator() {
    navigation.navigate('Calculator');
  }

  return (
    <View style={styles.overallContainer}>
      <View style={styles.upperContainer}>
        <SectionHeading sectionTitle={'CarbonFootprint'} />
        <SectionSubheading>
          <View style={styles.subheadingInnerContainer}>
            <Button mode="contained" onPress={goToCalculator}>
              Новый расчет
            </Button>
          </View>
        </SectionSubheading>
      </View>
      <FootprintCalculationsList />
    </View>
  );
};

const styles = StyleSheet.create({
  overallContainer: {
    flex: 1,
  },
  upperContainer: {
    flex: 0.66,
  },
  subheadingInnerContainer: {
    padding: 8,
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});
