# GraphQL Visualizer

A web application for visualizing **GraphQL schemas as interactive graphs**.  
It helps developers explore types, fields, and relationships in complex GraphQL APIs through a node-based graph layout.

Built with **React**, **TypeScript**, and **React Flow**, powered by **Vite**.

---

## ✨ Features

- Visualize GraphQL schemas as graphs
- Interactive node-based layout using React Flow
- Automatic graph layout using Dagre / ELK
- Modern UI with Material UI (MUI)
- Fast development and build pipeline via Vite

---

## 🧰 Tech Stack

- **React** + **TypeScript**
- **Vite** (development & build tooling)
- **@xyflow/react (React Flow)** for graph visualization
- **GraphQL** for schema parsing
- **Material UI (MUI)** for UI components
- **Dagre / ELK** for graph layout algorithms

---

## ✅ Prerequisites

Ensure the following are installed on your system:

- **Node.js** ≥ 18  
- **npm** (included with Node.js)

Verify your setup:

```
node -v
npm -v
```

---

## 📦 Installation

Clone the repository and install dependencies:

```
git clone <your-repository-url>
cd graphql-visualizer
npm install
```

---

## 🚀 Running the App (Development)

Start the development server with hot module replacement:

```
npm run dev
```

The application will be available at (usually):

```
http://localhost:5173
```

---

## 🏗️ Building the App (Production)

To create a production build:

```
npm run build
```

This performs:
- TypeScript compilation
- Vite production build

The output is written to the `dist/` directory.

---

## 🔍 Previewing the Production Build

To preview the production build locally:

```
npm run preview
```

---

## 🧪 Linting & Type Checking

Run TypeScript checks and lint the codebase:

```
npm run lint
```

---

## 📁 Project Structure (High Level)

```
graphql-visualizer/
├── src/              # Application source code
├── public/           # Static assets
├── dist/             # Production build output
├── package.json      # Scripts and dependencies
├── tsconfig*.json    # TypeScript configuration
├── vite.config.ts    # Vite configuration
└── README.md
```

---

## 🚧 Project Status

This project is under active development. APIs and UI may change.

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a pull request

---

## 📄 License

No license has been defined yet. Add a `LICENSE` file before publishing.

---

## 🙋‍♂️ Questions or Feedback

Open an issue if you have questions, find bugs, or want to suggest improvements.