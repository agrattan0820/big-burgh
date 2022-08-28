import styled from "styled-components/native";
import { ResourceItem } from "./Data";

const Container = styled.View`
  width: 100%;
`;

const ResourceTitleContainer = styled.View`
  background-color: ${(props) => props.theme.lightBlue};
  box-shadow: ${(props) => props.theme.blueShadow};
  border-radius: 10px;
  padding: 8px;
`;

const ResourceTitle = styled.Text`
  font-family: ${(props) => props.theme.fontBold};
  font-size: 24px;
`;

const ResourcePage = ({ resource }: { resource: ResourceItem }) => {
  return (
    <Container>
      <ResourceTitleContainer>
        <ResourceTitle>{resource.name}</ResourceTitle>
      </ResourceTitleContainer>
    </Container>
  );
};

export default ResourcePage;
