import { useEffect, useState } from "react";
import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import * as SplashScreen from "expo-splash-screen";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import Colors from "./constants/colors";
import GameOverScreen from "./screens/GameOver";

SplashScreen.preventAutoHideAsync();

export default function App() {
    const [pickedNumber, setPickedNumber] = useState(null);
    const [gameIsOver, setGameIsOver] = useState(true);
    const [guessRounds, setGuessRounds] = useState(0);

    const [fontsLoaded] = useFonts({
        "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
        "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    });

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hide();
        }
    }, [fontsLoaded]);

    const handlePickNumber = (number) => {
        setPickedNumber(number);
        setGameIsOver(false);
    };

    const handleGameOver = (numOfRounds) => {
        setGameIsOver(true);
        setGuessRounds(numOfRounds);
    };

    const handleStartNewGame = () => {
        setPickedNumber(null);
        setGameIsOver(true);
        setGuessRounds(0);
    };

    let screen = <StartGameScreen onPickNumber={handlePickNumber} />;

    if (pickedNumber) {
        screen = (
            <GameScreen
                pickedNumber={pickedNumber}
                onGameOver={handleGameOver}
            />
        );
    }

    if (gameIsOver && pickedNumber) {
        screen = (
            <GameOverScreen
                pickedNumber={pickedNumber}
                roundsNumber={guessRounds}
                onStartNewGame={handleStartNewGame}
            />
        );
    }

    return (
        <LinearGradient
            colors={[Colors.primary700, Colors.accent500]}
            style={styles.rootScreen}
        >
            <ImageBackground
                source={require("./assets/images/background.png")}
                resizeMode="cover"
                style={styles.rootScreen}
                imageStyle={styles.backgroundImage}
            >
                <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
            </ImageBackground>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    rootScreen: {
        flex: 1,
    },
    backgroundImage: {
        opacity: 0.15,
    },
});
