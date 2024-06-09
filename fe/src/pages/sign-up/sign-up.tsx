import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "components/layout";
import FormOuter from "components/form-outer";
import Text from "components/text";
import Button from "components/button";
import FieldInput from "components/field-input";

import { Formik, FastField, Form } from "formik";

import ROUTES from "routes";

import * as Yup from "yup";

import {
  ERROR_500_MESSAGE,
  INVALID_EMAIL,
  MAX_CHARACTERS,
  MIN_CHARACTERS,
  NOT_CONTAIN_WHITE_SPACE,
  PLEASE_FILL,
  REQUIRED,
} from "constant/text";
import { INVALID_EMAIL_STATUS, INVALID_INPUT } from "constant/number";
import profile from "service/profile";

import "./style.scss";

interface SignUpProps {}

const owlClass = "sign-up";

const initialValues = {
  username: "",
  email: "",
  password: "",
};
const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, MIN_CHARACTERS)
    .required(REQUIRED)
    .matches(/^(\S+$)/g, NOT_CONTAIN_WHITE_SPACE),
  email: Yup.string().email(INVALID_EMAIL).required(REQUIRED),
  password: Yup.string()
    /* .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      INVALID_PASSWORD
    ) */
    .required(REQUIRED)
    .min(3, MIN_CHARACTERS)
    .max(12, MAX_CHARACTERS),
});

const SignUp: React.FC<SignUpProps> = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>("");
  return (
    <Layout>
      <div className={owlClass}>
        <FormOuter
          header="ĐĂNG KÝ"
          footer={
            <>
              <Text color="white">Bạn đã có tài khoản?</Text>{" "}
              <Text
                style={{
                  marginLeft: 24,
                }}
                color="primary"
                strong
                cursor
                onClick={() => navigate(ROUTES.SIGN_IN.path)}
              >
                {ROUTES.SIGN_IN.label}
              </Text>
              <Text
                style={{
                  marginLeft: 24,
                }}
                color="primary"
                strong
                cursor
                onClick={() => navigate(ROUTES.RESET_PASSWORD.path)}
              >
                {ROUTES.RESET_PASSWORD.label}
              </Text>
            </>
          }
        >
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, actions) => {
              try {
                setErrorMessage("");
                actions.setFieldError("email", "");
                const signUpResp = await profile.signUp(values);

                actions.setSubmitting(false);
                if (signUpResp.error_code !== 0) {
                  if (signUpResp.error_code === INVALID_EMAIL_STATUS) {
                    actions.setFieldError("email", signUpResp.message);
                    return;
                  }
                  setErrorMessage(
                    signUpResp.error_code === INVALID_INPUT
                      ? signUpResp.message
                      : ERROR_500_MESSAGE
                  );
                  return;
                }
                actions.resetForm();
                navigate(ROUTES.SIGN_IN.path);
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
                    name="username"
                    component={FieldInput}
                    // custom props
                    block
                    label="Tên người dùng"
                    placeholder={`${PLEASE_FILL} username...`}
                    type="text"
                  />
                  <FastField
                    name="email"
                    component={FieldInput}
                    // custom props
                    block
                    label="Email"
                    placeholder={`${PLEASE_FILL} email...`}
                    type="email"
                  />
                  <FastField
                    name="password"
                    component={FieldInput}
                    // custom props
                    block
                    label="Mật khẩu"
                    placeholder={`${PLEASE_FILL} password...`}
                    type="password"
                  />
                  <Button
                    type="submit"
                    color="primary"
                    isLoading={isSubmitting}
                    isDisabled={!isValid}
                    style={{
                      margin: "0 auto",
                    }}
                  >
                    Đăng ký
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

export default SignUp;
