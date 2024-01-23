import { useState, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ZahtejviZaAdminaRed from "./zahtjeviZaAdminaRed";
import { Box, Typography } from "@mui/material";

export default function ZahtejviZaAdmina({ pb }) {
    const rowsPom = []
    const [rows, setRows] = useState([]);
    async function izlistajZahtjeve() {
        try {
            const records = await pb.collection('users').getList(1, 50, {
                sort: '-created',
                filter: 'role="ADMIN" && verified_admin=false',
                '$autoCancel': false
            });
            console.log(records)
            rowsPom.splice(0, rows.length)
            records.items.forEach(myFunction)

            function myFunction(item) {
                rowsPom.push(createData(item.name, item.last_name, item.email, item.id))
            }
            setRows(rowsPom)
            rowsPom.splice(0, rows.length)

        } catch (error) {
            console.log(error);
            window.alert('Greska pri pribavljanju zahtjeva')
        }

    }

    function createData(ime, prezime, email, id) {
        return { ime, prezime, email, id };
    }


    useEffect(() => {
        izlistajZahtjeve();
    }, []);

    return (
        <Box>
            {rows.length > 0 ?
                (<TableContainer component={Paper}><Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{ background: '#2979ff' }}>
                        <TableRow>
                            <TableCell>Ime</TableCell>
                            <TableCell align="right">Prezime</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Prihvati zahtjev</TableCell>
                            <TableCell align="right">Odbij zahtjev</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <ZahtejviZaAdminaRed row={row} pb={pb} izlistajZahtjeve={izlistajZahtjeve} />
                        ))}
                    </TableBody>
                </Table></TableContainer>) : (<Typography sx={{
                    display: "flex", justifyContent: "center", color: 'red', fontSize: '100px', height: '25vh', alignItems: 'center', textAlign: 'center'
                }}>Nema aktivnih zahtjeva</Typography>)
            }
        </Box>
    );


}