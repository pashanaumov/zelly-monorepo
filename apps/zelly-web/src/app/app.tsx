// eslint-disable-next-line @typescript-eslint/no-unused-vars
import '../styles.scss';
import { AppLayout } from './AppLayout';
import { withAuth } from './components/hoc/withAuth';
import { MainAppRouter } from './screens/Main/MainAppRoutes';

export function App() {
  return (
    <div className="container">
      <AppLayout>
        <MainAppRouter />
      </AppLayout>
    </div>
  );
}

export default withAuth(App);
