import { Button, Navbar } from 'flowbite-react'
import { FaCat } from 'react-icons/fa';

export const NavbarRow = () => <Navbar
  fluid={true}
  rounded={true}
>
  <Navbar.Brand href="/">
    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
      Shortcat
    </span>
    <FaCat />
  </Navbar.Brand>
  <div className="flex md:order-2">
    <Button href='/add'>
      Add a Shortcat
    </Button>
  </div>
</Navbar>