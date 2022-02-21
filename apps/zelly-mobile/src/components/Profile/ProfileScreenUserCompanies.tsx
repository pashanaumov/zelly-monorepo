import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, List, Subheading } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';

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

export const ProfileScreenUserCompanies = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Subheading style={styles.subheading}>
        Компании за которыми Вы следите
      </Subheading>
      <>
        {userCompanies.map((company, index) => {
          return (
            <List.Item
              style={styles.cardContainer}
              key={'' + company.name + index}
              title={company.name}
              description={`@${company.handle}`}
              titleStyle={styles.companyName}
            />
          );
        })}
      </>
      <Button
        style={styles.showAllButton}
        mode="text"
        onPress={() => navigation.navigate('UserCompanies')}>
        Показать все
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
  showAllButton: {
    marginTop: 8,
    borderRadius: 10,
  },
  companyName: {
    fontWeight: '500',
  },
});
