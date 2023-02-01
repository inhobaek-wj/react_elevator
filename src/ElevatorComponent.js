import './App.css';

function ElevatorComponent() {
    const i = 0;
    return (
        <div key={i}
             className="w-80 h-full border-solid border-2 border-red-500"
             data-testid="elevator">
            <p>elevator</p>
            <p>1</p>
            <div>
                <span>1</span>
                <span>2</span>
            </div>
        </div>);
}

export default ElevatorComponent;
