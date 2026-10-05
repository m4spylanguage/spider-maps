# 🗺️ Spider Maps

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Framework: React 19 + Vite](https://img.shields.io/badge/Framework-React%2019%20%7C%20Vite-61dafb.svg)](#technology-stack)
[![Map Engine: MapLibre GL](https://img.shields.io/badge/Engine-MapLibre%20GL-brightgreen.svg)](#features)

**Spider Maps** is a high-performance, lightweight, and privacy-first native web mapping application built for **Spider OS**. Designed as a modern alternative to bloated, tracking-heavy mapping services, Spider Maps delivers smooth 60 FPS vector tile rendering, offline points of interest, turn-by-turn directions, and responsive desktop aesthetics.

---

## ✨ Features

* **⚡ Ultra-Smooth Vector Rendering:** Powered by **MapLibre GL**, featuring hardware-accelerated WebGL vector tiles, high-DPI scaling, and fluid zooming/panning.
* **🔒 Privacy-First:** No location logging, zero third-party telemetry, and client-side place searching.
* **📍 Comprehensive Places Database:** Search landmarks, points of interest (POI), transit stops, and geographic regions.
* **🧭 Turn-by-Turn Navigation:** Dynamic routing and directions engine with customizable transit modes.
* **🎨 Spider OS Native UI Design:** Styled with Tailwind CSS, sleek translucent panels, smooth gestures, and responsive layouts that look at home in both desktop and touch environments.
* **Offline Caching:** Caches frequently viewed map areas and places locally for instantaneous loading.

---

## 🛠️ Technology Stack

* **Frontend:** React 19 & JSX
* **Build System:** Vite
* **Styling:** Tailwind CSS + Lucide Icons
* **Mapping Engine:** MapLibre GL
* **Data Layer:** Localized JSON place database + Vector tile APIs

---

## 🚀 Quick Start

### Prerequisites
* **Node.js** (v18 or higher recommended)
* **npm** or **yarn**

### 1. Installation
```bash
git clone https://github.com/spider-os/spider-maps.git
cd spider-maps
npm install
```

### 2. Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173` to explore the maps.

### 3. Production Build
```bash
npm run build
```
Generates optimized, bundled assets into the `dist/` directory ready for deployment as a native Spider OS web app or static web service.

---

## 📱 Desktop Integration in Spider OS

Spider Maps is pre-packaged as a native SPK application in Spider OS:
* Accessible via the **Spider OS App Drawer** or Bottom Dock.
* Integrates directly with the `spider-webview-daemon` and Wayland window manager.

---

## 📄 License

Spider Maps is open-source software licensed under the **MIT License**. See [LICENSE](LICENSE) for details.
