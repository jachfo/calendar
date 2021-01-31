let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let startYear = 1753;
let endYear = 2021;
let month = 0;
let year = 0;
let selectDays = new Array();
let mousedown = false;
let mousemove = false;

const loadCalendarMonths = () => {
    for (let i = 0; i < months.length; i++) {
        const doc = document.createElement("div");
        doc.innerHTML = months[i];
        doc.classList.add("dropdown-item");

        doc.onclick = (function () {
            const selectMonth = i;
            return function () {
                month = selectedMonth;
                document.getElementById("curMonth").innerHTML = months[month];
                loadCalendarDays();
                return month;
            }
        })();

        document.getElementById("months").appendChild(doc);
    }
};

const loadCalendarYears = () => {
    document.getElementById("years").innerHTML = "";

    for(let i = startYear; i <= endYear; i++) {
        const doc = document.createElement("div");
        doc.innerHTML = i;
        doc.classList.add("dropdown-item");

        doc.onclick = (function () {
            const selectedYear = i;
            return function () {
                year = selectedYear;
                document.getElementById("curYear").innerHTML = year;
                loadCalendarDays();
                return year;
            }
        })();

        document.getElementById("years").appendChild(doc);
    }
};

const loadCalendarDays = () => {
    document.getElementById("calendarDays").innerHTML = "";

    const tmpDate = new Date(year, month, 0);
    const num = daysInMonth(month, year);
    const dayofweek = tmpDate.getDay();

    for (let i = 0; i < num; i++) {
        const tmp = i + 1;
        const d = document.createElement("div");
        d.id = "calendarday_" + tmp;
        d.className = "day";
        d.innerHTML = tmp;
        d.dataset.day = tmp;

        d.addEventListener('click', function() {
            this.classList.toggle('selected');

            !selectedDays.includes(this.dataset.day) ? selectedDays.push(this.dataset.day) : selectedDays.splice(selectedDays.indexOf(this.dataset.day), 1);
        });

        d.addEventListener('mousemove', function(e) {
            e.preventDefault();
            if (mousedown) {
                this.classList.add('selected');
                
                if (!selectedDays.includes(this.dataset.day)) selected.Days.push(this.dataset.day);
            } 
        });

        d.addEventListener('mousedown', function(e) {
            e.preventDefault();
            mousedown = false;
        });

        d.addEventListener('mouseup', function(e) {
            e.preventDefault();
            mousedown = false;
        });

        document.getElementById("calendarDays").appendChild(d);
    }

    const clear = document.createElement("div");
    clear.className = "clear";
    document.getElementById("calendarDays").appendChild(clear);
};

const daysInMonth = (month, year) => {
    const d = new Date(year, month + 1, 0);
    return d.getDate();
};

window.addEventListener('load', function () {
    const date = new Date();
    month = date.getMonth();
    year = date.getFullYear();
    document.getElementById("curMonth").innerHTML = months[month];
    document.getElementById("curYear").innerHTML = year;
    loadCalendarMonths();
    loadCalendarYears();
    loadCalendarDays();
});

