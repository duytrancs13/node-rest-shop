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
  PLEASE_FILL,
  REQUIRED,
} from "constant/text";
import {
  INVALID_EMAIL_STATUS,
  INVALID_INPUT,
  INVALID_TOKEN,
  INVALID_USER,
} from "constant/number";
import profile from "service/profile";

import "./style.scss";

interface ResetPasswordProps {}

const owlClass = "reset-password";

const initialValues = {
  email: "",
  token: "",
  newPassword: "",
};
const validationSchema = Yup.object().shape({
  email: Yup.string().email(INVALID_EMAIL).required(REQUIRED),
  token: Yup.string().when("email", {
    is: true,
    then: () => Yup.string().required(REQUIRED),
    otherwise: () => Yup.string().notRequired(),
  }),
  newPassword: Yup.string().when("email", {
    is: true,
    then: () => Yup.string().required(REQUIRED),
    otherwise: () => Yup.string().notRequired(),
  }),
});

const ResetPassword: React.FC<ResetPasswordProps> = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  return (
    <Layout>
      <div className={owlClass}>
        <FormOuter
          header={ROUTES.RESET_PASSWORD.label}
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
                if (!userId) {
                  const verifyEmailResp = await profile.verifyEmail(
                    values.email
                  );

                  actions.setSubmitting(false);

                  if (verifyEmailResp.error_code !== 0) {
                    if (verifyEmailResp.error_code === INVALID_EMAIL_STATUS) {
                      actions.setFieldError("email", verifyEmailResp.message);
                      return;
                    }
                    setErrorMessage(
                      verifyEmailResp.error_code === INVALID_INPUT
                        ? verifyEmailResp.message
                        : ERROR_500_MESSAGE
                    );
                    return;
                  }

                  if (window.confirm("Vui lòng check email")) {
                    setUserId(verifyEmailResp.data.userId);
                    return;
                  }
                }

                const resetPasswordResp = await profile.resetPassword({
                  token: values.token,
                  newPassword: values.newPassword,
                  userId,
                });

                if (resetPasswordResp.error_code !== 0) {
                  if (resetPasswordResp.error_code === INVALID_TOKEN) {
                    actions.setFieldError("token", resetPasswordResp.message);
                    return;
                  }
                  if (resetPasswordResp.error_code === INVALID_USER) {
                    setErrorMessage(resetPasswordResp.message);
                    return;
                  }
                  setErrorMessage(
                    resetPasswordResp.error_code === INVALID_INPUT
                      ? resetPasswordResp.message
                      : ERROR_500_MESSAGE
                  );
                  return;
                }
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
                    disabled={userId}
                    // custom props
                    block
                    label="Email"
                    placeholder={`${PLEASE_FILL} email...`}
                    type="email"
                  />
                  {userId && (
                    <>
                      <FastField
                        name="token"
                        component={FieldInput}
                        // custom props
                        block
                        label="Token"
                        placeholder={`${PLEASE_FILL} token...`}
                        type="text"
                      />
                      <FastField
                        name="newPassword"
                        component={FieldInput}
                        // custom props
                        block
                        label="Mật khẩu mới"
                        placeholder={`${PLEASE_FILL} mật khẩu mới...`}
                        type="password"
                      />
                    </>
                  )}
                  <Button
                    type="submit"
                    color="primary"
                    isLoading={isSubmitting}
                    isDisabled={!isValid}
                    style={{
                      margin: "0 auto",
                    }}
                  >
                    {userId ? "Đổi mật khẩu" : "Gửi"}
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

export default ResetPassword;
