import 'react-native-gesture-handler';
import * as React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import PaperProviderWithNavigation from './components/PaperProviderWithNavigation';
import { TopBar } from './components/TopBar';
import LoginScreen from './authScreens/login/LoginScreen';
import SignupScreen from './authScreens/signup/SignupScreen';
import EmailLoginScreen from './authScreens/emailLogin/EmailLoginScreen';
import {
  initApp,
  initGlobalErrorHandler,
  initStores,
} from './application/initialization/initialization.service';
import { isAppInitialized } from './application/initialization/initialization.accessors';
import { getUIStore } from './application/stores/uiStore';
import { getApiCacher } from './application/stores/apiCacher';
import { isAuthenticated } from './application/authentication/authentication.accessors';
import HomeScreen from './screens/home/HomeScreen';
import EmailSignupScreen from './authScreens/emailSignup/EmailSignupScreen';
import VerifyEmailScreen from './authScreens/verifyEmail/VerifyEmailScreen';

initGlobalErrorHandler();
initStores();

function Home({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button mode="contained" onPress={() => navigation.navigate('Help')}>
        Go to Help
      </Button>
      <Button mode="contained" onPress={() => navigation.navigate('Profile')}>
        {' '}
        Go to profile
      </Button>
    </View>
  );
}

function Help({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Help Screen</Text>
      <Button mode="contained" onPress={() => navigation.navigate('Home')}>
        Go to Home
      </Button>
      <Button mode="contained" onPress={() => navigation.navigate('Invite')}>
        Invite
      </Button>
    </View>
  );
}

function EmptyScreen() {
  return <View />;
}

const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    if (!isAppInitialized()) {
      console.log('Not initialized');
      return null;
    }

    const isLoggedIn = isAuthenticated();

    return (
      <PaperProviderWithNavigation>
        <Stack.Navigator
          screenOptions={{
            header: (props) => <TopBar {...props} />,
          }}
        >
          {isLoggedIn ? (
            // Screens for logged in users
            <Stack.Group>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Profile" component={EmptyScreen} />
            </Stack.Group>
          ) : (
            // Auth screens
            <Stack.Group screenOptions={{}}>
              <Stack.Screen
                name="LogIn"
                component={LoginScreen}
                options={{ title: 'Log in' }}
              />
              <Stack.Screen
                name="SignUp"
                component={SignupScreen}
                options={{ title: 'Create Account' }}
              />
              <Stack.Screen
                name="EmailLogin"
                component={EmailLoginScreen}
                options={{ title: 'Log in' }}
              />
              <Stack.Screen
                name="EmailSignup"
                component={EmailSignupScreen}
                options={{ title: 'Create Account' }}
              />
              <Stack.Screen
                name="VerifyEmail"
                component={VerifyEmailScreen}
                options={{ title: 'Verify Email' }}
              />
            </Stack.Group>
          )}
          {/* Common modal screens */}
          <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen
              name="Help"
              component={Help}
              options={{
                title: 'Help',
                cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
              }}
            />
            <Stack.Screen name="Invite" component={EmptyScreen} />
          </Stack.Group>
        </Stack.Navigator>
      </PaperProviderWithNavigation>
    );
  }

  listenToStores() {
    const rerender = () => {
      this.forceUpdate();
    };
    getUIStore().addChangeListener(rerender);
    getApiCacher().addChangeListener(rerender);
  }

  componentDidMount() {
    initApp();
    this.listenToStores();
  }
}
