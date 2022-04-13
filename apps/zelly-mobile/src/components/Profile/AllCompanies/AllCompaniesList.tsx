import { CompanyProperties } from '@zelly/core/types/Companies/Company';
import React, { useMemo, useState } from 'react';
import { DataTable, Text } from 'react-native-paper';
import { SubscriptText } from '../../Common/Text/SubScriptText';
import { useFetchCompanies } from '@zelly/core/queries/useFetchCompanies';
import { useUserCompanies } from '@zelly/core/queries/useUserCompanies';
import { LoadingPlaceholder } from '@zelly/core/components/LoadingPlaceholder.native';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { FullScreenSlidingModal } from '../../Common/Modal/FullScreenSlidingModal';
import { CompanyInfoContainer } from '../../Common/Company/CompanyInfoContainer';
import { CompanyInfoProvider } from '../../../providers/CompanyInfoProvider';

export const AllCompaniesList = () => {
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState<boolean>(false);
  const [currentCompany, setCurrentCompany] = useState<
    CompanyProperties | undefined
  >(undefined);

  const { data: favouriteCompanies } = useUserCompanies();
  const { isLoading, data } = useFetchCompanies();

  const favCompaniesIds = useMemo(() => {
    if (!favouriteCompanies) {
      return {};
    }
    return favouriteCompanies.reduce((prevValue, currentValue) => {
      return {
        ...prevValue,
        [currentValue.id]: currentValue.companyNameEnglish,
      };
    }, {});
  }, [favouriteCompanies]);

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

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <LoadingPlaceholder />
        <LoadingPlaceholder />
      </View>
    );
  }

  return (
    <>
      <DataTable style={styles.dataContainer}>
        <DataTable.Header>
          <DataTable.Title>Company name</DataTable.Title>
          <DataTable.Title numeric>Industry</DataTable.Title>
          <DataTable.Title numeric>Country</DataTable.Title>
          <DataTable.Title numeric>
            CO
            <SubscriptText subscriptFontSize={8}>
              <Text>2</Text>
            </SubscriptText>{' '}
          </DataTable.Title>
        </DataTable.Header>

        {data &&
          data.map((company) => {
            return (
              <TouchableOpacity
                key={company.id}
                onPress={openCompanyModal(company)}>
                <DataTable.Row>
                  <DataTable.Cell>{company.companyNameEnglish}</DataTable.Cell>
                  <DataTable.Cell numeric>{company.industry}</DataTable.Cell>
                  <DataTable.Cell numeric>
                    {company.companyCountry}
                  </DataTable.Cell>
                  <DataTable.Cell numeric>
                    {company.lastCO2Number}
                  </DataTable.Cell>
                </DataTable.Row>
              </TouchableOpacity>
            );
          })}
      </DataTable>
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
  dataContainer: {
    marginTop: 16,
    borderRadius: 8,
    height: '100%',
    backgroundColor: 'white',
  },
  loaderContainer: {
    width: '100%',
    height: '100%',
    padding: 16,
  },
});
