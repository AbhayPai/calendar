require('SassPath/index.scss');

import BaseController from 'ControllerPath/BaseController';

import View from 'ViewPath/View';

import ProcessCalendar from 'LibrariesPath/Modules/ProcessCalendar';

new BaseController().registerController({
    preprocess: function() {
        const ObjectDate = new Date();
        const MonthList = [
            'January', 'February', 'March', 'April', 'May', 'June', 'July',
            'August', 'September', 'October', 'November', 'December'
        ];

        App.defaultCalendarData = {
            MonthList: MonthList,
            WeekList: [
                'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
                'Friday', 'Saturday'
            ],
            CurrentYear: Number(localStorage.getItem('year')) ?
                localStorage.getItem('year') :
                (function() {
                    localStorage.setItem('year', JSON.stringify(
                        ObjectDate.getFullYear()));
                    return Number(localStorage.getItem('year'));
                })(),
            CurrentMonth: localStorage.getItem('month') ?
                localStorage.getItem('month').replace(/['"]+/g, '') :
                (function() {
                    localStorage.setItem('monthNumber', ObjectDate.getMonth());
                    localStorage.setItem('month', JSON.stringify(
                        MonthList[ObjectDate.getMonth()]));
                    return localStorage.getItem('month').replace(/['"]+/g, '');
                })()
        };
    },

    render: function() {
        new View({
            templateName: 'calendar',
            selectorId: 'calendar-wrapper',
            templateData: App.defaultCalendarData
        }).render();
    },

    ready: function() {
        new ProcessCalendar({
            next: 'next',
            previous: 'previous',
            dateObject: new Date(),
            calendarBody: 'calendar-body',
            currentMonth: new Date().getMonth(),
            currentYear: new Date().getFullYear(),
            weekList: App.defaultCalendarData.WeekList
        });
    }
});
