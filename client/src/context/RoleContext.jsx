import { createContext, useContext, useState, useEffect } from 'react';

const RoleContext = createContext();

const ROLES = {
  homeowner: { label: 'Homeowner', icon: '🏠', description: 'Find glass for your home projects' },
  architect: { label: 'Architect', icon: '📐', description: 'Specify glass for your designs' },
  builder: { label: 'Builder', icon: '🏗️', description: 'Bulk orders & project pricing' },
  dealer: { label: 'Dealer', icon: '🏪', description: 'Factory rates & trade pricing' },
};

export function RoleProvider({ children }) {
  const [role, setRole] = useState(() => {
    return localStorage.getItem('amalgus_role') || null;
  });

  useEffect(() => {
    if (role) {
      localStorage.setItem('amalgus_role', role);
    }
  }, [role]);

  const clearRole = () => {
    setRole(null);
    localStorage.removeItem('amalgus_role');
  };

  return (
    <RoleContext.Provider value={{ role, setRole, clearRole, ROLES }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) throw new Error('useRole must be used within RoleProvider');
  return context;
}

export default RoleContext;
