import React from "react";

import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import Moment from 'moment'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import UITable from '@material-ui/core/Table';

import {PaginationActions} from '../Common';

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

export default class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          page: this.initializePage(),
          isModalOpen: false,
          isSaving: false,          
          modalABM: "",
          modalIMP: "",
          messageModal: null,
          form: this.initializeForm(),   
          totalAmount: this.initializeTotalAmount()
        };
    }        
    initializeForm = () => {
        return this.props.form;
    };
    initializePage = ()=>{
        return this.props.page;
    }
    initializeTotalAmount = ()=>{
        return this.props.totalAmount;
    }
    handleChangePage = (event, newPage)=>{
        this.setState((prevState) => ({
            ...prevState,
            page: newPage,
            }));
       this.props.handleChangePageEvent(event, newPage);       
    }
    
    render() {
        var datosPaginados = this.props.datos?.slice(
            this.state.page * this.props.rowsPerPage,
            this.state.page * this.props.rowsPerPage + this.props.rowsPerPage
          );        
        var emptyRows =
        this.props.datos != null
            ? this.props.rowsPerPage -
              Math.min(
                this.props.rowsPerPage,
                this.props.datos.length - this.state.page * this.props.rowsPerPage
              )
            : this.props.rowsPerPage;
        return(
            <div>                      
                <TableContainer component={Paper} style={{ margin: "10px 0 0 0" }}>
                    <UITable  aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {this.props.columnas?.map((columna) => (
                                    <StyledTableCell align="center">{columna.nombre}</StyledTableCell>                    
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {datosPaginados?.map((dato) => (
                                <StyledTableRow key={dato["id"]}>
                                    {this.props.WhatToShow.map((property) => (                                    
                                        <StyledTableCell align="center" id={property.nombre}>                   
                                            {
                                                property.nombre =="periodo" ? Moment(dato[property.nombre],'YYYY-MM-DD').format('MMM YYYY') : dato? ""+dato[property.nombre] : "-"                                                
                                            }
                                        </StyledTableCell>                                    
                                    ))}
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
                                    count={this.state.totalAmount ?? 0}
                                    rowsPerPage={this.props.rowsPerPage}
                                    page={this.state.page}
                                    SelectProps={{
                                        inputProps: { "aria-label": "Filas por página" },
                                        native: true,
                                    }}
                                    onChangePage={this.handleChangePage}
                                    rowsPerPageOptions={[this.props.rowsPerPage]}
                                    ActionsComponent={PaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </UITable>
                </TableContainer>  
            </div>
        );
    }
}