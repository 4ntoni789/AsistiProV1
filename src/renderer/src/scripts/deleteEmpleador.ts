export const DeleteEmpleador = async (activeDeleteUsers, userData) => {
    let ress;
    try {
        const response = await fetch(`/api/empleador/${activeDeleteUsers.id_empleador}`, {
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
        ress = { msg: 'Error al eliminar este empleador', active: true, typeError: 'error' };
        console.log(error)
    }
    return ress;
}