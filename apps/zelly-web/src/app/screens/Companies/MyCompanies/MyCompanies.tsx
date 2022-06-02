import { CompaniesList } from '../CompaniesList';

export function MyCompanies() {
  return (
    <div className="min-h-full">
      <CompaniesList isMyCompanies={true} />
    </div>
  );
}
