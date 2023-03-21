import { useState, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Typography } from "@mui/material";

export default function ZahtejviZaAdminaRed({ row, pb, izlistajZahtjeve }) {

    async function prihvatiZahtjev() {
        try {
            const data = {
                "verified_admin": true
            }

            const record = await pb.collection('users').update(row.id, data)
            izlistajZahtjeve()
        } catch (error) {
            console.log(error)
        }
    }
    async function odbijZahtjev() {
        try {
            await pb.collection('users').delete(row.id);
            izlistajZahtjeve()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <TableRow
            key={row.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row"> {row.ime} </TableCell>
            <TableCell align="right"> {row.prezime} </TableCell>
            <TableCell align="right"> {row.email} </TableCell>
            <TableCell align="right"><Button onClick={prihvatiZahtjev}> <CheckIcon sx={{ color: 'green' }} /> </Button> </TableCell>
            <TableCell align="right"><Button onClick={odbijZahtjev}> <CloseIcon sx={{ color: 'red' }} /> </Button> </TableCell>
        </TableRow>
    );


}