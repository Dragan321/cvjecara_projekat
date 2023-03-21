import { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Container } from '@mui/system';
import TableSortLabel from '@mui/material/TableSortLabel';
import SearchBar from "@mkyy/mui-search-bar";
import { Button, Divider } from '@mui/material';


export default function Prikaz_narudzbe({ pb, data, role, ucitajNarudzbe }) {
    function createData(vrjemeNarudzbe, status, ukupno, sadrzaj, redniBroj, imePrezime, boja, id_reda, email) {
        return {
            redniBroj,
            status,
            ukupno,
            vrjemeNarudzbe,
            sadrzaj,
            imePrezime,
            boja,
            id_reda,
            email

        };
    }

    function Row(props) {
        const { row } = props;
        const [open, setOpen] = useState(false);
        const [back, setBack] = useState(props.backColor)
        const id_reda = props.id_reda
        async function potvrdiNarudzbu() {
            const data = {
                "order_status": "preuzeta",
            };
            try {
                const record = await pb.collection('narudzbe').update(id_reda, data);
                setBack('green')
                row.status = 'preuzeta'
            }
            catch (err) {
                console.log(err)
                window.alert("Greska pri potvrdi narudzbe");
            }
        }

        return (
            <Fragment>
                <TableRow sx={{ '& > *': { borderBottom: 'unset', backgroundColor: back } }}>
                    <TableCell>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {row.redniBroj}
                    </TableCell>
                    {role == 'ADMIN' ? (<TableCell component="th" scope="row">
                        {row.imePrezime}
                    </TableCell>) : (<></>)}
                    {role == 'ADMIN' ? (<TableCell component="th" scope="row">
                        {row.email}
                    </TableCell>) : (<></>)}
                    <TableCell align="right">{
                        role == 'ADMIN' ?
                            (back == 'white' ? <Typography>cekanje na preuzimanje<Button variant='contained' onClick={potvrdiNarudzbu}>Potvrdi narudzbu</Button></Typography> : row.status) :
                            row.status
                    }</TableCell>
                    <TableCell align="right">{Math.round(row.ukupno * 100) / 100}</TableCell>
                    <TableCell align="right">{row.vrjemeNarudzbe}</TableCell>

                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Sadrzaj
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Naziv</TableCell>
                                            <TableCell>Kolicina</TableCell>
                                            <TableCell align="right">Cijena (KM)</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {row.sadrzaj.map((sadrzajReda) => (
                                            <TableRow key={sadrzajReda.cvijet + sadrzajReda.kolicina + sadrzajReda.cijena}>
                                                <TableCell component="th" scope="row">{sadrzajReda.cvijet}</TableCell>
                                                <TableCell >{sadrzajReda.kolicina}</TableCell>
                                                <TableCell align="right">{Math.round(sadrzajReda.cjena * 100) / 100}</TableCell>

                                            </TableRow>))}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </Fragment>
        );
    }
    Row.propTypes = {
        row: PropTypes.shape({
            redniBroj: PropTypes.number.isRequired,
            status: PropTypes.string.isRequired,
            ukupno: PropTypes.number.isRequired,
            vrjemeNarudzbe: PropTypes.string.isRequired,

            sadrzaj: PropTypes.arrayOf(
                PropTypes.shape({
                    cvijet: PropTypes.string.isRequired,
                    kolicina: PropTypes.number.isRequired,
                    cjena: PropTypes.number.isRequired,

                }),

            ).isRequired,
            imePrezime: PropTypes.string.isRequired,
            boja: PropTypes.string.isRequired,
            id_reda: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired

        }).isRequired,
    };

    const rows = [];

    async function updateStatusNarudzbe(id_reda) {
        const data = {
            "order_status": "istekla",
        };

        const record = await pb.collection('narudzbe').update(id_reda, data);

    }

    data.forEach(kreirajRed)

    function kreirajRed(red, index) {
        var sadrzajNarudzbe = []
        red.expand.sadrzajNarudzbe_id.forEach(izlistajSadrzajNarudzbe)
        console.log(red)
        function izlistajSadrzajNarudzbe(red) {
            if (red.cvijet_id != '') {
                sadrzajNarudzbe.push(
                    {
                        cvijet: red.expand.cvijet_id.naziv,
                        kolicina: red.kolicina_cvjeta,
                        cjena: red.cijena,
                    }
                )
            }
            else if (red.buket_id != '') {
                var sadrzajBuketa = ''

                console.log(red)
                red.expand['buket_id'].expand['sadrzajBuketa_id'].forEach(myFunction)

                function myFunction(item, index, arr) {
                    sadrzajBuketa += ' ' + item.expand['id_cvijeta'].naziv + ' x' + item.kolicina + ''
                    if (arr.length > index + 1)
                        sadrzajBuketa += ', '
                }
                sadrzajNarudzbe.push(
                    {
                        cvijet: red.expand.buket_id.naziv + ' ( ' + sadrzajBuketa + ' )',
                        kolicina: red.kolicina_cvjeta,
                        cjena: red.cijena,
                    }
                )

            }
        }
        var imePrezime = ''
        var boja = 'green'
        if (role == 'ADMIN')
            imePrezime = red.expand['user_id'].name + ' ' + red.expand.user_id.last_name
        if (red.order_status == "cekanje na preuzimanje") {
            let hours = Math.abs(new Date() - new Date(red.created)) / 36e5
            if (hours > 24) {
                red.order_status = 'istekla'
                updateStatusNarudzbe(red.id);
            }
            boja = 'white'
        }
        else if (red.order_status == "istekla") boja = 'red'
        rows.push(createData(new Date(red.created).toLocaleString("en-GB"), red.order_status, red.ukupnaCjena, sadrzajNarudzbe, index + 1, imePrezime, boja, red.id, typeof red.expand['user_id'] !== 'undefined' ? red.expand['user_id'].email : ""))
    }
    const [orderDirection, setOrderDirection] = useState('asc')
    const [orderByValue, setOrderByValue] = useState('Status')

    function HandleSortRequest(field) {
        let direction = 'asc'
        if (orderByValue == field && orderDirection == 'asc') {
            setOrderDirection('desc')
            direction = 'desc'
        }
        else {
            setOrderDirection('asc')
            setOrderByValue(field)
        }
        ucitajNarudzbe(field, direction)

    }
    return (
        <Box>
            <TableContainer component={Paper}>
                <SearchBar style={{ margin: '15px', border: 'solid 3px #2979ff' }} placeholder='Unesite pojam za pretragu'
                    onChange={newValue => ucitajNarudzbe(orderByValue, orderDirection, newValue)} onCancelResearch={() => ucitajNarudzbe(orderByValue, orderDirection, '')} ></SearchBar>
                <Divider />
                {rows.length > 0 ?
                    (
                        <Table aria-label="collapsible table">
                            <TableHead sx={{ backgroundColor: '#2979ff' }}>
                                <TableRow>
                                    <TableCell />
                                    <TableCell>Redni broj</TableCell>
                                    {role == 'ADMIN' ? (<TableCell>
                                        <TableSortLabel active={orderByValue == 'name'} direction={orderByValue === 'name' ? orderDirection : 'asc'}
                                            onClick={() => { HandleSortRequest('name') }}> Ime i prezime
                                        </TableSortLabel></TableCell>) : (<></>)}
                                    {role == 'ADMIN' ? (<TableCell>
                                        <TableSortLabel active={orderByValue == 'email'} direction={orderByValue === 'email' ? orderDirection : 'asc'}
                                            onClick={() => { HandleSortRequest('email') }}> Email
                                        </TableSortLabel></TableCell>) : (<></>)}
                                    <TableCell align="right">
                                        <TableSortLabel active={orderByValue == 'Status'} direction={orderByValue === 'Status' ? orderDirection : 'asc'}
                                            onClick={() => { HandleSortRequest('Status') }}> Status narudzbe
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell align="right">
                                        <TableSortLabel active={orderByValue == 'cjena'} direction={orderByValue === 'cjena' ? orderDirection : 'asc'}
                                            onClick={() => { HandleSortRequest('cjena') }}> Ukupna cjena (KM)
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell align="right">
                                        <TableSortLabel active={orderByValue == 'Vrjeme'} direction={orderByValue === 'Vrjeme' ? orderDirection : 'asc'}
                                            onClick={() => { HandleSortRequest('Vrjeme') }}> Vrjeme narudzbe
                                        </TableSortLabel>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <Row key={row.redniBroj} row={row} backColor={row.boja} id_reda={row.id_reda} />
                                ))}
                            </TableBody>
                        </Table>
                    ) : (<Typography sx={{
                        display: "flex", justifyContent: "center", color: 'red', fontSize: '75px', height: '50vh', alignItems: 'center', textAlign: 'center'
                    }}>Nema pronadjenih rezultata</Typography>)}
            </TableContainer>
        </Box>
    )

}