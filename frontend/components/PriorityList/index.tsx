import React, { FC } from 'react';
import styled from 'styled-components';

const PriorityListWrapper = styled.div`
  height: 30vh;
  width: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  list-style: none;
  background-color: #383838;
  border: solid 1px #000;
`;

const CircleIcon = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50px;
`;

const RedCircleIcon = styled(CircleIcon)`
  background-color: #eb5959;
`;

const YellowCircleIcon = styled(CircleIcon)`
  background-color: #f8d150;
`;

const GreenCircleIcon = styled(CircleIcon)`
  background-color: #6cd86c;
`;

const ItemWrapper = styled.div`
  width: 320px;
  display: flex;
  justify-content: space-around;
  padding: 10px;
`;

const ItemCard = styled.div`
  height: 20px;
  width: 230px;
  background-color: #909090;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  padding: 20px;
`;

const ItemCardLabel = styled.li`
  color: white;
`;

const Title = styled.div`
  height: 20px;
  width: 285px;
  padding: 20px;
  border-radius: 20px;
  background-color: #909090;
  color: white;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PriorityList: FC = () => {
  return (
    <PriorityListWrapper>
      <Title>ORDEM DE PRIORIDADE</Title>
      <ItemWrapper>
        <GreenCircleIcon />
        <ItemCard>
          <ItemCardLabel>BAIXA</ItemCardLabel>
        </ItemCard>
      </ItemWrapper>

      <ItemWrapper>
        <YellowCircleIcon />
        <ItemCard>
          <ItemCardLabel>MÉDIA</ItemCardLabel>
        </ItemCard>
      </ItemWrapper>

      <ItemWrapper>
        <RedCircleIcon />
        <ItemCard>
          <ItemCardLabel>ALTA</ItemCardLabel>
        </ItemCard>
      </ItemWrapper>
    </PriorityListWrapper>
  );
}

export default PriorityList;