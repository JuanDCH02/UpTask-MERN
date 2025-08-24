import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import DashboardView from "./views/DashboardView";
import CreateProjectView from "./views/projects/CreateProjectView";
import EditProjectView from "./views/projects/EditProjectView";
import ProjectDetailView from "./views/projects/ProjectDetailView";
import AuthLayout from "./layouts/AuthLayout";
import LoginView from "./views/auth/LoginView";
import RegisterView from "./views/auth/RegisterView";
import ConfirmAccountView from "./views/auth/ConfirmAccountView";

export default function Router () {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={ <AppLayout/> }>
                    <Route path="/" element={ <DashboardView/> } index/>
                    <Route path="/projects/create" element={ <CreateProjectView/> } />
                    <Route path="/projects/:projectId/edit" element={ <EditProjectView/> } />
                    <Route path="/projects/:projectId/" element={ <ProjectDetailView/> } />
                </Route >

                <Route element={ <AuthLayout/> }>
                    <Route path="/auth/login" element={ <LoginView/> } index/>
                    <Route path="/auth/register" element={ <RegisterView/> } />
                    <Route path="/auth/confirm-account" element={ <ConfirmAccountView/> } />
                </Route >
            </Routes> 
        </BrowserRouter>
        
    )
}