export const CONSENT_STORAGE_KEY = "hmt-clan:consent";

export type ConsentStatus = "granted" | "denied" | null;

export type ConsentSnapshot = {
  readonly status: ConsentStatus;
  readonly hydrated: boolean;
};

const listeners = new Set<() => void>();
const serverSnapshot: ConsentSnapshot = { status: null, hydrated: false };
let snapshot: ConsentSnapshot = serverSnapshot;
let isHydrated = false;

export function readConsent(): ConsentStatus {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  return stored === "granted" || stored === "denied" ? stored : null;
}

export function setConsent(status: Exclude<ConsentStatus, null>): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CONSENT_STORAGE_KEY, status);
  listeners.forEach((listener) => listener());
}

function evaluateSnapshot(): ConsentSnapshot {
  if (!isHydrated) return serverSnapshot;
  const status = readConsent();
  if (!snapshot.hydrated || snapshot.status !== status) {
    snapshot = { status, hydrated: true };
  }
  return snapshot;
}

export function subscribeConsent(listener: () => void): () => void {
  listeners.add(listener);
  if (!isHydrated) {
    isHydrated = true;
    listeners.forEach((entry) => entry());
  }
  return () => {
    listeners.delete(listener);
  };
}

export function getConsentSnapshot(): ConsentSnapshot {
  return evaluateSnapshot();
}

export function getConsentServerSnapshot(): ConsentSnapshot {
  return serverSnapshot;
}