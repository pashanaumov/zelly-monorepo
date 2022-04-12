export type CompanyId = string;

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
  companyNameEnglish: string;
  companyCountry: string;
  industry: string;
  lastCO2Number: string;
  companyNameCyrillic?: string;
  directCompetitors?: CompanyProperties[];
  climaticDataParameters?: Partial<ClimaticDataParameters>;
  companyBrandList?: string[];
  quasiESGOwn?: string;
}

export type CompanyPropertiesResponse = CompanyProperties;
