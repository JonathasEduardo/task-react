import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { TextField } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import React, { useState } from "react";

export default function TodoItem({ task, onDelete, onEdit }) {
  const [isEditing, setEditing] = useState(false);
  const [name, setName] = useState(task.name);
  const [description, setDescription] = useState(task.description);
  const [success, setSuccess] = useState("");
  const handleDelete = async() => {
    await onDelete(task.id); // Passa o ID da tarefa para a função onDelete
  };

  const handleEdit = () => {
    setEditing(true);
  };
  const handleConfirm = async() => {
    const payload = {name, description};
    await onEdit(task.id,payload);
    setEditing(false);
    window.location.reload();
     return setSuccess("Task created successfully!");
  };
  return (
    <ListItem
      secondaryAction={
        <>
          <IconButton edge="end" aria-label="delete" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
          {isEditing ? (
            <IconButton edge="end" aria-label="edit" onClick={handleConfirm}>
              <CheckCircleIcon />
            </IconButton>
          ) : (
            <IconButton edge="end" aria-label="edit" onClick={handleEdit}>
              <EditIcon />
              
            </IconButton>
          )}
          
          {success && <p style={{ color: 'green', marginTop: '10px' }}>{success}</p>}
        </>
        
      }
      disablePadding
    >
      <ListItemButton role={undefined} dense>
        <ListItemIcon>
          <Checkbox edge="start" tabIndex={-1} disableRipple />
        </ListItemIcon>

        {isEditing ? (
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
            
          </div>
          
        ) : (
          <ListItemText primary={task.name} secondary={task.description} />
        )}
      </ListItemButton>     
    </ListItem>
    
  );
}
