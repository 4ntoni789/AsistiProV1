import { AppDispatch } from '@renderer/store';
import { AnimatePresence, motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import ItemTablePuntoVenta from '../items/ItemTablePuntoVenta';

function TablaDePuntoVenta({ direccion, paginaActual, variants, currentItems, searchTerm, containerVariants, itemVariants }) {
  const dispatch = useDispatch<AppDispatch>()

  return (
    <div className='App__dashboard__contPageOutlet__PageUsers__contPuntoVenta__table'>
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
              className="App__dashboard__contPageOutlet__PageUsers__contPuntoVenta__table__contItem"
            >
              {
                currentItems?.map((item: any, i) => (

                  <ItemTablePuntoVenta key={i} item={item} />
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
              className="App__dashboard__contPageOutlet__PageUsers__contPuntoVenta__table__contItem"
            >
              {currentItems.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <ItemTablePuntoVenta item={item} />
                </motion.div>
              ))}
            </motion.div>
          )
        }
      </AnimatePresence>
    </div>
  );
}

export default TablaDePuntoVenta;