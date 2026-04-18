# 🔷 AmalGus — The Smartest Way to Buy Glass

AmalGus is a comprehensive B2B marketplace platform tailored for the glass industry. It unites buyers (like contractors and interior designers) with verified glass fabricators, dealers, and installation partners. The platform is designed to make product discovery, price comparison, and purchasing seamless using AI-driven matching and real-time market data.

## ✨ Key Features

- **🧠 Smart AI Product Matcher:** Type in your project requirements (e.g., "soundproof glass for a bedroom"), and the Groq-powered AI engine maps your needs to specific glass types and specifications while considering your user role (Buyer, Contractor, etc.).
- **📊 Real-time Daily Rates Tracker:** Stay updated on fluctuating market prices for various glass types (Toughened, Laminated, DGU, etc.) with simulated daily stock-ticker-like updates.
- **🛒 Comprehensive Product Catalog:** Filter and search through an extensive database of primary glass products and their corresponding allied hardware (spider fittings, sealants, U-channels, etc.).
- **🏭 Vendor Comparison:** Compare verified vendors based on ratings, certifications, MOQ (Minimum Order Quantity), delivery times, and pricing.
- **🧮 Project Estimate Calculator:** Calculate detailed cost estimates based on glass type, total area, required thickness, processing (e.g., frosted/tinted), and delivery locations.

## 🛠️ Technology Stack

### **Frontend (`/client`)**
- **Framework:** React 19 + Vite
- **Routing:** React Router v7
- **Styling:** Vanilla CSS (App.css / index.css) + Framer Motion (for dynamic micro-animations)
- **Icons:** Lucide React
- **Network:** Axios

### **Backend (`/server`)**
- **Runtime:** Node.js
- **Framework:** Express.js
- **AI Integration:** Groq SDK (Llama 3 8B model via `groq-sdk`)
- **Security & Logging:** Helmet, Morgan, CORS
- **Database:** Local JSON File-based storage (`/data` directory)

---

## 🚀 Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/en/) (v18+ recommended)
- [Groq API Key](https://console.groq.com/keys)

### 1. Clone the repository
```bash
git clone https://github.com/ynakoo/AmalGuss.git
cd AmalGuss
```

### 2. Setup the Backend
Open a terminal and navigate to the server directory:
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory and add the following variables:
```env
PORT=5001
GROQ_API_KEY=your_groq_api_key_here
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

Start the backend server:
```bash
npm run dev
# OR
npm start
```
*The server will run on http://localhost:5001*

### 3. Setup the Frontend
Open a new terminal and navigate to the client directory:
```bash
cd client
npm install
```

Create a `.env` file in the `client` directory (if not exists) and add:
```env
VITE_API_URL=http://localhost:5001/api
```

Start the frontend development server:
```bash
npm run dev
```
*The React app will be available at http://localhost:5173*

---

## 🌍 Deployment Options

### Deploying the Backend (Render / Railway / Heroku)
1. Fork or upload this repository to GitHub.
2. In your hosting provider (e.g., [Render](https://render.com/)), create a new **Web Service**.
3. Set the **Root Directory** to `server`.
4. Set the **Build Command** to `npm install`.
5. Set the **Start Command** to `npm start`.
6. Add the environment variables (`GROQ_API_KEY`, `NODE_ENV=production`, `CLIENT_URL=https://your-frontend-url.vercel.app`).

### Deploying the Frontend (Vercel / Netlify)
1. Import the repository into [Vercel](https://vercel.com/).
2. Set the **Root Directory** to `client`.
3. Vercel will automatically detect Vite and set the build commands.
4. Add the **Environment Variable**: `VITE_API_URL` exactly as `https://your-deployed-backend-url.onrender.com/api`.
5. Deploy!

---

## 📂 Project Structure

```text
AmalGuss/
├── client/                     # Frontend React Application
│   ├── public/
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── context/            # Global state context
│   │   ├── pages/              # Route pages (Landing, Catalog, SmartMatch, etc.)
│   │   ├── services/           # Axios API services
│   │   ├── App.jsx             # Main router
│   │   └── main.jsx
│   ├── vercel.json             # Vercel deployment configurations
│   └── vite.config.js
└── server/                     # Backend Node/Express Application
    ├── data/                   # JSON schemas (products, vendors, rates)
    ├── middleware/             # Express middlewares (error handling)
    ├── routes/                 # API route definitions
    ├── services/               # AI matching and pricing logic
    └── index.js                # Server entry point
```



