import { ActiveSubMenuUpdateEmpleador } from "@renderer/actions/actionsEmpleadores"
import ItemEmpleador from "../items/ItemEmpleador"
import { ActiveSubMenuDeleteUsers } from "@renderer/actions/actionsUsers"
import { AnimatePresence, motion } from "framer-motion"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@renderer/store"
import LoaderItems from "../LoaderItems"

function TablaDeEmpleadores({ direccion, paginaActual, variants, currentItems, searchTerm, containerVariants, itemVariants }) {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className='App__dashboard__contPageOutlet__PageUsers__contEmpleadores__table'>
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

                  <ItemEmpleador item={item} remove={() => dispatch(ActiveSubMenuDeleteUsers({
                    user: item,
                    activeDeleteUsers: true,
                    typeRemove: 'Empleador'
                  }))}

                    edit={() => dispatch(ActiveSubMenuUpdateEmpleador({ user: { item }, subMenuUpdateEmpleador: true }))} />
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
              {currentItems?.length == undefined ? null : currentItems?.length === 0 ? <LoaderItems /> : currentItems.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <ItemEmpleador item={item} remove={() => dispatch(ActiveSubMenuDeleteUsers({
                    user: item,
                    activeDeleteUsers: true,
                    typeRemove: 'Empleador'
                  }))}

                    edit={() => dispatch(ActiveSubMenuUpdateEmpleador({ user: { item }, subMenuUpdateEmpleador: true }))} />
                </motion.div>
              ))}
            </motion.div>
          )
        }
      </AnimatePresence>
    </div>
  )
}

export default TablaDeEmpleadores
