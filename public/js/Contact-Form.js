document.getElementById("Contact-Form").onsubmit = () => {

    let isValid = true;

    //Clears all errors
    clearErrors();

    //Validates the users name
    let fname = document.getElementById("fname").value.trim();
    if(fname === "") {
        document.getElementById("err-fname").style.display = "block";
        isValid = false;
    }
    let lname = document.getElementById("lname").value.trim();
    if(lname === "") {
        document.getElementById("err-lname").style.display = "block";
        isValid = false;
    }

    //Validates the user job title
    let job = document.getElementById("job-title").value.trim();
    if(job === "") {
        document.getElementById("err-job").style.display = "block";
        isValid = false;
    }

    //Validates the users company
    let company = document.getElementById("company").value.trim();
    if(company === "") {
        document.getElementById("err-company").style.display = "block";
        isValid = false;
    }
    //Validates the users LinkeIn
    let linkedin = document.getElementById("linkedin").value.trim();
    if(linkedin === "") {
        document.getElementById("err-linkedin").style.display = "block";
        isValid = false;
    }
    //Validates the users email address
    let email = document.getElementById("email").value.trim();
    if(email === "") {
        document.getElementById("err-email").style.display = "block";
        isValid = false;
    }
    if(!email.includes("@")){ //Checks for @
        document.getElementById("err-symbol").style.display = "block";
        isValid = false;
    }

    
    //Validates the users flavor selection
    let meeting = document.getElementById("meeting").value;
    let other = document.getElementById("other").value.trim();
    if(meeting == "Select") {
        document.getElementById("err-meeting").style.display = "block";
        isValid = false;
    }
    if(meeting == "Other" && other === "") {
        document.getElementById("err-other").style.display = "block";
    }
    
    
    //Validates the users cone selection
    let methodSelected = false;
    let methodButtons = document.getElementsByName("format");
    for (let i=0; i<methodButtons.length; i++) {
        if(methodButtons[i].checked) {
            methodSelected = true;
        }
    }
    if (!methodSelected) {
        document.getElementById("err-format").style.display = "block";
        isValid = false;
    }
    
    return isValid;
};

function clearErrors() {
    let errors = document.getElementsByClassName("err");
    for (let i=0; i < errors.length; i++) {
        errors[i].style.display = "none";
    }
}