import React from 'react';
import { View } from 'react-native';
import { SectionHeading } from '../../../components/Common/SectionHeading';
import { AllCompaniesList } from '../../../components/Profile/AllCompanies/AllCompaniesList';

export const UserAllCompaniesListScreen = () => {
  return (
    <View>
      <SectionHeading sectionTitle={'All companies'} />
      <AllCompaniesList />
    </View>
  );
};
