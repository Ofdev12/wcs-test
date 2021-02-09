import { useForm } from 'react-hook-form'
import './Form.css'
export const Form = ({ saveMember, status }) => {
	const { register, handleSubmit } = useForm()

	return (
		<div id='form-container'>
			<h2>Ajouter un(e) Argonaute</h2>

			<form className='new-member-form' onSubmit={handleSubmit(saveMember)}>
				<input
					id='name'
					name='name'
					type='text'
					autoComplete='off'
					required
					ref={register}
				/>
				<label htmlFor='name' className='label-name'>
					<span className='content-name'>Nom de l&apos;Argonaute</span>
				</label>
			</form>
			<span className={`alerte ${status.status}`}>{status.message || ''}</span>
		</div>
	)
}
