import styled from 'styled-components';

export const MenuIcon = styled.div`
  width: 40px;  
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: #333;  
  border-radius: 5px;  
  box-sizing: border-box;
  transition: background-color 0.3s;

  &:hover {
    background-color: #444;  
  }

  &::before, &::after, span {
    content: '';
    position: absolute;
    width: 20px;  
    height: 2px;  
    background-color: #ffffff;
    transition: transform 0.3s ease;
  }

  &::before {
    transform: ${props => props.isOpen ? 'translateY(0) rotate(135deg)' : 'translateY(-8px)'};
  }

  &::after {
    transform: ${props => props.isOpen ? 'translateY(0) rotate(-135deg)' : 'translateY(8px)'};
  }

  span {
    transform: ${props => props.isOpen ? 'scale(0)' : 'scale(1)'};
  }
`;

export const PlusIcon = styled.div`
  width: 30px;
  height: 30px;
  position: fixed;
  right: 10px;
  top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #333;
  border-radius: 5px;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  z-index: 100;

  &:hover {
    background-color: #444;
  }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  right: 10px;
  top: 40px;
  background-color: #20232a;
  border: 1px solid #333;
  border-radius: 5px;
  width: 200px;
  z-index: 110;

  a {
    display: block;
    color: #fff;
    padding: 10px;
    text-decoration: none;
    &:hover {
      background-color: #333;
    }
  }
`;
