import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

export const Nav = styled.nav`
  background: #F2B868;
  display: flex;
  padding: 0.5rem;
  padding-left: 50%;
  height: 80px;
`;

export const NavBurger = styled.nav`
  background: #F2B868;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 100;
  align-items: center;
  height: 100%;
`;

export const NavLinkBurger = styled(Link)`
  height:20px;
  margin-top: 1rem;

  cursor: pointer;
  &.active {
    color: #FFC701;
    background-color: #000;
  }
`;

export const NavBtnBurger = styled.nav`
  height:20px;
  margin: 1rem;
`;

export const NavLink = styled(Link)`
  color: #000;
  display: flex;
  height:20px;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', 'Geneva', 'Verdana', 'sans-serif';
  align-items: center;
  margin-top: 30px;
  text-decoration: none;
  font-weight: bold;
  margin-right: 1rem;
  padding-left: 5px;
  padding-right: 5px;
  padding: 3px;

  cursor: pointer;
  &.active {
    color: #FFC701;
    background-color: #000;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: #256ce1;
  padding: 10px 22px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  margin-left: 24px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`;