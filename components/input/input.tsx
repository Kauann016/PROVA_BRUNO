import React from "react";
import { TextInputProps } from "react-native";
import { CampoTexto } from "./style";

export default function InputTexto(props: TextInputProps) {
  return (
    <CampoTexto 
      placeholderTextColor="#6C757D"
      {...props}
    />
  );
}

