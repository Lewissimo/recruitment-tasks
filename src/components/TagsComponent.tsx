import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Skeleton,
} from "@mui/material";
import { tagsStore } from "../stories/TagsStore";
import { fetchTags, filterEnum } from "../services/ApiCommunication";
import { Tag } from "../services/types";

const FetchTags = observer(() => {
  const [tags, setTags] = useState<Tag[] | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    tagsStore.fetchTags().catch((error) => console.error(error));
  }, []);
  const handleRowClick = (tagUrl: string) => {
    window.open(tagUrl, "_blank");
  };

  const handlePrevPage = () => setPage((prevPage) => Math.max(1, prevPage - 1));
  const handleNextPage = () => setPage((prevPage) => prevPage + 1);

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          transition: ".7s",
          opacity: tagsStore.tableVisible ? 1 : 0
        }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Tag</TableCell>
              <TableCell align="right">Post Count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tagsStore.tags?.map((tag) => (
              <TableRow
                key={tag.name}
                onClick={() => {
                  handleRowClick(
                    `https://stackoverflow.com/questions/tagged/${tag.name}`
                  );
                }}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }}>
                {tagsStore.isLoading ? (
                  <TableCell colSpan={2} >
                    <Skeleton sx={{position: "relative", zIndex: '0'}}/>
                  </TableCell>
                ) : (
                  <>
                    <TableCell component="th" scope="row">
                      {tag.name}
                    </TableCell>
                    <TableCell align="right">{tag.count}</TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="body2" color="textSecondary" align="center">
        Page: {page}
      </Typography>
    </>
  );
});

export default FetchTags;
