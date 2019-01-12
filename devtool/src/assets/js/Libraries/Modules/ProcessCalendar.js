import * as Utility from 'LibrariesPath/Utilities/Utility';

import View from 'ViewPath/View';

export default function ProcessCalendar(config) {
    'use strict';

    const Public = this;
    const Prop = Public;
    let Flag = true;
    let Name = '';

    Public.init = function() {
        Public.setOptions();
        if (Public.selectorsExist()) {
            Public.createCalendar();
        }
    };

    Public.setOptions = function() {
        Prop.defaults = {
            next: null,
            previous: null,
            dateObject: null,
            currentYear: null,
            currentMonth: null,
            calendarBody: null,
            weekList: null
        },
        Prop.options = config || {};

        for (Name in Prop.defaults) {
            if (Prop.options[Name] === undefined) {
                Prop.options[Name] = Prop.defaults[Name];
            }
        }

        return Prop.options;
    };

    Public.selectorsExist = function() {
        if (!document.getElementById(Prop.options.next)         ||
            !document.getElementById(Prop.options.previous)     ||
            !document.getElementById(Prop.options.calendarBody))
            Flag = false;

        return Flag;
    };

    Public.createCalendar = function() {
        let firstDay = (new Date(Prop.options.currentYear,
            Prop.options.currentMonth)).getDay();
        let daysInMonth = 32 - new Date(Prop.options.currentYear,
            Prop.options.currentMonth, 32).getDate();
        let tbl = document.getElementById(Prop.options.calendarBody);
        let date = 1;

        tbl.innerHTML = '';

        for (let i = 0; i < 6; i++) {
            let row = Utility.createElem('tr');

            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDay) {
                    let cell = Utility.createElem('td');
                    let cellText = document.createTextNode('');

                    cell.appendChild(cellText);
                    row.appendChild(cell);
                }
                else if (date > daysInMonth) {
                    break;
                } else {
                    let cell = Utility.createElem('td');
                    let cellText = document.createTextNode(date);

                    if (date === Prop.options.dateObject.getDate() &&
                        Prop.options.currentYear === Prop.options.dateObject.
                            getFullYear() &&
                        Prop.options.currentMonth === Prop.options.dateObject.
                            getMonth()) {
                        Utility.addClass(cell, 'bg-info');
                        Utility.addClass(cell, 'text-white');
                    }

                    cell.appendChild(cellText);
                    row.appendChild(cell);
                    date++;
                }
            }

            tbl.appendChild(row);
        }

        Public.updateCalendar();
    };

    Public.updateCalendar = function() {
        Utility.addEventListener(document.getElementById(Prop.options.next),
            'click', function() {
                Prop.options.currentYear = localStorage.getItem('year')
                    ? Number(localStorage.getItem('year')) :
                    Prop.options.currentYear;
                Prop.options.currentMonth = localStorage.getItem('monthNumber')
                    ? Number(localStorage.getItem('monthNumber')) :
                    Prop.options.currentMonth;

                Prop.options.currentYear = (Prop.options.currentMonth === 11) ?
                    Prop.options.currentYear + 1 : Prop.options.currentYear;
                Prop.options.currentMonth =
                    (Prop.options.currentMonth + 1) % 12;
                localStorage.setItem('year', JSON.stringify(
                    Prop.options.currentYear));
                localStorage.setItem('month', JSON.stringify(
                    App.defaultCalendarData.MonthList[
                        Prop.options.currentMonth]));
                localStorage.setItem('monthNumber', Prop.options.currentMonth);

                new View({
                    templateName: 'calendar',
                    selectorId: 'calendar-wrapper',
                    templateData: {
                        WeekList: Prop.options.weekList,
                        CurrentYear: Prop.options.currentYear,
                        CurrentMonth: App.defaultCalendarData.MonthList[
                            Prop.options.currentMonth]
                    }
                }).render();

                Public.createCalendar();
            });

        Utility.addEventListener(document.getElementById(Prop.options.previous),
            'click', function() {
                Prop.options.currentYear = localStorage.getItem('year')
                    ? Number(localStorage.getItem('year')) :
                    Prop.options.currentYear;
                Prop.options.currentMonth = localStorage.getItem('monthNumber')
                    ? Number(localStorage.getItem('monthNumber')) :
                    Prop.options.currentMonth;

                Prop.options.currentYear = (Prop.options.currentMonth === 0) ?
                    Prop.options.currentYear - 1 : Prop.options.currentYear;
                Prop.options.currentMonth = (Prop.options.currentMonth === 0) ?
                    11 : Prop.options.currentMonth - 1;
                localStorage.setItem('year', JSON.stringify(
                    Prop.options.currentYear));
                localStorage.setItem('month', JSON.stringify(
                    App.defaultCalendarData.MonthList[
                        Prop.options.currentMonth]));
                localStorage.setItem('monthNumber', Prop.options.currentMonth);

                new View({
                    templateName: 'calendar',
                    selectorId: 'calendar-wrapper',
                    templateData: {
                        WeekList: Prop.options.weekList,
                        CurrentYear: Prop.options.currentYear,
                        CurrentMonth: App.defaultCalendarData.MonthList[
                            Prop.options.currentMonth]
                    }
                }).render();

                Public.createCalendar();
            });
    };

    Public.init();
}
