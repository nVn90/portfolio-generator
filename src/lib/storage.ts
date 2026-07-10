/**
 * In-memory portfolio storage.
 * Replace with Redis or Postgres for production persistence.
 */

import type { PortfolioData } from "@/types";

// Use a global Map to survive hot-reloads in dev
declare global {
  // eslint-disable-next-line no-var
  var __portfolioStore: Map<string, PortfolioData> | undefined;
}

function getStore(): Map<string, PortfolioData> {
  if (!global.__portfolioStore) {
    global.__portfolioStore = new Map();
  }
  return global.__portfolioStore;
}

export async function savePortfolio(data: PortfolioData): Promise<string> {
  const store = getStore();
  store.set(data.id, data);
  return data.id;
}

export async function getPortfolio(id: string): Promise<PortfolioData | null> {
  const store = getStore();
  return store.get(id) ?? null;
}

export async function listPortfolios(): Promise<PortfolioData[]> {
  const store = getStore();
  return Array.from(store.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}
