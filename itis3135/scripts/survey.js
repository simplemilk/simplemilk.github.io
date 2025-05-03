// Pre-fill form with example data
document.addEventListener('DOMContentLoaded', function() {
    // Example data - you should replace this with your own information
    document.getElementById('name').value = "John Doe";
    document.getElementById('mascot').value = "Mighty Eagle";
    document.getElementById('image-caption').value = "Me at the beach";
    document.getElementById('personal-background').value = "Born and raised in Charlotte, NC. I enjoy hiking, reading, and playing chess in my free time.";
    document.getElementById('professional-background').value = "I have 2 years of experience working as a junior web developer at a local marketing agency.";
    document.getElementById('academic-background').value = "Currently pursuing a Bachelor's degree in Computer Science at UNC Charlotte.";
    document.getElementById('web-development-background').value = "I have experience with HTML, CSS, JavaScript, and have recently started learning React.";
    document.getElementById('primary-computer-platform').value = "Windows 11";
    
    // Add a default course
    document.querySelector('.course-input').value = "ITIS 3135 - Web App Design and Development";
});

// Function to add a new course input field
function addCourse() {
    const coursesContainer = document.getElementById('courses-container');
    const courseEntry = document.createElement('div');
    courseEntry.className = 'course-entry';
    
    const courseInput = document.createElement('input');
    courseInput.type = 'text';
    courseInput.name = 'courses[]';
    courseInput.className = 'course-input';
    courseInput.required = true;
    
    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'delete-course';
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function() { deleteCourse(this); };
    
    courseEntry.appendChild(courseInput);
    courseEntry.appendChild(deleteButton);
    coursesContainer.appendChild(courseEntry);
}

// Function to delete a course input field
function deleteCourse(button) {
    const courseEntries = document.querySelectorAll('.course-entry');
    
    // Make sure we always have at least one course field
    if (courseEntries.length > 1) {
        button.parentElement.remove();
    } else {
        alert("You must have at least one course!");
    }
}

// Function to validate the form before submission
function validateForm() {
    // Check if name is filled
    const name = document.getElementById('name').value.trim();
    if (!name) {
        alert("Please enter your name.");
        return false;
    }
    
    // Check if mascot is filled
    const mascot = document.getElementById('mascot').value.trim();
    if (!mascot) {
        alert("Please enter your mascot.");
        return false;
    }
    
    // Check if image is a JPG or PNG
    const imageInput = document.getElementById('image');
    if (imageInput.files.length === 0) {
        alert("Please select an image file.");
        return false;
    }
    
    const fileName = imageInput.files[0].name.toLowerCase();
    if (!fileName.endsWith('.jpg') && !fileName.endsWith('.jpeg') && !fileName.endsWith('.png')) {
        alert("Please select a JPG or PNG image.");
        return false;
    }
    
    // Check if image caption is filled
    const imageCaption = document.getElementById('image-caption').value.trim();
    if (!imageCaption) {
        alert("Please enter an image caption.");
        return false;
    }
    
    // Check if personal background is filled
    const personalBackground = document.getElementById('personal-background').value.trim();
    if (!personalBackground) {
        alert("Please enter your personal background.");
        return false;
    }
    
    // Check if professional background is filled
    const professionalBackground = document.getElementById('professional-background').value.trim();
    if (!professionalBackground) {
        alert("Please enter your professional background.");
        return false;
    }
    
    // Check if academic background is filled
    const academicBackground = document.getElementById('academic-background').value.trim();
    if (!academicBackground) {
        alert("Please enter your academic background.");
        return false;
    }
    
    // Check if web development background is filled
    const webDevelopmentBackground = document.getElementById('web-development-background').value.trim();
    if (!webDevelopmentBackground) {
        alert("Please enter your web development background.");
        return false;
    }
    
    // Check if primary computer platform is filled
    const primaryComputerPlatform = document.getElementById('primary-computer-platform').value.trim();
    if (!primaryComputerPlatform) {
        alert("Please enter your primary computer platform.");
        return false;
    }
    
    // Check if at least one course is filled
    const courseInputs = document.querySelectorAll('.course-input');
    let hasCourse = false;
    for (let i = 0; i < courseInputs.length; i++) {
        if (courseInputs[i].value.trim()) {
            hasCourse = true;
            break;
        }
    }
    
    if (!hasCourse) {
        alert("Please enter at least one course.");
        return false;
    }
    
    // Check if agreement checkbox is checked
    const agreement = document.getElementById('agreement').checked;
    if (!agreement) {
        alert("Please check the agreement box.");
        return false;
    }
    
    return true;
}

// Function to handle form submission
function submitForm(event) {
    event.preventDefault();
    
    if (!validateForm()) {
        return false;
    }
    
    // Get form values
    const name = document.getElementById('name').value;
    const mascot = document.getElementById('mascot').value;
    const imageCaption = document.getElementById('image-caption').value;
    const personalBackground = document.getElementById('personal-background').value;
    const professionalBackground = document.getElementById('professional-background').value;
    const academicBackground = document.getElementById('academic-background').value;
    const webDevelopmentBackground = document.getElementById('web-development-background').value;
    const primaryComputerPlatform = document.getElementById('primary-computer-platform').value;
    
    // Get courses
    const courseInputs = document.querySelectorAll('.course-input');
    const courses = Array.from(courseInputs).map(input => input.value.trim()).filter(Boolean);
    
    // Get optional fields
    const funnyThing = document.getElementById('funny-thing').value;
    const anythingElse = document.getElementById('anything-else').value;
    
    // Get image and convert to data URL for display
    const imageInput = document.getElementById('image');
    const imageFile = imageInput.files[0];
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const imageDataUrl = e.target.result;
        
        // Generate the introduction HTML
        const introHTML = `
            <div class="intro-content">
                <h2>${name}'s Introduction</h2>
                
                <div class="intro-image">
                    <img src="${imageDataUrl}" alt="${imageCaption}" style="max-width: 300px;">
                    <p class="image-caption">${imageCaption}</p>
                </div>
                
                <div class="intro-section">
                    <h3>${name} - ${mascot}</h3>
                </div>
                
                <div class="intro-section">
                    <h3>Personal Background</h3>
                    <p>${personalBackground}</p>
                </div>
                
                <div class="intro-section">
                    <h3>Professional Background</h3>
                    <p>${professionalBackground}</p>
                </div>
                
                <div class="intro-section">
                    <h3>Academic Background</h3>
                    <p>${academicBackground}</p>
                </div>
                
                <div class="intro-section">
                    <h3>Background in Web Development</h3>
                    <p>${webDevelopmentBackground}</p>
                </div>
                
                <div class="intro-section">
                    <h3>Primary Computer Platform</h3>
                    <p>${primaryComputerPlatform}</p>
                </div>
                
                <div class="intro-section">
                    <h3>Courses Currently Taking</h3>
                    <ul>
                        ${courses.map(course => `<li>${course}</li>`).join('')}
                    </ul>
                </div>
                
                ${funnyThing ? `
                <div class="intro-section">
                    <h3>Something Funny About Me</h3>
                    <p>${funnyThing}</p>
                </div>
                ` : ''}
                
                ${anythingElse ? `
                <div class="intro-section">
                    <h3>Additional Information</h3>
                    <p>${anythingElse}</p>
                </div>
                ` : ''}
            </div>
        `;
        
        // Display the introduction
        document.getElementById('form-container').style.display = 'none';
        const introDisplay = document.getElementById('intro-display');
        introDisplay.innerHTML = introHTML;
        introDisplay.style.display = 'block';
        document.getElementById('reset-container').style.display = 'block';
    };
    
    reader.readAsDataURL(imageFile);
    
    return false;
}

// Function to reset the form
function resetForm() {
    document.getElementById('intro-form').reset();
    
    // Make sure we have just one course field
    const coursesContainer = document.getElementById('courses-container');
    const courseEntries = document.querySelectorAll('.course-entry');
    
    // Remove all course entries except the first one
    for (let i = 1; i < courseEntries.length; i++) {
        courseEntries[i].remove();
    }
    
    // Clear the first course entry
    if (courseEntries.length > 0) {
        courseEntries[0].querySelector('.course-input').value = '';
    }
}

// Function to reset the display and show the form again
function resetDisplay() {
    // Reset form fields
    resetForm();
    
    // Show form, hide intro display
    document.getElementById('form-container').style.display = 'block';
    document.getElementById('intro-display').style.display = 'none';
    document.getElementById('reset-container').style.display = 'none';
    
    // Scroll back to top
    window.scrollTo(0, 0);
}