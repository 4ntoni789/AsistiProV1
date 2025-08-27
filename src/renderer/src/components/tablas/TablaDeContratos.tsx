import { AnimatePresence, motion } from 'framer-motion';
import ItemContrato from '../items/ItemContrato';
import LoaderItems from '../LoaderItems';

function TablaDeContratos({ direccion, paginaActual, variants, currentItems, searchTerm, containerVariants, itemVariants }) {

  return (
    <div className='App__dashboard__contPageOutlet__PageUsers__contContratos__table'>
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
              className="App__dashboard__contPageOutlet__PageUsers__contContratos__table__contItem"
            >
              {
                currentItems?.map((item: any, i) => (
                  <ItemContrato key={i} item={item} />
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
              className="App__dashboard__contPageOutlet__PageUsers__contContratos__table__contItem"
            >
              {
                currentItems?.length === 0 ? <LoaderItems /> :
                  currentItems.map((item, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <ItemContrato item={item} />
                    </motion.div>
                  ))}
            </motion.div>
          )
        }
      </AnimatePresence>
    </div>
  )
}

export default TablaDeContratos
