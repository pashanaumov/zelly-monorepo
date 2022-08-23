export type CompanyId = string;
export type CompanyName = string;

export interface ClimaticDataParameters {
  CO2ScopeOne: string;
  CO2ScopeTwo: string;
  CO2ScopeThree: string;
  AggregateCO2: string;
  Methane: string;
  CO2USD: string;
  CO2Kg: string;
  NetZeroTarget: string;
  QuasiESG: string;
  LastYearlyCO2Footprint: string;
  LastQuasiESGYear: string;
  LastQuasiESGMonth: string;
  ClimateAgendaWebLink: string;
}

export interface CompanyProperties {
  id: CompanyId;
  companyNameEnglish: CompanyName;
  companyCountry: string;
  industry: string;
  lastCO2Number: string;
  companyNameCyrillic?: CompanyName;
  directCompetitors?: CompanyProperties[];
  climaticDataParameters?: Partial<ClimaticDataParameters>;
  companyBrandList?: string[];
  quasiESGOwn?: string;
}

export type CompanyPropertiesResponse = CompanyProperties;

export type CompanyQuarterlyCalculationPartial = {
  year: string;
  companyName: string;
  esg: string;
  id: CompanyId;
  quarter: string;
};

export interface AllCompanyCalculations {
  Methane: string;
  CO2ScopeThree: string;
  CO2USD: string;
  year: string;
  companyName: CompanyName;
  CO2ScopeOne: string;
  id: CompanyId;
  CO2ScopeTwo: string;
  calculations: Array<CompanyQuarterlyCalculationPartial>;
}

export type AllCompanyCalculationsResponse = AllCompanyCalculations[];
