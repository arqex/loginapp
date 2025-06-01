import React from "react";
import ScreenWrapper from "../../components/ScreenLayout/ScreenLayout";
import { Heading } from "@chakra-ui/react";
import ContentCard from "../../components/ContentLayout/ContentCard";
import ContentLayout from "../../components/ContentLayout/ContentLayout";

interface Sample2ScreenProps {}
interface Sample2ScreenState {}

export default class Sample2Screen extends React.Component<
  Sample2ScreenProps,
  Sample2ScreenState
> {
  state: Sample2ScreenState = {};
  render() {
    return (
      <ScreenWrapper>
        <ContentLayout
          titleBar={<Heading>Sample 2</Heading>}
          sideBar={<ContentCard>This is the sidebar</ContentCard>}
        >
          <ContentCard>This is the content</ContentCard>
        </ContentLayout>
      </ScreenWrapper>
    );
  }
}
