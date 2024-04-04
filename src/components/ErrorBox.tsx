import { Alert } from "@mui/material";

const ErrorBox = ({errorMessage}: {errorMessage: string}) => {
  return (
    <Alert
      sx={{
        position: "fixed",
        bottom: "0",
        left: "50%",
        transform: "translateX(-50%)",
        fontWeight: "bold",
      }}
      severity="info">
      {errorMessage}
    </Alert>
  );
};

export default ErrorBox;
