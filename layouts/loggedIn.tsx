// export default function LoggedIn({}) {
//     return (
//         <>

import { Navbar } from "../components";
import { ReactElement } from "react";

//         </>

//     )


// }

export default function LoggedIn() {
    return (
        <>
            <Navbar navActive={true} isLoggedIn={false} userName={"Sam"} logOff={function (val: boolean): void {
                throw new Error("Function not implemented.");
            } }/>
            {/* <main>{children}</main> */}



            
            
        </>



    )


}


