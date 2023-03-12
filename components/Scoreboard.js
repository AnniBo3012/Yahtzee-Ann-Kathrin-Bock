import React, { useEffect, useState } from "react";
import {Text, View, TouchableOpacity, Button, Pressable } from "react-native";
import Header from "./Header";
import Footer from "./Footer";
import styles from "../style/style";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SCOREBOARD_KEY } from "./Game";
import { DataTable } from "react-native-paper";


export default Scoreboard = ({ navigation }) => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getScoreboardData();
    });
  });

  const getScoreboardData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY);
      if (jsonValue !== null) {
        let tmpScores = JSON.parse(jsonValue);
        tmpScores.sort((a, b) => b.points - a.points);
        setScores(tmpScores);
      }
    } catch (error) {
      console.log("Read error: " + error.message);
    }
  };

  const clearScoreboard = async () => {
    try {
      await AsyncStorage.removeItem(SCOREBOARD_KEY);
      setScores([]);
    } catch (error) {
      console.log("Clear error: " + error.message);
    }
  };

  return (
    <View>
      <Header />
      <Icon name="trophy" size={60} color="#1a502b" style={styles.Icon} />
      <Text style={styles.scoreboard}>Top Five</Text>

      <DataTable>
        <DataTable.Header style={styles.scoreboardHeader}>
          <DataTable.Title textStyle={{fontFamily: "Poppins"}}>Player</DataTable.Title>
          <DataTable.Title textStyle={{fontFamily: "Poppins"}}>Date</DataTable.Title>
          <DataTable.Title textStyle={{fontFamily: "Poppins"}}>Time</DataTable.Title>
          <DataTable.Title style={{ justifyContent: "flex-end" }} textStyle={{fontFamily: "Poppins"}}>Score</DataTable.Title>
        </DataTable.Header>

        {scores.slice(0, 5).map((player, i) => (
          <DataTable.Row key={i + 1}>
            <DataTable.Cell textStyle={styles.scoreboardPlayer}>{player.name}</DataTable.Cell>
            <DataTable.Cell>{player.date}</DataTable.Cell> 
            <DataTable.Cell>{player.time}</DataTable.Cell>
            <DataTable.Cell textStyle={styles.scoreboardScore} style={{ justifyContent: "flex-end" }}>{player.points}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
      <Pressable
            style={styles.buttonScoreboard}
            onPress={clearScoreboard}
          >
            <Text style= {styles.buttonTextScoreboard}>Clear Scoreboard</Text>
          </Pressable>
     
    
      <Footer />
    </View>
  );
};
