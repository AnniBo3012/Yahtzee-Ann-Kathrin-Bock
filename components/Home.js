import React, { useState } from "react";
import {
  Keyboard,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import styles from "../style/style";
import Header from "./Header";
import Footer from "./Footer";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  NBR_OF_THROWS,
  NBR_OF_DICES,
  MAX_SPOT,
  MIN_SPOT,
  BONUS_POINTS,
  BONUS_POINTS_LIMIT
} from "./Game";
import { useFonts } from 'expo-font';

export default Home = ({ navigation }) => {
  const [playerName, setPlayerName] = useState("");
  const [hasPlayerName, setHasPlayerName] = useState(false);

  const [fontsLoaded] = useFonts({
    Poppins: require("../fonts/Poppins-MediumItalic.ttf"),
    PoppinsSemiBold: require("../fonts/Poppins-SemiBold.ttf"),
    PoppinsBold: require("../fonts/Poppins-BoldItalic.ttf")
});
 
if (!fontsLoaded) {
  return null;
}


  const handlePlayerName = (value) => {
    if (value.trim().length > 0) {
      setHasPlayerName(true);
      Keyboard.dismiss();
    }
  };

  return (
    <ScrollView>
      <Header />
      {!hasPlayerName ? (
        <>
          <Icon
            name="user-circle-o"
            size={40}
            color="#1a502b"
            style={styles.Icon}
          />
          <Text style={styles.text}>Please enter your name</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={setPlayerName}
            autoFocus={true}
          ></TextInput>
          <Pressable
            style={styles.button}
            onPress={() => handlePlayerName(playerName)}
          >
            <Text style={styles.buttonText}>OK</Text>
          </Pressable>
        </>
      ) : (
        <>
          <Icon
            name="info-circle"
            size={40}
            color="#1a502b"
            style={styles.Icon}
          />
          <Text style={styles.Heading}>Rules of the game</Text>
          <Text style={styles.rules}>
            THE GAME: Upper section of the classic Yahtzee dice game. You have
            {NBR_OF_DICES} dices and for the every dice you have {NBR_OF_THROWS} throws. After each throw you can keep dices in order to get same
            dice spot counts as many as possible. In the end of the turn you
            must select your points from {MIN_SPOT} to {MAX_SPOT}. Game ends
            when all points have been selected. The order for selecting those is
            free.
          </Text>
          <Text style={styles.rules}>
            POINTS: After each turn game calculates the sum for the dices you
            selected. Only the dices having the same spot count are calculated.
            Inside the game you can not select same points from {MIN_SPOT} to {MAX_SPOT} again.
          </Text>
          <Text style={styles.rules}>
            GOAL: To get points as much as possible. {BONUS_POINTS_LIMIT} points
            is the limit of getting bonus which gives you {BONUS_POINTS} points
            more.
          </Text>
          <Text style={styles.Heading}>Good luck, {playerName}</Text>
          <Pressable
            style={styles.button}
            onPress={() =>
              navigation.navigate("Gameboard", { player: playerName })
            }
          >
            <Text style={styles.buttonText}>PLAY</Text>
          </Pressable>
        </>
      )}
      <Footer />
    </ScrollView>
  );
};
