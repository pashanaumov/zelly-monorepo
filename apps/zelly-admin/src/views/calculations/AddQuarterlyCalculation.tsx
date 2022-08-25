// @TODO: re-route to yearly if company doesnt have yearly calculations
// @TODO: create separately scrollable containers

import { CompanyProperties } from '@zelly/core/types/Companies/Company';
import { useCallback, useState } from 'react';
import { CompaniesListDropdownList } from '../../components/shared/CompaniesListDropdownList';
import { CompanyCalculationsDropdownList } from '../../components/shared/CompanyCalculationsDropdownList';

export const AddQuarterlyCalculation = () => {
  const [selectedCompany, setSelectedCompany] = useState<CompanyProperties | null>(null);
  const _setSelectedCompany = useCallback((selectedCompany: CompanyProperties) => {
    setSelectedCompany(selectedCompany);
  }, []);

  return (
    <div>
      <CompaniesListDropdownList onSetSelectedCompany={_setSelectedCompany} />
      <CompanyCalculationsDropdownList companyId={(selectedCompany && selectedCompany.id) || null} />
    </div>
  );
};
