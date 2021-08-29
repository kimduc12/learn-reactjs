import { yupResolver } from '@hookform/resolvers/yup';
import InputField from 'components/form/Input';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

TodoForm.propTypes = {
    onSumit: PropTypes.func,
};

function TodoForm(props) {
    const schema = yup.object().shape({
        title: yup.string().required('Please enter title'),
    });
    const form = useForm({
        defaultValues: {
            title: '',
        },
        resolver: yupResolver(schema),
    });

    const handleSubmit = (values) => {
        const { onSumit } = props;
        if (onSumit) {
            onSumit(values);
        }
        form.reset();
    };

    return (
        <div>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <InputField name="title" label="Title" form={form}></InputField>
            </form>
        </div>
    );
}

export default TodoForm;
