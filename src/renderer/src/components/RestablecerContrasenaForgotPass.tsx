import React from 'react'

function RestablecerContrasenaForgotPass({ register, disableInput }) {
  return (
    <>
      <input type="text" placeholder='Ingresa tu nueva contraseña' {...register('nueva_contrasena', { required: true, disabled: disableInput })} />
      <input type="text" placeholder='Verifica tu nueva contraseña' {...register('nueva_contrasena_confirmada', { required: true, disabled: disableInput })} />
    </>
  )
}

export default RestablecerContrasenaForgotPass
