import { IconButton, InputAdornment, TextField } from '@mui/material';
import React from 'react'
import SearchIcon from "@mui/icons-material/Search";

const SearchInput = ({pattern, handleChangeSearchByName, fetchTags}: {pattern: string, handleChangeSearchByName: (event: React.ChangeEvent<HTMLInputElement>)=>void, fetchTags: ()=>void}) => {
  return (
    <>
       <TextField
          type="text"
          value={pattern}
          onChange={handleChangeSearchByName}
          onKeyDown={(event: React.KeyboardEvent) => {
            if (event.key === 'Enter') {
                fetchTags();
            }
          }}
          label="Search by name"
          margin="normal"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    fetchTags();
                  }}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />  
    </>
  )
}

export default SearchInput