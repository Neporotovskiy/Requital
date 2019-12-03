import React, { PureComponent, Fragment } from 'react';
import classNames from 'classnames';

import { Popup } from 'components/popup';
import { Button } from 'components/button';
import { Loader } from 'components/loader';
import { Icon } from 'components/icon';
import { Form, REQUEST_TYPE } from 'components/form';
import { divideByGroups } from 'common/utils';

import { Questions, Question, Progress, Result } from './questions';
import s from './styles.scss';

interface Props {
    children: (openQuiz: () => void) => React.ReactElement;
}

interface State {
    visible: boolean;
    loaded: boolean;
    started: boolean;
    finished: boolean;
    question: Question;
    selected: number[];
    progress: { current: number; total: number };
}

interface StartSectionProperties {
    loaded: boolean;
    onStart: () => void;
}

interface RuntimeSectionProperties extends Question {
    selected: number[];
    progress: Progress;
    onPrevious: () => void;
    onAnswer: (answer: number, multiply: boolean) => () => void;
    onNext: (answer: number[]) => () => void;
}

interface ResultSectionProperties {
    result: Result;
    onClose: () => void;
    onRestart: () => void;
}

export class Quiz extends PureComponent<Props, State> {
    state = {
        visible: false,
        loaded: false,
        started: false,
        finished: false,
        question: null,
        selected: [],
        progress: null,
    };

    model = null;

    componentDidMount(): void {
        this.model = new Questions().fetch(this.load);
    }

    componentWillUnmount(): void {
        this.model = null;
    }

    load = (questions: ReadonlyArray<Question>): void => {
        if (questions !== null) this.setState({ question: questions[0], loaded: true });
    };

    open = (): void => {
        this.setState({ visible: true });
    };

    close = (): void => {
        this.setState({
            visible: false,
            started: false,
            finished: false,
            question: this.model.questions[0],
            selected: [],
            progress: null,
        });
    };

    restart = (): void => {
        this.setState({
            finished: false,
            question: this.model.questions[0],
            selected: [],
            progress: { current: 1, total: this.model.questions.length },
        });
    };

    start = (): void => {
        this.setState({
            started: true,
            progress: { current: 1, total: this.model.questions.length },
        });
    };

    answer = (answer: number, multiply: boolean): (() => void) => () => {
        const isSelectionLocked = !multiply && this.state.selected.length > 0;
        const indexOfSelection = this.state.selected.indexOf(answer);
        const isAlreadySelected = indexOfSelection >= 0;
        if (isAlreadySelected) {
            const updatedSelection = [...this.state.selected];
            updatedSelection.splice(indexOfSelection, 1);
            this.setState({ selected: updatedSelection });
        } else if (!isSelectionLocked) {
            const updatedSelection = [...this.state.selected, answer];
            this.setState({ selected: updatedSelection });
        } else {
            this.setState({ selected: [answer] });
        }
    };

    next = (answer: number[]): (() => void) => () => {
        if (answer.length === 0) return;
        const {
            progress: { current, total },
        } = this.state;
        const { question, progress } = this.model.next(answer);
        this.setState({
            question,
            progress,
            selected: [],
            finished: current === total,
        });
    };

    previous = (): void => {
        const { question, progress } = this.model.previous();
        this.setState({ question, progress, selected: [], finished: false });
    };

    content = (
        start: (startSectionProperties: StartSectionProperties) => React.ReactElement,
        runtime: (runtimeSectionProperties: RuntimeSectionProperties) => React.ReactElement,
        result: (resultSectionProperties: ResultSectionProperties) => React.ReactElement,
    ): React.ReactElement => {
        const { loaded, question, selected, progress, started, finished } = this.state;
        if (!started)
            return start({
                loaded,
                onStart: this.start,
            });
        if (started && !finished)
            return runtime({
                ...question,
                selected,
                progress,
                onPrevious: this.previous,
                onAnswer: this.answer,
                onNext: this.next(selected),
            });
        if (finished)
            return result({
                result: this.model.result(),
                onClose: this.close,
                onRestart: this.restart,
            });
    };

    prepareMetaForRequest = answers => {
        const result = [];
        answers.forEach(({ question: { question }, answer: { title } }) => {
            const lastAnswer = result[result.length - 1];
            if (typeof lastAnswer !== 'undefined' && lastAnswer.question === question) {
                lastAnswer.answer.push(title);
            } else {
                result.push({ question, answer: [title] });
            }
        });
        return result;
    };

    render(): React.ReactElement {
        const { children } = this.props;
        const { visible } = this.state;

        return (
            <Fragment>
                {children(this.open)}
                <Popup visible={visible} onClose={this.close}>
                    <Popup.Header onClose={this.close}>Расчет приблизительной стоимости строительства</Popup.Header>
                    {this.content(
                        ({ loaded, onStart }): React.ReactElement => (
                            <React.Fragment>
                                <Popup.Content>
                                    <div className={s.content}>
                                        <div className={s.question}>
                                            Ответьте на несколько вопросов, которые помогут сформулировать требования к
                                            проекту и рассчитать примерную стоимость строительства. Это не займет много
                                            времени.
                                        </div>
                                    </div>
                                </Popup.Content>
                                <Popup.Footer>
                                    <div className={s.footer}>
                                        <Button blue flat disabled={!loaded} className={s.button} onClick={onStart}>
                                            {loaded ? 'Начать' : <Loader small light />}
                                        </Button>
                                    </div>
                                </Popup.Footer>
                            </React.Fragment>
                        ),
                        ({
                            question,
                            multiply,
                            answers,
                            selected,
                            onPrevious,
                            onAnswer,
                            onNext,
                            progress: { current, total },
                        }): React.ReactElement => (
                            <React.Fragment>
                                <Popup.Content>
                                    <div className={s.content}>
                                        <div
                                            className={classNames(s.question, {
                                                [s.withMultiplyNotice]: multiply,
                                            })}
                                        >
                                            {question}
                                        </div>
                                        {multiply && (
                                            <div className={s.multiplyNotice}>
                                                Выберите несколько подходящих ответов
                                            </div>
                                        )}
                                        <div className={s.answers}>
                                            {answers.map(({ title, description }, index) => (
                                                <div
                                                    className={classNames(s.answer, {
                                                        [s.selected]: selected.indexOf(index) >= 0,
                                                    })}
                                                    onClick={onAnswer(index, multiply)}
                                                    key={`${title} ${description} ${index}`}
                                                >
                                                    <Icon className={s.icon} success />
                                                    <div className={s.title}>{title}</div>
                                                    {description && <div className={s.description}>{description}</div>}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </Popup.Content>
                                <Popup.Footer>
                                    <div className={s.footer}>
                                        <span className={s.pagination}>{`${current} из ${total}`}</span>
                                        <Button
                                            blue
                                            flat
                                            disabled={current === 1}
                                            className={s.button}
                                            onClick={onPrevious}
                                        >
                                            Предыдущий вопрос
                                        </Button>
                                        <Button
                                            blue
                                            flat
                                            disabled={selected.length === 0}
                                            className={s.button}
                                            onClick={onNext}
                                        >
                                            {current === total ? 'Расчитать стоимость' : 'Следующий вопрос'}
                                        </Button>
                                    </div>
                                </Popup.Footer>
                            </React.Fragment>
                        ),
                        ({ result, onRestart, onClose }): React.ReactElement => (
                            <React.Fragment>
                                <Popup.Content>
                                    <div className={s.content}>
                                        <div className={s.question}>
                                            Приблизительная стоимость строительства дома с учетом выбранных параметров и
                                            опций составляет:
                                        </div>
                                        <h1 className={s.totals}>{divideByGroups(result.totals)} рублей</h1>
                                        <div className={s.question}>
                                            Мы учли Ваши ответы. Вы можете оставить свои данные, чтобы наш специалист
                                            связался с Вами.
                                        </div>
                                        <div className={s.formWrapper}>
                                            <Form
                                                type={REQUEST_TYPE.ORDER_VIA_QUIZ}
                                                meta={this.prepareMetaForRequest(result.answers)}
                                            />
                                        </div>
                                    </div>
                                </Popup.Content>
                                <Popup.Footer>
                                    <div className={s.footer}>
                                        <Button blue flat className={s.button} onClick={onRestart}>
                                            Еще раз
                                        </Button>
                                        <Button blue flat className={s.button} onClick={onClose}>
                                            Закрыть
                                        </Button>
                                    </div>
                                </Popup.Footer>
                            </React.Fragment>
                        ),
                    )}
                </Popup>
            </Fragment>
        );
    }
}
