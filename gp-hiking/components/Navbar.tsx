export interface INavbar {
    navActive: boolean;
}

export const Navbar: React.FC<INavbar> = ({navActive}) => {
    // let isLoggedIn = true;
    return (
        <div>
            <span>
                Logo
            </span>



            {navActive === true? 
                (<span>
                    Username
                </span>)
                :(<></>) 

            }
            <button> Register/ Login</button>
        </div>
    );
}
