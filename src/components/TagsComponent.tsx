import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Skeleton,
} from "@mui/material";
import { tagsStore } from "../stories/TagsStore";

const FetchTags = observer(() => {
  useEffect(() => {
    tagsStore.fetchTags().catch((error) => console.error(error));
  }, []);
  const handleRowClick = (tagUrl: string) => {
    window.open(tagUrl, "_blank");
  };

  return (
    <>
      <TableContainer
        
        component={Paper}
        sx={{
          transition: ".7s",
          height: '80svh',
          overflow: 'auto',
          scrollbarWidth: 'thin',
          scrollbarColor: '#888 #f0f0f0',
        }}
        
        >
        <Table aria-label="simple table" stickyHeader>
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
              handleRowClick(`https://stackoverflow.com/questions/tagged/${tag.name}`);
            }}
            sx={{
              cursor: "pointer",
 
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

    </>
  );
});

export default FetchTags;
