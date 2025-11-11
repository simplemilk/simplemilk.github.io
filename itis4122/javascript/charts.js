// Function to load data dynamically
async function loadCoralData() {
    // If you exported JSON file, you can fetch it:
    // try {
    //     const response = await fetch('../data/coral_reef_data.json');
    //     return await response.json();
    // } catch (error) {
    //     console.error('Could not load data file, using default data');
    //     return null;
    // }
    
    // For now, use the data from data.js if available
    return window.coralReefData || null;
}

// Initialize charts with real data
document.addEventListener('DOMContentLoaded', async function() {
    console.log('DOM loaded, initializing charts...');
    
    if (typeof Chart === 'undefined') {
        console.error('Chart.js not loaded');
        return;
    }
    
    // Load real data
    const realData = await loadCoralData();
    
    // Use real data if available, otherwise use sample data
    const timeSeriesData = realData ? {
        labels: realData.timeSeries.labels,
        datasets: [{
            label: 'Average Temperature (°C)',
            data: realData.timeSeries.data,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.1)',
            tension: 0.3,
            pointBackgroundColor: 'rgb(255, 99, 132)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(255, 99, 132)'
        }]
    } : getDefaultTimeSeriesData();
    
    const northSouthData = realData ? {
        labels: realData.northSouth.labels,
        datasets: [{
            label: 'Northern Section',
            data: realData.northSouth.northData,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.1)',
            tension: 0.3
        }, {
            label: 'Southern Section',
            data: realData.northSouth.southData,
            borderColor: 'rgb(54, 162, 235)',
            backgroundColor: 'rgba(54, 162, 235, 0.1)',
            tension: 0.3
        }]
    } : getDefaultNorthSouthData();
    
    // Create charts with real data
    createTimeSeriesChart(timeSeriesData);
    createNorthSouthChart(northSouthData);
    createHeatmapChart(realData ? realData.heatmap.points : null);
});

function createTimeSeriesChart(data) {
    const timeCtx = document.getElementById('timeSeriesChart');
    if (timeCtx) {
        new Chart(timeCtx, {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Yearly Average Hotspot Temperature (°C) in the Great Barrier Reef',
                        font: { size: 16 }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        title: { display: true, text: 'Temperature (°C)' }
                    },
                    x: {
                        title: { display: true, text: 'Time Period' }
                    }
                }
            }
        });
    }
}

function createNorthSouthChart(data) {
    const nsCtx = document.getElementById('northSouthChart');
    if (nsCtx) {
        new Chart(nsCtx, {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Northern vs Southern Great Barrier Reef Temperatures',
                        font: { size: 16 }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        title: { display: true, text: 'Temperature (°C)' }
                    },
                    x: {
                        title: { display: true, text: 'Time Period' }
                    }
                }
            }
        });
    }
}

function createHeatmapChart(heatmapPoints) {
    const heatCtx = document.getElementById('heatmapChart');
    if (heatCtx) {
        // Clear existing content and create custom map
        heatCtx.style.position = 'relative';
        heatCtx.innerHTML = '';
        
        // Create canvas for custom map
        const canvas = document.createElement('canvas');
        canvas.width = 600;  
        canvas.height = 400; 
        canvas.style.width = '100%';
        canvas.style.maxWidth = '600px';
        canvas.style.height = 'auto';
        canvas.style.border = '1px solid #ddd';
        canvas.style.borderRadius = '8px';
        canvas.style.backgroundColor = '#f0f8ff';
        canvas.style.display = 'block';
        canvas.style.margin = '0 auto';
        
        heatCtx.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        const data = heatmapPoints || generateHeatmapData();
        
        // Map bounds for Great Barrier Reef
        const minLat = -25, maxLat = -8;
        const minLng = 142, maxLng = 154;
        const margin = 30;
        
        // Convert lat/lng to canvas coordinates
        function toCanvasCoords(lng, lat) {
            const x = ((lng - minLng) / (maxLng - minLng)) * (canvas.width - 2 * margin) + margin;
            const y = ((maxLat - lat) / (maxLat - minLat)) * (canvas.height - 2 * margin) + margin;
            return { x, y };
        }
        
        // Check if a canvas point is on land
        function isPointOnLand(canvasX, canvasY) {
            // Convert canvas coordinates back to lat/lng
            const lng = ((canvasX - margin) / (canvas.width - 2 * margin)) * (maxLng - minLng) + minLng;
            const lat = maxLat - ((canvasY - margin) / (canvas.height - 2 * margin)) * (maxLat - minLat);
            
            // Use the same ocean check function
            return !isInOcean(lng, lat);
        }
        
        // Clear canvas with ocean background
        ctx.fillStyle = '#e6f3ff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw ocean area
        ctx.fillStyle = '#b3d9ff';
        ctx.fillRect(margin, margin, canvas.width - 2 * margin, canvas.height - 2 * margin);
        
        // Draw Australian coastline
        ctx.strokeStyle = '#8B4513';
        ctx.lineWidth = 2;
        ctx.fillStyle = '#f4e4bc';
        
        ctx.beginPath();
        // More realistic Queensland coastline points
        const coastlinePoints = [
            { lng: 153.2, lat: -24.9 }, // Near Bundaberg (moved further east)
            { lng: 151.0, lat: -24.0 }, 
            { lng: 150.5, lat: -23.0 }, // Near Rockhampton
            { lng: 149.2, lat: -22.0 },
            { lng: 148.8, lat: -21.0 }, 
            { lng: 148.5, lat: -20.0 }, // Near Mackay
            { lng: 147.0, lat: -19.0 }, 
            { lng: 146.5, lat: -18.0 }, 
            { lng: 145.8, lat: -17.0 }, // Near Townsville
            { lng: 145.6, lat: -16.0 },
            { lng: 145.4, lat: -15.0 }, 
            { lng: 145.2, lat: -14.0 }, // Near Cairns
            { lng: 145.0, lat: -13.0 },
            { lng: 144.8, lat: -12.0 },
            { lng: 144.5, lat: -11.0 }, 
            { lng: 144.2, lat: -10.5 }, 
            { lng: 144.0, lat: -10.0 }  // Cape York area
        ];
        
        coastlinePoints.forEach((point, index) => {
            const coords = toCanvasCoords(point.lng, point.lat);
            if (index === 0) {
                ctx.moveTo(coords.x, coords.y);
            } else {
                ctx.lineTo(coords.x, coords.y);
            }
        });
        
        // Connect to map edges to create land mass
        const lastPoint = toCanvasCoords(144.0, -10.0);
        const firstPoint = toCanvasCoords(153.2, -24.9);
        
        // Draw to left edge of map
        ctx.lineTo(margin, lastPoint.y);
        ctx.lineTo(margin, canvas.height - margin);
        ctx.lineTo(firstPoint.x, canvas.height - margin);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        // Draw Papua New Guinea (northern land mass)
        ctx.beginPath();
        ctx.fillStyle = '#f4e4bc';
        const pngPoints = [
            { lng: 142.5, lat: -9.5 },
            { lng: 143.5, lat: -9.0 },
            { lng: 144.5, lat: -8.8 },
            { lng: 145.5, lat: -8.5 },
            { lng: 146.5, lat: -8.8 },
            { lng: 147.5, lat: -9.2 }
        ];
        
        pngPoints.forEach((point, index) => {
            const coords = toCanvasCoords(point.lng, point.lat);
            if (index === 0) {
                ctx.moveTo(margin, coords.y);
                ctx.lineTo(coords.x, coords.y);
            } else {
                ctx.lineTo(coords.x, coords.y);
            }
        });
        
        // Close PNG landmass
        const lastPngPoint = toCanvasCoords(147.5, -9.2);
        ctx.lineTo(canvas.width - margin, lastPngPoint.y);
        ctx.lineTo(canvas.width - margin, margin);
        ctx.lineTo(margin, margin);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        // Draw reef areas (lighter blue) 
        ctx.fillStyle = 'rgba(173, 216, 230, 0.6)';
        const reefAreas = [
            { lng: 146.0, lat: -16.5, radius: 15 }, // Cairns section
            { lng: 147.2, lat: -19.0, radius: 12 }, // Townsville section
            { lng: 148.5, lat: -20.5, radius: 18 }, // Whitsunday section
            { lng: 149.0, lat: -22.0, radius: 15 }, // Mackay section
            { lng: 150.5, lat: -23.5, radius: 16 }, // Rockhampton section
            { lng: 151.8, lat: -24.0, radius: 12 }  // Bundaberg section
        ];
        
        reefAreas.forEach(reef => {
            const coords = toCanvasCoords(reef.lng, reef.lat);
            ctx.beginPath();
            ctx.arc(coords.x, coords.y, reef.radius, 0, 2 * Math.PI);
            ctx.fill();
        });
        
        // Draw temperature hotspots - ONLY IN OCEAN
        data.forEach(point => {
            const coords = toCanvasCoords(point.x, point.y);
            
            // Double-check that this point is not on land
            if (isPointOnLand(coords.x, coords.y)) {
                return; // Skip this point
            }
            
            const radius = Math.max(1.5, Math.abs(point.temperature) * 1.5 + 1);
            
            // Get color based on temperature
            let color;
            if (point.temperature > 1.5) color = 'rgba(139, 0, 0, 0.9)';
            else if (point.temperature > 1.0) color = 'rgba(220, 20, 60, 0.9)';
            else if (point.temperature > 0.5) color = 'rgba(255, 69, 0, 0.9)';
            else if (point.temperature > 0.0) color = 'rgba(255, 140, 0, 0.8)';
            else if (point.temperature > -0.5) color = 'rgba(255, 215, 0, 0.7)';
            else color = 'rgba(30, 144, 255, 0.6)';
            
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(coords.x, coords.y, radius, 0, 2 * Math.PI);
            ctx.fill();
            
            // Add subtle border
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
            ctx.lineWidth = 0.3;
            ctx.stroke();
        });
        
        // Add title
        ctx.fillStyle = '#2c3e50';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Great Barrier Reef Temperature Hotspot Map', canvas.width / 2, 20);
        
        // Add subtitle
        ctx.font = '10px Arial';
        ctx.fillStyle = '#7f8c8d';
        ctx.fillText('Temperature anomalies across reef locations', canvas.width / 2, 35);
        
        // Add location labels
        ctx.fillStyle = '#2c3e50';
        ctx.font = '8px Arial';
        ctx.textAlign = 'left';
        
        // Label major cities (positioned on the coastline)
        const cities = [
            { name: 'Cairns', lng: 145.8, lat: -16.9 },
            { name: 'Townsville', lng: 146.8, lat: -19.3 },
            { name: 'Mackay', lng: 149.2, lat: -21.1 },
            { name: 'Rockhampton', lng: 150.5, lat: -23.4 }
        ];
        
        cities.forEach(city => {
            const coords = toCanvasCoords(city.lng, city.lat);
            ctx.fillStyle = '#2c3e50';
            ctx.fillText(city.name, coords.x + 5, coords.y - 5);
            // Add small dot for city
            ctx.fillStyle = '#2c3e50';
            ctx.beginPath();
            ctx.arc(coords.x, coords.y, 1.5, 0, 2 * Math.PI);
            ctx.fill();
        });
        
        // Create legend - COMPACT
        const legendX = canvas.width - 140;
        const legendY = 50;
        const legendWidth = 130;
        const legendHeight = 110;
        
        // Legend background
        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.fillRect(legendX - 5, legendY - 5, legendWidth, legendHeight);
        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 1;
        ctx.strokeRect(legendX - 5, legendY - 5, legendWidth, legendHeight);
        
        // Legend title
        ctx.fillStyle = '#2c3e50';
        ctx.font = 'bold 10px Arial';
        ctx.textAlign = 'left';
        ctx.fillText('Temperature Anomaly (°C)', legendX, legendY);
        
        const legendItems = [
            { label: '> 1.5°C (Extreme)', color: 'rgba(139, 0, 0, 0.9)' },
            { label: '1.0-1.5°C (Severe)', color: 'rgba(220, 20, 60, 0.9)' },
            { label: '0.5-1.0°C (High)', color: 'rgba(255, 69, 0, 0.9)' },
            { label: '0-0.5°C (Moderate)', color: 'rgba(255, 140, 0, 0.8)' },
            { label: '-0.5-0°C (Low)', color: 'rgba(255, 215, 0, 0.7)' },
            { label: '< -0.5°C (Safe)', color: 'rgba(30, 144, 255, 0.6)' }
        ];
        
        ctx.font = '8px Arial';
        legendItems.forEach((item, index) => {
            const y = legendY + 12 + index * 12;
            
            // Draw color circle
            ctx.fillStyle = item.color;
            ctx.beginPath();
            ctx.arc(legendX + 4, y - 2, 3, 0, 2 * Math.PI);
            ctx.fill();
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
            ctx.lineWidth = 0.3;
            ctx.stroke();
            
            // Draw text
            ctx.fillStyle = '#2c3e50';
            ctx.fillText(item.label, legendX + 12, y);
        });
        
        // Add coordinate labels
        ctx.fillStyle = '#666';
        ctx.font = '7px Arial';
        
        // Latitude labels (left side)
        for (let lat = -24; lat <= -10; lat += 7) {
            const coords = toCanvasCoords(minLng, lat);
            ctx.textAlign = 'right';
            ctx.fillText(`${Math.abs(lat)}°S`, coords.x - 2, coords.y + 2);
        }
        
        // Longitude labels (bottom)
        for (let lng = 144; lng <= 152; lng += 4) {
            const coords = toCanvasCoords(lng, minLat);
            ctx.textAlign = 'center';
            ctx.fillText(`${lng}°E`, coords.x, coords.y + 10);
        }
        
        // Add north arrow
        const arrowX = 40;
        const arrowY = 60;
        ctx.strokeStyle = '#333';
        ctx.fillStyle = '#333';
        ctx.lineWidth = 1;
        
        // Arrow shaft
        ctx.beginPath();
        ctx.moveTo(arrowX, arrowY + 10);
        ctx.lineTo(arrowX, arrowY);
        ctx.stroke();
        
        // Arrow head
        ctx.beginPath();
        ctx.moveTo(arrowX, arrowY);
        ctx.lineTo(arrowX - 3, arrowY + 6);
        ctx.lineTo(arrowX + 3, arrowY + 6);
        ctx.closePath();
        ctx.fill();
        
        // North label
        ctx.font = 'bold 8px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('N', arrowX, arrowY + 20);
        
        // Add scale bar
        const scaleX = 40;
        const scaleY = canvas.height - 50;
        const scaleLength = 60;
        const scaleKm = 200;
        
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(scaleX, scaleY);
        ctx.lineTo(scaleX + scaleLength, scaleY);
        ctx.stroke();
        
        // Scale bar ticks
        ctx.beginPath();
        ctx.moveTo(scaleX, scaleY - 3);
        ctx.lineTo(scaleX, scaleY + 3);
        ctx.moveTo(scaleX + scaleLength, scaleY - 3);
        ctx.lineTo(scaleX + scaleLength, scaleY + 3);
        ctx.stroke();
        
        // Scale label
        ctx.font = '8px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`${scaleKm} km`, scaleX + scaleLength / 2, scaleY + 12);
        
        // Add interactive tooltip
        const tooltip = document.createElement('div');
        tooltip.style.position = 'absolute';
        tooltip.style.background = 'rgba(0, 0, 0, 0.8)';
        tooltip.style.color = 'white';
        tooltip.style.padding = '4px 8px';
        tooltip.style.borderRadius = '4px';
        tooltip.style.fontSize = '10px';
        tooltip.style.pointerEvents = 'none';
        tooltip.style.display = 'none';
        tooltip.style.zIndex = '1000';
        heatCtx.appendChild(tooltip);
        
        // Mouse interaction
        canvas.addEventListener('mousemove', function(e) {
            const rect = canvas.getBoundingClientRect();
            const x = (e.clientX - rect.left) * (canvas.width / rect.width);
            const y = (e.clientY - rect.top) * (canvas.height / rect.height);
            
            let nearest = null;
            let minDist = Infinity;
            
            data.forEach(point => {
                const coords = toCanvasCoords(point.x, point.y);
                const dist = Math.sqrt((x - coords.x) ** 2 + (y - coords.y) ** 2);
                if (dist < minDist && dist < 8) {
                    minDist = dist;
                    nearest = point;
                }
            });
            
            if (nearest) {
                tooltip.style.display = 'block';
                tooltip.style.left = (e.clientX + 10) + 'px';
                tooltip.style.top = (e.clientY - 30) + 'px';
                
                let riskLevel;
                if (nearest.temperature > 1.5) riskLevel = 'Extreme Risk';
                else if (nearest.temperature > 1.0) riskLevel = 'Severe Risk';
                else if (nearest.temperature > 0.5) riskLevel = 'High Risk';
                else if (nearest.temperature > 0.0) riskLevel = 'Moderate Risk';
                else if (nearest.temperature > -0.5) riskLevel = 'Low Risk';
                else riskLevel = 'Cool/Safe';
                
                tooltip.innerHTML = `
                    <strong>Location:</strong> ${Math.abs(nearest.y.toFixed(2))}°S, ${nearest.x.toFixed(2)}°E<br>
                    <strong>Temperature:</strong> ${nearest.temperature > 0 ? '+' : ''}${nearest.temperature.toFixed(2)}°C<br>
                    <strong>Risk:</strong> ${riskLevel}
                `;
                canvas.style.cursor = 'pointer';
            } else {
                tooltip.style.display = 'none';
                canvas.style.cursor = 'default';
            }
        });
        
        canvas.addEventListener('mouseleave', function() {
            tooltip.style.display = 'none';
            canvas.style.cursor = 'default';
        });
        
        console.log('Geographic heatmap created successfully');
    }
}

// Fallback functions for default data if real data isn't available
function getDefaultTimeSeriesData() {
    return {
        labels: [
            '2020-01', '2020-04', '2020-07', '2020-10',
            '2021-01', '2021-04', '2021-07', '2021-10',
            '2022-01', '2022-04', '2022-07', '2022-10',
            '2023-01', '2023-04', '2023-07', '2023-10',
            '2024-01', '2024-04', '2024-07', '2024-10',
            '2025-01'
        ],
        datasets: [{
            label: 'Average Temperature (°C)',
            data: [0.8, 0.2, -0.5, -0.1, 1.2, 0.6, -0.2, 0.3, 0.9, 0.4, -0.3, 0.1, 1.5, 0.8, -0.1, 0.4, 1.1, 0.7, -0.2, 0.2, 1.3],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.1)',
            tension: 0.3,
            pointBackgroundColor: 'rgb(255, 99, 132)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(255, 99, 132)'
        }]
    };
}

function getDefaultNorthSouthData() {
    return {
        labels: [
            '2020-01', '2020-04', '2020-07', '2020-10',
            '2021-01', '2021-04', '2021-07', '2021-10',
            '2022-01', '2022-04', '2022-07', '2022-10',
            '2023-01', '2023-04', '2023-07', '2023-10',
            '2024-01', '2024-04', '2024-07', '2024-10',
            '2025-01'
        ],
        datasets: [{
            label: 'Northern Section',
            data: [1.5, 1.0, 0.3, 0.7, 1.8, 1.3, 0.5, 0.9, 1.6, 1.1, 0.4, 0.8, 2.1, 1.5, 0.7, 1.0, 1.9, 1.4, 0.6, 0.9, 2.0],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.1)',
            tension: 0.3
        }, {
            label: 'Southern Section',
            data: [0.1, -0.6, -1.3, -0.9, 0.6, -0.1, -1.0, -0.3, 0.2, -0.3, -1.1, -0.6, 0.9, 0.1, -0.8, -0.2, 0.5, 0.0, -0.9, -0.5, 0.6],
            borderColor: 'rgb(54, 162, 235)',
            backgroundColor: 'rgba(54, 162, 235, 0.1)',
            tension: 0.3
        }]
    };
}

// Generate heatmap data based on Great Barrier Reef coordinates - FIXED
function generateHeatmapData() {
    const data = [];
    const numPoints = 200;
    
    for (let i = 0; i < numPoints; i++) {
        let lat, lng;
        let isValidPoint = false;
        let attempts = 0;
        const maxAttempts = 50;
        
        // Keep trying until we find a point that's in the ocean/reef area
        while (!isValidPoint && attempts < maxAttempts) {
            // Great Barrier Reef latitude range: -24.6 to -8.6
            // Longitude range: 142 to 154
            lat = Math.random() * (-8.6 - (-24.6)) + (-24.6);
            lng = Math.random() * (154 - 142) + 142;
            
            // Check if point is in ocean (not on land)
            isValidPoint = isInOcean(lng, lat);
            attempts++;
        }
        
        // If we couldn't find a valid ocean point, skip this iteration
        if (!isValidPoint) continue;
        
        // Temperature varies based on latitude (northern areas warmer)
        const latFactor = (lat - (-24.6)) / (-8.6 - (-24.6)); // 0 to 1, where 1 is north
        const baseTemp = latFactor * 2 - 0.5; // -0.5 to 1.5
        const noise = (Math.random() - 0.5) * 1.5; // Add some variation
        const temp = baseTemp + noise;
        
        data.push({
            x: lng,
            y: lat,
            temperature: temp
        });
    }
    return data;
}

// Function to check if a coordinate is in ocean (not on land)
function isInOcean(lng, lat) {
    // Define the coastline boundaries more precisely
    
    // If it's too far west (clearly on Australian mainland), it's land
    if (lng < 145.0) return false;
    
    // If it's in the northern area near Papua New Guinea
    if (lat > -9.5 && lng < 147.5) return false;
    
    // Define Australian coastline boundaries based on latitude
    let maxLandLng;
    
    if (lat <= -24.0) {
        // Southern section (near Bundaberg)
        maxLandLng = 153.0;
    } else if (lat <= -23.0) {
        // Rockhampton area
        maxLandLng = 150.0;
    } else if (lat <= -22.0) {
        maxLandLng = 149.0;
    } else if (lat <= -20.0) {
        // Mackay area
        maxLandLng = 148.5;
    } else if (lat <= -17.0) {
        // Townsville area
        maxLandLng = 146.5;
    } else if (lat <= -14.0) {
        // Cairns area
        maxLandLng = 145.8;
    } else {
        // Cape York area
        maxLandLng = 145.0;
    }
    
    // If longitude is less than the coastline, it's on land
    if (lng < maxLandLng) return false;
    
    // Additional check: if it's too close to the coastline, avoid it
    const coastlineBuffer = 0.3; // degrees buffer from coast
    if (lng < maxLandLng + coastlineBuffer) {
        // Only allow some points near coast (30% chance)
        return Math.random() < 0.3;
    }
    
    return true; // It's in the ocean
}

// Initialize charts when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing charts...');
    
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
        console.error('Chart.js not loaded');
        return;
    }
    
    // Time Series Chart
    const timeCtx = document.getElementById('timeSeriesChart');
    if (timeCtx) {
        console.log('Creating time series chart...');
        new Chart(timeCtx, {
            type: 'line',
            data: timeSeriesData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Yearly Average Hotspot Temperature (°C) in the Great Barrier Reef',
                        font: {
                            size: 16
                        }
                    },
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        title: {
                            display: true,
                            text: 'Temperature (°C)'
                        },
                        grid: {
                            color: 'rgba(0,0,0,0.1)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Time Period'
                        },
                        grid: {
                            color: 'rgba(0,0,0,0.1)'
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });
    } else {
        console.error('timeSeriesChart canvas not found');
    }

    // North vs South Comparison Chart
    const nsCtx = document.getElementById('northSouthChart');
    if (nsCtx) {
        console.log('Creating north-south comparison chart...');
        new Chart(nsCtx, {
            type: 'line',
            data: northSouthData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Average Yearly Hotspot Temperatures(°C): Northern vs Southern Section',
                        font: {
                            size: 16
                        }
                    },
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        title: {
                            display: true,
                            text: 'Temperature (°C)'
                        },
                        grid: {
                            color: 'rgba(0,0,0,0.1)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Time Period'
                        },
                        grid: {
                            color: 'rgba(0,0,0,0.1)'
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });
    } else {
        console.error('northSouthChart canvas not found');
    }

    // Heatmap/Scatter plot
    const heatCtx = document.getElementById('heatmapChart');
    if (heatCtx) {
        console.log('Creating heatmap chart...');
        const heatmapData = generateHeatmapData();
        
        new Chart(heatCtx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Temperature Hotspots',
                    data: heatmapData,
                    backgroundColor: function(context) {
                        const point = context.raw;
                        if (!point || typeof point.temperature === 'undefined') return 'rgba(128, 128, 128, 0.6)';
                        
                        const temp = point.temperature;
                        if (temp > 1.5) return 'rgba(220, 20, 60, 0.8)'; // Deep red - severe bleaching risk
                        if (temp > 1.0) return 'rgba(255, 69, 0, 0.8)'; // Orange red - high risk
                        if (temp > 0.5) return 'rgba(255, 140, 0, 0.8)'; // Orange - moderate risk
                        if (temp > 0) return 'rgba(255, 215, 0, 0.8)'; // Yellow - low risk
                        return 'rgba(30, 144, 255, 0.6)'; // Blue - cool
                    },
                    pointRadius: function(context) {
                        const point = context.raw;
                        if (!point || typeof point.temperature === 'undefined') return 2;
                        return Math.max(2, Math.abs(point.temperature) * 2 + 1);
                    }
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Coral Bleaching Hotspot Temperatures on the Great Barrier Reef',
                        font: { size: 16 }
                    },
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const point = context.raw;
                                return [
                                    `Longitude: ${point.x.toFixed(2)}°`,
                                    `Latitude: ${point.y.toFixed(2)}°`,
                                    `Temperature: ${point.temperature.toFixed(2)}°C`
                                ];
                            }
                        }
                    }
                },
                scales: {
                    x: { title: { display: true, text: 'Longitude (°E)' } },
                    y: { title: { display: true, text: 'Latitude (°S)' } }
                }
            }
        });
    } else {
        console.error('heatmapChart canvas not found');
    }
});