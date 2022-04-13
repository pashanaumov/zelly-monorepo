import React, { FC } from 'react';
import { Avatar, Caption, Card, Title } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { CompanyInfoFollowButton } from './CompanyInfoFollowButton';
import { useCompanyInfo } from '../../../providers/CompanyInfoProvider';
import { CompanyInfoBody } from './CompanyInfoBody';

const CompanyAvatar = ({ name }: { name: string }) => {
  const parsedAvatar = `${name[0]}${name[name.length - 1]}`.toUpperCase();
  return <Avatar.Text label={parsedAvatar} size={81} />;
};

export const CompanyInfoContainer: FC = () => {
  const { currentCompany } = useCompanyInfo();

  if (!currentCompany) {
    return <></>;
  }

  return (
    <View>
      <Card style={styles.cardContainer}>
        <View style={styles.cardHeader}>
          <View style={styles.avatarContainer}>
            <CompanyAvatar name={currentCompany.companyNameEnglish} />
          </View>
          <View style={styles.nameContainer}>
            <Title style={styles.titleContainer}>
              {currentCompany.companyNameEnglish}
            </Title>
            <Caption style={styles.captionContainer}>
              @{currentCompany.companyNameEnglish.replace(/\s/g, '')}
            </Caption>
          </View>
        </View>
        <CompanyInfoFollowButton />
      </Card>
      <CompanyInfoBody />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 18,
  },
  cardHeader: {
    flexDirection: 'row',
  },
  avatarContainer: {
    flex: 0.3,
  },
  nameContainer: {
    flex: 0.7,
  },
  titleContainer: {
    fontSize: 24,
  },
  captionContainer: {
    fontSize: 14,
  },
});
