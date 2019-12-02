import { isEmpty, isLength, isAlpha, isInt, isEmail } from 'validator';

export const RULES = {
    approach: (_value: string): string => {
        const value = _value.trim();
        if (isEmpty(value, { ignore_whitespace: true })) return 'Это поле обязательно для заполнения';
        const words = value.split(/\s+/g);
        const validationResultForSequence = words.map((word: string): boolean => isAlpha(word, 'ru-RU'));
        if (validationResultForSequence.some((result: boolean): boolean => !result))
            return 'Обращение может содержать только кириллические символы и пробелы';
        if (!isLength(value, { min: 4 })) return 'Слишком короткое обращение';
        return null;
    },
    phone: (_value: string): string => {
        const value = _value.trim();
        if (isEmpty(value, { ignore_whitespace: true })) return 'Это поле обязательно для заполнения';
        if (!isLength(value, { min: 6 }) || !isInt(value, { allow_leading_zeroes: false }))
            return 'Некорректный номер телефона';
        return null;
    },
    email: (_value: string): string => {
        const value = _value.trim();
        if (!isEmpty(value, { ignore_whitespace: true }) && !isEmail(value))
            return 'Некорректный адрес электронной почты';
        return null;
    },
};
