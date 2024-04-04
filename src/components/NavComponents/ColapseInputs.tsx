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
import { tagsStoreType } from "../../story/TagsStore";

const StyledGridItem = styled(Grid)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginTop: theme.spacing(2),
  [theme.breakpoints.up("xs")]: {
    justifyContent: "center",
    '& .MuiFormControl-root': {
      width: '80%'
    },
  },
  [theme.breakpoints.up("sm")]: {
    justifyContent: "start",
    '& .MuiFormControl-root': {
      width: '60%'
    },
  },
}));

const ColapseInputs = observer(
  ({ setOpen, tagsStore }: { setOpen: (value: boolean) => void, tagsStore: tagsStoreType }) => {
    const orderList = {
      growing: orderEnum.growing,
      descending: orderEnum.descending,
    };

    const sortList = {
      alphabetically: filterEnum.ALPHABETICALLY,
      popularity: filterEnum.POPULAR,
      activity: filterEnum.ACTIVITY,
    };

    const handleChangeSelectOrder = (event: SelectChangeEvent) => {
      tagsStore.setParams({
        ...tagsStore,
        pageNum: 1,
        order: event.target.value as orderEnum,
      });
    };

    const handleDateToChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log(event.currentTarget.value);
      tagsStore.setParams({
        ...tagsStore,
        pageNum: 1,
        dateTo: event.currentTarget.value,
      });
    };
    const handleDateFromChange = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      tagsStore.setParams({
        ...tagsStore,
        pageNum: 1,
        dateFrom: event.currentTarget.value,
      });
    };

    const handleChangeSelectSort = (event: SelectChangeEvent) => {
      tagsStore.setParams({
        ...tagsStore,
        pageNum: 1,
        filter: event.target.value as filterEnum,
      });
    };

    const handleChangeTagsPerPage = (
      event: React.ChangeEvent<HTMLInputElement>
    ) =>
      tagsStore.setParams({
        ...tagsStore,
        pageNum: 1,
        tagsPerPage: parseInt(event.target.value),
      });

    return (
      <Grid
        mt={"15px"}
        container
        justifyContent={"start"}
        sx={{ position: "relative", zIndex: "10" }}>
        <StyledGridItem item xs={12} sm={4}>
          <TextField
            type="number"
            value={tagsStore.tagsPerPage}
            onChange={handleChangeTagsPerPage}
            label="Tags per page"
            variant="standard"
          />
        </StyledGridItem>

        <StyledGridItem item xs={12} sm={4}>
          <FormControl
            variant="standard">
            <InputLabel id="sort-select-label">Sort by</InputLabel>
            <Select
              labelId="sort-select-label"
              id="sort-select"
              value={tagsStore.filter}
              label="sort by"
              onChange={handleChangeSelectSort}>
              {Object.entries(sortList).map(([key, value]) => {
                return <MenuItem value={value}>{key}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </StyledGridItem>
        <StyledGridItem item xs={12} sm={4}>
          <FormControl
            variant="standard">
            <InputLabel id="order-select-label">Order</InputLabel>
            <Select
              onChange={handleChangeSelectOrder}
              labelId="order-select-label"
              id="order-select"
              value={tagsStore.order}
              label="order">
              {Object.entries(orderList).map(([key, value]) => {
                return <MenuItem value={value}>{key}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </StyledGridItem>
        <StyledGridItem item xs={12} sm={4}>
          <TextField
            onChange={handleDateToChange}
            type="date"
            value={tagsStore.dateTo}
            variant="standard"
            InputLabelProps={{
              shrink: true,
            }}
            label="Created Before"
          />
        </StyledGridItem>
        <StyledGridItem item xs={12} sm={4}>
          <TextField
            onChange={handleDateFromChange}
            type="date"
            value={tagsStore.dateFrom}
            variant="standard"
            InputLabelProps={{
              shrink: true,
            }}
            label="Created After"
          />
        </StyledGridItem>

        <Grid
          item
          xs={12}
          mt={2}
          display={"flex"}
          justifyContent={"center"}
          width={"100"}>
          <Button
            variant="text"
            onClick={() => {
              setOpen(false);
              tagsStore.fetchTags().catch((error) => console.error(error));
            }}>
            Apply
          </Button>
        </Grid>
      </Grid>
    );
  }
);

export default ColapseInputs;
