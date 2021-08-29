import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import InputField from 'components/form/Input';
import PasswordField from 'components/form/Password';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(2),
        position: 'relative',
    },
    avatar: {
        margin: '0 auto 8px auto',
        backgroundColor: theme.palette.secondary.main,
    },
    title: {
        textAlign: 'center',
        margin: theme.spacing(0, 0, 2, 0),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    process: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
}));

RegisterForm.propTypes = {
    onSumit: PropTypes.func,
};

function RegisterForm(props) {
    const classes = useStyles();
    const schema = yup.object().shape({
        fullName: yup
            .string()
            .required('Please enter your full name')
            .test('Should has at least two words', 'Please enter at least two words', (value) => {
                return value.split(' ').length >= 2;
            }),
        email: yup.string().required('Please enter your email').email('Please enter a valid email address'),
        password: yup.string().required('Please enter password').min(6, 'Please enter your password at least 6 chars'),
        retypePassword: yup
            .string()
            .required('Please enter retype password')
            .oneOf([yup.ref('password')], 'Please match your password'),
    });
    const form = useForm({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            retypePassword: '',
        },
        resolver: yupResolver(schema),
    });

    const handleSubmit = async (values) => {
        const { onSubmit } = props;
        if (onSubmit) {
            await onSubmit(values);
        }
    };

    const { formState } = form;
    const { isSubmitting } = formState;

    return (
        <div className={classes.root}>
            {isSubmitting && <LinearProgress className={classes.process} />}
            <Avatar className={classes.avatar}>
                <LockOutlined></LockOutlined>
            </Avatar>
            <Typography className={classes.title} component="h3" variant="h5">
                Create new account
            </Typography>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <InputField name="fullName" label="Full Name" form={form} />
                <InputField name="email" label="Email" form={form} />
                <PasswordField name="password" label="Password" form={form} />
                <PasswordField name="retypePassword" label="Retype Password" form={form} />

                <Button
                    type="submit"
                    className={classes.submit}
                    fullWidth
                    size="large"
                    color="primary"
                    variant="contained"
                >
                    Submit
                </Button>
            </form>
        </div>
    );
}

export default RegisterForm;
