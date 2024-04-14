import React from "react";
import { useWeavy, WyChat } from "@weavy/uikit-react";

export function WeavyComponent({ recipient }) {
  useWeavy({
    url: "https://8bc4591f2d1f4cb9959c03feb7dac162.weavy.io",
    tokenFactory: async () => "wyu_dHwv94aUI2yq3CFDdPTQPmZPb5Zygd0YaRAi"
  });

  return <WyChat uid="wyuidchat" to={recipient} />;
}
