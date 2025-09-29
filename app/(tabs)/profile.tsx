import { useState, useCallback, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';






export default function ProfileScreen() {
  // Om vi ser inputfeltet eller visningsteksten
  const [isEditing, setIsEditing] = useState(false);

  // Kontrollerer input feltene
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [bio, setBio] = useState("");
  const [picture, setPicture] = useState("");



  //Nøklene for AsyncStorage 
  const keys = {
    name: "profile:name",
    gender: "profile:gender",
    bio: "profile:bio",
    picture: "profile:picture",
  };

  // Laste lagrede dataer når filen kjører
  // Henter verdier fra AsyncStorage og setter dem i state
  useEffect(() => {
    (async () => {
        try{
            const savedName = await AsyncStorage.getItem(keys.name);
            const savedGender = await AsyncStorage.getItem(keys.gender);
            const savedBio = await AsyncStorage.getItem(keys.bio);
            const savedPicture = await AsyncStorage.getItem(keys.picture);


            if (savedName) setName(savedName);
            if (savedGender) setGender(savedGender);
            if (savedBio) setBio(savedBio);
            if (savedPicture) setPicture(savedPicture);

        } catch(err) {
          console.log("Feil ved opplastning av profil:", err);
        }
  })();
}, [keys.name, keys.gender, keys.bio, keys.picture]);


  // lagre hver gang en verdi endres  
useEffect(() => {
  AsyncStorage.setItem(keys.name, name);
}, [name, keys.name]);

useEffect(() => {
  AsyncStorage.setItem(keys.gender, gender);
}, [gender, keys.gender]);

useEffect(() => {
  AsyncStorage.setItem(keys.bio, bio);
}, [bio, keys.bio]);

useEffect(() => {
  AsyncStorage.setItem(keys.picture, picture);
}, [picture, keys.picture]);


// Slår av/på redigeringsfeltet

  const toggleEdit = useCallback(() => {
    setIsEditing((prev) => !prev);
  }, []);

  return (
    <View style={styles.mainContainer}>
      {isEditing ? (
        <>
          {picture ? (
            <Image source={{ uri: picture }} style={styles.image} resizeMode="cover" />
          ) : (
            <Text style={styles.textCenter}>Ingen profilbilde</Text>
          )}

          <View style={styles.contentContainer}>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Skriv inn navnet ditt"
            />
            <TextInput
              style={styles.input}
              value={gender}
              onChangeText={setGender}
              placeholder="Hvilket kjønn er du?"
            />
            <TextInput
              style={[styles.input, { height: 90 }]}
              value={bio}
              onChangeText={setBio}
              placeholder="Skriv en kort intro om deg selv!"
              multiline
            />
            <TextInput
              style={styles.input}
              value={picture}
              onChangeText={setPicture}
              placeholder="Velg bildet ditt (URL)"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <View style={styles.buttonRow}>
              <Button title="Lagre" onPress={toggleEdit} />
              <View style ={{width: 20}}/>
              <Button title="Cancel" color="red" onPress={() => setIsEditing(false)}/>
          </View>
        </View>
        </>
      ) : (
        <>
          {picture ? (
            <Image source={{ uri: picture }} style={styles.image} resizeMode="cover" />
          ) : (
            <Text style={styles.textCenter}>Ingen profilbilde</Text>
          )}

          <View style={styles.contentContainer}>
            <View style={styles.row}>
              <Text style={styles.label}>Navn:</Text>
              <Text style={styles.value}>{name}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Kjønn:</Text>
              <Text style={styles.value}>{gender}</Text>
            </View>

            <View style={[styles.row, { alignItems: "flex-start" }]}>
              <Text style={styles.label}>Bio:</Text>
              <Text style={[styles.value, styles.valueMultiline]}>
                {bio}
              </Text>
            </View>

            <View style={styles.buttonRow}>
              <Button title="Rediger" onPress={toggleEdit} />
            </View>
          </View>
        </>
      )}
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

  contentContainer: {
    width: "90%",             
    maxWidth: 420,
    alignSelf: "stretch",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 6,
  },

  label: {
    fontWeight: "700",
    fontSize: 16,
    minWidth: 70,           
    textAlign: "left",
  },

  value: {
    fontSize: 16,
    flexShrink: 1,               
  },

  valueMultiline: {
    lineHeight: 22,
  },

  textCenter: {
    fontSize: 16,
    marginBottom: 12,
    textAlign: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 14,
    borderRadius: 8,
    width: "100%",
  },

  image: {
    width: 150,
    height: 150,
    borderRadius: 30,
    marginBottom: 60,
    backgroundColor: "#eee",


  },

  buttonRow: {
    marginTop: 20,
    alignSelf: "center", 
  },
});