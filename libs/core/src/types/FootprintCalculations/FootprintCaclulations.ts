import { CompanyId } from '../Companies/Company';

export type UserCarbonFootprintCalculationType = 'yearly' | 'monthly' | 'weekly';

export type UserCarbonFootprintAmount = number;

export interface CompanyYearlyCalculationData {
  year: string;
  CO2ScopeOne: string;
  CO2ScopeTwo: string;
  CO2ScopeThree: string;
  Methane: string;
  CO2USD: string;
}

export interface CompanyQuarterlyCalculationData {
  quarter: string;
  esg: string;
}

export interface CompanyAddYearlyDataPayload {
  companyId: CompanyId;
  yearlyCalculationData: CompanyYearlyCalculationData;
  quarterlyCalculationData: CompanyQuarterlyCalculationData;
}

export interface CompanyQuarterlyDataPayload {
  yearlyCalculationId: string;
  quarterlyCalculationData: {
    esg: string;
    quarter: string;
  };
}
