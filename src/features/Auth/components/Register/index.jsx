import { register } from 'features/Auth/userSlice';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useDispatch } from 'react-redux';
import RegisterForm from '../RegisterForm';
import PropTypes from 'prop-types';

function Register(props) {
    const { closeDialog } = props;
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const handleSubmit = async (values) => {
        values.username = values.email;
        console.log('handleSubmit', values);

        try {
            const action = register(values);
            const user = await dispatch(action).unwrap();
            console.log(user);
            enqueueSnackbar('Register successfully', { variant: 'success' });
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
            <RegisterForm onSubmit={handleSubmit} />
        </div>
    );
}

Register.propTypes = {
    closeDialog: PropTypes.func,
};

export default Register;
