import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "components/layout";
import FormOuter from "components/form-outer";
import Text from "components/text";
import Button from "components/button";
import FieldInput from "components/field-input";

import * as Yup from "yup";
import { Formik, FastField, Form } from "formik";

import {
  ERROR_500_MESSAGE,
  INVALID_EMAIL,
  REQUIRED,
} from "constant/text";
import {
  INCORRECT_PASSWORD,
  INVALID_EMAIL_STATUS,
  INVALID_INPUT,
} from "constant/number";
import ROUTES from "routes";
import profile from "service/profile";

import "./style.scss";

interface SignInProps {}

const owlClass = "sign-in";

const initialValues = {
  email: "",
  password: "",
};
const validationSchema = Yup.object().shape({
  email: Yup.string().email(INVALID_EMAIL).required(REQUIRED),
  password: Yup.string()
    /* .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      INVALID_PASSWORD
    ) */
    .required(REQUIRED)
    .min(3, "min 3")
    .max(12, "max 12"),
});

const SignIn: React.FC<SignInProps> = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>("");

  return (
    <Layout>
      <div className={owlClass}>
        <FormOuter
          header="Đăng nhập"
          footer={
            <>
              <Text color="white">Bạn chưa có tài khoản?</Text>{" "}
              <Text
                style={{
                  marginLeft: 24,
                }}
                color="primary"
                strong
                cursor
                onClick={() => navigate(ROUTES.SIGN_UP.path)}
              >
                {ROUTES.SIGN_UP.label}
              </Text>
            </>
          }
        >
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, actions) => {
              try {
                actions.setFieldError("email", "");
                actions.setFieldError("password", "");

                const signInResp = await profile.signIn(values);
                actions.setSubmitting(false);

                if (signInResp.error_code !== 0) {
                  if (signInResp.error_code === INVALID_EMAIL_STATUS) {
                    actions.setFieldError("email", signInResp.message);
                    return;
                  }
                  //
                  if (signInResp.error_code === INCORRECT_PASSWORD) {
                    actions.setFieldError("password", signInResp.message);
                    return;
                  }

                  setErrorMessage(
                    signInResp.error_code === INVALID_INPUT
                      ? signInResp.message
                      : ERROR_500_MESSAGE
                  );
                  return;
                }
                localStorage.setItem(
                  "accessToken",
                  signInResp.data.accessToken
                );
                localStorage.setItem(
                  "refreshToken",
                  signInResp.data.refreshToken
                );
                actions.resetForm();
                navigate(ROUTES.HOME.path);
              } catch (error) {
                actions.setSubmitting(false);
                setErrorMessage(ERROR_500_MESSAGE);
              }
            }}
          >
            {(formikProps) => {
              const { values, errors, touched, isValid, isSubmitting } =
                formikProps;

              return (
                <Form className={`${owlClass}__form`}>
                  <FastField
                    name="email"
                    component={FieldInput}
                    // custom props
                    block
                    label="Email"
                    placeholder="Vui lòng nhập email..."
                  />
                  <FastField
                    name="password"
                    component={FieldInput}
                    // custom props
                    block
                    label="Password"
                    placeholder="Vui lòng nhập password..."
                    type="password"
                  />
                  <Button
                    type="submit"
                    color="primary"
                    isLoading={isSubmitting}
                    style={{
                      margin: "0 auto",
                    }}
                    isDisabled={!isValid}
                  >
                    Đăng nhập
                  </Button>
                  <Text
                    color="error"
                    className={`${owlClass}__form__error-message`}
                  >
                    {errorMessage}
                  </Text>
                </Form>
              );
            }}
          </Formik>
        </FormOuter>
      </div>
    </Layout>
  );
};

export default SignIn;
