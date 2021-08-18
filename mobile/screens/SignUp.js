import React, { useState , useEffect} from 'react';
import { ScrollView, KeyboardAvoidingView, CheckBox, View, Text, Platform } from 'react-native';
import * as Location from 'expo-location';
import styles from './styles/authStyles';
import ScreenTitle from "../components/ScreenTitle";
import Input from '../components/Input';
import Button from '../components/Button';
import Loader from '../components/Loader';
import  Alert from '../components/Alert';
import axios from '../config/axios';
import { SIGNUP_URL } from '../config/urls';


function SignUpScreen(props) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        specialization: '',
        phone: '',
        address: '',
        workingHours: '',
        userType: false,
        location: null,
    });

    const [location, setLocation] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ messages: null, type: '' });

    /* useEffect(() => {
        const timer = setTimeout(() => {
            setAlert({messages: null})
        },3000)
        return () => clearTimeout(timer);
    }, [alert.messages]) */

    useEffect(() => {
        (async() => {
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();

    }, [])
    
    const validate = () => {
        const {
        name,
        email,
        password,
        userType,
        specialization,
        address,
        phone,
        workingHours,
        } = formData;

        let validationErrors = [];
        let passed = true;

        if (!name) {
            validationErrors.push('the name is required');
            passed = false;
        }
    
        if (!email) {
            validationErrors.push('the email is required');
            passed = false;
        }
    
        if (!password) {
            validationErrors.push('the password is required');
            passed = false;
        }
    
        if (userType) {
            if (!specialization) {
                validationErrors.push('the specialization is required');
                passed = false;
            }
        
            if (!address) {
                validationErrors.push('the address is required');
                passed = false;
            }
        
            if (!workingHours) {
                validationErrors.push('the working hours is required');
                passed = false;
            }
        
            if (!phone) {
                validationErrors.push('the phone number is required');
                passed = false;
            }
        }
    
        if (validationErrors.length > 0) {
            setAlert({ messages: validationErrors, type: 'danger' });
        }

        return passed;
    };

    const changeFormValue = (key, value) => {
        setFormData({ ...formData, [key]: value });
        setAlert({messages: null});
    };



    const _signUp = () => {
        (async () => {
            if (!validate()) return;
            setLoading(true);
            const {
                name,
                email,
                password,
                specialization,
                address,
                phone,
                workingHours,
                userType,
            } = formData;

            const body = {
                name,
                email,
                password,
                userType: userType ? 'doctor' : 'normal',
                specialization,
                address,
                phone,
                workingHours,
                location: {
                    latitude: location ? location.coords.latitude : null ,
                    longitude: location ? location.coords.longitude : null ,
                },
            };

            try {
                await axios.post(SIGNUP_URL, body);
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    specialization: '',
                    address: '',
                    phone: '',
                    workingHours: '',
                    location: null,
                    userType: false,
                });

                setLoading(false);

                props.navigation.navigate('SignIn');
            } catch (e) {
                console.log(e);
                setAlert({ messages: e.response.data.message, type: 'danger' });
            }
        })();
    };
    
    const {name, email, password, specialization, address, phone, workingHours, userType,} = formData;

    return (
        <ScrollView contentContainerStyle={{paddingVertical: 40}} >
            <Loader title='creating...' loading={isLoading} />
            <Alert messages={alert.messages} type={alert.type}/>
            <View style={styles.container}>
                <ScreenTitle title="create new account" icon="md-person-add" />
                <KeyboardAvoidingView behavior="padding" enabled>
                    <Input
                        onChangeText={(text) => changeFormValue('name', text)}
                        value={name}
                        placeholder="name"
                    />
                    <Input
                        onChangeText={(text) => changeFormValue('email', text)}
                        value={email}
                        placeholder=" email"
                    />
                    <Input
                        onChangeText={(text) => changeFormValue('password', text)}
                        value={password}
                        secureTextEntry
                        placeholder="password"
                    />

                    <View style={styles.checkBoxContainer}>
                        <CheckBox
                            style={styles.checkbox}
                            value={userType}
                            onChange={() => changeFormValue('userType', !formData.userType)}
                        />
                        <Text style={styles.checkboxLabel}>doctor</Text>
                    </View>
                    {userType && (
                        <React.Fragment>
                            <Input
                                onChangeText={(text) => changeFormValue('specialization', text)}
                                value={specialization}
                                placeholder="specialization"
                            />
                            <Input
                                onChangeText={(text) => changeFormValue('workingHours', text)}
                                value={workingHours}
                                placeholder="working hours "
                            />
                            <Input
                                onChangeText={(text) => changeFormValue('address', text)}
                                value={address}
                                placeholder="address"
                            />
                            <Input
                                onChangeText={(text) => changeFormValue('phone', text)}
                                value={phone}
                                placeholder="phone"
                            />
                        </React.Fragment>
                    )}

                    <Button text="sign up"  onPress={_signUp}/>
                </KeyboardAvoidingView>
            </View>
        </ScrollView>
    )
}

export default SignUpScreen;