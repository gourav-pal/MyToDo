import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Autocomplete, Fab, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Description, Task } from "@mui/icons-material";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 4,
  boxShadow: 24,
  p: 5,
};

const addStyleButton={
    position:'fixed',
    bottom: 32,
    right: 32,

}

const priorityOptions = [
  { label: "High", value: "high" },
  { label: "Medium", value: "medium" },
  { label: "Low", value: "low" },
];

export default function CreateToDo({FetchTodo}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [task, setTask] =React.useState("");
  const [description, setDescription] =React.useState("");
  const [priority, setPriority] =React.useState("");
  const [date, setDate] =React.useState("");

function validateForm(){
    if(task.length<3){
        alert("Invalid Task");
        return;
    }
    if(description.length<5){
        alert("Invalid Description");
        return;
    }
    if(priority.length<3){
        alert("Invalid Priority");
        return;
    }
    if(date.length<2){
        alert("Invalid Date");
        return;
    }
}

function resetForm(){
    setTask('');
    setDescription('');
    setPriority('');
    setDate('');
}

const handleFormSubmit=async()=>{
    validateForm();
    await axios.post('https://firstdb-968a0-default-rtdb.firebaseio.com/todo.json',{
        task,
        description,
        priority,
        date
    });
    FetchTodo();
    alert("Task added succesfully ✨")
   
    resetForm();
    handleClose();
}


  return (
    <div>
      <Fab
       color="secondary"
       style={addStyleButton}
       onClick={handleOpen}
      >
        <AddIcon/>
      </Fab>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            required
            label="Task"
            variant:standard
            sx={{ mb: 2 }}
            fullWidth
            onChange={e => setTask(e.target.value)}
            value={task}
          />
          <TextField
            required
            label="Description"
            variant:standard
            sx={{ mb: 2 }}
            fullWidth
            onChange={e => setDescription(e.target.value)}
            value={description}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={priorityOptions}
            sx={{ mb: 2 }}
            onChange={(e, value) => setPriority(value.value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Priority"
                required
                variant="standard"
              />
            )}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="Select Date" sx={{ m: 3, bottom:10}} onChange={value=>setDate(value.format('YYYY-MM-DD'))} />
          </LocalizationProvider>

          <Button
          variant="contained"
        onClick={handleFormSubmit}
        sx={{
          position: "fixed",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        Add to List
      </Button>
        </Box>
      </Modal>
    </div>
  );
}


