// Add smooth scrolling for internal navigation
document.addEventListener('DOMContentLoaded', function() {
    // Create dynamic table of contents
    createTableOfContents();
    
    // Add smooth scrolling
    addSmoothScrolling();
    
    // Add interactive elements
    addInteractiveFeatures();
});

function createTableOfContents() {
    const headings = document.querySelectorAll('h2, h3');
    const tocContainer = document.createElement('div');
    tocContainer.id = 'table-of-contents';
    tocContainer.innerHTML = '<h3>Table of Contents</h3>';
    
    const tocList = document.createElement('ul');
    headings.forEach(heading => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = `#${heading.id}`;
        link.textContent = heading.textContent;
        link.addEventListener('click', smoothScrollTo);
        listItem.appendChild(link);
        tocList.appendChild(listItem);
    });
    
    tocContainer.appendChild(tocList);
    document.querySelector('#static-body').insertBefore(tocContainer, document.querySelector('h1').nextSibling);
}

function smoothScrollTo(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
    }
}

function addInteractiveFeatures() {
    // Add image zoom functionality
    addImageZoom();
    
    // Add expandable sections
    addExpandableSections();
    
    // Add temperature data simulator
    addTemperatureSimulator();
}

function addImageZoom() {
    const images = document.querySelectorAll('.graph');
    images.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            const modal = createImageModal(this.src, this.alt);
            document.body.appendChild(modal);
        });
    });
}

function createImageModal(src, alt) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.8); display: flex; justify-content: center;
        align-items: center; z-index: 1000; cursor: pointer;
    `;
    
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.style.maxWidth = '90%';
    img.style.maxHeight = '90%';
    
    modal.appendChild(img);
    modal.addEventListener('click', () => modal.remove());
    
    return modal;
}

function addExpandableSections() {
    const sections = document.querySelectorAll('h3');
    sections.forEach(section => {
        const content = getContentAfterHeading(section);
        if (content.length > 0) {
            const toggleBtn = document.createElement('button');
            toggleBtn.textContent = '▼';
            toggleBtn.style.marginLeft = '10px';
            toggleBtn.addEventListener('click', () => toggleSection(content, toggleBtn));
            section.appendChild(toggleBtn);
        }
    });
}

function getContentAfterHeading(heading) {
    const content = [];
    let nextElement = heading.nextElementSibling;
    
    while (nextElement && !['H1', 'H2', 'H3'].includes(nextElement.tagName)) {
        content.push(nextElement);
        nextElement = nextElement.nextElementSibling;
    }
    
    return content;
}

function toggleSection(content, button) {
    const isHidden = content[0].style.display === 'none';
    content.forEach(element => {
        element.style.display = isHidden ? 'block' : 'none';
    });
    button.textContent = isHidden ? '▼' : '▶';
}

function addTemperatureSimulator() {
    const simulatorContainer = document.createElement('div');
    simulatorContainer.innerHTML = `
        <h3>Interactive Temperature Simulator</h3>
        <div id="temp-controls">
            <label>Region: 
                <select id="region-select">
                    <option value="north">Northern Reef</option>
                    <option value="south">Southern Reef</option>
                </select>
            </label>
            <label>Year: 
                <input type="range" id="year-slider" min="2020" max="2025" value="2023">
                <span id="year-display">2023</span>
            </label>
            <button id="animate-btn">Animate Changes</button>
        </div>
        <div id="temp-display">
            <p>Current Temperature: <span id="temp-value">26.5°C</span></p>
            <div id="temp-bar">
                <div id="temp-fill"></div>
            </div>
            <p id="bleaching-risk">Risk Level: <span id="risk-level">Moderate</span></p>
        </div>
    `;
    
    const conclusionSection = document.getElementById('conclusion');
    conclusionSection.parentNode.insertBefore(simulatorContainer, conclusionSection);
    
    setupTemperatureControls();
}

function setupTemperatureControls() {
    const regionSelect = document.getElementById('region-select');
    const yearSlider = document.getElementById('year-slider');
    const yearDisplay = document.getElementById('year-display');
    const animateBtn = document.getElementById('animate-btn');
    
    const tempData = {
        north: { 2020: 28.2, 2021: 29.1, 2022: 28.8, 2023: 30.1, 2024: 29.5, 2025: 31.2 },
        south: { 2020: 25.1, 2021: 25.8, 2022: 26.2, 2023: 26.5, 2024: 27.1, 2025: 27.8 }
    };
    
    function updateTemperature() {
        const region = regionSelect.value;
        const year = yearSlider.value;
        const temp = tempData[region][year];
        
        yearDisplay.textContent = year;
        document.getElementById('temp-value').textContent = `${temp}°C`;
        
        const tempFill = document.getElementById('temp-fill');
        const percentage = Math.min((temp - 20) / 15 * 100, 100);
        tempFill.style.width = `${percentage}%`;
        tempFill.style.backgroundColor = temp > 29 ? '#ff4444' : temp > 27 ? '#ffaa44' : '#44aa44';
        
        const riskLevel = temp > 29 ? 'High' : temp > 27 ? 'Moderate' : 'Low';
        document.getElementById('risk-level').textContent = riskLevel;
    }
    
    regionSelect.addEventListener('change', updateTemperature);
    yearSlider.addEventListener('input', updateTemperature);
    
    animateBtn.addEventListener('click', () => {
        animateTemperatureChanges(tempData[regionSelect.value]);
    });
    
    updateTemperature();
}

function animateTemperatureChanges(data) {
    const years = Object.keys(data);
    let currentIndex = 0;
    
    const animation = setInterval(() => {
        document.getElementById('year-slider').value = years[currentIndex];
        document.getElementById('year-slider').dispatchEvent(new Event('input'));
        
        currentIndex++;
        if (currentIndex >= years.length) {
            clearInterval(animation);
        }
    }, 1000);
}