import "@testing-library/jest-dom/vitest";
import React from "react";
import { vi } from "vitest";

// SafeAreaView
vi.mock("react-native-safe-area-context", () => ({
  __esModule: true,
  SafeAreaView: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
  SafeAreaProvider: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

// Animated helper
vi.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

// Expo Router
vi.mock("expo-router", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

// Expo EventEmitter
if (!(globalThis as any).expo) (globalThis as any).expo = {};
(globalThis as any).expo.EventEmitter = class {
  addListener() {}
  removeAllListeners() {}
  removeSubscription() {}
  removeListeners() {}
  emit() {}
};

// API_BASE mock
process.env.API_BASE = "https://pokeapi.co/api/v2";

vi.mock("expo-constants", () => {
  return {
    default: {
      expoConfig: {
        extra: {
          API_BASE: "https://pokeapi.co/api/v2", // your mock API_BASE
        },
      },
    },
  };
});

// Global fetch
if (!globalThis.fetch) {
  globalThis.fetch = vi.fn().mockResolvedValue({
    json: vi.fn().mockResolvedValue({ results: [] }),
  });
}

// DEV flag
(globalThis as any).__DEV__ = true;
