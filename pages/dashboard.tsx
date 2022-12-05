import { ReactElement } from 'react';
import type { NextPageWithLayout } from './_app'
import LoggedIn from '../layouts/loggedIn';


const dashboard : NextPageWithLayout = () => {
    return (
        <div>
            On Dashboard
        </div>
    );
}

dashboard.getLayout = function getLayout(page: ReactElement) {
    return (
        <LoggedIn/>        
    )
}




export default dashboard;