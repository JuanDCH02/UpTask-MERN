import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";
import ProfileLayout from "./layouts/ProfileLayout";
import DashboardView from "./views/DashboardView";
import NotFound from "./views/NotFound";
import AccountConfirmationDisabledView from "./views/auth/AccountConfirmationDisabledView";
import ForgotPasswordView from "./views/auth/ForgotPasswordView";
import LoginView from "./views/auth/LoginView";
import NewPasswordView from "./views/auth/NewPasswordView";
import RegisterView from "./views/auth/RegisterView";
import CreateProjectView from "./views/projects/CreateProjectView";
import EditProjectView from "./views/projects/EditProjectView";
import ProjectDetailView from "./views/projects/ProjectDetailView";
import ProjectTeamView from "./views/projects/ProjectTeamView";
import ChangePasswordView from "./views/profile/ChangePasswordView";
import ProfileView from "./views/profile/ProfileView";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<DashboardView />} index />
                    <Route path="/projects/create" element={<CreateProjectView />} />
                    <Route path="/projects/:projectId/" element={<ProjectDetailView />} />
                    <Route path="/projects/:projectId/edit" element={<EditProjectView />} />
                    <Route path="/projects/:projectId/team" element={<ProjectTeamView />} />

                    <Route element={<ProfileLayout />}>
                        <Route path="/profile" element={<ProfileView />} />
                        <Route path="/profile/password" element={<ChangePasswordView />} />
                    </Route>
                </Route>

                <Route element={<AuthLayout />}>
                    <Route path="/auth/login" element={<LoginView />} index />
                    <Route path="/auth/register" element={<RegisterView />} />
                    <Route path="/auth/confirm-account" element={<AccountConfirmationDisabledView />} />
                    <Route path="/auth/request-code" element={<AccountConfirmationDisabledView />} />
                    <Route path="/auth/forgot-password" element={<ForgotPasswordView />} />
                    <Route path="/auth/new-password" element={<NewPasswordView />} />
                </Route>

                <Route element={<AuthLayout />}>
                    <Route path="*" element={<NotFound />} index />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
