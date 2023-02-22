import './App.css';
import Building from "./building";
import ElevatorComponent from "./ElevatorComponent";
import {useState} from "react";

function BuildingComponent() {
    const buttons = [];
    const numOfTotalFloors = 20;
    const numOfElevator = 3;
    for (let i = 0; i < numOfTotalFloors; i++) {
        buttons.push(i + 1);
    }

    const building = new Building(numOfElevator, 1, numOfTotalFloors);

    const [mayGoUpQueue, setMayGoUpQueue] = useState(building.upPressedFloor());
    const [mayGoDownQueue, setMayGoDownQueue] = useState(building.downPressedFloor());

    return (
        <div className="pt-20 h-screen border-solid border-2 border-sky-500 flex flex-col justify-center">
            <div className="h-2/6 mb-5 border-solid border-2 border-blue-500 flex flex-col justify-around">
                <div>
                    {buttons.map(floor => {
                        return <div key={floor}
                                    className="ml-8 inline-block"
                                    data-testid="building-btn">
                            {floor}
                            {floor !== 20 && <span
                                data-testid={`${floor}-u-btn`}
                                onClick={() => {
                                    building.pressUp(floor);
                                    setMayGoUpQueue(building.upPressedFloor());
                                }}
                            >u</span>}
                            {floor !== 1 && <span
                                data-testid={`${floor}-d-btn`}
                                onClick={() => {
                                    building.pressDown(floor);
                                    setMayGoDownQueue(building.downPressedFloor());
                                }}
                            >d</span>}
                        </div>;
                    })}
                </div>

                <div className="ml-8">
                    <p>mayGoUp: <strong>{mayGoUpQueue.join(',')}</strong></p>
                    <p>mayGoDown: <strong>{mayGoDownQueue.join(',')}</strong></p>
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
