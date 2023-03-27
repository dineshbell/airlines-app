import { useEffect, useState } from "react"
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

function PassengersInfo(){
  const [passengers, setPassengers]=useState([])
  const [isLoading, setLoading]=useState(true)
  const [openModal, setOpenModal]=useState(false)
  const [totalSize, setTotalSize]=useState(0)
  const [page, setPage]=useState(0)
  const [pageSize, setPageSize]=useState(10)

  const columns = [
    { field: 'name', headerName: 'Name', disableColumnMenu: true, width: 150},
    { field: 'logo', headerName: 'Logo', disableColumnMenu: true, width: 180},
    { field: 'head_quaters', headerName: 'Address', disableColumnMenu: true, width: 150},
    { field: 'country', headerName: 'Country', disableColumnMenu: true, width: 200},
    { field: 'website', headerName: 'Website', disableColumnMenu: true, width: 200},
    { field: 'action', headerName: 'Action', disableColumnMenu: true, width: 200},
  ];

  const getData=async ()=>{
    try {
      setLoading(true);
      const {data}=await axios.get(`https://api.instantwebtools.net/v1/passenger?page=${page}&size=${pageSize}`)
      setTotalSize(data.totalPassengers)
      setPassengers(data.data?.map(item=>({...item.airline[0]})) || [])
    } catch (error) {
      console.error(error)
    } finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    getData()
  }, [page, pageSize])

  if(isLoading){
    return <CircularProgress />
  }

  if(passengers.length===0){
    return <h3>No data found</h3>
  }

  return (
    <>
      <Box
        sx={{
          height:  620,
          width: '100%',
          '& .super-app-theme--header': {
            backgroundColor: '#1976D2',
          },
        }}
      >
        <h3>Passengers</h3>
        <DataGrid
            style={{height:'100%'}}
            rows={passengers}
            columns={columns}
            slots={{
              cell: (item)=>{
                
              if(item.field==='action'){
                return <Button variant="contained" sx={{width:'200px', margin:'8px'}} onClick={()=>{
                  setOpenModal(passengers[item.rowId])
                }}>View Details</Button>
              }

              if(item.field==='logo'){
                return <div style={{width:'150px', overflow:'hidden'}}><img src={item.value} width="100%" height="40px" alt="img-name" /></div>
              }

              return <td><p style={{ width:'150px', margin:'8px'}}>{item.value}</p></td>
            }
            }}
            pageSize={10}
            pageSizeOptions={[10, 15, 20]}
            paginationModel={{
              page,
              pageSize
            }}
            rowsPerPageOptions={[15]}
            onPaginationModelChange={(model, details)=>{
              setPage(model.page)
              setPageSize(model.pageSize)
            }}
            components={{ Toolbar: GridToolbar }}
            disableSelectionOnClick
            rowCount={totalSize}
            componentsProps={{
              toolbar: {
                showQuickFilter: false,
                csvOptions: { disableToolbarButton: true },
                printOptions: { disableToolbarButton: true },
                quickFilterProps: { debounceMs: 500 },
              },
            }}
          />
      </Box>

      <Dialog onClose={()=>setOpenModal(false)} open={openModal} maxWidth="sm" fullWidth>
        <DialogTitle><strong>Passenger Details</strong></DialogTitle>
        <DialogContent>
            <ul>
              <li><b>Name</b>: {openModal?.name}</li>
              <li><b>Country</b>: {openModal?.country}</li>
              <li><b>Slogan</b>: {openModal?.slogan}</li>
              <li><b>Head Quarters</b>: {openModal?.head_quaters}</li>
              <li><b>Website</b>: {openModal?.website}</li>
              <li><b>Established</b>: {openModal?.established}</li>
              <div style={{display:'flex', alignItems:'center', width:'100%'}}>
                <img src={openModal.logo} alt="img_name" width="300px" />
              </div>
            </ul>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default PassengersInfo