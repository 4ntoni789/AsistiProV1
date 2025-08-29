import { AnimatePresence, motion } from 'framer-motion'
import ItemRol from '../items/ItemRol'
import { ActiveSubMenuDeleteUsers } from '@renderer/actions/actionsUsers'
import { AppDispatch } from '@renderer/store'
import { useDispatch } from 'react-redux'
import { ActiveSubMenuUpdateRole } from '@renderer/actions/actionsRoles'

function TablaDeRoles({ direccion, paginaActual, variants, currentItems, searchTerm, containerVariants, itemVariants }) {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className='App__dashboard__contPageOutlet__PageUsers__contRoles__table'>
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
                  <ItemRol key={i} item={item} edit={() => dispatch(ActiveSubMenuUpdateRole({ user: { item }, subMenuUpdateRole: true }))}
                    remove={() => dispatch(ActiveSubMenuDeleteUsers({
                      user: item,
                      activeDeleteUsers: true,
                      typeRemove: 'Rol'
                    }))} />
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
                  <ItemRol item={item} edit={() => dispatch(ActiveSubMenuUpdateRole({ user: { item }, subMenuUpdateRole: true }))}
                    remove={() => dispatch(ActiveSubMenuDeleteUsers({
                      user: item,
                      activeDeleteUsers: true,
                      typeRemove: 'Rol'
                    }))} />
                </motion.div>
              ))}
            </motion.div>
          )
        }
      </AnimatePresence>
    </div>
  )
}

export default TablaDeRoles
