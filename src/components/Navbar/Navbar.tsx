import { Button, Navbar } from 'flowbite-react'

export const NavbarRow = () => <Navbar
  fluid={true}
  rounded={true}
>
  <Navbar.Brand href="/">
    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
      Shortcat
    </span>
  </Navbar.Brand>
  <div className="flex md:order-2">
    <Button href='/add'>
      Add a Shortcat
    </Button>
  </div>
</Navbar>