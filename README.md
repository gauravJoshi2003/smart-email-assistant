# 📧 Smart Email Assistant

### AI-powered email reply generator built with Spring Boot & Gemini AI

## 📌 Overview

**Smart Email Assistant** is a full-stack AI-powered application that generates professional email replies instantly. Paste any email, choose a tone, and get a well-crafted reply in seconds — powered by Google Gemini AI.

It comes in **3 parts**:
- 🖥️ **Backend** — REST API built with Spring Boot
- 🌐 **Frontend** — Beautiful React + Tailwind CSS web app
- 🧩 **Extension** — Chrome extension that works directly inside Gmail

---

## ✨ Features

- ⚡ **Instant AI Replies** — Generate professional email responses in seconds
- 🎭 **Tone Selection** — Choose from Professional, Casual, Friendly, or Formal
- 🧩 **Gmail Integration** — Chrome extension injects AI button directly into Gmail
- 📋 **One-Click Copy** — Copy generated reply to clipboard instantly
- 🔄 **Regenerate** — Not happy? Generate a new reply with one click
- 🌙 **Dark UI** — Clean dark-themed interface built with Tailwind CSS

---

## 🗂️ Project Structure

```
smart-email-assistant/
├── 📁 backend/                  # Spring Boot REST API
│   ├── src/main/java/
│   │   └── com/email/writer/
│   │       ├── EmailGeneratorController.java
│   │       ├── EmailGeneratorService.java
│   │       └── EmailRequest.java
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
│
├── 📁 frontend/                 # React + Tailwind CSS
│   ├── src/
│   │   └── App.jsx
│   ├── package.json
│   └── tailwind.config.js
│
├── 📁 extension/                # Chrome Extension (Manifest V3)
│   ├── content.js
│   ├── content.css
│   └── manifest.json
│
└── 📄 README.md
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Backend** | Java 21, Spring Boot 3.3, Spring WebFlux |
| **AI Model** | Google Gemini 3.5 Flash API |
| **Frontend** | React 18, Tailwind CSS, Axios |
| **Extension** | Chrome Extension Manifest V3 |
| **Build Tool** | Maven |

---

## 🚀 Getting Started

### Prerequisites

- Java 21+
- Node.js 18+
- Maven 3.8+
- Google Gemini API Key → [Get it here](https://aistudio.google.com/apikey)
- Google Chrome browser

---

### 1️⃣ Backend Setup

```bash
# Navigate to backend folder
cd backend

# Add your API key in application.properties
# gemini.api.key=YOUR_API_KEY_HERE

# Run the Spring Boot application
mvn spring-boot:run
```

Backend runs on → `http://localhost:8080`

---

### 2️⃣ Frontend Setup

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend runs on → `http://localhost:5173`

---

### 3️⃣ Chrome Extension Setup

1. Open Chrome and go to `chrome://extensions`
2. Enable **Developer Mode** (top right toggle)
3. Click **Load Unpacked**
4. Select the `extension/` folder
5. Open **Gmail** — you'll see the **AI Reply** button in the compose toolbar ✅

---

## ⚙️ Configuration

In `backend/src/main/resources/application.properties`:

```properties
gemini.api.url=https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=
gemini.api.key=YOUR_GEMINI_API_KEY_HERE
```

> ⚠️ **Never commit your real API key to GitHub!**

---

## 📡 API Reference

### Generate Email Reply

```http
POST /api/email/generate
Content-Type: application/json
```

**Request Body:**
```json
{
    "emailContent": "Hi, can we schedule a meeting tomorrow?",
    "tone": "professional"
}
```

**Response:**
```
Dear [Name],

Thank you for reaching out. I would be happy to schedule
a meeting tomorrow. Please let me know your preferred time...
```

**Available Tones:** `professional` · `casual` · `friendly` · `formal`

---

## 🖼️ Screenshots

| Web App | Gmail Extension |
|---|---|
| ![Web App](https://via.placeholder.com/400x250/111120/6366f1?text=Web+App) | ![Extension](https://via.placeholder.com/400x250/111120/6366f1?text=Gmail+Extension) |

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

<div align="center">

Built with ❤️ using Spring Boot · Gemini AI · React · Tailwind CSS

⭐ **Star this repo if you found it helpful!**

</div>
