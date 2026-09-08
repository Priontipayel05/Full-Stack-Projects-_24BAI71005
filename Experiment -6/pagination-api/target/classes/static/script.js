const API_URL = "/api/students";

let currentPage = 0;
let totalPages = 0;
let pageSize = 5;


/* LOAD STUDENTS */

async function loadStudents() {

    try {

        const sortBy =
            document.getElementById("sortBy").value;

        const direction =
            document.getElementById("direction").value;

        pageSize =
            parseInt(
                document.getElementById("pageSize").value
            );


        const url =
            `${API_URL}?page=${currentPage}` +
            `&size=${pageSize}` +
            `&sortBy=${sortBy}` +
            `&direction=${direction}`;


        const response = await fetch(url);


        if (!response.ok) {
            throw new Error("API request failed");
        }


        const data = await response.json();


        displayStudents(data);

        updatePagination(data);

        updateStatistics(data);

        setApiStatus(true);

    }

    catch (error) {

        console.error(error);

        setApiStatus(false);

        showError();

    }

}


/* DISPLAY STUDENTS */

function displayStudents(data) {

    const table =
        document.getElementById("studentTable");


    table.innerHTML = "";


    if (data.content.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center;">
                    No students found
                </td>
            </tr>
        `;

        return;
    }


    data.content.forEach(student => {

        const row = document.createElement("tr");


        row.innerHTML = `

            <td>
                <strong>#${student.id}</strong>
            </td>

            <td>
                ${student.name}
            </td>

            <td>
                ${student.email}
            </td>

            <td>
                <span class="course">
                    ${student.course}
                </span>
            </td>

            <td>
                ${student.age}
            </td>

        `;


        table.appendChild(row);

    });

}


/* UPDATE STATISTICS */

function updateStatistics(data) {

    document.getElementById("totalStudents")
        .textContent = data.totalElements;


    document.getElementById("totalPages")
        .textContent = data.totalPages;


    document.getElementById("currentPage")
        .textContent = data.number + 1;


    document.getElementById("recordsPerPage")
        .textContent = data.size;


    const start =
        data.totalElements === 0
            ? 0
            : data.number * data.size + 1;


    const end =
        Math.min(
            (data.number + 1) * data.size,
            data.totalElements
        );


    document.getElementById("showingText")
        .textContent =
        `Showing ${start}–${end} of ${data.totalElements} students`;

}


/* PAGINATION */

function updatePagination(data) {

    totalPages = data.totalPages;


    const previous =
        document.getElementById("previousBtn");

    const next =
        document.getElementById("nextBtn");


    previous.disabled =
        data.first;


    next.disabled =
        data.last;


    const pageNumbers =
        document.getElementById("pageNumbers");


    pageNumbers.innerHTML = "";


    for (
        let i = 0;
        i < data.totalPages;
        i++
    ) {

        const button =
            document.createElement("button");


        button.className =
            "page-number";


        button.textContent =
            i + 1;


        if (i === data.number) {
            button.classList.add("active");
        }


        button.onclick = function () {

            currentPage = i;

            loadStudents();

        };


        pageNumbers.appendChild(button);

    }

}


/* NEXT PAGE */

function nextPage() {

    if (currentPage < totalPages - 1) {

        currentPage++;

        loadStudents();

    }

}


/* PREVIOUS PAGE */

function previousPage() {

    if (currentPage > 0) {

        currentPage--;

        loadStudents();

    }

}


/* API STATUS */

function setApiStatus(online) {

    const dot =
        document.getElementById("statusDot");

    const text =
        document.getElementById("statusText");


    if (online) {

        dot.style.background = "#22c55e";

        text.textContent = "API Connected";

    }

    else {

        dot.style.background = "#ef4444";

        text.textContent = "API Offline";

    }

}


/* ERROR */

function showError() {

    const table =
        document.getElementById("studentTable");


    table.innerHTML = `

        <tr>

            <td colspan="5"
                style="text-align:center; padding:40px;">

                <strong>
                    Unable to connect to Spring Boot API
                </strong>

                <br><br>

                Make sure your Spring Boot application
                is running on port 8080.

            </td>

        </tr>

    `;

}


/* SEARCH */

document
    .getElementById("searchInput")
    .addEventListener("input", function () {

        const search =
            this.value.toLowerCase();


        const rows =
            document.querySelectorAll(
                "#studentTable tr"
            );


        rows.forEach(row => {

            const text =
                row.textContent.toLowerCase();


            row.style.display =
                text.includes(search)
                    ? ""
                    : "none";

        });

    });


/* SORT CHANGE */

document
    .getElementById("sortBy")
    .addEventListener("change", function () {

        currentPage = 0;

        loadStudents();

    });


document
    .getElementById("direction")
    .addEventListener("change", function () {

        currentPage = 0;

        loadStudents();

    });


/* PAGE SIZE CHANGE */

document
    .getElementById("pageSize")
    .addEventListener("change", function () {

        currentPage = 0;

        loadStudents();

    });


/* INITIAL LOAD */

loadStudents();