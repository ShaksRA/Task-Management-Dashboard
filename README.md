# ⚡ TaskFlow — Kanban Task Management Dashboard

A fully responsive **Kanban-style SPA** built with React 18 + Vite. Features drag-and-drop task boards, user authentication, LocalStorage persistence, and a clean dark-mode UI.

![TaskFlow Preview](https://placehold.co/900x480/18181c/7c6af5?text=TaskFlow+Kanban+Dashboard&font=montserrat)

---

## 🚀 Live Demo

> Open `taskflow-dashboard.html` in any browser — no server needed.  
> Or run the full dev server (see [Getting Started](#getting-started)).

---

## ✨ Features

| Feature | Details |
|---|---|
| 🔐 **Authentication** | Register / login with email + password; session stored in LocalStorage |
| 📋 **Kanban Board** | 5 columns: Backlog → To Do → In Progress → Review → Done |
| 🖱️ **Drag & Drop** | Native HTML5 drag-and-drop to move cards between columns |
| ➕ **Task CRUD** | Quick-add inline form per column + full modal editor |
| 🔍 **Filtering** | Search by keyword, filter by priority, filter by assignee |
| 🏷️ **Tags & Priority** | Colour-coded tags (design, frontend, backend, bug, …) and priority badges |
| 📅 **Due Dates** | Human-friendly labels (Today, Tomorrow, Xd left) with overdue highlighting |
| 💾 **Persistence** | All tasks auto-sync to `localStorage` on every change |
| 📱 **Responsive** | Works on desktop, tablet, and mobile |
| 🌙 **Dark Mode** | Dark-first design with CSS custom properties |

---

## 🗂️ Project Structure

```
taskflow/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── AuthScreen.jsx        # Login / Register screen
│   │   │   └── AuthScreen.module.css
│   │   ├── Board/
│   │   │   ├── Board.jsx             # Main board controller
│   │   │   ├── Board.module.css
│   │   │   ├── Column.jsx            # Individual kanban column
│   │   │   ├── Column.module.css
│   │   │   ├── Header.jsx            # Top navigation bar
│   │   │   ├── Header.module.css
│   │   │   ├── Toolbar.jsx           # Search + filter bar
│   │   │   └── Toolbar.module.css
│   │   ├── Task/
│   │   │   ├── TaskCard.jsx          # Draggable task card
│   │   │   ├── TaskCard.module.css
│   │   │   ├── TaskModal.jsx         # Create / Edit modal
│   │   │   ├── TaskModal.module.css
│   │   │   ├── AddTaskForm.jsx       # Inline quick-add form
│   │   │   └── AddTaskForm.module.css
│   │   └── UI/
│   │       ├── Notification.jsx      # Toast notification
│   │       └── Notification.module.css
│   ├── data/
│   │   ├── constants.js              # Columns, users, tags, LS keys
│   │   └── seedTasks.js              # Demo task data
│   ├── hooks/
│   │   ├── useAuth.js                # Auth state + register/signIn logic
│   │   ├── useTasks.js               # CRUD + LocalStorage sync
│   │   └── useDragDrop.js            # Drag-and-drop event handlers
│   ├── utils/
│   │   ├── storage.js                # localStorage get/set/remove helpers
│   │   └── dateHelpers.js            # formatDue(), todayISO()
│   ├── styles/
│   │   └── globals.css               # CSS variables, reset, scrollbar
│   ├── App.jsx                       # Root component
│   └── main.jsx                      # ReactDOM entry point
├── index.html
├── vite.config.js
├── package.json
├── .eslintrc.cjs
├── .gitignore
└── README.md
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Build tool | Vite 5 |
| Routing | React Router DOM v6 |
| Styling | CSS Modules + CSS Custom Properties |
| State | React hooks (`useState`, `useEffect`) |
| Persistence | Browser `localStorage` (simulated REST sync) |
| Drag & Drop | Native HTML5 Drag-and-Drop API |
| Linting | ESLint + eslint-plugin-react |

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** v18 or higher — [Download](https://nodejs.org/)
- **npm** v9+ (comes with Node.js)

Verify your versions:

```bash
node --version   # should print v18.x.x or higher
npm --version    # should print 9.x.x or higher
```

---

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/taskflow.git
cd taskflow
```

---

### 2. Install dependencies

```bash
npm install
```

This installs React, Vite, React Router, and all dev dependencies listed in `package.json`.

---

### 3. Start the development server

```bash
npm run dev
```

Vite will start and automatically open your browser at:

```
http://localhost:5173
```

The dev server supports **Hot Module Replacement (HMR)** — changes to any file reflect instantly without a full page reload.

---

### 4. Register and explore

1. On first load you'll see the **login screen**
2. Click **"Sign up free"** to register with any email + password
3. You'll be taken to the board, pre-loaded with 9 demo tasks
4. Try dragging cards between columns, creating tasks, filtering, and editing

> **Tip:** Click **"↺ Reset"** in the header at any time to restore the demo data.

---

## 📦 Build for Production

To create an optimised production build:

```bash
npm run build
```

Output goes to the `dist/` folder. Preview it locally:

```bash
npm run preview
```

This serves the production bundle at `http://localhost:4173`.

---

## 🧹 Linting

```bash
npm run lint
```

---

## 🔧 Customisation

### Adding a new column

Edit `src/data/constants.js`:

```js
export const COLUMNS = [
  ...
  { id: 'staging', title: 'Staging', color: '#f472b6' },  // add here
]
```

### Adding a new tag colour

In `src/components/Task/TaskCard.module.css`:

```css
.tag-yourtagname { background: #1a1a2e; color: #818cf8; }
```

Then add it to `TAG_COLORS` in `src/data/constants.js`:

```js
export const TAG_COLORS = {
  ...
  yourtagname: 'tag-yourtagname',
}
```

### Connecting a real REST API

Replace the `useTasks` hook's `setItem` / `getItem` calls with `fetch()` to your backend endpoints. The hook interface (`createTask`, `updateTask`, `deleteTask`, `moveTask`) stays the same — no component changes needed.

---

## 🌐 Deployment

### Deploy to Vercel (recommended)

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm run build
# drag-and-drop the dist/ folder at netlify.com/drop
```

### Deploy to GitHub Pages

```bash
npm install --save-dev gh-pages
```

Add to `package.json`:

```json
"homepage": "https://YOUR_USERNAME.github.io/taskflow",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

Then:

```bash
npm run deploy
```

---

## 📸 Key Implementation Highlights

- **`useTasks` hook** — encapsulates all task CRUD. Every mutation calls `setItem(LS_KEYS.TASKS, tasks)` via `useEffect`, simulating an API write-back pattern that's easy to swap for real `fetch()` calls.

- **`useDragDrop` hook** — a clean abstraction over the HTML5 Drag-and-Drop API. Returns event handler factories (`handleDragStart(id)`, `handleDrop(colId)`) that can be spread directly onto DOM elements.

- **`useAuth` hook** — stores users in `localStorage['tf_users']` and the active session in `localStorage['tf_session']`. Exposes `register`, `signIn`, and `logout` — an interface that mirrors a real auth API.

- **CSS Modules** — every component has its own `.module.css` file. Global design tokens (colours, radii, spacing) live in `src/styles/globals.css` as CSS custom properties, consumed by all modules.

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Commit your changes: `git commit -m "feat: add my feature"`
4. Push to the branch: `git push origin feat/my-feature`
5. Open a Pull Request

---

## 📄 License

MIT © 2024 — feel free to use this project for your portfolio, demos, or learning.
