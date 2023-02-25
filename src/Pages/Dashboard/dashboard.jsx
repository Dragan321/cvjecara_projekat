import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import Prikaz_narudzbe from "../../components/prikaz_narudzbe/prikaz_narudzbe";
export default function Dashboard({ pb, isLoggedIn }) {
    const [narudzbe, setNarudzbe] = useState([])

    async function ucitajNarudzbe(sort, order, searchTerm) {
        try {
            var sortIzraz = '';
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
                        sortIzraz = '-oreder_status'
                    else
                        sortIzraz = '+oreder_status'
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
                filter: `user_id.name~"${searchTerm}" || user_id.last_name~"${searchTerm}" || oreder_status~"${searchTerm}" || created~"${searchTerm}"`,
                expand: 'user_id,sadrzajNarudzbe(narudzbe_id), sadrzajNarudzbe(narudzbe_id).cvijet_id, sadrzajNarudzbe(narudzbe_id).buket_id,sadrzajNarudzbe(narudzbe_id).buket_id.sadrzajBuketa(id_buketa).id_cvijeta',
                '$autoCancel': false
            }) :
                await pb.collection('narudzbe').getList(1, 50, {
                    sort: sortIzraz,
                    filter: `user_id="${pb.authStore.model.id}"`,
                    expand: 'sadrzajNarudzbe(narudzbe_id), sadrzajNarudzbe(narudzbe_id).cvijet_id, sadrzajNarudzbe(narudzbe_id).buket_id,sadrzajNarudzbe(narudzbe_id).buket_id.sadrzajBuketa(id_buketa).id_cvijeta',
                    '$autoCancel': false
                });

            setNarudzbe(resultList.items)
            console.log(resultList.items)
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