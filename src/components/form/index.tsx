import React from 'react';
import classNames from 'classnames';
import axios from 'axios';

import { Button } from 'components/button';
import { Checkbox } from 'components/checkbox';

import { STRUCTURES, Structure } from './structure';
import { RULES } from './validation';
import s from './styles.scss';

interface Props {
    type: string;
    meta?: any;
}

interface Field {
    value: string;
    error: string;
    success: boolean;
}

interface State {
    form: {
        [field: string]: Field;
    };
    submitButtonState: { content: string; disabled: boolean };
    isAgreementAccepted: boolean;
}

export const REQUEST_TYPE = {
    CALL_REQUEST: 'REQUEST_TYPE/CALL_REQUEST',
    PROJECT_PLACEMENT_REQUEST: 'REQUEST_TYPE/PROJECT_PLACEMENT_REQUEST',
    ORDER_VIA_QUIZ: 'REQUEST_TYPE/ORDER_VIA_QUIZ',
    ORDER_VIA_PROJECT: 'REQUEST_TYPE/ORDER_VIA_PROJECT',
};

export class Form extends React.PureComponent<Props, State> {
    constructor(args) {
        super(args);
        this.state = this.getCleanState();
    }

    timeout = null;

    componentWillUnmount(): void {
        clearTimeout(this.timeout);
    }

    getCleanState = () => {
        const result = {
            form: {},
            isAgreementAccepted: false,
            submitButtonState: { content: 'Отправить', disabled: false },
        };
        STRUCTURES.forEach(({ name }: Structure): void => {
            result.form[name] = {
                value: '',
                error: null,
                success: false,
            };
        });
        return result;
    };

    change = (name: string): ((event: React.ChangeEvent<HTMLInputElement>) => void) => ({
        target: { value },
    }: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState(({ form, ...state }) => ({
            form: {
                ...form,
                [name]: { ...form[name], value },
            },
            ...state,
        }));
    };

    validate = (name: string): Field => {
        const field = this.state.form[name];
        const rule = RULES[name];
        const error = typeof rule !== 'undefined' ? rule(field.value) : null;
        return { ...field, error, success: error === null };
    };

    validateField = (name: string): (() => void) => (): void => {
        this.setState(({ form, ...state }) => ({
            form: {
                ...form,
                [name]: this.validate(name),
            },
            ...state,
        }));
    };

    validateFields = () => {
        const fieldsValidationResults = [];
        const updatedForm = {};
        STRUCTURES.forEach(async ({ name }) => {
            const field = this.validate(name);
            fieldsValidationResults.push(field.success);
            updatedForm[name] = field;
        });
        this.setState({ form: updatedForm });
        return fieldsValidationResults.every(success => success);
    };

    changeAgreementStatus = () => {
        this.setState(({ isAgreementAccepted }) => ({
            isAgreementAccepted: !isAgreementAccepted,
        }));
    };

    updateStatus = status => {
        this.setState(
            {
                ...this.getCleanState(),
                submitButtonState: {
                    content: status,
                    disabled: true,
                },
            },
            () => {
                this.timeout = setTimeout(() => {
                    this.setState({
                        submitButtonState: {
                            content: 'Отправить',
                            disabled: false,
                        },
                    });
                }, 5000);
            },
        );
    };

    submitForm = async () => {
        const isFormFilledCorrectly = this.validateFields();
        if (!isFormFilledCorrectly) return;
        const {
            form: {
                approach: { value: approach },
                phone: { value: phone },
                email: { value: email },
            },
        } = this.state;
        const { type, meta } = this.props;
        axios
            .post('/api/save', {
                type,
                payload: {
                    approach,
                    phone,
                    email,
                },
                meta,
            })
            .then(() => {
                this.updateStatus('Заявка успешно отправлена');
            })
            .catch(() => {
                this.updateStatus('Произошла ошибка. Попробуйте позже');
            });
    };

    render() {
        const { isAgreementAccepted, submitButtonState } = this.state;
        return (
            <React.Fragment>
                {STRUCTURES.map(
                    ({ name, component: Component, required, label }: Structure): React.ReactElement => {
                        const { value, error, success } = this.state.form[name];
                        return (
                            <React.Fragment key={name}>
                                <label
                                    htmlFor={name}
                                    className={classNames(s.label, { [s.required]: required })}
                                    title={`Это ${required ? 'обязательное' : 'не обязательное'} поле`}
                                >
                                    {label}
                                </label>
                                <Component
                                    id={name}
                                    value={value}
                                    onChange={this.change(name)}
                                    onBlur={this.validateField(name)}
                                    error={error}
                                    success={success}
                                    className={s.field}
                                />
                            </React.Fragment>
                        );
                    },
                )}
                <div className={s.agreement}>
                    <Checkbox
                        checked={isAgreementAccepted}
                        className={s.checkbox}
                        onChange={this.changeAgreementStatus}
                    >
                        Я даю свое согласие на обработку персональных данных
                    </Checkbox>
                </div>
                <div className={s.submit}>
                    <Button
                        blue
                        disabled={!isAgreementAccepted || submitButtonState.disabled}
                        title={
                            isAgreementAccepted
                                ? 'Заказать звонок'
                                : submitButtonState.disabled
                                ? submitButtonState.content
                                : 'Необходимо дать согласие на обработку персональных данных'
                        }
                        onClick={this.submitForm}
                    >
                        {submitButtonState.content}
                    </Button>
                </div>
            </React.Fragment>
        );
    }
}
