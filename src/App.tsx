import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { Dashboard } from './pages/Dashboard';
import { Blueprints } from './pages/Blueprints';
import { BlueprintEditor } from './pages/BlueprintEditor';
import { CreateContract } from './pages/CreateContract';
import { ContractView } from './pages/ContractView';

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="blueprints" element={<Blueprints />} />
          <Route path="blueprints/new" element={<BlueprintEditor />} />
          <Route path="blueprints/:id" element={<BlueprintEditor />} />
          <Route path="create-contract" element={<CreateContract />} />
          <Route path="contracts/:id" element={<ContractView />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
