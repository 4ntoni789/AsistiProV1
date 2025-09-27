
type ButtonLoagind = {
  loading: boolean,
  activeTabIndex: boolean,
  tabInd: number,
  textBtn: string
}

function LoadingBtn({ loading, activeTabIndex, tabInd, textBtn }: ButtonLoagind) {
  return (
    <button className='btn_style' disabled={loading} type='submit' tabIndex={activeTabIndex ? tabInd : -1}>{loading ? 'Cargando...' : textBtn}</button>
  )
}

export default LoadingBtn
