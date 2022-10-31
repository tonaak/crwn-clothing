import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const ProductDetailContainer = styled.div`
  width: 70%;
  height: 30rem;
  margin: auto;
  display: flex;
  align-items: center;

  @media screen and (max-width: 800px) {
    width: 80%;
    height: unset;
    flex-direction: column;
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  margin: 20px;
  object-fit: cover;
`;

export const DetailsContainer = styled.div`
  height: 100%;
  width: 100%;
  margin: 20px 50px;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: space-between;

  @media screen and (max-width: 800px) {
    margin: 40px 0 80px;
    height: 25rem;
  }
`;

export const Category = styled(Link)`
  text-transform: uppercase;
  color: #3f3d3d;
`;

export const Title = styled.div`
  font-size: 45px;
  font-weight: 700;
  line-height: 1.1;
`;

export const Description = styled.p`
  opacity: 0.8;
  line-height: 1.6;
`;

export const Price = styled.span`
  font-size: 30px;
  font-weight: 700;
`;

export const Quantity = styled.div`
  background: #ddd;
  width: 40%;
  height: 40px;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const QuantityButton = styled.span`
  font-weight: 700;
  width: 35%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #ccc;
    cursor: pointer;
    user-select: none;
  }
`;

export const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
