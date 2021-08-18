import React, { useState , useEffect} from 'react';
import { ScrollView, KeyboardAvoidingView, CheckBox, View, Text, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../config/axios';
import { SIGNIN_URL } from '../config/urls';
import ScreenTitle from "../components/ScreenTitle";
import Input from '../components/Input';
import Button from '../components/Button';
import Loader from '../components/Loader';
import Alert from '../components/Alert';
import Container from '../components/Container';
import styles from './styles/authStyles';

function SignInScreen (props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ messages: null, type: '' });

    /* useEffect(() => {
        const timer = setTimeout(() => {
            setAlert({messages: null})
        },3000)
        return () => clearTimeout(timer);
    }, [alert.messages]) */

    const changeEmailHandler = (value) => {
        setEmail(value);
        setAlert({messages: null});
    };
    
    const changePasswordHandler = (value) => {
        setPassword(value);
        setAlert({messages: null});
    };

    const validate = () => {
        let validationErrors = [];
        let passed = true;
    
        if (!email) {
            validationErrors.push('email is required');
            passed = false;
        }
    
        if (!password) {
            validationErrors.push('password is required');
            passed = false;
        }
    
        if (validationErrors.length > 0) {
            setAlert({ messages: validationErrors, type: 'danger' });
        }
        return passed;
    };

    const _signIn = () => {
        (async () => {
            if (!validate()) return;
    
            setLoading(true);
    
            try {
                const response = await axios.post(SIGNIN_URL, { email, password });
                setLoading(false);
                setEmail('');
                setPassword('');
                AsyncStorage.setItem('accessToken', response.data.accessToken);
                props.navigation.navigate('Home');
            } catch (e) {
                setLoading(false);
                setAlert({ messages: e.response.data.message, type: 'danger' });
            }
        })();
    };

    return (
        <Container>
            <Alert messages={alert.messages} type={alert.type} />
            <Loader title="Log in" loading={isLoading} />
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.container}
            >
                <ScreenTitle title="Log in" icon="md-log-in" />
                <KeyboardAvoidingView behavior="padding" enabled>
                    <Input
                        onChangeText={changeEmailHandler}
                        value={email}
                        placeholder="email"
                    />
                    <Input
                        onChangeText={changePasswordHandler}
                        value={password}
                        secureTextEntry
                        placeholder="password"
                    />
                </KeyboardAvoidingView>

                <Button text="Log in" onPress={_signIn} />
            </ScrollView>
        </Container>
    );
}

export default SignInScreen;