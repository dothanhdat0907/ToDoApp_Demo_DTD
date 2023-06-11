import { useEffect, useState } from "react"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs'
import '../a.css'

const AddTask = (props) => {
    const [task, settask] = useState(props.task)

    const handleChangeTitle = (event) => {
        settask(task => ({...task, title:event.target.value}))
        //console.log(task)
    }

    const handleChangeDescription = (event) => {
        settask(task => ({...task, description:event.target.value}))
        //console.log(task)
    }

    const handleChangeDate = (newValue) => {
        settask(task => ({...task, dueDate:newValue}))
    }

    const handleChangePriority = (event) => {
        settask(task => ({...task, priority:event.target.value}))
    }

    const handleAdd = () => {
        if(task.title === '') {
            alert('Task need title')
            return
        } 
        const id = props.toDoList.length
        settask(task => ({...task, id:id+1}))
        props.addNewTask(task)
        settask(task => ({...task, title: '', description: '', dueDate: dayjs(), priority: 'normal'}))
    }

    const handleChange = () => {
        props.changeTask(task)
    }

    return (
        <div>
            <input className="input" type="text" placeholder="Add new task ..." value={task.title} onChange={handleChangeTitle}/>
            <h5>Description</h5>
            <textarea style={{width:'100%', height:'100px'}} cols="40" rows="5" value={task.description} onChange={handleChangeDescription}></textarea>
            <div style={{display: 'flex'}}>
                <div style={{width:'45%'}}>
                    <h5>Due Date</h5>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker format="DD MMM YYYY" disablePast slotProps={{ textField: { size: 'small' } }} value={task.dueDate} onChange={handleChangeDate} />
                    </LocalizationProvider>
                </div>
                <div style={{marginLeft: '10%', width:'45%'}}>
                    <h5>Piority</h5>
                    <select className="input" value={task.priority} onChange={handleChangePriority}>
                        <option value="low">Low</option>
                        <option value="normal">Normal</option>
                        <option value="high">High</option>
                    </select>
                </div>
            </div>
            <button onClick={props.status === 'Add' ? handleAdd : handleChange} style={{cursor:'pointer', marginTop:'20px', width:'100%', height: '30px', border:'green', borderRadius: '5px', color: 'white', backgroundColor: 'green'}}>
                {props.status}
            </button>
        </div>
    )
}

export default AddTask