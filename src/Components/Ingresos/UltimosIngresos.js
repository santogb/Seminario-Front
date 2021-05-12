import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { Container } from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import { PaginationActions } from '../Common';
import { formatDateWithTimeToStringPretty, formatTimeToString } from "../Common/DateHelpers";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#055A8B",
    color: "#FFFFFF",
    fontWeight: "bold"
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function UltimosIngresos(props) {

  const [page, setPage] = React.useState(0);

  const handleChangePage = (event, newPage) => setPage(newPage);

  var rowsPerPage = 5;
  var emptyRows =
    props?.ingresos != null
      ? rowsPerPage -
        Math.min(rowsPerPage, props.ingresos.length - page * rowsPerPage)
      : rowsPerPage;

  var ingresosPaginado = props?.ingresos?.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper style={{ display: "flex", flexDirection: "column", spacing: 2 }}>
      <Typography
        component="h2"
        variant="h6"
        color="primary"
        gutterBottom
        style={{
          padding: "10px 0 10px 0",
          margin: 0,
          backgroundColor: "#055A8B",
          color: "#FFFFFF",
        }}
      >
        Últimos Ingresos
      </Typography>

      <Container style={{ padding: 20 }}>
      <TableContainer component={Paper} style={{ margin: '10px 0 0 0' }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Fecha</StyledTableCell>
                <StyledTableCell align="center">Hora</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ingresosPaginado?.map((ingreso) => (
                <StyledTableRow key={ingreso.id}>
                  <StyledTableCell align="center">{formatDateWithTimeToStringPretty(ingreso?.createdAt) ?? "-"}</StyledTableCell>
                  <StyledTableCell align="center">{formatTimeToString(ingreso?.createdAt) ?? "-"}</StyledTableCell>
                </StyledTableRow>
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={5} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={6}
                  count={props?.ingresos?.length ?? 0}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { "aria-label": "Filas por página" },
                    native: true,
                  }}
                  onChangePage={handleChangePage}
                  rowsPerPageOptions={[rowsPerPage]}
                  ActionsComponent={PaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Container>
    </Paper>
  );
}
