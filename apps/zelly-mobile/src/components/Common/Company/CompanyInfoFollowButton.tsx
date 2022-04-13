import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useFollowCompany } from '@zelly/core/queries/useFollowCompany';
import { useUnfollowCompany } from '@zelly/core/queries/useUnfollowCompany';
import { useCompanyInfo } from '../../../providers/CompanyInfoProvider';

export const CompanyInfoFollowButton = () => {
  const { mutateFollow, isMutationLoading } = useFollowCompany();
  const { mutateUnfollow, isMutationUnfollowLoading } = useUnfollowCompany();

  const { currentCompany, favouriteCompaniesIds } = useCompanyInfo();

  const isFollowing = currentCompany.id in favouriteCompaniesIds;

  const buttonText = isFollowing ? 'Unfollow' : 'Follow';

  const onPress = async () => {
    if (isFollowing) {
      return await mutateUnfollow(currentCompany.id);
    }
    return await mutateFollow(currentCompany.id);
  };

  return (
    <Button
      style={styles.buttonContainer}
      loading={isMutationLoading || isMutationUnfollowLoading}
      icon={
        isFollowing
          ? 'checkbox-multiple-marked-circle-outline'
          : 'checkbox-multiple-blank-circle-outline'
      }
      mode="contained"
      onPress={onPress}>
      {buttonText}
    </Button>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 24,
  },
});
