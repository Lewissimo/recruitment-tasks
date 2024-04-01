import React, { useEffect, useRef, useState } from "react";
import {
  Collapse,
  Grid,
  IconButton,
  Pagination,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { observer } from "mobx-react";
import { tagsStore } from "../stories/TagsStore";
import ColapseInputs from "./NavComponents/ColapseInputs";
const Navigation = observer(() => {
  const [open, setOpen] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);
  
  const handleOnScroll = () => {
    if (tableRef.current && tableRef.current.getBoundingClientRect().top < 10) {
      tagsStore.setTableVisible(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleOnScroll);
    return () => window.removeEventListener("scroll", handleOnScroll);
  }, []);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
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
      order: tagsStore.order
    });

    tagsStore.fetchTags().catch(console.error);
  };
  return (
    <Grid
      ref={tableRef}
      id={"table"}
      container
      justifyContent={"space-between"}
      position={"sticky"}
      top={"0"}
      bgcolor={"white"}
      sx={{
        transition: ".7s",
        opacity: tagsStore.tableVisible ? 1 : 0,
      }}>
      <Grid item xs={12} sm={12} display="flex" justifyContent="center" my={2}>
        {tagsStore.tagsPerPage && (
          <Pagination
            disabled={!tagsStore.dataDiplayed}
            count={Math.ceil(tagsStore.totalTags / tagsStore.tagsPerPageAc)}
            shape="rounded"
            page={tagsStore.pageNum}
            onChange={handleChangePage}
          />
        )}
      </Grid>

      <Grid item xs={12} sm={12} display="flex" justifyContent="center" my={2}>
        <IconButton
          onClick={handleToggle}
          aria-expanded={open}
          aria-label="show more">
          {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </IconButton>
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
          <ColapseInputs />
        </Collapse>
      </Grid>
    </Grid>
  );
});

export default Navigation;
