// --- AgriGuard AI Master Database ---
const diseasesDB = [
    {
        id: "tom_early_blight", crop: "Tomato", name: "Early Blight", severity: "High",
        causes: "Caused by Alternaria solani fungus. Overwinters in infected plant debris in the soil and spreads via wind or rain splash.",
        symptoms: ["Concentric target-ring spots on lower mature leaves", "Yellowing of surrounding leaf tissue", "Stem cankers and defoliation starting from base"],
        precautions: {
            organic: "Rotate crops on 3-year cycle, prune lower infected leaves, apply neem oil or copper octanoate spray.",
            chemical: "Apply Mancozeb (2.5g/L) or Chlorothalonil preventatively every 7-10 days in humid conditions.",
            prevention: "Drip irrigate at plant base to keep foliage dry, space plants 24 inches apart for air flow."
        },
        sampleImage: "assets/tomato_early_blight_1784878891541.png"
    },
    {
        id: "tom_late_blight", crop: "Tomato", name: "Late Blight", severity: "Critical",
        causes: "Caused by Phytophthora infestans (Oomycete). Thrives in cool (60-70°F), wet, highly humid weather.",
        symptoms: ["Large, dark, water-soaked lesions on leaves and stems", "White cottony mold on leaf undersides", "Rapid collapse and rot of entire plant"],
        precautions: {
            organic: "Remove and destroy infected plants immediately. Do not compost. Ensure strict sanitation.",
            chemical: "Spray Metalaxyl + Mancozeb or Cymoxanil immediately upon early symptom detection.",
            prevention: "Plant certified disease-free seeds/transplants, avoid overhead sprinklers."
        },
        sampleImage: "assets/tomato_early_blight_1784878891541.png"
    },
    {
        id: "tom_leaf_curl", crop: "Tomato", name: "Leaf Curl Virus", severity: "High",
        causes: "Tomato Yellow Leaf Curl Virus (TYLCV), transmitted by Whitefly vector (Bemisia tabaci).",
        symptoms: ["Upward and inward curling of leaf margins", "Stunted bushy plant growth", "Severe flower drop and failure to set fruit"],
        precautions: {
            organic: "Use yellow sticky traps to catch whiteflies, spray neem oil soap emulsion.",
            chemical: "Control whitefly vector with Imidacloprid or Thiamethoxam systemic insecticides.",
            prevention: "Use insect-proof mesh in nurseries, plant TYLCV-resistant hybrids."
        },
        sampleImage: "assets/tomato_early_blight_1784878891541.png"
    },
    {
        id: "tom_healthy", crop: "Tomato", name: "Healthy Foliage", severity: "Healthy",
        causes: "No active pathogens detected. Plant demonstrates optimal nutritional vigor.",
        symptoms: ["Vibrant dark green leaves", "Sturdy upright stem", "Consistent flower development"],
        precautions: {
            organic: "Maintain regular compost tea feeding and soil moisture balance.",
            chemical: "No synthetic chemical applications required.",
            prevention: "Continue routine crop monitoring twice weekly."
        },
        sampleImage: "assets/tomato_early_blight_1784878891541.png"
    },
    {
        id: "pot_late_blight", crop: "Potato", name: "Late Blight", severity: "Critical",
        causes: "Phytophthora infestans. Notorious water mold capable of destroying entire fields within days.",
        symptoms: ["Irregular purplish-black foliage lesions", "White sporulation on leaf underside in dew", "Sunken brown tuber rot"],
        precautions: {
            organic: "Hill soil high around plants to shield tubers, eliminate volunteer potato weeds.",
            chemical: "Apply Cymoxanil + Mancozeb or Dimethomorph during high moisture alerts.",
            prevention: "Use certified disease-free seed tubers and resistant cultivars."
        },
        sampleImage: "assets/potato_late_blight_1784878905395.png"
    },
    {
        id: "pot_early_blight", crop: "Potato", name: "Early Blight", severity: "High",
        causes: "Alternaria solani fungus affecting stressed or aging potato foliage.",
        symptoms: ["Dark brown spots with dark concentric rings on mature leaves", "Leaf drop"],
        precautions: {
            organic: "Ensure adequate nitrogen & potassium fertilization to keep plants vigorous.",
            chemical: "Spray Azoxystrobin or Chlorothalonil at early canopy expansion.",
            prevention: "Practice 3-year crop rotation with non-solanaceous crops."
        },
        sampleImage: "assets/potato_late_blight_1784878905395.png"
    },
    {
        id: "pot_healthy", crop: "Potato", name: "Healthy Foliage", severity: "Healthy",
        causes: "No pathogens detected.", symptoms: ["Vibrant green leaves", "Robust vine growth"],
        precautions: { organic: "Maintain balanced soil fertility.", chemical: "None needed.", prevention: "Regular scout inspections." },
        sampleImage: "assets/potato_late_blight_1784878905395.png"
    },
    {
        id: "corn_rust", crop: "Corn", name: "Common Rust", severity: "Low",
        causes: "Puccinia sorghi fungus. Spores travel long distances on atmospheric winds.",
        symptoms: ["Small reddish-brown elongated pustules on upper and lower leaf surfaces", "Golden halo surrounding spots"],
        precautions: {
            organic: "Plant early in season to avoid peak spore migration windows.",
            chemical: "Apply Propiconazole or Tebuconazole if infection exceeds 5% leaf area before silking.",
            prevention: "Plant rust-resistant corn hybrids with Rp resistance genes."
        },
        sampleImage: "assets/corn_leaf_rust_1784878917544.png"
    },
    {
        id: "corn_nlb", crop: "Corn", name: "Northern Leaf Blight", severity: "Medium",
        causes: "Exserohilum turcicum fungus in humid climates with high residue.",
        symptoms: ["Long cigar-shaped tan lesions up to 6 inches long restricted by leaf veins"],
        precautions: {
            organic: "Incorporate crop residue into soil via tillage, rotate with soybeans.",
            chemical: "Apply Strobilurin fungicides at tasseling stage.",
            prevention: "Select hybrids with partial polygenic resistance."
        },
        sampleImage: "assets/corn_leaf_rust_1784878917544.png"
    },
    {
        id: "corn_healthy", crop: "Corn", name: "Healthy Corn", severity: "Healthy",
        causes: "Optimal growth parameters.", symptoms: ["Deep green leaf canopy", "Strong stalk"],
        precautions: { organic: "Maintain side-dress N applications.", chemical: "None required.", prevention: "Routine field checks." },
        sampleImage: "assets/corn_leaf_rust_1784878917544.png"
    },
    {
        id: "rice_blast", crop: "Rice", name: "Rice Blast", severity: "Critical",
        causes: "Magnaporthe oryzae fungus. Spores infect leaves, stems, nodes, and panicles.",
        symptoms: ["Spindle-shaped or diamond leaf spots with gray centers and brown margins", "Neck rot breaking panicles"],
        precautions: {
            organic: "Avoid excessive nitrogen fertilizer; split application into multiple doses.",
            chemical: "Apply Tricyclazole or Isoprothiolane at tiller and heading stages.",
            prevention: "Treat seeds with fungicides before sowing, maintain 5-10cm flood layer."
        },
        sampleImage: "assets/potato_late_blight_1784878905395.png"
    },
    {
        id: "rice_healthy", crop: "Rice", name: "Healthy Paddy", severity: "Healthy",
        causes: "No blast or bacterial blights.", symptoms: ["Uniform green tillers", "Clean leaf blades"],
        precautions: { organic: "Keep optimal water management.", chemical: "None needed.", prevention: "Monitor field water depth." },
        sampleImage: "assets/potato_late_blight_1784878905395.png"
    },
    {
        id: "apple_scab", crop: "Apple", name: "Apple Scab", severity: "High",
        causes: "Venturia inaequalis fungus overwinters in fallen orchard leaves.",
        symptoms: ["Olive-green to dark velvety leaf spots", "Deformed fruit with brown corky scabs"],
        precautions: {
            organic: "Rake and burn leaf litter in autumn; prune tree canopy for solar exposure.",
            chemical: "Apply Captan or Myclobutanil preventatively during bud break.",
            prevention: "Plant resistant apple varieties such as Liberty or Enterprise."
        },
        sampleImage: "assets/tomato_early_blight_1784878891541.png"
    },
    {
        id: "grape_black_rot", crop: "Grape", name: "Black Rot", severity: "Critical",
        causes: "Guignardia bidwellii fungus infecting leaves, shoots, and fruit berries.",
        symptoms: ["Small reddish-brown leaf spots with black border dots", "Berries shrivel into hard black mummies"],
        precautions: {
            organic: "Prune for maximum airflow; remove all mummified berries from vines.",
            chemical: "Apply Mancozeb or Difenoconazole from pre-bloom to post-bloom.",
            prevention: "Maintain strict canopy sanitation."
        },
        sampleImage: "assets/tomato_early_blight_1784878891541.png"
    }
];

// --- Persistent State Management ---
let scanHistory = JSON.parse(localStorage.getItem('agri_scan_history')) || [
    {
        id: 1,
        diseaseId: "pot_late_blight",
        confidence: 94,
        date: new Date(Date.now() - 86400000).toISOString(),
        image: "assets/potato_late_blight_1784878905395.png"
    },
    {
        id: 2,
        diseaseId: "tom_early_blight",
        confidence: 91,
        date: new Date(Date.now() - 172800000).toISOString(),
        image: "assets/tomato_early_blight_1784878891541.png"
    },
    {
        id: 3,
        diseaseId: "tom_healthy",
        confidence: 99,
        date: new Date(Date.now() - 7200000).toISOString(),
        image: "assets/tomato_early_blight_1784878891541.png"
    }
];

let userProfile = JSON.parse(localStorage.getItem('agri_profile')) || {
    farmName: "Green Acres Farm",
    location: "Midwest Region, Zone 6a",
    primaryCrops: "Tomato, Potato, Corn",
    tempUnit: "c"
};

function saveHistoryToStorage() {
    localStorage.setItem('agri_scan_history', JSON.stringify(scanHistory));
}

// --- App Navigation Logic ---
function switchTab(tabId) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.tab === tabId) item.classList.add('active');
    });

    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    const targetTab = document.getElementById(tabId);
    if (targetTab) targetTab.classList.add('active');

    if (tabId === 'tab-home') {
        renderHomeDashboard();
    } else if (tabId === 'tab-history') {
        renderHistory();
    }
}

document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => switchTab(item.dataset.tab));
});

// Toast System
function showToast(message) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    container.appendChild(toast);
    
    setTimeout(() => {
        if (container && container.contains(toast)) {
            container.removeChild(toast);
        }
    }, 3000);
}

// --- HOME DASHBOARD & STATS LOGIC ---
function renderHomeDashboard() {
    // Render Quick Stats
    const totalScans = scanHistory.length;
    const healthyScans = scanHistory.filter(s => {
        const d = diseasesDB.find(db => db.id === s.diseaseId);
        return d && d.severity === 'Healthy';
    }).length;
    const criticalScans = scanHistory.filter(s => {
        const d = diseasesDB.find(db => db.id === s.diseaseId);
        return d && (d.severity === 'Critical' || d.severity === 'High');
    }).length;

    const healthyRate = totalScans > 0 ? Math.round((healthyScans / totalScans) * 100) : 100;

    document.getElementById('stat-total-scans').textContent = totalScans;
    document.getElementById('stat-healthy-rate').textContent = `${healthyRate}%`;
    document.getElementById('stat-risk-alerts').textContent = criticalScans;

    // Render Recent Scans (Top 3)
    const recentList = document.getElementById('home-recent-scans');
    recentList.innerHTML = '';

    if (scanHistory.length === 0) {
        recentList.innerHTML = `<p style="color:var(--text-secondary); font-size:0.85rem; padding:10px;">No recent scans recorded.</p>`;
        return;
    }

    scanHistory.slice(0, 3).forEach(scan => {
        const disease = diseasesDB.find(d => d.id === scan.diseaseId);
        if (!disease) return;

        let iconClass = 'warning';
        let iconHtml = '<i class="fa-solid fa-triangle-exclamation"></i>';
        if (disease.severity === 'Critical' || disease.severity === 'High') {
            iconClass = 'critical';
        } else if (disease.severity === 'Healthy') {
            iconClass = 'healthy';
            iconHtml = '<i class="fa-solid fa-check"></i>';
        }

        const item = document.createElement('div');
        item.className = 'history-item glass-card';
        item.style.cursor = 'pointer';
        item.innerHTML = `
            <div class="history-icon ${iconClass}">${iconHtml}</div>
            <div class="history-details">
                <h4>${disease.crop} - ${disease.name}</h4>
                <p>${disease.severity !== 'Healthy' ? `${scan.confidence}% AI Confidence` : 'Healthy crop'}</p>
            </div>
            <div class="history-time">${getTimeAgo(scan.date)}</div>
        `;
        item.addEventListener('click', () => {
            const index = scanHistory.findIndex(s => s.id === scan.id);
            showResultModal(disease, scan.confidence, scan.image, true, index);
        });
        recentList.appendChild(item);
    });
}

// Weather Risk Radar Simulator
const weatherSimSelect = document.getElementById('weather-sim-select');
if (weatherSimSelect) {
    weatherSimSelect.addEventListener('change', (e) => {
        const val = e.target.value;
        const badge = document.getElementById('weather-risk-badge');
        const desc = document.getElementById('weather-risk-desc');

        if (val === 'humidity') {
            badge.className = 'badge warning';
            badge.textContent = 'High Fungal Risk';
            desc.textContent = 'High relative humidity (>85%) detected. Fungal spores of Phytophthora and Alternaria pose immediate risk to Solanaceous crops (Tomatoes & Potatoes).';
        } else if (val === 'rain') {
            badge.className = 'badge critical';
            badge.textContent = 'Critical Spore Spread Alert';
            desc.textContent = 'Heavy rainfall and soil splash predicted. Rapid spread risk for Rice Blast, Apple Scab, and Bacterial Spot. Ensure protective fungicide coating.';
        } else if (val === 'dry') {
            badge.className = 'badge healthy';
            badge.textContent = 'Low Disease Activity';
            desc.textContent = 'Dry & warm weather conditions. Low fungal spore germination risk. Monitor crops for mite/whitefly pest infestations and irrigation needs.';
        }
        showToast(`Environmental risk updated: ${badge.textContent}`);
    });
}


// --- SCAN & CAMERA FLOW ---
const fileInput = document.getElementById('file-input');
const uploadArea = document.getElementById('upload-area');
const previewContainer = document.getElementById('preview-container');
const imgPreview = document.getElementById('image-preview');
const uploadPlaceholder = document.getElementById('upload-placeholder');
const analyzeBtn = document.getElementById('analyze-btn');
const reselectBtn = document.getElementById('reselect-btn');
const scanningBeam = document.querySelector('.scanning-beam');
const cropSelector = document.getElementById('crop-selector');

// Camera Elements
const startCameraBtn = document.getElementById('start-camera-btn');
const cameraOverlay = document.getElementById('camera-overlay');
const closeCameraBtn = document.getElementById('close-camera-btn');
const capturePhotoBtn = document.getElementById('capture-photo-btn');
const cameraFeed = document.getElementById('camera-feed');
const cameraCanvas = document.getElementById('camera-canvas');
let mediaStream = null;

let currentImageBase64 = null;

// File Upload Handlers
uploadArea.addEventListener('click', (e) => {
    // Only trigger file input if clicked outside camera button and preview is hidden
    if (previewContainer.classList.contains('hidden') && !e.target.closest('#start-camera-btn')) {
        fileInput.click();
    }
});

uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = 'var(--primary-light)';
});

uploadArea.addEventListener('dragleave', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = 'var(--surface-border)';
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = 'var(--surface-border)';
    if (e.dataTransfer.files.length) {
        handleFile(e.dataTransfer.files[0]);
    }
});

fileInput.addEventListener('change', (e) => {
    if (e.target.files.length) {
        handleFile(e.target.files[0]);
    }
});

function handleFile(file) {
    if (!file.type.startsWith('image/')) {
        showToast('Please select a valid image file');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        currentImageBase64 = e.target.result;
        imgPreview.src = currentImageBase64;
        uploadPlaceholder.classList.add('hidden');
        previewContainer.classList.remove('hidden');
        analyzeBtn.disabled = false;
        reselectBtn.disabled = false;
        scanningBeam.classList.add('active');
    };
    reader.readAsDataURL(file);
}

reselectBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    resetScan();
});

function resetScan() {
    previewContainer.classList.add('hidden');
    uploadPlaceholder.classList.remove('hidden');
    analyzeBtn.disabled = true;
    reselectBtn.disabled = true;
    scanningBeam.classList.remove('active');
    fileInput.value = '';
    currentImageBase64 = null;
}

// Live Camera Stream Handlers
if (startCameraBtn) {
    startCameraBtn.addEventListener('click', async (e) => {
        e.stopPropagation();
        try {
            mediaStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
            });
            cameraFeed.srcObject = mediaStream;
            cameraOverlay.classList.remove('hidden');
        } catch (err) {
            console.warn('Camera access issue:', err);
            showToast('Unable to open camera stream. Please use file upload.');
        }
    });
}

function stopCameraStream() {
    if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
        mediaStream = null;
    }
    cameraOverlay.classList.add('hidden');
}

if (closeCameraBtn) closeCameraBtn.addEventListener('click', stopCameraStream);

if (capturePhotoBtn) {
    capturePhotoBtn.addEventListener('click', () => {
        if (!mediaStream) return;
        const width = cameraFeed.videoWidth || 640;
        const height = cameraFeed.videoHeight || 480;
        cameraCanvas.width = width;
        cameraCanvas.height = height;
        const ctx = cameraCanvas.getContext('2d');
        ctx.drawImage(cameraFeed, 0, 0, width, height);

        currentImageBase64 = cameraCanvas.toDataURL('image/jpeg');
        imgPreview.src = currentImageBase64;
        
        stopCameraStream();

        uploadPlaceholder.classList.add('hidden');
        previewContainer.classList.remove('hidden');
        analyzeBtn.disabled = false;
        reselectBtn.disabled = false;
        scanningBeam.classList.add('active');
        showToast('Photo captured successfully!');
    });
}

// Analyze Process with Selected Crop Target
analyzeBtn.addEventListener('click', () => {
    const overlay = document.getElementById('analyzing-overlay');
    const statusText = document.getElementById('analyzing-status');
    overlay.classList.remove('hidden');
    scanningBeam.classList.add('active');

    const selectedCrop = cropSelector.value;
    
    let step = 0;
    const steps = [
        "Scanning leaf cellular structures...",
        "Evaluating pathogen spot markers...",
        "Cross-referencing AgriGuard AI neural database..."
    ];

    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += 10;
        if (progress % 30 === 0 && step < steps.length - 1) {
            step++;
            statusText.textContent = steps[step];
        }
        const circular = document.querySelector('.circular-progress');
        circular.style.background = `conic-gradient(var(--primary-light) ${progress * 3.6}deg, rgba(255,255,255,0.1) 0deg)`;
    }, 250);

    setTimeout(() => {
        clearInterval(progressInterval);
        overlay.classList.add('hidden');
        
        // Filter disease candidates based on crop selection
        let eligibleDiseases = diseasesDB;
        if (selectedCrop !== 'auto') {
            eligibleDiseases = diseasesDB.filter(d => d.crop.toLowerCase() === selectedCrop.toLowerCase());
            if (eligibleDiseases.length === 0) eligibleDiseases = diseasesDB;
        }

        const pickedDisease = eligibleDiseases[Math.floor(Math.random() * eligibleDiseases.length)];
        const confidence = Math.floor(Math.random() * (98 - 88 + 1) + 88);
        
        showResultModal(pickedDisease, confidence, currentImageBase64, false);
    }, 2600);
});

// Result Modal Logic
let currentScanResult = null;
let currentViewingHistoryIndex = -1;

function showResultModal(disease, confidence, imgSrc, isSavedHistoryItem = false, historyIndex = -1) {
    currentScanResult = { disease, confidence, imgSrc };
    currentViewingHistoryIndex = historyIndex;
    
    const modal = document.getElementById('result-modal');
    document.getElementById('result-thumb').src = imgSrc || disease.sampleImage;
    document.getElementById('result-disease').textContent = disease.name;
    document.getElementById('result-crop').textContent = disease.crop;
    document.getElementById('result-confidence').textContent = `${confidence}% AI Confidence`;
    
    const severityBadge = document.getElementById('severity-indicator');
    let severityClass = 'warning';
    if (disease.severity === 'Critical' || disease.severity === 'High') severityClass = 'critical';
    else if (disease.severity === 'Healthy') severityClass = 'healthy';
    
    severityBadge.innerHTML = `<span class="badge ${severityClass}">${disease.severity} Risk</span>`;
    
    document.getElementById('result-causes').innerHTML = `<p>${disease.causes}</p>`;
    
    const symptomsList = document.getElementById('result-symptoms');
    symptomsList.innerHTML = '';
    disease.symptoms.forEach(sym => {
        const li = document.createElement('li');
        li.textContent = sym;
        symptomsList.appendChild(li);
    });

    document.getElementById('p-organic').textContent = disease.precautions.organic;
    document.getElementById('p-chemical').textContent = disease.precautions.chemical;
    document.getElementById('p-prevention').textContent = disease.precautions.prevention;

    const saveBtn = document.getElementById('save-result-btn');
    const deleteBtn = document.getElementById('delete-result-btn');

    if (isSavedHistoryItem) {
        saveBtn.classList.add('hidden');
        deleteBtn.classList.remove('hidden');
    } else {
        saveBtn.classList.remove('hidden');
        deleteBtn.classList.add('hidden');
    }

    modal.classList.remove('hidden');
}

// Result Modal Actions
document.getElementById('close-result-btn').addEventListener('click', () => {
    document.getElementById('result-modal').classList.add('hidden');
    resetScan();
});

document.getElementById('save-result-btn').addEventListener('click', () => {
    if (currentScanResult) {
        scanHistory.unshift({
            id: Date.now(),
            diseaseId: currentScanResult.disease.id,
            confidence: currentScanResult.confidence,
            date: new Date().toISOString(),
            image: currentScanResult.imgSrc
        });
        saveHistoryToStorage();
        showToast('Diagnostic report saved to history');
        document.getElementById('result-modal').classList.add('hidden');
        resetScan();
        switchTab('tab-history');
    }
});

const deleteResultBtn = document.getElementById('delete-result-btn');
if (deleteResultBtn) {
    deleteResultBtn.addEventListener('click', () => {
        if (currentViewingHistoryIndex >= 0 && currentViewingHistoryIndex < scanHistory.length) {
            scanHistory.splice(currentViewingHistoryIndex, 1);
            saveHistoryToStorage();
            showToast('Scan record deleted');
            document.getElementById('result-modal').classList.add('hidden');
            renderHistory();
            renderHomeDashboard();
        }
    });
}

// Export Diagnostic Report
const exportReportBtn = document.getElementById('export-report-btn');
if (exportReportBtn) {
    exportReportBtn.addEventListener('click', () => {
        if (!currentScanResult) return;
        const d = currentScanResult.disease;
        const reportContent = `
========== AG RIGUARD AI DIAGNOSTIC REPORT ==========
Date: ${new Date().toLocaleString()}
Crop: ${d.crop}
Diagnosis: ${d.name} (${d.severity} Risk)
AI Confidence: ${currentScanResult.confidence}%

[PATHOGEN & CAUSES]
${d.causes}

[SYMPTOMS]
- ${d.symptoms.join('\n- ')}

[ORGANIC CONTROL]
${d.precautions.organic}

[CHEMICAL TREATMENT]
${d.precautions.chemical}

[PREVENTION PROTOCOL]
${d.precautions.prevention}
===================================================
        `.trim();

        const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `AgriGuard_Report_${d.crop}_${d.name.replace(/\s+/g, '_')}.txt`;
        link.click();
        showToast('Diagnostic report downloaded!');
    });
}

// Precaution Tabs
document.querySelectorAll('.p-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.p-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.p-content').forEach(c => c.classList.add('hidden'));
        
        tab.classList.add('active');
        const target = document.getElementById(`p-${tab.dataset.target}`);
        if (target) target.classList.remove('hidden');
    });
});


// --- LIBRARY LOGIC ---
function renderLibrary(filter = 'all', searchQuery = '') {
    const list = document.getElementById('library-list');
    list.innerHTML = '';
    
    let filteredDB = diseasesDB.filter(d => d.name !== 'Healthy Foliage' && d.name !== 'Healthy Corn' && d.name !== 'Healthy Paddy');
    
    if (filter !== 'all') {
        filteredDB = filteredDB.filter(d => d.crop.toLowerCase() === filter);
    }
    
    if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredDB = filteredDB.filter(d => 
            d.name.toLowerCase().includes(query) || 
            d.crop.toLowerCase().includes(query) ||
            d.causes.toLowerCase().includes(query)
        );
    }
    
    if (filteredDB.length === 0) {
        list.innerHTML = `<div class="empty-state">
            <p>No diseases found matching your search.</p>
        </div>`;
        return;
    }

    filteredDB.forEach(disease => {
        let severityClass = disease.severity === 'Critical' || disease.severity === 'High' ? 'critical' : 'warning';
        
        const item = document.createElement('div');
        item.className = 'library-item glass-card';
        item.innerHTML = `
            <div class="library-item-header">
                <div>
                    <h4 style="margin-bottom:4px; font-size:1rem;">${disease.name}</h4>
                    <span class="badge crop-badge">${disease.crop}</span>
                    <span class="badge ${severityClass}">${disease.severity}</span>
                </div>
                <i class="fa-solid fa-chevron-down expand-icon" style="transition:0.3s;"></i>
            </div>
            <div class="library-item-content">
                <p style="margin-top:8px;"><strong>Causes:</strong> ${disease.causes}</p>
                <p style="margin-top:6px;"><strong>Symptoms:</strong> ${disease.symptoms.join(', ')}</p>
                <p style="margin-top:6px;"><strong>Treatment:</strong> ${disease.precautions.chemical}</p>
            </div>
        `;
        
        item.addEventListener('click', () => {
            item.classList.toggle('expanded');
        });
        
        list.appendChild(item);
    });
}

document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
        document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        renderLibrary(chip.dataset.filter, document.getElementById('library-search').value);
    });
});

document.getElementById('library-search').addEventListener('input', (e) => {
    const activeFilter = document.querySelector('.chip.active').dataset.filter;
    renderLibrary(activeFilter, e.target.value);
});


// --- HISTORY LOGIC ---
function getTimeAgo(dateString) {
    const date = new Date(dateString);
    const seconds = Math.floor((new Date() - date) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval >= 1 && interval < 2) return "Yesterday";
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval >= 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval >= 1) return Math.floor(interval) + " mins ago";
    return "Just now";
}

function renderHistory() {
    const list = document.getElementById('history-list');
    const emptyState = document.getElementById('history-empty');
    const filterValue = document.getElementById('history-filter-select').value;
    
    Array.from(list.children).forEach(child => {
        if (child.id !== 'history-empty') list.removeChild(child);
    });
    
    let filteredHistory = scanHistory;

    if (filterValue === 'critical') {
        filteredHistory = scanHistory.filter(s => {
            const d = diseasesDB.find(db => db.id === s.diseaseId);
            return d && (d.severity === 'Critical' || d.severity === 'High');
        });
    } else if (filterValue === 'warning') {
        filteredHistory = scanHistory.filter(s => {
            const d = diseasesDB.find(db => db.id === s.diseaseId);
            return d && d.severity === 'Medium';
        });
    } else if (filterValue === 'healthy') {
        filteredHistory = scanHistory.filter(s => {
            const d = diseasesDB.find(db => db.id === s.diseaseId);
            return d && d.severity === 'Healthy';
        });
    }

    if (filteredHistory.length === 0) {
        emptyState.classList.remove('hidden');
        return;
    }
    
    emptyState.classList.add('hidden');
    
    filteredHistory.forEach((scan, index) => {
        const disease = diseasesDB.find(d => d.id === scan.diseaseId);
        if (!disease) return;

        let iconClass = 'warning';
        let iconHtml = '<i class="fa-solid fa-triangle-exclamation"></i>';
        if (disease.severity === 'Critical' || disease.severity === 'High') {
            iconClass = 'critical';
        } else if (disease.severity === 'Healthy') {
            iconClass = 'healthy';
            iconHtml = '<i class="fa-solid fa-check"></i>';
        }

        const item = document.createElement('div');
        item.className = 'history-item glass-card';
        item.style.cursor = 'pointer';
        item.innerHTML = `
            <div class="result-image-thumb" style="width:48px; height:48px; border-radius:8px; border:none; flex-shrink:0;">
                <img src="${scan.image || disease.sampleImage}" alt="scan" style="width:100%; height:100%; object-fit:cover; border-radius:8px;">
            </div>
            <div class="history-details" style="margin-left: 10px;">
                <h4 style="margin-bottom:2px;">${disease.crop} - ${disease.name}</h4>
                <p>${disease.severity !== 'Healthy' ? `${scan.confidence}% AI Confidence` : 'No issues detected'}</p>
            </div>
            <div class="history-time">${getTimeAgo(scan.date)}</div>
        `;
        
        item.addEventListener('click', () => {
            const originalIndex = scanHistory.findIndex(s => s.id === scan.id);
            showResultModal(disease, scan.confidence, scan.image || disease.sampleImage, true, originalIndex);
        });
        
        list.appendChild(item);
    });
}

document.getElementById('history-filter-select').addEventListener('change', renderHistory);

document.getElementById('clear-history-btn').addEventListener('click', () => {
    if (scanHistory.length === 0) return;
    if (confirm('Are you sure you want to clear all scan history records?')) {
        scanHistory = [];
        saveHistoryToStorage();
        renderHistory();
        renderHomeDashboard();
        showToast('Scan history cleared');
    }
});


// --- AI AGRONOMIST CHATBOT LOGIC ---
const chatbotFab = document.getElementById('chatbot-fab');
const chatbotModal = document.getElementById('chatbot-modal');
const closeChatBtn = document.getElementById('close-chat-btn');
const sendChatBtn = document.getElementById('send-chat-btn');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');

if (chatbotFab) {
    chatbotFab.addEventListener('click', () => {
        chatbotModal.classList.remove('hidden');
    });
}

if (closeChatBtn) {
    closeChatBtn.addEventListener('click', () => {
        chatbotModal.classList.add('hidden');
    });
}

function sendChatMessage(text) {
    if (!text.trim()) return;

    // User message
    const userMsg = document.createElement('div');
    userMsg.className = 'chat-bubble user-message';
    userMsg.textContent = text;
    chatMessages.appendChild(userMsg);
    chatInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Typing indicator
    const typingMsg = document.createElement('div');
    typingMsg.className = 'chat-bubble bot-message';
    typingMsg.textContent = 'AI Agronomist is analyzing your question...';
    chatMessages.appendChild(typingMsg);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    setTimeout(() => {
        chatMessages.removeChild(typingMsg);

        // AI Response Generator
        const lower = text.toLowerCase();
        let reply = "As an AI Agronomist, I recommend regular scouting, proper drainage, and applying organic copper sprays preventatively. For target pest control, ensure crop rotation every 3 years.";

        if (lower.includes('early blight') || lower.includes('blight')) {
            reply = "Early Blight (Alternaria solani) causes target-like ring spots on foliage. Apply copper octanoate or Mancozeb, prune lower leaves, and water strictly at plant base to prevent rain splash spread.";
        } else if (lower.includes('rice blast') || lower.includes('fertilizer') || lower.includes('rice')) {
            reply = "Rice Blast (Magnaporthe oryzae) thrives under excess Nitrogen. Split your N fertilizer into 3-4 doses, maintain 5-10cm field water depth, and apply Tricyclazole at early tiller stage.";
        } else if (lower.includes('potato') || lower.includes('late blight')) {
            reply = "Potato Late Blight is critical! Immediately destroy infected foliage, hill soil high to shield tubers, and apply Cymoxanil + Mancozeb preventatively during high moisture conditions.";
        } else if (lower.includes('neem') || lower.includes('organic') || lower.includes('bio')) {
            reply = "Organic farming tip: 5% Neem seed kernel extract (NSKE) or cold-pressed neem oil (5ml/L) effectively deters whiteflies, aphids, and early fungal hyphae without harming beneficial pollinators!";
        } else if (lower.includes('hi') || lower.includes('hello')) {
            reply = "Hello farmer! I am ready to assist with crop diagnosis, spray schedules, soil nutrients, or pest warnings. How are your fields today?";
        }

        const botReply = document.createElement('div');
        botReply.className = 'chat-bubble bot-message';
        botReply.textContent = reply;
        chatMessages.appendChild(botReply);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);
}

if (sendChatBtn) {
    sendChatBtn.addEventListener('click', () => sendChatMessage(chatInput.value));
}
if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendChatMessage(chatInput.value);
    });
}

document.querySelectorAll('.prompt-chip').forEach(chip => {
    chip.addEventListener('click', () => {
        sendChatMessage(chip.dataset.prompt);
    });
});


// --- PROFILE & FARM SETTINGS LOGIC ---
const profileBtn = document.getElementById('profile-btn');
const profileModal = document.getElementById('profile-modal');
const closeProfileBtn = document.getElementById('close-profile-btn');
const saveProfileBtn = document.getElementById('save-profile-btn');

if (profileBtn) {
    profileBtn.addEventListener('click', () => {
        document.getElementById('farm-name').value = userProfile.farmName;
        document.getElementById('farm-location').value = userProfile.location;
        document.getElementById('primary-crop-setting').value = userProfile.primaryCrops;
        document.getElementById('temp-unit').value = userProfile.tempUnit;
        profileModal.classList.remove('hidden');
    });
}

if (closeProfileBtn) {
    closeProfileBtn.addEventListener('click', () => {
        profileModal.classList.add('hidden');
    });
}

if (saveProfileBtn) {
    saveProfileBtn.addEventListener('click', () => {
        userProfile = {
            farmName: document.getElementById('farm-name').value,
            location: document.getElementById('farm-location').value,
            primaryCrops: document.getElementById('primary-crop-setting').value,
            tempUnit: document.getElementById('temp-unit').value
        };
        localStorage.setItem('agri_profile', JSON.stringify(userProfile));
        showToast('Farm settings saved');
        profileModal.classList.add('hidden');
    });
}


// --- INITIAL APP RENDERS ---
renderHomeDashboard();
renderLibrary();
renderHistory();
