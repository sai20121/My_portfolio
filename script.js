// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Neural Network Background
function drawNeuralNetwork() {
    const canvas = document.getElementById('neural-network-bg');
    if (!canvas.getContext) {
        console.error('Canvas not supported');
        return;
    }
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const nodes = [];
    const numNodes = 25;
    for (let i = 0; i < numNodes; i++) {
        nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = 'rgba(20, 184, 166, 0.6)';
        ctx.fillStyle = 'rgba(147, 51, 234, 0.9)';

        nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;

            if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

            ctx.beginPath();
            ctx.arc(node.x, node.y, 6, 0, Math.PI * 2);
            ctx.fill();

            nodes.forEach(other => {
                const dist = Math.hypot(node.x - other.x, node.y - other.y);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(node.x, node.y);
                    ctx.lineTo(other.x, other.y);
                    ctx.stroke();
                }
            });
        });

        requestAnimationFrame(animate);
    }
    animate();
}

// Skill Proficiency Chart
function drawSkillProficiencyChart() {
    const canvas = document.getElementById('skillProficiencyChart');
    if (!canvas.getContext) {
        console.error('Canvas not supported for skill chart');
        return;
    }
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Python', 'AWS', 'Azure', 'GCP', 'NLP', 'LightGBM', 'XGBoost'],
            datasets: [{
                label: 'Proficiency (%)',
                data: [95, 90, 85, 80, 88, 85, 83],
                backgroundColor: ['#14b8a6', '#9333ea', '#facc15', '#34d399', '#60a5fa', '#f87171', '#a855f7'],
                borderColor: ['#0d9488', '#7e22ce', '#eab308', '#22c55e', '#3b82f6', '#dc2626', '#9333ea'],
                borderWidth: 2,
                borderRadius: 5,
                barThickness: 20,
                shadowOffsetX: 3,
                shadowOffsetY: 3,
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: { display: true, text: 'Proficiency (%)', color: '#e5e7eb' },
                    ticks: { color: '#e5e7eb' },
                    grid: { color: '#4b5563' }
                },
                x: {
                    ticks: { color: '#e5e7eb' },
                    grid: { color: '#4b5563' }
                }
            },
            plugins: { legend: { display: false } }
        }
    });
}

// Model Accuracy Chart
function drawAccuracyChart() {
    const canvas = document.getElementById('modelAccuracyChart');
    if (!canvas.getContext) {
        console.error('Canvas not supported for chart');
        return;
    }
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Centene (LightGBM)', 'AT&T (XGBoost)', 'Best Buy (Fraud)', 'Honeywell (Rec.)'],
            datasets: [{
                label: 'Model Accuracy (%)',
                data: [84, 87, 90, 80],
                backgroundColor: ['#14b8a6', '#9333ea', '#facc15', '#34d399'],
                borderColor: ['#0d9488', '#7e22ce', '#eab308', '#22c55e'],
                borderWidth: 2,
                borderRadius: 5,
                barThickness: 30,
                shadowOffsetX: 3,
                shadowOffsetY: 3,
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: { display: true, text: 'Accuracy (%)', color: '#e5e7eb' },
                    ticks: { color: '#e5e7eb' },
                    grid: { color: '#4b5563' }
                },
                x: {
                    ticks: { color: '#e5e7eb' },
                    grid: { color: '#4b5563' }
                }
            },
            plugins: { legend: { display: false } }
        }
    });
}

// Sentiment Analysis Demo
function analyzeSentiment() {
    console.log('Analyze button clicked');
    const input = document.getElementById('sentimentInput');
    const result = document.getElementById('sentimentResult');
    if (!input || !result) {
        console.error('Input or result element not found');
        result.textContent = 'Error: Please check the page setup.';
        return;
    }

    const text = input.value.trim().toLowerCase();
    if (!text) {
        result.textContent = 'Please enter a sentence.';
        return;
    }

    try {
        let score = 0;
        if (text.includes('love') || text.includes('happy') || text.includes('great')) score += 1;
        if (text.includes('hate') || text.includes('sad') || text.includes('bad')) score -= 1;

        if (score > 0) {
            result.textContent = 'Positive sentiment detected!';
            result.style.color = '#34d399';
            input.style.borderColor = '#34d399';
        } else if (score < 0) {
            result.textContent = 'Negative sentiment detected.';
            result.style.color = '#f87171';
            input.style.borderColor = '#f87171';
        } else {
            result.textContent = 'Neutral sentiment.';
            result.style.color = '#9ca3af';
            input.style.borderColor = '#9ca3af';
        }
        input.classList.add('animate-pulse');
        setTimeout(() => input.classList.remove('animate-pulse'), 1000);
    } catch (e) {
        console.error('Sentiment analysis error:', e);
        result.textContent = 'Error processing sentiment.';
        result.style.color = '#f87171';
    }
}

// Initialize
window.onload = function() {
    drawNeuralNetwork();
    drawSkillProficiencyChart();
    drawAccuracyChart();
};