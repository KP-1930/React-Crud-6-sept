import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { updateUser, getSingleUser} from '../redux/actions'

function EditUser() {

    const [state, setState] = useState({
        name: "",
        email: "",
        contact: "",
        address: "",
    })

    const [error, setError] = useState("")

    const { name, email, contact, address } = state;
    const navigate = useNavigate()
    let dispatch = useDispatch()
    let {id} = useParams()

    const {user} = useSelector((state) => state.data)


    useEffect(() => {
        dispatch(getSingleUser(id))
    },[])

    useEffect(() => {
        if(user) {
            setState({...user})
        }
    },[user])

    const handleInputChange = (e) => {
        let {name, value } = e.target
        setState({...state, [name]: value})

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!name || !email || !contact || !address) {
            setError("Please Input All Input Fields")
        }
        else {
            dispatch(updateUser(state,id))
            navigate('/')
            setError("")

        }
    }

    return (
        <div>
            <div className="backButton">
                <Button variant="contained" color='secondary' type='submit' style={{ width: "1%", marginTop: "10px", }} onClick={() => navigate('/')}>Back</Button>
            </div>  
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '60ch' },
                }}
                noValidate
                autoComplete="off" onSubmit={handleSubmit}
            >
                <h3 style={{ textAlign: "right" }}>Edit User</h3>
                {error && <h3 className='errorFields' style = {{color : "red"}}>{error}</h3>}
                <TextField id="standard-basic" label="Name" variant="standard" type='text' name='name' value={name || ""} onChange={handleInputChange} /> <br />
                <TextField id="standard-basic" label="Email" variant="standard" type='email' name='email' value={email || ""}  onChange={handleInputChange}/> <br />
                <TextField id="standard-basic" label="Contact" variant="standard" type='number' name='contact' value={contact || ""} onChange={handleInputChange}/> <br />
                <TextField id="standard-basic" label="Address" variant="standard" type='text' name='address' value={address || ""}  onChange={handleInputChange}/><br />
                <Button variant="contained" color='primary' type='submit' style={{ width: "10%" }}>Update User</Button>

            </Box>
        </div>
    )
}

export default EditUser