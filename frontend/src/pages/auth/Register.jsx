import React from 'react';
import '../../assets/css/Auth.scss';
import Box from "../../components/partials/Box";
import Form from "../../components/partials/Form";
import InputField from "../../components/partials/InputField";
import Button from "../../components/partials/Button";
import flowerImg from "../../assets/images/flowers/flower-4.png";

const Register = () => {
  return (
    <div className="login-page">
      <div className="container">
        <Box
          title="Register"
          subtitle="The first step toward something great!"
          flowerImg={flowerImg}
          bgColor="rgba(255, 157, 101, 1)"
        >
          <Form className="login-form">
            <InputField type="text" placeholder="Your Full Name" required />
            <InputField type="email" placeholder="Your Email" required />
            <InputField type="password" placeholder="Your Password" required />
            <InputField type="password" placeholder="Confirm Password" required />
            <Button type="submit" text="Register"></Button>
          </Form>
        </Box>
      </div>
    </div>
  );
};

export default Register;