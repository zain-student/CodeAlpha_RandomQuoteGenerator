import { Feather } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import {
  Text,
  Alert,
  View,
  ToastAndroid,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  StyleSheet,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { StatusBar } from "expo-status-bar";
import axios from "axios";

import * as Clipboard from "expo-clipboard";
export default function Index() {
  const [quote, setQuote] = useState("Loading...");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getQuotes();
  }, []);

  const getQuotes = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("https://zenquotes.io/api/random");
      setQuote(response.data[0]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching quote:", error);
      setIsLoading(false);
    }
  };
  const copyToClipBoard = async () => {
    try {
      await Clipboard.setStringAsync(quote.q);
      ToastAndroid.show("Text Copied!", ToastAndroid.showWithGravity);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to copy to clipboard");
    }
  };
  const shareViaWhatsapp = () => {
    const url = "whatsapp://send?text=" + quote.q + "\n" + "Author:" + quote.a;
    Linking.openURL(url);
  };
  const shareViaFacebook = () => {
    const url = "facebook://send?text=" + quote.q + "\n" + "Author:" + quote.a;
    Linking.openURL(url);
  };
  const shareViaTwitter = () => {
    const url =
      "https://twitter.com/intent/tweet?text=" +
      quote.q +
      "\n" +
      "Author:" +
      quote.a;
    Linking.openURL(url);
  };
  return (
    <View style={styles.container}>
      <StatusBar bar-style="light-content" />
      <View style={styles.innerContainer}>
        <Text style={styles.heading}>Quote of the Day</Text>

        <FontAwesome5
          name="quote-left"
          size={15}
          color="black"
          style={{ marginBottom: -15 }}
        />
        <Text style={styles.quote}>{quote.q}</Text>

        <FontAwesome5
          name="quote-right"
          size={15}
          color="black"
          style={{ marginTop: -20, textAlign: "right" }}
        />
        <Text style={styles.authorName}>
          ---{isLoading ? "Loading..." : quote.a}
        </Text>
        <TouchableOpacity
          onPress={getQuotes}
          style={styles.button}
          // onPress={handlePress}
        >
          <Text style={{ color: "#000", fontSize: 20, fontWeight: "400" }}>
            {isLoading ? (
              <ActivityIndicator size={30} color={"white"} />
            ) : (
              "New Quote"
            )}
          </Text>
        </TouchableOpacity>
        <View style={styles.socialView}>
          <TouchableOpacity
            onPress={copyToClipBoard}
            style={styles.socialButton}>
            <FontAwesome5 name="copy" size={30} color="#5372F0" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={shareViaTwitter}
            style={styles.socialButton}>
            <FontAwesome name="twitter" size={30} color="#5372F0" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={shareViaWhatsapp}
            style={styles.socialButton}>
            <FontAwesome name="whatsapp" size={30} color="#5372F0" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={shareViaFacebook}
            style={styles.socialButton}>
            <FontAwesome name="facebook" size={30} color="#5372F0" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#14CC9B",
  },
  innerContainer: {
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: 20,
    padding: 20,
  },
  heading: {
    fontSize: 26,
    textAlign: "center",
    color: "#000",
    fontWeight: "600",
    marginBottom: 20,
  },
  quote: {
    textAlign: "center",
    letterSpacing: 1.1,
    color: "#000",
    fontSize: 16,
    lineHeight: 26,
    fontWeight: "400",
    marginBottom: 10,
    paddingHorizontal: 30,
  },
  authorName: {
    textAlign: "right",
    marginTop: 15,
    fontWeight: "300",
    fontSize: 16,
    fontStyle: "italic",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#14CC9B",
    // #5372F0
    width: "80%",
    height: 40,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  socialView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  socialButton: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: "#5372F0",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});
