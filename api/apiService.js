import axios from 'axios';

const API_URL = 'https://projeto-integrador-1v4i.onrender.com/student/';

// Função para buscar todos os estudantes
export const fetchStudents = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // Retorna a lista de estudantes
  } catch (error) {
    throw new Error('Erro ao buscar estudantes: ' + error.message);
  }
};

// Função para cadastrar um novo estudante
export const registerStudent = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data; // Retorna os dados do estudante cadastrado
  } catch (error) {
    throw new Error('Erro ao cadastrar estudante: ' + error.message);
  }
};

// Função para login
export const loginStudent = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth`, credentials);
    return response.data; // Retorna os dados do estudante logado
  } catch (error) {
    throw new Error('Erro ao realizar login: ' + error.message);
  }
};

// Função para recuperar a senha
export const resetPassword = async (email) => {
    try {
      const response = await axios.post('https://projeto-integrador-1v4i.onrender.com/student/reset-password', { email });
      return response.data; // Retorna os dados da resposta
    } catch (error) {
      throw new Error('Erro ao tentar recuperar a senha: ' + error.message);
    }
  };
  

  export const forgotPassword = async (email) => {
    try {
      const response = await axios.post('https://projeto-integrador-1v4i.onrender.com/student/forgot-password', { email });
      return response.data; // Retorna os dados da resposta
    } catch (error) {
      throw new Error('Erro ao tentar recuperar a senha: ' + error.message);
    }
  }