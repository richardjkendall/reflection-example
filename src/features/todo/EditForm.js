import React from 'react';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { FormGroup, FormHelperText } from '@material-ui/core';

import {
  setDate,
  setPriority,
  setTask,
  setTaskError,
  setPriorityError,
  setDateError,
  selectDate,
  selectPriority,
  selectTask,
  selectTaskError,
  selectPriorityError,
  selectDateError
} from './editSlice';

import { useSelector, useDispatch } from 'react-redux';

export default function EditForm(props) {
  const dispatch = useDispatch();

  const selectedDate = useSelector(selectDate);
  const priority = useSelector(selectPriority);
  const task = useSelector(selectTask);
  const taskError = useSelector(selectTaskError);
  const priorityError = useSelector(selectPriorityError);
  const dateError = useSelector(selectDateError);

  const handleDateChange = (date) => {
    dispatch(setDate(moment(date).utc().toISOString()));
  };

  const handlePriorityChange = (event) => {
    dispatch(setPriority(event.target.value));
  };

  const handleTaskChange = (event) => {
    dispatch(setTask(event.target.value));
  };

  const create = (event) => {
    var call = true;
    if(task === "") {
      dispatch(setTaskError("Task cannot be blank"));
      call = false;
    } else {
      dispatch(setTaskError(""));
    }
    if(priority === "") {
      dispatch(setPriorityError("Priority cannot be blank"));
      call = false;
    } else {
      dispatch(setPriorityError(""));
    }
    if(selectedDate === "" || selectedDate == null) {
      dispatch(setDateError("Due date cannot be blank"));
      call = false;
    } else {
      dispatch(setDateError(""));
    }
    if(call) {
      
      props.handleCreate(task, selectedDate, priority);
    }
  }

  return (
    <div>
      <Dialog fullWidth={true} maxWidth="md" open={props.open} onClose={() => {}} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add/Edit Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the task details
          </DialogContentText>
          <TextField
            autoFocus
            id="name"
            label="Task"
            value={task}
            onChange={handleTaskChange}
            fullWidth
            helperText={taskError}
            error={!taskError === ""}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Due date"
              value={moment(selectedDate).toDate()}
              onChange={handleDateChange}
              helperText={dateError}
              error={!dateError === ""}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
          <FormGroup>
            <FormControl>
              <InputLabel id="priority-select-label">Priority</InputLabel>
              <Select
                labelId="priority-select-label"
                id="priority-select"
                value={priority}
                onChange={handlePriorityChange}
                style={{maxWidth: "220px"}}
                error={!priorityError === ""}
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
              <FormHelperText>{priorityError}</FormHelperText>
            </FormControl>
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {props.handleClose()}} color="primary">
            Cancel
          </Button>
          <Button onClick={create} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
