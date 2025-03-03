import { AdminNavBar } from "./AdminNavBar";

export function AdminBasePage({ children }) {
    return (
        <>
            <AdminNavBar />
            {children}
        </>
    );
}