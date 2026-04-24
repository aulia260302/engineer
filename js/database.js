// Database handler for localStorage (Engineering Logbook)

let logsArray = [];

// Load logs from localStorage
function loadLogsFromDB() {
    const stored = localStorage.getItem("okky_ai_logbook");
    if(stored) {
        try {
            logsArray = JSON.parse(stored);
        } catch(e) { 
            logsArray = []; 
        }
    } else {
        // default demo logs (matching engineer style)
        logsArray = [
            { id: Date.now()+1, title: "BLDC Motor Calibration", desc: "Hall sensor offset tuned - efficiency +12%" },
            { id: Date.now()+2, title: "ROS2 Node for LiDAR", desc: "Integrated RPLidar A1 with occupancy grid" }
        ];
        saveToLocalStorage();
    }
    renderLogs();
}

// Save to localStorage
function saveToLocalStorage() {
    localStorage.setItem("okky_ai_logbook", JSON.stringify(logsArray));
}

// Add new log
function addLog(title, desc) {
    if(!title.trim() && !desc.trim()) return;
    const newLog = {
        id: Date.now(),
        title: title.trim() || "Unnamed log",
        desc: desc.trim() || "No additional info",
    };
    logsArray.unshift(newLog);
    saveToLocalStorage();
    renderLogs();
}

// Delete individual log
function deleteLog(id) {
    logsArray = logsArray.filter(log => log.id !== id);
    saveToLocalStorage();
    renderLogs();
}

// Clear all logs
function clearAllLogs() {
    if(confirm("⚠️ Permanently delete all engineering logs from local database?")) {
        logsArray = [];
        saveToLocalStorage();
        renderLogs();
    }
}

// Render logs to DOM
function renderLogs() {
    const container = document.getElementById("logsContainer");
    if(!container) return;
    
    if(logsArray.length === 0) {
        container.innerHTML = `<div class="log-item" style="justify-content:center; color:gray;"><i class="fas fa-database"></i> No logs yet. Click "Save Log" to store data.</div>`;
        return;
    }
    
    container.innerHTML = "";
    logsArray.forEach(log => {
        const logDiv = document.createElement("div");
        logDiv.className = "log-item";
        logDiv.innerHTML = `
            <div style="flex:1">
                <strong><i class="fas fa-microchip"></i> ${escapeHtml(log.title)}</strong><br>
                <small style="color:#9aa4bf;">${escapeHtml(log.desc)}</small>
            </div>
            <button class="delete-btn" data-id="${log.id}"><i class="fas fa-trash-alt"></i></button>
        `;
        container.appendChild(logDiv);
    });
    
    // attach delete events
    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = parseInt(btn.getAttribute("data-id"));
            deleteLog(id);
        });
    });
}

// Helper function to escape HTML
function escapeHtml(str) {
    if(!str) return "";
    return str.replace(/[&<>]/g, function(m) {
        if(m === '&') return '&amp;';
        if(m === '<') return '&lt;';
        if(m === '>') return '&gt;';
        return m;
    }).replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, function(c) {
        return c;
    });
}

// Initialize database on page load
document.addEventListener('DOMContentLoaded', function() {
    loadLogsFromDB();
    
    // Setup event listeners for database controls
    const addBtn = document.getElementById("addLogBtn");
    const clearBtn = document.getElementById("clearAllBtn");
    const titleInput = document.getElementById("logTitle");
    const descInput = document.getElementById("logDesc");
    
    if(addBtn) {
        addBtn.addEventListener("click", () => {
            const title = titleInput.value;
            const desc = descInput.value;
            addLog(title, desc);
            titleInput.value = "";
            descInput.value = "";
        });
    }
    
    if(clearBtn) {
        clearBtn.addEventListener("click", clearAllLogs);
    }
});
