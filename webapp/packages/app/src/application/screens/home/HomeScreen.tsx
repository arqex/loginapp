import withAuth, { type WithAuthProps } from "../auth/withAuth.hoc";

function HomeScreen({ authContext }: WithAuthProps<void>) {
  return (
    <div style={{ padding: 32 }}>
      <h1>Welcome, {authContext.user.email || "User"}!</h1>
      <p>
        This is your Home screen. You are logged in to the collaborative
        todo-list app.
      </p>
      <p>Account: {authContext.account?.name || "-"}</p>
      <p>Role: {authContext.role || "-"}</p>
    </div>
  );
}

const HomeWithAuth = withAuth(HomeScreen);
export default HomeWithAuth;
