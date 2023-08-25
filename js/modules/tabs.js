function tabs(tabSelector, tabContentSelector, tabParentSelector, activeClass) {
    //TABS
    const tabs = document.querySelectorAll(tabSelector),
          tabcontent = document.querySelectorAll(tabContentSelector),
          tabParent = document.querySelector(tabParentSelector);

    function hideTabContent() {
        tabcontent.forEach(item => {
            item.classList.remove('show', 'fade');
            item.classList.add('hide');
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    }
    
    function showTabContent (i = 0) {
        tabcontent[i].classList.add('show', 'fade');
        tabcontent[i].classList.remove('hide');

        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains(tabSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

export default tabs;