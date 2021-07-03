import React from 'react'
import styled from 'styled-components'

const Footer = styled.footer`
  text-align: center;
  ${'' /* max-height: min-content; */}
  padding: 10px 0;
  border-top: 2px solid rgba(0,0,0,0.2);

`


const FooterComponent = () => {
  return (
    <Footer>
      &copy; Navpreet Singh - 2021
    </Footer>
  )
}

export default FooterComponent
