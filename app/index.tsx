
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import CampoTexto from "@/components/input/input";
import { api } from "@/utils/api";
import { View, Text, Pressable } from "react-native";
import axios from "axios";

// Função principal que define o componente Login (na prática, está funcionando como um cadastro)
export default function Login() {
  // Estado para armazenar o valor do email digitado
  const [email, setEmail] = useState("example@example.com");

  // Estado que indica se há um erro de validação no email
  const [ErrorEmail, setErrorEmail] = useState(false);

  // Estado para armazenar a senha digitada
  const [senha, setSenha] = useState("@!123");

  // Estado que indica se há um erro de validação na senha
  const [ErrorSenha, setErrorSenha] = useState(false);

  // Estado que controla a visibilidade da senha (mostrar ou esconder)
  const [mostrarSenha, setMostrarSenha] = useState(false);

  // Estado para armazenar a confirmação da senha
  const [senhaconfirma, setSenhaconfirma] = useState("!123");

  // Estado que indica se a senha de confirmação está incorreta
  const [ErrorSenhaConfirma, setErrorSenhaConfirma] = useState(false);

  // useEffect que valida se a senha de confirmação é igual à senha principal
  useEffect(() => {
    if (senhaconfirma !== senha) {
      setErrorSenhaConfirma(true); // Erro se as senhas forem diferentes
    } else {
      setErrorSenhaConfirma(false); // Nenhum erro se forem iguais
    }
  }, [senha, senhaconfirma]);

  // useEffect que valida o formato do email
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setErrorEmail(!emailRegex.test(email));
  }, [email]);

  // useEffect que valida a força da senha
  useEffect(() => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    setErrorSenha(!passwordRegex.test(senha));
  }, [senha]);

  // Função assíncrona que envia os dados para a API ao cadastrar
  async function Logar() {
    try {
      const resposta = await api.post("/Cadastro", {
        Email: email,
        Senha: senha,
      });

      if (resposta.status === 201) {
        alert("Usuário cadastrado com sucesso!");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const status = error.response.status;

          if (status === 409) {
            alert("Este email já está cadastrado.");
          } else if (status === 500) {
            alert("Erro inesperado no servidor. Tente novamente mais tarde.");
          } else {
            alert("Erro desconhecido: " + error.response.status);
          }
        } else {
          alert("Erro de conexão. Verifique sua internet.");
        }
      } else {
        alert("Erro inesperado: ");
      }
    }
  }

  // JSX da tela
  return (
    <Container>
      <CText>
        <Title>Crie já sua conta!</Title>
      </CText>

      <Espacos>
        {/* Email */}
        <EmailContainer>
          <TextoCampo>Email</TextoCampo>
          <CampoTexto
            placeholder="Digite seu email..."
            onChangeText={setEmail}
          />
         
        </EmailContainer>

        {/* Senha */}
        <SenhaContainer>
          <TextoCampo>Senha</TextoCampo>
          <CampoTexto
            placeholder="Digite sua senha..."
            onChangeText={setSenha}
            secureTextEntry={!mostrarSenha}
          />
          <Pressable
            onPress={() => setMostrarSenha(!mostrarSenha)}
            style={{ position: "absolute", right: 10, top: 34 }}
          >
            <Ionicons
              name={mostrarSenha ? "eye-off" : "eye"}
              size={24}
              color="#000000"
            />
          </Pressable>
        
        </SenhaContainer>

        {/* Confirmação de Senha */}
        <SenhaConfirma>
          <TextoCampo>Confirma Senha</TextoCampo>
          <CampoTexto
            placeholder="Digite sua senha novamente..."
            onChangeText={setSenhaconfirma}
            secureTextEntry={!mostrarSenha}
          />
          <Pressable
            onPress={() => setMostrarSenha(!mostrarSenha)}
            style={{ position: "absolute", right: 10, top: 34 }}
          >
            <Ionicons
              name={mostrarSenha ? "eye-off" : "eye"}
              size={24}
              color="#000000"
            />
          </Pressable>
        </SenhaConfirma>
      </Espacos>

      <Acoes>
        <Button onPress={Logar}>
          <Textinho>Cadastrar</Textinho>
        </Button>
      </Acoes>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #fef6e4;
  padding: 20px;
  justify-content: center;
`;

const CText = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 80px;
  margin-bottom: 110px;
  margin-left: 6px;
  gap: 20px;
`;

const TextoCampo = styled.Text`
  margin-left: 5px;
  font-size: 16px;
  color:rgb(3, 9, 15);
  font-weight: bold;
`;

const Title = styled.Text`
  font-size: 32px;
  color:rgb(1, 4, 8);
  font-weight: bold;
  text-align: center;
`;

const Espacos = styled.View`
  gap: 15px;
  margin-bottom: 20px;
`;

const SenhaConfirma = styled.View`
  position: relative;
  width: 100%;
`;

const SenhaContainer = styled.View`
  position: relative;
  width: 100%;
`;

const Acoes = styled.View`
  margin-top: 20px;
  align-items: center;
`;

const Button = styled.Pressable`
  width: 100%;
  max-width: 300px;
  height: 50px;
  align-items: center;
  justify-content: center;
  background-color: #d90429;
  border-radius: 8px;
  padding: 10px;
`;

const Textinho = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;

const TextErrorHint = styled.Text`
  font-size: 14px;
  color: #ff0000;
  text-align: left;
`;

const EmailContainer = styled.View`
  position: relative;
  width: 100%;
  margin-bottom: 15px;
`;
