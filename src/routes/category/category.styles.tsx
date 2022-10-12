import styled from 'styled-components';

export const CategoryBodyContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 800px) {
    align-items: center;
  }
`;

export const CategoryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
  row-gap: 50px;

  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr 1fr;
    gap: 15px;
  }
`;

export const Title = styled.h2`
  font-size: 38px;
  text-align: center;

  @media screen and (max-width: 800px) {
    font-size: 28px;
  }
`;
