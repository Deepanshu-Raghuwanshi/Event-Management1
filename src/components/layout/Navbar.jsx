import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import styled from "styled-components";

const NavbarContainer = styled.nav`
  background-color: var(--dark-color);
  color: white;
  padding: 1rem 0;
  position: relative;
`;

const NavbarContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  color: white;
  font-size: 1.5rem;
  font-weight: bold;

  &:hover {
    color: var(--primary-color);
  }
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;

  @media (max-width: 768px) {
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: var(--dark-color);
    display: ${(props) => (props.isOpen ? "flex" : "none")};
    padding: 1rem;
    z-index: 100;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const NavItem = styled.li`
  margin-left: 1.5rem;

  @media (max-width: 768px) {
    margin: 0.5rem 0;
    width: 100%;
    text-align: center;
  }
`;

const NavLink = styled(Link)`
  color: white;
  display: block;
  padding: 0.5rem 0;

  &:hover {
    color: var(--primary-color);
  }
`;

const NavButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.5rem 0;
  font-size: 1rem;

  @media (max-width: 768px) {
    text-align: center;
  }

  &:hover {
    color: var(--primary-color);
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MenuIcon = styled.div`
  width: 25px;
  height: 3px;
  background-color: white;
  position: relative;
  transition: all 0.3s ease;

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 25px;
    height: 3px;
    background-color: white;
    transition: all 0.3s ease;
  }

  &::before {
    transform: translateY(-8px);
  }

  &::after {
    transform: translateY(8px);
  }

  ${(props) =>
    props.isOpen &&
    `
    background-color: transparent;
    
    &::before {
      transform: rotate(45deg);
    }
    
    &::after {
      transform: rotate(-45deg);
    }
  `}
`;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/");
  };

  return (
    <NavbarContainer>
      <NavbarContent className="container">
        <Logo to="/" onClick={closeMenu}>
          Event Manager
        </Logo>

        <MenuButton onClick={toggleMenu} aria-label="Toggle menu">
          <MenuIcon isOpen={isMenuOpen} />
        </MenuButton>

        <NavLinks isOpen={isMenuOpen}>
          <NavItem>
            <NavLink to="/" onClick={closeMenu}>
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/events" onClick={closeMenu}>
              Events
            </NavLink>
          </NavItem>

          {isAuthenticated ? (
            <>
              <NavItem>
                <NavLink to="/events/create" onClick={closeMenu}>
                  Create Event
                </NavLink>
              </NavItem>
              <NavItem>
                <NavButton onClick={handleLogout}>Logout</NavButton>
              </NavItem>
            </>
          ) : (
            <>
              <NavItem>
                <NavLink to="/login" onClick={closeMenu}>
                  Login
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/register" onClick={closeMenu}>
                  Register
                </NavLink>
              </NavItem>
            </>
          )}
        </NavLinks>
      </NavbarContent>
    </NavbarContainer>
  );
};

export default Navbar;
