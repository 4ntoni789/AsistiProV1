import { AnimatePresence, motion } from "framer-motion"
import ItemCargo from "../items/ItemCargo"
import { ActiveSubMenuDeleteUsers } from "@renderer/actions/actionsUsers"
import { ActiveSubMenuUpdateCargo } from "@renderer/actions/actionsCargos"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@renderer/store"
import LoaderItems from "../LoaderItems"

function TablaDeCargos({ direccion, paginaActual, variants, currentItems, searchTerm, containerVariants, itemVariants }) {
  const dispatch = useDispatch<AppDispatch>()

  return (
    <div className='App__dashboard__contPageOutlet__PageUsers__contCargos__table'>
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

                  <ItemCargo key={i} item={item} edit={() => dispatch(ActiveSubMenuUpdateCargo({ user: { item }, subMenuUpdateCargo: true }))}
                    remove={() => dispatch(ActiveSubMenuDeleteUsers({
                      user: item,
                      activeDeleteUsers: true,
                      typeRemove: 'Cargo'
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
              {currentItems == undefined ? null : currentItems?.length === 0 ? <LoaderItems /> : currentItems.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <ItemCargo item={item} edit={() => dispatch(ActiveSubMenuUpdateCargo({ user: { item }, subMenuUpdateCargo: true }))}
                    remove={() => dispatch(ActiveSubMenuDeleteUsers({
                      user: item,
                      activeDeleteUsers: true,
                      typeRemove: 'Cargo'
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

export default TablaDeCargos
