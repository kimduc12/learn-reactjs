import { login } from 'features/Auth/userSlice';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useDispatch } from 'react-redux';
import LoginForm from '../LoginForm';
import PropTypes from 'prop-types';

function Login(props) {
    const { closeDialog } = props;
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const handleSubmit = async (values) => {
        values.username = values.email;
        console.log('handleSubmit', values);

        try {
            const action = login(values);
            const user = await dispatch(action).unwrap();
            console.log(user);
            enqueueSnackbar('Login successfully', { variant: 'success' });
        } catch (error) {
            console.log('error', error);
            enqueueSnackbar(error.message, { variant: 'error' });
        }
        if (closeDialog) {
            closeDialog();
        }
    };
    return (
        <div>
            <LoginForm onSubmit={handleSubmit} />
        </div>
    );
}

Login.propTypes = {
    closeDialog: PropTypes.func,
};

export default Login;
