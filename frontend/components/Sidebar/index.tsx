import React, { FC } from 'react';
import styled from 'styled-components';

import PriorityList from '../PriorityList';

const SidebarMainWrapper = styled.div`
  height: 100vh;
  width: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  list-style: none;
`;

const Navbar: FC = () => {
  return (
    <SidebarMainWrapper>
      <PriorityList />
    </SidebarMainWrapper>
  );
}

export default Navbar;