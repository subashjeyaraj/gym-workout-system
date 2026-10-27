# ⚡ GYM HUB - Futuristic Tactical Fitness & Armory Web App

A high-performance, cyberpunk-inspired web application engineered for athlete biometric tracking, customized workout protocols, nutritional intelligence, supplements armory, and an AI fitness coach.

![Gym Hub Preview](hi.jpg)

---

## 🌟 Key Features

### 1. 🔐 Biometric Authentication Portal (`index.html`)
- **Instant 1-Click Demo Login:** Immediate access buttons for Athlete, Coach, and Admin roles.
- **Biometric Registration:** Records Name, Age, Height, Weight, and Primary Training Goal (Hypertrophy, Fat Loss, Conditioning).
- **Persistent Local Database:** All users and session data safely persisted across reloads.

### 2. ⚡ Command HUD Dashboard (`dashboard.html`)
- **Live Biometric Readout:** Auto-calculates user BMI, target calorie baseline, and status.
- **Integrated Navigation:** Seamless unified top navbar across all modules with real-time active cart counters and session state.

### 3. 🏋️ Combat Workout & Quest Generator (`workout.html`)
- **Rank-Tiered Splits:** Novice (Rank E), Warrior (Rank C), and Titan (Rank S) protocols.
- **Interactive Exercise Armory:** Animated guides for Pushups, Squats, Planks, Lunges, and Burpees.
- **Algorithmic Daily Quest Generator:** Generates combat routines with check-off completion states.
- **Integrated Rest Interval Timer:** 60-second rest counter with synthesized audio alarms.

### 4. 🥗 Nutritional Intelligence & Bio-Fuel (`diet.html`)
- **Auto-Calculated Energy Metrics:** Generates Maintenance, Bulking surplus, and Shredding deficit targets.
- **Macro Meal Protocols:** Veg & Non-Veg meal options with detailed protein, carb, and fat breakdowns.
- **Hydration Command Center:** Interactive 8-glass daily water tracker with animated progress bar and persistent storage.

### 5. 📈 Evolution & Progress Tracker (`progress.html`)
- **Telemetry Charts:** Dynamic Chart.js line charts tracking Body Mass Evolution (kg) and Chest Expansion (cm).
- **Workout History Logger:** Add sets, reps, and duration to persistent session history.

### 6. 🛒 Armory & Supplement Store (`store.html`, `wishlist.html`)
- **Curated Store Catalog:** Whey Protein, Micronized Creatine, Multivitamins, Iron Dumbbells, Yoga Mats, Resistance Bands.
- **Shopping Cart Drawer:** Real-time quantity adjustments, GST tax calculation, and free shipping.
- **Wishlist Station:** Save items and transfer them directly into active orders with 1 click.

### 7. 💳 Checkout & Settlement (`payment-method.html`, `upi-processing.html`, `order-success.html`)
- **Payment Gateways:** PhonePe UPI, Google Pay, and Cash on Delivery.
- **Simulated Terminal:** High-tech verification steps with order reference generator and arrival dates.

### 8. 🤖 AI Tactical Fitness Coach (`chatbot.html`)
- **Instant Consultation:** Actionable intelligence on Push-Pull-Legs splits, daily protein calculations, creatine timing, and joint recovery protocols.
- **Suggested Prompts:** Quick-tap chips for immediate answers with synthesized audio feedback.

---

## 🛠️ Technology Stack

- **HTML5 & Vanilla JavaScript:** Pure zero-dependency, ultra-fast client-side execution.
- **CSS3 Design System:** Custom glassmorphism, responsive flex/grid layouts, cyberpunk neon color palette (`#00f6ff`, `#ff007f`).
- **Web Audio API:** Zero-latency built-in synthesized sound effects (clicks, quest completion, alerts).
- **Chart.js:** Responsive data visualization for evolution telemetry.
- **Web Storage API (`localStorage`):** Persistent user profiles, carts, wishlists, hydration progress, and workout histories.

---

## 🚀 How to Run Locally

1. Clone or download the repository:
   ```bash
   git clone https://github.com/<your-username>/GYM.git
   ```
2. Open `index.html` in any modern web browser (Google Chrome, Microsoft Edge, Firefox, Brave, Safari).
3. Click any **"⚡ Quick Instant Access"** button (Demo Athlete, Trainer, or Admin) to experience the app immediately!

---

## 🌐 Deploying to GitHub Pages

1. Go to your GitHub repository **Settings**.
2. Scroll down to **Pages** in the left sidebar.
3. Under **Branch**, select `main` (or `master`) and folder `/ (root)`.
4. Click **Save**. Your site will be live on GitHub Pages in under a minute!
