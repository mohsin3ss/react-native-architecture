/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useMemo } from "react";
import createStyles from "./SignUpComponent.style";
import { useTheme } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { Formik } from "formik";
import * as yup from "yup";
import { HttpService } from "modules/shared/services";
const SignupComponent = ({ navigation }) => {
  const httpService = useMemo(() => new HttpService(), []);

  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const onRegister = (values) => {
    const { userName, email, password } = values;
    httpService
      .post(
        "auth/register",
        { userName, email, password },
        { "Content-Type": "application/json" },
      )
      .then((res) => {
        console.log("res", res);
        navigation.push("SignIn");
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const loginwithgoogle = (email, password) => {
    console.log("SignIn with google ");
  };

  const loginwithFB = (email, password) => {
    console.log("Signin with facebook");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.MainTitle}>Create an account</Text>
      <View>
        <Text style={styles.discription}>
          Fill all the fields so thet we can get some info about you.
        </Text>
        <Text style={styles.discription}>We'll never send you spam</Text>
      </View>
      <Formik
        initialValues={{
          userName: "",
          email: "",
          password: "",
        }}
        // On Submit Funtion below

        onSubmit={(values) => onRegister(values)}
        //Validation code below

        validationSchema={yup.object().shape({
          userName: yup.string().required("Please, provide your userName!"),
          email: yup.string().email().required(),
          password: yup
            .string()
            .min(4)
            .max(20, "Password should not excced 20 chars.")
            .required(),
        })}
      >
        {({
          values,
          handleChange,
          errors,
          setFieldTouched,
          touched,
          handleSubmit,
        }) => (
          <View style={styles.formContainer}>
            <View>
              <View style={styles.form}>
                <TextInput
                  value={values.userName}
                  onChangeText={handleChange("userName")}
                  onBlur={() => setFieldTouched("userName")}
                  placeholder="User Name"
                  style={{ width: "80%" }}
                />
              </View>

              {touched.userName && errors.userName && (
                <Text
                  style={{
                    fontSize: 12,
                    color: "#FF0D10",
                    textAlign: "center",
                  }}
                >
                  {errors.userName}
                </Text>
              )}
            </View>
            <View>
              <View style={styles.form}>
                <TextInput
                  placeholder="Email*"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={() => setFieldTouched("email")}
                  style={{ width: "80%" }}
                />
                <Icon name="mail" size={18} />
              </View>

              {touched.email && errors.email && (
                <Text
                  style={{
                    fontSize: 12,
                    color: "#FF0D10",
                    textAlign: "center",
                  }}
                >
                  {errors.email}
                </Text>
              )}
            </View>

            <View>
              <View style={styles.form}>
                <TextInput
                  placeholder="Password*"
                  style={{ width: "80%" }}
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={() => setFieldTouched("password")}
                  secureTextEntry={true}
                />
                <Icon name="eye" size={18} />
              </View>

              {touched.password && errors.password && (
                <Text
                  style={{
                    fontSize: 12,
                    color: "#FF0D10",
                    textAlign: "center",
                  }}
                >
                  {errors.password}
                </Text>
              )}
            </View>

            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <TouchableOpacity style={styles.btnstyle} onPress={handleSubmit}>
                <Text style={styles.btntext}>Get Started</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>

      <View
        style={{
          marginTop: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 15 }}>OR</Text>
        <View style={{ marginTop: 10 }}>
          <Text>Sign In with work email</Text>
        </View>

        <View style={styles.sociallogin}>
          <TouchableOpacity
            style={styles.sociailBtn}
            onPress={() => {
              loginwithgoogle;
            }}
          >
            <Icon name="logo-google" size={18} color="red" />
            <Text style={styles.socialbtnText}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sociailBtn}
            onPress={() => {
              loginwithFB;
            }}
          >
            <Icon name="logo-facebook" size={18} color="blue" />
            <Text style={styles.socialbtnText}>Facebook</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signupbtn}>
          <Text style={{ marginRight: 2 }}>Already have an account? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.push("SignIn");
            }}
          >
            <Text style={{ color: "blue" }}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignupComponent;
