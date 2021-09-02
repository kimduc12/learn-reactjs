import { yupResolver } from '@hookform/resolvers/yup';
import { Button, LinearProgress, makeStyles } from '@material-ui/core';
import QuantityField from 'components/form/Quantity';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

AddToCartForm.propTypes = {
    onSubmit: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
    root: {},
    submit: {},
}));

function AddToCartForm(props) {
    const { onSubmit } = props;
    const classes = useStyles();
    const schema = yup.object().shape({
        quantity: yup.number().typeError('You must specify a number').min(1, 'Please enter your quantity'),
    });
    const form = useForm({
        defaultValues: {
            quantity: 1,
        },
        resolver: yupResolver(schema),
    });

    const handleSubmit = async (values) => {
        if (onSubmit) {
            await onSubmit(values);
        }
    };

    const { formState } = form;
    const { isSubmitting } = formState;
    return (
        <div className={classes.root}>
            {isSubmitting && <LinearProgress className={classes.process} />}
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <QuantityField name="quantity" label="Quantity" form={form} />

                <Button type="submit" className={classes.submit} size="large" color="primary" variant="contained">
                    Submit
                </Button>
            </form>
        </div>
    );
}

export default AddToCartForm;
