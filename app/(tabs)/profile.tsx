import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { StyleSheet } from "react-native";

export default function ProfileScreen() {
    return(
        <ThemedView style={styles.container}>
            <ThemedText>Profile Screen</ThemedText>
             <ThemedText>Navn : Navn Navnesen</ThemedText>
             </ThemedView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent:"center",
    },
})