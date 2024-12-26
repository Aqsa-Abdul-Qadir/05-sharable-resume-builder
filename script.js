var _a, _b;
// Get references to the form and display areas
var form = document.getElementById('resume-form');
var resumeDisplayElement = document.getElementById('generated-resume');
var shareableLinkContainer = document.getElementById('sharable-link-container');
var shareableLinkElement = document.getElementById('Shareable-link');
var downloadPdfButton = document.getElementById('download-pdf');
// Handle form submission
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent page reload
    // Collect input values
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    // Education section
    var educationEntries = Array.from(document.querySelectorAll('#education-section .education-entry')).map(function (entry) {
        var degree = entry.querySelector('[name="degree"]').value;
        var institution = entry.querySelector('[name="institution"]').value;
        var year = entry.querySelector('[name="year"]').value;
        return { degree: degree, institution: institution, year: year };
    });
    // Skills
    var skills = document.getElementById('skills').value.split(',');
    // Work experience
    var workEntries = Array.from(document.querySelectorAll('#work-section .work-entry')).map(function (entry) {
        var jobTitle = entry.querySelector('[name="job-title"]').value;
        var company = entry.querySelector('[name="company"]').value;
        var duration = entry.querySelector('[name="duration"]').value;
        return { jobTitle: jobTitle, company: company, duration: duration };
    });
    // Save form data in localStorage
    var resumeData = { username: username, email: email, phone: phone, educationEntries: educationEntries, skills: skills, workEntries: workEntries };
    localStorage.setItem(username, JSON.stringify(resumeData));
    // Generate the resume content dynamically
    var educationHTML = educationEntries.map(function (_a) {
        var degree = _a.degree, institution = _a.institution, year = _a.year;
        return "<p><b>".concat(degree, "</b> - ").concat(institution, " (").concat(year, ")</p>");
    }).join('');
    var workHTML = workEntries.map(function (_a) {
        var jobTitle = _a.jobTitle, company = _a.company, duration = _a.duration;
        return "<p><b>".concat(jobTitle, "</b> at ").concat(company, " (").concat(duration, ")</p>");
    }).join('');
    var skillsHTML = skills.map(function (skill) { return "<span>".concat(skill.trim(), "</span>"); }).join(', ');
    var resumeHTML = "\n        <h2>Editable Resume</h2>\n        <h3>Personal Information</h3>\n        <p><b>Username:</b> <span contenteditable=\"true\">".concat(username, "</span></p>\n        <p><b>Email:</b> <span contenteditable=\"true\">").concat(email, "</span></p>\n        <p><b>Phone:</b> <span contenteditable=\"true\">").concat(phone, "</span></p>\n        <h3>Education</h3>\n        ").concat(educationHTML, "\n        <h3>Work Experience</h3>\n        ").concat(workHTML, "\n        <h3>Skills</h3>\n        <p>").concat(skillsHTML, "</p>\n    ");
    // Display the generated resume
    resumeDisplayElement.innerHTML = resumeHTML;
    // Generate a shareable URL with the username
    var shareableURL = "".concat(window.location.origin, "?username=").concat(encodeURIComponent(username));
    // Display the shareable link
    shareableLinkContainer.style.display = 'block';
    shareableLinkElement.href = shareableURL;
    shareableLinkElement.textContent = shareableURL;
});
// Handle adding more education entries
(_a = document.getElementById('add-education')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
    var educationSection = document.getElementById('education-section');
    var newEntry = document.createElement('div');
    newEntry.classList.add('education-entry');
    newEntry.innerHTML = "\n        <label for=\"degree\">Degree:</label>\n        <input type=\"text\" name=\"degree\" placeholder=\"Enter Your Degree\" required>\n        <label for=\"institution\">Institution:</label>\n        <input type=\"text\" name=\"institution\" placeholder=\"Enter Your Institution\" required>\n        <label for=\"year\">Year:</label>\n        <input type=\"text\" name=\"year\" placeholder=\"Enter the Year\" required>\n    ";
    educationSection.appendChild(newEntry);
});
// Handle adding more work experience entries
(_b = document.getElementById('add-work')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
    var workSection = document.getElementById('work-section');
    var newEntry = document.createElement('div');
    newEntry.classList.add('work-entry');
    newEntry.innerHTML = "\n        <label for=\"job-title\">Job Title:</label>\n        <input type=\"text\" name=\"job-title\" placeholder=\"Enter Your Job Title\" required>\n        <label for=\"company\">Company:</label>\n        <input type=\"text\" name=\"company\" placeholder=\"Enter Your Company\" required>\n        <label for=\"duration\">Duration:</label>\n        <input type=\"text\" name=\"duration\" placeholder=\"Enter the Duration\" required>\n    ";
    workSection.appendChild(newEntry);
});
// Handle PDF download
downloadPdfButton.addEventListener('click', function () {
    window.print(); // This will open the print dialog for saving as a PDF
});
// Prefill the form based on the username in the URL
window.addEventListener('DOMContentLoaded', function () {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get('username');
    if (username) {
        var savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            var _a = JSON.parse(savedResumeData), email = _a.email, phone = _a.phone, educationEntries = _a.educationEntries, skills = _a.skills, workEntries = _a.workEntries;
            document.getElementById('username').value = username;
            document.getElementById('email').value = email;
            document.getElementById('phone').value = phone;
            // Populate education entries
            var educationSection_1 = document.getElementById('education-section');
            educationSection_1.innerHTML = '';
            educationEntries.forEach(function (_a) {
                var degree = _a.degree, institution = _a.institution, year = _a.year;
                var entry = document.createElement('div');
                entry.classList.add('education-entry');
                entry.innerHTML = "\n                    <label for=\"degree\">Degree:</label>\n                    <input type=\"text\" name=\"degree\" value=\"".concat(degree, "\" required>\n                    <label for=\"institution\">Institution:</label>\n                    <input type=\"text\" name=\"institution\" value=\"").concat(institution, "\" required>\n                    <label for=\"year\">Year:</label>\n                    <input type=\"text\" name=\"year\" value=\"").concat(year, "\" required>\n                ");
                educationSection_1.appendChild(entry);
            });
            // Populate work entries
            var workSection_1 = document.getElementById('work-section');
            workSection_1.innerHTML = '';
            workEntries.forEach(function (_a) {
                var jobTitle = _a.jobTitle, company = _a.company, duration = _a.duration;
                var entry = document.createElement('div');
                entry.classList.add('work-entry');
                entry.innerHTML = "\n                    <label for=\"job-title\">Job Title:</label>\n                    <input type=\"text\" name=\"job-title\" value=\"".concat(jobTitle, "\" required>\n                    <label for=\"company\">Company:</label>\n                    <input type=\"text\" name=\"company\" value=\"").concat(company, "\" required>\n                    <label for=\"duration\">Duration:</label>\n                    <input type=\"text\" name=\"duration\" value=\"").concat(duration, "\" required>\n                ");
                workSection_1.appendChild(entry);
            });
            // Populate skills
            document.getElementById('skills').value = skills.join(', ');
        }
    }
});
