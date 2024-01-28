import React from "react";
import ScreenWrapper from "../../components/ScreenLayout/ScreenLayout";
import ContentLayout from "../../components/ContentLayout/ContentLayout";
import { Heading } from "@chakra-ui/react";
import ContentCard from "../../components/ContentLayout/ContentCard";

interface Sample1ScreenProps {}
interface Sample1ScreenState {}

export default class Sample1Screen extends React.Component<
  Sample1ScreenProps,
  Sample1ScreenState
> {
  state: Sample1ScreenState = {};
  render() {
    return (
      <ScreenWrapper>
        <ContentLayout titleBar={<Heading>Sample 1</Heading>}>
          <ContentCard>This is the content</ContentCard>
        </ContentLayout>
      </ScreenWrapper>
    );
  }
}
