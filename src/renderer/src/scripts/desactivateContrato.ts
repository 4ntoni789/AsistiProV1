export const DesactivateContrato = async (activeDeleteUsers, userData) => {
  let ress;
  try {
    const response = await fetch(`/api/contrato/${activeDeleteUsers.user.id_contrato}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        estado: 'Inactivo',
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
    ress = { msg: 'Error no se puedo desactivar este contrato', active: true, typeError: 'error' };
    console.log(error)
  }
  return ress;
}