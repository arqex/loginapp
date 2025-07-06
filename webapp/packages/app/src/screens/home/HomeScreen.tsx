import React from "react";
import { Heading, VStack, Box } from "@loginapp/ui";
import withAuth, {
  type WithAuthProps,
} from "../../application/auth/withAuth.hoc";
import { setAuthenticatedId } from "../../application/auth/auth.context";
import { getRouter } from "../../application/routing/router";

import { AuthLayout, ContentLayout } from "../../components/layouts";
import Sidebar from "../../components/Sidebar/Sidebar";

// Import widgets
import AccountHomeWidget from "./widgets/AccountHomeWidget";
import TodosHomeWidget from "./widgets/TodosHomeWidget";

type HomeScreenProps = WithAuthProps<void>;

class HomeScreen extends React.Component<HomeScreenProps> {
  handleLogout = () => {
    setAuthenticatedId("");
    getRouter().push("/login");
  };

  render() {
    const { authContext } = this.props;

    return (
      <AuthLayout appMenu={<Sidebar />}>
        <ContentLayout titleBar={this.renderTitleBar()}>
          <Box minH="100vh" bg="gray.50" p="6">
            <VStack maxW="1200px" mx="auto" gap="6" alignItems="stretch">
              {/* Widgets Grid - Two Column Layout */}
              <Box
                display="grid"
                gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }}
                gap="6"
              >
                <AccountHomeWidget authContext={authContext} />
                <TodosHomeWidget authContext={authContext} />
              </Box>
            </VStack>
          </Box>
        </ContentLayout>
      </AuthLayout>
    );
  }

  renderTitleBar() {
    const userName = this.props.authContext.user.name;
    return (
      <Heading size="md" lineHeight="1em">
        Welcome {userName}!
      </Heading>
    );
  }
}

const HomeScreenWithAuth = withAuth(HomeScreen);
export default HomeScreenWithAuth;
