import { Button, Grid } from '@mui/material';
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

interface FiltersButtonsInterface {
    open: boolean;
    handleToggle: () => void;
    handleClearAll: () => void;
    valuesChanged: boolean;
    fetchTags: () => Promise<void>;
  }
  
const FiltersButtons = ({open, handleToggle, handleClearAll, valuesChanged, fetchTags} : FiltersButtonsInterface) => {
  return (
    <Grid container alignItems={"center"}>
    <Grid item xs={12} sm={6}>
      <Button
        onClick={handleToggle}
        aria-expanded={open}
        aria-label="show more">
        filters {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      </Button>
    </Grid>
    {valuesChanged && (
      <Grid item xs={12} sm={6}>
        <Button
          onClick={async () => {
            await handleClearAll();
            fetchTags().catch((error) => console.error(error));
          }}
          aria-expanded={open}
          aria-label="show more">
          clear all
        </Button>
      </Grid>
    )}
  </Grid>
  )
}

export default FiltersButtons