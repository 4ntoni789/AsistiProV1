import '../css/candado.css'; // Importamos los estilos SCSS

type CandadoType = {
  isUnlocked: boolean;
}
export const Candado = ({ isUnlocked }: CandadoType) => {
  // Estado para saber si el candado está bloqueado
  return (
    <div className="lock-container">
      <div className={`lock ${isUnlocked ? 'unlockAnimated' : 'lockAnimated'}`}></div>
    </div>
  );
};