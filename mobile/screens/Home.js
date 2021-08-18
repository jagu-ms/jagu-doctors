import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../components/Button';

function HomeScreen(props) {

    const { navigation } = props;
    const [token, setToken] = useState('');

    const _checkToken = async () => {
        const token = await AsyncStorage.getItem('accessToken');
        setToken(token);
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            _checkToken();
        });
    
        return unsubscribe;
    }, [navigation]);
    
    return (
        <React.Fragment>
            <ImageBackground
                source={require('../assets/doc-pg.png')}
                style={styles.background}
            >
                <View style={styles.container}>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>Welcome to my doctor</Text>
                        <Text style={styles.text}>
                            The first app that connects the doctor with the patient.
                        </Text>
                    </View>
                    {token ? (
                        <React.Fragment>
                            <Button
                                text="Doctors list"
                                onPress={() => navigation.navigate('Doctors')}
                            />
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Profile')}
                            >
                                <Text style={styles.labelButton}>Profile</Text>
                            </TouchableOpacity>
                        </React.Fragment>
                        ) : (
                        <React.Fragment>
                            <Button
                                text="Log in"
                                onPress={() => navigation.navigate('SignIn')}
                            />
                            <TouchableOpacity
                                onPress={() => navigation.navigate('SignUp')}
                            >
                                <Text style={styles.labelButton}>Sign up</Text>
                            </TouchableOpacity>
                        </React.Fragment>
                    )}
                </View>
            </ImageBackground>
        </React.Fragment>
    );
}
    
const textStyles = {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'OpenFont',
};
    
const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
    },
    container: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        marginBottom: 30,
    },
    title: {
        ...textStyles,
        fontSize: 35,
    },
    text: {
        ...textStyles,
        fontSize: 20,
    },
    labelButton: {
        marginTop: 10,
        fontSize: 16,
        textAlign: 'center',
        color: '#fff',
    },
});
    
export default HomeScreen;