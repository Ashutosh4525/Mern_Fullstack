
// const CategoryList=()=>{
//     return (
//         <>
//         <section>
//             <p>category List</p>
//         </section>
//         </>
//     )
// }

// export default CategoryList;

import * as React from 'react';
import { useState,useEffect } from "react"
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import axios from 'axios'
import TextField from '@mui/material/TextField';
import {
  GridRowModes,
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
  Toolbar,
  ToolbarButton,
} from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from '@mui/x-data-grid-generator';


export default function CategoryList() {
  const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};
  const [rows, setRows] = useState([]);
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [editData, setEditData] = useState({ name: "",src:"", description: "" });

  
  
  const handleView = (id) => {
    const row = rows.find((r) => r.id === id);
    setSelectedRow(row);
    setOpenView(true);
  };


  const handleEdit = (id)=>{
     const row = rows.find((r) => r.id === id);
    setSelectedRow(row);
    setEditData({ name: row.name, image: row.image, description: row.description });
    setOpenEdit(true);
  }
  const handleSaveEdit = () => {
    axios
      .put(
        `https://6904a8d46b8dabde496499d6.mockapi.io/session9/category/${selectedRow.id}`,
        editData
      )
      .then((response) => {
        setRows((prev) =>
          prev.map((item) =>
            item.id === selectedRow.id ? response.data : item
          )
        );
        setOpenEdit(false);
      })
      .catch((error) => console.error("Error updating:", error));
  };

  const handleDelete = (id)=>{
    if(window.confirm("Are you sure")){
      axios
      .delete(`https://6904a8d46b8dabde496499d6.mockapi.io/session9/category/${id}`)
      .then(()=>{
        setRows((prev) => prev.filter((item) => item.id !== id));
      })
      .catch((error)=>{
        console.log(error);
      })
    }

  }

  
  const columns = [
    { field: 'id', headerName: 'ID', width: 20 },
    { field: 'name', headerName: 'Category Name', width: 180, },
    {
      field: 'image',
      headerName: 'Image',
      width: 100,
      renderCell: (params) => (
      <Avatar alt={params.row.name} src={params.value} />),
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 220,
      // editable: true,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        // console.log(id);
        
          return [
            // <GridActionsCellItem
            //   icon={<SaveIcon />}
            //   label="Save"
            //   material={{
            //     sx: {
            //       color: 'primary.main',
            //     },
            //   }}
            //   onClick={handleSaveClick(id)}
            // />,
            // <GridActionsCellItem
            //   icon={<CancelIcon />}
            //   label="Cancel"
            //   className="textPrimary"
            //   onClick={handleCancelClick(id)}
            //   color="inherit"
            // />,
            <GridActionsCellItem
            icon={<RemoveRedEyeOutlinedIcon />}
            label="View"
            className="textPrimary"
            onClick={()=>handleView(id)}
            color="blue"
          />,
            <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={()=>handleEdit(id)}
            // color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={()=>handleDelete(id)}
            // color="inherit"
          />,
          ];
      },
    },
  ];

  useEffect(()=>{
    axios
    .get("https://6904a8d46b8dabde496499d6.mockapi.io/session9/category")
    .then((response)=>{
        setRows(response.data)
    })
    .catch((error)=>{
        console.error(error);
    })
  },[])

  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 6,
            },
          },
        }}
        pageSizeOptions={[6]}
        showToolbar
      />
      <Modal open={openView} onClose={() => setOpenView(false)}>
        <Box sx={style}>
          <div className='flex justify-between'>
          <h3>Category</h3>
          <h3 className='cursor-pointer' onClick={() => setOpenView(false)}>x</h3>
          </div>
          {selectedRow && (
            <>
              <Avatar
                src={selectedRow.image}
                alt={selectedRow.name}
                sx={{ width: 60, height: 60, mb: 2 }}
              />
              <p><strong>Name:</strong> {selectedRow.name}</p>
              <p><strong>Description:</strong> {selectedRow.description}</p>
            </>
          )}
          {/* <Button variant="contained" onClick={() => setOpenView(false)}>
            Close
          </Button> */}
        </Box>
      </Modal>
       <Modal open={openEdit} onClose={() => setOpenEdit(false)}>
        
        <Box sx={style}>
         <div className='flex justify-between'>
          <h3>Edit Category</h3>
          <h3 className='cursor-pointer' onClick={() => setOpenEdit(false)}>x</h3>
          </div>
          <br />
          <TextField
            label="Category Name"
            fullWidth
            id="outlined-basic"
            sx={{ mb: 2 }}
            value={editData.name}
            onChange={(e) =>
              setEditData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <TextField
            label="Image URL"
            fullWidth
            id="outlined-basic"
            sx={{ mb: 2 }}
            value={editData.image}
            onChange={(e) =>
              setEditData( {...editData, image: e.target.value})
            }
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={3}
            sx={{ mb: 2 }}
            value={editData.description}
            onChange={(e) =>
              setEditData((prev) => ({ ...prev, description: e.target.value }))
            }
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="contained" onClick={handleSaveEdit}>
              Submit
            </Button>
            {/* <Button variant="outlined" onClick={() => setOpenEdit(false)}>
              Cancel
            </Button> */}
          </Box>
        </Box>
        </Modal>
    </Box>
  );
}
