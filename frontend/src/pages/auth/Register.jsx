import React from "react";
import { useForm, watch } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registration, selectIsAuth } from "../../store/slices/authSlice";
import { Navigate } from "react-router-dom";
import "../../assets/css/Auth.scss";
import Box from "../../components/partials/Box";
import Form from "../../components/partials/Form";
import InputField from "../../components/partials/InputField";
import Button from "../../components/partials/Button";
import flowerImg from "../../assets/images/flowers/flower-4.png";

const Register = () => {
  const isAuth = useSelector(selectIsAuth);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    const data = await dispatch(registration(values));

    if (registration.rejected.match(data)) {
      // alert error from payload
      return alert(data.payload?.message || "Registration failed");
    }
    if (data.payload?.token) {
      localStorage.setItem("token", data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="login-page">
      <div className="container">
        <Box
          title="Register"
          subtitle="The first step toward something great!"
          flowerImg={flowerImg}
          bgColor="rgba(255, 157, 101, 1)"
        >
          <Form onSubmit={handleSubmit(onSubmit)} className="login-form">
            <InputField
              type="text"
              placeholder="Your Full Name"
              helperText={errors.fullName?.message}
              {...register("fullName", { required: "Write your full name" })}
            />
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
            <InputField
              type="password"
              placeholder="Confirm Password"
              helperText={errors.passwordConfirm?.message}
              {...register("passwordConfirm", {
                required: "Confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
            />

            <Button disabled={!isValid} type="submit" text="Register"></Button>
          </Form>
        </Box>
      </div>
    </div>
  );
};

export default Register;
