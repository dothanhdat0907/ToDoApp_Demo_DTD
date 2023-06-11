import { useState } from "react"
import AddTask from "./AddTask"
import Checkbox from '@mui/material/Checkbox';

const Todo = (props) => {
    const [showDetail, setShowDetail] = useState(false)
    const handleShowDetail = () => {
        showDetail === true ? setShowDetail(false) : setShowDetail(true)
    }

    const handleRemove = (task) => {
        props.removeTask(task)
    }

    const tick = (task) => {
        props.addCheckList(task.id)
    }

    return (
        <div>
            <div style={{display:'flex', border: "1px solid gray", marginTop:'20px', height:'50px' }}>
                <Checkbox color="success" sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }} type="checkbox" onClick={() => tick(props.todo)}/>
                <div style={{width: '20%'}}><p>{props.todo.title}</p></div>
                <div style={{width: '45%'}}></div>
                <div style={{paddingTop:'15px'}}><button style={{height: '25px', width: '90px', backgroundColor: '#00C4FF', color: 'white', borderRadius: '5px', border: 'solid #00C4FF', cursor: 'pointer'}} onClick={handleShowDetail}>Detail</button></div>
                <div style={{width: '2%'}}></div>
                <div style={{paddingTop:'15px'}}><button style={{height: '25px', width: '90px', backgroundColor: '#B31312', color: 'white', borderRadius: '5px', border: 'solid #B31312', cursor: 'pointer'}} onClick={() => handleRemove(props.todo)}>Remove</button></div>
            </div>
            {showDetail && (
                <div style={{width: "99%", border: "1px solid black"}}>
                    <div className="body" style={{margin: '15px 50px'}}>
                        <AddTask status='Update' changeTask={props.changeTask} task={props.todo}/>
                    </div>   
                </div>     
            )}
        </div>
    )
}

export default Todo