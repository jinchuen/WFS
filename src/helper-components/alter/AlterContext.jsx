import React, { createContext, useContext, useState, useRef, useCallback } from 'react';
import { setAlterApi } from './useAlterGlobal';

const AlterContext = createContext();

export function AlterProvider({ children }) {
  const [alerts, setAlerts] = useState([]);
  const idRef = useRef(0);

  const removeAlert = useCallback((id) => {
    setAlerts((alerts) => alerts.filter((a) => a.id !== id));
  }, []);

  const addAlert = useCallback((type, message) => {
    const id = idRef.current++;
    setAlerts((alerts) => [...alerts, { id, type, message }]);
    setTimeout(() => removeAlert(id), 3000);
  }, [removeAlert]);

  const closeAll = useCallback(() => setAlerts([]), []);

  const alterApi = {
    success: (msg) => addAlert('success', msg),
    error: (msg) => addAlert('error', msg),
    closeAll,
    alerts,
    removeAlert,
  };

  setAlterApi(alterApi);

  return (
    <AlterContext.Provider value={alterApi}>
      {children}
    </AlterContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAlterComponents() {
  return useContext(AlterContext);
} 