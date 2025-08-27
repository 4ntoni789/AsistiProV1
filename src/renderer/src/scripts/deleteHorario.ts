const apiUrl = import.meta.env.VITE_API_URL;

export const DeleteHorario = async (activeDeleteUsers, userData) => {
    let ress;
    try {
        const response = await fetch(`${apiUrl}/api/horario/${activeDeleteUsers.id_horario}`, {
            method: 'DELETE',
            headers: {
                'x-id-usuario': userData.id_usuario,
                'Content-Type': 'application/json'
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