import React, { useCallback, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Card } from 'react-native-paper';
import { WorkingDate } from '@zelly/core/types/Utility/DateTime';
import {
  UserCarbonFootprintAmount,
  UserCarbonFootprintCalculationType,
} from '@zelly/core/types/FootprintCalculations/FootprintCaclulations';
import { SubscriptText } from '../../Common/Text/SubScriptText';
import { FullScreenSlidingModal } from '../../Common/Modal/FullScreenSlidingModal';

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

export const FootprintCalculationsList = () => {
  const [modalVisible, setModalVisible] = useState(false);

  function openModal() {
    setModalVisible(true);
  }

  function closeModal() {
    setModalVisible(false);
  }

  const renderCalculation = useCallback(({ item: calc }) => {
    return (
      <TouchableOpacity onPress={openModal}>
        <Card.Title
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
      </TouchableOpacity>
    );
  }, []);

  const keyExtractor = useCallback((item, index) => '' + item.date + index, []);

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={lastCalculations}
          renderItem={renderCalculation}
          keyExtractor={keyExtractor}
        />
      </View>
      <FullScreenSlidingModal
        isVisible={modalVisible}
        onCloseModal={closeModal}>
        <></>
      </FullScreenSlidingModal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
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
  footprintText: {
    fontSize: 24,
    fontWeight: '600',
  },
  leftPartContainer: {
    marginRight: 24,
    minWidth: '20%',
  },
});
