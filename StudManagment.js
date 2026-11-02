let studentForm = document.getElementById("studentForm");

let nameInput = document.getElementById("name");

let ageInput = document.getElementById("age");

let departmentInput = document.getElementById("department");

let markInput = document.getElementById("mark");

let studentList = document.getElementById("studentList");

let searchInput = document.getElementById("searchInput");

let searchButton = document.getElementById("searchButton");


// to store the student
let students = JSON.parse(localStorage.getItem("students")) || [];


// to add students
studentForm.addEventListener("submit", function(event) {
    
    event.preventDefault();
    
    let student = {
        
        id: Date.now(),
        
        name: nameInput.value.trim(),
        
        age: ageInput.value,
        
        department: departmentInput.value.trim(),
        
        mark: Number(markInput.value)
        
    };
    
    
    // to add student to array
    students.push(student);
    
    
    // save to local storage
    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );
    
    
    // to display student
    displayStudent();
    
    
    // to clear form
    studentForm.reset();
    
});


// to display students
function displayStudent(list = students) {
    
    studentList.innerHTML = "";
    
    list.forEach(function(student) {
        
        // student card
        let card = document.createElement("div");
        
        card.className = "student-card";
        
        
        // student name
        let namebutton = document.createElement("button");
        
        namebutton.textContent = student.name;
        
        
        // student information
        let info = document.createElement("div");
        
        info.className = "student-info";
        
        info.style.display = "none";
        
        
        // pass or fail
        let status = student.mark >= 50 ? "pass" : "fail";
        
        
        // information html
        info.innerHTML = 
            `<p>Age: ${student.age}</p>

            <p>department: ${student.department}</p>

            <p>mark: ${student.mark}</p>

            <p>status: ${status}</p>

            <button onclick="editStudent(${student.id})">
                Edit
            </button>

            <button onclick="deleteStudent(${student.id})">
                Delete
            </button>

            <hr>`
        ;
        
        
        // click students name
        namebutton.addEventListener("click", function() {
            
            if (info.style.display === "none") {
                
                info.style.display = "block";
                
            }
            
            else {
info.style.display = "none";
                
            }
            
        });
        
        
        // add elements to card
        card.appendChild(namebutton);
        
        card.appendChild(info);
        
        
        // add card to page
        studentList.appendChild(card);
        
    });
    
}


// to delete student
function deleteStudent(id) {
    
    students = students.filter(function(student) {
        
        return student.id != id;
        
    });
    
    
    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );
    
    
    displayStudent();
    
}


// to edit student
function editStudent(id) {
    
    let student = students.find(function(student) {
        return student.id === id;
        
    });
    
    
    nameInput.value = student.name;
    
    ageInput.value = student.age;
    
    departmentInput.value = student.department;
    
    markInput.value = student.mark;
    
    
    students = students.filter(function(student) {
        
        return student.id !== id;
        
    });
    
    
    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );
    
    
    displayStudent();
    
}


// to search student
searchButton.addEventListener("click", function() {
    
    let searchText =
        searchInput.value.toLowerCase();
    
    
    let filteredText = students.filter(function(student) {
        
        return student.name
            .toLowerCase()
            .includes(searchText);
        
    });
    
    
    displayStudent(filteredText);
    
});


// display saved students
displayStudent();