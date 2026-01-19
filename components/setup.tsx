import "@testing-library/jest-dom/vitest"; // ✅ sets up matchers for Vitest
import React from "react";
import { vi } from "vitest";

vi.mock("react-native-safe-area-context", () => ({
  __esModule: true,
  SafeAreaView: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
  SafeAreaProvider: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

vi.mock("react-native/Libraries/Animated/NativeAnimatedHelper");
