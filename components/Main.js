import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { useRoute } from '../routes/routing';
import { refreshUser } from '../redux/auth/authSlice';
import { auth } from '../firebase/config';
import { onAuthStateChanged } from "firebase/auth";

export const Main = () => {
  const isLogged = useSelector(state => state.auth.isLogged);  
  const dispatch = useDispatch();

  const routing = useRoute(isLogged);
    
  useEffect(() => { 
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(refreshUser({ login: user.displayName, id: user.uid }));
      }
    });
  }, []);

  return (
      <NavigationContainer>
        {routing}
      </NavigationContainer>
  );
};