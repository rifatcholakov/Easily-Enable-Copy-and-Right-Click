# 🖱️ Easily Enable Copy and Right-Click

**Take back control of your web browsing experience!**

Easily Enable Copy and Right-Click is a powerful, privacy-first Chrome extension that allows you to copy text, right-click, and select content on websites that aggressively block these basic browser features. 

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Manifest](https://img.shields.io/badge/manifest-V3-orange.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

---

## ✨ Key Features

- **✅ Unblock Everything:** Instantly restores Context Menu, Copy, Cut, Paste, and Text Selection functionality.
- **🏠 Local File Support:** Works on local HTML files (e.g., `file:///C:/Users/name/Desktop/test.html`) — perfect for offline documentation.
- **🎯 Per-Site Control:** The extension is disabled by default. You choose exactly which websites it runs on.
- **⌨️ Restores Shortcuts:** Successfully intercepts and allows keyboard shortcuts like `Ctrl+C`, `Ctrl+X`, `Ctrl+V`, `Ctrl+A`, and `Ctrl+P`.
- **💎 Clean UI:** A modern, minimalist popup interface built with React that perfectly adapts to your system's Light/Dark mode.
- **⚡ Zero Overhead:** Uses optimized DOM event capturing—only injecting the exact logic needed for the specific site.
- **🔒 Privacy First:** Your data never leaves your browser. No analytics, no tracking.

---

## 🛠️ How it Works

The extension works by injecting a tiny, highly-optimized content script that intercepts malicious scripts trying to block your actions:
1. **CSS Overrides:** It dynamically injects `user-select: auto !important` and other visual fixes via the `cssBlocker` module.
2. **Event Interception:** It captures DOM events (`contextmenu`, `copy`, `selectstart`, `keydown`) during the *capture phase* via the `eventBlocker` module and immediately stops propagation.
3. **State Management:** Uses Chrome's `storage.local` API to remember your exact preference for every hostname or local file you visit.
4. **Site Identification:** Uses a centralized `siteUtils` module to identify sites and format hostnames for a consistent user experience.

---

## 🚀 Installation (Development Mode)

Since this extension is in active development, you can install it manually:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/rifatcholakov/enable-copy.git
    cd enable-copy
    ```
2.  **Install dependencies and build the project:**
    ```bash
    npm install
    npm run build
    ```
3.  Open Chrome and navigate to `chrome://extensions/`.
4.  Enable **"Developer mode"** (toggle in the top right).
5.  Click **"Load unpacked"** and select the `/dist` folder inside the project directory.
6.  **Note for Local Files:** To use it on local files, go to the extension's **Details** page and toggle **"Allow access to file URLs"** to ON.

---

## 💻 Tech Stack

- **Frontend Framework:** [React 18](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/) with `@crxjs/vite-plugin` for optimized extension bundling.
- **Styling:** Vanilla CSS with a centralized token system (CSS-in-JS + Global Variables).
- **Architecture:** Clean, modular service-oriented architecture (isolating Chrome APIs, UI components, and Content Scripts).

---

## 🛡️ Privacy & Security

We value your privacy. Easily Enable Copy and Right-Click:
- Does **not** collect any personal data or browsing history.
- Processes all logic entirely locally on your machine.
- Requires only the absolute minimum permissions needed to function (`storage`, `host_permissions`).

---

## 👨‍💻 Author

**Rifat Cholakov**
- Website: [rifatcholakov.com](https://rifatcholakov.com)
- GitHub: [@rifatcholakov](https://github.com/rifatcholakov)

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
