import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { Navigate } from 'react-router-dom'
import NavbarMenu from "../components/layout/NavbarMenu"
import Spinner from 'react-bootstrap/Spinner'
import { AuthContext } from '../contexts/AuthContext'
import { useContext } from 'react'

function About() {
    const {
		authState: { authLoading, isAuthenticated }
	} = useContext(AuthContext)

	if (authLoading)
		return (
			<div className='spinner-container'>
				<Spinner animation='border' variant='info' />
			</div>
		)
	else
		return (
			<>
				{ isAuthenticated ? (
                    <>
                        <NavbarMenu /> 
                        <Row className="mt-5">
                        <Col className="text-center">       
                            <div>Hi, my name is Ngoc Le</div>
                        </Col>
                        </Row>
                    </>
				) : (
					<Navigate to='/login' />
				) }
			</>
		)
}

export default About
