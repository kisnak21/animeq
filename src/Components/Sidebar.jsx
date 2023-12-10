import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useGlobalContext } from '../Context/Global'

const Sidebar = () => {
	const { popularAnime } = useGlobalContext()

	const sorted = popularAnime?.sort((a, b) => {
		return b.score - a.score
	})

	return (
		<SidebarStyled>
			<h3>Top 5 Anime</h3>
			<div className='anime'>
				{sorted?.slice(0, 5).map((anime) => {
					return (
						<Link
							to={`/anime/${anime.mal_id}`}
							key={anime.mal_id}
						>
							<img
								src={anime.images.webp.large_image_url}
								alt=''
							/>
							<h5>{anime.title}</h5>
						</Link>
					)
				})}
			</div>
		</SidebarStyled>
	)
}

const SidebarStyled = styled.div`
	margin-top: 2rem;
	background-color: #1e293b;
	// border-top: 5px solid #e5e7eb;
	padding: 2rem;

	h3 {
		font-size: 1.5rem;
		color: #fff;
	}

	.anime {
		display: flex;
		flex-direction: column;
		width: 100%; /* Adjust width for smaller screens */
		margin-top: 1rem;

		img {
			width: 100%;
			border-radius: 5px;
			border: 5px solid #e5e7eb;
		}

		a {
			margin-top: 1rem;
			display: flex;
			flex-direction: column;
			gap: 0.4rem;
			color: #ea580c;

			h4 {
				font-size: 1.1rem;
			}
		}
	}

	@media screen and (min-width: 768px) {
		/* Adjust styles for larger screens if needed */
		margin-top: 2rem;
		padding-right: 5rem;
		padding-left: 2rem;

		.anime {
			width: 150px;
		}
	}
`

export default Sidebar
