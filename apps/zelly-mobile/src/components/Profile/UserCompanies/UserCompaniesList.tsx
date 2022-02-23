import React, { useCallback, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { List } from 'react-native-paper';
import { FullScreenSlidingModal } from '../../Common/Modal/FullScreenSlidingModal';

const userCompanies = [
  {
    name: 'Gazprom',
    handle: 'gazprom',
  },
  {
    name: 'СБЕР ЕАПТЕКА',
    handle: 'ЕА',
  },
  {
    name: 'Х5Group',
    handle: 'x5',
  },
  {
    name: 'Mercedes-Benz',
    handle: 'amgf1',
  },
];

export const UserCompaniesList = () => {
  const [modalVisible, setModalVisible] = useState(false);

  function openModal() {
    setModalVisible(true);
  }

  function closeModal() {
    setModalVisible(false);
  }

  const renderCompanyItem = useCallback(({ item: company }) => {
    return (
      <TouchableOpacity onPress={openModal}>
        <List.Item
          style={styles.cardContainer}
          title={company.name}
          description={`@${company.handle}`}
          titleStyle={styles.companyName}
        />
      </TouchableOpacity>
    );
  }, []);

  const keyExtractor = useCallback((item, index) => '' + item.name + index, []);

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={userCompanies}
          renderItem={renderCompanyItem}
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
  companyName: {
    fontWeight: '500',
  },
});
