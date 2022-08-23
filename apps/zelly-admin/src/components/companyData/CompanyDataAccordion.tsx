import { CAccordion, CAccordionBody, CAccordionHeader, CAccordionItem } from '@coreui/react';
import { CompanyQuarterlyCalculationPartial } from '@zelly/core/types/Companies/Company';
import { FC, useMemo } from 'react';

interface Props {
  calculations: CompanyQuarterlyCalculationPartial[] | null;
}

export const CompanyDataAccordion: FC<Props> = ({ calculations }) => {
  const filteredCalculation = useMemo(() => {
    if (calculations) {
      return calculations
        .map((calculation) => ({
          companyName: calculation.companyName,
          esg: calculation.esg,
          quarter: calculation.quarter,
          year: calculation.year,
        }))
        .sort((a, b) => parseInt(a.quarter) - parseInt(b.quarter));
    }
    return null;
  }, [calculations]);

  if (!filteredCalculation) {
    return <></>;
  }

  return (
    <div>
      <div className="py-4">
        <h3>Quarters</h3>
      </div>
      <CAccordion>
        {filteredCalculation.map((calculation, index) => {
          return (
            <CAccordionItem itemKey={1} key={index}>
              <CAccordionHeader>{`Quarter ${calculation.quarter}`}</CAccordionHeader>
              <CAccordionBody>
                {Object.keys(calculation).map((key) => {
                  if (key === 'quarter') return null;
                  return (
                    <div key={key} className="py-3 flex justify-between text-sm font-medium">
                      <dt className="text-gray-500">{key}</dt>
                      <dd className="text-gray-900">{calculation[key as keyof typeof calculation]}</dd>
                    </div>
                  );
                })}
              </CAccordionBody>
            </CAccordionItem>
          );
        })}
      </CAccordion>
    </div>
  );
};
