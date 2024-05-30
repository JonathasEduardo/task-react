import React, { useState, useEffect } from "react";
import { Container, List } from "@mui/material";
import Form from "../components/Form";
import TodoItem from "../components/TodoItem";
import { getTasks, deleteTask, updateTask } from "../services/RequestApi"; // Importa a função editTask

export default function Home() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await getTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleTaskAdded = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error);
    }
  };

  const handleEditTask = async (id, payload) => {
    try {
      const editedTask = await updateTask(id, payload);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === editedTask.id ? editedTask : task))
      );
    } catch (error) {
      console.error("Erro ao editar tarefa:", error);
    }
  };

  return (
    <Container maxWidth="xs" style={{ marginTop: "1em" }}>
      <Form onTaskAdded={handleTaskAdded} />
      <List
        sx={{ width: "100%", bgcolor: "background.paper", marginTop: "1em" }}
      >
        {tasks.map((task) => (
          <TodoItem 
            key={task.id} 
            task={task} 
            onDelete={handleDeleteTask} 
            onEdit={handleEditTask} // Passa a função handleEditTask para o componente TodoItem
          />
        ))}
      </List>
    </Container>
  );
}
