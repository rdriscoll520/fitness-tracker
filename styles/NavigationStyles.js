import styled from 'styled-components';

export const StyledNav = styled.nav`
  background: #f0f0f0;
  padding: 10px 20px;
`;

export const StyledUl = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: space-around;
`;

export const StyledLi = styled.li`
  padding: 8px 16px;
  a {
    text-decoration: none;
    color: #333;
    font-weight: bold;
  }

  a:hover {
    color: blue;
  }
`;