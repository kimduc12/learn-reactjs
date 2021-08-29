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

LoginForm.propTypes = {
    onSumit: PropTypes.func,
};

function LoginForm(props) {
    const classes = useStyles();
    const schema = yup.object().shape({
        identifier: yup.string().required('Please enter your email').email('Please enter a valid email address'),
        password: yup.string().required('Please enter password').min(6, 'Please enter your password at least 6 chars'),
    });
    const form = useForm({
        defaultValues: {
            identifier: '',
            password: '',
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
                Login
            </Typography>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <InputField name="identifier" label="Identifier" form={form} />
                <PasswordField name="password" label="Password" form={form} />

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

export default LoginForm;
