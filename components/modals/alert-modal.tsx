"use client";

import React, { useEffect, useState } from "react";
import Modal from "../ui/modal";
import { Button } from "../ui/button";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	isLoading: boolean;
}

const AlertModal: React.FC<Props> = ({
	isOpen,
	onClose,
	onConfirm,
	isLoading,
}) => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}

	return (
		<>
			<Modal
				title="Are you sure you want to delete the store?"
				description="This will delete your store permanently. This action cannot be undone!"
				isOpen={isOpen}
				onClose={onClose}
			>
				<div className="pt-6 space-x-4 flex items-center justify-end w-full">
					<Button disabled={isLoading} variant="outline" onClick={onClose}>
						Cancel
					</Button>
					<Button
						disabled={isLoading}
						variant="destructive"
						onClick={onConfirm}
					>
						Continue
					</Button>
				</div>
			</Modal>
		</>
	);
};

export default AlertModal;
