// Get references to the form and display areas
const form = document.getElementById('resume-form') as HTMLFormElement;
const resumeDisplayElement = document.getElementById('generated-resume') as HTMLDivElement;
const shareableLinkContainer = document.getElementById('sharable-link-container') as HTMLDivElement;
const shareableLinkElement = document.getElementById('Shareable-link') as HTMLAnchorElement;
const downloadPdfButton = document.getElementById('download-pdf') as HTMLButtonElement;

// Handle form submission
form.addEventListener('submit', (event: Event) => {
    event.preventDefault(); // Prevent page reload

    // Collect input values
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;

    // Education section
    const educationEntries = Array.from(
        document.querySelectorAll('#education-section .education-entry')
    ).map(entry => {
        const degree = (entry.querySelector('[name="degree"]') as HTMLInputElement).value;
        const institution = (entry.querySelector('[name="institution"]') as HTMLInputElement).value;
        const year = (entry.querySelector('[name="year"]') as HTMLInputElement).value;
        return { degree, institution, year };
    });

    // Skills
    const skills = (document.getElementById('skills') as HTMLInputElement).value.split(',');

    // Work experience
    const workEntries = Array.from(
        document.querySelectorAll('#work-section .work-entry')
    ).map(entry => {
        const jobTitle = (entry.querySelector('[name="job-title"]') as HTMLInputElement).value;
        const company = (entry.querySelector('[name="company"]') as HTMLInputElement).value;
        const duration = (entry.querySelector('[name="duration"]') as HTMLInputElement).value;
        return { jobTitle, company, duration };
    });

    // Save form data in localStorage
    const resumeData = { username, email, phone, educationEntries, skills, workEntries };
    localStorage.setItem(username, JSON.stringify(resumeData));

    // Generate the resume content dynamically
    const educationHTML = educationEntries.map(
        ({ degree, institution, year }) =>
            `<p><b>${degree}</b> - ${institution} (${year})</p>`
    ).join('');

    const workHTML = workEntries.map(
        ({ jobTitle, company, duration }) =>
            `<p><b>${jobTitle}</b> at ${company} (${duration})</p>`
    ).join('');

    const skillsHTML = skills.map(skill => `<span>${skill.trim()}</span>`).join(', ');

    const resumeHTML = `
        <h2>Shareable & Editable Resume</h2>
        <h3>Personal Information</h3>
        <p><b>Username:</b> <span contenteditable="true">${username}</span></p>
        <p><b>Email:</b> <span contenteditable="true">${email}</span></p>
        <p><b>Phone:</b> <span contenteditable="true">${phone}</span></p>
        <h3>Education</h3>
        ${educationHTML}
        <h3>Work Experience</h3>
        ${workHTML}
        <h3>Skills</h3>
        <p>${skillsHTML}</p>
    `;

    // Display the generated resume
    resumeDisplayElement.innerHTML = resumeHTML;

    // Generate a shareable URL with the username
    const shareableURL = `${window.location.origin}?username=${encodeURIComponent(username)}`;

    // Display the shareable link
    shareableLinkContainer.style.display = 'block';
    shareableLinkElement.href = shareableURL;
    shareableLinkElement.textContent = shareableURL;
});

// Handle adding more education entries
document.getElementById('add-education')?.addEventListener('click', () => {
    const educationSection = document.getElementById('education-section') as HTMLDivElement;
    const newEntry = document.createElement('div');
    newEntry.classList.add('education-entry');
    newEntry.innerHTML = `
        <label for="degree">Degree:</label>
        <input type="text" name="degree" placeholder="Enter Your Degree" required>
        <label for="institution">Institution:</label>
        <input type="text" name="institution" placeholder="Enter Your Institution" required>
        <label for="year">Year:</label>
        <input type="text" name="year" placeholder="Enter the Year" required>
    `;
    educationSection.appendChild(newEntry);
});

// Handle adding more work experience entries
document.getElementById('add-work')?.addEventListener('click', () => {
    const workSection = document.getElementById('work-section') as HTMLDivElement;
    const newEntry = document.createElement('div');
    newEntry.classList.add('work-entry');
    newEntry.innerHTML = `
        <label for="job-title">Job Title:</label>
        <input type="text" name="job-title" placeholder="Enter Your Job Title" required>
        <label for="company">Company:</label>
        <input type="text" name="company" placeholder="Enter Your Company" required>
        <label for="duration">Duration:</label>
        <input type="text" name="duration" placeholder="Enter the Duration" required>
    `;
    workSection.appendChild(newEntry);
});

// Handle PDF download
downloadPdfButton.addEventListener('click', () => {
    window.print(); // This will open the print dialog for saving as a PDF
});

// Prefill the form based on the username in the URL
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');
    if (username) {
        const savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            const { email, phone, educationEntries, skills, workEntries } = JSON.parse(savedResumeData);

            (document.getElementById('username') as HTMLInputElement).value = username;
            (document.getElementById('email') as HTMLInputElement).value = email;
            (document.getElementById('phone') as HTMLInputElement).value = phone;

            // Populate education entries
            const educationSection = document.getElementById('education-section') as HTMLDivElement;
            educationSection.innerHTML = '';
            educationEntries.forEach(({ degree, institution, year }: any) => {
                const entry = document.createElement('div');
                entry.classList.add('education-entry');
                entry.innerHTML = `
                    <label for="degree">Degree:</label>
                    <input type="text" name="degree" value="${degree}" required>
                    <label for="institution">Institution:</label>
                    <input type="text" name="institution" value="${institution}" required>
                    <label for="year">Year:</label>
                    <input type="text" name="year" value="${year}" required>
                `;
                educationSection.appendChild(entry);
            });

            // Populate work entries
            const workSection = document.getElementById('work-section') as HTMLDivElement;
            workSection.innerHTML = '';
            workEntries.forEach(({ jobTitle, company, duration }: any) => {
                const entry = document.createElement('div');
                entry.classList.add('work-entry');
                entry.innerHTML = `
                    <label for="job-title">Job Title:</label>
                    <input type="text" name="job-title" value="${jobTitle}" required>
                    <label for="company">Company:</label>
                    <input type="text" name="company" value="${company}" required>
                    <label for="duration">Duration:</label>
                    <input type="text" name="duration" value="${duration}" required>
                `;
                workSection.appendChild(entry);
            });

            // Populate skills
            (document.getElementById('skills') as HTMLInputElement).value = skills.join(', ');
        }
    }
});

