import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  styled,
} from "@mui/material";
import React from "react";
import { filterEnum, orderEnum } from "../../services/ApiCommunication";
import { observer } from "mobx-react-lite";
import { tagsStore } from "../../stories/TagsStore";
const StyledGridItem = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: theme.spacing(2),
  [theme.breakpoints.up('xs')]: {
    justifyContent: 'center'
  },
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'start'
  },
}));
const ColapseInputs = observer(() => {




  const handleChangeSelectOrder = (event: SelectChangeEvent) => {
    let value: orderEnum | null = null;
    const selectedValue = event?.target.value;
    switch (selectedValue) {
      case "1":
        value = orderEnum.growing;
        break;
      case "2":
        value = orderEnum.descending;
        break;
      default:
        console.warn("Unknown filter selected:", selectedValue);
        break;
    }

    if (value !== null) {
      tagsStore.setParams({
        pageNum: tagsStore.pageNum,
        tagsPerPage: tagsStore.tagsPerPage,
        pattern: tagsStore.pattern,
        filter: tagsStore.filter,
        dateFrom: tagsStore.dateFrom,
        dateTo: tagsStore.dateTo,
        order: value,
      });
    }
  };

  const handleDateToChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.currentTarget.value);
    tagsStore.setParams({
      pageNum: tagsStore.pageNum,
      tagsPerPage: tagsStore.tagsPerPage,
      pattern: tagsStore.pattern,
      filter: tagsStore.filter,
      dateFrom: tagsStore.dateFrom,
      dateTo: event.currentTarget.value,
      order: tagsStore.order,
    });
  };
  const handleDateFromChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    tagsStore.setParams({
      pageNum: tagsStore.pageNum,
      tagsPerPage: tagsStore.tagsPerPage,
      pattern: tagsStore.pattern,
      filter: tagsStore.filter,
      dateFrom: event.currentTarget.value,
      dateTo: tagsStore.dateTo,
      order: tagsStore.order,
    });
  };

  const handleChangeSelectSort = (event: SelectChangeEvent) => {
    let value: filterEnum | null = null;

    const selectedValue = event.target.value;



    switch (selectedValue) {
      case "1":
        value = filterEnum.ALPHABETICALLY;
        break;
      case "2":
        value = filterEnum.POPULAR;
        break;
      case "3":
        value = filterEnum.ACTIVITY;
        break;
      default:
        console.warn("Unknown filter selected:", selectedValue);
        break;
    }

    if (value !== null) {
      tagsStore.setParams({
        pageNum: tagsStore.pageNum,
        tagsPerPage: tagsStore.tagsPerPage,
        pattern: tagsStore.pattern,
        filter: value,
        dateFrom: tagsStore.dateFrom,
        dateTo: tagsStore.dateTo,
        order: tagsStore.order,
      });
    }
  };
  const getFilterValue = (filter: filterEnum | orderEnum) => {
    switch (filter) {
      case filterEnum.ALPHABETICALLY:
        return "1";
      case orderEnum.growing:
        return "1";
      case filterEnum.POPULAR:
        return "2";
      case orderEnum.descending:
        return "2";
      case filterEnum.ACTIVITY:
        return "3";
      default:
        return "1";
    }
  };

  const handleChangeTagsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) =>
    tagsStore.setParams({
      pageNum: tagsStore.pageNum,
      tagsPerPage: parseInt(event.target.value),
      pattern: tagsStore.pattern,
      filter: tagsStore.filter,
      dateFrom: tagsStore.dateFrom,
      dateTo: tagsStore.dateTo,
      order: tagsStore.order,
    });

  return (
    <Grid
      mt={"15px"}
      container
      justifyContent={"start"}
      sx={{ position: "relative", zIndex: "10" }}
    >
      <StyledGridItem item
              xs={12}
              sm={4}
      >
        <TextField
          sx={{
            width: '60%'
          }}
          type="number"
          value={tagsStore.tagsPerPage}
          onChange={handleChangeTagsPerPage}
          label="Tags per page"
          variant="standard"
        />
      </StyledGridItem>

      <StyledGridItem item
              xs={12}
              sm={4}
      >
        <FormControl variant="standard"
         sx={{
          width: '60%'
        }}
        >
          <InputLabel id="sort-select-label">Sort by</InputLabel>
          <Select
            labelId="sort-select-label"
            id="sort-select"
            value={getFilterValue(tagsStore.filter)}
            label="sort by"
            onChange={handleChangeSelectSort}
          >
            <MenuItem value="1">alphabetically</MenuItem>
            <MenuItem value="2">popularity</MenuItem>
            <MenuItem value="3">activity</MenuItem>
          </Select>
        </FormControl>
      </StyledGridItem>
      <StyledGridItem item
              xs={12}
              sm={4}
      >
        <FormControl variant="standard"
         sx={{
          width: '60%'
        }}
        >
          <InputLabel id="order-select-label">Kolejność</InputLabel>
          <Select
            onChange={handleChangeSelectOrder}
            labelId="order-select-label"
            id="order-select"
            value={getFilterValue(tagsStore.order)}
            label="Kolejność"
          >
            <MenuItem value="1">Rosnąco</MenuItem>
            <MenuItem value="2">Malejąco</MenuItem>
          </Select>
        </FormControl>
      </StyledGridItem>
      <StyledGridItem item
              xs={12}
              sm={4}
      >
        <TextField
         sx={{
          width: '60%'
        }}
          onChange={handleDateToChange}
          type="date"
          variant="standard"
          InputLabelProps={{
            shrink: true,
          }}
          label="Created Before"
        />
      </StyledGridItem>
      <StyledGridItem item
              xs={12}
              sm={4}
      >
        <TextField
         sx={{
          width: '60%'
        }}
          onChange={handleDateFromChange}
          type="date"
          variant="standard"
          InputLabelProps={{
            shrink: true,
          }}
          label="Created After"
        />
      </StyledGridItem>

      <Grid item xs={12}
         mt={2}
         display={"flex"}
         justifyContent={"center"}
         width={"100"}
         >
        <Button
          variant="text"
          onClick={() => {
            tagsStore.fetchTags().catch((error) => console.error(error));
          }}
        >
          Apply
        </Button>
      </Grid>
    </Grid>
  );
});

export default ColapseInputs;
