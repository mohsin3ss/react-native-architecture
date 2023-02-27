/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useMemo } from "react";
import createStyles from "./ResetPasswordComponent.style";
import { useTheme } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { Formik } from "formik";
import * as yup from "yup";
// import { HttpService } from "modules/shared/services";
const ResetPasswordComponent = ({ navigation }) => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  // const httpService = useMemo(() => new HttpService(), []);

  // const forgotPassword = (values, formikActions) => {
  //   httpService
  //     .post("auth/forgot-password", values, {
  //       "Content-Type": "application/json",
  //     })
  //     .then((res: any) => {
  //       console.log("res", res);
  //       setConfirmation(
  //         "Password reset instructions have been sent to your email.!",
  //       );
  //       formikActions.resetForm();
  //     })
  //     .catch((err) => {
  //       console.log("err", err);
  //       setConfirmation("Error submitting form. Please try again.");
  //     });
  // };

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
          newpassword: "",
          confirmpassword: "",
        }}
        // On Submit Funtion below

        onSubmit={(values) => console.log(JSON.stringify(values))}
        //Validation code below
        validationSchema={yup.object().shape({
          newpassword: yup
            .string()
            .min(4)
            .max(10, "Password should not excced 10 chars.")
            .required(),
          confirmpassword: yup
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
                  value={values.newpassword}
                  onChangeText={handleChange("newpassword")}
                  onBlur={() => setFieldTouched("newpassword")}
                  style={{ width: "80%" }}
                />
                <Icon name="eye" size={18} />
              </View>

              {touched.newpassword && errors.newpassword && (
                <Text
                  style={{
                    fontSize: 12,
                    color: "#FF0D10",
                    textAlign: "center",
                  }}
                >
                  {errors.newpassword}
                </Text>
              )}
            </View>

            <View>
              <View style={styles.form}>
                <TextInput
                  placeholder="Confirm Password*"
                  style={{ width: "80%" }}
                  value={values.confirmpassword}
                  onChangeText={handleChange("confirmpassword")}
                  onBlur={() => setFieldTouched("confirmpassword")}
                  secureTextEntry={true}
                />
                <Icon name="eye" size={18} />
              </View>

              {touched.confirmpassword && errors.confirmpassword && (
                <Text
                  style={{
                    fontSize: 12,
                    color: "#FF0D10",
                    textAlign: "center",
                  }}
                >
                  {errors.confirmpassword}
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
