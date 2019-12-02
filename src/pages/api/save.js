const nodemailer = require('nodemailer');

const SERVICE_EMAIL = {
    provider: 'gmail',
    sender: 'строим-дом-вместе.рф',
    login: 'build.a.house.together@gmail.com',
    password: 'YnVpbGQtYS1ob3VzZS10b2dldGhlcg',
};

const TARGET_EMAIL = 'neanstudio@gmail.com';

export const REQUEST_TYPE = {
    CALL_REQUEST: 'REQUEST_TYPE/CALL_REQUEST',
    PROJECT_PLACEMENT_REQUEST: 'REQUEST_TYPE/PROJECT_PLACEMENT_REQUEST',
    ORDER_VIA_QUIZ: 'REQUEST_TYPE/ORDER_VIA_QUIZ',
    ORDER_VIA_PROJECT: 'REQUEST_TYPE/ORDER_VIA_PROJECT',
};

export default async function save({ body }, res) {
    let transporter = nodemailer.createTransport({
        service: SERVICE_EMAIL.provider,
        auth: {
            user: SERVICE_EMAIL.login,
            pass: SERVICE_EMAIL.password,
        },
    });
    switch (body.type) {
        case REQUEST_TYPE.CALL_REQUEST: {
            await transporter.sendMail({
                from: SERVICE_EMAIL.sender,
                to: TARGET_EMAIL,
                subject: 'Активность на сайте',
                html: `<div>
                <h3>Необходима консультация</h3>
                <p>Полученные контактные данные:</p>
                <ul>
                    <li>
                        Как обращаться: <b>${body.payload.approach}</b>
                    </li>
                    <li>
                        Телефон: <b>${body.payload.phone}</b>
                    </li>
                    <li>
                        Адрес электронной почты: <b>${body.payload.email}</b>
                    </li>
                </ul>
            </div>`,
            });
            break;
        }
        case REQUEST_TYPE.PROJECT_PLACEMENT_REQUEST: {
            await transporter.sendMail({
                from: SERVICE_EMAIL.sender,
                to: TARGET_EMAIL,
                subject: 'Активность на сайте',
                html: `<div>
                <h3>Запрос на размещение информации на сайте</h3>
                <p>Полученные контактные данные:</p>
                <ul>
                    <li>
                        Как обращаться: <b>${body.payload.approach}</b>
                    </li>
                    <li>
                        Телефон: <b>${body.payload.phone}</b>
                    </li>
                    <li>
                        Адрес электронной почты: <b>${body.payload.email}</b>
                    </li>
                </ul>
            </div>`,
            });
            break;
        }
        case REQUEST_TYPE.ORDER_VIA_QUIZ: {
            await transporter.sendMail({
                from: SERVICE_EMAIL.sender,
                to: TARGET_EMAIL,
                subject: 'Активность на сайте',
                html: `<div>
                <h3>Запрос на оформление заявки после рассчета стоимости</h3>
                <p>Полученные контактные данные:</p>
                <p>
                    Как обращаться: <b>${body.payload.approach}</b>
                </p>
                <p>
                    Телефон: <b>${body.payload.phone}</b>
                </p>
                <p>
                    Адрес электронной почты: <b>${body.payload.email}</b>
                </p>
                 <h4>Указанные пожелания:</h4>
                <div>
                ${body.meta.map(({ question, answer }) => `<p>${question}: <b>${answer.join(', ')}</b></p>`)}
                </div>
            </div>`,
            });
            break;
        }
        case REQUEST_TYPE.ORDER_VIA_PROJECT: {
            await transporter.sendMail({
                from: SERVICE_EMAIL.sender,
                to: TARGET_EMAIL,
                subject: 'Активность на сайте',
                html: `<div>
                <h3>Запрос на оформление заявки после ознакомления с проектом</h3>
                <p>Полученные контактные данные:</p>
                <ul>
                    <li>
                        Как обращаться: <b>${body.payload.approach}</b>
                    </li>
                    <li>
                        Телефон: <b>${body.payload.phone}</b>
                    </li>
                    <li>
                        Адрес электронной почты: <b>${body.payload.email}</b>
                    </li>
                </ul>
                 <h4>Заинтересовавший проект:</h4>
                <b>${body.meta}</b>
            </div>`,
            });
            break;
        }
    }
    res.end();
}
