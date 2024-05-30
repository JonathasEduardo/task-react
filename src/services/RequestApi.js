import axios from 'axios';

const BASE_URL = "http://localhost:4000"; // URL base para o ambiente local

export async function getTasks() {
  const link = `${BASE_URL}/tasks`;
  try {
    const { data } = await axios.get(link);
    return data;
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    throw error;
  }
}

export async function createTask(parameters) {
  const link = `${BASE_URL}/tasks`;
  try {
    const { data } = await axios.post(link, parameters);
    return data;
  } catch (error) {
    console.error('Erro ao criar tarefa:', error);
    throw error;
  }
}

export async function updateTask(id, parameters) {
  const link = `${BASE_URL}/tasks/${id}`;
  try {
    const { data } = await axios.put(link, parameters);
    return data;
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
    throw error;
  }
}

export async function deleteTask(id) {
  const link = `${BASE_URL}/tasks/${id}`;
  try {
    const { data } = await axios.delete(link);
    return data;
  } catch (error) {
    console.error('Erro ao deletar tarefa:', error);
    throw error;
  }
}