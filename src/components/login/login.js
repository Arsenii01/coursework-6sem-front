import { Button } from "baseui/button";
import {
  HeadingXXLarge,
} from "baseui/typography";
import {
  Container,
  ErrorText,
  InnerContainer,
  InputWrapper,
  StyledInput,
} from "../commons";

import { useSignIn } from "react-auth-kit";
import { useFormik } from "formik";
import { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {api} from "../axios/axios";

function Login(props) {
  const [error, setError] = useState("");
  const signIn = useSignIn();
  const navigate = useNavigate()


  const onSubmit = async (values) => {
    console.log("Values: ", values);
    setError("");

    try {
      const response = await api.post(
          "/login",
          values
      )

      signIn({
        token: response.data.token,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: { username: values.username, role: response.data.role },
      });


      // Вопроси???
      if (response.data.role === "ADMIN" || response.data.role === "SUPERADMIN") {
        localStorage.setItem("isAdmin", "true")
      } else {
        localStorage.setItem("isAdmin", "false")
      }


      navigate("/books")
      window.location.reload()

    } catch (err) {

      if (err && err instanceof AxiosError)
        setError("Неправильный логин или пароль!");
      else if (err && err instanceof Error) setError(err.message);

      console.log("Error: ", err);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit,
  });

  return (
    <Container>
      <InnerContainer>
        <form onSubmit={formik.handleSubmit}>
          <HeadingXXLarge>Добро пожаловать!</HeadingXXLarge>
          <ErrorText>{error}</ErrorText>
          <InputWrapper>
            <StyledInput
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              placeholder="Username"
              clearOnEscape
              size="large"
              type="username"
            />
          </InputWrapper>
          <InputWrapper>
            <StyledInput
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder="Password"
              clearOnEscape
              size="large"
              type="password"
            />
          </InputWrapper>
          <InputWrapper>
            <Button size="large" kind="primary" isLoading={formik.isSubmitting}>
              Login
            </Button>
          </InputWrapper>
        </form>
      </InnerContainer>
    </Container>
  );
}

export { Login };
