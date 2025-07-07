export const DeletePuntoVenta = async (activeDeleteUsers, userData) => {
    let ress;
    try {
        const response = await fetch(`/api/punto-venta/${activeDeleteUsers.id_pv}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                reqUser: userData
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    ress = { msg: data.message, active: true, typeError: 'submit' };
                } else {
                    ress = { msg: data.message, active: true, typeError: 'error' };
                }

            })
            .catch((err) => console.log('Error:', err));
    } catch (error) {
        ress = { msg: 'Error al eliminar este Punto de venta', active: true, typeError: 'error' };
        console.log(error)
    }
    return ress;
}