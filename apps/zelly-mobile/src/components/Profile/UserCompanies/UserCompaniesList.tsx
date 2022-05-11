import { useUserCompanies } from '@zelly/core/queries/useUserCompanies';
import { CompanyProperties } from '@zelly/core/types/Companies/Company';
import { CompanyInfoProvider } from 'apps/zelly-mobile/src/providers/CompanyInfoProvider';
import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { List } from 'react-native-paper';
import { CompanyInfoContainer } from '../../Common/Company/CompanyInfoContainer';
import { FullScreenSlidingModal } from '../../Common/Modal/FullScreenSlidingModal';

export const UserCompaniesList = () => {
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState<boolean>(false);
  const [currentCompany, setCurrentCompany] = useState<
    CompanyProperties | undefined
  >(undefined);

  const { data: userCompanies } = useUserCompanies();

  const favCompaniesIds = useMemo(() => {
    if (!userCompanies) {
      return {};
    }
    return userCompanies.reduce((prevValue, currentValue) => {
      return {
        ...prevValue,
        [currentValue.id]: currentValue.companyNameEnglish,
      };
    }, {});
  }, [userCompanies]);

  function closeCompanyModal() {
    setIsCompanyModalOpen(false);
    setCurrentCompany(undefined);
  }

  function openCompanyModal(company: CompanyProperties) {
    return () => {
      setCurrentCompany(company);
      setIsCompanyModalOpen(true);
    };
  }

  const renderCompanyItem = useCallback(({ item: company }) => {
    return (
      <TouchableOpacity onPress={openCompanyModal(company)}>
        <List.Item
          style={styles.cardContainer}
          title={company.companyNameEnglish}
          description={company.industry}
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
        isVisible={isCompanyModalOpen}
        onCloseModal={closeCompanyModal}>
        <CompanyInfoProvider
          currentCompany={currentCompany}
          favouriteCompaniesIds={favCompaniesIds}>
          <CompanyInfoContainer />
        </CompanyInfoProvider>
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
