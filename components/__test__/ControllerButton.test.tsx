// components/__test__/ControllerButton.test.tsx
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import ControllerButton from "../ControllerButton";

describe("ControllerButton", () => {
  it("renders the icon", () => {
    render(<ControllerButton onPress={() => {}} icon={<span>ICON</span>} />);
    expect(screen.getByText("ICON")).toBeInTheDocument();
  });

  it("calls onPress when clicked", () => {
    const onPress = vi.fn();
    render(<ControllerButton onPress={onPress} icon={<span>ICON</span>} />);

    // Pressable maps to a clickable element in react-native-web
    fireEvent.click(screen.getByText("ICON"));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("respects size prop by applying width/height styles", () => {
    render(
      <ControllerButton
        onPress={() => {}}
        icon={<span>ICON</span>}
        size={60}
      />
    );

    const icon = screen.getByText("ICON");
    const pressable = icon.parentElement as HTMLElement;

    expect(pressable).toBeTruthy();
    expect(pressable.style.width).toBe("60px");
    expect(pressable.style.height).toBe("60px");
  });

  it("respects bgColor prop by applying background color style", () => {
    render(
      <ControllerButton
        onPress={() => {}}
        icon={<span>ICON</span>}
        bgColor="#123456"
      />
    );

    const pressable = screen.getByText("ICON").parentElement as HTMLElement;
    expect(pressable.style.backgroundColor).toBe("rgb(18, 52, 86)");
  });

  it("merges custom style prop", () => {
    render(
      <ControllerButton
        onPress={() => {}}
        icon={<span>ICON</span>}
        style={{ marginTop: 12 }}
      />
    );

    const pressable = screen.getByText("ICON").parentElement as HTMLElement;
    expect(pressable.style.marginTop).toBe("12px");
  });
});
