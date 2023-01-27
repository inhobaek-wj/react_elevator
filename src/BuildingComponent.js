import './App.css';

function BuildingComponent() {
    const buttons = [];
    const numOfTotalFloors = 20;
    const numOfElevator = 3;
    for (let i = 0; i < numOfTotalFloors; i++) {
        buttons.push(i + 1);
    }

    const elevators = () => {
        const temp = [];
        for (let i = 0; i < numOfElevator; i++) {
            temp.push(
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
        return temp;
    }

    return (
        <div className="pt-20 h-screen border-solid border-2 border-sky-500 flex flex-col justify-center">
            <div className="h-2/6 mb-5 border-solid border-2 border-blue-500">
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
            <div className="h-4/6 flex justify-around">{elevators()}</div>
        </div>
    );
}

export default BuildingComponent;
