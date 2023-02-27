/* eslint-disable @typescript-eslint/no-unused-vars */
import { ExtendedTheme } from "@react-navigation/native";
import { StyleSheet } from "react-native";

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  return StyleSheet.create({
    container: {
      display: "flex",
      justifyContent: "center",
      flex: 1,
      alignContent: "center",
      alignItems: "center",
      backgroundColor: "white",
    },

    MainTitle: {
      fontSize: 28,
      fontWeight: "800",
      marginTop: 20,
      color: "black",
    },
    discription: {
      fontSize: 12,
      marginTop: 3,
      textAlign: "center",
    },
    formContainer: {
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
    },
    form: {
      flexDirection: "row",
      width: 300,
      justifyContent: "space-between",
      alignContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: "gray",
      borderRadius: 10,
      paddingHorizontal: 5,
      margin: 10,
    },
    btnstyle: {
      flexDirection: "row",
      borderRadius: 60,
      padding: 10,
      width: "60%",
      backgroundColor: "darkblue",
      alignContent: "center",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 20,
      elevation: 10,
    },
    btntext: {
      fontSize: 18,
      fontWeight: "500",
      color: "white",
      textAlign: "center",
    },
  });
};
