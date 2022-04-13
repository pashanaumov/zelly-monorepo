import React, { createContext, FC, PropsWithChildren, useContext } from 'react';
import {
  CompanyId,
  CompanyProperties,
} from '@zelly/core/types/Companies/Company';

interface Props {
  favouriteCompaniesIds: FavouriteCompaniesIds;
  currentCompany: CompanyProperties | undefined;
}

type FavouriteCompaniesIds = {
  [key: CompanyId]: CompanyProperties['companyNameEnglish'];
};

interface CompanyInfoContextValue extends Props {}

export const CompanyInfoContext = createContext<CompanyInfoContextValue>(
  {} as CompanyInfoContextValue,
);

export const useCompanyInfo = () => useContext(CompanyInfoContext);

export const CompanyInfoProvider: FC<PropsWithChildren<Props>> = ({
  children,
  favouriteCompaniesIds,
  currentCompany,
}) => {
  return (
    <CompanyInfoContext.Provider
      value={{
        currentCompany,
        favouriteCompaniesIds,
      }}>
      {children}
    </CompanyInfoContext.Provider>
  );
};
