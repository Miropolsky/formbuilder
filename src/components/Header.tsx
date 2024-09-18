import { Navbar, Nav, Container } from "react-bootstrap";

const Header = () => {
    return (
        <header>
            <Navbar
                collapseOnSelect
                expand="lg"
                bg="dark"
                variant="dark"
                className="shadow-md"
            >
                <Container>
                    <Navbar.Brand href="/" className="text-xl font-bold">
                        Builder Form
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ml-auto flex space-x-6">
                            <Nav.Link href="/" className="text-white">
                                Конструктор форм
                            </Nav.Link>
                            <Nav.Link href="/showForm" className="text-white">
                                Отображение форм
                            </Nav.Link>
                            {/* <Nav.Link href="/showForm" className="text-white">
                                Отображение форм
                            </Nav.Link> */}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
