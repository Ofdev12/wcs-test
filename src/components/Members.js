import './Members.css'
export const Members = ({ memberList, removeMember }) => {
	return (
		<>
			<h2>Membres de l'équipage</h2>
			<section className='member-list'>
				{memberList && memberList.length != 0 ? (
					memberList.map((el, i) => (
						<div className='member-item' key={`${i}-${el.name}`}>
							{el.name}
						</div>
					))
				) : (
					<span id='emptyList'>
						Aucun membre d'équipage n'est actuellement inscrit !
					</span>
				)}
			</section>
		</>
	)
}
