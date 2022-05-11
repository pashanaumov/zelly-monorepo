import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, List, Subheading } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import { useUserCompanies } from '@zelly/core/queries/useUserCompanies';
import { LoadingPlaceholder } from '@zelly/core/components/LoadingPlaceholder.native';

export const ProfileScreenUserCompanies = () => {
  const navigation = useNavigation();

  const { data, isLoading } = useUserCompanies();

  const userCompanies = useMemo(() => {
    if (!data) {
      return [];
    }
    return data.slice(0, 3);
  }, [data]);

  const mainContent = useMemo(() => {
    if (isLoading) {
      return (
        <View style={styles.loaderContainer}>
          <LoadingPlaceholder />
          <LoadingPlaceholder />
          <LoadingPlaceholder />
        </View>
      );
    }
    return (
      <>
        {userCompanies.map((company) => {
          return (
            <List.Item
              style={styles.cardContainer}
              key={company.id}
              title={company.companyNameEnglish}
              description={`@${company.companyNameEnglish.replace(/s/g, '')}`}
              titleStyle={styles.companyName}
            />
          );
        })}
      </>
    );
  }, [isLoading, userCompanies]);

  return (
    <View style={styles.container}>
      <Subheading style={styles.subheading}>Companies you follow</Subheading>
      {mainContent}
      <Button
        style={styles.showAllButton}
        mode="text"
        // @ts-ignore
        onPress={() => navigation.navigate('UserCompanies')}>
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
  showAllButton: {
    marginTop: 8,
    borderRadius: 10,
  },
  companyName: {
    fontWeight: '500',
  },
  loaderContainer: {
    width: '100%',
    minHeight: 200,
    padding: 16,
  },
});
