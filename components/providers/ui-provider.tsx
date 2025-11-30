"use client";
import React, { createContext, useContext, useState } from 'react';

interface UIContextValue {
  isTransitioning: boolean;
  setTransitioning: (value: boolean) => void;
}

const UIContext = createContext<UIContextValue | null>(null);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false);

  return (
    <UIContext.Provider value={{ isTransitioning, setTransitioning: setIsTransitioning }}>
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error('useUI must be used within UIProvider');
  return ctx;
}
