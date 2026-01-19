import React from "react";

const View = (props: any) => React.createElement("div", props, props?.children);
const Text = (props: any) => React.createElement("span", props, props?.children);

export const StyleSheet = { create: (s: any) => s };
export const Platform = { OS: "web", select: (o: any) => o?.web ?? o?.default };

export { Text, View };

const fallback = new Proxy(
  { View, Text, StyleSheet, Platform },
  {
    get(target, prop: string) {
      if (prop in target) return (target as any)[prop];
      return View;
    },
  }
);

export default fallback;
