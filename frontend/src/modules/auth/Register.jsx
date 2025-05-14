import React from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form as FormikForm } from "formik";
import { registerSchema } from '../../schema/auth';
import { signup } from './action';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Register = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = React.useState(false);

    React.useEffect(() => {
        const session = localStorage.getItem("accessToken");
        if (session) navigate('/dashboard/home');
    });

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <div style={{ maxWidth: 400, margin: "50px auto" }}>
                <h2>Register</h2>
                <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                        role: 'USER',
                    }}
                    validationSchema={registerSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        console.log(values, "register");
                        signup(values, setSubmitting, navigate, dispatch);
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                    }) => (
                        <FormikForm onSubmit={handleSubmit}>
                            <div style={{ marginBottom: 20 }}>
                                <TextField
                                    fullWidth
                                    name="name"
                                    placeholder="Full Name"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(touched.name && errors.name)}
                                    helperText={touched.name && errors.name}
                                />
                            </div>

                            <div style={{ marginBottom: 20 }}>
                                <TextField
                                    fullWidth
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(touched.email && errors.email)}
                                    helperText={touched.email && errors.email}
                                />
                            </div>

                            <div style={{ marginBottom: 20 }}>
                                <TextField
                                    fullWidth
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(touched.password && errors.password)}
                                    helperText={touched.password && errors.password}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                >
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </div>

                            <div className="authform-btn">
                                <Button type="submit" variant="contained" disabled={isSubmitting}>
                                    {!isSubmitting ? 'Register' : 'Registering...'}
                                </Button>
                            </div>

                            <div style={{ textAlign: "center", marginTop: 10 }}>
                                <span>Already have an account? </span>
                                <Link to="/login">Login</Link>
                            </div>
                        </FormikForm>
                    )}
                </Formik>
            </div>
        </>
    )
}

export default Register;