import React, { FC } from "react";
import { Container } from "react-bootstrap";

const StandardLayout: FC = ({ children }) => {
  return (
    <main>
      <Container>
        {children}
      </Container>
    </main>
  );
}

export default StandardLayout;
