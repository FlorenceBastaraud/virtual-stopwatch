
function App() {
  return (
    <div className="container">
     <div className="stopwatch">
        <div className="stopwatch-display">
          <span className="hours-style">00</span>:
          <span className="minutes-style">00</span>:
          <span className="seconds-style">00</span>
        </div>
        <div className="stopwatch-actions">
          <button>Démarrer / Réinitialiser</button>
          <button>Pause / Reprendre</button>
        </div>
     </div>
    </div>
  );
}

export default App;
