import { Outlet } from 'react-router-dom';

export function Dashboard() {
  return (
    <div className="min-h-full">
      <Outlet />
    </div>
  );
}
