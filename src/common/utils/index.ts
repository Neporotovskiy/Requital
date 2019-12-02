import { scroller } from 'react-scroll';

export const divideByGroups = (digit: number, separator = ' ', group = 3): string => {
    const _digit = String(digit);
    let result = '';
    for (let i = _digit.length - 1; i >= 0; i--) {
        result = _digit[i] + (i !== _digit.length - 1 && (_digit.length - i) % group === 1 ? separator : '') + result;
    }
    return result;
};

export const scrollToContactsSection = () => {
    scroller.scrollTo('contacts', {
        delay: 100,
        duration: 1000,
        smooth: true,
        offset: -100,
    });
};
