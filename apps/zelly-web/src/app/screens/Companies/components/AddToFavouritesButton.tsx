import React, {FC} from 'react';
import {CompanyId} from '@zelly/core/types/Companies/Company';
import {BadgeCheckIcon} from '@heroicons/react/solid'

interface Props {
  isFavourite: boolean;
  companyId: CompanyId;
  onAddToFavourites: (companyId: CompanyId) => void;
  onRemoveFromFavorites: (companyId: CompanyId) => void;
}

export const AddToFavouritesButton: FC<Props> = ({
                                                   isFavourite,
                                                   onAddToFavourites,
                                                   companyId,
                                                   onRemoveFromFavorites
                                                 }) => {

  function addToFavourites() {
    onAddToFavourites(companyId);
  }

  function removeFromFavorites() {
    onRemoveFromFavorites(companyId);
  }

  if (isFavourite) {
    return <button
      onClick={removeFromFavorites}
      type="button"
      className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Following
      <BadgeCheckIcon className="ml-2 -mr-0.5 h-4 w-4" aria-hidden="true"/>
    </button>
  }

  return (
    <button
      onClick={addToFavourites}
      type="button"
      className="inline-flex items-center px-8 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Follow
    </button>

  )

}
