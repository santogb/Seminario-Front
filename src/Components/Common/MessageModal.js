import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import CustomButton from "./CustomButton";

export default function ModalUsuario({ 
  isOpen, 
  isLoading, 
  title, 
  message,
  messages,
  isSuccess, 
  isError,
  handleSuccess, 
  handleError, 
  handleClose 
}) {

  isOpen = isOpen || false;
  isLoading = isLoading || false;

  title = title || "Operación exitosa";
  message = message || "La operacioón se realizó correctamente.";
  messages = messages || [];

  isSuccess = isSuccess || false;
  isError = isError || false;

  handleSuccess = handleSuccess || handleClose;
  handleError = handleError || handleClose;

  return (
    <div>
      {isOpen && (
        <Dialog
          open={isOpen}
          disableBackdropClick
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <MuiDialogTitle disableTypography id="alert-dialog-title">
            <Typography variant="h6">
              <span>{title}</span>
            </Typography>
          </MuiDialogTitle>
          <DialogContent dividers>
            {isLoading && (
              <Typography variant="subtitle1">
                <CircularProgress size={18} color="secondary" />
                <span style={{ marginLeft: "15px" }}>{message}</span>
              </Typography>
            )}

            {!isLoading && (
              <div>
                  <Alert
                    style={{ marginBottom: 10, fontSize: 18 }}
                    severity={
                      isSuccess ? "success" : isError ? "error" : "info"
                    }
                  >
                    {message}
                  </Alert>

                  {messages !== null &&
                    messages !== undefined &&
                    messages.length > 0 &&
                    messages?.map((msg) => (
                      <Alert
                        style={{ fontSize: 14 }}
                        severity={
                          isSuccess ? "success" : isError ? "error" : "info"
                        }
                      >
                        {msg}
                      </Alert>
                    ))}

                <CustomButton
                  handleClick={
                    isSuccess
                      ? handleSuccess
                      : isError
                      ? handleError
                      : handleClose
                  }
                  text="Aceptar"
                  isFullWidth
                  style={{ marginTop: 10 }}
                />
              </div>
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}