import './App.css';
import {Building} from "./building";
import ElevatorComponent from "./ElevatorComponent";

function BuildingComponent() {
    const buttons = [];
    const mayGoToQueue = [1, 2];
    const numOfTotalFloors = 20;
    const numOfElevator = 3;
    for (let i = 0; i < numOfTotalFloors; i++) {
        buttons.push(i + 1);
    }

    const building = new Building(numOfElevator, 1, numOfTotalFloors);

    return (
        <div className="pt-20 h-screen border-solid border-2 border-sky-500 flex flex-col justify-center">
            <div className="h-2/6 mb-5 border-solid border-2 border-blue-500 flex flex-col justify-around">
                <div>
                    {buttons.map(floor => {
                        return <div key={floor}
                                    className="ml-8 inline-block"
                                    data-testid="building-btn">
                            {floor}
                            {floor !== 20 && <span>u</span>}
                            {floor !== 1 && <span>d</span>}
                        </div>;
                    })}
                </div>

                <div className="ml-8">
                    <p>mayGoTo: <strong>{mayGoToQueue.join(',')}</strong></p>
                </div>
            </div>

            <div className="h-4/6 flex justify-around">
                {building.elevators.map((elev, idx) =>
                    <ElevatorComponent key={idx}
                                       elevator={elev}/>)}
            </div>
        </div>
    );
}

export default BuildingComponent;
