export const DeleteEmpleadoAs = async (activeDeleteUsers, userData) => {
    let ress;
    try {
        const response = await fetch(`/api/empleado/${activeDeleteUsers.user.id_empleado}`, {
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
                    ress = { msg: data.message, active: true, typeError: data.typeError };
                } else {
                    ress = { msg: data.message, active: true };
                }

            })
            .catch((err) => console.log('Error:', err));
    } catch (error) {
        ress = { msg: 'Error al eliminar ese empleado', active: true, typeError: 'error' };
        // dispatch(ActiveErrorSpam({ msg: 'Error al eliminar este usuario', active: true, typeError: 'error' }));
        console.log(error)
    }
    return ress;
}