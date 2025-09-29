import { StyleSheet, Text, View } from "react-native";


export default function TabTwoScreen() {
  return (
    <View style={styles.mainContainer}>
  <Text>Heihei</Text>
  </View>
  );
}

const styles = StyleSheet.create({
   mainContainer: {
    flex: 1,
    alignItems: "center",        
    justifyContent: "flex-start",
    padding: 20,
    paddingTop: 150,
    backgroundColor: "#fff",

  },
});
