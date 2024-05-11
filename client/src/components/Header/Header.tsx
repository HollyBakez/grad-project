import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Navbar, Offcanvas} from "react-bootstrap";
import Logo from '../../assets/logo.png';

export default function Header() {
    return (
        <Navbar key={false} expand={false} className="bg-body-tertiary mb-3">
        <Navbar.Brand href="#home">
          <img src={Logo} alt="Logo" />
            Budgets
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${false}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${false}`}>
                Budget Tools
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="/">Budgets</Nav.Link>
                <Nav.Link href="/expenses-calculator">Expenses Calculator</Nav.Link>
                <Nav.Link href="/savings-calculator">Savings Goals Calculator</Nav.Link>
              </Nav>
            </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Navbar>
    )

}