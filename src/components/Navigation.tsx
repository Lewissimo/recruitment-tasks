import React, { useRef, useState } from "react";
import {
  Collapse,
  Grid,
  Pagination,
  useTheme,
} from "@mui/material";

import { observer } from "mobx-react";
import { defaultValues, tagsStoreType } from "../story/TagsStore";
import ColapseInputs from "./NavComponents/ColapseInputs";
import SearchInput from "./NavComponents/SearchInput";
import FiltersButtons from "./NavComponents/FiltersButtons";
const Navigation = observer(({tagsStore}: {tagsStore: tagsStoreType}) => {
  const [open, setOpen] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClearAll = () => {
    tagsStore.setParams({
      pageNum: 1,
      tagsPerPage: defaultValues.tagsPerPage,
      pattern: defaultValues.pattern,
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
      justifyContent={"space-between"}>
      <Grid item xs={12} sm={12} display="flex" justifyContent="center" my={2}>
        <Pagination
          disabled={!tagsStore.dataDiplayed}
          count={tagsStore.amountOfPaginNumbers}
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
      </Grid>
      <Grid item xs={4} sm={6} display="flex" justifyContent="start" my={2}>
          <FiltersButtons open={open} handleToggle={handleToggle} handleClearAll={handleClearAll} valuesChanged={tagsStore.valuesChanged} fetchTags={tagsStore.fetchTags.bind(tagsStore)}/>  
      </Grid>
      <Grid
        item
        xs={8}
        sm={6}
        display={"flex"}
        justifyContent={"end"}
        alignItems={"center"}>
       <SearchInput pattern={tagsStore.pattern} handleChangeSearchByName={handleChangeSearchByName} fetchTags={tagsStore.fetchTags.bind(tagsStore)}/>
      </Grid>

      <Grid
        item
        xs={12}
        sx={{
          transition: "0.6s",
          opacity: open ? "1" : "0",
          marginTop: open ? "0px" : "10px",
        }}>
        <Collapse in={open}>
          <ColapseInputs setOpen={setOpen} tagsStore={tagsStore} />
        </Collapse>
      </Grid>
    </Grid>
  );
});

export default Navigation;
