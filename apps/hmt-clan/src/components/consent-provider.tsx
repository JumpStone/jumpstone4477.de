"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  useSyncExternalStore,
} from "react";
import type { ReactNode } from "react";
import {
  getConsentServerSnapshot,
  getConsentSnapshot,
  setConsent,
  subscribeConsent,
  type ConsentSnapshot,
} from "@/lib/consent";

type ConsentContextValue = {
  snapshot: ConsentSnapshot;
  grant: () => void;
  deny: () => void;
  isDialogOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function ConsentProvider({ children }: { children: ReactNode }) {
  const snapshot = useSyncExternalStore(
    subscribeConsent,
    getConsentSnapshot,
    getConsentServerSnapshot,
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const grant = useCallback(() => {
    setConsent("granted");
    setIsDialogOpen(false);
  }, []);

  const deny = useCallback(() => {
    setConsent("denied");
    setIsDialogOpen(false);
  }, []);

  const openDialog = useCallback(() => setIsDialogOpen(true), []);
  const closeDialog = useCallback(() => setIsDialogOpen(false), []);

  return (
    <ConsentContext.Provider
      value={{
        snapshot,
        grant,
        deny,
        isDialogOpen,
        openDialog,
        closeDialog,
      }}
    >
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent(): ConsentContextValue {
  const context = useContext(ConsentContext);
  if (context === null) {
    throw new Error("useConsent must be used within a ConsentProvider");
  }
  return context;
}