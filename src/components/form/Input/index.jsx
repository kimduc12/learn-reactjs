import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

InputField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    disabled: PropTypes.bool,
};

function InputField(props) {
    const { form, name, label, disabled } = props;
    const { formState } = form;
    const { errors } = formState;
    const hasError = errors[name];
    return (
        <Controller
            name={name}
            control={form.control}
            render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                    name={name}
                    label={label}
                    margin="normal"
                    variant="outlined"
                    disabled={disabled}
                    fullWidth
                    error={!!hasError}
                    helperText={errors[name]?.message}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                />
            )}
        />
    );
}

export default InputField;
