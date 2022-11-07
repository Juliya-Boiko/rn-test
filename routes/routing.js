import { Authorization } from '../components/Authorization/Authorization';
import { Navigation } from '../components/Navigation/Navigation';

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return <Authorization />;
  }

  return <Navigation />;
};

