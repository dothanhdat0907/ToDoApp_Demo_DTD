import { useEffect, useState } from "react"
import AddTask from "./components/AddTask"
import Todo from "./components/Todo"
import dayjs from 'dayjs'
import './a.css'

const Mainpage = () => {
    const [search, setSearch] = useState('')
    const [toDoList, setToDoList] = useState([])
    const [checkList, setCheckList] = useState([])
    const [presentList, setPresentList] = useState([])

    useEffect(() => {
        toDoList.sort((a, b) => a.dueDate - b.dueDate)
        setPresentList(toDoList)
    }, [toDoList])
    
    useEffect(() => {
        setPresentList([])
        toDoList.forEach(element => {
            if(element.title.includes(search)) {
                setPresentList(presentList => ([...presentList, element]))
            }
        })
    }, [search])

    const handleSearch = (event) => {
        setSearch(event.target.value)
    }

    const addNewTask = (newTask) => {
        setToDoList(toDoList => ([...toDoList, newTask]))
    }

    const changeTask = (task) => {
        const newTodoList = toDoList.map(element => {
            if(element.id === task.id) {
                return task
            }
            return element
        })
        setToDoList(newTodoList)
    }

    const removeTask = (task) => {
        setToDoList(toDoList.filter(item => item !== task))
    }

    const addCheckList = (id) => {
        if(checkList.findIndex((element) => element === id) > -1) {
            setCheckList(checkList.filter(item => item !== id))
        } else {
            toDoList.map((element) => {
                if(element.id === id) setCheckList(checkList => [...checkList,id])
            })   
        }
             
    }

    const removeBulk = () => {
        let newTodoList = toDoList
        for (let i = 0; i < checkList.length; i++) {
            newTodoList = newTodoList.filter(item => item.id !== checkList[i])
        }
        setToDoList(newTodoList)
        
        setCheckList([])
    }

    return (
        <div style={{height: "100vh", width: "90vw", display: "flex"}}>
            <div style={{height: "95%", width: "33%", border: "1px solid black"}} className="newTask">
                <div className="body" style={{marginLeft: '10%', marginRight: '10%'}}>
                    <h3 style={{textAlign:'center'}}>New task</h3>
                    <AddTask status='Add' addNewTask={addNewTask} toDoList={toDoList} task={{id: 0, title: '', description: '', dueDate: dayjs(), priority: 'normal'}}/>
                </div>
                
            </div>
            <div style={{height: "95%", width: "67%", border: "1px solid black", position: 'relative' }} className="todoList">
                <div className="body" style={{marginLeft: '10%', marginRight: '10%', overflow:'auto', height: "90%",}}>
                    <h3 style={{textAlign:'center'}}>To do List</h3>
                    <input className="input" type="text" placeholder="Search ..." value={search} onChange={handleSearch}/>
                    {presentList.map((element) => (
                        <Todo key={element.id} todo={element} changeTask={changeTask} removeTask={removeTask} addCheckList={addCheckList}/>
                    ))}    
                </div>
                {checkList.length > 0 ? 
                    (<footer style={{width: '100%', display:'flex', border:'1px solid black', height:'10%', backgroundColor: '#C4DFDF', position: "absolute",  bottom: '0'}}>
                        <div style={{paddingLeft: '20px'}}><p>Bulk Action:</p></div>
                        <div style={{width: '50%'}}></div>
                        <div style={{paddingTop:'20px'}}><button style={{height: '30px', width: '100px', backgroundColor: '#0079FF', color: 'white', borderRadius: '5px', border: 'solid #0079FF', cursor: 'pointer'}}>Done</button></div>
                        <div style={{width: '2%'}}></div>
                        <div style={{paddingTop:'20px'}}><button style={{height: '30px', width: '100px', backgroundColor: '#B31312', color: 'white', borderRadius: '5px', border: 'solid #B31312', cursor: 'pointer'}} onClick={removeBulk}>Remove</button></div>
                    </footer>)
                    :
                    (<></>)
                }
                
            </div>
        </div>
    )
}

export default Mainpage