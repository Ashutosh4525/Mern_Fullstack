import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from 'axios'
import { useState } from 'react';
import DoneIcon from '@mui/icons-material/Done';
const CategoryAdd=()=>{

    const[output,setOutput]=useState("");
    const [editData,setEditData]=useState({name:"",image:"",description:""})
    const handleAdd = (e) => {
         e.preventDefault();
        console.log(editData);
        
    axios
      .post(
        `https://6904a8d46b8dabde496499d6.mockapi.io/session9/category/`,
        editData
      )
      .then((response) => {
        console.log(response);
        setOutput("Updated")
        setEditData({ name: '', image: '', description: '' });
      })
      .catch((error) => {
        console.error("Error updating:", error)
        setOutput("Error")
    });
  };

    return (
        <>
        <section className=''>
             <Box
                component="form"
                sx={{  p:1} }
                noValidate
                autoComplete="off"
                onSubmit={handleAdd}
                >
            <TextField
            label="Category Name"
            id="outlined-basic"
            sx={{ width:1/2 }}
            value={editData.name}
             onChange={(e) => setEditData({ ...editData, name: e.target.value })}
            />
            <TextField
            label="Image URL"
            id="outlined-basic"
            sx={{ width:1/2 }}
            value={editData.image}
            onChange={(e) => setEditData({ ...editData, image: e.target.value })}
            />     
            <TextField
            label="Description"
            fullWidth
            multiline
            rows={3}
            sx={{ mt: 1, width:1}}
            value={editData.description}
             onChange={(e) => setEditData({ ...editData, description: e.target.value })}
            />   

            <Button type="submit">
                Submit
            </Button>
             {output && <p className="bg-blue-200 text-blue-600"style={{ textAlign: 'center' }}><DoneIcon/>{output}</p>}
            </Box>    

        </section>
        </>
    )
}

export default CategoryAdd;