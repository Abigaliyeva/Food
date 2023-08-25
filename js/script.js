    import tabs  from './modules/tabs'; 
    import cards from './modules/cards';
    import forms from './modules/forms';
    import timer from './modules/timer';
    import sliders from './modules/sliders';
    import calc from './modules/calc';
    import modal from './modules/modal';
    import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 10000);

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    cards();
    forms('form', modalTimerId);
    timer('.timer', '2023-10-30');
    sliders();
    calc();
    modal('[data-modal]', '.modal', modalTimerId);
});

