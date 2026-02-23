'use client'
import { useState } from 'react'
import { OrderModalContainer } from '@/modal/order-modal-container'
import SuccessPopup from '@/components/success-popup/success-popup.component'

export default function OrderModalWrapper() {
	const [successMessageVisible, setSuccessMessageVisible] = useState(false)

	const showSuccessMessage = () => {
		setSuccessMessageVisible(true)
		setTimeout(() => setSuccessMessageVisible(false), 5000)
	}

	return (
		<>
			<OrderModalContainer onFormSubmit={showSuccessMessage} />
			{successMessageVisible && <SuccessPopup />}
		</>
	)
}
