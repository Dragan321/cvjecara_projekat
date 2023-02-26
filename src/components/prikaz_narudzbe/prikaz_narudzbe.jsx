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
import { Divider } from '@mui/material';


export default function Prikaz_narudzbe({ data, role, ucitajNarudzbe }) {
    function createData(vrjemeNarudzbe, status, ukupno, sadrzaj, redniBroj, imePrezime) {
        return {
            redniBroj,
            status,
            ukupno,
            vrjemeNarudzbe,
            sadrzaj,
            imePrezime,
        };
    }

    function Row(props) {
        const { row } = props;
        const [open, setOpen] = useState(false);

        return (
            <Fragment>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
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
                    <TableCell align="right">{row.status}</TableCell>
                    <TableCell align="right">{row.ukupno}</TableCell>
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
                                                <TableCell align="right">{sadrzajReda.cjena}</TableCell>

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

        }).isRequired,
    };

    const rows = [];

    data.forEach(kreirajRed)

    function kreirajRed(red, index) {
        var arraypom = []
        red.expand.sadrzajNarudzbe_id.forEach(izlistajSadrzajNarudzbe)

        function izlistajSadrzajNarudzbe(red) {
            if (red.cvijet_id != '') {
                arraypom.push(
                    {
                        cvijet: red.expand.cvijet_id.naziv,
                        kolicina: red.kolicina_cvjeta,
                        cjena: red.cijena,
                    }
                )
            }
            else if (red.buket_id != '') {
                var sadrzajBuketa = ''


                red.expand['buket_id'].expand['sadrzajBuketa_id'].forEach(myFunction)

                function myFunction(item, index, arr) {
                    sadrzajBuketa += ' ' + item.expand['id_cvijeta'].naziv + ' x' + item.kolicina + ''
                    if (arr.length > index + 1)
                        sadrzajBuketa += ', '
                }
                arraypom.push(
                    {
                        cvijet: red.expand.buket_id.naziv + ' ( ' + sadrzajBuketa + ' )',
                        kolicina: red.kolicina_cvjeta,
                        cjena: red.cijena,
                    }
                )

            }
        }
        var imePrezime = ''
        if (role == 'ADMIN')
            imePrezime = red.expand['user_id'].name + ' ' + red.expand.user_id.last_name
        rows.push(createData(red.created, red.order_status, red.ukupnaCjena, arraypom, index + 1, imePrezime))
    }
    const [orderDirection, setOrderDirection] = useState('asc')
    const [orderByValue, setOrderByValue] = useState('Status')

    function HandleSortRequest(property) {
        if (orderByValue == property && orderDirection == 'asc')
            setOrderDirection('desc')
        else {
            setOrderDirection('asc')
            setOrderByValue(property)
        }
        ucitajNarudzbe(orderByValue, orderDirection)

    }
    return (
        <Container sx={{ marginTop: '50px' }}>
            <TableContainer component={Paper}>
                <SearchBar style={{ margin: '15px', border: 'solid 3px #D3D3D3' }} placeholder='Unesite pojam za pretragu'
                    onChange={newValue => ucitajNarudzbe(orderByValue, orderDirection, newValue)} ></SearchBar>
                <Divider />
                <Table aria-label="collapsible table">
                    <TableHead sx={{ backgroundColor: '#D3D3D3' }}>

                        <TableRow>
                            <TableCell />
                            <TableCell>Redni broj</TableCell>
                            {role == 'ADMIN' ? (<TableCell>
                                <TableSortLabel active={orderByValue == 'name'} direction={orderByValue === 'name' ? orderDirection : 'asc'}
                                    onClick={() => { HandleSortRequest('name') }}

                                > Ime i prezime</TableSortLabel></TableCell>) : (<></>)}
                            <TableCell align="right">
                                <TableSortLabel active={orderByValue == 'Status'} direction={orderByValue === 'Status' ? orderDirection : 'asc'}
                                    onClick={() => { HandleSortRequest('Status') }}> Status
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
                            <Row key={row.redniBroj} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </Container>

    )

}