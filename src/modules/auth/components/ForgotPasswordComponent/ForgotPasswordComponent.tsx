/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useMemo, useState } from "react";
import createStyles from "./ForgotPasswordComponent.style";
import { useTheme } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { Formik } from "formik";
import * as yup from "yup";
import { HttpService } from "modules/shared/services";
const ForgotPasswordComponent = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const httpService = useMemo(() => new HttpService(), []);

  const forgotPassword = (values, formikActions) => {
    httpService
      .post("auth/forgot-password", values, {
        "Content-Type": "application/json",
      })
      .then((res: any) => {
        console.log("res", res);
        setConfirmation(
          "Password reset instructions have been sent to your email.!",
        );
        formikActions.resetForm();
      })
      .catch((err) => {
        console.log("err", err);
        setConfirmation("Error submitting form. Please try again.");
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.MainTitle}>Forgot Your Password?</Text>
      <View>
        <Text style={styles.discription}>
          Enter your email adress to retrive your password
        </Text>
      </View>
      <Formik
        initialValues={{
          email: "",
        }}
        onSubmit={(values, formikActions) =>
          forgotPassword(values, formikActions)
        }
        validationSchema={yup.object().shape({
          email: yup.string().email().required(),
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
            {confirmation && (
              <Text style={{ color: "green" }}>{confirmation}</Text>
            )}
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity style={styles.btnstyle} onPress={handleSubmit}>
                <Text style={styles.btntext}>Submit</Text>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={styles.btnstyle}
                onPress={() => {
                  navigation.push("ResetPassword");
                }}
              >
                <Text style={styles.btntext}>Reset</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default ForgotPasswordComponent;
