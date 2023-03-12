import React, { useState, useEffect } from "react";
import { Text, View, Pressable, ScrollView } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import styles from "../style/style";
import Header from "./Header";
import Footer from "./Footer";
import {
  NBR_OF_DICES,
  NBR_OF_THROWS,
  BONUS_POINTS,
  BONUS_POINTS_LIMIT,
  SCOREBOARD_KEY,
  MAX_SPOT,
} from "./Game";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from 'expo-font';

let board = [];
let totalPoints = 0;
let getBonus = false;

export default Gameboard = ({ route }) => {
  const [playerName, setPlayerName] = useState("");
  const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
  const [status, setStatus] = useState("Throw dices.");
  const [bonusStatus, setBonusStatus] = useState(
    "You are 63 points away from the bonus."
  );
  const [selectedDices, setSelectedDices] = useState(
    new Array(NBR_OF_DICES).fill(false)
  );
  const [selectedPoints, setSelectedPoints] = useState(
    new Array(6).fill(false)
  );
  const [selectedPointsTotal, setSelectedPointsTotal] = useState(
    new Array(6).fill(0)
  );
  const [gameOver, setGameOver] = useState(false);
  const [showDice, setShowDice] = useState(true);
  const [scores, setScores] = useState([]);

 

  const diceRow = [];
  for (let i = 0; i < NBR_OF_DICES; i++) {
    diceRow.push(
      <Pressable key={"diceRow" + i} onPress={() => selectDice(i)}>
        <MaterialCommunityIcons
          name={board[i]}
          key={"diceRow" + i}
          size={60}
          color={getDiceColor(i)}
        ></MaterialCommunityIcons>
      </Pressable>
    );
  }

  const buttonsRow = [];
  for (let i = 0; i < MAX_SPOT; i++) {
    buttonsRow.push(
      <Pressable key={"buttonsRow" + i} onPress={() => selectPoints(i)}>
        <Text style={styles.points}>{selectedPointsTotal[i]}</Text>
        <MaterialCommunityIcons
          name={"numeric-" + (i + 1) + "-circle"}
          key={"buttonsRow" + i}
          size={50}
          color={getPointsColor(i)}
        ></MaterialCommunityIcons>
      </Pressable>
    );
  }

  function throwDices() {
    if (nbrOfThrowsLeft === 0) {
      setStatus("Select your points before you throw again.");
    } else {
      let selectedValue = "";
      for (let i = 0; i < NBR_OF_DICES; i++) {
        if (!selectedDices[i]) {
          let randomNumber = Math.floor(Math.random() * 6 + 1);
          board[i] = "dice-" + randomNumber;
        } else {
          selectedValue = i;
        }
        selectDice(selectedValue, true);
        setNbrOfThrowsLeft(nbrOfThrowsLeft - 1);
        setStatus("Select and throw dices again.");
        setShowDice(false);
      }
    }
  }

  function selectDice(selected, chooseSameDices) {
    let dices = [...selectedDices];
    if (nbrOfThrowsLeft === 3) {
      setStatus("You have to throw dices first.");
    } else if (dices[selected] && !chooseSameDices) {
      setSelectedDices(new Array(NBR_OF_DICES).fill(false));
    } else {
      for (let i = 0; i < NBR_OF_DICES; i++) {
        dices[i] = board[i] === board[selected] ? true : false;
      }
      setSelectedDices(dices);
    }
  }

  function getDiceColor(i) {
    return selectedDices[i] ? "#83a3a2" : "#1a502b";
  }

  function getPointsColor(i) {
    return selectedPoints[i] ? "#83a3a2" : "#1a502b";
  }

  function selectPoints(selected) {
    if (nbrOfThrowsLeft === 0) {
      let points = [...selectedPoints];
      let pointsAmount = [...selectedPointsTotal];
      if (selectedPoints[selected] === false) {
        let sum = 0;
        for (let i = 0; i < NBR_OF_DICES; i++) {
          if (board[i] === "dice-" + (selected + 1)) {
            sum += selected + 1;
          }
        }
        points[selected] = true;
        pointsAmount[selected] = sum;
        totalPoints += sum;
        setNbrOfThrowsLeft(3);
        checkBonusPoints();
      } else if (gameOver) {
        return;
      } else {
        setStatus(
          "You have already selected points for " + (selected + 1) + "."
        );
      }
      setSelectedPoints(points);
      setSelectedPointsTotal(pointsAmount);
      setSelectedDices(new Array(NBR_OF_DICES).fill(false));
    } else {
      setStatus("Throw 3 times before setting points.");
    }
  }

  function checkBonusPoints() {
    if (totalPoints >= BONUS_POINTS_LIMIT) {
      getBonus = true;
      setBonusStatus("You got the bonus!");
    } else {
      setBonusStatus(
        "You are " +
          (BONUS_POINTS_LIMIT - totalPoints) +
          " away from the bonus."
      );
    }
  }

  useEffect(() => {
    if (playerName === "" && route.params?.player) {
      setPlayerName(route.params.player);
      getScoreboardData();
    }
  }, []);

  useEffect(() => {
    checkGameOver();
  }, [selectedPoints]);

  function checkGameOver() {
    if (selectedPoints.every((x) => x)) {
      setStatus("Game over. All points selected.");
      setSelectedDices(new Array(NBR_OF_DICES).fill(false));
      setNbrOfThrowsLeft(0);
      setGameOver(true); 
    }
  }

  function newGame() {
    totalPoints = 0;
    setNbrOfThrowsLeft(NBR_OF_THROWS);
    setStatus("Throw dices.");
    setBonusStatus("You are 63 points away from the bonus.");
    setSelectedPoints(new Array(6).fill(false));
    setSelectedPointsTotal(new Array(6).fill(0));
    setGameOver(false);
    board =[setShowDice(true)];
  }

  const getScoreboardData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY)
      if (jsonValue !== null) {
        let tmpScores = JSON.parse(jsonValue);
        setScores(tmpScores);
       
      }
    } catch (error) {
      console.log("Read error: " + error.message);
    }
  };

  const savePlayerPoints = async () => {
  const currentDate = new Date();
  const date = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();

    const playerPoints = {
      name: playerName,
      date: `${date}.${month}.${year}`,
      time: `${hours}:${minutes}`,
      points: getBonus ? totalPoints + BONUS_POINTS : totalPoints,
    };
    try {
      const newScore = [...scores, playerPoints];
      const jsonValue = JSON.stringify(newScore);
      await AsyncStorage.setItem(SCOREBOARD_KEY, jsonValue);
    } catch (error) {
      console.log("Save error: " + error.message);
    }
  };

  useEffect(() => {
    if (nbrOfThrowsLeft === 0){
      setStatus("Select your points.");
    }
    else if (nbrOfThrowsLeft < 0) {
      setNbrOfThrowsLeft(NBR_OF_THROWS-1);
    }
    else if (selectedPoints.every(x => x)) {
      savePlayerPoints();
    }

  }, [nbrOfThrowsLeft]);

  const [fontsLoaded] = useFonts({
    Poppins: require("../fonts/Poppins-MediumItalic.ttf"),
    PoppinsSemiBold: require("../fonts/Poppins-SemiBold.ttf"),
    PoppinsBold: require("../fonts/Poppins-BoldItalic.ttf")
});
 
if (!fontsLoaded) {
  return null;
}

  return (
    <ScrollView>
      <View style={styles.gameboard}>
        <Header />

        <View style={styles.flex}>
          {showDice && (
            <MaterialCommunityIcons
              name="dice-multiple"
              size={70}
              color="#1a502b"
            />
          )}
          {diceRow}
        </View>
        <Text style={styles.gameinfo2}>Throws left : {nbrOfThrowsLeft}</Text>
        <Text style={styles.gameinfo}>{status}</Text>
        {gameOver ? (
          <Pressable style={styles.buttonGame} onPress={() => newGame()}>
            <Text style={styles.buttonText}>Play again</Text>
          </Pressable>
        ) : (
          <Pressable style={styles.buttonGame} onPress={() => throwDices()}>
            <Text style={styles.buttonText}>Throw dices</Text>
          </Pressable>
        )}
        <Text style={styles.gameinfo2}>
          Total : {getBonus ? totalPoints + BONUS_POINTS : totalPoints}
        </Text>
        <Text style={styles.gameinfo}>{bonusStatus}</Text>
        <View style={styles.flex}>{buttonsRow}</View>
        <Text style={styles.player}>Player: {playerName}</Text>
        <Footer />
      </View>
    </ScrollView>
  );
};
