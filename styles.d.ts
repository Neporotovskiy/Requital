declare module '*.scss' {
    interface Classnames {
        [className: string]: string;
    }
    const classNames: Classnames;
    export = classNames;
}
