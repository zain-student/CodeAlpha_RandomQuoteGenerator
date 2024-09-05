import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import index from "./index";

const Stack = createStackNavigator();
export default function RootLayout() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="index"
          component={index}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
