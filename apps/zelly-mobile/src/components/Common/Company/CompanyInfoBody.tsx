import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Paragraph, Subheading } from 'react-native-paper';
import { useCompanyInfo } from '../../../providers/CompanyInfoProvider';

type InfoRowProps = {
  sectionTitle: string;
  sectionText: string;
};

const mockCompanyBio =
  'Enim feugiat ut ipsum, neque ut. Tristique mi id elementum praesent. Gravida in tempus feugiat netus enim aliquet a, quam scelerisque. Dictumst in convallis nec in bibendum aenean arcu.';

export const CompanyInfoBody = () => {
  const { currentCompany } = useCompanyInfo();

  const InfoRow = ({ sectionText, sectionTitle }: InfoRowProps) => {
    return (
      <View style={styles.itemWrapper}>
        <View style={styles.titleContainer}>
          <Subheading>{sectionTitle}</Subheading>
        </View>
        <View style={styles.infoContentContainer}>
          <Paragraph>{sectionText}</Paragraph>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.dataContainer}>
      <InfoRow sectionTitle={'Bio'} sectionText={mockCompanyBio} />
      <InfoRow
        sectionTitle={'Location'}
        sectionText={currentCompany.companyCountry}
      />
      <InfoRow
        sectionTitle={'Industry'}
        sectionText={currentCompany.industry}
      />
      <InfoRow
        sectionTitle={'LastCO2'}
        sectionText={currentCompany.lastCO2Number}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dataContainer: {
    marginTop: 24,
    padding: 18,
    backgroundColor: 'white',
  },
  itemWrapper: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    marginBottom: 24,
    borderBottomColor: '#c0c0c0',
  },
  titleContainer: {
    flex: 0.4,
  },
  infoContentContainer: {
    flex: 0.6,
    marginBottom: 4,
  },
});
