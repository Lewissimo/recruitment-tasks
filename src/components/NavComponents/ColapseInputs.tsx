import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React from "react";
import { filterEnum, orderEnum } from "../../services/ApiCommunication";
import { observer } from "mobx-react-lite";
import { tagsStore } from "../../stories/TagsStore";

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
  }
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
  }

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
        break;
      case orderEnum.growing:
        return "1";
        break;
      case filterEnum.POPULAR:
        return "2";
        break;
      case orderEnum.descending:
        return "2";
        break;
      case filterEnum.ACTIVITY:
        return "3";
        break;
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

  const handleChangeSearchByName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) =>
    tagsStore.setParams({
      pageNum: tagsStore.pageNum,
      tagsPerPage: tagsStore.tagsPerPage,
      pattern: event.target.value,
      filter: tagsStore.filter,
      dateFrom: tagsStore.dateFrom,
      dateTo: tagsStore.dateTo,
      order: tagsStore.order,
    });
  return (
    <Grid container mt={1} justifyContent={"center"} sx={{position: "relative", zIndex: '10'}}>
      <Grid
        item
        xs={12}
        mt={1}
        sm={4}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}>
        <TextField
          type="number"
          value={tagsStore.tagsPerPage}
          onChange={handleChangeTagsPerPage}
          label="Tags per page"
          margin="normal"
          variant="outlined"
          sx={{
            padding: "0",
            margin: "0",

            width: "320px",
          }}
        />
      </Grid>
      <Grid
        mt={1}
        item
        xs={12}
        sm={4}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}>
        <TextField
          type="text"
          value={tagsStore.pattern}
          onChange={handleChangeSearchByName}
          label="Search by name"
          margin="normal"
          variant="outlined"
          sx={{
            padding: "0",
            margin: "0",
            width: "320px",
          }}
        />
      </Grid>
      <Grid
        item
        mt={1}
        xs={12}
        sm={4}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}>
        <FormControl
          sx={{
            padding: "0",
            margin: "0",
            width: "320px",
          }}>
          <InputLabel id="sort-select-label">Sort by</InputLabel>
          <Select
            labelId="sort-select-label"
            id="sort-select"
            value={getFilterValue(tagsStore.filter)}
            label="sort by"
            onChange={handleChangeSelectSort}>
            <MenuItem value="1">alphabetically</MenuItem>
            <MenuItem value="2">popularity</MenuItem>
            <MenuItem value="3">activity</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid
        item
        my={1}
        xs={12}
        sm={4}
        display="flex"
        justifyContent="center"
        alignItems="center">
        <TextField
            onChange={handleDateFromChange}
          type="date"
          sx={{
            padding: "0",
            margin: "0",
            width: "320px",
          }}
          InputLabelProps={{
            shrink: true,
          }}
          label="Created After"
        />
      </Grid>
      <Grid
        item
        my={1}
        xs={12}
        sm={4}
        display="flex"
        justifyContent="center"
        alignItems="center">
        <TextField
        onChange={handleDateToChange}
          type="date"
          sx={{
            padding: "0",
            margin: "0",
            width: "320px",
          }}
          InputLabelProps={{
            shrink: true,
          }}
          label="Created Before"
        />
      </Grid>
      <Grid
        item
        my={1}
        xs={12}
        sm={4}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}>
        <FormControl
          sx={{
            padding: "0",
            margin: "0",
            width: "320px",
          }}>
          <InputLabel id="order-select-label">Kolejność</InputLabel>
          <Select
            onChange={handleChangeSelectOrder}
            labelId="order-select-label"
            id="order-select"
            value={getFilterValue(tagsStore.order)}
            label="Kolejność">
            <MenuItem value="1">Rosnąco</MenuItem>
            <MenuItem value="2">Malejąco</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid mt={1} item xs={10}>
        <Button
          variant="outlined"
          fullWidth
          onClick={() => {
            tagsStore.fetchTags().catch((error) => console.error(error));
          }}>
          Apply
        </Button>
      </Grid>
    </Grid>
  );
});

export default ColapseInputs;
