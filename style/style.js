import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#7cac8b",
    flexDirection: "row",
  },
  footer: {
    marginTop: 15,
    backgroundColor: "#7cac8b",
    flexDirection: "row",
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    flex: 1,
    fontSize: 25,
    textAlign: "center",
    margin: 10,
  },
  author: {
    color: "#fff",
    fontWeight: "bold",
    flex: 1,
    fontSize: 15,
    textAlign: "center",
    margin: 10,
  },
  gameboard: {
    backgroundColor: "#fdfdfd",
    alignItems: "center",
    justifyContent: "center",
  },
  gameinfo: {
    backgroundColor: "#83a3a2",
    alignSelf: "stretch",
    textAlign: "center",
    padding: 3,
    justifyContent: "center",
    fontSize: 15,
    fontFamily: "Poppins",
  },
  gameinfo2: {
    backgroundColor: "#83a3a2",
    alignSelf: "stretch",
    textAlign: "center",
    padding: 3,
    justifyContent: "center",
    fontSize: 20,
    fontFamily: "PoppinsBold",
  },
  flex: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 7,
    marginTop: 7,
    padding: 5,
  },
  buttonGame: {
    margin: 20,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#1a502b",
    width: 170,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  button: {
    margin: 15,
    flexDirection: "row",
    padding: 12,
    backgroundColor: "#1a502b",
    width: 170,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 20,
    fontFamily: "PoppinsSemiBold",
  },

  buttonScoreboard: {
    margin: 15,
    flexDirection: "row",
    padding: 12,
    backgroundColor: "#1a502b",
    width: 200,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },

  buttonTextScoreboard: {
    color: "#ffffff",
    fontSize: 15,
    fontFamily: "PoppinsSemiBold",
  },

  textInput: {
    margin: 30,
    padding: 10,
    backgroundColor: "#83a3a2",
    width: 300,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 25,
    textAlign: "center",
  },

  points: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    textAlign: "center",
  },
  dicepoints: {
    flexDirection: "row",
    width: 280,
    alignContent: "center",
    alignSelf: "center",
  },
  player: {
    alignSelf: "center",
    fontSize: 15,
    fontFamily: "PoppinsBold",
  },

  text: {
    alignSelf: "center",
    fontSize: 20,
    marginTop: 10,
    fontFamily: "Poppins",
  },

  Heading: {
    alignSelf: "center",
    fontSize: 20,
    marginTop: 10,
    fontFamily: "PoppinsBold",
  },

  rules: {
    alignSelf: "center",
    fontSize: 14,
    padding: 12,
    textAlign: "center",
  },

  Icon: {
    marginTop: 15,
    alignSelf: "center",
  },

  scoreboard: {
    alignSelf: "center",
    fontSize: 30,
    marginTop: 10,
    fontFamily: "PoppinsSemiBold",
  },

  scoreboardScore: {
    fontSize: 20,
    fontFamily: "PoppinsSemiBold",
    color: "#a40000",
  },

  scoreboardPlayer: {
    fontSize: 15,
    fontFamily: "PoppinsSemiBold",
    color: "#1a502b",
  },

  scoreboardHeader: {
   marginTop: 10,
  },
});
