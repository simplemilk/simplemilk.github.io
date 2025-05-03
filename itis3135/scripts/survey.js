// Fill the form with example data when the page loads
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('name').value = "John Doe";
    document.getElementById('mascot').value = "Mighty Eagle";
    document.getElementById('image-caption').value = "Me at the beach";
    document.getElementById('personal-background').value = "Born and raised in Charlotte, NC. I enjoy hiking, reading, and playing chess in my free time.";
    document.getElementById('professional-background').value = "I have 2 years of experience working as a junior web developer at a local marketing agency.";
    document.getElementById('academic-background').value = "Currently pursuing a Bachelor's degree in Computer Science at UNC Charlotte.";
    document.getElementById('web-development-background').value = "I have experience with HTML, CSS, JavaScript, and have recently started learning React.";
    document.getElementById('primary-computer-platform').value = "Windows 11";
    document.querySelector('.course-input').value = "ITIS 3135 - Web App Design and Development";
});

function deleteCourse(button) {

    var courseEntries = document.querySelectorAll('.course-entry');    
    if (courseEntries.length > 1) {
        button.parentElement.remove();
    } else {
        alert("You must have at least one course!");
    }
}

function addCourse() {
    var coursesContainer = document.getElementById('courses-container');
    
    var courseEntry = document.createElement('div');
    courseEntry.className = 'course-entry';
    
    var courseInput = document.createElement('input');
    courseInput.type = 'text';
    courseInput.name = 'courses[]';
    courseInput.className = 'course-input';
    courseInput.required = true;
    
    var deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'delete-course';
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function() { deleteCourse(this); };
    
    courseEntry.appendChild(courseInput);
    courseEntry.appendChild(deleteButton);    
    coursesContainer.appendChild(courseEntry);
}


// Check if the form is filled out correctly
function validateForm() {

    // Check if image is a JPG or PNG
    var imageInput = document.getElementById('image');
    if (imageInput.files.length === 0) {
        alert("Please select an image file.");
        return false;
    }
    
    var fileName = imageInput.files[0].name.toLowerCase();
    if (!fileName.endsWith('.jpg') && !fileName.endsWith('.jpeg') && !fileName.endsWith('.png')) {
        alert("Please select a JPG or PNG image.");
        return false;
    }
    
    var agreement = document.getElementById('agreement').checked;
    if (!agreement) {
        alert("Please check the agreement box.");
        return false;
    }
    
    return true;
}

// Handle form submission
function submitForm(event) {

    event.preventDefault();
    
    if (!validateForm()) {
        return false;
    }
    
    var name = document.getElementById('name').value;
    var mascot = document.getElementById('mascot').value;
    var imageCaption = document.getElementById('image-caption').value;
    var personalBackground = document.getElementById('personal-background').value;
    var professionalBackground = document.getElementById('professional-background').value;
    var academicBackground = document.getElementById('academic-background').value;
    var webDevelopmentBackground = document.getElementById('web-development-background').value;
    var primaryComputerPlatform = document.getElementById('primary-computer-platform').value;
    
    var courseInputs = document.querySelectorAll('.course-input');
    var courses = [];
    for (var i = 0; i < courseInputs.length; i++) {
        var courseValue = courseInputs[i].value.trim();
        if (courseValue) {
            courses.push(courseValue);
        }
    }
    
    var funnyThing = document.getElementById('funny-thing').value;
    var anythingElse = document.getElementById('anything-else').value;
    
    var imageInput = document.getElementById('image');
    var imageFile = imageInput.files[0];
    
    var reader = new FileReader();
    
    reader.onload = function(e) {
        var imageDataUrl = e.target.result;
        
        var introHTML = '<div class="intro-content">';
        introHTML += '<h2>' + name + '\'s Introduction</h2>';
        
        introHTML += '<div class="intro-image">';
        introHTML += '<img src="' + imageDataUrl + '" alt="' + imageCaption + '" style="max-width: 300px;">';
        introHTML += '<p class="image-caption">' + imageCaption + '</p>';
        introHTML += '</div>';
        
        introHTML += '<div class="intro-section">';
        introHTML += '<h3>' + name + ' - ' + mascot + '</h3>';
        introHTML += '</div>';
        
        introHTML += '<div class="intro-section">';
        introHTML += '<h3>Personal Background</h3>';
        introHTML += '<p>' + personalBackground + '</p>';
        introHTML += '</div>';
        
        introHTML += '<div class="intro-section">';
        introHTML += '<h3>Professional Background</h3>';
        introHTML += '<p>' + professionalBackground + '</p>';
        introHTML += '</div>';
        
        introHTML += '<div class="intro-section">';
        introHTML += '<h3>Academic Background</h3>';
        introHTML += '<p>' + academicBackground + '</p>';
        introHTML += '</div>';
        
        introHTML += '<div class="intro-section">';
        introHTML += '<h3>Background in Web Development</h3>';
        introHTML += '<p>' + webDevelopmentBackground + '</p>';
        introHTML += '</div>';
        
        introHTML += '<div class="intro-section">';
        introHTML += '<h3>Primary Computer Platform</h3>';
        introHTML += '<p>' + primaryComputerPlatform + '</p>';
        introHTML += '</div>';
        
        introHTML += '<div class="intro-section">';
        introHTML += '<h3>Courses Currently Taking</h3>';
        introHTML += '<ul>';
        for (var i = 0; i < courses.length; i++) {
            introHTML += '<li>' + courses[i] + '</li>';
        }
        introHTML += '</ul>';
        introHTML += '</div>';
        
        if (funnyThing) {
            introHTML += '<div class="intro-section">';
            introHTML += '<h3>Something Funny About Me</h3>';
            introHTML += '<p>' + funnyThing + '</p>';
            introHTML += '</div>';
        }
        
        if (anythingElse) {
            introHTML += '<div class="intro-section">';
            introHTML += '<h3>Additional Information</h3>';
            introHTML += '<p>' + anythingElse + '</p>';
            introHTML += '</div>';
        }
        
        introHTML += '</div>';
        
        document.getElementById('form-container').style.display = 'none';
        var introDisplay = document.getElementById('intro-display');
        introDisplay.innerHTML = introHTML;
        introDisplay.style.display = 'block';
        document.getElementById('reset-container').style.display = 'block';
    };
    
    reader.readAsDataURL(imageFile);
    
    return false;
}

// Reset the form to its initial state
function resetForm() {

    document.getElementById('intro-form').reset();    
    var courseEntries = document.querySelectorAll('.course-entry');
    for (var i = 1; i < courseEntries.length; i++) {
        courseEntries[i].remove();
    }
    if (courseEntries.length > 0) {
        courseEntries[0].querySelector('.course-input').value = '';
    }
}

function resetDisplay() {
    resetForm();
    
    document.getElementById('form-container').style.display = 'block';
    document.getElementById('intro-display').style.display = 'none';
    document.getElementById('reset-container').style.display = 'none';    
}