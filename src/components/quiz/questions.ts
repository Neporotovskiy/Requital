interface Answer {
    title: string;
    description?: string;
    cost: {
        relative: boolean;
        value: string;
    };
}

export interface Question {
    question: string;
    answers: ReadonlyArray<Answer>;
    multiply: boolean;
}

export interface Progress {
    current: number;
    total: number;
}

export interface Step {
    question: Question;
    progress: Progress;
}

export interface Result {
    totals: number;
    answers: ReadonlyArray<{ question: Question; answer: Answer }>;
}

// REMOVE THIS SECTION AFTER BACKEND IMPLEMENTATION (start)

export const QUESTIONS = [
    {
        question: 'Необходима ли утепленная конструкция?',
        multiply: false,
        answers: [
            {
                title: 'Да',
                cost: {
                    relative: false,
                    value: 100000,
                },
            },
            {
                title: 'Нет',
                cost: {
                    relative: false,
                    value: 100000,
                },
            },
        ],
    },
    {
        question: 'Укажите необходимую площадь дома',
        multiply: false,
        answers: [
            {
                title: 'До 100 м/кв',
                cost: {
                    relative: true,
                    value: 5,
                },
            },
            {
                title: 'От 100 до 150 м/кв',
                cost: {
                    relative: true,
                    value: 5,
                },
            },
            {
                title: 'Более 150 м/кв',
                cost: {
                    relative: true,
                    value: 5,
                },
            },
        ],
    },
    {
        question: 'Проводился ли геологический анализ места строительства?',
        multiply: false,
        answers: [
            {
                title: 'Да',
                cost: {
                    relative: false,
                    value: 100000,
                },
            },
            {
                title: 'Нет',
                cost: {
                    relative: false,
                    value: 100000,
                },
            },
        ],
    },
    {
        question: 'Выберите необходимое количество этажей',
        multiply: false,
        answers: [
            {
                title: 'Один этаж',
                cost: {
                    relative: false,
                    value: 100000,
                },
            },
            {
                title: 'Два и более этажей',
                cost: {
                    relative: false,
                    value: 100000,
                },
            },
        ],
    },
    {
        question: 'Укажите количество проживающих на постоянной основе',
        multiply: false,
        answers: [
            {
                title: 'От одного до трех человек',
                cost: {
                    relative: false,
                    value: 100000,
                },
            },
            {
                title: 'Более трех человек',
                cost: {
                    relative: false,
                    value: 100000,
                },
            },
        ],
    },
    {
        question: 'Укажите количество проживающих на временной основе (гостей)',
        multiply: false,
        answers: [
            {
                title: 'Гостевые комнаты не требуются',
                cost: {
                    relative: false,
                    value: 100000,
                },
            },
            {
                title: 'От одного до трех человек',
                cost: {
                    relative: false,
                    value: 100000,
                },
            },
            {
                title: 'Более трех человек',
                cost: {
                    relative: false,
                    value: 100000,
                },
            },
        ],
    },
    {
        question: 'Укажите необходимое количество сан.узлов с расчетом на один этаж',
        multiply: false,
        answers: [
            {
                title: 'Один сан.узел',
                cost: {
                    relative: false,
                    value: 100000,
                },
            },
            {
                title: 'Более одного сан.узла',
                cost: {
                    relative: false,
                    value: 100000,
                },
            },
        ],
    },
    {
        question: 'Выберите конфигурацию обеденной зоны',
        multiply: false,
        answers: [
            {
                title: 'Кухня и гостинная совмещены',
                cost: {
                    relative: false,
                    value: 100000,
                },
            },
            {
                title: 'Кухня и гостинная раздельны',
                cost: {
                    relative: false,
                    value: 100000,
                },
            },
        ],
    },
    {
        question: 'Укажите местонахождение системы отопления',
        multiply: false,
        answers: [
            {
                title: 'В пределах строения',
                cost: {
                    relative: false,
                    value: 100000,
                },
            },
            {
                title: 'В отдельной постройке',
                cost: {
                    relative: false,
                    value: 100000,
                },
            },
        ],
    },
    {
        question: 'Необходимы ли дополнительные постройки на прилегающей территории?',
        multiply: true,
        answers: [
            {
                title: 'Баня, сауна',
                cost: {
                    relative: false,
                    value: 100000,
                },
            },
            {
                title: 'Беседка',
                cost: {
                    relative: false,
                    value: 100000,
                },
            },
            {
                title: 'Детский городок',
                cost: {
                    relative: false,
                    value: 100000,
                },
            },
            {
                title: 'Гараж, навес для автомобиля',
                cost: {
                    relative: false,
                    value: 100000,
                },
            },
            {
                title: 'Хозяйственные постройки',
                cost: {
                    relative: false,
                    value: 100000,
                },
            },
        ],
    },
    {
        question: 'Необходим ли забор или иная ограда на прилегающей территории?',
        multiply: false,
        answers: [
            {
                title: 'Типовой проект забора',
                description: 'Изготовленный из древесины',
                cost: {
                    relative: false,
                    value: 100000,
                },
            },
            {
                title: 'Индивидуальный проект забора',
                description: 'Изготовленный из выбранного материала',
                cost: {
                    relative: false,
                    value: 100000,
                },
            },
        ],
    },
];

const getQuestionsFromRemoteSource = () =>
    new Promise(resolve => {
        setTimeout(() => {
            resolve(QUESTIONS);
        }, 1500);
    });

// REMOVE THIS SECTION AFTER BACKEND IMPLEMENTATION (end)

export class Questions {
    private questions: ReadonlyArray<Question> = [];

    private current: number = 0;

    private answers: Array<{ question: Question; answer: Answer }> = [];

    fetch(callback: (questions: ReadonlyArray<Question>) => void) {
        // TODO: Don't forget to change implementation of getQuestionsFromRemoteSource
        getQuestionsFromRemoteSource()
            .then((questions: ReadonlyArray<Question>) => {
                callback(questions);
                this.questions = questions;
            })
            .catch(() => {
                callback(null);
            });
        return this;
    }

    progress(): Progress {
        return {
            current: this.current + 1,
            total: this.questions.length,
        };
    }

    next(answers: number[]): Step {
        const current = {
            question: this.questions[this.current],
            progress: this.progress(),
        };
        if (this.questions.length === 0) return current;
        if (this.current + 1 > this.questions.length) return current;
        answers.forEach(answerID => {
            const question = this.questions[this.current];
            const answer = question.answers[answerID];
            this.answers.push({
                question,
                answer,
            });
        });
        this.current += 1;
        return {
            question: this.questions[this.current],
            progress: this.progress(),
        };
    }

    previous(): Step {
        if (this.current === 0)
            return {
                question: this.questions[this.current],
                progress: this.progress(),
            };
        this.current -= 1;
        this.answers.splice(-1, 1);
        return {
            question: this.questions[this.current],
            progress: this.progress(),
        };
    }

    result(): Result {
        const result = {
            totals: this.answers.reduce((total, { answer: { cost: { relative, value } } }) => {
                if (relative) {
                    total += total * Number(value);
                } else {
                    total += Number(value);
                }
                return total;
            }, 0),
            answers: this.answers,
        };
        this.current = 0;
        this.answers = [];
        return result;
    }
}
