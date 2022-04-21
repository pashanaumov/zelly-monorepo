import { useFollowCompany } from '@zelly/core/queries/useFollowCompany';
import { useUnfollowCompany } from '@zelly/core/queries/useUnfollowCompany';
import { CompanyId } from '@zelly/core/types/Companies/Company';
import React, { FC } from 'react';

interface Props {
  isLoading: boolean;
  isFavourite: boolean;
  companyId: CompanyId;
  onAddToFavourites: (companyId: CompanyId) => void;
  onRemoveFromFavorites: (companyId: CompanyId) => void;
}

export const AddToFavouritesButton: FC<Props> = ({
  isFavourite,
  onAddToFavourites,
  companyId,
  onRemoveFromFavorites,
}) => {
  function addToFavourites() {
    onAddToFavourites(companyId);
  }

  function removeFromFavorites() {
    onRemoveFromFavorites(companyId);
  }

  const { mutateFollow, isMutationLoading } = useFollowCompany();
  const { mutateUnfollow, isMutationUnfollowLoading } = useUnfollowCompany();

  const isLoading = isMutationLoading || isMutationUnfollowLoading;

  const buttonText = isFavourite ? 'Unfollow' : 'Follow';

  const buttonClassName = `inline-flex items-center px-${
    isFavourite ? 6 : 8
  } py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`;

  const onProcessFollowing = async () => {
    if (isFavourite) {
      return await mutateUnfollow(companyId);
    }
    return await mutateFollow(companyId);
  };

  return (
    <button
      onClick={onProcessFollowing}
      type="button"
      className={buttonClassName}>
      {isLoading ? 'Loading' : buttonText}
    </button>
  );
};
