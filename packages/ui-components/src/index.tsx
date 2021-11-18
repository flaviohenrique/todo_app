import * as React from 'react'
import NavBar from './layouts/NavBar';
import ProfileMenu from './layouts/ProfileMenu';
import Title from './Title/Title';
import Footer from './layouts/Footer';
import Header from './layouts/Header';


interface Props {
  text: string
}


const ExampleComponent = ({ text }: Props) => {
  return <div>Example Component: {text}</div>
}

export {
  ProfileMenu,
  NavBar,
  ExampleComponent,
  Title,
  Footer,
  Header
}
