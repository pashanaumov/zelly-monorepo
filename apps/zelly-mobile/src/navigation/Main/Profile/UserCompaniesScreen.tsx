import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SectionHeading } from '../../../components/Common/SectionHeading';
import { SectionSubheading } from '../../../components/Common/SectionSubheading';
import { Button } from 'react-native-paper';
import { FullScreenSlidingModal } from '../../../components/Common/Modal/FullScreenSlidingModal';
import { UserCompaniesList } from '../../../components/Profile/UserCompanies/UserCompaniesList';

export const UserCompaniesScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  function openModal() {
    setModalVisible(true);
  }

  function closeModal() {
    setModalVisible(false);
  }

  return (
    <>
      <View style={styles.overallContainer}>
        <View style={styles.upperContainer}>
          <SectionHeading sectionTitle={'Your Companies'} />
          <SectionSubheading>
            <View style={styles.subheadingInnerContainer}>
              <Button mode="contained" onPress={openModal}>
                Добавить компанию
              </Button>
            </View>
          </SectionSubheading>
        </View>
        <UserCompaniesList />
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
  subheadingInnerContainer: {
    padding: 8,
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  overallContainer: {
    flex: 1,
  },
  upperContainer: {
    flex: 0.66,
  },
});
