# ContractFlow - Enterprise Contract Management Platform

ContractFlow is a professional, frontend-only React application designed for managing the entire lifecycle of business contracts, from blueprint creation to final signature and archival.

## 🚀 Features

- **Blueprint Builder**: Interactive editor to create reusable contract templates with various field types (Text, Date, Checkbox, Signature).
- **Contract Generation**: Wizard-based contract creation from blueprints.
- **Lifecycle Management**: Strict state machine enforcement (Created -> Approved -> Sent -> Signed -> Locked).
- **Dashboard**: specialized views for tracking contract status and metrics.
- **Persisted State**: All data is persisted locally using `localStorage` via Zustand.

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite (Fast development, optimized build)
- **Language**: TypeScript (Type safety, better DX)
- **Styling**: Tailwind CSS (Utility-first, consistent design system)
- **State Management**: Zustand + Persistence Middleware (Simple, scalable global state)
- **Routing**: React Router DOM (Client-side routing)
- **Icons**: Lucide React (Clean, consistent SVG icons)
- **Utils**: clsx, tailwind-merge, date-fns

## 🏗️ Architecture

The application follows a modular feature-based architecture:

- **src/components**: Reusable UI components (Buttons, Inputs, Cards) and domain-specific components.
- **src/pages**: Route components acting as controllers.
- **src/store**: Centralized Zustand store with persistence logic.
- **src/types**: Shared TypeScript interfaces to ensure consistency.

### State Management
We chose **Zustand** over Context API for its:
- Minimal boilerplate.
- Built-in persistence middleware (auto-saves to localStorage).
- Selector optimization to prevent unnecessary re-renders.

### Design System
The UI is built on a custom **Tailwind** configuration, emphasizing a professional "Enterprise SaaS" aesthetic with:
- Consistent color palette (Brand Blue, Slate Greys).
- Subtle interactions (Hover states, transitions).
- Clean typography (Inter font).

## 📦 Setup & Running

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## 📝 Assumptions & Limitations

- **No Backend**: This is a frontend-only demo. All data resides in the browser's LocalStorage. Clearing cache will lose data.
- **Signature**: The signature field is a simulation. In a real app, this would integrate with a canvas pad or external provider (DocuSign).
- **Validation**: Basic required field validation is implemented. Complex validation (regex, dependent fields) is out of scope.
