import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const AlertBox = ({
	agreeText,
	closeText,
	title,
	description,
	trigger,
	handleAction,
	cancleAction,
	handleBackAction
}) => {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		setOpen(true);
	}, [trigger]);

	const handleClose = () => {
		setOpen(false);
		//For the trigger aciton from parent
		if (cancleAction) {
			cancleAction(false);
		}
	};

	return (
		<div>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogTitle
					id="alert-dialog-slide-title"
					style={{ textAlign: 'center', fontSize: 45, fontWeight: 800 }}
				>
					{title}
				</DialogTitle>
				<DialogContent>
					<DialogContentText
						id="alert-dialog-slide-description"
						style={{ textAlign: 'center', fontSize: 30 }}
					>
						{description}
					</DialogContentText>
				</DialogContent>
				<DialogActions style={{ justifyContent: 'space-around' }}>
					{closeText ? (
						<Button
							onClick={handleBackAction ? () => handleBackAction(true) : handleClose}
							style={{ backgroundColor: '#00ff45' }}
						>
							{closeText}
						</Button>
					) : null}

					<Button
						onClick={() => handleAction(true)}
						style={(closeText ? null : { margin: 0 }, { backgroundColor: '#1da0ff' })}
					>
						{agreeText}
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};
export default AlertBox;
