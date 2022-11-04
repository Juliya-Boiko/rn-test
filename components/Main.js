import { NavigationContainer } from '@react-navigation/native';
import { useRoute } from '../routes/routing';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { refreshUser } from '../redux/auth/authSlice';
import { auth } from '../firebase/config';
import { onAuthStateChanged } from "firebase/auth";

export const Main = () => {
  console.log('MAIN');
  const isLogged = useSelector(state => state.auth.isLogged);  
  const dispatch = useDispatch();

  const routing = useRoute(isLogged);
    
  useEffect(() => { 
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(refreshUser({ login: user.displayName, id: user.uid }));
        //console.log('MAIN useEffect ---->', user);
      }
    });
  }, []);

  return (
      <NavigationContainer>
        {routing}
      </NavigationContainer>
  );
};