import { useEffect, useState } from "react"
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

function AirlinesInfo(){
  const [airlines, setAirlines]=useState([])
  const [isLoading, setLoading]=useState(true)

  const columns = [
    { field: 'id', headerName: 'ID', disableColumnMenu: true },
    { field: 'logo', headerName: 'Logo', disableColumnMenu: true },
    { field: 'name', headerName: 'Name', disableColumnMenu: true },
    { field: 'address', headerName: 'Address', disableColumnMenu: true },
    { field: 'website', headerName: 'Website', disableColumnMenu: true },
    { field: 'action', headerName: 'Action', disableColumnMenu: true },
  ];

  const getData=async ()=>{
    try {
      setLoading(true);
      const {data}=await axios.get("https://api.instantwebtools.net/v1/airlines")
      setAirlines(data)
    } catch (error) {
      console.error(error)
    } finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    getData()
  }, [])

  if(isLoading){
    return <CircularProgress />
  }

  if(airlines.length===0){
    return <h3>No data found</h3>
  }

  return (
    <>
      <h3>Airlines`</h3>
      <DataGrid
          rows={airlines}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          components={{ Toolbar: GridToolbar }}
          disableSelectionOnClick
          componentsProps={{
            toolbar: {
              showQuickFilter: false,
              csvOptions: { disableToolbarButton: true },
              printOptions: { disableToolbarButton: true },
              quickFilterProps: { debounceMs: 500 },
            },
          }}
        />
    </>
  )
}

export default AirlinesInfo