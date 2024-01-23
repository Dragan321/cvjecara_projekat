import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import Prikaz_narudzbe from "../../components/prikaz_narudzbe/prikaz_narudzbe";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import TabList from '@mui/lab/TabList';
import ZahtejviZaAdmina from "../../components/zahtjeviZaAdmina/zahtjeviZaAdmina";
import { Container } from "@mui/material";
import GridViewIcon from '@mui/icons-material/GridView';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

export default function Dashboard({ pb, isLoggedIn }) {
    const [narudzbe, setNarudzbe] = useState([])

    async function ucitajNarudzbe(sort, order, searchTerm) {
        try {
            var sortIzraz = '';
            if (searchTerm == null) {
                searchTerm = '';
            }
            switch (sort) {
                case 'Vrjeme':
                    if (order == 'desc')
                        sortIzraz = '-created'
                    else
                        sortIzraz = '+created'

                    break;
                case 'email':
                    if (order == 'desc')
                        sortIzraz = '-email'
                    else
                        sortIzraz = '+email'

                    break;
                case 'cjena':
                    if (order == 'desc')
                        sortIzraz = '-ukupnaCjena'
                    else
                        sortIzraz = '+ukupnaCjena'
                    break;
                case 'Status':
                    if (order == 'desc')
                        sortIzraz = '-order_status'
                    else
                        sortIzraz = '+order_status'
                    break;
                case 'name':
                    if (order == 'desc')
                        sortIzraz = '-user_id.name,-user_id.last_name'
                    else
                        sortIzraz = '+user_id.name,+user_id.last_name'
                    break;
                default:
                    sortIzraz = ''
                    break;

            }

            const resultList = pb.authStore.model.role == 'ADMIN' ? await pb.collection('narudzbe').getList(1, 50, {
                sort: sortIzraz,
                filter: `user_id.name~"${searchTerm}" || user_id.last_name~"${searchTerm}" || user_id.email~"${searchTerm}" || order_status~"${searchTerm}" || created~"${searchTerm}" || sadrzajNarudzbe_id.cvijet_id.naziv?~"${searchTerm}" || sadrzajNarudzbe_id.buket_id.naziv?~"${searchTerm}" || sadrzajNarudzbe_id.buket_id.sadrzajBuketa_id.id_cvijeta.naziv?~"${searchTerm}"  `,
                expand: 'user_id,sadrzajNarudzbe_id.cvijet_id, sadrzajNarudzbe_id.buket_id.sadrzajBuketa_id.id_cvijeta',
                '$autoCancel': false
            }) :
                await pb.collection('narudzbe').getList(1, 50, {
                    sort: sortIzraz,
                    filter: `user_id="${pb.authStore.model.id}" && ( order_status~"${searchTerm}" || created~"${searchTerm}" || sadrzajNarudzbe_id.cvijet_id.naziv?~"${searchTerm}" || sadrzajNarudzbe_id.buket_id.naziv?~"${searchTerm}" || sadrzajNarudzbe_id.buket_id.sadrzajBuketa_id.id_cvijeta.naziv?~"${searchTerm}" )`,
                    expand: 'sadrzajNarudzbe_id.cvijet_id, sadrzajNarudzbe_id.buket_id.sadrzajBuketa_id.id_cvijeta',
                    '$autoCancel': false
                });
            setNarudzbe(resultList.items)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        ucitajNarudzbe();
    }, []);

    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (

        <Container>
            <TabContext value={value}>
                <Box>
                    <TabList onChange={handleChange} centered>
                        <Tab label="Pregled narudzbi" icon={<GridViewIcon sx={{ fontSize: '40px' }} />} iconPosition="start" value="1" sx={{ fontSize: '25px' }} />
                        {pb.authStore.model.role == "ADMIN" ? (
                            <Tab label="Zahtjevi za admina" icon={<PersonAddAlt1Icon sx={{ fontSize: '40px' }} />} iconPosition="start" value="2" sx={{ fontSize: '25px' }} />) : (<></>)
                        }
                    </TabList>
                </Box>
                <TabPanel value="1">
                    {isLoggedIn ?
                        (<Box>
                            <Prikaz_narudzbe pb={pb} data={narudzbe} role={pb.authStore.model.role} ucitajNarudzbe={ucitajNarudzbe} />
                        </Box>) :
                        (<></>)}
                </TabPanel>
                <TabPanel value="2">
                    <ZahtejviZaAdmina pb={pb} />

                </TabPanel>
            </TabContext>



        </Container >
    );

}