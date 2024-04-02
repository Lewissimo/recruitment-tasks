import React, { useRef, useState } from "react";
import {
  Button,
  Collapse,
  Grid,
  IconButton,
  InputAdornment,
  Pagination,
  TextField,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { observer } from "mobx-react";
import { defaultValues, tagsStore } from "../stories/TagsStore";
import ColapseInputs from "./NavComponents/ColapseInputs";
const Navigation = observer(() => {
  const [open, setOpen] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClearAll = () => {
    tagsStore.setParams({
      pageNum: 1,
      tagsPerPage: defaultValues.tagsPerPage,
      pattern: tagsStore.pattern,
      filter: defaultValues.filter,
      dateFrom: defaultValues.dataFrom,
      dateTo: defaultValues.dataTo,
      order: defaultValues.orderEnum,
    });
  };
  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    tagsStore.setParams({
      pageNum: page,
      tagsPerPage: tagsStore.tagsPerPage,
      pattern: tagsStore.pattern,
      filter: tagsStore.filter,
      dateFrom: tagsStore.dateFrom,
      dateTo: tagsStore.dateTo,
      order: tagsStore.order,
    });

    tagsStore.fetchTags().catch(console.error);
  };
  const handleChangeSearchByName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) =>
    tagsStore.setParams({
      pageNum: 1,
      tagsPerPage: tagsStore.tagsPerPage,
      pattern: event.target.value,
      filter: tagsStore.filter,
      dateFrom: tagsStore.dateFrom,
      dateTo: tagsStore.dateTo,
      order: tagsStore.order,
    });
  const theme = useTheme();

  return (
    <Grid
      ref={tableRef}
      id={"table"}
      container
      justifyContent={"space-between"}
    >
      <Grid item xs={12} sm={12} display="flex" justifyContent="center" my={2}>
        {tagsStore.tagsPerPage && (
          <Pagination
            disabled={!tagsStore.dataDiplayed}
            count={Math.ceil(tagsStore.totalTags / tagsStore.tagsPerPageAc)}
            shape="rounded"
            page={tagsStore.pageNum}
            onChange={handleChangePage}
            sx={{
              "& .MuiPaginationItem-root": {
                minWidth: "24px",
                padding: "0 6px",
              },
              [theme.breakpoints.down("xs")]: {
                "& .MuiPaginationItem-root": {
                  minWidth: "20px",
                  padding: "0 4px",
                },
              },
            }}
          />
        )}
      </Grid>
      <Grid item xs={4} sm={6} display="flex" justifyContent="start" my={2}>
        <Grid container alignItems={"center"}>
          <Grid item xs={12} sm={6}>
            <Button
              onClick={handleToggle}
              aria-expanded={open}
              aria-label="show more"
            >
              filters {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </Button>
          </Grid>
          {tagsStore.valuesChanged && (
            <Grid item xs={12} sm={6}>
              <Button
                onClick={async ()=>{
                  await handleClearAll()
                  tagsStore
                  .fetchTags()
                  .catch((error) => console.error(error));
                }}
                aria-expanded={open}
                aria-label="show more"
              >
                clear all
              </Button>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid
        item
        xs={8}
        sm={6}
        display={"flex"}
        justifyContent={"end"}
        alignItems={"center"}
      >
        <TextField
          type="text"
          value={tagsStore.pattern}
          onChange={handleChangeSearchByName}
          label="Search by name"
          margin="normal"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    tagsStore
                      .fetchTags()
                      .catch((error) => console.error(error));
                  }}
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      <Grid
        item
        xs={12}
        sx={{
          transition: "0.6s",
          opacity: open ? "1" : "0",
          marginTop: open ? "0px" : "10px",
        }}
      >
        <Collapse in={open}>
          <ColapseInputs />
        </Collapse>
      </Grid>
    </Grid>
  );
});

export default Navigation;
