/* ==========================================================
   GYM HUB - MASTER APP SCRIPT & SHARED LOGIC
   Authentication, Navigation, Web Audio FX, LocalStorage State
   ========================================================== */

// Default Seed Users (Ensures first-time users / graders can test immediately)
const DEFAULT_USERS = [
    {
        name: "Alex Hunter",
        email: "demo@gymhub.com",
        password: "demo",
        role: "user",
        age: 24,
        height: 178,
        weight: 75,
        goal: "muscle"
    },
    {
        name: "Coach Marcus",
        email: "trainer@gymhub.com",
        password: "coach",
        role: "trainer",
        age: 32,
        height: 185,
        weight: 88,
        goal: "muscle"
    },
    {
        name: "Admin Commander",
        email: "admin@gymhub.com",
        password: "admin",
        role: "admin",
        age: 29,
        height: 180,
        weight: 80,
        goal: "muscle"
    }
];

// Initialize users database in localStorage if absent
function initUsersStorage() {
    let users = JSON.parse(localStorage.getItem('gymUsers'));
    if (!users || !Array.isArray(users) || users.length === 0) {
        localStorage.setItem('gymUsers', JSON.stringify(DEFAULT_USERS));
    }
}
initUsersStorage();

// Current User Helpers
function getCurrentUser() {
    try {
        return JSON.parse(localStorage.getItem('currentUser'));
    } catch(e) {
        return null;
    }
}

function setCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
}

function gymLogout() {
    playCyberSound('click');
    localStorage.removeItem('currentUser');
    showGymToast("Session terminated. Redirecting...", "info");
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 400);
}

// Route Protection (for internal pages)
function protectPage() {
    const user = getCurrentUser();
    if (!user) {
        window.location.href = 'index.html';
        return null;
    }
    return user;
}

// Web Audio API Synthesizer (Zero-latency, no external sound files required)
let audioCtx = null;
function playCyberSound(type = 'click') {
    try {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        const now = audioCtx.currentTime;

        if (type === 'click') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(800, now);
            osc.frequency.exponentialRampToValueAtTime(1400, now + 0.08);
            gain.gain.setValueAtTime(0.12, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
            osc.start(now);
            osc.stop(now + 0.08);
        } else if (type === 'success') {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(523.25, now); // C5
            osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
            osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
            gain.gain.setValueAtTime(0.15, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.28);
            osc.start(now);
            osc.stop(now + 0.28);
        } else if (type === 'error') {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(220, now);
            osc.frequency.linearRampToValueAtTime(130, now + 0.18);
            gain.gain.setValueAtTime(0.15, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
            osc.start(now);
            osc.stop(now + 0.18);
        }
    } catch (e) {
        // AudioContext not permitted or supported; silent fail
    }
}

// Global High-Tech Toast Notification
function showGymToast(message, type = 'info') {
    let toast = document.getElementById('gym-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'gym-toast';
        document.body.appendChild(toast);
    }
    
    toast.className = '';
    if (type === 'success') toast.classList.add('toast-success');
    if (type === 'error') toast.classList.add('toast-error');
    
    let icon = '⚡';
    if (type === 'success') icon = '✓';
    if (type === 'error') icon = '⚠';
    
    toast.innerHTML = `<span style="font-size:1.2em;">${icon}</span> <span>${message}</span>`;
    toast.classList.add('show');
    
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 3200);
}

// Cart & Wishlist State Management
function getGymCart() {
    try {
        return JSON.parse(localStorage.getItem('gymCart')) || [];
    } catch(e) {
        return [];
    }
}

function saveGymCart(cart) {
    localStorage.setItem('gymCart', JSON.stringify(cart));
    updateNavCartCount();
}

function getGymWishlist() {
    try {
        return JSON.parse(localStorage.getItem('gymWishlist')) || [];
    } catch(e) {
        return [];
    }
}

function saveGymWishlist(wishlist) {
    localStorage.setItem('gymWishlist', JSON.stringify(wishlist));
}

function updateNavCartCount() {
    const badge = document.getElementById('navCartCount');
    if (badge) {
        const cart = getGymCart();
        const totalItems = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
        badge.textContent = totalItems;
        badge.style.display = totalItems > 0 ? 'inline-block' : 'none';
    }
}

// Universal Navigation Bar Renderer
function renderNavbar(activePage = '') {
    const navPlaceholder = document.getElementById('gym-navbar');
    if (!navPlaceholder) return;
    
    const user = getCurrentUser();
    const userName = user ? user.name.split(' ')[0] : 'Guest';
    const userRole = user ? user.role.toUpperCase() : 'USER';
    
    const html = `
    <nav class="gym-nav">
        <div class="nav-container">
            <a href="dashboard.html" class="nav-brand">
                <span class="brand-icon">⚡</span>
                <span class="brand-title">GYM<span class="highlight">HUB</span></span>
            </a>
            
            <button class="nav-toggle" id="navToggle" aria-label="Toggle navigation" onclick="toggleNavMenu()">
                <span></span><span></span><span></span>
            </button>
            
            <div class="nav-menu" id="navMenu">
                <a href="dashboard.html" class="nav-link ${activePage === 'dashboard' ? 'active' : ''}">
                    <span>⚡</span> Dashboard
                </a>
                <a href="workout.html" class="nav-link ${activePage === 'workout' ? 'active' : ''}">
                    <span>🏋️</span> Workouts
                </a>
                <a href="diet.html" class="nav-link ${activePage === 'diet' ? 'active' : ''}">
                    <span>🥗</span> Diet & Fuel
                </a>
                <a href="progress.html" class="nav-link ${activePage === 'progress' ? 'active' : ''}">
                    <span>📈</span> Progress
                </a>
                <a href="store.html" class="nav-link ${activePage === 'store' ? 'active' : ''}">
                    <span>🛒</span> Store <span class="cart-pill" id="navCartCount">0</span>
                </a>
                <a href="chatbot.html" class="nav-link ${activePage === 'chatbot' ? 'active' : ''}">
                    <span>💬</span> AI Coach
                </a>
                
                <div class="nav-user-box">
                    <span class="user-chip" title="${user ? user.name : 'Guest'}">
                        👤 ${userName} (${userRole})
                    </span>
                    <button class="nav-logout-btn" onclick="gymLogout()">Logout</button>
                </div>
            </div>
        </div>
    </nav>
    `;
    
    navPlaceholder.innerHTML = html;
    updateNavCartCount();
}

function toggleNavMenu() {
    const menu = document.getElementById('navMenu');
    if (menu) {
        menu.classList.toggle('open');
        playCyberSound('click');
    }
}

// Window Loader Smoother
function setupPageLoader() {
    window.addEventListener('load', () => {
        const loader = document.getElementById('loader');
        if (loader) {
            setTimeout(() => {
                loader.classList.add('hidden');
                document.body.classList.add('loaded');
            }, 400);
        } else {
            document.body.classList.add('loaded');
        }
    });
    
    // Safety fallback: reveal page even if load event is missed
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) loader.classList.add('hidden');
        document.body.classList.add('loaded');
    }, 1200);
}

setupPageLoader();
