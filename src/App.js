import './App.css';

function App() {
    return (
        <div className="pt-20 h-screen border-solid border-2 border-sky-500 flex flex-col justify-center">
            <div className="h-2/6 mb-5 border-solid border-2 border-blue-500">
                <div>1 <span>u</span></div>
                <div>2 <span>u</span><span>d</span></div>
            </div>

            <div className="w-80 h-4/6 border-solid border-2 border-red-500">
                <p>elevator</p>
                <p>1</p>
                <div>
                    <span>1</span>
                    <span>2</span>
                </div>
            </div>
        </div>
    );
}

export default App;
