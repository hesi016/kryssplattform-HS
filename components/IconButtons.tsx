import { Pressable } from "react-native";
import { IconSymbol } from "./ui/icon-symbol";

export default function IconButton() {
    return(
        <Pressable onPress={() => console.log("Redigere profilen")}>
            <IconSymbol size={32} name="square.and.pencil" color="black"/>
        </Pressable>
    )
}