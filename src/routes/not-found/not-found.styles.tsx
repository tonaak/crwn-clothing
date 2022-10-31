import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  background-image: url('https://res.cloudinary.com/ddhcdehae/image/upload/v1667236610/my%20image/cropped-1300-600-691241_dneq3h.jpg');
  background-size: cover;
  margin: 0 -40px -20px;

  @media screen and (max-width: 800px) {
    background-image: url('https://res.cloudinary.com/ddhcdehae/image/upload/v1667238586/my%20image/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f5571524c4369366e5043694e51773d3d2d3235363631343434352e313434653137353434366232343234342e6a7067_lzjyxp.jpg');
    margin: -10px;
    height: unset;
  }
`;

export const NotFoundContainer = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  font-weight: 700;
  padding: 130px;

  @media screen and (max-width: 800px) {
    width: 100%;
    padding: 250px 50px;
    background-color: rgb(0, 0, 0, 0.2);
    color: white;
    text-shadow: 0 0 5px black;
  }
`;

export const ErrorCode = styled.span`
  color: white;
  font-size: 70px;
  text-shadow: 0 0 5px black;
`;

export const ErrorTitle = styled.span`
  text-transform: uppercase;
  font-size: 55px;
`;

export const Description = styled.p`
  color: #535353;
  font-size: 20px;
  font-weight: 500;

  @media screen and (max-width: 800px) {
    color: white;
  }
`;
