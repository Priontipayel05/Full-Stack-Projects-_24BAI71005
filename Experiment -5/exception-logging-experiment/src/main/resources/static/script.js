const API_URL = "/api/students";

const form =
    document.getElementById("studentForm");

const tableBody =
    document.getElementById("studentTableBody");

const message =
    document.getElementById("message");


// Load all students
async function loadStudents() {

    try {

        const response =
            await fetch(API_URL);

        const data =
            await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || "Request failed"
            );
        }

        displayStudents(data);

    } catch (error) {

        showMessage(
            error.message,
            true
        );
    }
}


// Display students
function displayStudents(students) {

    tableBody.innerHTML = "";

    students.forEach(student => {

        const row =
            document.createElement("tr");

        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.course}</td>
            <td>${student.age}</td>
        `;

        tableBody.appendChild(row);

    });
}


// Add student
form.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();

        const student = {

            name:
                document.getElementById("name").value,

            email:
                document.getElementById("email").value,

            course:
                document.getElementById("course").value,

            age:
                parseInt(
                    document.getElementById("age").value
                )
        };


        try {

            const response =
                await fetch(
                    API_URL,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(student)
                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message
                );
            }


            showMessage(
                "Student created successfully",
                false
            );


            form.reset();

            loadStudents();


        } catch (error) {

            showMessage(
                error.message,
                true
            );
        }

    }
);


// Search student
document
    .getElementById("searchBtn")
    .addEventListener(
        "click",
        async function() {

            const id =
                document.getElementById(
                    "studentId"
                ).value;


            if (!id) {

                showMessage(
                    "Please enter a student ID",
                    true
                );

                return;
            }


            try {

                const response =
                    await fetch(
                        `${API_URL}/${id}`
                    );


                const data =
                    await response.json();


                if (!response.ok) {

                    throw new Error(
                        `${data.message} | Correlation ID: ${data.correlationId}`
                    );
                }


                displayStudents(
                    [data]
                );


                showMessage(
                    "Student found successfully",
                    false
                );


            } catch (error) {

                showMessage(
                    error.message,
                    true
                );
            }

        }
);


// Show all
document
    .getElementById("allBtn")
    .addEventListener(
        "click",
        loadStudents
    );


// Display message
function showMessage(
    text,
    isError
) {

    message.textContent = text;

    message.style.display =
        "block";

    message.style.color =
        isError
            ? "#dc2626"
            : "#15803d";

    setTimeout(
        () => {
            message.style.display =
                "none";
        },
        5000
    );
}


// Initial load
loadStudents();