/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useMemo, useState } from "react";
import { useColorScheme } from "react-native";
import Icon from "react-native-dynamic-vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { isReadyRef, navigationRef } from "react-navigation-helpers";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
/**
 * ? Local & Shared Imports
 */
import { SCREENS } from "@shared-constants";
import { LightTheme, DarkTheme, palette } from "@theme/themes";
// ? Screens
import HomeScreen from "@screens/home/HomeScreen";
import SearchScreen from "@screens/search/SearchScreen";
import DetailScreen from "@screens/detail/DetailScreen";
import ProfileScreen from "@screens/profile/ProfileScreen";
import NotificationScreen from "@screens/notification/NotificationScreen";
import LoginComponent from "modules/auth/components/LoginComponent/LoginComponent";
import SignupComponent from "modules/auth/components/SignUpComponent/SignupComponent";
import { AuthContext } from "context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HttpService } from "modules/shared/services";
import ForgotPasswordComponent from "modules/auth/components/ForgotPasswordComponent/ForgotPasswordComponent";
import ResetPasswordComponent from "modules/auth/components/ResetPasswordComponent/ResetPasswordComponent";

// ? If you want to use stack or tab or both
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Navigation = () => {
  const httpService = useMemo(() => new HttpService(), []);
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const scheme = useColorScheme();
  const isDarkMode = scheme === "dark";

  const authContext = useMemo(() => {
    return {
      signIn: (values) => {
        const { email, password } = values;
        httpService
          .post(
            "auth/login",
            { email, password },
            { "Content-Type": "application/json" },
          )
          .then((res: any) => {
            console.log(res);
            const { data } = res;
            AsyncStorage.setItem("token", JSON.stringify(data));
            setUserToken(data?.token);
          })
          .catch((err) => {
            console.log("err", err);
          });
      },
      signOut: () => {
        setIsLoading(true);
        setUserToken(null);
        AsyncStorage.removeItem("token");
        setIsLoading(false);
      },
    };
  });

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      const userToken = await AsyncStorage.getItem("token");
      setUserToken(userToken);
      setIsLoading(false);
    } catch (error) {
      console.log("isLogged in Error", error);
    }
  };
  useEffect((): any => {
    isLoggedIn();
    return () => (isReadyRef.current = false);
  }, []);

  const renderTabIcon = (
    route: any,
    focused: boolean,
    color: string,
    size: number,
  ) => {
    let iconName = "home";
    switch (route.name) {
      case SCREENS.HOME:
        iconName = focused ? "home" : "home-outline";
        break;
      case SCREENS.SEARCH:
        iconName = focused ? "search" : "search-outline";
        break;
      case SCREENS.NOTIFICATION:
        iconName = focused ? "notifications" : "notifications-outline";
        break;
      case SCREENS.PROFILE:
        iconName = focused ? "person" : "person-outline";
        break;
      default:
        iconName = focused ? "home" : "home-outline";
        break;
    }
    return <Icon name={iconName} type="Ionicons" size={size} color={color} />;
  };

  const renderTabNavigation = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) =>
            renderTabIcon(route, focused, color, size),
          tabBarActiveTintColor: palette.primary,
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            backgroundColor: isDarkMode ? palette.black : palette.white,
          },
        })}
      >
        <Tab.Screen name={SCREENS.HOME} component={HomeScreen} />
        <Tab.Screen name={SCREENS.SEARCH} component={SearchScreen} />
        <Tab.Screen
          name={SCREENS.NOTIFICATION}
          component={NotificationScreen}
        />
        <Tab.Screen name={SCREENS.PROFILE} component={ProfileScreen} />
      </Tab.Navigator>
    );
  };

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          isReadyRef.current = true;
        }}
        theme={isDarkMode ? DarkTheme : LightTheme}
      >
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {userToken ? (
            <>
              <Stack.Screen
                name={SCREENS.HOME}
                component={renderTabNavigation}
              />
              <Stack.Screen name={SCREENS.DETAIL}>
                {(props) => <DetailScreen {...props} />}
              </Stack.Screen>
            </>
          ) : (
            <>
              <Stack.Screen
                name="SignIn"
                component={LoginComponent}
                options={{ title: "Sign In" }}
              />
              <Stack.Screen
                name="SignUp"
                component={SignupComponent}
                options={{ title: "Create Account" }}
              />

              <Stack.Screen
                name="ForgotPassword"
                component={ForgotPasswordComponent}
                options={{ title: "Forgot Password" }}
              />
              <Stack.Screen
                name="ResetPassword"
                component={ResetPasswordComponent}
                options={{ title: "Reset Password" }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default Navigation;
