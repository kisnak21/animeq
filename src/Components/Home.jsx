import React from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../Context/Global'
import PopularAnime from './PopularAnime'
import UpComing from './UpComing'
import Airing from './Airing'

const Home = () => {
	const {
		handleSubmit,
		search,
		searchAnime,
		handleChange,
		getUpcomingAnime,
		getAiringAnime,
		getPopularAnime,
	} = useGlobalContext()

	const [rendered, setRendered] = React.useState('popular')

	const switchComponent = () => {
		switch (rendered) {
			case 'popular':
				return <PopularAnime rendered={rendered} />
			case 'airing':
				return <Airing rendered={rendered} />
			case 'upcoming':
				return <UpComing rendered={rendered} />
			default:
				return <Popular rendered={rendered} />
		}
	}

	return (
		<HomepageStyled>
			<header>
				<div className='logo'>
					<h1>
						{rendered === 'popular'
							? 'Popular Anime'
							: rendered === 'airing'
							? 'Airing Anime'
							: 'Upcoming Anime'}
					</h1>
				</div>
				<div className='search-container'>
					<div className='filter-btn popular-filter'>
						<button
							onClick={() => {
								setRendered('popular')
							}}
						>
							Popular<i className='fas fa-fire'></i>
						</button>
					</div>
					<form
						action=''
						className='search-form'
						onSubmit={handleSubmit}
					>
						<div className='input-control'>
							<input
								type='text'
								placeholder='Search Anime'
								value={search}
								onChange={handleChange}
							/>
							<button type='submit'>Search</button>
						</div>
					</form>
					<div className='filter-btn airing-filter'>
						<button
							onClick={() => {
								setRendered('airing')
								getAiringAnime()
							}}
						>
							Airing
						</button>
					</div>
					<div className='filter-btn upcoming-filter'>
						<button
							onClick={() => {
								setRendered('upcoming')
								getUpcomingAnime()
							}}
						>
							Upcoming
						</button>
					</div>
				</div>
			</header>
			{switchComponent()}
		</HomepageStyled>
	)
}

const HomepageStyled = styled.div`
	background-color: #0f172a;
	header {
		padding: 2rem 5rem;
		width: 100%;
		box-sizing: border-box;
		margin: 0 auto;
		transition: all 0.4s ease-in-out;
		@media screen and (max-width: 1920px) {
			width: 70%;
		}
		@media screen and (max-width: 1440px) {
			width: 80%;
		}
		@media screen and (max-width: 1024px) {
			width: 90%;
		}
		@media screen and (max-width: 768px) {
			width: 80%;
			padding: 2rem;
		}
		.logo {
			display: flex;
			align-items: center;
			justify-content: center;
			margin-bottom: 2rem;
		}
		.search-container {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 1rem;
			@media screen and (max-width: 768px) {
				flex-direction: column;
			}
			button {
				display: flex;
				align-items: center;
				gap: 0.5rem;
				color: #1e293b;
				padding: 0.7rem 1.5rem;
				outline: none;
				border-radius: 30px;
				font-size: 1.2rem;
				background-color: #ea580c;
				cursor: pointer;
				transition: all 0.4s ease-in-out;
				font-family: inherit;
				border: 5px solid #e5e7eb;
			}
			form {
				position: relative;
				width: 100%;
				.input-control {
					position: relative;
					transition: all 0.4s ease-in-out;
				}
				.input-control input {
					width: 100%;
					padding: 0.7rem 1rem;
					border: none;
					outline: none;
					border-radius: 30px;
					font-size: 1.2rem;
					background-color: #fff;
					border: 5px solid #e5e7eb;
					transition: all 0.4s ease-in-out;
				}
				.input-control button {
					position: absolute;
					right: 0;
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}
	}
`

export default Home
