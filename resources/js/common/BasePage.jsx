import { Navbar } from "./Navbar";

export function BasePage({ children }) {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
}