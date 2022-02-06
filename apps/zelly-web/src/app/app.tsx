// eslint-disable-next-line @typescript-eslint/no-unused-vars
import '../styles.scss';
import { withAuth } from './components/hoc/withAuth';
import { MainAppRouter } from './screens/Main/MainAppRoutes';

export function App() {
  return (
    <div className="container">
      <MainAppRouter />
    </div>
  );
}

export default withAuth(App);
