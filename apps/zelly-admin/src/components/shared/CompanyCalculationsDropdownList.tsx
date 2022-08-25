import { useGetAllCalculationsForCompany } from '@zelly/core/queries/admin/getAllCalculationsForCompany';
import { AllCompanyCalculationsResponse, CompanyId } from '@zelly/core/types/Companies/Company';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { CompanyCalculationsDropdownListItem } from './CompanyCalculationsDropdownListItem';

interface Props {
  companyId: CompanyId | null;
}

export const CompanyCalculationsDropdownList: FC<Props> = ({ companyId }) => {
  const { getAllCalculations, isLoading } = useGetAllCalculationsForCompany();

  const [companyCalculations, setCompanyCalculations] = useState<AllCompanyCalculationsResponse | null>(null);

  const fetchAndAssignCalculations = useCallback(() => {
    if (companyId) {
      getAllCalculations(companyId).then((calculations) => {
        if (calculations.length > 0) {
          return setCompanyCalculations(calculations);
        }
        return setCompanyCalculations([]);
      });
    }
  }, [companyId, getAllCalculations]);

  useEffect(() => {
    fetchAndAssignCalculations();
  }, [fetchAndAssignCalculations]);

  if (isLoading) {
    return (
      <div className="mt-8">
        <p>Loading...</p>
      </div>
    );
  }

  if (!companyCalculations || !companyId) {
    return <></>;
  }

  if (!companyCalculations.length) {
    return <div className="mt-8">No calculations found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-2 mt-4 bg-white">
      {companyCalculations.map((calculation) => (
        <div className="mx-auto px-4 py-2" key={calculation.id}>
          <h3>{calculation.year}</h3>
          <CompanyCalculationsDropdownListItem calculation={calculation} companyId={companyId} />
        </div>
      ))}
    </div>
  );
};
