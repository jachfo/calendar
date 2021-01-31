const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const startYear = 1753;
const endYear = 2021;
const month = 0;
const year = 0;
const selectDays = new Array();
const mousedown = false;
const mousemove = false;

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
    }
}