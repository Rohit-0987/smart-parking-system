import { BasePage } from "../common/BasePage";

function Dashboard() {
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col">
                    <h1>Dashboard</h1>
                </div>
            </div>
        </div>
    );
}

export function DashboardPage() {
    return (
        <BasePage>
            <Dashboard />
        </BasePage>
    );
}