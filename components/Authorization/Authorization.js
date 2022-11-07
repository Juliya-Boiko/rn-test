import { AuthStack } from "../../routes/navigators";
import { LoginScreen } from "../../screens/auth/LoginScreen";
import { RegistrationScreen } from "../../screens/auth/RegistrationScreen";

export const Authorization = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen options={{header: () => null}} name='Login' component={LoginScreen} />
      <AuthStack.Screen options={{header: () => null}} name='Registration' component={RegistrationScreen} />
    </AuthStack.Navigator>
  );
};