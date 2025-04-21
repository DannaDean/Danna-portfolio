import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import "../../assets/css/Auth.scss";
import Box from "../../components/partials/Box";
import Form from "../../components/partials/Form";
import InputField from "../../components/partials/InputField";
import Button from "../../components/partials/Button";
import flowerImg from "../../assets/images/flowers/flower-4.png";
import { login, selectIsAuth } from "../../store/slices/authSlice";

const Login = () => {
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: 'onChange'
  });

  const onSubmit = (values) => {
    dispatch(login(values))
  };
  
  if (isAuth) {
    return <Navigate to="/dashboard" />
  }

  return (
    <div className="login-page">
      <div className="container">
        <Box
          title="Login"
          subtitle="Ready to make progress? Let’s go!"
          flowerImg={flowerImg}
          bgColor="rgba(255, 157, 101, 1)"
        >
          <Form onSubmit={handleSubmit(onSubmit)} className="login-form">
            <InputField
              type="email"
              placeholder="Your Email"
              helperText={errors.email?.message}
              {...register("email", { required: "Write your email" })}
            />
            <InputField
              type="password"
              placeholder="Your Password"
              helperText={errors.password?.message}
              {...register("password", { required: "Write your password" })}
            />

            <Button type="submit" text="Login"></Button>
          </Form>
        </Box>
      </div>
    </div>
  );
};

export default Login;
