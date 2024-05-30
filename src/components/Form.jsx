import React, { useState } from "react";
import { Button, TextField, Paper } from "@mui/material";
import { createTask , updateTask} from "../services/RequestApi"; // Ajuste o caminho conforme necessário

export default function Form({ onTaskAdded }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  

  const handleAddTask = async () => {
    setError(""); 
    setSuccess(""); 
    try {
      const newTask = { name, description };
      const createdTask = await createTask(newTask);
      onTaskAdded(createdTask);
      setName("");
      setDescription("");
      return setSuccess("Task created successfully!");
    } catch (error) {
      let errorMessage = [];
      if (error.response.data.name === "ZodError") {
        const issues = error.response?.data?.issues || 0;
        for (let i = 0 ; i < issues.length; i++) {
          errorMessage.push(issues[i].message);
        }
      }
      const message = errorMessage || ["Error creating task"];
      return setError(message.join(', '));
    }
  };

  return (
    <Paper style={{ padding: "1em" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          id="description"
          label="Description"
          variant="outlined"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button variant="contained" onClick={handleAddTask}>
          ADD
        </Button>
        {error && <p style={{ color: "red" }}>{error}</p>} 
        {success && <p style={{ color: "green" }}>{success}</p>}        
      </div>
    </Paper>
  );
}
