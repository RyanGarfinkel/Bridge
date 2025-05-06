import { Button } from "./ui/button"

const Navbar = () => {

    return (
        <div className="flex flex-row justify-end py-5 px-7 gap-5 w-full">
            <Button variant="link" className="text-lg" onClick={() => window.location.href = '/dashboard'}>
                Dashboard
            </Button>
            <Button variant="link" className="text-lg" onClick={() => window.location.href = '/profile'}>
                Profile
            </Button>
            <Button variant="link" className="text-lg" onClick={() => window.location.href = '/auth/logout'}>
                Logout
            </Button>
        </div>
    );
};

export default Navbar;
