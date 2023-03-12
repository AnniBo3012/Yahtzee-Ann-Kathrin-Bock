import Home from "./components/Home";
import Gameboard from "./components/Gameboard";
import Scoreboard from "./components/Scoreboard";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();

const HOME = "Home"
const GAMEBOARD = "Gameboard";
const SCOREBOARD = "Scoreboard";

const icons = {
 [HOME]: "exclamationcircleo",
 [GAMEBOARD] : "dice",
 [SCOREBOARD]: "list-alt",
}

export default function App() {

  return (
    <NavigationContainer>
      <Tab.Navigator > 
        <Tab.Screen name="Home" component={Home} options={{ tabBarStyle: { display: "none" }, 
        tabBarIcon: () => <FontAwesome5 name="home" size={25} color = {"#1a502b"}/> }} />
        <Tab.Screen name={GAMEBOARD} component={Gameboard} 
        options={{tabBarIcon: () => <FontAwesome5 name = {icons[GAMEBOARD]} size ={25} color = {"#1a502b"}/>}} />
        <Tab.Screen name={SCOREBOARD} component={Scoreboard} 
        options={{tabBarIcon: () => <FontAwesome5 name = {icons[SCOREBOARD]} size ={25} color = {"#1a502b"}/>}} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

