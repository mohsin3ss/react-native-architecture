/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useMemo } from "react";
import createStyles from "./ResetPasswordComponent.style";
import { useTheme } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { Formik } from "formik";
import * as yup from "yup";
import { HttpService } from "modules/shared/services";

const ResetPasswordComponent = ({ navigation }) => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const httpService = useMemo(() => new HttpService(), []);

  const resetPassword = async (data, formikActions) => {
    const token = "647a4950650a45d650802aa1b840be51bb7d1f7f";
    data = { ...data, token };
    console.log(data);
    await httpService
      .post("auth/reset-password", data, { "Content-Type": "application/json" })
      .then((res) => {
        console.log("res", res);
        navigation.push("SignIn");
        formikActions.resetForm();
      })
      .catch((err) => {
        console.log("err", err);
        alert("Error");
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.Logoview}>
        <Image
          style={styles.logo}
          source={require("../../../../assets/deputy.webp")}
        />
      </View>
      <Text style={styles.MainTitle}>Try Deputy for free</Text>
      <View>
        <Text style={styles.discription}>
          Get started in minutes, no credit card required
        </Text>
      </View>
      <Formik
        initialValues={{
          password: "",
          confirmPassword: "",
        }}
        // On Submit Funtion below

        onSubmit={(values, formikActions) =>
          resetPassword(values, formikActions)
        }
        //Validation code below
        validationSchema={yup.object().shape({
          password: yup
            .string()
            .min(4)
            .max(10, "Password should not excced 10 chars.")
            .required(),
          confirmPassword: yup
            .string()
            .min(4)
            .max(10, "Password should not excced 10 chars.")
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
                  placeholder="New Password"
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={() => setFieldTouched("password")}
                  style={{ width: "80%" }}
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

            <View>
              <View style={styles.form}>
                <TextInput
                  placeholder="Confirm Password*"
                  style={{ width: "80%" }}
                  value={values.confirmPassword}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={() => setFieldTouched("confirmPassword")}
                  secureTextEntry={true}
                />
                <Icon name="eye" size={18} />
              </View>

              {touched.confirmPassword && errors.confirmPassword && (
                <Text
                  style={{
                    fontSize: 12,
                    color: "#FF0D10",
                    textAlign: "center",
                  }}
                >
                  {errors.confirmPassword}
                </Text>
              )}
            </View>

            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <TouchableOpacity style={styles.btnstyle} onPress={handleSubmit}>
                <Text style={styles.btntext}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default ResetPasswordComponent;
