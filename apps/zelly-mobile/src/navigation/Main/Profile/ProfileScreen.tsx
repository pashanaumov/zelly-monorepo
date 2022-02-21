import React, { FC } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ProfileScreenInfoSection } from '../../../components/Profile/ProfileScreenInfoSection';
import { ProfileScreenInfoColumns } from '../../../components/Profile/ProfileScreenInfoColumns';
import { ProfileScreenLastCalculations } from '../../../components/Profile/ProfileScreenLastCalculations';
import { ProfileScreenUserCompanies } from '../../../components/Profile/ProfileScreenUserCompanies';
import { ProfileScreenActions } from '../../../components/Profile/ProfileScreenActions';

export const ProfileScreen: FC = () => {
  return (
    <ScrollView style={styles.container}>
      <ProfileScreenInfoSection />
      <ProfileScreenInfoColumns />
      <ProfileScreenActions />
      <ProfileScreenLastCalculations />
      <ProfileScreenUserCompanies />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    borderRadius: 10,
    height: '100%',
  },
});
