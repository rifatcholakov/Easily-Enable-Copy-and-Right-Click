# 🔓 Easily Enable Copy and Right-Click

**Take back control of your web browsing experience!**

Easily Enable Copy and Right-Click is a powerful, privacy-first Chrome extension that allows you to copy text, right-click, and select content on websites that aggressively block these basic browser features. 

![Version](https://img.shields.io/badge/version-1.0-blue.svg)
![Manifest](https://img.shields.io/badge/manifest-V3-orange.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

---

## ✨ Key Features

- **✅ Unblock Everything:** Instantly restores Context Menu, Copy, Cut, Paste, and Text Selection functionality.
- **🎯 Per-Site Control:** The extension is disabled by default. You choose exactly which websites it runs on.
- **⌨️ Restores Shortcuts:** Successfully intercepts and allows keyboard shortcuts like `Ctrl+C`, `Ctrl+X`, `Ctrl+V`, `Ctrl+A`, and `Ctrl+P`.
- **💎 Clean UI:** A modern, minimalist popup interface built with React that perfectly adapts to your system's Light/Dark mode.
- **⚡ Zero Overhead:** Uses optimized DOM event capturing—only injecting the exact logic needed for the specific site.
- **🔒 Privacy First:** Your data never leaves your browser. No analytics, no tracking.

---

## 🛠️ How it Works

The extension works by injecting a tiny, highly-optimized content script that intercepts malicious scripts trying to block your actions:
1. **CSS Overrides:** It dynamically injects `user-select: auto !important` to override stylesheets trying to block text highlighting.
2. **Event Interception:** It captures DOM events (`contextmenu`, `copy`, `selectstart`, `keydown`) during the *capture phase* and immediately stops propagation, preventing the website's blocking scripts from ever receiving the event.
3. **State Management:** Uses Chrome's `storage.local` API to remember your exact preference for every hostname you visit.

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
- Requires only the absolute minimum permissions needed to function (`activeTab`, `storage`, `scripting`).

---

## 👨‍💻 Author

**Rifat Cholakov**
- Website: [rifatcholakov.com](https://rifatcholakov.com)
- GitHub: [@rifatcholakov](https://github.com/rifatcholakov)

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
