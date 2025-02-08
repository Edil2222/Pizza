import '../src/styles/App.scss';
import {RouterProvider} from "react-router-dom";
import router from "./routing/routing";

function App() {
    return (
            <>
                <RouterProvider router={router}/>
            </>
    );
}

export default App;
