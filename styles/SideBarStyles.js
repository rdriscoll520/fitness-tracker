import styled from 'styled-components';

export const SidebarContainer = styled.div`
  width: 200px;
  height: 100vh;
  background-color: #555555;
  color: #C9D1D9;
  position: fixed;
  left: ${({ isOpen }) => isOpen ? '0' : '-250px'};
  top: 0;
  padding: 20px;
  transition: left 0.3s ease-in-out;
`;

export const SidebarLink = styled.div`
  padding: 10px 20px;
  color: #C9D1D9;
  text-decoration: none;
  &:hover {
    color: #58A6FF;
    cursor: pointer;
  }
`;

export const SidebarTitle = styled.h1`
  color: #FFFFFF;
  font-size: 24px;
  text-align: center;
  padding-bottom: 20px;
`;
