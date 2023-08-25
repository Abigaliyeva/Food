import { openModal } from "./modal";
import { closeModal } from "./modal";
import { postData } from "../services/services";

function forms(formSelector, modalTimerId) {
    //FORMS
    const forms = document.querySelectorAll(formSelector);

    const messages = {
        loading: 'img/spinner.svg',
        send: "Спасибо! Скоро мы с Вами свяжемся",
        failure: "Что-то пошло не так..."
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = messages.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            /* const request = new XMLHttpRequest();
            request.open('POST', 'server.php');

            const formData = new FormData(form);
            //for json format-старый метод преобразования формы в объект

            /* const object = {};
            formData.forEach(function(value, key) {
                object[key] = value;
            }); */
            //request.send(json); //для отправки данных в формате JSON
            //request.send(formData); для отправки в виде объекта формы

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);  
                showThanksModal(messages.send);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(messages.failure);
            }).finally(() => {
                form.reset();
            });
        });
    }
    //ОПОВЕЩЕНИЕ ПОЛЬЗОВАТЕЛЯ
    function showThanksModal(message) {
        const previousModalDialog = document.querySelector('.modal__dialog');
    
        previousModalDialog.classList.add('hide');
        openModal('.modal', modalTimerId); 

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog'); 
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            previousModalDialog.classList.add('show');
            previousModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 4000);
    }

    fetch('http://localhost:3000/menu')
        .then(data => data.json());
}

export default forms;
