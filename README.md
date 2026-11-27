# 🏛️ Architect Academy

### Interactive Learning Platform for System Design & Computer Networking

Architect Academy is an interactive educational web application designed to help students and developers understand **System Design** and **Computer Networking** through detailed theoretical explanations, real-world examples, architecture diagrams, and interactive 3D visualizations.

The platform aims to make complex technical concepts easier to understand through structured learning and practical visual demonstrations.

---

## ✨ Features

- 📚 **Structured Learning:** Organized System Design and Computer Networking topics.
- 🧠 **Detailed Explanations:** Concept definitions, working principles, advantages, disadvantages, and real-world examples.
- 🌐 **Interactive 3D Visualizations:** Visual demonstrations of important technical concepts.
- 📝 **Knowledge Assessment:** Topic-wise quizzes and MCQs.
- 📊 **Learning Progress:** Track completed topics and learning progress.
- 🔖 **Bookmarks:** Save important topics for future reference.
- 📖 **Glossary:** Quick access to technical terminology.
- 🔍 **Search:** Find topics and concepts easily.
- 🌙 **Dark & Light Mode:** Switch between themes.
- 📱 **Responsive Design:** Accessible across desktop, tablet, and mobile devices.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend development |
| TypeScript | Type safety |
| Vite | Development server and build tool |
| Tailwind CSS | Styling |
| React Router DOM | Application navigation |
| Three.js | 3D visualizations |
| React Three Fiber | 3D integration with React |
| Drei | 3D helper components |
| Framer Motion | Animations |
| Lucide React | Icons |
| LocalStorage | Local persistence of user preferences and learning data |

---

## 📋 Prerequisites

Before running the application, make sure the following tools are installed:

1. **Node.js** – Version 20 or later recommended.
2. **npm** – Comes bundled with Node.js.
3. **Git** – To clone the repository.

Verify your installations:

```bash
node -v
npm -v
git --version
```

---

## 🚀 Getting Started

Follow these steps to run Architect Academy on your local machine.

### Step 1: Clone the Repository

Open your terminal or command prompt:

```bash
git clone https://github.com/vikrammr198-lgtm/Architect-Academy.git
```

### Step 2: Navigate to the Project Directory

```bash
cd Architect-Academy
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Start the Development Server

```bash
npm run dev
```

### Step 5: Open the Application

Once the development server starts, open the following URL in your browser:

```text
http://localhost:5173
```

🎉 **That's it! Architect Academy is now running locally.**

---

## 🏗️ Build for Production

To create an optimized production build:

```bash
npm run build
```

The generated production files will be available in the `dist/` directory.

### Preview the Production Build

```bash
npm run preview
```

---

## 📂 Project Structure

The project follows a modular structure to keep components, learning content, and visualizations organized.

```text
Architect-Academy/
│
├── public/                 # Static assets
│
├── src/
│   ├── assets/             # Images and other assets
│   ├── components/         # Reusable UI components
│   ├── pages/              # Application pages
│   ├── data/               # Learning content and topic data
│   ├── visualizations/     # Interactive 3D visualizations
│   ├── hooks/              # Custom React hooks
│   ├── store/              # Application state management
│   │
│   ├── App.tsx             # Main application component
│   └── main.tsx            # Application entry point
│
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

*Note: The directory structure is illustrative. Refer to the actual repository for the complete structure.*

---

## 💾 Data Storage

Architect Academy uses browser LocalStorage to persist supported application data, such as:

- Learning progress
- Completed topics
- Bookmarked topics
- Theme preferences

This allows users to retain their saved learning information in the same browser without requiring a separate database.

**Note:** LocalStorage data is browser-specific and is not automatically synchronized across different devices or browsers.

---

## 🤝 Contributing

Contributions are welcome!

If you would like to improve Architect Academy:

1. Fork this repository.
2. Create a new branch.
3. Make your changes.
4. Commit your changes.
5. Push your branch.
6. Open a Pull Request.

---

## 👨‍💻 Author

**Vikram M R**

- GitHub: [@vikrammr198-lgtm](https://github.com/vikrammr198-lgtm)
- LinkedIn: [Vikram M R](https://www.linkedin.com/in/vikram-m-r-73a7a032b/)

---

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.
