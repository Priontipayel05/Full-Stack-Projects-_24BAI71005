const table =
    document.getElementById("studentTable");

const studentCount =
    document.getElementById("studentCount");

const executionTime =
    document.getElementById("executionTime");

const cacheStatus =
    document.getElementById("cacheStatus");


function displayStudents(students) {

    table.innerHTML = "";

    students.forEach(student => {

        const row =
            document.createElement("tr");

        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.course}</td>
            <td>${student.age}</td>
            <td>${student.departmentName}</td>
        `;

        table.appendChild(row);
    });

    studentCount.textContent =
        students.length;
}


async function loadData(url) {

    const start =
        performance.now();

    try {

        const response =
            await fetch(url);

        if (!response.ok) {

            throw new Error(
                "API request failed"
            );
        }

        const students =
            await response.json();

        const end =
            performance.now();

        displayStudents(students);

        executionTime.textContent =
            "Execution time: " +
            (end - start).toFixed(2) +
            " ms";

    } catch (error) {

        console.error(error);

        executionTime.textContent =
            "Error loading data";
    }
}


function loadNormal() {

    loadData(
        "/api/students/normal"
    );
}


function loadOptimized() {

    loadData(
        "/api/students/optimized"
    );
}


function loadNative() {

    loadData(
        "/api/students/native"
    );
}


async function testCache() {

    const id =
        document.getElementById(
            "studentId"
        ).value;

    if (!id) {

        alert(
            "Please enter a student ID"
        );

        return;
    }

    const start =
        performance.now();

    try {

        const response =
            await fetch(
                "/api/students/" + id
            );

        if (!response.ok) {

            throw new Error(
                "Student not found"
            );
        }

        const student =
            await response.json();

        const end =
            performance.now();

        document.getElementById(
            "cacheResult"
        ).innerHTML = `

            <strong>
                ${student.name}
            </strong>

            <br>

            Email:
            ${student.email}

            <br>

            Course:
            ${student.course}

            <br>

            Department:
            ${student.departmentName}

            <br>

            Response Time:
            ${(end - start).toFixed(2)} ms
        `;

        cacheStatus.textContent =
            "Active";

    } catch (error) {

        document.getElementById(
            "cacheResult"
        ).textContent =
            error.message;
    }
}


async function clearCache() {

    try {

        const response =
            await fetch(
                "/api/students/cache",
                {
                    method: "DELETE"
                }
            );

        const message =
            await response.text();

        document.getElementById(
            "cacheResult"
        ).textContent =
            message;

        cacheStatus.textContent =
            "Cleared";

    } catch (error) {

        console.error(error);
    }
}


window.onload = function () {

    loadOptimized();

};