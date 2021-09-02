import { Box, FormHelperText, IconButton, makeStyles, Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { AddCircleOutlined, RemoveCircleOutlined } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

QuantityField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    disabled: PropTypes.bool,
};

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center',
    },
    box: {},
}));

function QuantityField(props) {
    const { form, name, label, disabled } = props;
    const classes = useStyles();
    const { formState, setValue } = form;
    const { errors } = formState;
    const hasError = errors[name];
    return (
        <FormControl className={classes.root} fullWidth error={!!hasError} margin="normal" variant="outlined">
            <Typography>{label}:</Typography>
            <Controller
                name={name}
                control={form.control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Box className={classes.box}>
                        <IconButton
                            onClick={() => setValue(name, Number.parseInt(value) ? Number.parseInt(value) - 1 : 1)}
                        >
                            <RemoveCircleOutlined />
                        </IconButton>
                        <OutlinedInput
                            name={name}
                            id={name}
                            type="number"
                            disabled={disabled}
                            onBlur={onBlur}
                            onChange={onChange}
                            value={value}
                        />
                        <IconButton
                            onClick={() => setValue(name, Number.parseInt(value) ? Number.parseInt(value) + 1 : 1)}
                        >
                            <AddCircleOutlined />
                        </IconButton>
                    </Box>
                )}
            />
            {!!hasError && <FormHelperText>{errors[name]?.message}</FormHelperText>}
        </FormControl>
    );
}

export default QuantityField;
