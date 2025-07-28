import { AnimatePresence, motion } from "framer-motion"
import ItemUsuario from "../items/ItemUsuario"

function TablaDeUsuarios({ direccion, paginaActual, variants, currentItems, searchTerm, containerVariants, itemVariants }) {
  return (
    <div className='App__dashboard__contPageOutlet__PageUsers__contUsers__table'>
      <AnimatePresence mode='wait'>
        {
          (direccion === 'siguiente' || direccion === 'anterior') ? (
            <motion.div
              key={`pagina-${paginaActual}`}
              custom={direccion}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="App__dashboard__contPageOutlet__PageUsers__contRoles__table__contItem"
            >
              {
                currentItems?.map((item: any, i) => (
                  <ItemUsuario key={i} nombre_usuario={item.nombre_usuario}
                    id_usuario={item.id_usuario}
                    correo={item.correo}
                    role={item.type_role}
                    estado={item.estado}
                    item={item}
                  />
                ))
              }
            </motion.div>
          ) : (
            <motion.div
              key={`busqueda-${searchTerm}`}
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="App__dashboard__contPageOutlet__PageUsers__contRoles__table__contItem"
            >
              {currentItems.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <ItemUsuario nombre_usuario={item.nombre_usuario}
                    id_usuario={item.id_usuario}
                    correo={item.correo}
                    role={item.type_role}
                    estado={item.estado}
                    item={item}
                  />
                </motion.div>
              ))}
            </motion.div>
          )
        }
      </AnimatePresence>
    </div>
  )
}

export default TablaDeUsuarios
