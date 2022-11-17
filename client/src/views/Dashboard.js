import { PostContext } from '../contexts/PostContext'
import { AuthContext } from '../contexts/AuthContext'
import { useContext, useEffect } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Toast from 'react-bootstrap/Toast'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Col from 'react-bootstrap/Col'
import SinglePost from '../components/posts/SinglePost'
import UpdatePostModal from '../components/posts/UpdatePostModal'
import addIcon from '../assets/plus-circle-fill.svg'
import { Navigate } from 'react-router-dom'
import NavbarMenu from "../components/layout/NavbarMenu"
import AddPostModal from '../components/posts/AddPostModal'

const Dashboard = () => {
	// Contexts
	const {
		authState: { authLoading, isAuthenticated }
	} = useContext(AuthContext)

	const {
		postState: { post, posts },
		getPosts,
		setShowAddPostModal,
		showToast :{show, message, type},
		setShowToast
	} = useContext(PostContext)

	useEffect(() => {
        getPosts()
    }, [getPosts]);

	let body = null

	if (posts.length === 0 ){
		body = (
			<>
			<Card className='text-center mx-5 my-5'>
			<Card.Header as='h1'>Hi </Card.Header>
					<Card.Body>
						<Card.Title>Welcome to LearnIt</Card.Title>
						<Card.Text>
							Click the button below to track your first skill to learn
						</Card.Text>
						<Button
							variant='primary'
							onClick={() => setShowAddPostModal(true)}
						>
							LearnIt!
						</Button>
					</Card.Body>
			</Card>
			</>
		)
	} else {
		body = (
			<>
			<Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3'>
				{posts.map(post => (
					<Col key={post._id} className="my-2">
						<SinglePost post={post}/>
					</Col>
				))}
			</Row>

			{/* Add Post Modal */}
			<OverlayTrigger
					placement='left'
					overlay={<Tooltip>Add a new thing to learn</Tooltip>}
				>
			<Button className='btn-floating' onClick={() => setShowAddPostModal(true)}>
				<img src={addIcon} alt="add-post" height="60" width="60"/>
			</Button>
			</OverlayTrigger>
			</>
		)
	}

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
					<><NavbarMenu />
					{body}
					<AddPostModal/>
					{post !== null && <UpdatePostModal/>}
					<Toast 
						show={show} 
						style={{position:'fixed', bottom: '5%', right: '30%'}}
						className={`bg-${type} text-white`}
						onClose={()=> setShowToast({
							show: false,
							message: '',
							type: null})}
						delay={3000}
						autohide
					>
						<Toast.Body>{message}</Toast.Body>
					</Toast>
					</>
				) : (
			
					<Navigate to='/login' />
					
				) }
			</>
		)
}

export default Dashboard