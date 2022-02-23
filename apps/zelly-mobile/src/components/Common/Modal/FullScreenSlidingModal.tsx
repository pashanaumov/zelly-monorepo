import React, { FC, ReactNode } from 'react';
import { Modal, StyleSheet, View } from 'react-native';

interface Props {
  isVisible: boolean;
  children: ReactNode;
  onCloseModal: () => void;
}

export const FullScreenSlidingModal: FC<Props> = ({
  isVisible,
  onCloseModal,
  children,
}) => {
  if (!isVisible) {
    return <></>;
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        presentationStyle={'pageSheet'}
        animationType="slide"
        visible={isVisible}
        onRequestClose={onCloseModal}>
        {children}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
});
