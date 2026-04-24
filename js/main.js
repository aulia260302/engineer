// Main JavaScript for interactions and utilities

// Smooth scroll for navigation links
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if(targetId && targetId.startsWith("#")) {
            e.preventDefault();
            const targetElem = document.querySelector(targetId);
            if(targetElem) {
                targetElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

// Download resume function
function downloadResume() {
    alert("📄 Resume of Okky AI (Mechatronics Engineer) - Skill Highlights: Embedded C++, ROS, PLC, PCB Design, IoT. Contact for full CV.");
    
    // Generate text file resume
    const resumeContent = `OKKY AI (OKKY WAHYUDIN) - MECHATRONICS ENGINEER

================================
Professional Summary:
================================
Experienced Mechatronics Engineer with 7+ years in industrial automation, 
robotics, and embedded systems. Passionate about bridging hardware and 
software for Industry 4.0 solutions.

================================
Core Competencies:
================================
• Embedded Systems (STM32, ESP32, Arduino)
• Robotics (ROS2, PID Control, Sensor Fusion)
• PLC Programming (Siemens, Ladder Logic)
• PCB Design (KiCad, Eagle)
• Software Development (C++, Python, JavaScript)
• IoT & Telemetry Systems

================================
Selected Projects:
================================
1. EV Telemetry System - Real-time CANbus analysis
2. Smart Factory PLC - Automated sorting line
3. Autonomous Rover - ROS-based navigation with LiDAR

================================
Education & Certifications:
================================
• M.Eng in Mechatronics - Institut Teknologi Bandung
• Certified PLC Programmer - Siemens
• ROS Industrial Training

================================
Contact:
================================
Email: okky.ai@mechatronics.engineer
GitHub: github.com/okky-ai
LinkedIn: linkedin.com/in/okky-wahyudin
`;
    
    const blob = new Blob([resumeContent], {type: "text/plain"});
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "OkkyAI_Resume.txt";
    link.click();
    URL.revokeObjectURL(link.href);
}

// Contact button handler
function showContactInfo() {
    alert("📞 Contact Okky AI:\n\n📱 Phone: +62 812 3456 7890\n📧 Email: okky.ai@mechatronics.engineer\n💬 WhatsApp: +62 812 3456 7890\n\n🌐 Social Media:\n• GitHub: github.com/okky-ai\n• LinkedIn: linkedin.com/in/okky-wahyudin");
}

// Add some cool typing effect to hero (optional)
function typeWriterEffect() {
    const heroText = document.querySelector('.hero-content h1');
    if(!heroText) return;
    
    const originalText = heroText.innerHTML;
    const highlightSpan = '<span class="highlight">AI</span>';
    // Already has the highlight, just adding subtle animation class
    heroText.style.opacity = '0';
    heroText.style.transform = 'translateY(20px)';
    heroText.style.transition = 'all 0.8s ease';
    
    setTimeout(() => {
        heroText.style.opacity = '1';
        heroText.style.transform = 'translateY(0)';
    }, 200);
}

// Initialize all event listeners when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Setup resume button
    const resumeBtn = document.getElementById('resumeBtn');
    if(resumeBtn) {
        resumeBtn.addEventListener('click', downloadResume);
    }
    
    // Setup contact button
    const contactBtn = document.getElementById('contactBtn');
    if(contactBtn) {
        contactBtn.addEventListener('click', showContactInfo);
    }
    
    // Optional: add intersection observer for fade-in animations
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });
    
    // Trigger typewriter effect
    typeWriterEffect();
});