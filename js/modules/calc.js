function calc() {
    //CALC
    const result = document.querySelector('.calculating__result span');
    let sex, weight, height, age, ratio;
    
    if (localStorage.getItem('ratio')) {
        ratio = +localStorage.getItem('ratio');
    } else { 
        ratio = '1.375';
        localStorage.setItem('ratio', '1.375');
    }

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else { 
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    function initLocalSettings (selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') == localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');
    initLocalSettings('#gender div', 'calculating__choose-item_active');
    

    function calcTotal() {
        if (!sex || !weight || !age || !height || !ratio) {
            result.textContent = '____';
            return;
        }
        
        if (sex === 'male') {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        } else {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        }
    }

    calcTotal();

    function getStaticInformation (parentSelector, activeClass) {
        const elements = document.querySelectorAll(`${parentSelector} div`);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', ratio);
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', sex);
                }

                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });

                e.target.classList.add(activeClass);
                console.log(ratio, sex);
                calcTotal();
            });  
        });
    }

    getStaticInformation ('.calculating__choose_big', 'calculating__choose-item_active');
    getStaticInformation ('#gender', 'calculating__choose-item_active');

    function getDynamicInformation (selector) {
        const inputs = document.querySelectorAll(selector);
        inputs.forEach(input => {
            input.addEventListener('input', (e) => {
                
                if (e.target.value.match(/\D/g)) {
                    e.target.style.border = '1px solid red';
                } else {
                    e.target.style.border = 'none';
                }

                switch (e.target.getAttribute('id')) {
                    case 'height':
                        height = +e.target.value;
                        break;
                    case 'age':
                        age = +e.target.value;
                        break;
                    case 'weight':
                        weight = +e.target.value;
                        break;
                }
                calcTotal();
            });
        });
    }

    getDynamicInformation('.calculating__choose_medium');
}

export default calc;