import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import Prikaz_narudzbe from "../../components/prikaz_narudzbe/prikaz_narudzbe";
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
                    break;
                default:
                    sortIzraz = ''
            }

            const resultList = pb.authStore.model.role == 'ADMIN' ? await pb.collection('narudzbe').getList(1, 50, {
                sort: sortIzraz,
                filter: `user_id.name~"${searchTerm}" || user_id.last_name~"${searchTerm}" || order_status~"${searchTerm}" || created~"${searchTerm}" || sadrzajNarudzbe_id.cvijet_id.naziv?~"${searchTerm}" || sadrzajNarudzbe_id.buket_id.naziv?~"${searchTerm}" || sadrzajNarudzbe_id.buket_id.sadrzajBuketa_id.id_cvijeta.naziv?~"${searchTerm}"  `,
                expand: 'user_id,sadrzajNarudzbe_id.cvijet_id, sadrzajNarudzbe_id.buket_id.sadrzajBuketa_id.id_cvijeta',
                '$autoCancel': false
            }) :
                await pb.collection('narudzbe').getList(1, 50, {
                    sort: sortIzraz,
                    filter: `user_id="${pb.authStore.model.id}" &&(order_status~"${searchTerm}" || created~"${searchTerm}" || sadrzajNarudzbe_id.cvijet_id.naziv?~"${searchTerm}" || sadrzajNarudzbe_id.buket_id.naziv?~"${searchTerm}" || sadrzajNarudzbe_id.buket_id.sadrzajBuketa_id.id_cvijeta.naziv?~"${searchTerm}")`,
                    expand: 'sadrzajNarudzbe_id, sadrzajNarudzbe_id.cvijet_id, sadrzajNarudzbe_id.buket_id,sadrzajNarudzbe_id.buket_id.id_cvijeta',
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



    return (

        <Box>

            {isLoggedIn ?
                (<Box>
                    <Prikaz_narudzbe data={narudzbe} role={pb.authStore.model.role} ucitajNarudzbe={ucitajNarudzbe} />
                </Box>) :
                (<></>)}

        </Box >
    );

}