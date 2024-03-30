import { Alert } from "@mui/material";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { tagsStore } from "../stories/TagsStore";

const ErrorBox = observer(() => {
  const [onSite, setOnSite] = useState(false);

  useEffect(() => {
    if (tagsStore.errorMessage !== "") {
      setOnSite(true);
      setTimeout(() => {
        setOnSite(false);
      }, 3000);
    }
  }, [tagsStore.errSwitch]);

  return (
    <div>
      {onSite && (
        <Alert
          sx={{
            position: "fixed",
            bottom: "0",
            left: "50%",
            transform: "translateX(-50%)",
            fontWeight: "bold",
          }}
          severity="info">
          {tagsStore.errorMessage}
        </Alert>
      )}
    </div>
  );
});

export default ErrorBox;
