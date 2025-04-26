import {useContext} from "react";
import ContainerContext from "../context/ContainerContext.jsx";

export default function RightPanel({children}) {
    const {sidebarsActive} = useContext(ContainerContext);
    if (!sidebarsActive) {
        return (
            <div className="hidden">
                {children}
            </div>
        );
    }

    return (
        <div className="fixed top-0 right-0 z-[1000] h-screen w-1/4 bg-zinc-900/50 text-white flex flex-col items-center justify-start">
            {children}
        </div>
    );
}