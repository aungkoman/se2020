import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { IconButton, Tooltip } from '@material-ui/core';

const ModalStyled = styled(Modal)`
	display: flex;
	align-items: center;
	justify-content: center;
`;
const ContentWrapper = styled.div`
	background-color: transparent;
	border: none;
	padding: 15px;
	outline: none !important;
`;
const ImageContainer = styled.div`
	width: 450px;
`;
const Image = styled.img`
	width: 100%;
	height: 100%;
`;
const ImageModal = ({ openModal, image, closeModal }) => {
	const [open, setOpen] = React.useState(true);

	useEffect(() => {
		setOpen(openModal);
	}, [openModal]);

	const handleClose = () => {
		setOpen(false);
		//trigger false action from parent
		if (closeModal) {
			closeModal(false);
		}
	};

	return (
		<div>
			<ModalStyled
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={open}
				onClose={handleClose}
				disableAutoFocus
				disableEnforceFocus
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500
				}}
			>
				<Fade in={open}>
					<ContentWrapper>
						<ImageContainer>
							<Image src={image} />
						</ImageContainer>
						<Tooltip title="Close">
							<IconButton
								style={{ display: 'flex', margin: '0 auto' }}
								onClick={handleClose}
								aria-label="close"
							>
								<FontAwesomeIcon color={'white'} icon={faTimesCircle} size={'3x'} />
							</IconButton>
						</Tooltip>
					</ContentWrapper>
				</Fade>
			</ModalStyled>
		</div>
	);
};

export default ImageModal;
