class Main {
    headerElement;
    infoDivElement;
    infoYearElement;
    infoMonthElement;
    navigationDivElement;
    navigationButtonLeft;
    navigationButtonRight;
    navigationButtonLeftI;
    navigationButtonRightI;
    placeToRenderHeader;

    mainElement;
    weekdayNames =  ['maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag', 'zondag'];
    weekdaysListElement;
    weekdayListItemElement = [];
    monthListElement;
    monthListItemElement = [];
    placeToRenderMain;

    constructor(placeToRenderMain) {
        let months =  ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];
        let date = new Date();
        let currYear = date.getFullYear();
        let currMonth = date.getMonth();

        this.placeToRenderHeader = document.querySelector("body");

        // Header elements
        this.headerElement = document.createElement('header');
        this.headerElement.classList = 'calender__header';

        this.infoDivElement = document.createElement('div');
        this.infoDivElement.classList = 'header__info';

        this.infoYearElement = document.createElement('h1');
        this.infoYearElement.classList = 'header__year';

        this.infoMonthElement = document.createElement('h2');
        this.infoMonthElement.classList = 'header__month';

        this.navigationDivElement = document.createElement('div');
        this.navigationDivElement.classList = 'header__navigation';

        this.navigationButtonLeft = document.createElement('figure');
        this.navigationButtonLeft.classList = 'navigation__button';
        this.navigationButtonLeft.setAttribute('id', 'prev');
        this.navigationButtonLeftI = document.createElement('i');
        this.navigationButtonLeftI.classList = 'fa-solid fa-chevron-left';

        this.navigationButtonRight = document.createElement('figure');
        this.navigationButtonRight.classList = 'navigation__button';
        this.navigationButtonRight.setAttribute('id', 'next');
        this.navigationButtonRightI = document.createElement('i');
        this.navigationButtonRightI.classList = 'fa-solid fa-chevron-right';

        this.placeToRenderMain = document.getElementsByTagName(placeToRenderMain)[0];
        this.mainElement = document.createElement('main');
        this.mainElement.classList = 'calender__main';

        this.weekdaysListElement = document.createElement('ul');
        this.weekdaysListElement.classList = 'month__weekdays';

        this.renderWeekdays();

        this.monthListElement = document.createElement('ul');
        this.monthListElement.classList = 'month__days';

        let prevButton = this.navigationButtonLeft;
        let nextButton = this.navigationButtonRight;

        // Render initial calendar
        this.renderCalendar(date, months, currMonth, currYear);

        // Navigation button events
        prevButton.onclick = () => {
            let newMonth = currMonth - 1;
            let newYear = currYear;

            if (newMonth < 0) {
                newMonth = 11;
                newYear--;
            }

            currMonth = newMonth;
            currYear = newYear;

            let newDate = new Date(currYear, currMonth, 1);
            this.renderCalendar(newDate, months, currMonth, currYear);
        };

        nextButton.onclick = () => {
            let newMonth = currMonth + 1;
            let newYear = currYear;

            if (newMonth > 11) {
                newMonth = 0;
                newYear++;
            }

            currMonth = newMonth;
            currYear = newYear;

            let newDate = new Date(currYear, currMonth, 1);
            this.renderCalendar(newDate, months, currMonth, currYear);
        };
    }

    renderWeekdays() {
        for (let i = 0; i < 7; i++) {
            this.weekdayListItemElement[i] = document.createElement('li');
            this.weekdayListItemElement[i].classList = "month__weekday";
            this.weekdayListItemElement[i].innerText = this.weekdayNames[i];
            this.weekdaysListElement.appendChild(this.weekdayListItemElement[i]);
        }
    }

    renderCalendar(date, months, currMonth, currYear) {
        this.monthListElement.innerHTML = "";

        // Sla de huidige datum op in een aparte constante
        const today = new Date();
        const todayDate = today.getDate();
        const todayMonth = today.getMonth();
        const todayYear = today.getFullYear();

        // Get month data
        let firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
        firstDayofMonth = (firstDayofMonth === 0) ? 6 : firstDayofMonth - 1; // Adjust so Monday is the first day

        let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
        let lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();

        // Render previous month's last days
        for (let i = firstDayofMonth; i > 0; i--) {
            let day = document.createElement('li');
            day.classList = 'month__day inactive__day';
            day.innerText = lastDateofLastMonth - i + 1;
            this.monthListElement.appendChild(day);
        }

        // Render current month
        for (let i = 1; i <= lastDateofMonth; i++) {
            let isToday = i === todayDate && currMonth === todayMonth && currYear === todayYear;
            let day = document.createElement('li');
            day.classList = isToday ? "month__day current__day" : "month__day active__day";
            day.innerText = i;
            this.monthListElement.appendChild(day);
        }

        // Render next month's first days
        let remainingDays = (42 - (firstDayofMonth + lastDateofMonth)); // Ensure 6 full weeks are displayed
        for (let i = 1; i <= remainingDays; i++) {
            let day = document.createElement('li');
            day.classList = 'month__day inactive__day';
            day.innerText = i;
            this.monthListElement.appendChild(day);
        }

        // Update month and year display
        this.infoYearElement.innerText = currYear;
        this.infoMonthElement.innerText = months[currMonth];
    }

    render() {
        this.placeToRenderHeader.appendChild(this.headerElement);
        this.headerElement.appendChild(this.infoDivElement);
        this.infoDivElement.appendChild(this.infoYearElement);
        this.infoDivElement.appendChild(this.infoMonthElement);
        this.headerElement.appendChild(this.navigationDivElement);
        this.navigationDivElement.appendChild(this.navigationButtonLeft);
        this.navigationButtonLeft.appendChild(this.navigationButtonLeftI);
        this.navigationDivElement.appendChild(this.navigationButtonRight);
        this.navigationButtonRight.appendChild(this.navigationButtonRightI);

        this.placeToRenderMain.appendChild(this.mainElement);
        this.mainElement.appendChild(this.weekdaysListElement);
        this.mainElement.appendChild(this.monthListElement);
    }
}

const main = new Main('body');
main.render();