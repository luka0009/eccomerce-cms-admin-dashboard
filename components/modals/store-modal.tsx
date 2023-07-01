"use client";

import { useStoreModal } from "@/hooks/useStoreModal";
import Modal from "../ui/modal";

const StoreModal = () => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const storeModal = useStoreModal();

	return (
		<Modal
			title="Create Store"
			description="Add a new store to Manage your products"
			isOpen={storeModal.isOpen}
			onClose={storeModal.onClose}
		>
            Form
        </Modal>
	);
};

export default StoreModal;
